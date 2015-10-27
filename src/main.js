import jsonp from 'jsonp';

jsonp("https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&q=http://feeds.feedburner.com/hatena/b/hotentry", {}, (err, data) => {
  console.dir(data);
});
