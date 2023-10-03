const APIFeatures = require("../utils/apiFeatur");
const catchAsync = require("../utils/catchAsync");

exports.getAll = (model) =>
    catchAsync(async (req, res, next) => {
        let total = {}
        let document = {};
        const features = new APIFeatures(model, req.query)
            .filter()
            .sort()
            .paginate()
        document = await features.query;
        document.reduce(function (result, item, index) {
            if (item.avatar) item.avatar = req.protocol + '://' + req.get('host') + '/public/image/users/' + item.avatar
        }, {})
        if (req.query.name) {
            const features = new APIFeatures(model, req.query).filter()
            total = await features.query;
        } else {
            total = await model.find();
        }
        res.status(200).json({
            status: 'success',
            result: total.length,
            datalength: document.length,
            document
        })
    });

exports.deleteOne = (model) =>
    catchAsync(async (req, res, next) => {
        const document = await model.findByIdAndDelete(req.params.id);
        if (!document) {
            return next(new AppError('No document found with that ID', 404))
        }
        res.status(200).json({
            status: "success",
            message: 'Data Deleted successfully'
        });
    });

exports.getOne = (model, popOptions) =>
    catchAsync(async (req, res, next) => {

        let query = await model.findById(req.params.id);
        if (popOptions) query = await query.populate(popOptions);
        const document = await query;
        if (!document) {
            return next(new AppError('No document found with that ID', 404))
        }
        res.status(200).json({
            status: 'success',
            document
        })
    });

exports.updateOne = (model) =>
    catchAsync(async (req, res, next) => {
        const document = await model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!document) {
            return next(new AppError('No document found with that ID', 404))
        }
        res.status(201).json({
            status: 'success',
            message: 'Data Updated successfully',
            document
        });
    });

exports.createOne = (model) =>
    catchAsync(async (req, res, next) => {
        const document = await model.create(req.body);

        res.status(201).json({
            status: 'success',
            message: 'Data Added successfully',
            document
        });
    })