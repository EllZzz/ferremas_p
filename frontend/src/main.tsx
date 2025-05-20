import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import Contact from './pages/Contact';
import AdminPage from './pages/AdminPage.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<App />} />
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/admin" element={<AdminPage />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
