import _ from 'lodash';
//import Dexie from 'dexie';
import {fetch} from '../api/feed'
import * as types from '../constants/action-types';
import DbManager from '../lib/db'

const HATENA_SEARCH_URI = 'http://b.hatena.ne.jp/search/text?mode=rss&safe=off&q='
const ITEM_NUM_PER_PAGE = 40;

const db = new DbManager();
//const db = new Dexie('Pasta');

function getItems(feed) {
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
      if (keywords.length !== 0)
        _fetchFeed(dispatch, keywords[0].name, 0, 1);
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
  const uri = HATENA_SEARCH_URI + keyword + '&of=' + page * ITEM_NUM_PER_PAGE + '&users=' + threshold;
  console.log('fetch url = ' + uri);
  fetch(uri).then((feed) => {
    dispatch(recieveItems(getItems(feed), keyword));
  }, (error) => console.log(error));
  dispatch(fetchingItems(keyword));
}
