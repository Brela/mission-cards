/* const express = require('express');
const DeckModel = require("./models/Deck.js");
const CardModel = require("./models/Card.js");
const cors = require('cors')
const Deck = DeckModel; */
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.mjs';

import { getDecksController } from './controllers/getDecksController.js';
import { getSingleCardController } from './controllers/getSingleCardController.js';
import { getAllCardsController } from './controllers/getAllCardsController.js';
import { getAllCardsForDeckController } from './controllers/getAllCardsForDeckController.js';
import { createDeckController } from './controllers/createDeckController.js';
import { createCardController } from './controllers/createCardController.js';
import { updateCardController } from './controllers/updateCardController.js';
import { updateDeckController } from './controllers/updateDeckController.js';
import { deleteDeckController } from './controllers/deleteDeckController.js';
import { deleteCardController } from './controllers/deleteCardController.js';

dotenv.config({ path: './config/.env' });
const app = express();

app.use(cors());
app.use(express.static('client/public'));  // Serve the React app
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // this allows json post requests to be read by express


app.get('/decks', getDecksController);
app.post('/decks', createDeckController);
app.delete('/decks/:deckId', deleteDeckController);
// update deckName isn't configured yet
app.put('/:deckId/', updateDeckController);


app.get('/cards', getAllCardsController);
app.get('/:deckName', getAllCardsForDeckController);
app.get('/:deckName/:cardId', getSingleCardController);
app.post('/:deckName/newcard', createCardController);
app.delete('/:deckName/:cardId', deleteCardController);
// update card isn't configured yet
app.put('/:deckName/:cardId', updateCardController);


connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running -- ${process.env.PORT}`)
    });
});