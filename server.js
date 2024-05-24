const express = require('express')
const app = express()
const errorHandler = require('./src/middlewares/globalErrorHandler');
require('./src/db')
const cors = require('cors')

const userRouter = require('./src/user/userRouter');
const testimonialRouter = require('./src/testimonial/testimonialRouter');
const contactRouter = require('./src/contact/contactRouter');


app.use(express.json())
app.use(cors({
    origin: process.env.FRONT_END_DOMAIN
}))

app.use('/users', userRouter)
app.use('/testimonials', testimonialRouter)
app.use('/contact', contactRouter)
app.use(errorHandler)

const startServer = () => {
    const port = process.env.PORT || 5000
    app.listen(port, () => {
        console.log(`Listening port number: ${port}`)
    })
}

startServer()