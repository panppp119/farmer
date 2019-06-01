const knex = require('./db.js')

const User = (user) => {
  this.first_name = user.first_name
  this.last_name = user.last_name
  this.id_number = user.id_number
  this.phone_number = user.phone_number
  this.gender = user.gender
  this.birthday = user.birthday
  this.main_job = user.main_job
  this.second_job = user.second_job
  this.active = user.active
  this.created_at = user.created_at || new Date()
  this.updated_at = user.updated_at || new Date()
}

User.getUsers = (result) => {
  knex.select('users.*', 'user_roles.role_id', 'roles.name', 'wallet.id as wallet_id')
    .from('users')
    .leftJoin('user_roles', 'user_roles.user_id', 'users.id')
    .leftJoin('roles', 'roles.id', 'user_roles.role_id')
    .leftJoin('wallet', 'wallet.user_id', 'users.id')
    .then(data => {
      let users = []

      data.forEach(user => {
        let name = user.name

        delete user['role_id']
        delete user['name']

        if (users.findIndex(u => u.id === user.id) !== -1) {
          let i = users.findIndex(u => u.id === user.id)

          users[i].roles.push(name)
        }
        else {
          user = {
            ...user,
            roles: [],
          }

          user.roles.push(name)
        }

        users.push(user)
      })

      result(null, users)
    })
}

User.getUser = (phone_number, result) => {
  knex.select('users.*', 'user_roles.role_id', 'roles.name', 'wallet.id as wallet_id')
    .from('users')
    .leftJoin('user_roles', 'user_roles.user_id', 'users.id')
    .leftJoin('roles', 'roles.id', 'user_roles.role_id')
    .leftJoin('wallet', 'wallet.user_id', 'users.id')
    .where({ 'users.phone_number': phone_number })
    .then(data => {
      let users = []

      if (data.length > 0) {
        data.forEach(user => {
          let name = user.name

          delete user['role_id']
          delete user['name']

          if (users.findIndex(u => u.id === user.id) !== -1) {
            let i = users.findIndex(u => u.id === user.id)

            users[i].roles.push(name)
          }
          else {
            user = {
              ...user,
              roles: [],
            }

            user.roles.push(name)
            users.push(user)
          }
        })

        result(null, users[0])
      }
      else {
        result(null, { error: 'ไม่มีข้อมูลในระบบ'})
      }
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
