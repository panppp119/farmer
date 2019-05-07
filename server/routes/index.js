const express = require('express')
const router = express.Router()

const middleware = require('./middleware')

router.get('/', (req, res) => {
    res.json({
       status: 'API is Working',
       message: 'Welcome to Dev01 RESTful API!',
    })
})

var authController = require('../controllers/auth')
var userController = require('../controllers/users')

router.route('/sign_in')
    .post(authController.sign_in)
router.route('/register')
    .post(authController.register)

router.route('/users')
    .get(userController.list)
    // .post(userController.new)
router.route('/users/:id')
    .get(userController.view)
    // .put(userController.update)
    // .del(userController.delete)

module.exports = router
