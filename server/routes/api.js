// Require dependencies
const bcrypt = require('bcrypt')
const express = require('express')

// Require models
const User = require('../models/User')

// Set up Router
const router = new express.Router()

router.get('/login', (req, res) => {
  //
})

router.get('/logout', (req, res) => {
  //
})

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
