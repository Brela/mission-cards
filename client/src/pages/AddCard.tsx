import React, { useState, useEffect, useContext } from 'react';
import CardType from '../types/CardType'
import ErrorAlert from '../components/popups/ErrorAlert';

import '../styles/header.css'
import '../styles/footer.css'
import '../styles/addCard/pageLayout.css'
import '../styles/addCard/addCardFrontBack.css'
import '../styles/addCard/displayCardsContainer.css'

import Header from '../components/Header';
import AddCardContainer from '../components/addCard/AddCardContainer'
import DisplayCardsForDeck from '../components/addCard/DisplayCardsContainer'
import GptBot from '../components/GptBot';
import Footer from '../components/Footer';




function AddCard() {
    const [cards, setCards] = useState<CardType[]>([]);

    return (
        <div className="add-card-page">
            <Header />

            <div className='add-cards-and-card-preview-container'>
                <AddCardContainer />
                <DisplayCardsForDeck />
            </div>
            <div className='gpt-bot-container'>
                <GptBot />
            </div>
            <ErrorAlert />
            <Footer />
        </div >
    )
}

export default AddCard