const knex = require('./db.js')

const Farm = (farm) => {
  this.description = farm.description
  this.type = farm.type
  this.area_rai = farm.area_rai
  this.area_kgan = farm.area_kgan
  this.area_sqwa = farm.area_sqwa
  this.start_date = farm.start_date
  this.active = farm.active
  this.created_at = farm.created_at || new Date()
  this.updated_at = farm.updated_at || new Date()
}

Farm.getFarms = (phone_number, result) => {
  knex.select('*')
  .from('farms')
  .orderBy('start_date', 'asc')
  .then(data => {
    result(null, data)
  })
}

Farm.addFarm = (phone_number, body, result)=> {
  let farm = {
    ...body,
    created_at: new Date(),
    updated_at: new Date()
  }

  knex('farms')
    .insert(farm)
    .then(data => {
      Farm.getFarms(phone_number, result)
    })
}

Farm.updateFarm = (phone_number, id, body, result)=> {
  let update = body

  knex('farms')
    .where({ id })
    .update(update)
    .then(data => {
      Farm.getFarms(phone_number, result)
    })
}

Farm.deleteFarm = (phone_numberid, result)=> {
  knex('farms')
    .where({ id })
    .del()
    .then(() => {
      console.log('Farm deleted!')

      Farm.getFarms(phone_number, result)
    })
}

module.exports = Farm
