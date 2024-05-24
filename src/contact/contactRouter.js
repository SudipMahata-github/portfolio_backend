const express = require('express')
const { createContact } = require('./contactController')

const contactRouter = express.Router()
contactRouter.post('/', createContact)

module.exports = contactRouter