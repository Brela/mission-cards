import React, { useState } from 'react';

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
    // the decks two props: deck is each deck pulled in from deck component, and onDeleteDeck is the function for deleting them
    // this is where we will add the `favorite a deck as well?`
    const { deck, onDeleteDeck } = props;
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    console.log(showDeletePopup)

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
                    <div className="more-popup">
                        <div className='more-popup-box'>
                            <div className='more-popup-content'>
                                <p>Are you sure you want to delete {deck.deckName}?</p>

                                <button className="more-popup-btn delete-btn" onClick={handleDeleteDeck}>Delete</button>
                                {/* cancel button simply sets the state of showDeletePopup to false which closes it */}
                                <button className="more-popup-btn cancel-btn" onClick={() => setShowDeletePopup(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </li >
    );
}

export default Deck;