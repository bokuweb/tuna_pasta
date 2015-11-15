import * as types from '../constants/action-types';
import _ from 'lodash';

function _createProps() {
  return {
    page : 0,
    items : [],
    isPageEnd : false,
    isInfiniteLoading : false,
    heightOfElements : 200
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
  let elementHeight;
  switch(action.type){
    case types.INITIALIZING :
      state.isInitialized = false;
      state.all = _createProps();
      state.favorite = _createProps();
      return Object.assign({}, state);

    case types.INITIALIZE_KEYWORD :
      for (let keyword of action.keywords) state[keyword.name] = _createProps();
      state.favorite.isPageEnd = true;
      state.favorite.isInfiniteLoading = false;
      state.isInitialized = true;
      return Object.assign({}, state);

    case types.INITIALIZE_FAVORITE :
      state.favorite.items = action.favorites;
      return Object.assign({}, state);

    case types.ADD_FAVORITE :
    if (action.item !== null) state.favorite.items.push(action.item);
    if (state.favorite.heightOfElements.length > 0)
      state.favorite.heightOfElements.push(200);
    else
      state.favorite.heightOfElements = 200;
      _updateAllByFavorite(state, state.favorite.items);
      return Object.assign({}, state);

  case types.REMOVE_FAVORITE :
      state.favorite.items.map((item, i) => {
        if (action.item.link === item.link) {
          state.favorite.items.splice( i , 1);
          if (state.favorite.heightOfElements.length > 0)
            state.favorite.heightOfElements.splice( i , 1);
        }
      });
      _updateAllByFavorite(state, state.favorite.items);
      return Object.assign({}, state);

    case types.FILTER_FAVORITE_ITEMS:
      state.favorite.items = action.items;
      return Object.assign({}, state);

    case types.RECIEVE_ITEMS :
      const items = _getItemsUpdatedByFavorite(action.items, state.favorite.items);
      const keyword = action.keyword;
      const heightOfElements = items.map(item => 200);
      if (heightOfElements.length > 0) {
        if (state.all.heightOfElements.length > 0)
          state.all.heightOfElements = state.all.heightOfElements.concat(heightOfElements);
        else
          state.all.heightOfElements = heightOfElements;
        if (state[keyword].heightOfElements.length > 0)
          state[keyword].heightOfElements = state[keyword].heightOfElements.concat(heightOfElements);
        else
          state[keyword].heightOfElements = heightOfElements;
      }
      state[keyword].isInfiniteLoading = false;
      if (items === null) {
        state[keyword].isPageEnd = true;
        return Object.assign({}, state);
      }
      state.all.items = state.all.items.concat(items);
      state[keyword].items = state[keyword].items.concat(items);
      state[keyword].isPageEnd = action.length === 0;
      state[keyword].page += 1;
      return Object.assign({}, state);

    case types.CLEAR_ITEMS :
      state.all = _createProps();
      for (let keyword of action.keywords) state[keyword.name] = _createProps();
      return Object.assign({}, state);

    case types.FETCHING_ITEMS :
      state[action.keyword].isInfiniteLoading = true;
      return Object.assign({}, state);

    case types.ADD_KEYWORD :
      state[action.keyword] = _createProps();
      return Object.assign({}, state);

    case types.REMOVE_KEYWORD :
      state.all = _createProps();
      return Object.assign({}, state);

    case types.FETCHING_COMMENT :
      state[action.keyword].items = _.map(state[action.keyword].items, item => {
        if (item.link === action.link) item.isCommentFetching = true;
        return item;
      });
      return Object.assign({}, state);

    case types.OPEN_COMMENT :
      state[action.keyword].items = _.map(state[action.keyword].items, item => {
        if (item.link === action.link) {
          item.isCommentFetching = false;
          item.isCommentOpen = true;
          item.comments = action.comments;
        }
        return item;
      });
      return Object.assign({}, state);

    case types.CLOSE_COMMENT :
      state[action.keyword].items = _.map(state[action.keyword].items, item => {
        if (item.link === action.link) item.isCommentOpen = false;
        return item;
      });
      return Object.assign({}, state);

    case types.CLOSE_COMMENT :
      state[action.keyword].items = _.map(state[action.keyword].items, item => {
        if (item.link === action.link) item.isCommentOpen = false;
        return item;
      });
      return Object.assign({}, state);

    case types.CHANGE_ELEMENT_HEIGHT :
      state[action.keyword].heightOfElements = action.heightOfElements;
      return Object.assign({}, state);

    default:
      return state;
  }
}
