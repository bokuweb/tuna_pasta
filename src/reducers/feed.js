import * as types from '../constants/action-types';
import {categories} from '../constants/categories';
import _ from 'lodash';

function getJpNameOfCategory(word) {
  return _.filter(categories, (category) => category.name === word)[0].name_ja;
}

export default function feed(state={}, action) {
  state.keyword = state.keyword || categories[0].name;
  switch(action.type){
    case types.INITIALIZE :
      for (let keyword of action.keywords) {
        state[keyword.name] = {
          page : 0,
          items : [],
          isPageEnd : false,
          isInfiniteLoading : true
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
        // FIXME : getter japanese category name
        items = _.filter(items, (item) => {
          const name_ja = getJpNameOfCategory(action.keyword);
          return item.categories[0] === name_ja;
        });
      }
      state._synthesis.items = state._synthesis.items.concat(action.items);
      state._synthesis.items = _.sortBy(state._synthesis.items, (item) => {
          return -(new Date(item.publishedDate).getTime());
      });
      state[action.keyword].items = state[action.keyword].items.concat(items);
      state[action.keyword].isPageEnd = action.items.length === 0;
      state[action.keyword].page += 1;
      state[action.keyword].isInfiniteLoading = false;
      return state;

    case types.FETCHING_ITEMS :
      state[action.keyword].isInfiniteLoading = true;
      return state;

    default:
      return state;
  }
}
