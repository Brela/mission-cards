import mongoose from 'mongoose'
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
  creationDate: {
    type: Date,
    default: Date.now
  }
})

const DeckModel = mongoose.model('Deck', DeckSchema)


export { DeckModel }