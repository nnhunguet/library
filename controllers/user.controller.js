var db = require('../db');
var shortid = require('shortid');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.index = function(req, res) {
  console.log(1);
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: 'test@example.com',
        from: 'test@example.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      };
      sgMail.send(msg)
      .then(() => {}, error => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body)
        }
      });
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
    password: hash
  };
  db.get('users').push(newUser).write();
});
  
  console.log(db.get('users').value());
  res.redirect('/user/login');
}; 

