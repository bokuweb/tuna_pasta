import * as types from '../constants/action-types';
import DbManager from '../lib/db'

const db = new DbManager();

export function onSelectKeyword(keyword) {
  return {
    type: types.SELECT_KEYWORD,
    keyword
  };
}

export function onChangeBookmarkFilter(value, x) {
  return {
    type: types.CHANGE_BOOKMARK_FILTER,
    value,
    x
  };
}

export function onAdditionalKeywordSubmit(keyword) {
  return dispatch => {
    if (keyword !== '') {
      db.add('keywords', {name: keyword, enable: 1, icon:'tag'});
      db.getArray('keywords').then((keywords) => {
        dispatch({
          type: types.ADD_KEYWORD,
          keywords,
          keyword
        });
      });
    }
    dispatch({type: types.ADDING_KEYWORD});
  }
}
