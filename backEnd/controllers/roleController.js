const permissionModel = require("../models/permissionModel");
const rolesModel = require("../models/rolesModel");
const catchAsync = require("../utils/catchAsync");
const factory = require('./handlerFactory');

exports.getAllRole = factory.getAll(rolesModel);
exports.getRole = factory.getOne(rolesModel, 'allPermissions');
exports.editRole = factory.updateOne(rolesModel);
exports.deleteRole = factory.deleteOne(rolesModel);

exports.postRole = catchAsync(async (req, res, next) => {
    const role = req.body.role;
    const permissions = req.body.permissions;
    const description = req.body.description;
    const findPermission = await permissionModel.find();
    const allPermissions = findPermission[0]._id
    const newRole = await rolesModel.create({ role, description, permissions, allPermissions });

    res.status(201).json({
        status: 'success',
        message: 'Data Added successfully',
        roles: newRole
    });
});