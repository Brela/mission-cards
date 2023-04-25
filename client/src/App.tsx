import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';

import Home from './pages/Home';
import AddCard from './pages/AddCard';
import AuthenticationPage from './pages/Authentication';

import './styles/reset.css';
import './styles/index.css';
import './styles/theme.css';

function App() {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/:deckName',
            element: <AddCard />,
        },
        {
            path: '/auth',
            element: <AuthenticationPage />,
        },
    ]);

    return (
        <React.StrictMode>
            <UserProvider>
                <RouterProvider router={router} />
            </UserProvider>
        </React.StrictMode>
    );
}

export default App;