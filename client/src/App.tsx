import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ErrorProvider } from './contexts/ErrorContext';
import { UserProvider } from './contexts/UserContext';

import Home from './pages/Home';
import AddCard from './pages/AddCard';
import AuthenticationPage from './pages/Authentication';

import './styles/reset.css';
import './styles/index.css';
import './styles/theme.css';
import './styles/gptBot/gptBot.css'

function App() {
    return (
        <React.StrictMode>
            <ErrorProvider>
                <UserProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/:deckName" element={<AddCard />} />
                            <Route path="/auth" element={<AuthenticationPage />} />
                        </Routes>
                    </BrowserRouter>
                </UserProvider>
            </ErrorProvider>
        </React.StrictMode>
    );
}

export default App;