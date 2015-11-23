import React, { Component } from 'react';
import Infinite from 'react-infinite';
import _ from 'lodash';
import Header from './header';
import SideMenu from './side-menu';
import Comments from './comments';
import Item from './item';
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

    // HACK: Adjust element height by interbal timer
    setInterval(() => {
      if (!this.props.feed.isInitialized) return;
      // If the number of items is not enough to scroll, polling itmes by the following timer
      const feed = this.props.feed[this.props.menu.activeKeyword];
      const isLoadingNeeded = feed.items.length < 40 && !feed.isPageEnd && !feed.isInfiniteLoading;
      if (isLoadingNeeded && this.props.menu.activeKeyword !== 'all') {
        this.props.fetchFeed(this.props.feed, this.props.menu);
      }
      let elementHeight = feed.items.map((item, i) => {
        const el = document.getElementById(this.props.menu.activeKeyword + i);
        if (el) return el.clientHeight;
        else if (feed.elementHeight[i]) return feed.elementHeight[i];
        else return 200;
      });
      if (feed.items.length === 0) elementHeight = 200;
      if (!_.isEqual(feed.elementHeight, elementHeight)) {
        this.onChangeHeight(elementHeight);
      }
    }, 200);
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

  onChangeHeight(elementHeight) {
    this.props.changeElementHeight(elementHeight, this.props.menu.activeKeyword);
  }

  getItems() {
    const keyword = this.props.menu.activeKeyword;
    const feed = this.props.feed[keyword];
    if (this.props.menu.keywords.length === 0) return <div>まだ記事はありません。キーワードを追加してください。</div>;
    else if (feed.items.length === 0 && feed.isPageEnd) return <div>記事が見つかりませんでした。</div>; 
    return feed.items.map((item, i) => {
      return (
        <Item
          activeKeyword={keyword}
          item={item}
          key={keyword + i}
          id={keyword + i}
          closeComment={this.props.closeComment}
          openComment={this.props.openComment}
          changeElementHeight={this.props.changeElementHeight}
          removeFavorite={this.props.removeFavorite}
          addFavorite={this.props.addFavorite}
          bookmarkFilter={this.props.menu.bookmarkFilter}
          isInitialized={this.props.feed.isInitialized}/>
      );
    });
  }

  render() {
    if (!this.props.feed.isInitialized) return <div className="rect-spinner"></div>;
    const feed = this.props.feed[this.props.menu.activeKeyword];
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
          keywordInput={this.props.menu.keywordInput}
          selectKeyword={this.props.selectKeyword}
          removeKeyword={this.props.removeKeyword}
          toggleMenu={this.props.toggleMenu}
          feed={this.props.feed}
          menu={this.props.menu} />
        <div id="content">
          <Infinite
            elementHeight={feed.elementHeight}
            containerHeight={this.innerHeight-40}
            infiniteLoadBeginBottomOffset={100}
            onInfiniteLoad={this.onInfiniteLoad.bind(this)}
            loadingSpinnerDelegate={this.elementInfiniteLoad()}
            isInfiniteLoading={feed.isInfiniteLoading}
            className={'items'}>
            {this.getItems()}
          </Infinite>
        </div>
      </div>
    );
  }
}



