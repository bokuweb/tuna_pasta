import _ from 'lodash';
import * as types from '../constants/action-types';
import {categories} from '../constants/categories';

export function onSelectKeyword(keyword) {
  const keywordObj = _.filter(categories, (category) => category.name === keyword)[0];
  return {
    type: types.SELECT_KEYWORD,
    keyword : keywordObj,
    isDefault : true
  };
}
