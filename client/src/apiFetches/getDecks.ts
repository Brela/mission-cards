import { API_URL } from './config';
import DeckType from '../types/DeckType';


export async function getDecks(): Promise<DeckType[]> {
    const response = await fetch(`${API_URL}/decks`);
    return await response.json();
}