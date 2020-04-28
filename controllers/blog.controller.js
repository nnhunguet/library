var db = require('../db');

module.exports.index = function(req, res) {
  var q = req.query;
  var blogs = db.get('blogs').value().slice((q-1)*8, q*8);
  res.render('blog/index', {
    blogs: blogs
  });
}