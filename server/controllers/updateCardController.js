import CardModel from '../models/Card.mjs';
const Card = CardModel;

export async function updateCardController(req, res) {
    const { cardId } = req.params;
    const card = await Card.updateOne(cardId)
    res.json(card)
}