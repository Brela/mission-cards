import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorProvider } from './contexts/ErrorContext';
import { UserProvider } from './contexts/UserContext';
import { DeckProvider } from './contexts/DeckContext';


import Home from './pages/Home';
import AddCard from './pages/AddCard';
import AuthenticationPage from './pages/Authentication';

import './styles/reset.css';
import './styles/index.css';
import './styles/theme.css';
import './styles/gptBot/gptBot.css'
import StudyCards from './components/studyCards/StudyCards';


function App() {
    return (
        <React.StrictMode>
            <DeckProvider>
                <ErrorProvider>
                    <UserProvider>
                        <BrowserRouter>
                            <Routes>
                                {/* home shows the list of decks */}
                                <Route path="/" element={<Home />} />
                                <Route path="/:deckName" element={<AddCard />} />
                                <Route path="/studycards" element={<StudyCards />} />
                                <Route path="/auth" element={<AuthenticationPage />} />
                            </Routes>
                        </BrowserRouter>
                    </UserProvider>
                </ErrorProvider>
            </DeckProvider>
        </React.StrictMode>
    );
}

export default App;