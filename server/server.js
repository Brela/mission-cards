'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });


require('dotenv').config({ path: '../.env' });
const cors = require('cors');
const cookieParser = require('cookie-parser');
/* const express = require('express');
const DeckModel = require("./models/Deck.js");
const CardModel = require("./models/Card.js");
const cors = require('cors')
const Deck = DeckModel; */
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database.js');


dotenv.config({ path: './config/.env' });
const app = express();

const deckRoutes = require('./routes/deckRoutes');
const cardRoutes = require('./routes/cardRoutes');

app.use(cors());
app.use(express.static('client/public'));  // Serve the React app
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // this allows json post requests to be read by express

app.use('/decks', deckRoutes);
app.use('/cards', cardRoutes);




connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running -- ${process.env.PORT}`)
    });
});