var db = require('../db');

module.exports.postCreate = function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var errors = [];
  if(!email) {
    errors.push('Name is not required');
  }
  
  if(!password) {
    errors.push('Password is not required');
  }
  else {
      if(password.length < 30) {
      errors.push('Password very easy || Length Password > 30 character');
      }
  }  

  
  res.locals.errors = errors;
  next();
}

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
  res.redirect('/user/'+user.id);
  
  next();
};