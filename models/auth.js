const jwt = require('jsonwebtoken');
const knex = require('./db.js')

const Auth = (auth) => {
  this.phone_number = auth.phone_number
  this.password = auth.password
  this.user_id = auth.user_id
  this.access_token = auth.access_token
  this.active = auth.active
  this.created_at = auth.created_at || new Date()
  this.updated_at = auth.updated_at || new Date()
}

Auth.signin = (body, result) => {
  let phone_number = body.phone_number
  let password = body.password
  let now = new Date()

  knex('users').where({ phone_number })
  .then(data => {
    let user = data

    if (user.length !== 0) {
      let token_payload = { password: user[0].password };
      let token = jwt.sign(token_payload, "t-herb_farmer", { expiresIn: '24h' });
      let response = {
        access_token: token
      }

      var update = {
        access_token: token,
        updated_at: now
      }

      knex('auth')
        .where({ user_id: user[0].id })
        .update(update)
        .then(data => {
          let id = user[0].id

          knex('users').where({ phone_number }).then(userData => {
            result(null, { ...response, currentUser: userData[0] })
          })
        })
    }
    else {
      result({ error: 'ไม่มีข้อมูลในระบบ กรุณาลองใหม่อีกครั้ง'}, null)
    }
  })
}

Auth.signup = (body, result) => {
  const new_user = {
    ...body,
    created_at: new Date(),
    updated_at: new Date()
  }
  knex('users').insert(new_user).then(data => {
    let id = user[0].id

    knex('users').where({ id }).then(userData => {
      result({ ...response, currentUser: userData[0] })
    })
  })
}

Auth.signout = (body, result) => {
  let access_token = body.access_token

  knex('users').where({ access_token }).update({ access_token: '' }).then(data => {
    result(null, { message: 'signout succeeded' })
  })
}

module.exports = Auth
