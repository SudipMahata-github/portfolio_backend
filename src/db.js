
const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('database connected succesfully');
        })

        mongoose.connection.on('error', (err) => {
            console.log(err, "failed to connect")
        })

        await mongoose.connect(process.env.MONGO_CONNECTION_STRING)

    } catch (err) {
        console.log(err, "database not connect");
        process.exit(1)
    }
}

connectDB()
