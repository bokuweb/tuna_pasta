import * as types from '../constants/action-types';

export default function menu(state={}, action) {
  switch(action.type){
    case types.INITIALIZE_KEYWORD :
      state.keywords = action.keywords;
      state.activeKeyword = 'all';
      state.bookmarkFilter = 1;
      state.bookmarkFilterX = 15;
      state.keywordInput = '';
      return Object.assign({}, state);

    case types.SELECT_KEYWORD :
      state.activeKeyword = action.keyword;
      return Object.assign({}, state);

    case types.CHANGE_BOOKMARK_FILTER :
      state.bookmarkFilter = action.value;
      state.bookmarkFilterX = action.x;
      return Object.assign({}, state);

    case types.CHANGE_KEYWORD_INPUT :
      state.keywordInput = action.value;
      return Object.assign({}, state);

    case types.ADD_KEYWORD :
      state.activeKeyword = action.keyword;
      state.keywordInput = '';
      return Object.assign({}, state);

    case types.ADD_KEYWORD_COMPLETE :
      state.keywords = action.keywords;
      return Object.assign({}, state);

  case types.REMOVE_KEYWORD :
      state.keywords = action.keywords;
      if (state.keywords.length === 0 || action.keyword === state.activeKeyword)
        state.activeKeyword = 'all'
      return Object.assign({}, state);

    default:
      return state;
  }
}
