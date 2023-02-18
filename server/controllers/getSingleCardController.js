import CardModel from '../models/Card.mjs';
const Card = CardModel;

export async function getSingleCardController(req, res) {
    const cardId = req.params.cardId;
    const card = await Card.findById(cardId)
    res.json(card)
}