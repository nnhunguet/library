var express = require('express');
var router = express.Router();

var db = require('../db');
// var shortid = require('shortid');

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
})

router.get('/create', function(req, res) {
  res.render('user/create')
});

router.post('/create', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var id = db.get('users').value().length+1;
  var newUser = {
    id: id,
    email: email,
    password: password
  };
  db.get('users').push(newUser).write();
  console.log(db.get('users').value());
  res.redirect('/user/login');
})

router.get('/:id', function(req, res) {
  var id = req.params.id;
  var user = db.get('users').find( {id: parseInt(id)}).value();
  res.render('methodBook/index', {
    user: user
  });
});

router.get('/borrow/:id', function(req, res) {
  res.render('book/user/borrow', {
    books: db.get('books').value()
  })
})

module.exports = router