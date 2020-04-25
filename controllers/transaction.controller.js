var db = require('../db');
var shortid = require('shortid');

module.exports.index = function(req, res) {
  var transactions = db.get('transactions').value();
  console.log(transactions);
  let showTransactions = transactions.map(function(transaction) {
    let changeTransaction = {
      id: transaction.id,
      user: db.get('users').find( {id: transaction.userId} ).value().email,
      book: db.get('books').find( {id: transaction.bookId} ).value().title
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
  var newTransaction = {
    id: shortid.generate(),
    userId: req.body.user,
    bookId: req.body.book
  };
  
  db.get('transactions').push(newTransaction).write();
  console.log(db.get('transactions').value());
  res.redirect('/');
}