import assert from 'power-assert';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import KeywordInput from '../../src/components/keyword-input';

describe('1st test', () => {
  it ('1st test', () => {
    const  keywordInput = TestUtils.renderIntoDocument(<KeywordInput />);
    //var button = TestUtils.findRenderedDOMComponentWithTag(detachedComp, 'button')
    //var buttonNode = React.findDOMNode(button)
    //should.exist(buttonNode)
    //TestUtils.Simulate.click(buttonNode)
    assert(1 === 1);
  });
});
