import * as types from '../constants/action-types';

export default function feed(state={keyword:'テクノロジー'}, action) {
  switch(action.type){
    case types.INITIALIZE :
      for (let keyword of action.keywords) {
        state[keyword.name] = {
          page : 0,
          items : [],
          isPageEnd : false,
          isInfiniteLoading : false
        };
      }
      return state;
    case types.RECIEVE_ITEMS :
      state[state.keyword].items = state[state.keyword].items.concat(action.items);
      state[state.keyword].isPageEnd = action.items.length === 0;
      state[state.keyword].page += 1;
      state[state.keyword].isInfiniteLoading = false;
      return state;
    case types.FETCHING_ITEMS :
      state[state.keyword].isInfiniteLoading = true;
      return state;
    default:
      return state;
  }
}
