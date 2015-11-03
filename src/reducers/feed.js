import * as types from '../constants/action-types';
import _ from 'lodash';

export default function feed(state={}, action) {
  switch(action.type){
    case types.INITIALIZING :
      return {isInitialized : false};

    case types.INITIALIZE :
      console.log("initialized..");
      const createProps = () => {
        return {
          page : 0,
          items : [],
          isPageEnd : false,
          isInfiniteLoading : false
        };
      }
      for (let keyword of action.keywords) {
       state[keyword.name] = createProps();
      }
      state.all = createProps();
      state.favorite = createProps();
      state.keywords = action.keywords;
      state.activeKeyword = action.keywords[0].name;
      state.isInitialized = true;
      return Object.assign({}, {}, state);

    case types.SELECT_KEYWORD :
      state.activeKeyword = action.keyword;
      return Object.assign({}, {}, state);

    case types.RECIEVE_ITEMS :
      const items = action.items;
      const keyword = action.keyword;
      state.all.items = state.all.items.concat(items);
      state[keyword].items = state[keyword].items.concat(items);
      state[keyword].isPageEnd = items.length === 0;
      state[keyword].page += 1;
      state[keyword].isInfiniteLoading = false;
      return Object.assign({}, {}, state);

    case types.FETCHING_ITEMS :
      state[action.keyword].isInfiniteLoading = true;
      return Object.assign({}, {}, state);

    default:
      return state;
  }
}
