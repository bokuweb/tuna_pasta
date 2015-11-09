import _ from 'lodash';
import {fetch, fetchWithGoogleFeedApi} from '../api/feed'
import * as types from '../constants/action-types';
import DbManager from '../lib/db'

const HATENA_URL = 'http://b.hatena.ne.jp/'
const HATENA_BOOKMARK_COUNT_URL = 'http://api.b.st-hatena.com/entry.counts?';
const HATENA_SEARCH_URL = HATENA_URL + 'search/text?mode=rss&safe=off&q='

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
    db.create({favorites: "link, title, content, contentSnippet, publishedDate, categories"});
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

export function fetchingItems(keyword) {
  return {
    type: types.FETCHING_ITEMS,
    keyword
  };
}

export function recieveItems(items, keyword, length) {
  return {
    type: types.RECIEVE_ITEMS,
    items,
    length,
    keyword
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


    } else {
      let page = feed[keyword].page;
      _fetchFeed(dispatch, keyword, page, menu.bookmarkFilter);
    }
  }
}

export function addFavorite(item) {
  return dispatch => {
    console.dir(item);
    db.put('favorites', item).then(() => {
      db.getArray('favorites').then((favorites) => {
        console.dir(favorites);
        dispatch({
          type: types.ADD_FAVORITE,
          favorites
        });
      });
    });
  }
}

function _fetchFeed(dispatch, keyword, page = 0, threshold) {
  const id = /^id:(.*)/.exec(keyword);
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

