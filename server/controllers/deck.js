const DeckModel = require('../models/Deck.js');
const Deck = DeckModel;


module.exports = {

    getDecks: async (req, res) => {
        try {
            const mockData = [
                {
                    _id: "645bc091c0c9287c24252e1e",
                    deckName: 'mock 1',
                    creationDate: ' 2023 - 05 - 10T16: 04: 33.400Z',


                },
                {
                    _id: "645bc091c0c9287c24252e1e",
                    deckName: 'mock 2',
                    creationDate: '2023 - 05 - 10T16: 04: 33.400Z',

                },

            ];
            // check passed at controller and database - mock data back here cause same problem though
            const decks = mockData
            // const decks = await Deck.find({ user: req.user._id });
            res.json(decks);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    createDeck: async (req, res) => {
        try {
            const newDeck = new DeckModel({
                deckName: req.body.deckName,
                creationDate: new Date(),
                user: req.user._id,
            });

            const createdDeck = await newDeck.save();
            res.json(createdDeck);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    updateDeck: async (req, res) => {
        const { deckId } = req.params;
        try {
            const deck = await Deck.findOne({ _id: deckId, user: req.user._id });
            if (!deck) {
                return res.status(404).json({ error: 'Deck not found' });
            }

            // Update the deck fields as needed
            // For example: deck.deckName = req.body.deckName;

            await deck.save();
            res.json(deck);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    deleteDeck: async (req, res) => {
        const { deckId } = req.params;
        try {
            const deck = await Deck.findOneAndDelete({ _id: deckId, user: req.user._id });
            if (!deck) {
                return res.status(404).json({ error: 'Deck not found' });
            }
            res.json(deck);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

}
