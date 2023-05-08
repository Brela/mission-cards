import React, { useState, useEffect } from 'react';
import CardType from '../types/CardType'
import ErrorAlert from '../components/popups/ErrorAlert';

import '../styles/header.css'
import '../styles/footer.css'
import '../styles/studycards/pageLayout.css'
import { CardListContext } from '../contexts/CardListContext'

import Header from '../components/Header';
import StudyCards from '../components/studyCards/StudyCards';
import GptBot from '../components/GptBot';
import Footer from '../components/Footer';

function AddCard() {
    const [cards, setCards] = useState<CardType[]>([]);

    return (
        <div className="add-card-page">
            <Header />

            <div className='add-cards-and-card-preview-container'>
                <CardListContext.Provider value={{ cards, setCards }}>
                    <StudyCards />
                </CardListContext.Provider>
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