var express = require('express')
var router = express.Router()

var db = require('../db.js');

router.get('/', function(req, res){
  var books = db.get('books').value();
  res.render('books', {
    books: books
  })
});

router.get('/search', function(req, res) {
  var searchBooks = db.get('books').value().map(function(book) {
    return book.title
  }); 
  res.render('books', {
    book: searchBooks
  })
})

router.get('/delete/:id', function(req, res){
  var id = parseInt(req.params.id);
  db.get('books').remove({id: id}).write();
  res.redirect('/books');
})

router.get('/update/:id', function(req, res){
  var id = parseInt(req.params.id);
  var book = db.get('books').find({id: id}).value();
  res.render('update', {
    book: book
  });
  // var input = req.query.q;
  
});

router.post('/updateTitle/:id', function(req, res) {
  var id = parseInt(req.params.id);
  console.log(req.body);
  var input = req.body.title;
  console.log(input);
  db.get('books')
    .find({id: id})
    .assign({title: input}).write();
  console.log(db.get('books').value());
  res.redirect('/');
})

module.exports = router;