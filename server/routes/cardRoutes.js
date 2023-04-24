const express = require('express');
const router = express.Router();
const cardController = require('../controllers/card');
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, cardController.getAllCards);
router.get('/:deckName', ensureAuth, cardController.getAllCardsForDeck);
router.get('/:deckName/:cardId', ensureAuth, cardController.getSingleCard);
router.post('/:deckName/newcard', ensureAuth, cardController.createCard);
router.delete('/:deckName/:cardId', ensureAuth, cardController.deleteCard);
router.put('/:deckName/:cardId', ensureAuth, cardController.updateCard);

module.exports = router;
