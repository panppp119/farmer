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
    let user = data[0]

    if (user.length !== 0) {
      let token_payload = { phone_number, password };
      let token = jwt.sign(token_payload, "t-herb_farmer", { expiresIn: '24h' });
      let response = {
        access_token: token,
        name: user.first_name
      }

      var update = {
        access_token: token,
        updated_at: now
      }

      knex('auth')
        .where({ user_id: user.id })
        .update(update)
        .then(data => {
          knex('users').where({ phone_number }).then(userData => {
            result(null, response)
          })
        })
    }
    else {
      result({ error: 'ไม่มีข้อมูลในระบบ กรุณาลองใหม่อีกครั้ง'}, null)
    }
  })
}

Auth.signup = (body, result) => {
  const role_id = body.role_id
  const new_user = {
    ...body,
    created_at: new Date(),
    updated_at: new Date()
  }

  delete new_user['password']
  delete new_user['role_id']

  knex('users').insert(new_user).then(data => {
    let id = data[0]

    let token_payload = {
      phone_number: body.phone_number,
      password: body.password
    };
    let token = jwt.sign(token_payload, "t-herb_farmer", { expiresIn: '24h' });
    let response = {
      access_token: token
    }

    let auth = {
      phone_number: body.phone_number,
      password: body.password,
      user_id: id,
      access_token: token,
      created_at: new Date(),
      updated_at: new Date()
    }

    let user_role = {
      user_id: id,
      role_id: role_id,
      created_at: new Date(),
      updated_at: new Date()
    }

    knex('auth').insert(auth).then(authData => {
      knex('user_roles').insert(user_role).then(roleData => {
        console.log('added role')
      })

      knex('users').where({ id }).then(userData => {
        result(null, response)
      })
    })
  })
}

Auth.signout = (result) => {
  result(null, { message: 'signout succeeded' })
}

module.exports = Auth
