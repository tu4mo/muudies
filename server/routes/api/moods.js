// Require dependencies
const mongoose = require('mongoose')

// Require models
const Mood = require('../../models/Mood')

const get = (req, res) => {
  // Get date from 7 days ago
  let fromDate = new Date()
  fromDate.setDate(fromDate.getDate() - 7)

  // Get user's moods from last 7 days, grouped by date
  Mood.aggregate([
    {
      $match: {
        user: mongoose.Types.ObjectId(req.jwtPayload.sub),
        added: { $gte: fromDate }
      }
    }, {
      $group: {
        _id: {
          $dateToString: {
            format: '%Y-%m-%d', date: '$added'
          }
        },
        mood: { $avg: '$mood' }
      }
    }
  ], (err, moods) => {
    if (err) {
      return res.status(500).send(err)
    }

    res.json(moods)
  })
}

const post = (req, res) => {
  const mood = req.body.mood

  // Create new mood
  const newMood = new Mood({
    user: req.jwtPayload.sub,
    mood
  })

  // Save new mood
  newMood.save((err) => {
    if (err) {
      return res.status(500).send(err)
    }

    res.sendStatus(201)
  })
}

module.exports = {
  get,
  post
}
