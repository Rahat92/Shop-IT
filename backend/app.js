const express = require('express');
const app = express();
const errorMiddleware = require('./middleWares/errors')
const authRouter = require('./routes/userRoute');

app.use(express.json());
// Import all routes

const products = require('./routes/product')

app.use('/api/v1', products)
app.use('/api/v1', authRouter)

// Middleware to handle Errors
app.use(errorMiddleware)

module.exports = app;