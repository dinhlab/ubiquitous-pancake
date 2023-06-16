const mongoose = require('mongoose')
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['manager', 'employee'],
      default: 'employee'
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
      }
    ],
    isDeleted: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  { timestamps: true }
)
userSchema.pre(/^find/, function (next) {
  this.where({ isDeleted: false })
  next()
})
const User = mongoose.model('User', userSchema)
module.exports = User
