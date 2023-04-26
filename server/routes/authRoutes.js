const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.post('/signup', authController.createUser)
router.post('/logout', authController.logoutUser)
router.post('/login', authController.loginUser)

router.post('/google/login', authController.loginUserWithGoogle)
router.post('/google/signup', authController.createUserWithGoogle)
router.get('/google/callback', authController.googleCallback)


module.exports = router;