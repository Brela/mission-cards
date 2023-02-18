import CardModel from '../models/Card.mjs';
const Card = CardModel;

export async function getAllCardsController(req, res) {
    // the find() method in express will get all decks if it has no params
    const cards = await Card.find();
    res.json(cards);
} 
