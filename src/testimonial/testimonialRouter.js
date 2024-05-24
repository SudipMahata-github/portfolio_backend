const express = require('express')
const { createTestimonial, getTestimonials } = require('./testimonialController')
const multer = require('multer')
const path = require('node:path')
const authenticate = require('../middlewares/authenticate')

const testimonialRouter = express.Router()
// use multer
const upload = multer({
    dest: path.resolve(__dirname, '../../public/data/uploads'),
    limits: { fileSize: 3e7 }
})


testimonialRouter.post('/', authenticate, upload.fields([
    {
        name: "profileImage", maxCount: 1
    }
]), createTestimonial)

testimonialRouter.get('/', getTestimonials)

module.exports = testimonialRouter