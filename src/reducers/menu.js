import * as types from '../constants/action-types';
import _ from 'lodash';

export default function menu(state={}, action) {
  switch(action.type){
    case types.INITIALIZE :
      state.keywords = action.keywords;
      state.activeKeyword = action.keywords[0].name;
      return state;

    case types.SELECT_KEYWORD :
      state.activeKeyword = action.keyword;
      return state;

    default:
      return state;
  }
}
