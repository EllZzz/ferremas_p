import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom' // Importa Routes y Route
import Contact from './pages/Contact';

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes> {/* Envuelve tus rutas con Routes */}
        <Route path="/" element={<App />} /> {/* Ruta para la página de inicio */}
        <Route path="/contact" element={<Contact />} /> {/* Ruta para la página de contacto */}
        
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
