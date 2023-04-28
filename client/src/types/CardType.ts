
interface CardType {
    _id: string;
    deckName: string;
    front: string;
    back: string;
    creationDate: string;
    error?: string;
}

export default CardType