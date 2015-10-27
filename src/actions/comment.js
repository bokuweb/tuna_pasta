export const SUBMIT_COMMENT   = 'SUBMIT_COMMENT'
export const RECIEVE_COMMENTS = 'RECIEVE_COMMENTS'

export function submitComment(comment) {
  return {
    type: SUBMIT_COMMENT,
    comment
  };
}

export function recieveComments(comments) {
  return {
    type: RECIEVE_COMMENTS,
    comments
  };
}

export function fetchComments() {
  return dispatch => {
    /*
    fetch("/api/comments")
      .then((comments) => {
        dispatch(recieveComments(comments.data));
      }).catch((error) => {
        console.error(error);
      });
    */
  };
}

export function saveComment(comment) {
  return dispatch => {
    /*
    dispatch(submitComment(comment));
    save("/api/comments", comment)
      .then((comment) => {
        console.log("save comment");
      }).catch((error) => {
        console.error(error);
      });
    */
  };
}
