import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductPage from './pages/ProductPage';
import App from './App';

import { CartProvider } from "./context/CartContext";
import './index.css';
import Navbar from './components/Navbar';
import Footerr from './components/Footerr';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
        < Footerr />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);