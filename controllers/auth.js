const Auth = require('../models/auth')

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

exports.sign_out = (req, res) => {
  const body = req.body

  Auth.signout(body, (err, auth) => {
    if (err)
      res.send(err);

    res.json(auth);
  });
}
