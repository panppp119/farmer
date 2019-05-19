const knex = require('./db.js')

const User = (user) => {
  this.first_name = user.first_name
  this.last_name = user.last_name
  this.phone_number = user.phone_number
  this.birth_date = user.birth_date
  this.gender = user.gender
  this.active = user.active
  this.created_at = user.created_at || new Date()
  this.updated_at = user.updated_at || new Date()
}

User.getUsers = (result) => {
  knex.select('users.*', 'user_roles.role_id', 'roles.name')
    .from('users')
    .leftJoin('user_roles', 'user_roles.user_id', 'users.id')
    .leftJoin('roles', 'roles.id', 'user_roles.role_id')
    .then(data => {
      let users = data
      let userData = []

      users.forEach(user => {
        let name = user.name

        delete user['role_id']
        delete user['name']

        user = {
          ...user,
          roles: [],
        }

        user.roles.push(name)
        userData.push(user)
      })

      result(userData)
    })
}

User.getUser = (phone_number, result) => {
  knex.select('users.*', 'user_roles.role_id', 'roles.name')
    .from('users')
    .leftJoin('user_roles', 'user_roles.user_id', 'users.id')
    .leftJoin('roles', 'roles.id', 'user_roles.role_id')
    .where({ 'users.phone_number': phone_number })
    .then(data => {
      let users = data
      let userData = []

      users.forEach(user => {
        let name = user.name

        delete user['role_id']
        delete user['name']

        user = {
          ...user,
          roles: [],
        }

        user.roles.push(name)
        userData.push(user)
      })

      result(null, userData[0])
    })
}

User.updateUser = (phone_number, body, result)=> {
  let update = body

  knex('users')
    .where({ phone_number })
    .update(update)
    .then(data => {
      User.getUser(phone_number, result)
    })
}

User.deleteUser = (id, result)=> {
  knex('users')
    .where({ id })
    .del()
    .then(() => {
      result({ message: 'User deleted!' })
    })
}

module.exports = User
