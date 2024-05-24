const mongoose = require('mongoose')

const testimonialSchema = new mongoose.Schema({
    name: {
        require: true,
        type: String
    },
    profileImage: {
        require: true,
        type: String
    },
    designation: {
        require: true,
        type: String
    },
    desc: {
        require: true,
        type: String
    },

}, { timestamps: true })

const testimonialModel = mongoose.model('testimonial', testimonialSchema)
module.exports = testimonialModel;