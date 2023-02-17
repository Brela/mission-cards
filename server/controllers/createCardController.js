import CardModel from './models/Card.mjs';

export async function createCardController(req, res) {
    try {
        const newCard = new CardModel({
            deckId: req.body.deckId,
            front: req.body.question,
            back: req.body.answer,
            creationDate: new Date()
        });

        // await mongoDB to save the card
        const createdCard = await newCard.save();
        res.json(createdCard);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

