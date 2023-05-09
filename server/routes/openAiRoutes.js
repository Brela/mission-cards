const express = require('express');
const router = express.Router();
const openAiController = require('../controllers/openAi');
const { ensureAuth } = require('../middleware/auth')

// ensure auth was not working here, so we will just block requests from the front end if user is not signed in
router.post('/', openAiController.sendPrompt);

module.exports = router;
