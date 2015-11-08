import _ from 'lodash';
import {fetch} from '../api/feed'
import * as types from '../constants/action-types';
import DbManager from '../lib/db'

const HATENA_URL = 'http://b.hatena.ne.jp/'
const HATENA_SEARCH_URL = HATENA_URL + 'search/text?mode=rss&safe=off&q='

const db = new DbManager('pastaDB');

function getItems(feed) {
    console.log('---------- fetch feed -----------');
    console.dir(feed);
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
    db.getArray('keywords').then((keywords) => {
      dispatch({type: types.INITIALIZE, keywords});
      if (keywords.length !== 0) {
        for (let keyword of keywords) {
          _fetchFeed(dispatch, keyword.name, 0, 1);
        }
      }
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

export function recieveItems(items, keyword) {
  return {
    type: types.RECIEVE_ITEMS,
    items,
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
    } else {
      let page = feed[keyword].page;
      _fetchFeed(dispatch, keyword, page, menu.bookmarkFilter);
    }
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
  console.log('fetch url = ' + url);
  fetch(url).then((feed) => {
    dispatch(recieveItems(getItems(feed), keyword));
  }, (error) => console.log(error));
  dispatch(fetchingItems(keyword));
}

function _fetchUserFeed(dispatch, keyword, user, page = 0, threshold) {
  const url = HATENA_URL + user + '/rss?of=' + page * 20;
  console.log('fetch url = ' + url);
  fetch(url).then((feed) => {
    dispatch(recieveItems(getItems(feed), keyword));
  }, (error) => console.log(error));
  dispatch(fetchingItems(keyword));
}
