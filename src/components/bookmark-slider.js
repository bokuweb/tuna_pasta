import React, { Component } from 'react';
import Slider from 'material-ui/lib/slider';

export default class BookmarkSlider extends Component {
  constructor(props) {
    super(props);
  }

  onSliderChange(e, value) {
    this.props.changeBookmarkThreshold(~~value, e.clientX);
  }

  render() {
    let x = this.props.bookmarkFilterX - 24;
    x = (x > 210)? 210 : x;
    x = (x < 10)? 10 : x;
    return (
      <div className="slider">
       <div className="bookmark-filter" style={{left:x}}>
         <i className="icon-hatena" />
         {this.props.bookmarkFilter}
       </div>
       <Slider name="slider"
         defaultValue={this.props.defaultValue}
         onChange={this.onSliderChange.bind(this)}
         onDragStop={this.props.onSliderChanged}
         max={this.props.max}
         min={this.props.min} />
      </div>
    );
  }
}



