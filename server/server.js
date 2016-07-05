// Import dependencies
const express = require('express')

// Initialize Express
const app = express()

// Set up port
const port = process.env.PORT || 3000

// Set up routes
const api = require('./routes/api')
app.use('/api', api)

// Start the server
app.listen(port, () => {
  console.log('Listening on port ' + port)
})
