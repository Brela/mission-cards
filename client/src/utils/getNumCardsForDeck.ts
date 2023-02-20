import CardType from '../types/CardType';
import { getAllCardsForDeck } from '../apiFetches/getAllCardsForDeck'

export async function getNumCardsForDeck(deckName: string): Promise<number> {

    const cards = await getAllCardsForDeck(deckName);
    const length = cards.length
    return length;
}

