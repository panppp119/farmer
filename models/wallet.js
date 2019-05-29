const knex = require('./db.js')

const Wallet = (wallet) => {
  this.account_name = wallet.account_name
  this.account_number = wallet.account_number
  this.bank_name = wallet.bank_name
  this.amount = wallet.amount
  this.user_id = wallet.user_id
  this.active = wallet.active
  this.created_at = wallet.created_at || new Date()
  this.updated_at = wallet.updated_at || new Date()
}

Wallet.getWallet = (phone_number, result) => {
  if (phone_number === {}) {
    knex.select('*').from('wallet').then(data => {
      result(null, data)
    })
  }
  else {
    knex.select('wallet.*')
    .from('wallet')
    .leftJoin('users', 'users.id', 'wallet.user_id')
    .where({
      'users.phone_number': phone_number
    }).then(data => {
      result(null, data.length > 0 ? data[0] : {})
    })
  }
}

Wallet.addWallet = (phone_number, body, result)=> {
  let wallet = {
    ...body,
    created_at: new Date(),
    updated_at: new Date()
  }

  knex('wallet')
    .insert(wallet)
    .then(data => {
      Wallet.getWallet(phone_number, result)
    })
}

Wallet.updateWallet = (phone_number, body, result)=> {
  let update = body

  knex('wallet')
    .where({ user_id: body.user_id })
    .update(update)
    .then(data => {
      Wallet.getWallet(phone_number, result)
    })
}

Wallet.deleteWallet = (id, result)=> {
  knex('wallet')
    .where({ id })
    .del()
    .then(() => {
      result({ message: 'Wallet deleted!' })
    })
}

module.exports = Wallet
