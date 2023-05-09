const express = require('express');
const router = express.Router();
const deckController = require('../controllers/deck');
const { ensureAuth } = require('../middleware/auth')

router.get('/', deckController.getDecks);
router.post('/', deckController.createDeck);
router.delete('/:deckId', deckController.deleteDeck);
router.put('/:deckId/', deckController.updateDeck);

/* router.get('/', ensureAuth, deckController.getDecks);
router.post('/', ensureAuth, deckController.createDeck);
router.delete('/:deckId', ensureAuth, deckController.deleteDeck);
router.put('/:deckId/', ensureAuth, deckController.updateDeck); */


module.exports = router;
