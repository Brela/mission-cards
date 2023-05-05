const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.post('/signup', userController.createUser)
router.post('/logout', userController.logoutUser)
router.post('/login', userController.loginUser)
router.patch('/update', userController.updateUser)

router.post('/google/login', userController.loginUserWithGoogle)
router.post('/google/signup', userController.createUserWithGoogle)
router.get('/google/callback', userController.googleCallback)


module.exports = router;