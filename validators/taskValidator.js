// validators/taskValidator.js
const { body } = require('express-validator')

const taskValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('assignedTo').optional().isMongoId().withMessage('Invalid User ID')
]

module.exports = taskValidationRules
