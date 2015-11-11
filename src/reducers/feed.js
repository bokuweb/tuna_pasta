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

function _getItemsUpdatedByFavorite(items, favorites) {
  return _.map(items, (item) => {
    if (_.some(favorites, 'link', item.link)) item.isFavorited = true;
    else item.isFavorited = false;
    return item;
  });
}

// FIXME
function _updateAllByFavorite(state, favorites) {
  for (let name in state) {
    if(state[name].items !== undefined) {
      state[name].items = _getItemsUpdatedByFavorite(state[name].items, favorites)
    }
  }
}

export default function feed(state={}, action) {
  switch(action.type){
    case types.INITIALIZING :
      state.isInitialized = false;
      state.all = createProps();
      state.favorite = createProps();
      return Object.assign({}, state);

    case types.INITIALIZE_KEYWORD :
      for (let keyword of action.keywords) state[keyword.name] = createProps();
      state.favorite.isPageEnd = true;
      state.favorite.isInfiniteLoading = false;
      state.isInitialized = true;
      return Object.assign({}, state);

    case types.INITIALIZE_FAVORITE :
      state.favorite.items = action.favorites;
      return Object.assign({}, state);

    case types.ADD_FAVORITE :
      state.favorite.items = action.favorites;
      _updateAllByFavorite(state, action.favorites);
      return Object.assign({}, state);

    case types.REMOVE_FAVORITE :
      state.favorite.items = action.favorites;
      _updateAllByFavorite(state, action.favorites);
      return Object.assign({}, state);

    case types.FILTER_FAVORITE_ITEMS:
      state.favorite.items = action.items;
      return Object.assign({}, state);

    case types.RECIEVE_ITEMS :
      const items = _getItemsUpdatedByFavorite(action.items, state.favorite.items);
      const keyword = action.keyword;
      state[keyword].isInfiniteLoading = false;
      if (items === null) {
        state[keyword].isPageEnd = false;
        return Object.assign({}, state);
      }
      state.all.items = state.all.items.concat(items);
      state[keyword].items = state[keyword].items.concat(items);
      state[keyword].isPageEnd = action.length === 0;
      state[keyword].page += 1;
      return Object.assign({}, state);

    case types.CLEAR_ITEMS :
      state.all.items = [];
      for (let keyword of action.keywords) state[keyword.name] = createProps();
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
