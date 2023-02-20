import React from 'react';
import { useParams } from 'react-router-dom';
import CardList from './CardsList';

type Name = string;
interface Props {
    deckName?: string;
}
function DisplayCardsForDeck() {
    const { deckName } = useParams()
    console.log(deckName)

    return (
        <div>
            <h1 className='card-list'>Cards</h1>
            <div className='decks-container display-cards-container theme-color'>
                <CardList deckName={deckName ? deckName : ''} />
            </div>
        </div>
    );
}

export default DisplayCardsForDeck;
