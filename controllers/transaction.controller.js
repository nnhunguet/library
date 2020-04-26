var db = require('../db'); 
var shortid = require('shortid');

module.exports.index = function(req, res) {
  var transactions = db.get('transactions').value();
  console.log(transactions);
  console.log(db.get('books').value());
  let showTransactions = transactions.map(function(transaction) {
    let changeTransaction = {
      id: transaction.id,
      user: db.get('users').find( {id: transaction.userId} ).value().email,
      book: db.get('books').find( {id: transaction.bookId} ).value().title,
      isComplete: transaction.isComplete
    }
    return changeTransaction;
  })
  res.render('transaction/index', {
    showTransactions: showTransactions
  });
}

module.exports.create = function(req, res) {
  var users = db.get('users').value();
  var books = db.get('books').value();
  res.render('transaction/create', {
    users: users,
    books: books
  });
}

module.exports.postCreate = function(req, res) {
  console.log(req.body)
  var newTransaction = {
    id: shortid.generate(),
    userId: req.body.user,
    bookId: req.body.book,
    isComplete: false
  };
  
  db.get('transactions').push(newTransaction).write();
  console.log(db.get('transactions').value());
  res.redirect('/');
}


module.exports.complete = function(req, res) {
  let id = req.params.id;
  if(db.get('transactions').find({id})) {
    db.get('transactions').find({id}).assign({isComplete: true}).write();
  }
  res.redirect('/');
}