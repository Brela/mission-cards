import React, { useState, useEffect, useContext } from 'react';
import ErrorContext from '../../contexts/ErrorContext';
import { UserContext } from '../../contexts/UserContext';
import { useCardContext } from '../../contexts/CardListContext';
import { DeckContext } from '../../contexts/DeckContext';
import { useNavigate, useParams } from "react-router-dom";
import { createCard } from '../../services/cardAPI'
import { getDecks } from '../../services/deckAPI';
import DeckType from '../../types/DeckType';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { loadUserThemeColor } from '../../services/userAPI'


function AddCardToDeck() {
    const { setError } = useContext(ErrorContext);
    const { user } = useContext(UserContext);
    const { cardsForDeck, setCardsForDeck } = useCardContext();
    const [frontText, setFrontText] = useState('');
    const [backText, setBackText] = useState('');
    /*  let { deckName } = useParams()
     deckName = deckName?.replaceAll('-', ' ') */
    const { deckName, setDeckName } = useContext(DeckContext);
    const [decks, setDecks] = useState<DeckType[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
        async function fetchData() {
            if (user) {
                await loadUserThemeColor(user._id);
                loadDecks();
            }
        }
        fetchData();
    }, [user]);

    async function loadDecks() {
        const loadedDecks = await getDecks()
        setDecks(loadedDecks);
    }

    useEffect(() => {
        loadDecks();
    }, []);



    async function handleCreateCard(e: React.FormEvent) {
        e.preventDefault();
        // to only send req if user is logged in
        if (!user) {
            setError('Please sign up to use this feature');
            return;
        }
        const response = await createCard(deckName!, frontText, backText)
        if ('error' in response) {
            setError(response.error || null);
        } else {

            setFrontText('');
            setBackText('');
            // add new card to cards list context cards array
            setCardsForDeck([...cardsForDeck, response]);
        }

    }

    /*     async function handleDeleteDeck(deckId: string) {
            await deleteDeck(deckId)
            loadDecks();
        }
        useEffect(() => {
            loadDecks();
        }, []); */

    useEffect(() => {
        setDeckName(deckName);
    }, [deckName]);


    function handleSelectDeck(e: React.ChangeEvent<HTMLSelectElement>) {
        const deckNameNoSpaces = e.target.value.toLowerCase().replaceAll(' ', '-');
        setDeckName(e.target.value);
        navigate(`/${deckNameNoSpaces}`);
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
                        <button type="submit">
                            <FontAwesomeIcon
                                className='faPlus-icon add-card-plus-button'
                                icon={faPlus}
                            />
                        </button>
                    </div >
                </form >
            </div >
        </div>
    );
}

export default AddCardToDeck;