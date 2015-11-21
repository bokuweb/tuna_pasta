import React, { Component } from 'react';

export default class Comments extends Component {
  constructor(props) {
    super(props);
  }

  getComments(item) {
    const notFoundMessage = <span className="comment-notfound">コメントがありませんでした</span>;
    if(item.comments === undefined || item.comments.length === 0) return notFoundMessage;
    return item.comments.map(comment => {
      return (
        <div className="question_Box animated fadeIn" key={comment.user}>
          <div className="question_image">
            <a href={`http://b.hatena.ne.jp/${comment.user}`} target="blank">
              <img className="comment-avatar" src={`http://n.hatena.com/${comment.user}/profile/image.gif?type=face&size=32`} />
            </a>
             <span className="comment-user">{comment.user}</span>
          </div>
          <div className="arrow_question">
            <p>{comment.comment}</p>
          </div>
        </div>
      );
    });
  }
  render() {
    return (
      <div>{this.getComments(this.props.item)}</div>
    );
  }
}



