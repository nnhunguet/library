function(req, res){
  var books = db.get('books').value();
  res.render('book/index', {
    books: books
  })
}