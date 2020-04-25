var db = require('../db');
var shortid = require('shortid');

module.exports.index = function(req, res) {
  res.render('transaction/index');
}

module.exports.create = function(req, res) {
  var users = db.get('users').value();
  var books = db.get('books').value();
  res.render('transaction/create', {
    users: users,
    books: books
  });
}

module.exports.postCreate = function(req, res) {
  console.log(req.body);
  res.redirect('/');
}