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
    assert.equal(list[0].className, 'keywords__list');
    assert.equal(list[1].textContent, 'お気に入り');
    assert.equal(list[1].className, 'keywords__list');
    assert.equal(list[2].textContent, 'react');
    assert.equal(list[2].className, 'keywords__list keywords__list--selected');
    assert.equal(list[3].textContent, 'redux');
    assert.equal(list[3].className, 'keywords__list');
    done();
  });

  it ('Should call onSelect handler width keyword name, when click keyword', (done) => {
    let index = 0;
    const expectedKeywords = ['all', 'favorite', 'react', 'redux'];
    const handleOnSelect = name => {
      assert.equal(name, expectedKeywords[index++]);
    };
    const keywordList = TestUtils.renderIntoDocument(
      <KeywordList activeKeyword={'react'} keywords={keywords} onSelect={handleOnSelect}/>);
    const keyword = TestUtils.scryRenderedDOMComponentsWithClass(keywordList, 'keywords__keyword');
    for (let i = 0; i < expectedKeywords.length; i++)
      TestUtils.Simulate.click(ReactDOM.findDOMNode(keyword[i]));
    done();
  });

  it ('Should call onRemove handler width keyword name, when click remove icon', (done) => {
    let index = 0;
    const expectedKeywords = ['react', 'redux'];
    const handleOnRemove = name => {
      assert.equal(name, expectedKeywords[index++]);
    };
    const keywordList = TestUtils.renderIntoDocument(
        <KeywordList activeKeyword={'react'} keywords={keywords} onRemove={handleOnRemove}/>);
    const keyword = TestUtils.scryRenderedDOMComponentsWithClass(keywordList, 'keywords__remove');
    for (let i = 0; i < expectedKeywords.length; i++)
      TestUtils.Simulate.click(ReactDOM.findDOMNode(keyword[i]));
    done();
  });

  afterEach( done => {
    ReactDOM.unmountComponentAtNode(document.body);
    document.body.innerHTML = "";
    setTimeout(done);
  });

});
