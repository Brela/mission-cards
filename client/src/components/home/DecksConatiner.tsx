import React, { useState, useEffect } from 'react';
import Deck from './DeckListItem';
import DeckType from '../../types/DeckType';
import { getDecks } from '../../apiFetches/getDecks'
import { createDeck } from '../../apiFetches/createDeck'
import { deleteDeck } from '../../apiFetches/deleteDeck'

function DeckList() {
    const [decks, setDecks] = useState<DeckType[]>([]);
    const [deckName, setDeckName] = useState('');

    async function loadDecks() {
        const loadedDecks = await getDecks()
        setDecks(loadedDecks);
    }


    async function handleCreateDeck(e: React.FormEvent) {
        e.preventDefault();
        const response = await createDeck(deckName)
        setDecks([...decks, response]);
        setDeckName('');
    }

    async function handleDeleteDeck(deckId: string) {
        await deleteDeck(deckId)
        loadDecks();
    }
    useEffect(() => {
        loadDecks();
    }, []);

    return (
        <div className="decks-container theme-color">
            <ul>
                <div className="">
                    {decks.map((deck) => (
                        <Deck key={deck._id} deck={deck} onDeleteDeck={handleDeleteDeck} />
                    ))}
                </div>
            </ul>
            <form onSubmit={handleCreateDeck}>
                <div className='create-deck'>
                    <label htmlFor="deck-title">Deck Name </label>
                    <input
                        id="deck-title"
                        value={deckName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setDeckName(e.target.value);
                        }}
                    />
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    );
}

export default DeckList;