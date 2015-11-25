import * as types from '../constants/action-types';
import DbManager from '../lib/db'

const db = new DbManager('pastaDB');

export function selectKeyword(keyword) {
  return {
    type: types.SELECT_KEYWORD,
    keyword
  };
}

export function changeKeywordInput(value) {
  return {
    type: types.CHANGE_KEYWORD_INPUT,
    value
  };
}

export function changeBookmarkThreshold(value, x) {
  return {
    type: types.CHANGE_BOOKMARK_FILTER,
    value,
    x
  };
}

export function toggleMenu() {
  return {
    type: types.TOGGLE_MENU
  };
}

export function addKeyword(keyword) {
  return dispatch => {
    if (keyword === '') return;
    const id = /^id:(.*)/.exec(keyword.replace(/\s+/g, ""));
    let icon = (id === null)? 'tag' : 'user';
    db.put('keywords', {name: keyword, icon}).then(() => {
      db.getArray('keywords').then((keywords) => {
        dispatch({
          type: types.ADD_KEYWORD_COMPLETE,
          keywords
        });
      });
    });
    dispatch({type: types.ADD_KEYWORD, keyword});
  }
}

export function removeKeyword(keyword) {
  return dispatch => {
    db.remove('keywords', keyword).then(() => {
      db.getArray('keywords').then((keywords) => {
        dispatch({
          type: types.REMOVE_KEYWORD,
          keywords,
          keyword
        });
      });
    });
  }
}

