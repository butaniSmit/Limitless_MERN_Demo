const permissionModel = require("../models/permissionModel");
const factory = require('./handlerFactory');

exports.postPermission = factory.createOne(permissionModel);
exports.getAllPermission = factory.getAll(permissionModel);
exports.getPermission = factory.getOne(permissionModel);
exports.editPermission = factory.updateOne(permissionModel);
exports.deletePermission = factory.deleteOne(permissionModel);