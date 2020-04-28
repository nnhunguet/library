var db = require('../db');

module.exports.index = function(req, res) {
  var blogs = db.get('blogs').value();
  res.render('blog/index', {
    blogs: blogs
  });
}