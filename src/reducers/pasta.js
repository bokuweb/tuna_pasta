import * as commentActions from '../actions/comment';

export default function comment(state={comments:[]}, action) {
  switch(action.type){
    case commentActions.SUBMIT_COMMENT:
      let comments = state.comments.concat([action.comment]);
      return {comments : comments};
    case commentActions.RECIEVE_COMMENTS:
     return {comments : action.comments};
    default:
      return state;
  }
}
