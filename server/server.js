
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
const cors = require('cors');
const connectDB = require('./config/database.mjs');


dotenv.config({ path: './config/.env' });
const app = express();

const deckRoutes = require('./routes/deckRoutes');
const cardRoutes = require('./routes/cardRoutes');

app.use(cors());
app.use(express.static('client/public'));  // Serve the React app
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // this allows json post requests to be read by express

app.use('/deck', deckRoutes);
app.use('/card', cardRoutes);




connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running -- ${process.env.PORT}`)
    });
});
/* 
const express = require('express');
const app = express();
require('dotenv').config({ path: '../.env' });
const cors = require('cors');
const cookieParser = require('cookie-parser');

const inventoryRoutes = require('./routes/inventoryRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const userRoutes = require('./routes/userRoutes');
const companyRoutes = require('./routes/companyRoutes');
const authenticationRoutes = require('./routes/authenticationRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
// allow all origins during development?
app.use(
  cors({
    origin: `${process.env.CORS_ORIGIN}`,
    credentials: true,
  })
);
// allowing express to read incoming json data
app.use(express.json());
// allowing express to read urlencoded data
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  next();
});
app.use(cookieParser());
app.use('/inventory', inventoryRoutes);
app.use('/orders', ordersRoutes);
app.use('/user', userRoutes);
app.use('/company', companyRoutes);
app.use('/authentication', authenticationRoutes);
app.use('/settings', settingsRoutes);
app.use('/uploads', express.static('settingsRoutes'));

app.listen(process.env.PORT, () => {
  console.log('server is running!');
}); 
*/