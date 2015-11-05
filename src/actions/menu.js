import * as types from '../constants/action-types';
import DbManager from '../lib/db'

const db = new DbManager();

export function selectKeyword(keyword) {
  return {
    type: types.SELECT_KEYWORD,
    keyword
  };
}

export function changeBookmarkThreshold(value, x) {
  return {
    type: types.CHANGE_BOOKMARK_FILTER,
    value,
    x
  };
}

export function addKeyword(keyword) {
  return dispatch => {
    if (keyword === '') return;
    db.put('keywords', {name: keyword, enable: 1, icon:'tag'})
      .then(() => {
        db.getArray('keywords').then((keywords) => {
          dispatch({
            type: types.ADD_KEYWORD,
            keywords,
            keyword
          });
        });
      });
  }
}

export function removeKeyword(keyword) {
  return dispatch => {
    if (!keyword) return;
    db.remove('keywords', keyword)
      .then(() => {
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

