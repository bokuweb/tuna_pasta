import assert from 'power-assert';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Button from '../../src/components/button-favorite';

describe('Favorite Button Component test', () => {
  it ('Should button classname is item__button--favoritewhen not favorited', (done) => {
    const button = TestUtils.renderIntoDocument(<button item={isFavorited:false} />);
    const div = TestUtils.scryRenderedDOMComponentsWithTag(button, 'div');
    assert.equal(div[0].className, 'item__button--favorite')
    done();
  });

  it ('Should button classname is item__button--favorite item__button--favorited when favorited', (done) => {
    const button = TestUtils.renderIntoDocument(<button item={isFavorited:true} />);
    const div = TestUtils.scryRenderedDOMComponentsWithTag(button, 'div');
    assert.equal(div[0].className, 'item__button--favorite item__button--favorited')
    done();
  });


  it ('Should call add favorite callback, when not favorited', (done) => {
    const addFavorite = item => {
      assert.equal(item.isFavorited, false);
      done();
    }
    const button = TestUtils.renderIntoDocument(<button item={isFavorited:false} addFavorite={addFavorite}/>);
    const div = TestUtils.scryRenderedDOMComponentsWithTag(button, 'div');
    TestUtils.Simulate.click(ReactDOM.findDOMNode(div[0]));
  });

  it ('Should call remove favorite callback, when favorited', (done) => {
    const removeFavorite = item => {
      assert.equal(item.isFavorited, true);
      done();
    }
    const button = TestUtils.renderIntoDocument(<button item={isFavorited:true} removeFavorite={removeFavorite}/>);
    const div = TestUtils.scryRenderedDOMComponentsWithTag(button, 'div');
    TestUtils.Simulate.click(ReactDOM.findDOMNode(div[0]));
  });

  afterEach( done => {
    ReactDOM.unmountComponentAtNode(document.body);
    document.body.innerHTML = "";
    setTimeout(done);
  });

});
