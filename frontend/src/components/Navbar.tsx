import { useState } from "react";
import AuthPage from "./AuthPage";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      {/* Barra superior */}
      <div className="bg-yellow-400 w-full h-8 self-center flex justify-center items-center text-yellow-700 font-bold gap-6">
        <div className="flex items-end text-sm gap-2">
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path
              fillRule="evenodd"
              d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
              clipRule="evenodd"
            />
          </svg>
          Tu locación
        </div>

        <div className="flex items-end text-sm gap-2">
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h3a.75.75 0 0 0 .75-.75V15Z" />
            <path d="M8.25 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM15.75 6.75a.75.75 0 0 0-.75.75v11.25c0 .087.015.17.042.248a3 3 0 0 1 5.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 0 0-3.732-10.104 1.837 1.837 0 0 0-1.47-.725H15.75Z" />
            <path d="M19.5 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
          </svg>
          Envio gratis sobre $100.000 en productos
        </div>
      </div>

      {/* Header principal */}
      <header className="bg-blue-800 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold">
            FERRE<span className="text-yellow-400">+</span>MAS
          </h1>
          <nav className="space-x-4 hidden md:block">
                <Link to="/" className="hover:text-yellow-400">Inicio</Link>
                <Link to="/" className="hover:text-yellow-400">Productos</Link>
                <Link to="/contact" className="hover:text-yellow-400">Contacto</Link>
          </nav>
          <div className="space-x-4">
            <button>
              <i className="fas fa-search"></i>
            </button>
            <button>
              <i className="fas fa-shopping-cart"></i>
            </button>
            <button onClick={() => setShowAuth(true)}>
              <i className="fas fa-user"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Modal login/registro */}
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
