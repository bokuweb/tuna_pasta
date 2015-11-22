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
      const listClassName = keyword.name === activeKeyword ? 'selected' : '';
      return (
        <li className={listClassName} key={keyword.name}>
          <div onClick={this.onSelect.bind(this, keyword.name)}>
            <i className={"fa fa-" + keyword.icon} />
            {keyword.name}
          </div>
          <div className="remove" onClick={this.onRemove.bind(this, keyword.name)} >
            <i className={"fa fa-close"} />
          </div>
        </li>
      );
    });
  }

  render() {
    const {activeKeyword} = this.props;
    return (
      <div id="menu">
        <ul>
          <li className={activeKeyword === 'all' ? 'selected' : ''}
            onClick={this.onSelect.bind(this, 'all')}>
            <div><i className={"fa fa-home"} />総合</div>
         </li>
         <li className={activeKeyword === 'favorite' ? 'selected' : ''}
           onClick={this.onSelect.bind(this, 'favorite')}>
           <div><i className={"fa fa-heart"} />お気に入り</div>
         </li>
         {this.getKeywordList()}
       </ul>
     </div>
    );
  }
}


