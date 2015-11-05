import * as types from '../constants/action-types';

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

export function onAdditionalKeywordSubmit(value) {
  return {
    type: types.ADD_KEYWORD,
    value
  };
}
