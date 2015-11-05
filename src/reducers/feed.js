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

    case types.INITIALIZE :
      console.log("initialized..");
      for (let keyword of action.keywords) {
       state[keyword.name] = createProps();
      }
      state.all = createProps();
      state.favorite = createProps();
      state.isInitialized = true;
      return Object.assign({}, state);

    case types.RECIEVE_ITEMS :
      const items = action.items;
      const keyword = action.keyword;
      state.all.items = state.all.items.concat(items);
      state[keyword].items = state[keyword].items.concat(items);
      state[keyword].isPageEnd = items.length === 0;
      state[keyword].page += 1;
      state[keyword].isInfiniteLoading = false;
      console.log(state[keyword].isPageEnd);
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

    default:
      return state;
  }
}
