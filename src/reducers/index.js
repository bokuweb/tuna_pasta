import { combineReducers } from 'redux';
import feed from './feed';
import hoge from './hoge';


const rootReducer = combineReducers({
  feed,
  hoge
});

export default rootReducer;
