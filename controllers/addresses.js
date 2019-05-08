const Address = require('../models/addresses')

// get all addresses
exports.list = (req, res) => {
  Address.getAddresses((err, addresses) => {
    if (err)
      res.send(err);

    res.json(addresses);
  });
}

// create new address
exports.new = (req, res) => {
  const body = req.body

  Address.createAddress(body, (err, address) => {
    if (err)
      res.send(err);

    res.json(address)
  })
}

// get address by id
exports.view = (req, res) => {
  const id = req.params.address_id

  Address.getAddress(id, (err, address) => {
    if (err)
      res.send(err);
    res.json(address);
  });
}

// update address
exports.update = (req, res) => {
  const id = req.params.address_id
  const body = req.body

  Address.updateAddress(id, body, (err, address) => {
    if (err)
      res.send(err);
    res.json(address);
  });
}

// delete address
exports.delete = (req, res) => {
  const id = req.params.address_id

  Address.deleteAddress(id, (err, address) => {
    if (err)
      res.send(err)

    res.json(address)
  })
}
