const express = require('express');
const router = express.Router();
const openAiController = require('../controllers/openAi');

router.post('/', openAiController.sendPrompt);



module.exports = router;
