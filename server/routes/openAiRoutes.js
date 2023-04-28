const express = require('express');
const router = express.Router();
const openAiController = require('../controllers/openAi');
const { ensureAuth } = require('../middleware/auth')

router.post('/', ensureAuth, openAiController.sendPrompt);

module.exports = router;
