import { useState, useEffect, useRef } from 'react';
import { Outlet, Link } from "react-router-dom";

interface DeckType {
    _id: string;
    deckName: string;
    creationDate: string;
}

interface DeckProps {
    deck: DeckType;
    onDeleteDeck: (deckId: string) => void;
}

function Deck(props: DeckProps): JSX.Element {
    const { deck, onDeleteDeck } = props;
    const [moreOpen, setMoreOpen] = useState(false);

    const handleDeleteDeck = () => {
        onDeleteDeck(deck._id);
        setMoreOpen(false);
    };

    const handleMoreClick = () => {
        setMoreOpen(moreOpen);
        const allMorePopups = document.querySelectorAll('.more-popup');
        allMorePopups.forEach((popup) => {
            if (popup !== morePopupRef.current) {
                popup.classList.remove('open');
            }
        });
    };

    const morePopupRef = useRef<HTMLDivElement>(null);

    useEffect((): (() => void | undefined) | void => {
        const handleOutsideClick = (event: MouseEvent): void => {
            if (
                morePopupRef.current &&
                !morePopupRef.current.contains(event.target as Node) &&
                moreOpen
            ) {
                setMoreOpen(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [moreOpen]);

    return (
        <li className='deckListItem' key={deck._id}>
            <h5 className="deckName">  <Link to={`decks/${deck._id}`}>{deck.deckName}</Link></h5>
            <div className="cardsRemaining">77</div>
            <div className="more">
                <button className="more-btn" onClick={() => setMoreOpen(true)}>...</button>
                {moreOpen && (
                    <div className="more-popup">
                        <div className='more-popup-box'>
                            <div className='more-popup-content'>
                                <p>
                                    Are you sure you want to delete
                                    <br />
                                    -- {deck.deckName} --?
                                </p>

                                <button className="more-popup-btn delete-btn" onClick={handleDeleteDeck}>Delete</button>
                                {/* cancel button simply sets the state of showDeletePopup to false which closes it */}
                                <button className="more-popup-btn cancel-btn" onClick={() => setMoreOpen(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </li>
    );
}

export default Deck;
