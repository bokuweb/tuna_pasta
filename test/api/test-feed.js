import assert from 'power-assert';
import querystring from 'querystring';
import _ from 'lodash';
//import nock from 'nock';
import {fetch} from '../../src/api/feed';

const ENDPOINT = 'http://jsfiddle.net/echo/jsonp/';

const expectedObj = {
  hello: 'world'
};
const q = querystring.encode(expectedObj);

describe('Feed fetch lib test', () => {
  it ('Should render correct DOM', (done) => {
    const url = ENDPOINT + '?' + q;
    fetch(url).then((data) => {
      assert(_.isEqual(data, expectedObj));
      done();
    });
  });
});
