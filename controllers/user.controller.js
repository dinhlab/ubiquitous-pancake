const { validationResult } = require('express-validator')
const mongoose = require('mongoose')
const User = require('../models/User')
const { sendResponse, AppError } = require('../helpers/utils')
const userController = {}
// Create a new user
userController.createUser = async (req, res, next) => {
  try {
    const { name } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new AppError(400, 'Validation error', errors.array())
    }
    const existingUser = await User.findOne({ name })
    if (existingUser) {
      throw new AppError(409, 'Duplicate User')
    }
    const user = await User.create({ name })
    sendResponse(res, 201, true, user, null, 'User created successfully')
  } catch (error) {
    next(error)
  }
}
// Get all users
userController.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}
// Get user by ID
userController.getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new AppError(404, 'Invalid user ID')
    }
    const user = await User.findById(userId).populate({
      path: 'tasks',
      select: '_id name description status updatedAt'
    })
    if (!user) {
      throw new AppError(404, 'User not found')
    }
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}
// Update an existing user
userController.updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params
    const { name } = req.body
    const user = await User.findByIdAndUpdate(
      userId,
      { name },
      { new: true }
    )
    if (!user) {
      throw new AppError(404, 'User not found')
    }
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}
// Delete an existing user
userController.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new AppError(404, 'Invalid user ID')
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true }
    )
    if (!user) {
      throw new AppError(404, 'User not found')
    }
    sendResponse(res, 200, true, null, null, 'User deleted successfully')
  } catch (error) {
    next(error)
  }
}
module.exports = userController
