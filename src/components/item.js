import React, { Component } from 'react';
import Comments from './comments';
import _ from 'lodash';
import {unescapeHTML} from '../lib/utils';

const FAVICON_URI = 'http://cdn-ak.favicon.st-hatena.com/?url=';
const ENTRY_URI = 'http://b.hatena.ne.jp/entry/';
const BOOKMARK_IMAGE_URI = ENTRY_URI + 'image/';

export default class item extends Component {
  constructor(props) {
    super(props);
  }

  onFavoriteClick(item) {
    console.dir(item);
    if (item.isFavorited)
      this.props.removeFavorite(item, this.props.bookmarkFilter);
    else
      this.props.addFavorite(item, this.props.bookmarkFilter);
  }

  onCommentClick(item) {
    if (item.isCommentOpen)
      this.props.closeComment(item, this.props.activeKeyword);
    else
      this.props.openComment(item, this.props.activeKeyword);
  }

  getCategories(categories) {
    return categories.map((category) => {
      return (
        <span className="item__category"
              key={category + this.props.activeKeyword }
              style={{'backgroundColor':'#1ABC9C'}}>
          {category}
        </span>);
    });
  }

  getCommentButton(item) {
    const icon = item.isCommentFetching? "fa fa-spinner fa-spin" : "fa fa-commenting";
    const text = item.isCommentOpen? "コメントを閉じる" : "コメントを見る";
    return (
      <div className="comment-button" onClick={this.onCommentClick.bind(this, item)}>
        <i className={icon} />{text}
      </div>
    );
  }

  render() {
    const {item, activeKeyword, id} = this.props;
    const favicon = FAVICON_URI + encodeURIComponent(item.link);
    const hatebuHref = ENTRY_URI + encodeURIComponent(item.link);
    const hatebuImage = BOOKMARK_IMAGE_URI + item.link;
    const favoriteButtonClass = item.isFavorited? "favorite-button favorited" : "favorite-button";
    return (
      <div id={id} className="item animated fadeIn">
        <img className="item__favicon" src={favicon} alt="favicon" />
        <a href={item.link} target="blank" className="item__title">{item.title}</a>
        <a href={hatebuHref} className="item__hatebu--link">
          <img src={hatebuImage} alt="" className="item__hatebu--image" />
        </a><br />
        <span className="item__publish-date">{item.publishedDate}</span>
        {this.getCategories(item.categories)}<br />
        <p className="item__content-snippet">{unescapeHTML(item.contentSnippet)}</p>
        <div className={favoriteButtonClass} onClick={this.onFavoriteClick.bind(this, item)}>
          <i className="item__button--favorite fa fa-heart" />お気に入り
        </div>
        {this.getCommentButton(item)}
        <div className={(item.isCommentOpen) ? "comment-box comment-box-open": "comment-box comment-box-close"}>
        <Comments item={item} />
        </div>
      </div>
    );
  }
}



