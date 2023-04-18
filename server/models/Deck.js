const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const DeckSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
    auto: true
  },
  deckName: {
    type: String,
    required: true
  },
  listOrder: {
    type: Number,
    required: false
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
})

const DeckModel = mongoose.model('Deck', DeckSchema)


module.exports = DeckModel;