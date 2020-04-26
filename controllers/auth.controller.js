var db = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.login = function(req, res) {
  res.render('user/login');
};

module.exports.postLogin = function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var user = db.get('users').find( {email: email} ).value();
  console.log(user);
  var errors = [];
  if(!user) { 
    res.render('user/login', {
      errors: [
        'User not exit'
      ],
      value: email
    });
    return;
  }
var result = false;  
bcrypt.compare(password, user.password, function(err, result) {
    // result == true
  var count = 1 ;
  count++;
  console.log(count);
  result = result;
  console.log(typeof result);
  console.log(result);
  if(!result) {
    res.render('user/login', {
      errors: [
        'Wrong PassWord'
      ],
      value: email
    });
  } else {
      res.cookie('userId', user.id);
    res.redirect('/transactions');
  }
});
  if(!result) {
    return;
  }
};