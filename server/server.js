// Load environment variables
require('dotenv').config({ silent: true })

// Import dependencies
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')

// Set mongoose to use ES6 promises
mongoose.Promise = global.Promise

// Initialize Express
const app = express()

// Use Morgan to log requests to the console
app.use(morgan('dev'))

// Set up body parser
app.use(bodyParser.urlencoded({ extended: false }))

// Set up port
const port = process.env.PORT || 3000

// Connect to database
mongoose.connect(process.env.MONGODB_URI)

// Set up webpack middlewares
if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackConfig = require('../webpack.config')
  const compiler = webpack(webpackConfig)

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
  }))

  app.use(require('webpack-hot-middleware')(compiler))
}

// Serve static files
app.use(express.static('dist'))

// Set up routes
const api = require('./routes/api')
app.use('/api', api)

// Serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'))
})

// Start the server
app.listen(port, () => {
  console.log('Listening on port ' + port)
})
