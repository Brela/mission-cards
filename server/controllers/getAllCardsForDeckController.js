import CardModel from '../models/Card.mjs';
const Card = CardModel;


export async function getAllCardsForDeckController(req, res) {
    const { deckName } = req.params;
    const cards = await Card.find({ deckName })
    res.json(cards);
} 
