// Require dependencies
const bcrypt = require('bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

// Require models
const Mood = require('../models/Mood')
const User = require('../models/User')

// Set up Router
const router = new express.Router()

function isAuthenticated(req, res, next) {
  const auth = req.headers['authorization']

  if (!auth) {
    return res.sendStatus(403)
  }

  const parts = auth.split(' ')
  const token = parts[1]

  if (!token) {
    return res.sendStatus(403)
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, jwtPayload) => {
    if (err) {
      return res.sendStatus(403)
    }

    req.jwtPayload = jwtPayload

    next()
  })
}

/**
 * POST /authenticate
 */
router.post('/authenticate', (req, res) => {
  const { email, password } = req.body

  User.findOne({
    email
  })
  .then((user) => {
    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'User not found'
      })
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({
        status: 'fail',
        message: 'Wrong password'
      })
    }

    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1 days'
    })

    res.status(200).json({
      status: 'success',
      data: {
        token: token
      }
    })
  })
  .catch((err) => {
    res.sendStatus(500)
    throw err
  })
})

/**
 * GET /moods
 */
router.get('/moods', isAuthenticated, (req, res) => {
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
})

/**
 * POST /moods
 */
router.post('/moods', isAuthenticated, (req, res) => {
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
})

/**
 * POST /users
 */
router.post('/users', (req, res) => {
  const { email, username, password } = req.body

  // Create hashed password
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)

  // Create new user
  const newUser = new User({
    email,
    username,
    password: hash
  })

  // Save new user
  newUser.save((err) => {
    if (err) {
      return res.sendStatus(409)
    }

    res.sendStatus(201)
  })
})

module.exports = router
