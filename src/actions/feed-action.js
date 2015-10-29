import {fetch} from '../api/feed'

export const RECIEVE_ITEMS = 'RECIEVE_ITEMS'

function getItems(feed) {
  return feed.responseData.feed.entries;
}

export function recieveItems(items) {
  return {
    type: RECIEVE_ITEMS,
    items: items
  };
}

export function fetchFeed(uri) {
  return dispatch => {
    fetch(uri).then((feed) => {
      dispatch(recieveItems(getItems(feed)));
    }, (error) => console.log(error));
  };
}


