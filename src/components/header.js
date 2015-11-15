import React, { Component } from 'react';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  onMenuButtonClick() {
    this.props.toggleMenu();
  }
  render() {
    return (
      <div id="header">
        <img src="img/logo-blue.png" id="sp-logo" />
        <i className={this.props.isMenuOpen? "fa fa-close" : "fa fa-bars"}
           id="menu-button"
           onClick={this.onMenuButtonClick.bind(this)} />
      </div>
    );
  }
}

