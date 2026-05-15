// This file is the starting point of the React app.
// It connects React to the HTML file (index.html) via the <div id="root">

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'

// BrowserRouter enables page navigation without reloading the browser
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
