import CardModel from '../models/Card.mjs';
const Card = CardModel;

export async function deleteCardController(req, res) {
    const { cardId } = req.params;
    const card = await Card.findByIdAndDelete(cardId);
    res.json(card)
}