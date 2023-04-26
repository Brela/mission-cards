import React, { useState, useEffect } from 'react';

import '../styles/header.css'
import '../styles/footer.css'
import '../styles/addCard/pageLayout.css'
import '../styles/addCard/addCardFrontBack.css'
import '../styles/addCard/gptBot.css'
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
            <div className='container-for-two-columns'>
                <div className='add-cards-and-card-preview-container'>
                    <CardListContext.Provider value={{ cards, setCards }}>
                        <AddCardContainer />
                        <DisplayCardsForDeck />
                    </CardListContext.Provider>
                </div>
                <div className='gpt-bot-container'>
                    <div className='gpt-bot-sub-container'></div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AddCard