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

interface DecksContainerProps {
    decks: DeckType[];
}
interface DeckProps {
    deck: DeckType;
    decks: DeckType[];
    loadDecks: () => Promise<void>;
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

    function isValidDecksArray(decks: any): decks is DeckType[] {
        if (!Array.isArray(decks)) {
            return false;
        }

        return decks.every((deck) => {
            return (
                typeof deck._id === "string" &&
                typeof deck.deckName === "string" &&
                typeof deck.creationDate === "string"
            );
        });
    }


    async function loadDecks() {
        try {
            if (!user) {
                await handleLoginUserAsGuest();
            }

            const loadedDecks = await getDecks();

            if (Array.isArray(loadedDecks)) {
                setDecks(loadedDecks);
            } else {
                throw new Error('Invalid decks data received from server.');
            }
        } catch (error) {
            console.error('Error loading decks:', (error as Error).message);
            // alert('Error loading decks: ' + (error as Error).message);
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
                            decks={decks}
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
