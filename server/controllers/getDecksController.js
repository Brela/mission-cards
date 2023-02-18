import DeckModel from '../models/Deck.mjs';
const Deck = DeckModel;

export async function getDecksController(req, res) {
    // the find() method in express will get all decks if it has no params
    const decks = await Deck.find();
    res.json(decks);
}
