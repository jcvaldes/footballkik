'use strict'

module.exports = function(async, Club, _) {
  return {
    SetRouting: function(router) {
      router.get('/home', this.homePage);
    },
    homePage: function(req, res) {
      async.parallel([
        function(callback) {
          Club.find({}, (err, result) => {
            callback(err, result);
          })
        }
      ], (err, result) => {
        const res1 = result[0];
        res.render('home', { title: 'Footballkik - Home', data: res1 });
      })
    }
  }
}