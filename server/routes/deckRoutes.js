const express = require('express');
const router = express.Router();
const deckController = require('../controllers/deck');
const { ensureAuth } = require('../middleware/auth')

// router.get('/', ensureAuth, deckController.getDecks);
router.get('/', deckController.getDecks);
router.post('/', deckController.createDeck);
router.delete('/:deckId', deckController.deleteDeck);
router.put('/:deckId/', deckController.updateDeck);


module.exports = router;
