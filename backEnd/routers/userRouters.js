const express = require('express');
const userController = require('./../controllers/userController');
const Router = express.Router();
const AuthController = require('./../controllers/authController');
Router.use(AuthController.protect);
Router.patch('/change-password', AuthController.grantAccess("change-password"), AuthController.updatePassword);
Router.route('/account').get(AuthController.getLoginUser);

Router.patch('/change-avatar',
    userController.uploadUserPhoto,
    userController.updateMe);
Router.patch('/updatePersonalInfo', userController.updatePersonalInfo);
Router.route('/').get(AuthController.grantAccess("listing-administrators"), userController.getAllUser).post(AuthController.grantAccess("add-administrators"), userController.postUser);
Router.route('/:id').get(userController.getUser).patch(AuthController.grantAccess("edit-administrators"), userController.editUser).delete(AuthController.grantAccess("delete-administrators"), userController.deleteUser);

module.exports = Router;