// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
var db = require('./db.js');
var shortid = require('shortid');

app.set('view engine', 'pug')

var bookRoute = require('./routes/books.route');
var userRoute = require('./routes/users.route');
var transactionRoute = require('./routes/transactions.route');
var middlewareCookie = require('./middlewares/cookie.middleware');

var cookieParser = require('cookie-parser')


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));

app.use(cookieParser());
// our default array of dreams


app.get('/', function(req, res) {
  res.cookie('cookie', shortid.generate());
  res.locals.countCookie = 0;
  res.render('index');
})

app.use('/book', middlewareCookie.cookie, bookRoute);
app.use('/user', middlewareCookie.cookie, userRoute);
app.use('/transactions', middlewareCookie.cookie, transactionRoute);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
