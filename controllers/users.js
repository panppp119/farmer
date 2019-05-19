const jwt = require('jsonwebtoken');
const middleware = require('../utils/middleware')
const User = require('../models/users.js')

exports.list = (req, res, next) => {
  User.getUsers((err, users) => {
    if (err)
      res.send(err);

    res.json(users);
  });
}

exports.view = (req, res, next) => {
  middleware.checkToken(req, res, next)

  let phone_number = req.decoded.phone_number

  User.getUser(phone_number, (err, user) => {
    if (err)
      res.send(err);

    res.json(user)
  });
}

exports.update = (req, res, next) => {
  middleware.checkToken(req, res, next)
  let phone_number = req.decoded.phone_number
  let body = req.body

  User.updateUser(phone_number, body, (err, users) => {
    if (err)
      res.send(err);

    res.json(users);
  });
}

exports.delete = (req, res, next) => {
  let id = req.params.id

  User.deleteUser(id, (err, users) => {
    if (err)
      res.send(err);

    res.json(users);
  });
}
