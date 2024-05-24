
const createHttpError = require('http-errors')
const userModel = require('./userModel')
const { sign } = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const createUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    // check all fields
    if (!name || !email || !password) {
        return next(createHttpError(400, "All fields are required."))
    }

    // check user exist or not
    try {
        const user = await userModel.findOne({ email })
        if (user) {
            return next(createHttpError(400, 'User already exists.'))
        }

    } catch (error) {
        return next(createHttpError(500, "Error while create user"))
    }

    // save to database
    let newUser;
    try {
        // hashed password
        const hashedPassword = await bcrypt.hash(password, 10)
        newUser = await userModel.create({
            name,
            email,
            password: hashedPassword
        })

    } catch (error) {
        return next(createHttpError(500, "Error while creating user"))
    }

    // token generation

    try {
        const token = sign({ sub: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d', algorithm: "HS256" })

        res.status(201).json({ accessToken: token })

    } catch (error) {
        return next(createHttpError(500, " Eror while getting token"))
    }

}

const loginUser = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(createHttpError(400, "All fields are required."))
    }

    // database 
    const user = await userModel.findOne({ email })

    try {

        // check user exist or not
        if (!user) {
            return next(createHttpError(404, "User not found"))
        }

        // match password
        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) {
            return next(createHttpError(400, "Username or password incorrect."))
        }

    } catch (error) {
        return next(createHttpError(500, "Error while login"))
    }

    // token generation

    try {

        const token = sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: "7d", algorithm: "HS256" })

        res.status(201).json({ accessToken: token })
    } catch (error) {
        return next(createHttpError(500, "Error while generating token."))
    }
}

module.exports = { createUser, loginUser }