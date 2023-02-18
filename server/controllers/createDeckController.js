import DeckModel from '../models/Deck.mjs';

export async function createDeckController(req, res) {
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
};