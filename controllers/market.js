const jwt = require('jsonwebtoken');
const middleware = require('../utils/middleware')
const Market = require('../models/market.js')

exports.list = (req, res, next) => {
  Market.getMarket((err, market) => {
    if (err)
      res.send(err);

    res.json(market)
  });
}

exports.add = (req, res, next) => {
  let body = req.body

  Market.addMarket(body, (err, market) => {
    if (err)
      res.send(err);

    res.json(market);
  });
}

exports.update = (req, res, next) => {
  let body = req.body

  Market.updateMarket(body, (err, market) => {
    if (err)
      res.send(err);

    res.json(market);
  });
}

exports.delete = (req, res, next) => {
  let id = req.params.id

  Market.deleteMarket(id, (err, market) => {
    if (err)
      res.send(err);

    res.json(market);
  });
}
