import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Payment from './pages/Payment';

export default function App() {
  return (
    <div className="h-screen w-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pago" element={<Payment />} />
      </Routes>
      <Footer />
    </div>
  );
}