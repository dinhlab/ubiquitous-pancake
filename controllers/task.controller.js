const { validationResult } = require('express-validator')
const mongoose = require('mongoose')
const Task = require('../models/Task')
const User = require('../models/User')
const { sendResponse, AppError } = require('../helpers/utils')
const taskController = {}
// Get all tasks
taskController.getTaskList = async (req, res, next) => {
  try {
    const tasks = await Task.find().populate('assignedTo', 'name')
    res.status(200).json(tasks)
  } catch (error) {
    next(error)
  }
}
// Create a new task
taskController.createTask = async (req, res, next) => {
  try {
    const { name, description, assignedTo } = req.body
    // Check for existence and validate task data
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new AppError(400, 'Validation error', errors.array())
    }
    const task = await Task.create({
      name,
      description,
      assignedTo // Fix: Use assignedTo instead of userId
    })
    // Update the user's tasks array with the newly created task
    await User.findByIdAndUpdate(assignedTo, { $push: { tasks: task._id } })
    sendResponse(res, 201, true, task, null, 'Task created successfully')
  } catch (error) {
    next(error)
  }
}
// Get task by ID
taskController.getTaskById = async (req, res, next) => {
  try {
    const { taskId } = req.params
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      throw new AppError(404, 'Invalid task ID')
    }
    const task = await Task.findById(taskId).populate('assignedTo', 'name')
    if (!task) {
      throw new AppError(404, 'Task not found')
    }
    res.status(200).json(task)
  } catch (error) {
    next(error)
  }
}
// Update an existing task
// Update an existing task
taskController.updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params
    const { name, description, assignedTo, status } = req.body
    const task = await Task.findById(taskId)
    if (!task) {
      throw new AppError(404, 'Task not found')
    }
    if (status && task.status === 'done' && status !== 'archive') {
      throw new AppError(400, 'Invalid status update. Only "archive" is allowed for tasks with status "done"')
    }
    task.name = name || task.name
    task.description = description || task.description
    task.assignedTo = assignedTo || task.assignedTo
    task.status = status || task.status
    const updatedTask = await task.save()
    res.status(200).json(updatedTask)
  } catch (error) {
    next(error)
  }
}
// Soft delete a task
taskController.deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params
    const task = await Task.findByIdAndUpdate(
      taskId,
      { isDeleted: true },
      { new: true }
    )
    if (!task) {
      throw new AppError(404, 'Task not found')
    }
    res.status(200).json({ message: 'Task deleted successfully' })
  } catch (error) {
    next(error)
  }
}
module.exports = taskController
