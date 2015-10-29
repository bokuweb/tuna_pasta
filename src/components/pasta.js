import React, { Component } from 'react';
import Infinite from 'react-infinite';

const HATENA_SEARCH_URI = 'http://b.hatena.ne.jp/search/text?mode=rss&q='

export default class Pasta extends Component {
  constructor(props) {
    super(props);
    this.props.fetchFeed(HATENA_SEARCH_URI + 'Elixir');
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
    const innerHeight = document.documentElement.clientHeight;
    const items = this.props.feed.items.map((item) => {
      return (
          <div className="item" key={item.link}>{item.title}</div>
      );
    });
    return (
      <div id="container">
        <div id="side-menu">
          a
        </div>
        <div id="content">
            <Infinite
              elementHeight={40}
              containerHeight={innerHeight-40}
              infiniteLoadBeginBottomOffset={100}
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
