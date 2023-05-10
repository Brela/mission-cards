import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorProvider } from './contexts/ErrorContext';
import { UserProvider } from './contexts/UserContext';
import { DeckProvider } from './contexts/DeckContext';
import { CardListProvider } from './contexts/CardListContext'


import Home from './pages/Home';
import AddCard from './pages/AddCard';
import AuthenticationPage from './pages/Authentication';

import './styles/reset.css';
import './styles/index.css';
import './styles/theme.css';

import './styles/header.css'
import './styles/footer.css'
import './styles/gptBot/gptBot.css'
import StudyCardsPage from './pages/StudyCards';

function App() {
    return (
        <React.StrictMode>
            <DeckProvider>
                <CardListProvider>
                    <ErrorProvider>
                        <UserProvider>
                            <BrowserRouter>
                                <Routes>
                                    {/* home shows the list of decks */}
                                    <Route path="/" element={<AuthenticationPage />} />
                                    {/* <Route path="/" element={<Home />} /> */}
                                    <Route path="/:deckName" element={<AddCard />} />
                                    <Route path="/studycards" element={<StudyCardsPage />} />
                                    <Route path="/auth" element={<AuthenticationPage />} />
                                    {/*     <Route path="/" element={<AuthenticationPage />} />
                                    <Route path="/:deckName" element={<AddCard />} />
                                    <Route path="/studycards" element={<StudyCardsPage />} />
                                    <Route path="/decks" element={<Home />} /> */}
                                </Routes>
                            </BrowserRouter>
                        </UserProvider>
                    </ErrorProvider>
                </CardListProvider>
            </DeckProvider>
        </React.StrictMode>
    );
}

export default App;