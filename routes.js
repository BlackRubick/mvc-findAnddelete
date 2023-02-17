var express = require('express');

var userController = require('../src/user/userController');
const router = express.Router();

// ruta para login
router.route('/user/login').post(userController.loginUserControllerFunc);
// ruta para crear usuario
router.route('/user/create').post(userController.createUserControllerFunc);
router.route('/user/findbyname').post(userController.searchUserDBServiceFunc);
router.route('/user/delete').post(userController.deleteUserDBServiceFunc);

module.exports = router;
