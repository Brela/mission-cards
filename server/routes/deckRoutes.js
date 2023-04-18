const express = require('express');
const router = express.Router();
const deckController = require('../controllers/deck');

router.get('/decks', deckController.getDecks);
router.post('/decks', deckController.createDeck);
router.delete('/decks/:deckId', deckController.deleteDeck);
router.put('/:deckId/', deckController.updateDeck);


module.exports = router;
