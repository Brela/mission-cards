'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });


const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');


const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo');

const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database.js');
const authRoutes = require('./routes/authRoutes');
const deckRoutes = require('./routes/deckRoutes');
const cardRoutes = require('./routes/cardRoutes');
const openAiRoutes = require('./routes/openAiRoutes');

require('dotenv').config({ path: './.env' });

// Passport config
require('./config/passport')(passport)
app.use((req, res, next) => {
    console.log("req.user:", req.user);
    next();
});
connectDB();

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow all origins or check the origin against a list of allowed origins
            callback(null, true);
        },
        credentials: true,
    })
);

app.use(express.static('client/public'));  // Serve the React app
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // this allows json post requests to be read by express
app.use(logger('dev'))
// User session, this is saved in mongoDB
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ client: mongoose.connection.getClient() }),
    })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())


app.use('/auth', authRoutes)
app.use('/decks', deckRoutes);
app.use('/cards', cardRoutes);
app.use('/openai', openAiRoutes);

app.get('/', (req, res) => {
    // Handle the request for the root URL
    // You can send a response, render a template, or redirect to another page
    res.send('Hello, World!');
});


// Railway sets the PORT environment variable automatically, so you don't need to make any changes to this code for it to work correctly on Railway.
app.listen(process.env.PORT, () => {
    console.log(`Server is running -- ${process.env.PORT}`)
});
