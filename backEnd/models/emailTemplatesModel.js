const mongoose = require('mongoose')
const EmailTemplateSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: [true, 'Please enter subject.']
    },
    description: {
        type: String,
        required: [true, 'Please enter description.']
    },
    template_text: {
        type: String,
        required: [true, 'Please enter text body.']
    },
    slug: {
        type: String
    },
    key_words: { type: Array }
})
module.exports = mongoose.model('emailtemplate', EmailTemplateSchema);