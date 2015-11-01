import * as types from '../constants/action-types';
import _ from 'lodash';

export default function feed(state={}, action) {
  state.keyword = state.keyword || {name:'_technology', name_ja: 'テクノロジー'};
  switch(action.type){
    case types.INITIALIZE :
      for (let keyword of action.keywords) {
        state[keyword.name] = {
          page : 0,
          items : [],
          isPageEnd : false,
          isInfiniteLoading : false
        };
        state.isDefaultCategory = true;
      }
      return state;
    case types.SELECT_KEYWORD :
      state.keyword = action.keyword;
      state.isDefaultCategory = action.isDefault;
      return state;
    case types.RECIEVE_ITEMS :
      let items = action.items;
      if (state.isDefaultCategory) {
        items = _.filter(items, (item) => item.categories[0] === state.keyword.name_ja);
      }
      state[state.keyword.name].items = state[state.keyword.name].items.concat(items);
      state[state.keyword.name].isPageEnd = action.items.length === 0;
      state[state.keyword.name].page += 1;
      state[state.keyword.name].isInfiniteLoading = false;
      return state;
    case types.FETCHING_ITEMS :
      console.log(state.keyword.name);
      state[state.keyword.name].isInfiniteLoading = true;
      return state;
    default:
      return state;
  }
}
