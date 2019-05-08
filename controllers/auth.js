const Auth = require('../models/auth')

// signin
exports.sign_in = (req, res) => {
  const body = req.body

  Auth.signin(body, (err, auth) => {
    if (err)
      res.send(err);

    res.json(auth);
  });
}

// signup
exports.register = (req, res) => {
  const body = req.body

  Auth.signup(body, (err, auth) => {
    if (err)
      res.send(err);

    res.json(auth);
  });
}
