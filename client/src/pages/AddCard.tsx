import React, { useState, useEffect } from 'react';

import '../styles/header.css'
import '../styles/footer.css'
import '../styles/addCard/addCardFrontBack.css'
import '../styles/addCard/displayCardsContainer.css'
import { CardListContext } from '../contexts/CardListContext'

import Header from '../components/Header';
import AddCardContainer from '../components/addCard/AddCardContainer'
import DisplayCardsForDeck from '../components/addCard/DisplayCardsContainer'
import Footer from '../components/Footer';
import CardType from '../types/CardType'

function AddCard() {
    const [cards, setCards] = useState<CardType[]>([]);

    return (
        <div className="add-card-page">
            <Header />
            <div className='align-containers'>
                <CardListContext.Provider value={{ cards, setCards }}>
                    <AddCardContainer />
                    <DisplayCardsForDeck />
                </CardListContext.Provider>
            </div>
            <Footer />
        </div>
    )
}

export default AddCard