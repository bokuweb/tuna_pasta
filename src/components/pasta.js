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
//const Dialog = Mui.Dialog;

export default class Pasta extends Component {
  constructor(props) {
    super(props);
    this.props.initialize();
    this.innerHeight = document.documentElement.clientHeight;
    window.onresize = () => {
      this.innerHeight = document.documentElement.clientHeight;
      this.forceUpdate();
    }
  }

  onSliderChange(e, value) {
    localStorage.setItem('threshold', ~~value);
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
    console.log("loading..")
    if (this.props.menu.keywords.length === 0) return;
    if (this.props.feed[this.props.menu.activeKeyword].isPageEnd) return;
    this.props.fetchFeed(this.props.feed, this.props.menu);
  }

  elementInfiniteLoad() {
    if (this.props.feed[this.props.menu.activeKeyword].isPageEnd) return;
    return  <div className="rect-spinner"></div>;
  }

  getCategoryStyle(category) {
    switch (category) {
      case 'テクノロジー' : return {'backgroundColor':'#1ABC9C'};
      default             : return {'backgroundColor':'#8E44AD'};
    }
  }

  onAdditionalKeywordSubmit(value) {
    this.props.addKeyword(this.props.menu.keywordInput);
    this.props.fetchFeed(this.props.feed, this.props.menu);
  }

  onClickKeyword(name) {
    this.props.selectKeyword(name);
    this.props.fetchFeed(this.props.feed, this.props.menu);
  }

  onKeywordRemoveButtonClick(name) {
    this.props.removeKeyword(name);
    this.props.fetchFeed(this.props.feed, this.props.menu);
  }

  getKeywordList() {
    console.dir(this.props.menu.keywords)
    return this.props.menu.keywords.map((keyword) => {
      const listClassName = keyword.name === this.props.menu.activeKeyword ? 'selected' : null;
      return (
        <li className={listClassName} key={keyword.name}>
          <span onClick={this.onClickKeyword.bind(this, keyword.name)}>
            <i className={"fa fa-" + keyword.icon} />
            {keyword.name}
          </span>
          <div className="remove" onClick={this.onKeywordRemoveButtonClick.bind(this, keyword.name)} >
            <i className={"fa fa-close"} />
          </div>
        </li>
      );
    });
  }

  render() {
    if (!this.props.feed.isInitialized)
      return <div className="rect-spinner"></div>;

    const feed = this.props.feed[this.props.menu.activeKeyword];

    let items;
    if (this.props.menu.keywords.length === 0)
      items = <div>まだ記事はありません。キーワードを追加してください。</div>;
    else {
      items = feed.items.map((item) => {
        const favicon = FAVICON_URI + encodeURIComponent(item.link);
        const hatebuHref = ENTRY_URI + encodeURIComponent(item.link);
        const hatebuImage = BOOKMARK_IMAGE_URI + item.link;
        return (
            <div className="item animated fadeIn" key={item.link + this.props.menu.activeKeyword}>
            <img className="favicon" src={favicon} alt="favicon" />
            <a href={item.link} className="item-title">{item.title}</a>
            <a href={hatebuHref} className="hatebu"><img src={hatebuImage} alt="" /></a><br />
            <span className="publish-date">{item.publishedDate}</span>
            <span className="category" style={this.getCategoryStyle(item.categories[0])}>
              {item.categories[0]}
            </span>
            <p className="content-snippet">{unescapeHTML(item.contentSnippet)}</p>
          </div>
        );
      });
    }
    // FIXME : 
    let x = this.props.menu.bookmarkFilterX - 24;
    if (x > 220) x = 220;
    if (x < 10) x = 10;
    // FIXME
    //let threshold = (localStorage.threshold) ? localStorage.threshold : 1;

    return (
      <div id="container">
        <div id="side-menu" className="animated slideInLeft">
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
                  onClick={this.onClickKeyword.bind(this, 'all')}>
                <i className={"fa fa-home"} />総合
              </li>
              <li className={this.props.menu.activeKeyword === 'favorite' ? 'selected' : ''}
                onClick={this.onClickKeyword.bind(this, 'favorite')}>
                <i className={"fa fa-heart"} />お気に入り
              </li>
              {this.getKeywordList()}
            </ul>
          </div>
        </div>
        <div id="content">
            <Infinite
              elementHeight={140}
              containerHeight={this.innerHeight-40}
              infiniteLoadBeginBottomOffset={50}
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



