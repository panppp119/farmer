const Address = require('../models/addresses')
const middleware = require('../utils/middleware')

exports.list = (req, res, next) => {
  middleware.checkToken(req, res, next)

  let phone_number = req.decoded.phone_number || {}

  Address.getAddresses(phone_number, (err, addresses) => {
    if (err)
      res.send(err);

    res.json(addresses);
  });
}

exports.new = (req, res, next) => {
  middleware.checkToken(req, res, next)

  let phone_number = req.decoded.phone_number
  const body = req.body

  Address.addAddress(phone_number, body, (err, address) => {
    if (err)
      res.send(err);

    res.json(address)
  })
}

exports.view = (req, res, next) => {
  middleware.checkToken(req, res, next)

  let phone_number = req.decoded.phone_number

  Address.getAddress(phone_number, (err, address) => {
    if (err)
      res.send(err);
    res.json(address);
  });
}

exports.update = (req, res, next) => {
  middleware.checkToken(req, res, next)

  let phone_number = req.decoded.phone_number
  const body = req.body

  Address.updateAddress(phone_number, body, (err, address) => {
    if (err)
      res.send(err);
    res.json(address);
  });
}

// delete address
exports.delete = (req, res, next) => {
  middleware.checkToken(req, res, next)

  let phone_number = req.decoded.phone_number
  const id = req.params.address_id

  Address.deleteAddress(phone_number, id, (err, address) => {
    if (err)
      res.send(err)

    res.json(address)
  })
}
