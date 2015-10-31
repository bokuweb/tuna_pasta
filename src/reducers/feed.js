import * as types from '../constants/action-types';

export default function feed(state={items : [], page : 0, keyword : 'テクノロジー'}, action) {
  switch(action.type){
    case types.RECIEVE_ITEMS :
      const items = state.items.concat(action.items);
      const isPageEnd = action.items.length === 0;
      const page = state.page + 1;
      return {
        items,
        page,
        isPageEnd,
        isInfiniteLoading : false
      };
    case types.FETCHING_ITEMS :
      state.isInfiniteLoading = true;
      return state;
    default:
      return state;
  }
}
