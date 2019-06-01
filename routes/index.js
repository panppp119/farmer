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
var addressController = require('../controllers/addresses')
var walletController = require('../controllers/wallet')
var transactionController = require('../controllers/transactions')
var marketController = require('../controllers/market')
var productController = require('../controllers/products')
var farmController = require('../controllers/farms')

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
router.route('/user/delete')
  .delete(userController.delete)

router.route('/address')
  .get(addressController.view)
  .post(addressController.new)
  .put(addressController.update)
router.route('/addresses')
  .get(addressController.list)
router.route('/addresses/:id')
  .delete(addressController.delete)

router.route('/wallet')
  .get(walletController.list)
  .post(walletController.new)
  .put(walletController.update)
router.route('/wallet/:id')
  .delete(walletController.delete)

router.route('/transactions')
  .get(transactionController.list)
  .post(transactionController.new)
router.route('/transactions/:id')
  .delete(transactionController.update)
  .delete(transactionController.delete)

router.route('/market')
  .get(marketController.list)
  .post(marketController.add)
  .put(marketController.update)
router.route('/market/:id')
  .delete(marketController.delete)

router.route('/products')
  .get(productController.list)
  .post(productController.new)
router.route('/products/:id')
  .put(productController.update)
  .delete(productController.delete)

router.route('/farms')
  .get(productController.list)
  .post(productController.new)
router.route('/farms/:id')
  .put(productController.update)
  .delete(productController.delete)

module.exports = router
