import assert from 'power-assert';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Item from '../../src/components/item';

describe('Item Component test', () => {
  it ('Should display close icon, when menu open', (done) => {
    //const header = TestUtils.renderIntoDocument(<Header isMenuOpen={true} />);
    //const icons = TestUtils.scryRenderedDOMComponentsWithTag(header, 'i');
    //assert(icons[0].className, 'fa fa-close')
    done();
  });

  afterEach( done => {
    ReactDOM.unmountComponentAtNode(document.body);
    document.body.innerHTML = "";
    setTimeout(done);
  });

});
