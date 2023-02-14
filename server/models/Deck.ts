/* import mongoose from 'mongoose'
mongoose.set('strictQuery', false);

const DeckSchema = new mongoose.Schema({
  title: String,
})

const DeckModel = mongoose.model('Deck', DeckSchema)

export default DeckModel
 */

import mongoose from 'mongoose'
mongoose.set('strictQuery', false);

const DeckSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
    auto: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
})

const DeckModel = mongoose.model('Deck', DeckSchema)

const CardSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
    auto: true
  },
  deckId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Deck'
  },
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
})

const CardModel = mongoose.model('Card', CardSchema)

export { DeckModel, CardModel }