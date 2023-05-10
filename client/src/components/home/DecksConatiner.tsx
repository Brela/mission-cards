import React, { useState, useEffect, useContext } from 'react';
import ErrorContext from '../../contexts/ErrorContext';
import { UserContext } from '../../contexts/UserContext';
import Deck from './Deck';
import DeckType from '../../types/DeckType';
import { getDecks } from '../../services/deckAPI';
import { createDeck } from '../../services/deckAPI';
import { loadUserThemeColor, loginAsGuest } from '../../services/userAPI'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
// usage -- {<FontAwesomeIcon icon={faSearch} />}

interface DeckProps {
    deck: DeckType;
}

function DecksContainer() {
    const { user, setUser, setIsAuthenticated, isAuthenticated } = useContext(UserContext);
    const { setError } = useContext(ErrorContext);
    const [decks, setDecks] = useState<DeckType[]>([]);
    const [deckName, setDeckName] = useState('');

    // check passed
    useEffect(() => {
        async function fetchData() {
            if (user) {
                await loadUserThemeColor(user._id);
                loadDecks();
            }
        }
        fetchData();
    }, [user]);

    async function handleLoginUserAsGuest() {
        const response = await loginAsGuest();
        if (response.status === 200) {
            setIsAuthenticated(false);
            setUser(response.data.user);
            window.location.href = '/';
        } else {
            // Display error message if login fails
            alert(response.data.error);
        }
    }

    async function loadDecks() {
        // check passed
        try {
            if (!user) {
                await handleLoginUserAsGuest();
            }
            // Now load decks after loginGuest has completed
            const loadedDecks = await getDecks();
            console.log(loadedDecks)
            setDecks(loadedDecks);
        } catch (error) {
            // Handle the error
            console.error(error);
        }
    }




    useEffect(() => {
        loadDecks();
    }, []);

    async function handleCreateDeck(e: React.FormEvent) {
        e.preventDefault();
        // front end route protection
        if (!isAuthenticated) {
            setError('Please sign up to use this feature');
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
                        // check passed for Deck component and styles
                        <Deck
                            key={deck._id}
                            deck={deck}
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
