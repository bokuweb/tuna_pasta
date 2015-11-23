import React, { Component } from 'react';

export default class Comments extends Component {
  constructor(props) {
    super(props);
  }

  getComments(item) {
    const notFoundMessage = <span className="comments__text--notfound">コメントがありませんでした</span>;
    if(item.comments === undefined || item.comments.length === 0) return notFoundMessage;
    return item.comments.map(comment => {
      return (
        <div className="comments__comment-box animated fadeIn" key={comment.user}>
          <div className="comments__comment">
            <a href={`http://b.hatena.ne.jp/${comment.user}`} target="blank">
              <img className="comments__avatar" src={`http://n.hatena.com/${comment.user}/profile/image.gif?type=face&size=32`} />
            </a>
             <span className="comments__user-name">{comment.user}</span>
          </div>
          <div className="comments__comment-balloon">
            <p>{comment.comment}</p>
          </div>
        </div>
      );
    });
  }
  render() {
    return (
      <div className={(this.props.item.isCommentOpen) ? "comments comments--open": "comments comments--close"}>
        {this.getComments(this.props.item)}
      </div>
    );
  }
}



