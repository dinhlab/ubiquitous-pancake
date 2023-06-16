const utilsHelper = {}
utilsHelper.sendResponse = (res, status, success, data, errors, message) => {
  const response = {}
  if (success !== undefined) {
    response.success = success
  }
  if (data !== undefined) {
    response.data = data
  }
  if (errors !== undefined) {
    response.errors = errors
  }
  if (message !== undefined) {
    response.message = message
  }
  return res.status(status).json(response)
}
class AppError extends Error {
  constructor (statusCode, message, errorType) {
    super(message)
    this.statusCode = statusCode
    this.errorType = errorType
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}
utilsHelper.AppError = AppError
module.exports = utilsHelper
