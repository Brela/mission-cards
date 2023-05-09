const CardModel = require('../models/Card.js');
const Card = CardModel;

module.exports = {

    getAllCardsForDeck: async (req, res) => {
        // req.user is defined here
        const { deckName } = req.params;
        const cards = await Card.find({ deckName })
        res.json(cards);
    },

    getAllCards: async (req, res) => {
        // the find() method in express will get all decks if it has no params
        const cards = await Card.find();
        res.json(cards);
    },

    getSingleCard: async (req, res) => {
        const cardId = req.params.cardId;
        const card = await Card.findById(cardId)
        res.json(card)
    },

    updateCard: async (req, res) => {
        const { cardId } = req.params;
        const card = await Card.updateOne(cardId)
        res.json(card)
    },

    createCard: async (req, res) => {
        try {
            const newCard = new CardModel({
                // this deckName is just to see what deck each card belongs to, for testing
                deckName: req.body.deckName,
                front: req.body.front,
                back: req.body.back,
                creationDate: new Date()
            });

            // await mongoDB to save the card
            const createdCard = await newCard.save();
            console.log(createdCard)
            res.json(createdCard);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    deleteCard: async (req, res) => {
        const { cardId } = req.params;
        const card = await Card.findByIdAndDelete(cardId);
        res.json(card)
    },

}