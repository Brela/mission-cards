import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

const CardSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        required: true,
        auto: true
    },
    /*     deckId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Deck'
        }, */
    deckName: {
        type: String,
        required: true
    },
    front: {
        type: String,
        required: true
    },
    back: {
        type: String,
        required: false
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
})

const CardModel = mongoose.model('Card', CardSchema)


export default CardModel