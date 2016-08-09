const jwt = require('jsonwebtoken')

const isAuthenticated = (req, res, next) => {
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

module.exports = isAuthenticated
