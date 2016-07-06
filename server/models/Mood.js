const mongoose = require('mongoose')

const moodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  mood: {
    type: Number,
    min: 0,
    max: 100
  },
  added: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Mood', moodSchema)
