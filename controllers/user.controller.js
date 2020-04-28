var cloudinary = require('cloudinary').v2;

var db = require('../db');
var shortid = require('shortid');
const bcrypt = require('bcrypt');
const saltRounds = 10;



module.exports.index = function(req, res) {
  res.render('user/index');
};

module.exports.create = function(req, res) {
  res.render('user/create')
};

module.exports.postCreate = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var id = shortid.generate();
  
  var errors = res.locals.errors;
  
  if(errors.length > 0) {
    res.render('user/create', {
      errors: errors,
      value: email
    })
    return;
  }
  
  bcrypt.hash(password, saltRounds, function(err, hash) {
      // Store hash in your password DB.
    var hash = hash;
      var newUser = {
      id: id,
      email: email,
      password: hash,
      wrongLoginCount: 0,
      avatar: 'https://api.adorable.io/avatars/285/abott@adorable.png'
    };
    db.get('users').push(newUser).write();
  });
    res.redirect('/user/login');
}; 

module.exports.profile = function(req, res) {
  var id = req.params.id;
  console.log(id);
  console.log(db.get('users').value());
  var user = db.get('users').find( {id: id} ).value();
  console.log(user);
  res.render('user/profile', {
    user: user
  });
};

module.exports.postUpdate = function(req, res) {
  console.log(req);
}


