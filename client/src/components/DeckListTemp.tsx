import React, { useState, useEffect } from 'react';
import Deck from './DeckTemp';

interface DeckType {
    _id: string;
    deckName: string;
    creationDate: string;
}

function DeckList() {
    const [decks, setDecks] = useState<DeckType[]>([]);
    const [deckName, setDeckName] = useState('');

    async function loadDecks() {
        const response = await fetch('http://localhost:5000/decks');
        const newDecks = await response.json();
        setDecks(newDecks);
    }

    async function handleCreateDeck(e: React.FormEvent) {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/decks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                deckName,
            }),
        });
        loadDecks();
        setDeckName('');
    }

    async function handleDeleteDeck(deckId: string) {
        await fetch(`http://localhost:5000/decks/${deckId}`, {
            method: 'DELETE',
        });
        loadDecks();
    }

    useEffect(() => {
        loadDecks();
    }, []);

    return (
        <div className="decksContainer">
            <div className="">
                {decks.map((deck) => (
                    <Deck key={deck._id} deck={deck} onDeleteDeck={handleDeleteDeck} />
                ))}
            </div>
            <form onSubmit={handleCreateDeck}>
                <label htmlFor="deck-title">Add Title</label>
                <input
                    id="deck-title"
                    value={deckName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setDeckName(e.target.value);
                    }}
                />
                <button>Create Deck</button>
            </form>
        </div>
    );
}

export default DeckList;