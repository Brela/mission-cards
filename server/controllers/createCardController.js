import CardModel from '../models/Card.mjs';

export async function createCardController(req, res) {
    try {
        const newCard = new CardModel({
            // this deckName is just to see what deck each card belongs to, for testing
            deckName: req.body.deckName,
            front: req.body.front,
            back: req.body.back,
            creationDate: new Date()
        });

        // await mongoDB to save the card
        const createdCard = await newCard.save();
        console.log(createdCard)
        res.json(createdCard);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

