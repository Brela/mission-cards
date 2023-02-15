import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// these css imports are applied automatically to the app
import './styles/reset.css'
import './styles/index.css'

// this is what attaches the App component to the root in index.html
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
