import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DeckType from '../../types/DeckType'
import { getNumCardsForDeck } from '../../utils/getNumCardsForDeck';
import DotsPopup from './DotsPopup'

/* interface DeckProps {
    deck: DeckType;
    loadDecks: () => void;
    popupIsOpen: boolean;
    setPopupIsOpen: (popupIsOpen: boolean) => void; // add this line
    handleOpenPopup: (deckId: string, event: React.MouseEvent<HTMLButtonElement>) => void;
    handleClosePopup: (event: React.MouseEvent<HTMLButtonElement>) => void;
} */
interface DeckProps {
    deck: DeckType;
    loadDecks: () => void;
}

function Deck({ deck, loadDecks }: DeckProps): JSX.Element {
    const [deckId, setDeckId] = useState('');
    const [popupIsOpen, setPopupIsOpen] = useState(false);

    const [numCards, setNumCards] = useState(0);
    const deckNameNoSpaces = deck.deckName.replaceAll(' ', '-')

    useEffect(() => {
        const fetchNumCards = async () => {
            const cards = await getNumCardsForDeck(deck.deckName);
            setNumCards(cards);
        }
        fetchNumCards();
    }, [deck.deckName]);

    const handleOpenPopupClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setPopupIsOpen(true);
        handleOpenPopup(deck._id, event);
    }

    const handleClosePopupClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setPopupIsOpen(false);
        handleClosePopup(event);
    }

    function handleOpenPopup(deckId: string, event: React.MouseEvent<HTMLButtonElement>) {
        if (event && event.target) {
            setPopupIsOpen(true);
            setDeckId(deckId);
        }
    }
    function handleClosePopup(event: React.MouseEvent<HTMLButtonElement>) {
        setPopupIsOpen(false);
    }

    return (
        <li className='deck-list-item' key={deck._id}>
            <h5 className="deck-name">  <Link key={deck._id} to={`${deckNameNoSpaces}`}>{deck.deckName}</Link></h5>
            <div className="cards-remaining">{numCards}</div>
            <div className="more">
                <button className="more-btn" id={deck._id} onClick={handleOpenPopupClick}>...</button>
                {popupIsOpen && (
                    <DotsPopup
                        deck={deck}
                        loadDecks={loadDecks}
                        handleClosePopup={handleClosePopupClick}
                    />
                )}
            </div>
        </li>
    );
}

export default Deck;
