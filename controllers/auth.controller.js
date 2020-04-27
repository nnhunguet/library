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
  
  var count = db.get('users').find({ id: user.id}).set('wrongLoginCount', n => n+1).value();
  
  var errors = [];
  if(!user) { 
    user.wrongLoginCount++;
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
  result = result;
  console.log(typeof result);
  console.log(result);
  if(!result) {
    user.wrongLoginCount++
    res.render('user/login', {
      errors: [
        'Wrong PassWord'
      ],
      value: email
    });
  } else {
      user.wrongLoginCount = 0 
      res.cookie('userId', user.id);
      res.redirect('/transactions');
  }
});
  if(!result) {
    return;
  }
};