import DeckModel from '../models/Deck.mjs';
const Deck = DeckModel;

export async function deleteDeckController(req, res) {
    const { deckId } = req.params;
    const deck = await Deck.findByIdAndDelete(deckId);
    res.json(deck)
}