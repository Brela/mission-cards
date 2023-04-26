import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { createCard } from '../../services/cardAPI'
import { getDecks } from '../../services/deckAPI';
import DeckType from '../../types/DeckType';

function AddCardToDeck() {
    const [frontText, setFrontText] = useState('');
    const [backText, setBackText] = useState('');
    let { deckName } = useParams()
    deckName = deckName?.replaceAll('-', ' ')
    const [decks, setDecks] = useState<DeckType[]>([]);
    const navigate = useNavigate();


    async function loadDecks() {
        const loadedDecks = await getDecks()
        setDecks(loadedDecks);
    }

    useEffect(() => {
        loadDecks();
    }, []);


    async function handleCreateCard(e: React.FormEvent) {
        e.preventDefault();
        const response = await createCard(deckName!, frontText, backText)
        // setDecks([...decks, response]);
        setFrontText('');
        setBackText('');
    }

    /*     async function handleDeleteDeck(deckId: string) {
            await deleteDeck(deckId)
            loadDecks();
        }
        useEffect(() => {
            loadDecks();
        }, []); */

    function handleSelectDeck(e: React.ChangeEvent<HTMLSelectElement>) {
        navigate(`/decks/${e.target.value.toLowerCase().replaceAll(' ', '-')}`);
    }


    return (
        <div>
            <div className="addcardtodeck">
                <h1 className="add-card">Add Card to Deck:</h1>

                <select value={deckName} onChange={handleSelectDeck}>

                    {decks.map((deck) => (
                        <option key={deck._id} value={deck.deckName}>
                            {deck.deckName}
                        </option>
                    ))}
                </select>
            </div>
            <div className="add-cards-container">

                <form onSubmit={handleCreateCard}>
                    <div className='add-cards-sub-container'>
                        <div className='card-front'>
                            <label htmlFor="card-front-text">Front:</label>

                            <textarea
                                spellCheck='false'
                                id="card-front-text"
                                className='card-text'

                                value={frontText}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                    setFrontText(e.target.value);
                                }}
                            />

                        </div>
                        <div className='card-back'>
                            <label htmlFor="card-back-text">Back:</label>

                            <textarea
                                spellCheck='false'
                                id="card-back-text"
                                className='card-text'

                                value={backText}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                    setBackText(e.target.value);
                                }}
                            />

                        </div>
                        <button type="submit">Create Card</button>
                    </div >
                </form >
            </div >
        </div>
    );
}

export default AddCardToDeck;