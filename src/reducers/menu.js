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

    case types.ADD_KEYWORD :
      state.keywords = action.keywords;
      return Object.assign({}, state);

  case types.REMOVE_KEYWORD :
      state.keywords = action.keywords;
      if (state.keywords.length === 0)
        state.activeKeyword = 'all'
      else if (action.keyword === state.activeKeyword)
        state.activeKeyword = action.keywords[0].name;
      return Object.assign({}, state);

    default:
      return state;
  }
}
