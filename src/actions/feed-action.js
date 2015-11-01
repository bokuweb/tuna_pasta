import _ from 'lodash';
import {fetch} from '../api/feed'
import * as types from '../constants/action-types';
// FIXME
import {categories} from '../constants/categories';

const HATENA_SEARCH_URI = 'http://b.hatena.ne.jp/search/text?mode=rss&q='
const ITEM_NUM_PER_PAGE = 40;

function getItems(feed) {
  return feed.responseData.feed.entries;
}

export function initialize() {
    console.log("initialize..");
    return {
      type: types.INITIALIZE,
      // FIXME: create DB and fetch initial keyword list
      keywords : categories
    };
}

export function fetchingItems(keyword) {
  console.log("fecthing..");
  return {
    type: types.FETCHING_ITEMS,
    keyword
  };
}

export function recieveItems(items, keyword) {
    /*items = _.map(items, (item) => {
      item.publishedDate = new Date(item.publishedDate).getTime();
      return item;
    });
    console.dir(items);*/
  return {
    type: types.RECIEVE_ITEMS,
    items,
    keyword
  };
}

export function fetchFeed(keyword, page = 0) {
  return dispatch => {
    const uri = HATENA_SEARCH_URI + keyword + '&of=' + page * ITEM_NUM_PER_PAGE;
    fetch(uri).then((feed) => {
        dispatch(recieveItems(getItems(feed), keyword));
    }, (error) => console.log(error));
    dispatch(fetchingItems(keyword));
  };
}


