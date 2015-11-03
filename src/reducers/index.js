import { combineReducers } from 'redux';
import feed from './feed';
//import menu from './menu';

const rootReducer = combineReducers({
  feed,
  //menu
});

export default rootReducer;
