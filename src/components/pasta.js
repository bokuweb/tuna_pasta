import React, { Component } from 'react';

export default class Pasta extends Component {
  componentDidMount() {
    this.props.fetchFeed('http://b.hatena.ne.jp/hotentry.rss');
  }

  render() {
    const items = this.props.items.map((item, index) => {
      return (
          <div key={item.link}>{item.title}</div>
      );
    });
    return (
      <div id="container">
        <div id="side-menu">
          a
        </div>
        <div id="content">
          <div className="commentList">
            {items}
          </div>
        </div>
      </div>
    );
  }
}
