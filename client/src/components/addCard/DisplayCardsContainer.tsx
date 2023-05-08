import React from 'react';
import { useParams } from 'react-router-dom';
import CardList from './CardsList';


function DisplayCardsForDeck() {
    const { deckName } = useParams()

    return (
        <div>
            <div className='card-list-heading'><h3>Cards Preview</h3></div>
            <div className='display-cards-container theme-color'>
                <CardList />
            </div>
        </div>
    );
}

export default DisplayCardsForDeck;
