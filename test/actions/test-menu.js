import assert from 'power-assert';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import * as actions from '../../src/actions/menu';
import * as types from '../.../src/constants/action-types';

describe('Menu Action test', () => {
  it ('should create an action to select keyword', (done) => {
    const keyword = 'react';
    const expectedAction = {
      type: types.SELECT_KEYWORD,
      keyword
    }
    assert.equal(actions.selectKeyword(keyword), expectedAction);
    done();
  });

  it ('should create an action to change keyword input', (done) => {
    const value = 'react';
    const expectedAction = {
      type: types.CHANGE_KEYWORD_INPUT,
      value
    }
    assert.equal(actions.changeKeywordInput(value), expectedAction);
    done();
  });

});
