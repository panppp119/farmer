const Auth = require('../models/auth')
const middleware = require('../utils/middleware')

exports.sign_in = (req, res) => {
  const body = req.body

  Auth.signin(body, (err, auth) => {
    if (err)
      res.send(err);

    res.json(auth);
  });
}

exports.sign_up = (req, res) => {
  const body = req.body

  Auth.signup(body, (err, auth) => {
    if (err)
      res.send(err);

    res.json(auth);
  });
}

exports.sign_out = (req, res, next) => {
  Auth.signout((err, auth) => {
    if (err)
      res.send(err);

    res.json(auth);
  });
}
