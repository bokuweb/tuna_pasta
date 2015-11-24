import React, { Component } from 'react';
import Comments from './comments';
import ButtonFavorite from './button-favorite';
import ButtonComment from './button-comment';
import _ from 'lodash';
import {unescapeHTML} from '../lib/utils';

const FAVICON_URI = 'http://cdn-ak.favicon.st-hatena.com/?url=';
const ENTRY_URI = 'http://b.hatena.ne.jp/entry/';
const BOOKMARK_IMAGE_URI = ENTRY_URI + 'image/';

export default class item extends Component {
  constructor(props) {
    super(props);
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

  render() {
    const {item, activeKeyword, id, bookmarkFilter} = this.props;
    const favicon = FAVICON_URI + encodeURIComponent(item.link);
    const hatebuHref = ENTRY_URI + encodeURIComponent(item.link);
    const hatebuImage = BOOKMARK_IMAGE_URI + item.link;
    return (
      <div id={id} className="item animated fadeIn">
        <img className="item__favicon" src={favicon} alt="favicon" />
        <a href={item.link} target="blank" className="item__title">{item.title}</a>
        <a href={hatebuHref} className="item__link--hatebu">
          <img src={hatebuImage} alt="" className="item__image--hatebu" />
        </a><br />
        <span className="item__publish-date">{item.publishedDate}</span>
        {this.getCategories(item.categories)}<br />
        <p className="item__content-snippet">{unescapeHTML(item.contentSnippet)}</p>
        <ButtonFavorite
          item={item}
          bookmarkFilter={bookmarkFilter}
          removeFavorite={this.props.removeFavorite}
          addFavorite={this.props.addFavorite} />
        <ButtonComment
          item={item}
          activeKeyword={activeKeyword}
          closeComment={this.props.closeComment}
          openComment={this.props.openComment} />
        <Comments item={item} />
      </div>
    );
  }
}



