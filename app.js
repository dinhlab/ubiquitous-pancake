const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
require('dotenv').config()
const cors = require('cors')
const { sendResponse, AppError } = require('./helpers/utils')
const indexRouter = require('./routes/index')
const app = express()
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
const mongoose = require('mongoose')
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/codermagement'
mongoose
  .connect(mongoURI)
  .then(() => console.log(`DB connected ${mongoURI}`))
  .catch((err) => console.log('Error connecting DB', err))
app.use('/', indexRouter)
// Error handling middleware
app.use((req, res, next) => {
  const err = new AppError(404, 'Not Found', 'Bad Request')
  next(err)
})
// Global error handler
app.use((err, req, res, next) => {
  sendResponse(res, err.statusCode || 500, false, null, err.message)
})
module.exports = app
