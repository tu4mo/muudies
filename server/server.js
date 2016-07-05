const express = require('express')
const app = express()

// Set up port
const port = process.env.PORT || 3000

// Start the server
app.listen(port, () => {
  console.log('Listening on port ' + port)
})
