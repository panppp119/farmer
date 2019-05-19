const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({
       status: 'API is Working',
       message: 'Welcome to Farming API!',
    })
})

var authController = require('../controllers/auth')
var userController = require('../controllers/users')

router.route('/sign_in')
    .post(authController.sign_in)
router.route('/sign_up')
    .post(authController.sign_up)
router.route('/sign_out')
    .post(authController.sign_out)

router.route('/users')
    .get(userController.list)
router.route('/users/:id')
    .get(userController.view)
    .put(userController.update)
    .delete(userController.delete)
router.route('/user')
    .get(userController.view)
router.route('/user/update')
    .put(userController.update)
router.route('/user/update')
    .delete(userController.delete)

module.exports = router
