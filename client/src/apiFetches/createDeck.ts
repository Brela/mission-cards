import { API_URL } from './config';

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
    const responseData = await response.json();
    console.log('done', responseData.deckName);
    return responseData;
}