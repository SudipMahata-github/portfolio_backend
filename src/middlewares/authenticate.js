
const createHttpError = require('http-errors')
const { verify } = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    const token = req.header("Authorization")

    if (!token) {
        return next(createHttpError(401, "Authorization token required."))
    }
    const parsedToken = token.split(" ")[1]

    // check token
    verify(parsedToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(createHttpError(401, "Token expired."))
        }
        else {
            req.userId = decoded.sub
            next()
        }

    })

}

module.exports = authenticate