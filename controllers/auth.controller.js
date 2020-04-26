var db = require('../db');


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
  
  res.cookie('userId', user.id);
  
  next();
};