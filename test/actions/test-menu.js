import assert from 'power-assert';
import React from 'react';
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import TestUtils from 'react-addons-test-utils';
import * as actions from '../../src/actions/menu';
import * as types from '../../src/constants/action-types';
import _ from 'lodash'
import DbManager from '../../src/lib/db'

const db = new DbManager('pastaDB');
const middlewares = [ thunk ]
db.create({keywords: "name, icon"});

/**
 * Creates a mock of Redux store with middleware.
 */
function mockStore(getState, expectedActions, done) {
  if (!Array.isArray(expectedActions)) {
    throw new Error('expectedActions should be an array of expected actions.')
  }
  if (typeof done !== 'undefined' && typeof done !== 'function') {
    throw new Error('done should either be undefined or function.')
  }

  function mockStoreWithoutMiddleware() {
    return {
      getState() {
        return typeof getState === 'function' ?
          getState() :
          getState
      },

      dispatch(action) {
        const expectedAction = expectedActions.shift()

        try {
          assert(_.isEqual(action,expectedAction));
          if (done && !expectedActions.length) {
            done()
          }
          return action
        } catch (e) {
          done(e)
        }
      }
    }
  }

  const mockStoreWithMiddleware = applyMiddleware(
    ...middlewares
  )(mockStoreWithoutMiddleware)

  return mockStoreWithMiddleware()
}

describe('Menu Action test', () => {
  it ('should create an action to select keyword', (done) => {
    const keyword = 'react';
    const expectedAction = {
      type: types.SELECT_KEYWORD,
      keyword
    }
    assert(_.isEqual(actions.selectKeyword(keyword), expectedAction));
    done();
  });

  it ('should create an action to change keyword input', (done) => {
    const value = 'react';
    const expectedAction = {
      type: types.CHANGE_KEYWORD_INPUT,
      value
    }
    assert(_.isEqual(actions.changeKeywordInput(value), expectedAction));
    done();
  });

  it ('should create an action to change bookmark filter', (done) => {
    const value = 250;
    const x = 100;
    const expectedAction = {
      type: types.CHANGE_BOOKMARK_FILTER,
      value,
      x
    }
    assert(_.isEqual(actions.changeBookmarkThreshold(value, x), expectedAction));
    done();
  });

  it ('should create an action to toggle menu', (done) => {
    const expectedAction = {
      type: types.TOGGLE_MENU
    }
    assert(_.isEqual(actions.toggleMenu(), expectedAction));
    done();
  });

  it ('should create an action to toggle menu', (done) => {
    const keyword = "react";
    const expectedActions = [
      { type: types.ADD_KEYWORD, keyword},
      // TODO: IndexedDB put callback not work
      //{ type: types.ADD_KEYWORD_COMPLETE, keywords: [keyword]}
    ];
    const store = mockStore({ keywords : [] }, expectedActions, done)
    store.dispatch(actions.addKeyword("react"));
  });

});
