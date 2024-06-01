const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')

router.get('/logout', authController.postLogout)

router.post('/login', authController.postLogin)

router.post('/signup', authController.postSignup)

router.post('/reset-password')

module.exports = router
