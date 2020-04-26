var db = require('../db');
var shortid = require('shortid');

module.exports.index = function(req, res) {
  res.render('user/index');
};

module.exports.create = function(req, res) {
  res.render('user/create')
};

module.exports.postCreate = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var id = shortid.generate();
  
  var errors = res.locals.errors;
  
  if(errors.length > 0) {
    res.render('user/create', {
      errors: errors,
      value: email
    })
    return;
  }
  
  var newUser = {
    id: id,
    email: email,
    password: password
  };
  db.get('users').push(newUser).write();
  console.log(db.get('users').value());
  res.redirect('/user/login');
}; 

