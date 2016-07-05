var express = require('express')
var app = express()

// Set up port
var port = process.env.PORT || 3000

// Start the server
app.listen(port, () => {
  console.log('Listening on port ' + port)
})
