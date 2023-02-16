/* const express = require('express');
// const { Request, Response } = require('express');
const DeckModel = require("./models/Deck.js");
const CardModel = require("./models/Card.js");
const cors = require('cors')
const Deck = DeckModel; */
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pkg from 'body-parser';
const { json, urlencoded } = pkg;
import connectDB from './config/database.mjs';
import DeckModel from './models/Deck.mjs';
import CardModel from './models/Card.mjs';
const Deck = DeckModel;

dotenv.config({ path: './config/.env' })
const app = express()
app.use(cors())
app.use(express.static('client/public'));  // Serve the React app
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) // this allows json post requests to be read by express


app.get('/decks', async (req, res) => {
    // the find() method in express will get all decks if it had no params
    const decks = await Deck.find();
    res.json(decks);
})

app.post('/decks', async (req, res) => {
    try {
        const newDeck = new DeckModel({
            deckName: req.body.deckName, // use 'deckName' instead of 'description'
            creationDate: new Date()
        });

        const createdDeck = await newDeck.save();
        res.status(201).json(createdDeck);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/cards', async (req, res) => {
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

app.delete('/decks/:deckId', async (req, res) => {
    const deckId = req.params.deckId;
    const deck = await Deck.findByIdAndDelete(deckId);
    res.json(deck)
})


// wait for mongo connection before starting server inside the .then()
connectDB().then(() => {

    app.listen(process.env.PORT, () => {
        console.log(`Server is running -- ${process.env.PORT}`)
    })
})