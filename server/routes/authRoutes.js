const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/login', authController.loginUser)
router.post('/signup', authController.createUser)
router.get('/logout', authController.logoutUser)


module.exports = router;