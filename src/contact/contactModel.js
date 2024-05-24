const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    subject: {
        required: true,
        type: String
    },
    message: {
        required: true,
        type: String
    },
}, { timestamps: true })

const contactModel = mongoose.model('contact', contactSchema)
module.exports = contactModel