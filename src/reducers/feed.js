import * as types from '../constants/action-types';

export default function feed(state={items:[]}, action) {
  switch(action.type){
    case types.RECIEVE_ITEMS :
      const items = state.items.concat(action.items);
      return {items : items};
    default:
      return state;
  }
}
