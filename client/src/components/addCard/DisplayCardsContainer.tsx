import React from 'react';
import { useParams } from 'react-router-dom';
import CardList from './CardsList';


function DisplayCardsForDeck() {
    const { deckName } = useParams()

    return (
        <div>
            <h1 className='card-list'>Cards</h1>
            <div className='display-cards-container theme-color'>
                <CardList deckName={deckName ? deckName : ''} />
            </div>
        </div>
    );
}

export default DisplayCardsForDeck;
