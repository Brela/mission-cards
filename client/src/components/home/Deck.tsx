import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import DeckType from '../../types/DeckType'
import { getNumCardsForDeck } from '../../utils/getNumCardsForDeck';
import { DeckContext } from '../../contexts/DeckContext';
import DotsPopup from './DotsPopup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

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
    decks: DeckType[];
    loadDecks: () => Promise<void>;
}

function Deck({ deck, decks, loadDecks }: DeckProps): JSX.Element {
    const { setDeckName } = useContext(DeckContext);
    const [deckId, setDeckId] = useState('');
    const [popupIsOpen, setPopupIsOpen] = useState(false);

    const [numCards, setNumCards] = useState<number | null>(null);
    const deckNameNoSpaces = deck.deckName.replaceAll(' ', '-')

    useEffect(() => {
        const fetchNumCards = async () => {
            const cards = await getNumCardsForDeck(deck.deckName);
            setNumCards(cards);
        }
        fetchNumCards();
    }, [deck.deckName]);

    const handleDeckClick = () => {
        setDeckName(deck.deckName);
    };

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
            <h5 className="deck-name">
                <Link
                    key={deck._id}
                    to={`${deckNameNoSpaces}`}
                    onClick={handleDeckClick}
                >{deck.deckName}</Link></h5>
            {/* the loaded class is used in the css file to transition the nums to full opacity once in */}
            <div className={`cards-remaining${numCards !== null ? " loaded" : ""}`}>{numCards}</div>
            <div className="more">
                <button className="more-btn" id={deck._id} onClick={handleOpenPopupClick}>
                    <FontAwesomeIcon
                        className='fa-icon'
                        icon={faEllipsis}
                    />
                </button>
                {popupIsOpen && (
                    <DotsPopup
                        deck={deck}
                        handleClosePopup={handleClosePopupClick}
                        loadDecks={loadDecks}
                    />
                )}
            </div>
        </li>
    );
}

export default Deck;
