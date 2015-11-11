import React, { Component } from 'react';
import Infinite from 'react-infinite';
import Mui from 'material-ui';
import {unescapeHTML} from '../lib/utils';

const FAVICON_URI = 'http://cdn-ak.favicon.st-hatena.com/?url=';
const ENTRY_URI = 'http://b.hatena.ne.jp/entry/';
const BOOKMARK_IMAGE_URI = ENTRY_URI + 'image/';
const TextField = Mui.TextField;
const Slider = Mui.Slider;
const RaisedButton = Mui.RaisedButton;

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
    }, 1000);
  }

  onSliderChange(e, value) {
    this.props.changeBookmarkThreshold(~~value, e.clientX);
  }

  onKeywordInputChange(e) {
    this.props.changeKeywordInput(e.target.value);
  }

  onSlideStop() {
    this.props.clearFeeds(this.props.menu);
    this.props.fetchFeed(this.props.feed, this.props.menu);
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
      this.props.removeFavorite(item);
    else
      this.props.addFavorite(item);
  }

  onCommentClick(item) {
    //if (item.isFavorited)
    this.props.openComment(item, this.props.menu.activeKeyword);
    //else
    //  this.props.addFavorite(item);
  }

  onAdditionalKeywordSubmit(value) {
    this.props.addKeyword(this.props.menu.keywordInput);
    this.props.fetchFeed(this.props.feed, this.props.menu);
  }

  onSelectKeyword(name) {
    this.props.selectKeyword(name);
    this.props.fetchFeed(this.props.feed, this.props.menu);
  }

  onKeywordRemoveButtonClick(name) {
    this.props.removeKeyword(name);
    this.props.fetchFeed(this.props.feed, this.props.menu);
  }

  onMenuButtonClick() {
    this.props.toggleMenu();
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

  getKeywordList() {
    return this.props.menu.keywords.map((keyword) => {
      const listClassName = keyword.name === this.props.menu.activeKeyword ? 'selected' : null;
      return (
        <li className={listClassName} key={keyword.name}>
          <div onClick={this.onSelectKeyword.bind(this, keyword.name)}>
            <i className={"fa fa-" + keyword.icon} />
            {keyword.name}
          </div>
          <div className="remove" onClick={this.onKeywordRemoveButtonClick.bind(this, keyword.name)} >
            <i className={"fa fa-close"} />
          </div>
        </li>
      );
    });
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
      items = feed.items.map((item) => {
        const favicon = FAVICON_URI + encodeURIComponent(item.link);
        const hatebuHref = ENTRY_URI + encodeURIComponent(item.link);
        const hatebuImage = BOOKMARK_IMAGE_URI + item.link;
        const favoriteButtonClass = item.isFavorited? "favorite-button favorited" : "favorite-button";
        return (
          <div className="item animated fadeIn" key={item.link + this.props.menu.activeKeyword}>
            <img className="favicon" src={favicon} alt="favicon" />
            <a href={item.link} target="blank" className="item-title">{item.title}</a>
            <a href={hatebuHref} className="hatebu"><img src={hatebuImage} alt="" /></a><br />
            <span className="publish-date">{item.publishedDate}</span>
            {this.getCategories(item.categories)}
            <p className="content-snippet">{unescapeHTML(item.contentSnippet)}</p>
            <div className={favoriteButtonClass} onClick={this.onFavoriteClick.bind(this, item)}>             <i className="fa fa-heart" />お気に入り
            </div>
            <div className="comment-button" onClick={this.onCommentClick.bind(this, item)}>             <i className="fa fa-commenting" />コメント
            </div>
          </div>
        );
      });
    }

    let x = this.props.menu.bookmarkFilterX - 24;
    if (x > 210) x = 210;
    if (x < 10) x = 10;
    console.log("menu open = " + this.props.menu.isMenuOpen);
    return (
      <div id="container">
        <div id="header">
          <img src="img/logo-blue.png" id="sp-logo" />
          <i className={this.props.menu.isMenuOpen? "fa fa-close" : "fa fa-bars"}
             id="menu-button"
             onClick={this.onMenuButtonClick.bind(this)}>
          </i>
        </div>
        <div id="side-menu" className={(this.props.menu.isMenuOpen) ? "animated slideInLeft menu-open" : "animated slideInLeft menu-close"}>
          <img id="logo" src="img/logo.png" alt="" />
          <div className="slider">
            <div className="bookmark-filter" style={{left:x}}>
              <i className="icon-hatena" />
              {this.props.menu.bookmarkFilter}
            </div>
            <Slider name="slider"
              defaultValue={1}
              onChange={this.onSliderChange.bind(this)}
              onDragStop={this.onSlideStop.bind(this)}
              max={250}
              min={1} />
          </div>
          <div className="add-keyword">
            <input type="text"
              placeholder="キーワードを追加"
              onChange={this.onKeywordInputChange.bind(this)}
              value={this.props.menu.keywordInput}/>
            <RaisedButton label="追加"
              onClick={this.onAdditionalKeywordSubmit.bind(this)}
              secondary={true}
              style={{height: 26, minWidth: 40}}
              labelStyle={{fontSize: '12px', lineHeight: '24px'}} />
          </div>
          <div id="menu">
            <ul>
              <li className={this.props.menu.activeKeyword === 'all' ? 'selected' : ''}
                  onClick={this.onSelectKeyword.bind(this, 'all')}>
                <div><i className={"fa fa-home"} />総合</div>
              </li>
              <li className={this.props.menu.activeKeyword === 'favorite' ? 'selected' : ''}
                onClick={this.onSelectKeyword.bind(this, 'favorite')}>
                <div><i className={"fa fa-heart"} />お気に入り</div>
                <span className="favorite-number">{this.props.feed.favorite.items.length}</span>
              </li>
              {this.getKeywordList()}
            </ul>
          </div>
        </div>
        <div id="content">
            <Infinite
              elementHeight={140}
              containerHeight={this.innerHeight-40}
              infiniteLoadBeginBottomOffset={this.innerHeight * 0.2}
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



