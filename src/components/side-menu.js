import React, { Component } from 'react';
import BookmarkSlider from './bookmark-slider';
import KeywordInput from './keyword-input';
import KeywordList from './keyword-list';

export default class SideMenu extends Component {
  constructor(props) {
    super(props);
  }

  onSliderChanged() {
    this.props.clearFeeds(this.props.menu);
    this.props.fetchFeed(this.props.feed, this.props.menu);
  }

  onKeywordInputChange(e) {
    this.props.changeKeywordInput(e.target.value);
  }

  onKeywordSubmit() {
    this.props.addKeyword(this.props.menu.keywordInput);
    this.props.fetchFeed(this.props.feed, this.props.menu);
  }

  onSelectKeyword(name) {
    this.props.selectKeyword(name);
    this.props.fetchFeed(this.props.feed, this.props.menu);
  }

  onKeywordRemove(name) {
    this.props.removeKeyword(name);
    this.props.fetchFeed(this.props.feed, this.props.menu);
  }

  onMenuButtonClick() {
    this.props.toggleMenu();
  }

  render() {
    return (
      <div
        className={(this.props.menu.isMenuOpen) ? "side-menu animated slideInLeft menu-open"
                                                : "side-menu animated slideInLeft menu-close"}>
        <img className="side-menu__logo" src="img/logo.png" alt="Pasta" />
        <BookmarkSlider
          max={250}
          min={1}
          defaultValue={1}
          bookmarkFilterX={this.props.menu.bookmarkFilterX}
          bookmarkFilter={this.props.menu.bookmarkFilter}
          changeBookmarkThreshold={this.props.changeBookmarkThreshold}
          onSliderChanged={this.onSliderChanged.bind(this)} />
        <KeywordInput
          value={this.props.menu.keywordInput}
          onInputChange={this.onKeywordInputChange.bind(this)}
          onSubmit={this.onKeywordSubmit.bind(this)} />
        <KeywordList
          activeKeyword={this.props.menu.activeKeyword}
          keywords={this.props.menu.keywords}
          onSelect={this.onSelectKeyword.bind(this)}
          onRemove={this.onKeywordRemove.bind(this)} />
       </div>
    );
  }
}



