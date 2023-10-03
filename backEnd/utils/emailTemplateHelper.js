const AppError = require("./appError");
const sendEmail = require("./sendEmail");

const emailtemplatesend = async options => {
    const emailtemplate = await options.emailTemplatesModel.findOne({ slug: options.slug });
    var html = emailtemplate.template_text;
    html = html.replace(`{USER_NAME}`, options.user.name);
    html = html.replace(`{LINK}`, `<a href="${process.env.FRONTEND_URL}/reset-password/${options.resetToken}">Click Here</a>`)
    html = html.replace(`{YEAR}`, new Date().getFullYear());
    const message = `${html}`;
    try {
        await sendEmail({
            email: options.user.email,
            subject: `${emailtemplate.subject}`,
            message
        });

        options.res.status(200).json({
            status: 'success',
            message: 'Token sent to email!'
        });
    } catch (err) {
        options.user.passwordResetToken = undefined;
        options.user.passwordResetExpires = undefined;
        await options.user.save({ validateBeforeSave: false });

        return options.next(
            new AppError('There was an error sending the email. Try again later!'),
            500
        );
    }
}

module.exports = emailtemplatesend;