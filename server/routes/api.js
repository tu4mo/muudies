// Require dependencies
const bcrypt = require('bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken');

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

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, jwtPayload) => {
      if (err) {
        return res.sendStatus(403)
      } else {
        req.jwtPayload = jwtPayload
        next()
      }
    })
  } else {
    return res.sendStatus(403)
  }
}

/**
 * POST /authenticate
 */
router.post('/authenticate', (req, res) => {
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err) throw err

    if (!user) {
      res.status(401).json({
        status: 'fail',
        message: 'User not found'
      })
    } else {
      const hashedPassword = bcrypt.hashSync(req.body.password, user.salt)

      if (user.password != hashedPassword) {
        res.status(401).json({
          status: 'fail',
          message: 'Wrong password'
        })
      } else {
        var token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
          expiresIn: '1 days'
        })

        res.status(200).json({
          success: true,
          data: {
            token: token
          }
        })
      }
    }
  })
})

router.get('/secrets', isAuthenticated, (req, res) => {
  res.end('Secret')
})

router.get('/', (req, res) => {
  res.end('Hello')
})

/**
 * POST /moods
 */
router.post('/moods', isAuthenticated, (req, res) => {
  const mood = req.body.mood

  const newMood = new Mood({
    user: req.jwtPayload.sub,
    mood
  })

  newMood.save((err) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.sendStatus(201)
    }
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
    password: hash,
    salt
  })

  // Save new user
  newUser.save((err) => {
    if (err) {
      res.sendStatus(409)
    } else {
      res.sendStatus(201)
    }
  })
})

module.exports = router
