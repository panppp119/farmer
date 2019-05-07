const sql = require('./db.js')

const User = (user) => {
  this.first_name = user.first_name
  this.last_name = user.last_name
  this.phone_number = user.phone_number
  this.password = user.password
  this.birth_date = user.birth_date
  this.gender = user.gender
  this.active = user.active
  this.created_at = user.created_at || new Date()
  this.updated_at = user.updated_at || new Date()
}

User.getUsers = (result) => {
  sql.query(`
    SELECT u.*, r.id r_id, r.name r_name
    FROM users u
      INNER JOIN roles r
        ON r.user_id = u.id
  `, (err, res) => {
    if (err)
      result(err, null)

    var userMap = {}
    var users = []

    res.forEach((row) => {
      var u = userMap[row.id]

      if (!u) {
        u = {
          id: row.id,
          first_name: row.first_name,
          last_name: row.last_name,
          phone_number: row.phone_number,
          birth_date: row.birth_date,
          gender: row.gender,
          roles: []
        }

        userMap[row.id] = u
        users.push(u)
      }

      u.roles.push({
        id: row.r_id,
        name: row.r_name
      })
    })

    result(null, res)
  })
}

User.getUser = (id, result) => {
  sql.query(`
    SELECT u.*, r.id r_id, r.name r_name
    FROM users u
      INNER JOIN roles r
        ON r.user_id = u.id
    WHERE u.?
  `, [id], (err, res) => {
    if (err)
      result(err, null)

    var userMap = {}
    var users = []

    res.forEach((row) => {
      var u = userMap[row.id]

      if (!u) {
        u = {
          id: row.id,
          first_name: row.first_name,
          last_name: row.last_name,
          phone_number: row.phone_number,
          birth_date: row.birth_date,
          gender: row.gender,
          roles: []
        }

        userMap[row.id] = u
        users.push(u)
      }

      u.roles.push({
        id: row.r_id,
        name: row.r_name
      })
    })

    result(null, res)
  })
}

User.updateUser = (id, user, result)=> {
  let update = {
    ...user,
    updated_at: new Date()
  }

  sql.query(`
    UPDATE users
    SET ? WHERE id = ?
  `, [update, id], (err, res) => {
    if (err)
      result(err, null)

    User.getUser(id, result)
  })
}

User.deleteUser = (id, result)=> {
  sql.query(`
    DELETE FROM users
    WHERE id = ?
  `, [id],  (err, res) => {
    if (err)
      result(err, null)

    result(null, { message: 'User deleted' })
  })
}

module.exports = User
