import {fetch} from '../api/feed'
import * as types from '../constants/action-types';
// FIXME
import {categories} from '../constants/categories';

const HATENA_SEARCH_URI = 'http://b.hatena.ne.jp/search/text?mode=rss&q='

function getItems(feed) {
  return feed.responseData.feed.entries;
}

export function initialize() {
    console.log("initialize..");
    return {
      type: types.INITIALIZE,
      // FIXME:
      keywords : categories
    };
}

export function fetchingItems() {
  console.log("fecthing..");
  return {
    type: types.FETCHING_ITEMS
  };
}

export function recieveItems(items) {
  return {
    type: types.RECIEVE_ITEMS,
    items: items
  };
}

export function fetchFeed(keyword, page = 0) {
  return dispatch => {
    const uri = HATENA_SEARCH_URI + keyword + '&of=' + page * 40;
    fetch(uri).then((feed) => {
      dispatch(recieveItems(getItems(feed)));
    }, (error) => console.log(error));
    dispatch(fetchingItems());
  };
}

