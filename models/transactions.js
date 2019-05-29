const knex = require('./db.js')

const Transaction = (transaction) => {
  this.wallet_id = transaction.wallet_id
  this.amount = transaction.amount
  this.type = transaction.type
  this.active = transaction.active
  this.created_at = transaction.created_at || new Date()
  this.updated_at = transaction.updated_at || new Date()
}

Transaction.getTransactions = (phone_number, result) => {
  knex.select('transactions.*')
  .from('transactions')
  .leftJoin('wallet', 'wallet_id', 'transactions.wallet_id')
  .leftJoin('users', 'users.id', 'wallet.user_id')
  .orderBy('created_at', 'desc')
  .limit(10)
  .then(data => {
    result(null, data)
  })
}

Transaction.addTransaction = (phone_number, body, result)=> {
  let transaction = {
    ...body,
    created_at: new Date(),
    updated_at: new Date()
  }

  knex('transactions')
    .insert(transaction)
    .then(data => {
      let prev_amount = 0

      knex.select('amount').from('wallet').where({
        id: body.wallet_id
      }).then(data => {
        prev_amount = data[0].amount || 0

        let amount = prev_amount

        switch (body.status) {
          case 'รอการยืนยัน':
            amount = prev_amount
            break
          case 'เสร็จสิ้น':
            if (body.type === 'ถอนเงิน') {
              amount = prev_amount - body.amount
            }
            else {
              amount = prev_amount + body.amount
            }
            break;
          default: break;
        }

        knex('wallet').update({
          amount: amount,
          status: 0
        }).where({
          id: body.wallet_id
        }).then(() => {
          console.log('update wallet')
        })
      })

      Transaction.getTransactions(phone_number, result)
    })
}

Transaction.updateTransaction = (phone_number, id, body, result)=> {
  let update = body

  knex('transactions')
    .where({ id })
    .update(update)
    .then(data => {
      Transaction.getTransactions(phone_number, result)
    })
}

Transaction.deleteTransaction = (phone_numberid, result)=> {
  knex('transactions')
    .where({ id })
    .del()
    .then(() => {
      console.log('Transaction deleted!')

      Transaction.getTransactions(phone_number, result)
    })
}

module.exports = Transaction
