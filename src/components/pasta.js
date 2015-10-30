import React, { Component } from 'react';
import Infinite from 'react-infinite';

const HATENA_SEARCH_URI = 'http://b.hatena.ne.jp/search/text?mode=rss&q='

export default class Pasta extends Component {
  constructor(props) {
    super(props);
    this.props.fetchFeed(HATENA_SEARCH_URI + '暮らし');
    this.innerHeight = document.documentElement.clientHeight;
    window.onresize = () => {
      this.innerHeight = document.documentElement.clientHeight;
      this.forceUpdate();
    }
  }
  onInfiniteLoad() {
    if (this.props.feed.isPageEnd) return;
    this.props.fetchFeed(HATENA_SEARCH_URI + 'Elixir' + '&of=' + this.props.feed.page * 40);
  }

  elementInfiniteLoad() {
    if (this.props.feed.isPageEnd) return;
    return (
      <div className="item">
        Loading...
      </div>
    );
  }

  render() {
    const items = this.props.feed.items.map((item) => {
      const favicon = 'http://cdn-ak.favicon.st-hatena.com/?url=' + encodeURIComponent(item.link);
      const hatebuHref = 'http://b.hatena.ne.jp/entry/' + encodeURIComponent(item.link);
      const hatebuImage = 'http://b.hatena.ne.jp/entry/image/' + item.link;
      return (
          <div className="item" key={item.link}>
            <img className="favicon" src={favicon} alt="" />
            <a href={item.link} className="item-title">{item.title}</a>
            <a href={hatebuHref} className="hatebu"><img src={hatebuImage} alt="" /></a><br />
            <span className="publish-date">{item.publishedDate}</span>
            <span className="category">{item.categories[0]}</span>
            <p className="content-snippet">{item.contentSnippet}</p>
          </div>
      );
    });
    return (
      <div id="container">
        <div id="side-menu">
          <img id="logo" src="img/logo.png" alt="" />
          <div id="menu">
            <ul>
              <li><i className="fa fa-home" />総合</li>
              <li><i className="fa fa-heart" />お気に入り</li>
              <li><i className="fa fa-database" />テクノロジー</li>
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
              isInfiniteLoading={this.props.feed.isInfiniteLoading}
              className={'items'}>
                {items}
            </Infinite>
        </div>
      </div>
    );
  }
}
