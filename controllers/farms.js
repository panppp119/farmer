const jwt = require('jsonwebtoken');
const middleware = require('../utils/middleware')
const Farm = require('../models/farms.js')

exports.list = (req, res, next) => {
  middleware.checkToken(req, res, next)

  let phone_number = req.decoded.phone_number || {}

  Farm.getFarms(phone_number, (err, farms) => {
    if (err)
      res.send(err);

    res.json(farms)
  });
}

exports.new = (req, res, next) => {
  middleware.checkToken(req, res, next)
  let phone_number = req.decoded.phone_number
  let body = req.body

  Farm.addFarm(phone_number, body, (err, farm) => {
    if (err)
      res.send(err);

    res.json(farm);
  });
}

exports.update = (req, res, next) => {
  middleware.checkToken(req, res, next)
  let phone_number = req.decoded.phone_number
  let id = req.params.id
  let body = req.body

  Farm.updateFarm(phone_number, id, body, (err, farm) => {
    if (err)
      res.send(err);

    res.json(farm);
  });
}

exports.delete = (req, res, next) => {
  middleware.checkToken(req, res, next)

  let phone_number = req.decoded.phone_number
  let id = req.params.id

  Farm.deleteFarm(phone_number, id, (err, farm) => {
    if (err)
      res.send(err);

    res.json(farm);
  });
}
