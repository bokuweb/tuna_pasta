import React, { Component } from 'react';
import Infinite from 'react-infinite';

export default class Pasta extends Component {
  componentDidMount() {
    this.props.fetchFeed('http://b.hatena.ne.jp/hotentry.rss');
  }

  render() {
    const items = this.props.items.map((item, index) => {
      return (
          <div>{item.title}</div>
      );
    });
    return (
      <div id="container">
        <div id="side-menu">
          a
        </div>
        <div id="content">
        <Infinite elementHeight={40}
             containerHeight={440}
             infiniteLoadBeginBottomOffset={200}
             //onInfiniteLoad={this.handleInfiniteLoad}
             //loadingSpinnerDelegate={this.elementInfiniteLoad()}
             //isInfiniteLoading={this.state.isInfiniteLoading}
             className="item"
            >
        {items}
      </Infinite>
        </div>
      </div>
    );
  }
}
