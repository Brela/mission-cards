import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createCard } from '../../apiFetches/createCard'

function AddCardToDeck() {
    const [frontText, setFrontText] = useState('');
    const [backText, setBackText] = useState('');
    let { deckName } = useParams()
    deckName = deckName?.replaceAll('-', ' ')


    async function handleCreateCard(e: React.FormEvent) {
        e.preventDefault();
        const response = await createCard(deckName!, frontText, backText)
        // setDecks([...decks, response]);
        console.log(response)
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

    return (
        <div>
            <h1 className='add-card'>Deck: <span>{deckName}</span></h1>
            <div className="decks-container add-cards-container">

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