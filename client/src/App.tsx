import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import AddCard from './pages/AddCard';

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
    ]);

    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}

export default App;