import React, { useEffect, useContext } from "react";
import ErrorContext from '../../contexts/ErrorContext';
import { UserContext } from '../../contexts/UserContext';
import { DeckContext } from '../../contexts/DeckContext';
import DeckType from '../../types/DeckType'
import { deleteDeck, getDecks } from '../../services/deckAPI'

interface DotsPopupProps {
    deck: DeckType;
    loadDecks: () => Promise<void>;
    openedPopupId: any;
    handleClosePopup: () => void; // Update the type here
}

export default function DotsPopup({ deck, loadDecks, openedPopupId, handleClosePopup }: DotsPopupProps): JSX.Element {
    const { user, isAuthenticated } = useContext(UserContext);
    const { reloadDecks } = useContext(DeckContext);
    const { setError } = useContext(ErrorContext);

    async function handleDeleteDeck(event: React.MouseEvent<HTMLButtonElement>, deckId: string) {
        // front end route protection
        if (!isAuthenticated) {
            setError('Please sign up to use this feature');
            return;
        }
        console.log(deckId)
        const response = await deleteDeck(deckId);
        if ('error' in response) {
            setError(response.error || null);
        } else {
            loadDecks();
            handleClosePopup();
        }
    }

    return (
        <React.Fragment>
            {openedPopupId && (
                <div className="more-popup">
                    <div className='more-popup-box'>
                        <div className='more-popup-content'>
                            <p>
                                Are you sure you want to delete
                                <br />
                                -- {deck.deckName} --?
                            </p>

                            <button className="more-popup-btn delete-btn" onClick={(event) => event && handleDeleteDeck(event, deck._id)}>Delete</button>
                            <button className="more-popup-btn cancel-btn" onClick={handleClosePopup}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}
