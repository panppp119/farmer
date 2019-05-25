const jwt = require('jsonwebtoken');
const middleware = require('../utils/middleware')
const Wallet = require('../models/wallet.js')

exports.list = (req, res, next) => {
  middleware.checkToken(req, res, next)

  let phone_number = req.decoded.phone_number || {}

  Wallet.getWallet(phone_number, (err, user) => {
    if (err)
      res.send(err);

    res.json(user)
  });
}

exports.add = (req, res, next) => {
  middleware.checkToken(req, res, next)
  let phone_number = req.decoded.phone_number
  let body = req.body

  Wallet.addWallet(phone_number, body, (err, users) => {
    if (err)
      res.send(err);

    res.json(users);
  });
}

exports.update = (req, res, next) => {
  middleware.checkToken(req, res, next)
  let phone_number = req.decoded.phone_number
  let body = req.body

  Wallet.updateWallet(phone_number, body, (err, users) => {
    if (err)
      res.send(err);

    res.json(users);
  });
}

exports.delete = (req, res, next) => {
  middleware.checkToken(req, res, next)
  let id = req.params.id

  Wallet.deleteWallet(id, (err, users) => {
    if (err)
      res.send(err);

    res.json(users);
  });
}
