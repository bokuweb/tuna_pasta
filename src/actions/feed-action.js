import _ from 'lodash';
import Dexie from 'dexie';
import {fetch} from '../api/feed'
import * as types from '../constants/action-types';

const HATENA_SEARCH_URI = 'http://b.hatena.ne.jp/search/text?mode=rss&safe=off&q='
const ITEM_NUM_PER_PAGE = 40;

const db = new Dexie('Pasta');

function getItems(feed) {
  return feed.responseData.feed.entries;
}

export function initialize() {
  return dispatch => {
    console.log("initialize..");
    db.delete();
    db.version(1).stores({
      keywords: "++id,name,enable,icon"
    });
    db.open();
    db.keywords.count((count) => {
      if (count > 0) {
        console.log("Already populated");
      } else {
        db.keywords.add({name: 'Elixir', enable: 1, icon:'tag'});
        db.keywords.add({name: 'JavaScript', enable: 1, icon:'tag'});
        db.keywords.add({name: 'React', enable: 1, icon:'tag'});
        console.log("Database is empty. Populating from ajax call...");
        db.keywords.toArray((keywords) => {
          dispatch({
            type: types.INITIALIZE,
            keywords
          });
          _fetchFeed(dispatch, keywords[0].name, 0);
        });
      }
    });
    dispatch({type: types.INITIALIZING});
  }
}

export function fetchingItems(keyword) {
  console.log("fecthing..");
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

export function fetchFeed(feed, menu) {
  return dispatch => {
    const keyword = menu.activeKeyword;
    let page;
    if (keyword === 'all') {
      for (let keyword of menu.keywords) {
        page = feed[keyword.name].page;
        _fetchFeed(dispatch, keyword.name, page);
      }
    } else {
      page = feed[keyword].page;
      _fetchFeed(dispatch, keyword, page);
    }
  }
}

function _fetchFeed(dispatch, keyword, page = 0) {
  const uri = HATENA_SEARCH_URI + keyword + '&of=' + page * ITEM_NUM_PER_PAGE;
  fetch(uri).then((feed) => {
    dispatch(recieveItems(getItems(feed), keyword));
  }, (error) => console.log(error));
  dispatch(fetchingItems(keyword));
}
