import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home'
import AddCard from './pages/AddCard'
// these css imports are applied automatically to the app
import './styles/reset.css'
import './styles/index.css'
import './styles/theme.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


// how should I organize these routes?
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:deckName",
    element: <AddCard />,
  },
]);
// this is what attaches the App component to the root in index.html
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
