import { useState } from "react";
import { Link } from "react-router-dom";
import CartSidebar from "./CartSideBar";
import { useCart } from "../context/CartContext";
import AuthPage from "./AuthPage";

export default function Navbar() {
  const [showAuth, setShowAuth] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <header className="bg-blue-800 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold">
            FERRE<span className="text-yellow-400">+</span>MAS
          </h1>

          <nav className="space-x-4 hidden md:block">
            <Link to="/" className="text-white hover:text-yellow-400 transition-colors">Inicio</Link>
            <Link to="/products" className="text-white hover:text-yellow-400 transition-colors">Productos</Link>
            <Link to="/contact" className="text-white hover:text-yellow-400 transition-colors">Contacto</Link>
          </nav>

          <div className="space-x-4 flex items-center">
            <button>
              <i className="fas fa-search" />
            </button>

            {/* BOTÓN DE CARRITO */}
            <button
              className="relative"
              onClick={() => setIsCartOpen(true)}
              aria-label="Abrir carrito"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 5m12-5l1.6-4M9 21h6" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-0.5 bg-red-500 text-white rounded-full !px-1.5 !py-0.5 text-xs font-semibold">
                  {totalItems}
                </span>
              )}
            </button>

            <button onClick={() => setShowAuth(true)}>
              <i className="fas fa-user" />
            </button>
          </div>
        </div>

        {/* Carrito de compras */}
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </header>

      {/* Modal de login */}
      {showAuth && (
        <div className="fixed inset-0 bg-black flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative !transition-all !duration-300">
            <button
              onClick={() => setShowAuth(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg font-bold !transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>

            </button>
            <AuthPage />
          </div>
        </div>
      )}
    </>
  );
}
