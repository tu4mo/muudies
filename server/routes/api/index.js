// Require dependencies
const express = require('express')

// Require middleware
const isAuthenticated = require('../../middleware/isAuthenticated')

// Set up Router
const router = new express.Router()
const authenticate = require('./authenticate')
const moods = require('./moods')
const users = require('./users')

// Set up routes
router.post('/authenticate', authenticate)
router.get('/moods', isAuthenticated, moods.get)
router.post('/moods', isAuthenticated, moods.post)
router.post('/users', users)

module.exports = router
