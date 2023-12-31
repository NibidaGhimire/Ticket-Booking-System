import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MovieProvider } from './components/MovieContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
{/* Wrapping app in movie provider for accessing it through all of the app components*/}
    <MovieProvider>
    <App />
    </MovieProvider>
  </React.StrictMode>,
)
