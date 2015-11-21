import assert from 'power-assert';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import KeywordList from '../../src/components/keyword-list';

describe('KeywordList Component test', () => {
  it ('Should display close icon, when menu open', (done) => {
    const keywordList = TestUtils.renderIntoDocument(
      <KeywordList activeKeyword={'react'}
                   keywords={[
                     {name: 'react', tag: 'tag'},
                     {name: 'redux', tag: 'tag'}
                   ]}/>);
    const list = TestUtils.scryRenderedDOMComponentsWithTag(keywordList, 'li');
    assert.equal(list[0].textContent, '総合');
    assert.equal(list[0].className, '');
    assert.equal(list[1].textContent, 'お気に入り');
    assert.equal(list[1].className, '');
    assert.equal(list[2].textContent, 'react');
    assert.equal(list[2].className, 'selected');
    assert.equal(list[3].textContent, 'redux');
    assert.equal(list[3].className, '');
    done();
  });

  afterEach( done => {
    ReactDOM.unmountComponentAtNode(document.body);
    document.body.innerHTML = "";
    setTimeout(done);
  });

});
