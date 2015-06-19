var request = require('request');
var cheerio = require('cheerio');

module.exports = {

  urls: {
    wiki: 'http://en.wikipedia.org/w/api.php?format=xml&action=query&prop=extracts&exintro=1&continue=&redirects=&format=json&titles=',
    stackx: 'https://api.stackexchange.com/2.2/search/excerpts?order=desc&sort=votes&accepted=True&wiki=True&site=stackoverflow&pagesize=3&q='
  },

  scrapeWiki: function (phrase) {

    if (!phrase) {
      return;
    }

    var url    = this.urls.wiki + phrase.value + '|' + phrase.value.toUpperCase(),
        result = '';

    request(url, function (error, response, html) {
      if (!error) {

        var data    = JSON.parse(html),
            results = [];

        if (data.query && data.query.pages) {

          _.each(data.query.pages, function (page, key) {

            if (key != -1) {
              results.push(page);
            }
          });

          result = JSON.stringify(results);
        }

      }


      console.log('updating phrase "' + phrase.value + '" with wiki results: ' + result);
      Phrase.update(phrase.id, {wikiResult: result}, function () {});
    });
  },

  scrapeStackExchange: function (phrase) {

    if (!phrase) {
      return;
    }

    var url    = this.urls.stackx + phrase.value,
        result = '';

    request({url: url, gzip: true}, function (error, response, html) {

      if (!error) {

        var data    = JSON.parse(html),
            results = [];

        if (data.items && data.items.length) {

          _.each(data.items, function (item) {
            results.push(item);
          });

          result = JSON.stringify(results);
        }

      }


      console.log('updating phrase "' + phrase.value + '" with stack results: ' + result);
      Phrase.update(phrase.id, {stackResult: result}, function () {

      });
    });
  }
};
