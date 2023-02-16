import React, { useState } from 'react';
import '../styles/morePopup.css'

interface DeckType {
    _id: string;
    deckName: string;
    creationDate: string;
}
interface DeckProps {
    deck: DeckType;
    onDeleteDeck: (deckId: string) => void;
}

function Deck(props: DeckProps) {
    const { deck, onDeleteDeck } = props;
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const handleDeleteDeck = () => {
        onDeleteDeck(deck._id);
        setShowDeletePopup(false);
    };

    return (
        <li className='deckListItem'>
            <p className="deckName">{deck.deckName}</p>
            {/* <div className="cardsRemaining">{deck.cardsRemaining}</div> */}
            <div className="cardsRemaining">77</div>
            <div className="more">
                <button className="more-btn" onClick={() => setShowDeletePopup(true)}>...</button>
                {showDeletePopup && (
                    <div className="popup">
                        <p>Are you sure you want to delete this deck?</p>
                        <button className="popup-btn delete-btn" onClick={handleDeleteDeck}>Delete</button>
                        <button className="popup-btn cancel-btn" onClick={() => setShowDeletePopup(false)}>Cancel</button>
                    </div>
                )}
            </div>
            {showDeletePopup && (
                <div className="popup">
                    <p>Are you sure you want to delete this deck?</p>
                    <button onClick={handleDeleteDeck}>Delete</button>
                    <button onClick={() => setShowDeletePopup(false)}>Cancel</button>
                </div>
            )}
        </li>
    );
}

export default Deck;