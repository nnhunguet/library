module.exports.cookie = function(req, res, next) {
  if(req.cookies)  {
      var countCookie = {[req.cookies.cookie]: req.locals.cookie++};
      console.log(countCookie);
  }
  next();
}