var express = require('express');
var router = express.Router();
const db = require('../db')

router.get('/', (req, res) => db.getTransactions(data => res.send(data)))

router.get('/payees', (req, res) => db.getPayees(data => res.send(data)))

router.get('/categories', (req, res) => db.getCategories(data => res.send(data)))


module.exports = router;
