// Load environment variables
require('dotenv').config();

// Import dependencies
const express = require('express')
const mongoose = require('mongoose')

// Initialize Express
const app = express()

// Set up port
const port = process.env.PORT || 3000

// Connect to database
mongoose.connect(process.env.MONGODB);

// Set up routes
const api = require('./routes/api')
app.use('/api', api)

// Start the server
app.listen(port, () => {
  console.log('Listening on port ' + port)
})
