import assert from 'power-assert';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Comments from '../../src/components/comments';

describe('Comments Component test', () => {
  it ('Should comment component have expected DOM', (done) => {
    const item = {
      comments : [
        {user:'user0', comment:'test comment 0'},
        {user:'user1', comment:'test comment 1'},
        {user:'user2', comment:'test comment 2'}
      ]
    }
    const comments = TestUtils.renderIntoDocument(<Comments item={item} />);
    const links = TestUtils.scryRenderedDOMComponentsWithTag(comments, 'a');
    assert.equal(links.length, 3);
    assert.equal(links[0].href, 'http://b.hatena.ne.jp/user0');
    assert.equal(links[1].href, 'http://b.hatena.ne.jp/user1');
    assert.equal(links[2].href, 'http://b.hatena.ne.jp/user2');
    const images = TestUtils.scryRenderedDOMComponentsWithTag(comments, 'img');
    assert.equal(images.length, 3);
    assert.equal(images[0].src, 'http://n.hatena.com/user0/profile/image.gif?type=face&size=32');
    assert.equal(images[1].src, 'http://n.hatena.com/user1/profile/image.gif?type=face&size=32');
    assert.equal(images[2].src, 'http://n.hatena.com/user2/profile/image.gif?type=face&size=32');
    const spans = TestUtils.scryRenderedDOMComponentsWithTag(comments, 'span');
    assert.equal(spans.length, 3);
    assert.equal(spans[0].textContent, 'user0');
    assert.equal(spans[1].textContent, 'user1');
    assert.equal(spans[2].textContent, 'user2');
    const ps = TestUtils.scryRenderedDOMComponentsWithTag(comments, 'p');
    assert.equal(ps.length, 3);
    assert.equal(ps[0].textContent, 'test comment 0');
    assert.equal(ps[1].textContent, 'test comment 1');
    assert.equal(ps[2].textContent, 'test comment 2');
    done();
  });

  afterEach( done => {
    ReactDOM.unmountComponentAtNode(document.body);
    document.body.innerHTML = "";
    setTimeout(done);
  });

});
