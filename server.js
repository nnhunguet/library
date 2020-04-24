// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
var db = require('./db.js');

app.set('view engine', 'pug')


var bookRoute = require('./routes/book.route');
var userRoute = require('./routes/user.route');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// our default array of dreams

app.use('/book', bookRoute);
app.use('/user', userRoute);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
