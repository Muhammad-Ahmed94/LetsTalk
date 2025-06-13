import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router'
import './index.css'
import App from './App.tsx'
import { SocketContextProvider } from './context/SocketContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </Router>
  </StrictMode>
)
