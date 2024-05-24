
const createHttpError = require('http-errors')
const cloudinary = require('../cloudinary')
const path = require('node:path')
const fs = require('node:fs')
const testimonialModel = require('./testimonialModel')

const createTestimonial = async (req, res, next) => {
    const { name, designation, desc } = req.body

    try {
        // use cloudinary
        const profileImageType = req.files.profileImage[0].mimetype.split('/').at(-1)
        const fileName = req.files.profileImage[0].filename
        const filePath = path.resolve(__dirname, '../../public/data/uploads', fileName)


        const uploadResult = await cloudinary.uploader.upload(filePath, {
            filename_override: fileName,
            folder: 'profile-covers',
            format: profileImageType
        })

        const newTestimonial = await testimonialModel.create({
            name,
            desc,
            designation,
            profileImage: uploadResult.secure_url
        })

        // delete temp files
        try {
            await fs.promises.unlink(filePath)

        } catch (error) {
            return next(createHttpError(500, 'Error while delete temp files'))
        }

        res.status(201).json({ message: "Succesfully uploaded" })

    } catch (error) {
        return next(createHttpError(500, "Error while uploading files."))
    }
}

const getTestimonials = async (req, res, next) => {
    try {
        const testimonials = await testimonialModel.find()
        res.json(testimonials)

    } catch (error) {
        return next(createHttpError(500, "Error while getting testimonials"))
    }
}



module.exports = { createTestimonial, getTestimonials }
