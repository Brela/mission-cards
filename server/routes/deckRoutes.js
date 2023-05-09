const passport = require('passport');
const express = require('express');
const router = express.Router();
const deckController = require('../controllers/deck');
const { ensureAuth } = require('../middleware/auth')

// ensureAuth is causing 401 Unauthorized in front end request console log

/* router.get('/', ensureAuth, deckController.getDecks);
router.post('/', ensureAuth, deckController.createDeck);
router.delete('/:deckId', ensureAuth, deckController.deleteDeck);
router.put('/:deckId/', ensureAuth, deckController.updateDeck); */


function logReqUser(req, res, next) {
    console.log('req.user in deckRoutes:      ', req.user);
    next();
}

router.get('/', logReqUser, deckController.getDecks);
router.post('/', deckController.createDeck);
router.delete('/:deckId', deckController.deleteDeck);
router.put('/:deckId/', deckController.updateDeck);


module.exports = router;
