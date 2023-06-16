const { body } = require('express-validator')
const userValidationRules = [
  body('name').notEmpty().withMessage('Name is required')
  // Additional validation rules for other fields if needed
]
module.exports = userValidationRules
