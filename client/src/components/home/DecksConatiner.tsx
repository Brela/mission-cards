import React, { useState, useEffect } from 'react';
import Deck from './Deck';
import DeckType from '../../types/DeckType';
import { getDecks } from '../../apiFetches/getDecks';
import { createDeck } from '../../apiFetches/createDeck';

interface DeckProps {
    deck: DeckType;
    loadDecks: () => void;
    popupIsOpen: boolean;
    setPopupIsOpen: (popupIsOpen: boolean) => void; // add this line
    handleOpenPopup: (deckId: string, event: React.MouseEvent<HTMLButtonElement>) => void;
    handleClosePopup: (event: React.MouseEvent<HTMLButtonElement>) => void;
}


function DecksContainer() {
    const [popupIsOpen, setPopupIsOpen] = useState(false);
    const [deckId, setDeckId] = useState('');
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
        const response = await createDeck(deckName)
        setDecks([...decks, response]);
        setDeckName('');
    }

    function handleOpenPopup(deckId: string, event: React.MouseEvent<HTMLButtonElement>) {
        if (event && event.target) {
            setPopupIsOpen(true);
            setDeckId(deckId);
        }
    }

    function handleClosePopup(event: React.MouseEvent<HTMLButtonElement>) {
        setPopupIsOpen(false);
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
                            popupIsOpen={popupIsOpen}
                            handleOpenPopup={handleOpenPopup}
                            handleClosePopup={handleClosePopup}
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
