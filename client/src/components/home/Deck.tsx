import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DeckType from '../../types/DeckType'
import { getNumCardsForDeck } from '../../utils/getNumCardsForDeck';
import DotsPopup from './DotsPopup'

interface DeckProps {
    deck: DeckType;
    loadDecks: () => void;
    popupIsOpen: boolean;
    handleOpenPopup: (deckId: string, event: React.MouseEvent<HTMLButtonElement>) => void;
    handleClosePopup: (event: React.MouseEvent<HTMLButtonElement>) => void;
}


function Deck({ deck, loadDecks, popupIsOpen, handleOpenPopup, handleClosePopup }: DeckProps): JSX.Element {
    const [numCards, setNumCards] = useState(0);

    const deckNameNoSpaces = deck.deckName.replaceAll(' ', '-')

    useEffect(() => {
        const fetchNumCards = async () => {
            const cards = await getNumCardsForDeck(deck.deckName);
            setNumCards(cards);
        }
        fetchNumCards();
    }, [deck.deckName]);

    return (
        <li className='deck-list-item' key={deck._id}>
            <h5 className="deck-name">  <Link key={deck._id} to={`${deckNameNoSpaces}`}>{deck.deckName}</Link></h5>
            <div className="cards-remaining">{numCards}</div>
            <div className="more">
                <button className="more-btn" id={deck._id} onClick={(e) => handleOpenPopup(deck._id, e)}>...</button>
                {popupIsOpen && (
                    <DotsPopup
                        deck={deck}
                        loadDecks={loadDecks}
                        handleClosePopup={handleClosePopup}
                    />
                )}
            </div>
        </li>
    );
}

export default Deck;
