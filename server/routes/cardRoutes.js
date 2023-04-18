const express = require('express');
const router = express.Router();
const cardController = require('../controllers/card');

router.get('/', cardController.getAllCards);
router.get('/:deckName', cardController.getAllCardsForDeck);
router.get('/:deckName/:cardId', cardController.getSingleCard);
router.post('/:deckName/newcard', cardController.createCard);
router.delete('/:deckName/:cardId', cardController.deleteCard);
router.put('/:deckName/:cardId', cardController.updateCard);

module.exports = router;
