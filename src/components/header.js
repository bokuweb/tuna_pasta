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
      <div className="header">
        <img src="img/logo-blue.png" className="header__logo" />
          <i className={this.props.isMenuOpen ? "header__button--menu fa fa-close"
                                              : "header__button--menu fa fa-bars"}
             onClick={this.onMenuButtonClick.bind(this)} />
      </div>
    );
  }
}

