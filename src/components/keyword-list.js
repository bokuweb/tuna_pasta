import React, { Component } from 'react';

export default class KeywordList extends Component {
  constructor(props) {
    super(props);
  }

  onSelect(name) {
    this.props.onSelect(name);
  }

  onRemove(name) {
    this.props.onRemove(name);
  }

  getKeywordList() {
    const {activeKeyword, keywords} = this.props;
    return keywords.map((keyword) => {
      const listClassName = keyword.name === activeKeyword ? 'keywords__list keywords__list--selected' : 'keywords__list';
      return (
        <li className={listClassName} key={keyword.name}>
          <div className="keywords__keyword" onClick={this.onSelect.bind(this, keyword.name)}>
            <i className={"keywords__icon fa fa-" + keyword.icon} />
            <span className="keywords__name">{keyword.name}</span>
          </div>
          <div className="keywords__remove" onClick={this.onRemove.bind(this, keyword.name)} >
            <i className={"keywords__icon fa fa-close"} />
          </div>
        </li>
      );
    });
  }

  render() {
    const {activeKeyword} = this.props;
    return (
      <div className="keywords" id="menu">
        <ul className="keywords__ul">
          <li className={activeKeyword === 'all' ? 'keywords__list keywords__list--selected' : 'keywords__list'}>
            <div  className="keywords__keyword" onClick={this.onSelect.bind(this, 'all')}>
              <i className={"keywords__icon fa fa-home"} />
              <span className="keywords__name">総合</span>
            </div>
          </li>
          <li className={activeKeyword === 'favorite' ? 'keywords__list keywords__list--selected' : 'keywords__list'} >
            <div  className="keywords__keyword" onClick={this.onSelect.bind(this, 'favorite')}>
              <i className={"keywords__icon fa fa-heart"} />
              <span className="keywords__name">お気に入り</span>
            </div>
          </li>
         {this.getKeywordList()}
       </ul>
     </div>
    );
  }
}


