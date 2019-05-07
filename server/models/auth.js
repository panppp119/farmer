const jwt = require('jsonwebtoken');
const sql = require('./db.js')
const User = require('./users.js')

const Auth = (auth) => {
  this.phone_number = auth.phone_number
  this.user_id = auth.user_id
  this.access_token = auth.access_token
  this.active = auth.active
  this.created_at = auth.created_at || new Date()
  this.updated_at = auth.updated_at || new Date()
}

Auth.signin = (body, result) => {
  let phone_number = body.phone_number

  sql.query(`
    SELECT * FROM users WHERE phone_number = ?
  `, [phone_number], (err, res) => {
    if (err) result(err, null)

    let user = res

    if (user.length){
      // create a token using user name and password vaild for 24 hours
      let token_payload = { phone_number: user[0].phone_number };
      let token = jwt.sign(token_payload, "t-herb_farmer", { expiresIn: '24h' });
      let response = {
        // message: 'Token Created, Authentication Successful!',
        access_token: token
      };

      const update = {
        access_token: token,
        updated_at: new Date()
      }

      sql.query(`
        UPDATE auth
        SET ?
        WHERE ?
      `, [update, { user_id: user[0].id }], (err, res) => {
        if (err) console.log(err)
      })
        // return the information including token as JSON
      return result({ ...response, currentUser: user[0] });
    }
    else {
      return res.status("401").json("Authentication failed. user not found.");
    }
  })
}

Auth.signup = (body, result) => {
  let new_user = {
    ...body,
    created_at: new Date(),
    updated_at: new Date()
  }

  sql.query(`
    INSERT INTO users
    set ?
  `, [new_user],  (err, res) => {
    if (err)
      result(err, null)

    let token = jwt.sign(token_payload, "t-herb_farmer", { expiresIn: '24h' });
    let id = res.insertId
    let user_role = {
      user_id: id,
      role_id: user.role_id,
      created_at: new Date(),
      updated_at: new Date()
    }

    let auth = {
      user_id: id,
      phone_number: new_user.phone_number,
      access_token: token,
      created_at: new Date(),
      updated_at: new Date()
    }

    let response = { access_token: token }

    sql.query(`
      INSERT INTO user_roles
      SET ?
    `, [user_role], (err, res) => {
      if (err)
        result(err, null)
    })

    sql.query(`
      INSERT INTO auth
      SET ?
    `, [auth], (err, res) => {
      if (err)
        result(err, null)
    })

    sql.query(`
      SELECT * FROM users WHERE id = ?
    `, [id], (err, res) => {
      if (err) console.log(err)

      return result({ ...response, currentUser: res[0] });
    })
  })
}

module.exports = Auth
