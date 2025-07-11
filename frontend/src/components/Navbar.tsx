import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartSidebar from "./CartSidebar";
import { useCart } from "../context/CartContext";
import { User, ShoppingCart, LogOut } from "lucide-react";
import AuthPage from "./AuthPage";

export default function Navbar() {
  const [showAuth, setShowAuth] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [showAuth]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

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

          <div className="flex items-center gap-4">
            {/* Carrito */}
            <button
              className="relative"
              onClick={() => setIsCartOpen(true)}
              aria-label="Abrir carrito"
            >
              <ShoppingCart className="w-6 h-6 text-gray-100" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-0.5 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs font-semibold">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Usuario */}
            {!isLoggedIn ? (
              <button onClick={() => setShowAuth(true)} title="Iniciar sesión">
                <User className="w-6 h-6 text-gray-100" />
              </button>
            ) : (
              <button onClick={handleLogout} title="Cerrar sesión">
                <LogOut className="w-6 h-6 text-gray-100 hover:text-red-300 transition" />
              </button>
            )}
          </div>
        </div>

        {/* Sidebar del carrito */}
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </header>

      {/* Modal de login */}
      {showAuth && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setShowAuth(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg font-bold"
            >
              ✕
            </button>
            <AuthPage />
          </div>
        </div>
      )}
    </>
  );
}
