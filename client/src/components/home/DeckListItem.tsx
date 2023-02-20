import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import DeckType from '../../types/DeckType'
import { getNumCardsForDeck } from '../../utils/getNumCardsForDeck';

interface DeckProps {
    deck: DeckType;
    onDeleteDeck: (deckId: string) => void;
}

function Deck(props: DeckProps): JSX.Element {
    const { deck, onDeleteDeck } = props;
    const [moreOpen, setMoreOpen] = useState(false);
    const [numCards, setNumCards] = useState(0);
    // const morePopupRef = useRef<HTMLDivElement>(null);

    const handleDeleteDeck = () => {
        onDeleteDeck(deck._id);
        setMoreOpen(false);
    };

    /* 
    const handleMoreClick = () => {
        setMoreOpen(moreOpen);
        const allMorePopups = document.querySelectorAll('.more-popup');
        allMorePopups.forEach((popup) => {
            if (popup !== morePopupRef.current) {
                popup.classList.remove('open');
            }
        });
    };


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
        }, [moreOpen]); */


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
            <h5 className="deck-name">  <Link to={`${deckNameNoSpaces}`}>{deck.deckName}</Link></h5>
            <div className="cards-remaining">{numCards}</div>
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