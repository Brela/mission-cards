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
        fetchCards();
    }, [deckName]);

    return (
        <div className="">
            <ul>
                {cards.map((card) => (
                    <li key={card._id}>
                        {card.front} - {card.back}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CardList;
