import React, { useState, useEffect } from 'react';
import CardType from '../../types/CardType';
import { getAllCardsForDeck } from '../../apiFetches/getAllCardsForDeck';

type Props = {
    deckName: string;
};

function CardList({ deckName }: Props) {
    const [cards, setCards] = useState<CardType[]>([]);

    async function fetchCards() {
        const response = await getAllCardsForDeck(deckName);
        setCards(response);
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

export default CardList;
