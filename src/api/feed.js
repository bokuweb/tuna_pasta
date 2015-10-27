import jsonp from 'jsonp';

const GOOGLEAPI_URI = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&q=';

export function fetch(feed_uri) {
  jsonp(GOOGLEAPI_URI + feed_uri, {}, (err, data) => {
    console.dir(data);
  });
}
