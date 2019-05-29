const jwt = require('jsonwebtoken');
const middleware = require('../utils/middleware')
const Transaction = require('../models/transactions.js')

exports.list = (req, res, next) => {
  middleware.checkToken(req, res, next)

  let phone_number = req.decoded.phone_number || {}

  Transaction.getTransactions(phone_number, (err, transactions) => {
    if (err)
      res.send(err);

    res.json(transactions)
  });
}

exports.new = (req, res, next) => {
  middleware.checkToken(req, res, next)
  let phone_number = req.decoded.phone_number
  let body = req.body

  Transaction.addTransaction(phone_number, body, (err, transaction) => {
    if (err)
      res.send(err);

    res.json(transaction);
  });
}

exports.update = (req, res, next) => {
  middleware.checkToken(req, res, next)
  let phone_number = req.decoded.phone_number
  let id = req.params.id
  let body = req.body

  Transaction.updateTransaction(phone_number, id, body, (err, transaction) => {
    if (err)
      res.send(err);

    res.json(transaction);
  });
}

exports.delete = (req, res, next) => {
  middleware.checkToken(req, res, next)

  let phone_number = req.decoded.phone_number
  let id = req.params.id

  Transaction.deleteTransaction(phone_number, id, (err, transaction) => {
    if (err)
      res.send(err);

    res.json(transaction);
  });
}
