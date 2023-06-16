const express = require('express')
const router = express.Router()
const userAPI = require('./user.api')
const taskAPI = require('./task.api')
router.use('/users', userAPI)
router.use('/tasks', taskAPI)
router.get('/', function (req, res, next) {
  res.status(200).send('Welcome to CoderManagement!')
})
module.exports = router
