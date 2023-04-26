const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.post('/login', authController.loginUser)
router.post('/google', authController.loginUserWithGoogle)
router.get('/google/callback', authController.googleCallback)
router.post('/signup', authController.createUser)
router.post('/logout', authController.logoutUser)


module.exports = router;