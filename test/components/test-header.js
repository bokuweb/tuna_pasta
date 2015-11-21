import assert from 'power-assert';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Header from '../../src/components/header';

describe('Header Component test', () => {
  it ('Should display close icon, when menu open', (done) => {
    const header = TestUtils.renderIntoDocument(<Header isMenuOpen={true} />);
    const icons = TestUtils.scryRenderedDOMComponentsWithTag(header, 'i');
    assert(icons[0].className, 'fa fa-close')
    done();
  });

  it ('Should display bar icon, when menu close', (done) => {
    const header = TestUtils.renderIntoDocument(<Header isMenuOpen={false} />);
    const icons = TestUtils.scryRenderedDOMComponentsWithTag(header, 'i');
    assert(icons[0].className, 'fa fa-bar')
    done();
  });

  it ('Should call onclick callback, when icon clicked', (done) => {
    const handleOnClick = e => {
      assert.ok(true, 'click event ok');
      done();
    }
    const header = TestUtils.renderIntoDocument(<Header isMenuOpen={false} toggleMenu={handleOnClick}/>);
    const icons = TestUtils.scryRenderedDOMComponentsWithTag(header, 'i');
    TestUtils.Simulate.click(ReactDOM.findDOMNode(icons[0]));
  });

  afterEach( done => {
    ReactDOM.unmountComponentAtNode(document.body);
    document.body.innerHTML = "";
    setTimeout(done);
  });

});
