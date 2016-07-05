// Load environment variables
require('dotenv').config();

// Import dependencies
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')

// Initialize Express
const app = express()

// Use Morgan to log requests to the console
app.use(morgan('dev'));

// Set up body parser
app.use(bodyParser.urlencoded({ extended: false }))

// Set up port
const port = process.env.PORT || 3000

// Connect to database
mongoose.connect(process.env.MONGODB_URI);

// Set up routes
const api = require('./routes/api')
app.use('/api', api)

// Start the server
app.listen(port, () => {
  console.log('Listening on port ' + port)
})
