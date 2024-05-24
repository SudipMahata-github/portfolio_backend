const express = require('express')
const { createUser, loginUser } = require('./userController')
const userRouter = express.Router()

userRouter.post('/register', createUser)
userRouter.post('/login', loginUser)

module.exports = userRouter