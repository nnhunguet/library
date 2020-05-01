var db = require('../db');

module.exports.addToCart = function(req, res) {
  var idBook = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;
  
  var count = db.get('sessions').find({id: sessionId}).get('cart.' + idBook, 0);
  
  db.get('sessions').find({id: sessionId})
  .set('cart.' + idBook, count + 1)
  .write();
  
  console.log(db.get('sessions').value());
  res.redirect('/book');

}
