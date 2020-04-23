// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
var db = require('./db.js');

app.set('view engine', 'pug')



app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// our default array of dreams
app.get('/books', function(req, res){
  var books = db.get('books').value();
  res.render('books', {
    books: books
  })
});

app.get('/books/delete/:id', function(req, res){
  var id = parseInt(req.params.id);
  db.get('books').remove({id: id}).write();
  res.redirect('/books');
})

app.get('/books/update/:id', function(req, res){
  var id = parseInt(req.params.id);
  var book = db.get('books').find({id: id}).value();
  res.render('update', {
    book: book
  });
  // var input = req.query.q;
  
});

app.get('/updateTitle/:id', function(req, res) {
  var id = parseInt(req.params.id);
  console.log(req.body);
  var input = req.body;
  db.get('books')
    .find({id: id})
    .assign({title: input}).write();
  res.redirect('/books')
})



// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
