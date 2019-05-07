const jwt = require('jsonwebtoken');
const User = require('../models/users.js')

exports.list = (req, res, next) => {
  User.getUsers((err, users) => {
    if (err)
      res.send(err);

    res.json(users);
  });
}

exports.view = (req, res, next) => {
  let token = req.headers['x-access-token'];
  let id = req.params.id

  if (!token) return res.status(401).send({
    auth: false,
    message: 'No token provided.'
  });

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) return res.status(500).send({
      auth: false,
      message: 'Failed to authenticate token.'
    });

    res.status(200).send(decoded);
  })

  User.getUser(id, (err, user) => {
    if (err)
      res.send(err);

    res.json(user);
  });
}
