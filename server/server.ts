import express, { Request, Response } from "express";
import { DeckModel, CardModel } from "./models/Deck";
const Deck = DeckModel;
require('dotenv').config({ path: './config/.env' })

const app = express()
app.use(express.static('client/public'));  // Serve the React app
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) // this allows json post requests to be read by express


app.get('/', (req: Request, res: Response) => {
    res.send("gg")
})

app.post('/decks', async (req: Request, res: Response) => {
    const newDeck = new DeckModel({
        name: req.body.name,
        description: req.body.description,
        creationDate: new Date()
    });
    // await mongoDB to save the deck
    const createdDeck = await newDeck.save();
    res.json(createdDeck);
});

app.post('/cards', async (req: Request, res: Response) => {
    const newCard = new CardModel({
        deckId: req.body.deckId,
        question: req.body.question,
        answer: req.body.answer,
        creationDate: new Date()
    });
    // await mongoDB to save the card
    const createdCard = await newCard.save();
    res.json(createdCard);
});

const connectDB = require('./config/database')
// wait for mongo connection before starting server inside the .then()
connectDB().then(() => {

    app.listen(process.env.PORT, () => {
        console.log(`Server is running -- ${process.env.PORT}`)
    })
})