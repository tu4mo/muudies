// Require dependencies
const bcrypt = require('bcrypt')

// Require models
const User = require('../../models/User')

const post = (req, res) => {
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
      console.error(err)
      return res.sendStatus(409)
    }

    res.sendStatus(201)
  })
}

module.exports = post
