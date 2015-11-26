import assert from 'power-assert';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Item from '../../src/components/item';

describe('Item Component test', () => {
  it ('Should render correct DOM', (done) => {
    const itemData = {
      "title": "Programming Phoenix - O'Reilly Media",
      "link": "http://shop.oreilly.com/product/9781680501452.do",
      "publishedDate": "Tue, 24 Nov 2015 06:38:16 -0800",
      "contentSnippet": "Don't accept the compromise between fast and beautiful: you can have it all. Phoenix creator Chris McCord, Elixir creator Jose ...",
      "categories": [
        "テクノロジー"
      ],
      "isFavorited": false
    }
    const item = TestUtils.renderIntoDocument(<Item item={itemData} />);
    const favicon = TestUtils.findRenderedDOMComponentWithClass(item, 'item__favicon');
    assert.equal(favicon.src, 'http://cdn-ak.favicon.st-hatena.com/?url=http%3A%2F%2Fshop.oreilly.com%2Fproduct%2F9781680501452.do');
    const link = TestUtils.findRenderedDOMComponentWithClass(item, 'item__link--hatebu');
    assert.equal(link.href, 'http://b.hatena.ne.jp/entry/http%3A%2F%2Fshop.oreilly.com%2Fproduct%2F9781680501452.do');
    const publishAt = TestUtils.findRenderedDOMComponentWithClass(item, 'item__publish-date');
    assert.equal(publishAt.textContent, "Tue, 24 Nov 2015 06:38:16 -0800");
    const content = TestUtils.findRenderedDOMComponentWithClass(item, 'item__content-snippet');
    assert.equal(content.textContent, "Don't accept the compromise between fast and beautiful: you can have it all. Phoenix creator Chris McCord, Elixir creator Jose ...");
    done();
  });

  afterEach( done => {
    ReactDOM.unmountComponentAtNode(document.body);
    document.body.innerHTML = "";
    setTimeout(done);
  });

});
