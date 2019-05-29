const knex = require('./db.js')

const Product = (product) => {
  this.wallet_id = product.wallet_id
  this.amount = product.amount
  this.type = product.type
  this.active = product.active
  this.created_at = product.created_at || new Date()
  this.updated_at = product.updated_at || new Date()
}

Product.getProducts = (phone_number, result) => {
  knex.select('*')
  .from('products')
  .orderBy('created_at', 'desc')
  .then(data => {
    result(null, data)
  })
}

Product.addProduct = (phone_number, body, result)=> {
  let product = {
    ...body,
    created_at: new Date(),
    updated_at: new Date()
  }

  knex('products')
    .insert(product)
    .then(data => {
      Product.getProducts(phone_number, result)
    })
}

Product.updateProduct = (phone_number, id, body, result)=> {
  let update = body

  knex('products')
    .where({ id })
    .update(update)
    .then(data => {
      Product.getProducts(phone_number, result)
    })
}

Product.deleteProduct = (phone_numberid, result)=> {
  knex('products')
    .where({ id })
    .del()
    .then(() => {
      console.log('Product deleted!')

      Product.getProducts(phone_number, result)
    })
}

module.exports = Product
