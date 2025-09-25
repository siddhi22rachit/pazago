/**
 * React Entry Point
 * 
 * This is the main entry point for the React application.
 * It renders the App component into the root DOM element.
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Create root and render the App component
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
