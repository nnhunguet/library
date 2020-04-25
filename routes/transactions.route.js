var express = require('express');
var router = express.Router();

var controller = require('../controllers/transaction.controller');

router.get('/', controller.index);

router.get('/create', controller.create);

module.exports = router;