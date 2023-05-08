import React, { useState, useEffect, useContext } from 'react';
import { useCardContext } from '../../contexts/CardListContext';
import { getAllCardsForDeck } from '../../services/cardAPI';
import { DeckContext } from '../../contexts/DeckContext';

type Props = {
    deckName: string;
};

function StudyCards() {
    const { cards, setCards } = useCardContext();
    const { deckName, setDeckName } = useContext(DeckContext);

    async function fetchCards() {
        const response = await getAllCardsForDeck(deckName);
        setCards(response);
    }

    useEffect(() => {
        if (!deckName) {
            console.log('No deckName prop passed to StudyCards component');
            return;
        }

        fetchCards();
    }, [deckName]);

    return (
        <div className="">
            <ul>
                {cards.map((card) => (
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
