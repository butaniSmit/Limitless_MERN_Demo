const express = require('express');
const emailTemplatesController = require('./../controllers/emailTemplatesController');
const Router = express.Router();
const AuthController = require('./../controllers/authController');
Router.use(AuthController.protect);
Router.route('/').get(AuthController.grantAccess("listing-emailtemplates"), emailTemplatesController.getAllEmailTemplate)
    .post(AuthController.grantAccess("add-emailtemplates"), emailTemplatesController.postEmailTemplate);

Router.route('/:id').get(emailTemplatesController.getEmailTemplate).patch(AuthController.grantAccess("edit-emailtemplates"), emailTemplatesController.editEmailTemplate).delete(AuthController.grantAccess("delete-emailtemplates"), emailTemplatesController.deleteEmailTemplate);

module.exports = Router;