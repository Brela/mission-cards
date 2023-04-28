import React, { useState, useEffect, useContext } from 'react';
import ErrorContext from '../../contexts/ErrorContext';
import Deck from './Deck';
import DeckType from '../../types/DeckType';
import { getDecks } from '../../services/deckAPI';
import { createDeck } from '../../services/deckAPI';

interface DeckProps {
    deck: DeckType;
    loadDecks: () => void;
}


function DecksContainer() {
    const { setError } = useContext(ErrorContext);
    const [decks, setDecks] = useState<DeckType[]>([]);
    const [deckName, setDeckName] = useState('');

    async function loadDecks() {
        const loadedDecks = await getDecks()
        setDecks(loadedDecks);
    }

    useEffect(() => {
        loadDecks();
    }, []);

    async function handleCreateDeck(e: React.FormEvent) {
        e.preventDefault();
        const response = await createDeck(deckName);
        if ('error' in response) {
            setError(response.error);
        } else {
            setDecks([...decks, response]);
            setDeckName('');
        }
    }

    return (
        <div className="decks-container">
            <ul>
                <div className="">
                    {decks.map((deck) => (
                        <Deck
                            key={deck._id}
                            deck={deck}
                            loadDecks={loadDecks}
                        />
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

export default DecksContainer;
