import * as types from '../constants/action-types';

export default function menu(state={}, action) {
  switch(action.type){
    case types.INITIALIZE :
      state.keywords = action.keywords;
      state.activeKeyword = action.keywords[0].name;
      return Object.assign({}, {}, state);

    case types.SELECT_KEYWORD :
      state.activeKeyword = action.keyword;
      return Object.assign({}, {}, state);

    default:
      return state;
  }
}