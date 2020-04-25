var express = require('express');
var router = express.Router();

var db = require('../db.js');
var shortid = require('shortid');

router.get('/', function(req, res){
  var books = db.get('books').value();
  res.render('book/index', {
    books: books
  })
});

router.get('/search', function(req, res) {
  var q = req.query.q;
  console.log(q);
  var searchBooks = db.get('books').value().filter(function(book) {
    return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  }); 
  res.render('book/index', {
    books: searchBooks,
    value: q
  })
})

router.get('/delete/:id', function(req, res){
  var id = req.params.id;
  db.get('books').remove({id: id}).write();
  res.redirect('/book');
})

router.get('/update/:id', function(req, res){
  var id = req.params.id;
  var book = db.get('books').find({id: id}).value();
  res.render('book/update', {
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
  res.redirect('/book');
});

router.get('/create', function(req, res) {
  res.render('book/create')
})

router.post('/create', function(req, res) {
  var title = req.body.title;
  var desc = req.body.desc;
  var id = shortid.generate();
  var newBook = {
    id: id,
    title: title,
    description: desc 
  };
  db.get('books').push(newBook).write();
  console.log(db.get('books').value())
  res.redirect('/book');
});

router.get('/view/:id', function(req, res) {
  var id = req.params.id;
  res.render('book/view', {
    book: db.get('books').find({id: id}).value()
  });
})

module.exports = router;