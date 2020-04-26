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
  
  if(password.length < 30) {
    errors.push('Password very easy || Length Password > 30 character');
  }
  
  res.locals.errors = errors;
  next();
}