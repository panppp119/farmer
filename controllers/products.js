const jwt = require('jsonwebtoken');
const middleware = require('../utils/middleware')
const Product = require('../models/products.js')

exports.list = (req, res, next) => {
  middleware.checkToken(req, res, next)

  let phone_number = req.decoded.phone_number || {}

  Product.getProducts(phone_number, (err, products) => {
    if (err)
      res.send(err);

    res.json(products)
  });
}

exports.new = (req, res, next) => {
  middleware.checkToken(req, res, next)
  let phone_number = req.decoded.phone_number
  let body = req.body

  Product.addProduct(phone_number, body, (err, product) => {
    if (err)
      res.send(err);

    res.json(product);
  });
}

exports.update = (req, res, next) => {
  middleware.checkToken(req, res, next)
  let phone_number = req.decoded.phone_number
  let id = req.params.id
  let body = req.body

  Product.updateProduct(phone_number, id, body, (err, product) => {
    if (err)
      res.send(err);

    res.json(product);
  });
}

exports.delete = (req, res, next) => {
  middleware.checkToken(req, res, next)

  let phone_number = req.decoded.phone_number
  let id = req.params.id

  Product.deleteProduct(phone_number, id, (err, product) => {
    if (err)
      res.send(err);

    res.json(product);
  });
}
