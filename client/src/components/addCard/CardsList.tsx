import React, { useState, useEffect } from 'react';
import { useCardContext } from './_CardListContext';
import { getAllCardsForDeck } from '../../apiFetches/getAllCardsForDeck';

type Props = {
    deckName: string;
};

function CardList({ deckName }: Props) {

    // useCardContext() listens to changes in the cards state, which is passed down from the context provider through the useCardContext hook in the parent 'pages/AddCard'
    const { cards, setCards } = useCardContext();

    deckName = deckName.replaceAll('-', ' ')
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

    useEffect(() => {
        fetchCards();
        // [cards] is called a hook and listens for changes in the cards variable. When there's a change it'll run the function again
    }, [cards]);

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
