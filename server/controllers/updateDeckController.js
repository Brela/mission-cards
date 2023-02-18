import DeckModel from '../models/Deck.mjs';
const Deck = DeckModel;

export async function updateDeckController(req, res) {
    const { deckId } = req.params;
    const deck = await Deck.updateOne(deckId);
    res.json(deck)
}