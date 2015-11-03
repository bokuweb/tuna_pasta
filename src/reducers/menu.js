import * as types from '../constants/action-types';

export default function menu(state={}, action) {
  switch(action.type){
    case types.INITIALIZE :
      state.keywords = action.keywords;
      state.activeKeyword = action.keywords[0].name;
      state.bookmarkFilter = 1;
      state.bookmarkFilterX = 15;
      return Object.assign({}, state);

    case types.SELECT_KEYWORD :
      state.activeKeyword = action.keyword;
      return Object.assign({}, state);

    case types.CHANGE_BOOKMARK_FILTER :
      state.bookmarkFilter = action.value;
      state.bookmarkFilterX = action.x;
      return Object.assign({}, state);

    default:
      return state;
  }
}
