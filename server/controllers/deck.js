const DeckModel = require('../models/Deck.js');
const Deck = DeckModel;


module.exports = {

    getDecks: async (req, res) => {
        // the find() method in express will get all decks if it has no params
        const decks = await Deck.find();
        res.json(decks);
    },

    updateDeck: async (req, res) => {
        const { deckId } = req.params;
        const deck = await Deck.updateOne(deckId);
        res.json(deck)
    },

    createDeck: async (req, res) => {
        try {
            const newDeck = new DeckModel({
                deckName: req.body.deckName,
                creationDate: new Date()
            });

            const createdDeck = await newDeck.save();
            res.json(createdDeck);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    deleteDeck: async (req, res) => {
        const { deckId } = req.params;
        const deck = await Deck.findByIdAndDelete(deckId);
        res.json(deck)
    },

}
