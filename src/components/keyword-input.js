import React, { Component } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

export default class KeywordInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="add-keyword">
        <input type="text"
          placeholder="キーワードを追加"
          onChange={this.props.onInputChange}
          value={this.props.value}/>
        <RaisedButton label="追加"
          onClick={this.props.onSubmit}
          secondary={true}
          style={{height: 26, minWidth: 40}}
          labelStyle={{fontSize: '12px', lineHeight: '24px'}} />
      </div>
    );
  }
}



