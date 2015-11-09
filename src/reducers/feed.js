import * as types from '../constants/action-types';
import _ from 'lodash';

function createProps() {
  return {
    page : 0,
    items : [],
    isPageEnd : false,
    isInfiniteLoading : false
  };
}

export default function feed(state={}, action) {
  switch(action.type){
    case types.INITIALIZING :
      return {isInitialized : false};

    case types.INITIALIZE_KEYWORD :
      console.log("initialized..");
      for (let keyword of action.keywords) {
        state[keyword.name] = createProps();
      }
      state.all = createProps();
      state.favorite = createProps();
      state.isInitialized = true;
      return Object.assign({}, state);

  case types.INITIALIZE_FAVORITE :
      state.favorite.items = action.favorites;
      return Object.assign({}, state);

    case types.ADD_FAVORITE :
      state.favorite.items = state.favorite.items.concat(action.favorites);
      state.favorite.isPageEnd = true;
      state.favorite.isInfiniteLoading = false;
      return Object.assign({}, state);

    case types.RECIEVE_ITEMS :
      const items = action.items;
      const keyword = action.keyword;
      if (items === null){
        // TODO: add retry times monitoring
        state[keyword].isPageEnd = false;
        state[keyword].isInfiniteLoading = false;
        return Object.assign({}, state);
      }
      state.all.items = state.all.items.concat(items);
      state[keyword].items = state[keyword].items.concat(items);
      state[keyword].isPageEnd = action.length === 0;
      state[keyword].page += 1;
      state[keyword].isInfiniteLoading = false;
      return Object.assign({}, state);

    case types.CLEAR_ITEMS :
      state.all.items = [];
      for (let keyword of action.keywords) {
        state[keyword.name] = createProps();
      }
      return Object.assign({}, state);

    case types.FETCHING_ITEMS :
      state[action.keyword].isInfiniteLoading = true;
      return Object.assign({}, state);

    case types.ADD_KEYWORD :
      state[action.keyword] = createProps();
      return Object.assign({}, state);

    case types.REMOVE_KEYWORD :
      state.all = createProps();
      return Object.assign({}, state);

    default:
      return state;
  }
}
