const express = require('express')
const router = express.Router()
const {
  getTaskList,
  createTask,
  getTaskById,
  updateTask,
  deleteTask
} = require('../controllers/task.controller')
const taskValidationRules = require('../validators/taskValidator')
// GET all tasks
router.get('/', getTaskList)
// GET task by ID
router.get('/:taskId', getTaskById)
// POST create a new task
router.post('/', taskValidationRules, createTask)
// PUT update an existing task
router.put('/:taskId', taskValidationRules, updateTask)
// DELETE a task
router.delete('/:taskId', deleteTask)
module.exports = router
