import React, { useState, useEffect } from 'react';
import { useCardContext } from '../../contexts/CardListContext';
import { getAllCardsForDeck } from '../../services/cardAPI';

type Props = {
    deckName: string;
};

function CardList({ deckName }: Props) {
    const { cardsForDeck, setCardsForDeck } = useCardContext();

    deckName = deckName.replaceAll('-', ' ');

    async function fetchCards() {
        const response = await getAllCardsForDeck(deckName);
        setCardsForDeck(response);
    }

    useEffect(() => {
        if (!deckName) {
            console.log('No deckName prop passed to CardList component');
            return;
        }

        fetchCards();
    }, [deckName]);

    return (
        <div className="">
            <ul>
                {cardsForDeck.map((card) => (
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

export default CardList;
