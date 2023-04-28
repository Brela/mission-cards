import { API_URL } from './_config';
import DeckType from '../types/DeckType';

export async function getDecks(): Promise<DeckType[]> {
    const response = await fetch(`${API_URL}/decks`);
    return await response.json();
}

export async function createDeck(deckName: string) {
    const response = await fetch(`${API_URL}/decks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            deckName,
        }),
    });
    // --------------- this error is caused by user not being logged in --------------
    // -------------   error is sent to error context then mui error popup  -------
    if (response.status === 401) {
        const data = await response.json();
        return { error: data.message };
    }

    const responseData = await response.json();
    console.log('done', responseData.deckName);
    return responseData;
}

export async function deleteDeck(deckId: string) {
    const response = await fetch(`${API_URL}/decks/${deckId}`, {
        method: 'DELETE',
    });
    // --------------- this error is caused by user not being logged in --------------
    // -------------   error is sent to error context then mui error popup  -------
    if (response.status === 401) {
        const data = await response.json();
        return { error: data.message };
    }
    //--------------------------------
    return response;
}