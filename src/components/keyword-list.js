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
          <div onClick={this.onSelect.bind(this, keyword.name)}>
            <i className={"keywords__icon fa fa-" + keyword.icon} />
            {keyword.name}
          </div>
          <div className="remove" onClick={this.onRemove.bind(this, keyword.name)} >
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
          <li className={activeKeyword === 'all' ? 'keywords__list keywords__list--selected' : 'keywords__list'}
            onClick={this.onSelect.bind(this, 'all')}>
            <div><i className={"keywords__icon fa fa-home"} />総合</div>
         </li>
          <li className={activeKeyword === 'favorite' ? 'keywords__list keywords__list--selected' : 'keywords__list'}
           onClick={this.onSelect.bind(this, 'favorite')}>
           <div><i className={"keywords__icon fa fa-heart"} />お気に入り</div>
         </li>
         {this.getKeywordList()}
       </ul>
     </div>
    );
  }
}


