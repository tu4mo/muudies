const mongoose = require('mongoose')

const moodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mood: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  added: {
    type: Date,
    default: Date.now,
    required: true
  }
})

module.exports = mongoose.model('Mood', moodSchema)
