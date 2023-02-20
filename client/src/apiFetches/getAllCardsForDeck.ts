import { API_URL } from './config';
import CardType from '../types/CardType';
type Name = string;


export async function getAllCardsForDeck(deckName: Name): Promise<CardType[]> {
    const response = await fetch(`${API_URL}/${deckName}`);
    return await response.json();
} 