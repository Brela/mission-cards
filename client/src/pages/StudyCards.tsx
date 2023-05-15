import React, { useState, useEffect } from 'react';
import CardType from '../types/CardType'
import ErrorAlert from '../components/popups/ErrorAlert';


import '../styles/studyCards/studyCards.css'


import Header from '../components/Header';
import StudyCards from '../components/studyCards/StudyCards';
import GptBot from '../components/gptBot/GptBot';
import Footer from '../components/Footer';

function StudyCardsPage() {

    return (
        <div className="study-cards-page">
            <Header />
            <div className=''>
                <StudyCards />
            </div>
            <div className='gpt-bot-container'>
                <GptBot />
            </div>
            <ErrorAlert />
            <Footer />
        </div >
    )
}

export default StudyCardsPage