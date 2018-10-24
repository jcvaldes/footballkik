'use strict'

module.exports = function() {
  return {
    SetRouting: function(router) {
      router.get('/dashboard', this.adminPage);
    },
    adminPage: function(req, res) {
      return res.render('admin/dashboard');
    },
  }
}