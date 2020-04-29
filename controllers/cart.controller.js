module.exports.addToCart = function(req, res) {
  var idBook = req.params.bookId;
  console.log(idBook);
  res.send('12345');
}