import React, { Component } from 'react';
import Infinite from 'react-infinite';
import {categories} from '../constants/categories';

export default class Pasta extends Component {
  constructor(props) {
    super(props);
    this.props.initialize();
    this.props.fetchFeed(this.props.feed.keyword.name);
    this.innerHeight = document.documentElement.clientHeight;
    window.onresize = () => {
      this.innerHeight = document.documentElement.clientHeight;
      this.forceUpdate();
    }
  }
  onInfiniteLoad() {
    console.log("loading..")
    if (this.props.feed[this.props.feed.keyword.name].isPageEnd) return;
    this.props.fetchFeed(this.props.feed.keyword.name, this.props.feed[this.props.feed.keyword.name].page);
  }

  elementInfiniteLoad() {
    if (this.props.feed.isPageEnd) return;
    return (
      <div className="rect-spinner"></div>
    );
  }

  getCategoryStyle(category) {
    switch (category) {
      case 'テクノロジー' :
        return {'backgroundColor':'#1ABC9C'};
      default :
        return {'backgroundColor':'#8E44AD'};
    }
  }
  // FIXME:
  unescapeHTML(str) {
    let div = document.createElement("div");
    div.innerHTML = str.replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/ /g, "&nbsp;")
        .replace(/\r/g, "&#13;")
        .replace(/\n/g, "&#10;");
    return div.textContent || div.innerText;
  }

  onClickKeyword(name) {
    this.props.onSelectKeyword(name);
    this.props.fetchFeed(this.props.feed.keyword.name);
  }

  getKeywordList() {
    return categories.map((category) => {
      const listClassName = category.name === this.props.feed.keyword.name ? 'selected' : '';
      return (
          <li className={listClassName} key={category.name} onClick={this.onClickKeyword.bind(this, category.name)}>
          <i className={"fa fa-" + category.icon} />
          {category.name_ja}
        </li>
      );
    });
  }

  render() {
    const feed = this.props.feed[this.props.feed.keyword.name];
    const items = feed.items.map((item) => {
     const favicon = 'http://cdn-ak.favicon.st-hatena.com/?url=' + encodeURIComponent(item.link);
      const hatebuHref = 'http://b.hatena.ne.jp/entry/' + encodeURIComponent(item.link);
      const hatebuImage = 'http://b.hatena.ne.jp/entry/image/' + item.link;
      return (
          <div className="item" key={item.link}>
            <img className="favicon" src={favicon} alt="favicon" />
            <a href={item.link} className="item-title">{item.title}</a>
            <a href={hatebuHref} className="hatebu"><img src={hatebuImage} alt="" /></a><br />
            <span className="publish-date">{item.publishedDate}</span>
            <span className="category" style={this.getCategoryStyle(item.categories[0])}>{item.categories[0]}</span>
              <p className="content-snippet">{this.unescapeHTML(item.contentSnippet)}</p>
          </div>
      );
    });
    return (
      <div id="container">
        <div id="side-menu">
          <img id="logo" src="img/logo.png" alt="" />
          <div id="menu">
            <ul>

              {this.getKeywordList()}
              <li><i className="fa fa-plus-square"></i>キーワードの追加</li>
            </ul>
          </div>
        </div>
        <div id="content">
            <Infinite
              elementHeight={180}
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
