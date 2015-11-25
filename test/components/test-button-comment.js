import assert from 'power-assert';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Button from '../../src/components/button-comment';

describe('Comment Button Component test', () => {
  it ('Should button text is show comment, when not oepned', (done) => {
    const button = TestUtils.renderIntoDocument(<button item={isCommentOpen:false} />);
    const div = TestUtils.scryRenderedDOMComponentsWithTag(button, 'div');
    assert.equal(div[0].textContent, 'コメントを見る')
    done();
  });

  it ('Should button text is close comment, when oepned', (done) => {
    const button = TestUtils.renderIntoDocument(<button item={isCommentOpen:true} />);
    const div = TestUtils.scryRenderedDOMComponentsWithTag(button, 'div');
    assert.equal(div[0].textContent, 'コメントを閉じる')
    done();
  });

  it ('Should call open comment callback, when not opened', (done) => {
    const openComment = (item, activeKeyword) => {
      assert.equal(item.isCommentOpen, false);
      assert.equal(activeKeyword, "react");
      done();
    }
    const button = TestUtils.renderIntoDocument(<button item={isCommentOpen:false} openComment={openComment} activeKeyword={"react"}/>);
    const div = TestUtils.scryRenderedDOMComponentsWithTag(button, 'div');
    TestUtils.Simulate.click(ReactDOM.findDOMNode(div[0]));
  });

  it ('Should call close comment callback, when opened', (done) => {
    const closeComment = (item, activeKeyword) => {
      assert.equal(item.isCommentOpen, true);
      assert.equal(activeKeyword, "react");
      done();
    }
    const button = TestUtils.renderIntoDocument(<button item={isCommentOpen:false} openComment={openComment} activeKeyword={"react"}/>);
    const div = TestUtils.scryRenderedDOMComponentsWithTag(button, 'div');
    TestUtils.Simulate.click(ReactDOM.findDOMNode(div[0]));
  });

  afterEach( done => {
    ReactDOM.unmountComponentAtNode(document.body);
    document.body.innerHTML = "";
    setTimeout(done);
  });

});
