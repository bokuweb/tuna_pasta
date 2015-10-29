import React, { Component } from 'react';
import Infinite from 'react-infinite';


var i = 0

export default class Pasta extends Component {
  constructor(props) {
    super(props);
    this.props.fetchFeed('http://b.hatena.ne.jp/hotentry.rss');
    this.state = {
      isInfiniteLoading : false
    }
  }

  handleInfiniteLoad() {
    console.log("load");
    this.setState({isInfiniteLoading: true});
    setTimeout(() => {
      for(let j = 0; j < 100; j++)
        this.props.items.push({link:"a" + j, title:"hogasdasdasdasddase" + j});
      i++;
      this.setState({
        isInfiniteLoading: false,
      });
    }, 2500);

  }

  elementInfiniteLoad() {
    return <div className="infinite-list-item">
      Loading...
      </div>;
  }

  render() {
    const innerHeight = document.documentElement.clientHeight;
    const items = this.props.items.map((item) => {
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
          elementHeight={10}
          containerHeight={innerHeight}
          infiniteLoadBeginBottomOffset={500}
          onInfiniteLoad={this.handleInfiniteLoad.bind(this)}
          loadingSpinnerDelegate={this.elementInfiniteLoad()}
          isInfiniteLoading={this.state.isInfiniteLoading} >
        {items}
      </Infinite>
        </div>
      </div>
    );
  }
}
