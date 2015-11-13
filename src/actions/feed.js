import _ from 'lodash';
import {fetch, fetchWithGoogleFeedApi} from '../api/feed'
import * as types from '../constants/action-types';
import DbManager from '../lib/db'

const HATENA_URL = 'http://b.hatena.ne.jp/'
const HATENA_BOOKMARK_COUNT_URL = 'http://api.b.st-hatena.com/entry.counts?';
const HATENA_SEARCH_URL = HATENA_URL + 'search/text?mode=rss&safe=off&q='
const HATENA_ENTRY_URL = HATENA_URL + 'entry/json/?'

const db = new DbManager('pastaDB');

function getItems(feed) {
    console.log('---------- fetch feed -----------');
    console.dir(feed);
    if (feed.responseData === null) {
        console.log("feed null");
        return;
    }

    if (feed.responseData.feed === undefined) {
        console.log("feed none");
        return [];
    }
    return feed.responseData.feed.entries;
}

export function initialize() {
  return dispatch => {
    console.log("initialize..");
    db.create({keywords: "name, icon"});
    db.create({favorites: "link, title, content, contentSnippet, publishedDate, categories, isFavorited"});
    db.getArray('keywords').then((keywords) => {
      dispatch({type: types.INITIALIZE_KEYWORD, keywords});
      if (keywords.length !== 0) {
        for (let keyword of keywords) {
          _fetchFeed(dispatch, keyword.name, 0, 1);
        }
      }
    });
    db.getArray('favorites').then((favorites) => {
      dispatch({
        type: types.INITIALIZE_FAVORITE,
        favorites
      });
    });
    dispatch({type: types.INITIALIZING});
  }
}

function fetchingItems(keyword) {
  return {
    type: types.FETCHING_ITEMS,
    keyword
  };
}

function recieveItems(items, keyword, length) {
  return {
    type: types.RECIEVE_ITEMS,
    items,
    length,
    keyword
  };
}

export function filterFavoriteItems(items) {
  return {
    type: types.FILTER_FAVORITE_ITEMS,
    items
  };
}

export function clearFeeds(menu) {
  return {
    type: types.CLEAR_ITEMS,
    keywords : menu.keywords
  };
}

export function fetchFeed(feed, menu) {
  return dispatch => {
    const keyword = menu.activeKeyword;
    if (keyword === 'all') {
      for (let keyword of menu.keywords) {
        let page = feed[keyword.name].page;
        _fetchFeed(dispatch, keyword.name, page, menu.bookmarkFilter);
      }
    } else if (keyword === 'favorite') {
      db.getArray('favorites').then((favorites) => {
        _getBookmarkCount(favorites).then((bookmarks) => {
          const filteredItems = _.filter(favorites, (item) => bookmarks[item.link] >= menu.bookmarkFilter);
          dispatch(filterFavoriteItems(filteredItems, keyword));
        });
      });
    } else {
      let page = feed[keyword].page;
      _fetchFeed(dispatch, keyword, page, menu.bookmarkFilter);
    }
  }
}

export function addFavorite(item) {
  return dispatch => {
    item.isFavorited = true;
    db.put('favorites', item).then(() => {
      db.getArray('favorites').then((favorites) => {
        dispatch({type: types.ADD_FAVORITE, favorites});
      });
    });
  }
}

export function removeFavorite(item) {
  return dispatch => {
    db.remove('favorites', item.link).then(() => {
      db.getArray('favorites').then((favorites) => {
        dispatch({type: types.REMOVE_FAVORITE, favorites});
      });
    });
  }
}

export function openComment(item, keyword) {
  const url = HATENA_ENTRY_URL + 'url=' + encodeURIComponent(item.link);
  return dispatch => {
    fetch(url).then((res) => {
      const commentedBookmarks = _.filter(res.bookmarks, bookmark => bookmark.comment !== '');
      console.log(commentedBookmarks);
      dispatch({type: types.OPEN_COMMENT, keyword, link: item.link, comments: commentedBookmarks});
    }, (error) => console.log(error));
    dispatch({type: types.FETCHING_COMMENT, keyword, link: item.link});
  }
}

export function closeComment(item, keyword) {
  return ({
    type: types.CLOSE_COMMENT,
    keyword,
    link: item.link
  });
}

export function changeElementHeight(heightOfElements, keyword) {
  console.dir(heightOfElements);
  console.log("change action");
  return ({
    type: types.CHANGE_ELEMENT_HEIGHT,
    heightOfElements,
    keyword
  });
}


function _fetchFeed(dispatch, keyword, page = 0, threshold) {
  const id = /^id:(.*)/.exec(keyword.replace(/\s+/g, ""));
  if (id === null) {
    _fetchSearchFeed(dispatch, keyword, page, threshold);
  } else {
    _fetchUserFeed(dispatch, keyword, id[1], page, threshold)
  }
}

function _fetchSearchFeed(dispatch, keyword, page = 0, threshold) {
  const url = HATENA_SEARCH_URL + keyword + '&of=' + page * 40 + '&users=' + threshold;
  fetchWithGoogleFeedApi(url).then((feed) => {
    const items = getItems(feed);
    dispatch(recieveItems(items, keyword, items.length));
  }, (error) => console.log(error));
  dispatch(fetchingItems(keyword));
}

function _fetchUserFeed(dispatch, keyword, user, page = 0, threshold) {
  const url = HATENA_URL + user + '/rss?of=' + page * 20;
  fetchWithGoogleFeedApi(url).then((feed) => {
    const items = getItems(feed);
    _getBookmarkCount(items).then((bookmarks) => {
      const filteredItems = _.filter(items, (item) => bookmarks[item.link] >= threshold);
      dispatch(recieveItems(filteredItems, keyword, items.length));
    });
  }, (error) => console.log(error));
  dispatch(fetchingItems(keyword));
}

function _getBookmarkCount(items) {
  return new Promise((resolve, reject) => {
    let url = HATENA_BOOKMARK_COUNT_URL;
    for (let item of items) url += 'url=' + encodeURIComponent(item.link) + '&';
    fetch(url).then((res) => {
      resolve(res);
    }, (error) => console.log(error));
  });
}


