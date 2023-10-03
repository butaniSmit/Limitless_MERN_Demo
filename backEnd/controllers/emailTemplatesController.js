const emailTemplatesModel = require("../models/emailTemplatesModel");
const catchAsync = require("../utils/catchAsync");
const factory = require('./handlerFactory');

exports.getAllEmailTemplate = factory.getAll(emailTemplatesModel);
exports.getEmailTemplate = factory.getOne(emailTemplatesModel);
exports.editEmailTemplate = factory.updateOne(emailTemplatesModel);
exports.deleteEmailTemplate = factory.deleteOne(emailTemplatesModel);

exports.postEmailTemplate = catchAsync(async (req, res, next) => {
    const subject = req.body.subject;
    const description = req.body.description;
    const template_text = req.body.template_text;
    const slug = subject.replace(/\s+/g, '-').toLowerCase();
    const key_words = req.body.key_words;
    const newEmailTemplate = await emailTemplatesModel.create({ subject, description, template_text, slug, key_words });

    res.status(201).json({
        status: 'success',
        message: 'Data Added successfully',
        newEmailTemplate
    });
})