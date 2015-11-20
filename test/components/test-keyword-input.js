import assert from 'power-assert';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import KeywordInput from '../../src/components/keyword-input';

describe('KeywordInput Component test', () => {
  it ('Should target value have "enter keyword input test" , onchange event', (done) => {
    let value;
    const handleInputChange = e => {
      assert.equal(e.target.value, 'enter keyword input test');
      done();
    }
    const  keywordInput = TestUtils.renderIntoDocument(<KeywordInput onInputChange={handleInputChange} value={value}/>);
    const input = TestUtils.scryRenderedDOMComponentsWithTag(keywordInput, 'input');
    TestUtils.Simulate.change(input[0], { target: { value: 'enter keyword input test' }});
  });

  it ('Should call handleOnclick when  click submit button', (done) => {
    const handleOnSubmit = e => {
      assert.ok(true, 'click event ok');
      done();
    }
    const  keywordInput = TestUtils.renderIntoDocument(<KeywordInput onSubmit={handleOnSubmit} />);
    const button = TestUtils.findRenderedDOMComponentWithTag(keywordInput, 'button');
    TestUtils.Simulate.click(ReactDOM.findDOMNode(button));
  });

  afterEach( done => {
    ReactDOM.unmountComponentAtNode(document.body);
    document.body.innerHTML = "";
    setTimeout(done);
  });

});
