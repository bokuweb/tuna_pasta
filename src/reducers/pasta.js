import * as actions from '../actions/action';

export default function pasta(state={items:[]}, action) {
  switch(action.type){
    case actions.RECIEVE_ITEMS :
      const items = state.items.concat(action.items);
      return {items : items};
    default:
      return state;
  }
}
