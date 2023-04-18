import { API_URL } from './_config';
import CardType from '../types/CardType';
type Name = string;

export async function createCard(deckName: string, front: string, back: string): Promise<CardType> {
    const response = await fetch(`${API_URL}/${deckName}/newcard`, {
        method: 'POST',
        body: JSON.stringify({
            deckName,
            front,
            back
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response.json();
}

export async function getAllCardsForDeck(deckName: Name): Promise<CardType[]> {
    const response = await fetch(`${API_URL}/${deckName}`);
    return await response.json();
} 