import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import DeckType from '../../types/DeckType'
import { getNumCardsForDeck } from '../../utils/getNumCardsForDeck';
import { DeckContext } from '../../contexts/DeckContext';
import DotsPopup from './DotsPopup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useDropdown } from "../../hooks/useDropdown";

interface DeckProps {
    deck: DeckType;
    decks: DeckType[];
    loadDecks: () => Promise<void>;
}

function Deck({ deck, decks, loadDecks }: DeckProps): JSX.Element {
    const { setDeckName } = useContext(DeckContext);
    const [deckId, setDeckId] = useState('');
    const [numCards, setNumCards] = useState<number | null>(null);
    const deckNameNoSpaces = deck.deckName.replaceAll(' ', '-');

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


    // --------------------- all popups --------------------------
    const [openedPopupId, setOpenedPopupId] = useState<string | null>(null);

    const handleOpenPopup = (id: string) => {
        setOpenedPopupId(id);
    };

    const handleClosePopup = () => {
        setOpenedPopupId(null);
    };
    // ---------------------------------------------------

    return (
        <li className='deck-list-item' key={deck._id}>
            <h5 className="deck-name">
                <Link
                    key={deck._id}
                    to={`${deckNameNoSpaces}`}
                    onClick={handleDeckClick}
                >{deck.deckName}</Link></h5>
            <div className={`cards-remaining${numCards !== null ? " loaded" : ""}`}>{numCards}</div>

            <button className="more-btn" id={deck._id} onClick={(event) => handleOpenPopup(deck._id)}>
                <FontAwesomeIcon
                    className='fa-icon'
                    icon={faEllipsis}
                />
            </button>
            {openedPopupId && (
                <DotsPopup
                    openedPopupId={openedPopupId}
                    deck={deck}
                    loadDecks={loadDecks}
                    handleClosePopup={handleClosePopup}
                />
            )}

        </li>
    );
}

export default Deck;