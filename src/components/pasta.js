import React, { Component } from 'react';
import Infinite from 'react-infinite';
import _ from 'lodash';
import Header from './header';
import SideMenu from './side-menu';
import Comments from './comments';
import {unescapeHTML} from '../lib/utils';

const FAVICON_URI = 'http://cdn-ak.favicon.st-hatena.com/?url=';
const ENTRY_URI = 'http://b.hatena.ne.jp/entry/';
const BOOKMARK_IMAGE_URI = ENTRY_URI + 'image/';

export default class Pasta extends Component {
  constructor(props) {
    super(props);
    this.props.initialize();
    this.innerHeight = document.documentElement.clientHeight;
    window.onresize = () => {
      this.innerHeight = document.documentElement.clientHeight;
      this.forceUpdate();
    }

    setInterval(() => {
      if (!this.props.feed.isInitialized) return;
      // If the number of items is not enough to scroll, polling itmes by the following timer
      const feed = this.props.feed[this.props.menu.activeKeyword];
      const isLoadingNeeded = feed.items.length < 40 && !feed.isPageEnd && !feed.isInfiniteLoading;
      if (isLoadingNeeded && this.props.menu.activeKeyword !== 'all') {
        this.props.fetchFeed(this.props.feed, this.props.menu);
      }
      // FIXME
      let heightOfElements = feed.items.map((item, i) => {
        const el = document.getElementById(this.props.menu.activeKeyword + i);
        if (el) return el.clientHeight;
        else if (this.props.feed[this.props.menu.activeKeyword].heightOfElements[i])
          return this.props.feed[this.props.menu.activeKeyword].heightOfElements[i];
        else return 200;
      });

      if (feed.items.length === 0) heightOfElements = 200;
      if (!_.isEqual(this.props.feed[this.props.menu.activeKeyword].heightOfElements, heightOfElements)) {
        this.onChangeHeight(heightOfElements);
      }
    }, 1000);
  }

  onInfiniteLoad() {
    if (this.props.menu.keywords.length === 0) return;
    if (this.props.feed[this.props.menu.activeKeyword].isPageEnd) return;
    console.log("loading..");
    this.props.fetchFeed(this.props.feed, this.props.menu);
  }

  elementInfiniteLoad() {
    if (this.props.feed[this.props.menu.activeKeyword].isPageEnd) return;
    return  <div className="rect-spinner"></div>;
  }

  onFavoriteClick(item) {
    if (item.isFavorited)
      this.props.removeFavorite(item, this.props.menu.bookmarkFilter);
    else
      this.props.addFavorite(item, this.props.menu.bookmarkFilter);
  }

  onCommentClick(item) {
    if (item.isCommentOpen)
      this.props.closeComment(item, this.props.menu.activeKeyword);
    else
      this.props.openComment(item, this.props.menu.activeKeyword);
  }

  onChangeHeight(heightOfElements) {
    this.props.changeElementHeight(heightOfElements, this.props.menu.activeKeyword);
  }
  getCategories(categories) {
    return categories.map((category) => {
      return (
        <span className="category"
              key={category + this.props.menu.activeKeyword }
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
    if (!this.props.feed.isInitialized) return <div className="rect-spinner"></div>;
    const feed = this.props.feed[this.props.menu.activeKeyword];
    let items = null;
    if (this.props.menu.keywords.length === 0)
      items = <div>まだ記事はありません。キーワードを追加してください。</div>;
    else if (feed.items.length === 0 && feed.isPageEnd) {
      items = <div>記事が見つかりませんでした。</div>; 
    } else {
      items = feed.items.map((item, i) => {
        const favicon = FAVICON_URI + encodeURIComponent(item.link);
        const hatebuHref = ENTRY_URI + encodeURIComponent(item.link);
        const hatebuImage = BOOKMARK_IMAGE_URI + item.link;
        const favoriteButtonClass = item.isFavorited? "favorite-button favorited" : "favorite-button";

        return (
          <div id={this.props.menu.activeKeyword + i} className="item animated fadeIn" key={item.link + this.props.menu.activeKeyword + i}>
            <img className="favicon" src={favicon} alt="favicon" />
            <a href={item.link} target="blank" className="item-title">{item.title}</a>
            <a href={hatebuHref} className="hatebu"><img src={hatebuImage} alt="" /></a><br />
            <span className="publish-date">{item.publishedDate}</span>
            {this.getCategories(item.categories)}
            <p className="content-snippet">{unescapeHTML(item.contentSnippet)}</p>
            <div className={favoriteButtonClass} onClick={this.onFavoriteClick.bind(this, item)}>
              <i className="fa fa-heart" />お気に入り
            </div>
            {this.getCommentButton(item)}
            <div className={(item.isCommentOpen) ? "comment-box comment-box-open": "comment-box comment-box-close"}>
            <Comments item={item} />
            </div>
          </div>
        );
      });
    }
    return (
      <div id="container">
        <Header
          isMenuOpen={this.props.menu.isMenuOpen}
          toggleMenu={this.props.toggleMenu} />
        <SideMenu
          changeBookmarkThreshold = {this.props.changeBookmarkThreshold}
          clearFeeds={this.props.clearFeeds}
          fetchFeed={this.props.fetchFeed}
          changeKeywordInput={this.props.changeKeywordInput}
          addKeyword={this.props.addKeyword}
          selectKeyword={this.props.selectKeyword}
          removeKeyword={this.props.removeKeyword}
          toggleMenu={this.props.toggleMenu}
          feed={this.props.feed}
          menu={this.props.menu}
        />
        <div id="content">
            <Infinite
              elementHeight={this.props.feed[this.props.menu.activeKeyword].heightOfElements}
              containerHeight={this.innerHeight-40}
              infiniteLoadBeginBottomOffset={100}
              onInfiniteLoad={this.onInfiniteLoad.bind(this)}
              loadingSpinnerDelegate={this.elementInfiniteLoad()}
              isInfiniteLoading={feed.isInfiniteLoading}
              className={'items'}>
                {items}
            </Infinite>
        </div>
      </div>
    );
  }
}



