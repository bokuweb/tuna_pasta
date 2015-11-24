import React, { Component } from 'react';

export default class ButtonComment extends Component {
  constructor(props) {
    super(props);
  }

  onCommentClick(item) {
    if (item.isCommentOpen)
      this.props.closeComment(item, this.props.activeKeyword);
    else
      this.props.openComment(item, this.props.activeKeyword);
  }

  render() {
    const {item} = this.props;
    const icon = item.isCommentFetching ? "item__icon--comment fa fa-spinner fa-spin"
                                        : "item__icon--comment fa fa-commenting";
    const text = item.isCommentOpen? "コメントを閉じる" : "コメントを見る";
    return (
      <div className="item__button--comment" onClick={this.onCommentClick.bind(this, item)}>
        <i className={icon} />{text}
      </div>
    );
  }
}
