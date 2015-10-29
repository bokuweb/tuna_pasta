import {fetch} from '../api/feed'
import * as types from '../constants/action-types';

function getItems(feed) {
  console.dir(feed);
  return feed.responseData.feed.entries;
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

export function fetchFeed(uri) {
  console.log(uri);
  return dispatch => {
    fetch(uri).then((feed) => {
      dispatch(recieveItems(getItems(feed)));
    }, (error) => console.log(error));
    dispatch(fetchingItems());
  };
}

