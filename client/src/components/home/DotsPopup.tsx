import React, { useEffect } from "react"
import DeckType from '../../types/DeckType'
import { deleteDeck } from '../../services/deckAPI'

interface DotsPopupProps {
    deck: DeckType;
    loadDecks: () => void;
    handleClosePopup: (event: React.MouseEvent<HTMLButtonElement>) => void;
}


export default function DotsPopup({ deck, loadDecks, handleClosePopup }: DotsPopupProps): JSX.Element {

    async function handleDeleteDeck(event: React.MouseEvent<HTMLButtonElement>, deckId: string) {
        await deleteDeck(deckId);
        loadDecks();
        handleClosePopup(event);
    }


    return (
        <div className="more-popup">
            <div className='more-popup-box'>
                <div className='more-popup-content'>
                    <p>
                        Are you sure you want to delete
                        <br />
                        -- {deck.deckName} --?
                    </p>

                    <button className="more-popup-btn delete-btn" onClick={(event) => event && handleDeleteDeck(event, deck._id)}>Delete</button>
                    {/* cancel button simply sets the state of showDeletePopup to false which closes it */}
                    <button className="more-popup-btn cancel-btn" onClick={(event) => { handleClosePopup(event) }}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
