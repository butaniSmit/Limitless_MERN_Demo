
const multer = require('multer');
const rolesModel = require("../models/rolesModel");
const userModel = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require('./handlerFactory');

exports.getAllUser = factory.getAll(userModel);
exports.deleteUser = factory.deleteOne(userModel);
exports.getUser = factory.getOne(userModel);

exports.postUser = catchAsync(async (req, res, next) => {
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email
    const phone_number = req.body.phone_number
    const password = req.body.password
    const confirmpassword = req.body.confirmpassword
    const role = req.body.role || 'user';
    const name = `${req.body.first_name + ' ' + req.body.last_name}` || ''
    const roleData = await rolesModel.findOne({ role: role })
    const permissions = roleData?._id;
    datalength = await userModel.find();
    const newUser = await userModel.create({ first_name, last_name, name, email, phone_number, password, confirmpassword, role, permissions });

    res.status(201).json({
        status: 'success',
        message: 'Data Added successfully',
        data: {
            user: newUser
        }
    });
})

exports.editUser = catchAsync(async (req, res, next) => {
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email
    const phone_number = req.body.phone_number
    const password = req.body.password
    const role = req.body.role || 'admin';
    const name = `${first_name + ' ' + last_name}` || '';
    const roleData = await rolesModel.findOne({ role: role })
    const permissions = roleData?._id
    const user = await userModel.updateOne({ _id: req.params.id }, { first_name, last_name, name, email, phone_number, password, role, permissions }, {
        new: true,
        runValidators: true
    })
    if (!user) {
        return next(new AppError('No user found with that ID', 404))
    }
    res.status(201).json({
        status: 'success',
        message: 'Data Updated successfully',
        user
    });
});

//image upload
//upload file

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/image/users');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
});

const multerFilter = (req, file, cb) => {
    var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (allowedExtensions.exec(file.originalname)) {
        cb(null, true);
    } else {
        cb(new AppError('Please upload only jpeg, jpg, png images.', 400), false);
    }
};
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});
exports.uploadUserPhoto = upload.single('avatar');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};
exports.updateMe = catchAsync(async (req, res, next) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.confirmpassword) {
        return next(
            new AppError(
                'This route is not for password updates. Please use /change-password.',
                400
            )
        );
    }
    const filteredBody = filterObj(req.file);
    filteredBody.avatar = req.file.originalname;
    const updatedUser = await userModel.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        status: 'success',
        message: "Profile updated sucessfully",
        user: updatedUser
    });
});

exports.updatePersonalInfo = catchAsync(async (req, res, next) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.confirmpassword) {
        return next(
            new AppError(
                'This route is not for password updates. Please use /change-password..',
                400
            )
        );
    }
    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const first_name = req.body.first_name
    const last_name = req.body.last_name;
    const email = req.body.email;
    const phone_number = req.body.phone_number
    const name = `${first_name + ' ' + last_name}` || '';
    // 3) Update user document
    const updatedUser = await userModel.findByIdAndUpdate({ _id: req.user.id }, { first_name, last_name, name, email, phone_number }, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        status: 'success',
        message: "Profile updated sucessfully",
        data: {
            user: updatedUser
        }
    });
});