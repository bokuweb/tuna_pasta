import React, { Component } from 'react';

export default class ButtonFavorite extends Component {
  constructor(props) {
    super(props);
  }

  onFavoriteClick(item) {
    if (item.isFavorited)
      this.props.removeFavorite(item, this.props.bookmarkFilter);
    else
      this.props.addFavorite(item, this.props.bookmarkFilter);
  }

  render() {
    const {item} = this.props;
    const favoriteButtonClass = item.isFavorited ? "item__button--favorite item__button--favorited"
                                                 : "item__button--favorite";
    return (
      <div className={favoriteButtonClass} onClick={this.onFavoriteClick.bind(this, item)}>
        <i className="item__icon--favorite fa fa-heart" />お気に入り
      </div>
    );
  }
}
