import * as types from '../constants/action-types';

export default function hoge(state={items:[]}, action) {
  state.items.push("a");
  return {items : state.items};
}

