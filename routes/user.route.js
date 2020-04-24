var express = require('express');
var router = express.Router();

var db = require('../db');

router.get('/', function(req, res) {
  res.render('user/index')
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
  res.redirect('/index')
})

module.exports = router