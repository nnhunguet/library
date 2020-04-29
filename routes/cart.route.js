var express = require('express');
var router = express.Router();

var controller = require('../controllers/cart.controller');

router.get('/book/cart/:bookId', controller.addToCart);

module.exports = router;