import React, { useState, useEffect, useContext } from 'react';
import ErrorContext from '../../contexts/ErrorContext';
import { UserContext } from '../../contexts/UserContext';
import Deck from './Deck';
import DeckType from '../../types/DeckType';
import { getDecks } from '../../services/deckAPI';
import { createDeck } from '../../services/deckAPI';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
// usage -- {<FontAwesomeIcon icon={faSearch} />}

interface DeckProps {
    deck: DeckType;
    loadDecks: () => void;
}

function DecksContainer() {
    const { user } = useContext(UserContext);
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
        // front end route protection
        if (!user) {
            setError('Please login to use this feature');
            return;
        }
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
                    <label htmlFor="deck-title">Add Deck</label>
                    <input
                        id="deck-title"
                        value={deckName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setDeckName(e.target.value);
                        }}
                    />
                    <button type="submit" className='faPlus-icon-button'>
                        <FontAwesomeIcon
                            className='faPlus-icon'
                            icon={faPlus}
                        />
                    </button>
                </div>
            </form>
        </div>
    );
}

export default DecksContainer;
