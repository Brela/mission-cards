/* const express = require('express');
const DeckModel = require("./models/Deck.js");
const CardModel = require("./models/Card.js");
const cors = require('cors')
const Deck = DeckModel; */
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.mjs';
import DeckModel from './models/Deck.mjs';
import CardModel from './models/Card.mjs';
import { getDecksController } from './controllers/getDeckController.js';
import { getCardController } from './controllers/getCardController.js';
import { getCardsController } from './controllers/getCardsController.js';
import { createDeckController } from './controllers/createDeckController.js';
import { createCardController } from './controllers/createCardController.js';
import { deleteDeckController } from './controllers/deleteDeckController.js';
import { deleteCardController } from './controllers/deleteCardController.js';
const Deck = DeckModel;

dotenv.config({ path: './config/.env' })
const app = express()
app.use(cors())
app.use(express.static('client/public'));  // Serve the React app
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) // this allows json post requests to be read by express


app.get('/decks', getDecksController);
app.post('/decks', createDeckController);
app.delete('/decks/:deckId', deleteDeckController);

/* app.get('/decks/:deckId', async (req, res) => {
    const decks = await Deck.find();
    res.json(decks);
}) */

// get all cards for a deck
app.get('/:deckName', getCardsController);
// get a single card
app.get('/:deckName/:cardId', getCardController);

app.post('/:deckName/newcard', createCardController);
app.delete('/decks/:deckId/card', deleteCardController);


// wait for mongo connection before starting server inside the .then()
connectDB().then(() => {

    app.listen(process.env.PORT, () => {
        console.log(`Server is running -- ${process.env.PORT}`)
    })
})