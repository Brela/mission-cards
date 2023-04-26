import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { UserProvider } from './contexts/UserContext';

import Home from './pages/Home';
import AddCard from './pages/AddCard';
import AuthenticationPage from './pages/Authentication';

import './styles/reset.css';
import './styles/index.css';
import './styles/theme.css';

function App() {
    return (
        <React.StrictMode>
            <UserProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/decks/:deckName" element={<AddCard />} />
                        <Route path="/auth" element={<AuthenticationPage />} />
                    </Routes>
                </BrowserRouter>
            </UserProvider>
        </React.StrictMode>
    );
}

export default App;