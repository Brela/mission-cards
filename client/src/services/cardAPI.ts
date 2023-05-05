import { API_URL } from './_config';
import CardType from '../types/CardType';
type Name = string;

export async function createCard(deckName: string, front: string, back: string): Promise<CardType> {
    const response = await fetch(`${API_URL}/cards/${deckName}/newcard`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
            deckName,
            front,
            back
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    // this shows returns error message if user is not auithenticated
    if (response.status === 401) {
        const data = await response.json();
        return { error: data.message } as any;
    }

    return response.json();
}

export async function getAllCardsForDeck(deckName: Name): Promise<CardType[]> {
    const response = await fetch(`${API_URL}/cards/${deckName}`, {
        credentials: 'include',
    });
    return await response.json();
}
