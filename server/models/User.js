const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    required: true,
    index: { unique: true }
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('User', userSchema)
