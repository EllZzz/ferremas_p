import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../App.css'

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100"> {/* color para verificar tamaño */}
      <Navbar />
      <main className="flex-1 p-4 w-full max-w-3xl mx-auto"> {/* 'flex-1' para ocupar toda la altura restante */}
        <h1 className="text-3xl font-bold text-blue-800 mb-4">Contáctanos</h1>
        <p className="mb-6 text-gray-700">¿Tienes alguna duda, comentario o necesitas ayuda? Completa el formulario y nos pondremos en contacto contigo.</p>
      
        <form className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 font-semibold" htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Tu nombre"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold" htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="tu@email.com"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold" htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              rows={6}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Escribe tu mensaje..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-blue-800 py-3 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Enviar
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
