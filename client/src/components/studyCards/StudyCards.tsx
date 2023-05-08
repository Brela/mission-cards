import React, { useState, useEffect, useContext } from 'react';
import { CardListContext } from '../../contexts/CardListContext';
import { getAllCardsForDeck } from '../../services/cardAPI';
import { DeckContext } from '../../contexts/DeckContext';

type Props = {
    deckName: string;
};

function StudyCards() {
    const { cardsForDeck, setCardsForDeck, allCards } = useContext(CardListContext)
    const { deckName, setDeckName } = useContext(DeckContext);

    async function fetchCards() {
        const response = await getAllCardsForDeck(deckName);
        setCardsForDeck(response);
    }

    useEffect(() => {
        /*    if (!deckName) {
               console.log('No deckName prop passed to StudyCards component');
               return;
           } */

        fetchCards();
    }, [deckName]);

    return (
        <div className="study-cards-container">

            <ul>
                {allCards.map((card) => (
                    <li
                        className='card-list-item'
                        key={card._id}>

                        <div className='display-card-front'>{card.front}</div>
                        <div className='display-card-back'>{card.back}</div>

                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StudyCards;
