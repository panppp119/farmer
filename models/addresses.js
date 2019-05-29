const knex = require('./db.js')

const Address = (addresses) => {
  this.user_id = addresses.user_id
  this.lat = addresses.lat
  this.lng = addresses.lng
  this.name = addresses.name
  this.active = addresses.active
  this.created_at = addresses.created_at || new Date()
  this.updated_at = addresses.updated_at || new Date()
}

Address.getAddresses = (phone_number, result) => {
  if (phone_number === {}) {
    result({ error: 'ไม่สามารถดึงข้อมูลได้' })
  }
  else {
    knex.select('addresses.*')
      .from('addresses')
      .leftJoin('users', 'users.id', 'addresses.user_id')
      // .whereNot({
      //   'users.phone_number': phone_number
      // })
      .then(data => {
        result(null, data)
      })
  }
}

Address.getAddress = (phone_number, result) => {
  if (phone_number === {}) {
    knex.select('*').from('addresses').then(data => {
      result(null, data)
    })
  }
  else {
    knex.select('addresses.*')
    .from('addresses')
    .leftJoin('users', 'users.id', 'addresses.user_id')
    .where({
      'users.phone_number': phone_number
    }).then(data => {
      result(null, data.length > 0 ? data[0] : {})
    })
  }
}

Address.addAddress = (phone_number, body, result)=> {
  let address = {
    ...body,
    created_at: new Date(),
    updated_at: new Date()
  }

  knex('addresses')
    .insert(address)
    .then(data => {
      Address.getAddress(phone_number, result)
    })
}

Address.updateAddress = (phone_number, body, result)=> {
  let update = body

  knex('addresses')
    .leftJoin('users', 'users.id', 'addresses.user_id')
    .where('users.phone_number', phone_number)
    .update(update)
    .then(data => {
      Address.getAddress(phone_number, result)
    })
}

Address.deleteAddress = (phone_number, id, result)=> {
  knex('addresses')
    .where({ id })
    .del()
    .then(() => {
      console.log('Address deleted!')

      Address.getAddress(phone_number, result)
    })
}

module.exports = Address
