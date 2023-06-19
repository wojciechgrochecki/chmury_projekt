require('dotenv').config()
const mongoose = require("mongoose")
const express = require('express')
const app = express()
const cors = require('cors')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const promotionRouter = require('./routes/promotions')

const connectToMongoDB = () => {
    mongoose
        .connect(`mongodb://mongodb:27017/test`, {
            useNewUrlParser: true
        })
        .then(() => {
            console.log('Connected to MongoDB');
            // Start the server
            app.listen(8080, () => {
                console.log('Server started on port 8080');
            });
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
            // Retry connection after 2 seconds
            setTimeout(connectToMongoDB, 2000);
        });
};

connectToMongoDB();

//middleware
app.use(express.json())
app.use(cors())

app.use('/api/user', usersRouter)
app.use('/api/auth', authRouter)
app.use('/api/promotion', promotionRouter)
