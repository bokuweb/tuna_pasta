import * as types from '../constants/action-types';
import {categories} from '../constants/categories';

export function onSelectKeyword(keyword) {
  console.log(keyword);
  return {
    type: types.SELECT_KEYWORD,
    keyword : keyword,
    isDefault : true
  };
}
