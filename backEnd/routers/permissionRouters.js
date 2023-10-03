const express = require('express');
const permissionController = require('./../controllers/permissionController');
const Router = express.Router();

Router.route('/').get(permissionController.getAllPermission)
    .post(permissionController.postPermission);

Router.route('/:id').get(permissionController.getPermission).patch(permissionController.editPermission).delete(permissionController.deletePermission);
module.exports = Router;