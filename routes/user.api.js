const express = require('express')
const userValidationRules = require('../validators/userValidator')
const router = express.Router()
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/user.controller')
// GET all users
router.get('/', getAllUsers)
// GET user by ID
router.get('/:userId', getUserById)
// POST create a new user
router.post('/', userValidationRules, createUser)
// PUT update an existing user
router.put('/:userId', updateUser)
// DELETE user by ID (soft delete)
router.delete('/:userId', deleteUser)
module.exports = router
