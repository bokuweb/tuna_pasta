import assert from 'power-assert';
import _ from 'lodash';
import menu from '../../src/reducers/menu';
import * as types from '../../src/constants/action-types';

describe('Menu Reducer test', () => {
  it ('should return the initial state', (done) => {
    assert(_.isEqual(menu(undefined, {}), {}));
    done();
  });

  it ('should return the initialized state', (done) => {
    const keywords = ["react", "redux"];
    const action = {
      type: types.INITIALIZE_KEYWORD,
      keywords
    }
    const expectedState = {
      keywords,
      activeKeyword : 'all',
      bookmarkFilter : 1,
      bookmarkFilterX : 15,
      keywordInput : '',
      isMenuOpen : false
    };
    assert(_.isEqual(menu({}, action), expectedState));
    done();
  });

  it ('should return the keyword selected state', (done) => {
    const keyword = "react";
    const keywords = ["react", "redux"];
    const action = {
      type: types.SELECT_KEYWORD,
      keyword
    }
    const state = {
      keywords,
      activeKeyword : 'all',
      bookmarkFilter : 1,
      bookmarkFilterX : 15,
      keywordInput : '',
      isMenuOpen : false
    }
    const expectedState = {
      keywords,
      activeKeyword : keyword,
      bookmarkFilter : 1,
      bookmarkFilterX : 15,
      keywordInput : '',
      isMenuOpen : false
    };
    assert(_.isEqual(menu(state, action), expectedState));
    done();
  });

  it ('should return the changed bookmarkFilter state', (done) => {
    const keywords = ["react", "redux"];
    const action = {
      type: types.CHANGE_BOOKMARK_FILTER,
      value : 100,
      x : 50
    }
    const state = {
      keywords,
      activeKeyword : 'all',
      bookmarkFilter : 1,
      bookmarkFilterX : 15,
      keywordInput : '',
      isMenuOpen : false
    }
    const expectedState = {
      keywords,
      activeKeyword : 'all',
      bookmarkFilter : 100,
      bookmarkFilterX : 50,
      keywordInput : '',
      isMenuOpen : false
    };
    assert(_.isEqual(menu(state, action), expectedState));
    done();
  });

});

