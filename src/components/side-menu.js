import React, { Component } from 'react';
import Mui from 'material-ui';
import BookmarkSlider from './bookmark-slider';

const TextField = Mui.TextField;
const RaisedButton = Mui.RaisedButton;

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

  onAdditionalKeywordSubmit(value) {
    this.props.addKeyword(this.props.keywordInput);
    this.props.fetchFeed(this.props.feed, this.props.menu);
  }

  onSelectKeyword(name) {
    this.props.selectKeyword(name);
    this.props.fetchFeed(this.props.feed, this.props.menu);
  }

  onKeywordRemoveButtonClick(name) {
    this.props.removeKeyword(name);
    this.props.fetchFeed(this.props.feed, this.props.menu);
  }

  onMenuButtonClick() {
    this.props.toggleMenu();
  }

  getKeywordList() {
    return this.props.menu.keywords.map((keyword) => {
      const listClassName = keyword.name === this.props.menu.activeKeyword ? 'selected' : null;
      return (
        <li className={listClassName} key={keyword.name}>
          <div onClick={this.onSelectKeyword.bind(this, keyword.name)}>
            <i className={"fa fa-" + keyword.icon} />
            {keyword.name}
          </div>
          <div className="remove" onClick={this.onKeywordRemoveButtonClick.bind(this, keyword.name)} >
            <i className={"fa fa-close"} />
          </div>
        </li>
      );
    });
  }

  render() {
    let x = this.props.menu.bookmarkFilterX - 24;
    if (x > 210) x = 210;
    if (x < 10) x = 10;
    return (
      <div id="side-menu"
        className={(this.props.menu.isMenuOpen) ? "animated slideInLeft menu-open" : "animated slideInLeft menu-close"}>
        <img id="logo" src="img/logo.png" alt="" />
        <BookmarkSlider
          max={250}
          min={1}
          defaultValue={1}
          bookmarkFilterX={this.props.menu.bookmarkFilterX}
          bookmarkFilter={this.props.menu.bookmarkFilter}
          changeBookmarkThreshold={this.props.changeBookmarkThreshold}
          onSliderChanged={this.onSliderChanged.bind(this)} />
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
                 onClick={this.onSelectKeyword.bind(this, 'all')}>
               <div><i className={"fa fa-home"} />総合</div>
             </li>
             <li className={this.props.menu.activeKeyword === 'favorite' ? 'selected' : ''}
               onClick={this.onSelectKeyword.bind(this, 'favorite')}>
               <div><i className={"fa fa-heart"} />お気に入り</div>
             </li>
             {this.getKeywordList()}
           </ul>
         </div>
       </div>
    );
  }
}



