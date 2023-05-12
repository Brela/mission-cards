import React, { useState, useEffect, useContext } from 'react';
import { useCardContext } from '../../contexts/CardListContext';
import { getAllCardsForDeck } from '../../services/cardAPI';
import { DeckContext } from '../../contexts/DeckContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

type Props = {
    deleteAndEditButtons: boolean,
};

function CardList({ deleteAndEditButtons }: Props) {
    const { cardsForDeck, setCardsForDeck } = useCardContext();
    const { deckName } = useContext(DeckContext)

    // deckName = deckName.replaceAll('-', ' ');

    async function fetchCards() {
        const response = await getAllCardsForDeck(deckName);
        setCardsForDeck(response);
    }

    useEffect(() => {
        if (!deckName) {
            console.log('No deckName prop passed to CardList component');
            return;
        }

        fetchCards();
    }, [deckName]);

    return (
        <div className="">
            <ul>
                {cardsForDeck.map((card) => (
                    <li
                        className='card-list-item'
                        key={card._id}>
                        <div className='card-front-and-back'>
                            <div className='display-card-front'>{card.front}</div>
                            <div className='display-card-back'>{card.back}</div>
                        </div>
                        <div className='edit-delete-buttons' id='fa-icon'>
                            <button type="submit" className='fa-icon' >
                                <FontAwesomeIcon
                                    className='faPlus-icon'
                                    icon={faPen}
                                />
                            </button>
                            <button type="submit" className='fa-icon'>
                                <FontAwesomeIcon
                                    className='faPlus-icon'
                                    icon={faTrash}
                                />
                            </button>
                        </div>
                        <div>

                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CardList;
