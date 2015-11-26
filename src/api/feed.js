import jsonp from 'jsonp';

export function fetch(url) {
  return new Promise((resolve, reject) => {
    jsonp(url, {}, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

