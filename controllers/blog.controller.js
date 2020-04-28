var db = require('../db');

module.exports.index = function(req, res) {
  var page = parseInt(req.query.page) || 1;
  console.log(typeof page);
  var blogs = db.get('blogs').value().slice((page-1)*8, page*8);
  res.render('blog/index', {
    blogs: blogs,
    page: page
  });
}