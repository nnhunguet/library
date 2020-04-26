var db = require('../db');


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
  
  if(password !== user.password) {
    res.render('user/login', {
      errors: [
        'Wrong PassWord'
      ],
      value: email
    });
    return;
  }
  
  res.cookie('userId', user.id);
  console.log(req.cookies);
  res.redirect('/book');
};