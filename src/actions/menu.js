import _ from 'lodash';
import * as types from '../constants/action-types';

export function onSelectKeyword(keyword) {
  return {
    type: types.SELECT_KEYWORD,
    keyword,
    // FIXME
    //isDefault : true
  };
}
