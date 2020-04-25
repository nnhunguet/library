var express = require('express');
var router = express.Router();

var db = require('../db');

router.get('/', function(req, res) {
  res.render('user/index');
});

router.get('/login', function(req, res) {
  res.render('user/login');
});

router.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var user = db.get('users').find( {email: email} ).value();
  var errors = [];
  if(!user) { 
    errors.push('User not exit');
    res.redirect('')
  } else {
    if(password !== user.password) {
      errors.push('Wrong password');
    }
  }
  
  if(errors.length > 0) {
    res.redirect('/', {
      errors: errors
    })
  } else {
    res.render('methodBook/index');
  }
})

router.get('/create', function(req, res) {
  res.render('user/create')
});

router.post('/create', function(req, res) {
  var email = req.params.email;
  var password = req.params.password;
  var newUser = {
    email: email,
    password: password
  };
  db.get('users').push(newUser).write();
  res.redirect('/user/login')
})

module.exports = router