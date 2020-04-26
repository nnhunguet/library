var db = require('../db');
var shortid = require('shortid');

module.exports.index = function(req, res) {
  res.render('user/index');
};

module.exports.login = function(req, res) {
  res.render('user/login');
};

module.exports.postLogin = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var user = db.get('users').find( {email: email} ).value();
  var errors = [];
  if(!user) { 
    res.render('user/login', {
      errors: [
        'User not exit'
      ]
    })
    return;
  }
  
  if(password !== user.password) {
    res.render('user/login', {
      errors: [
        'Wrong PassWord'
      ]
    });
    return;
  }
  
  res.redirect('/user/'+user.id);
};

module.exports.create = function(req, res) {
  res.render('user/create')
};

module.exports.postCreate = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var id = shortid.generate();
  
  var values = {
    email: email,
    password: password
  }
  
  var errors = [];
  if(!email) {
    errors.push('Name is not required');
  }
  
  if(!password) {
    errors.push('Password very easy')
  }
  
  if(errors > 0) {
    res.render('/user/create', {
      errors: errors,
      values: values
    })
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
