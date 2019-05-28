const knex = require('./db.js')

const Market = (market) => {
  this.name = market.name
  this.amount = market.amount
  this.active = market.active
  this.created_at = market.created_at || new Date()
  this.updated_at = market.updated_at || new Date()
}

Market.getMarket = (result) => {
  knex.select('*').from('market').then(data => {
    result(null, data)
  })
}

Market.addMarket = (body, result)=> {
  let market_attributes = body

  market_attributes.forEach(market => {
    let new_item = {
      ...market,
      created_at: new Date(),
      updated_at: new Date()
    }

    knex('market')
      .insert(new_item)
      .then(data => {
        Market.getMarket(result)
      })
  })
}

Market.updateMarket = (body, result)=> {
  let market_attributes = body

  market_attributes.forEach(market => {
    let update = {
      name: market.name,
      amount: market.amount
    }

    knex('market')
      .update(update)
      .where({ id: market.id })
      .then(data => {
        Market.getMarket(result)
      })
  })
}

Market.deleteMarket = (id, result)=> {
  knex('market')
    .where({ id })
    .del()
    .then(data => {
      console.log('Market deleted!')
      Market.getMarket(result)
    })
}

module.exports = Market
