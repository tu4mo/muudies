// Require dependencies
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Require models
const User = require('../../models/User')

const post = (req, res) => {
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
}

module.exports = post
