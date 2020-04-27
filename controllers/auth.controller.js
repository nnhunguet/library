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
  
    if(db.get('users').find({ id: user.id}).value().wrongLoginCount===4) {
    res.render('user/login', {
      errors: [
        'Wrong Hash Password'
      ]
    });
    return;
  }
var result = false;  
bcrypt.compare(password, user.password, function(err, result) {
    // result == true
  result = result;
  if(!result) {
    db.get('users').find({ id: user.id}).update('wrongLoginCount', n => n+1).write();
    console.log(user.wrongLoginCount)
    res.render('user/login', {
      errors: [
        'Wrong PassWord'
      ],
      value: email
    });
  } else {
      // db.get('users').find({ id: user.id}).update('wrongLoginCount', n => 0).write();
    console.log(1);
      res.cookie('userId', user.id, {
        signed: true
      });
      res.redirect('/transactions');
  }
});
  if(!result) {
    return;
  }
};