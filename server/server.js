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
const userRoutes = require('./routes/userRoutes');
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

const allowedOrigins = ['http://localhost:4000', 'https://missionchatgpt.com'];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = `The CORS policy for this site does not allow access from ${origin}.`;
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true,
        preflightContinue: true,
    })
);
/* app.use(
    cors()
); */

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


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
        cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
    })
);
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())
// check that the user is being logged in correctly, and the session is being updated with the user information
// - the issue is related to the session not being updated correctly after the user logs in.
app.use((req, res, next) => {
    if (!req.user && req.session && req.session.passport && req.session.passport.user) {
        User.findById(req.session.passport.user, (err, user) => {
            if (err) {
                console.log(err);
            } else {
                req.user = user;
            }
            next();
        });
    } else {
        console.log('passed checks', req.user)
        next();
    }
});

// app.use(flash())


app.use('/user', userRoutes)
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
