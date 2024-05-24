const express = require('express')
const contactModel = require('./contactModel')
const createHttpError = require('http-errors')


const createContact = async (req, res, next) => {
    const { name, subject, message } = req.body

    if (!name || !subject || !message) {
        return next(createHttpError(400, "All fields are required,"))
    }

    try {
        await contactModel.create({
            name,
            subject,
            message
        })
        res.status(200).json({ message: "ok" })

    } catch (error) {
        return next(createHttpError(500, "Error while send contact details"))
    }

}

module.exports = { createContact }