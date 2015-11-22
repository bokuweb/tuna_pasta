import assert from 'power-assert';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import KeywordList from '../../src/components/keyword-list';


const keywords = [
  {name: 'react', tag: 'tag'},
  {name: 'redux', tag: 'tag'}
];

describe('KeywordList Component test', () => {
  it ('Should display correct keyword list', (done) => {
    const keywordList = TestUtils.renderIntoDocument(
        <KeywordList activeKeyword={'react'} keywords={keywords}/>);
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

  it ('Should call onSelect handler when click keyword', (done) => {
    const keywordList = TestUtils.renderIntoDocument(
        <KeywordList activeKeyword={'react'} keywords={keywords}/>);
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
