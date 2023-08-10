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
const User = require('./models/User');

const logger = require('morgan')
const connectDB = require('./config/database.js');
const userRoutes = require('./routes/userRoutes');
const deckRoutes = require('./routes/deckRoutes');
const cardRoutes = require('./routes/cardRoutes');
const openAiRoutes = require('./routes/openAiRoutes');

require('dotenv').config({ path: './.env' });

// Passport config
require('./config/passport')(passport)

connectDB();

app.set("trust proxy", true);

const allowedOrigins = [
  "http://localhost:4000",
  "https://missionchatgpt.com",
  "https://missiongpt.netlify.app",
];

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


app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // this allows json post requests to be read by express

// app.use(logger('dev'))  this is useful for logging the requsest in the server's console log

// User session, this is saved in mongoDB
app.use(
    session({
        secret: `${process.env.SESSION_SECRET}`,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ client: mongoose.connection.getClient() }),
        cookie: {
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production', // Set to true for production when using HTTPS
        },
    })
);

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

/* app.use((req, res, next) => {
    console.log("server.js line 117 - req.session:  ", req.session);
    console.log("server.js line 118 - req.user:  ", req.user);
    next();
}); */



/* app.use((req, res, next) => {
    console.log("Req.user in server.js line 100:", req.user);
    next();
}); */
/* 
// req.user is avaiable here but not in deckRoutes
app.use('/decks', deckRoutes);
// req.user logs correctly here after decks route and inside cardRoutes
app.use('/cards', cardRoutes);
// req.user becomes undefined here again
app.use('/openai', openAiRoutes);
app.use('/user', userRoutes)

 */



app.use('/cards', cardRoutes);
app.use('/openai', openAiRoutes);
app.use('/user', userRoutes)
app.use('/decks', deckRoutes);

// Railway sets the PORT environment variable automatically, so you don't need to make any changes to this code for it to work correctly on Railway.
app.listen(process.env.PORT, () => {
    console.log(`Server is running -- ${process.env.PORT}`)
});
