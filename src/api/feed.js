import jsonp from 'jsonp';

const GOOGLEAPI_URI = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&q=';

export function fetchWithGoogleFeedApi(url) {
  return new Promise((resolve, reject) => {
    jsonp(GOOGLEAPI_URI + encodeURIComponent(url), {}, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

export function fetch(url) {
  return new Promise((resolve, reject) => {
    jsonp(url, {}, (err, data) => {
      if (err) reject(err);
        resolve(data);
      });
  });
}

