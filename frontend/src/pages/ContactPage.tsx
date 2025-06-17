import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);
        setSubmitError('');

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitSuccess(true);

            // Reset form after success
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            });

            // Reset success message after 5 seconds
            setTimeout(() => {
                setSubmitSuccess(false);
            }, 5000);
        }, 1500);
    };

    return (
        <div className="min-h-screen w-screen relative">
            <div>
                {/* Hero Section */}
                <div className="bg-gray-900 text-white py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">Contáctanos</h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Estamos aquí para ayudarte con cualquier pregunta, comentario o consulta.
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Contact Information */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Información de Contacto</h2>

                            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                                {/* Map */}
                                <div className="h-64 bg-gray-200">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3295.3052927603153!2d-70.78943981627437!3d-33.537344633249525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662ddd17bcd9839%3A0x766f53cb05dbf6f0!2sFerreMas!5e1!3m2!1ses-419!2scl!4v1750033753687!5m2!1ses-419!2scl"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                    ></iframe>
                                </div>

                                {/* Contact Details */}
                                <div className="p-6">
                                    <div className="space-y-6">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 mt-1">
                                                <MapPin className="h-6 w-6 text-yellow-500" />
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-lg font-medium">Dirección</h3>
                                                <p className="text-gray-600">
                                                    Cabo de Hornos 0487, Maipú<br />
                                                    Santiago, Chile
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 mt-1">
                                                <Phone className="h-6 w-6 text-yellow-500" />
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-lg font-medium">Teléfono</h3>
                                                <p className="text-gray-600">
                                                    <a href="tel:+525512345678" className="hover:text-yellow-500 transition-colors">
                                                        +56 9 1234 5678
                                                    </a>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 mt-1">
                                                <Mail className="h-6 w-6 text-yellow-500" />
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-lg font-medium">Email</h3>
                                                <p className="text-gray-600">
                                                    <a href="mailto:info@ferremas.com" className="hover:text-yellow-500 transition-colors">
                                                        info@ferremas.com
                                                    </a>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 mt-1">
                                                <Clock className="h-6 w-6 text-yellow-500" />
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-lg font-medium">Horario de Atención</h3>
                                                <p className="text-gray-600">
                                                    Lunes a Viernes: 9:00 AM - 9:00 PM<br />
                                                    Sábados y Domingos: 9:00 AM - 9:00 PM
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Social Media */}
                                    <div className="mt-8">
                                        <h3 className="text-lg font-medium mb-3">Síguenos</h3>
                                        <div className="flex space-x-4">
                                            <a
                                                href="#"
                                                className="bg-gray-100 p-2 rounded-full text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                                            >
                                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                                                </svg>
                                            </a>
                                            <a
                                                href="#"
                                                className="bg-gray-100 p-2 rounded-full text-gray-600 hover:bg-pink-100 hover:text-pink-600 transition-colors"
                                            >
                                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                                </svg>
                                            </a>
                                            <a
                                                href="#"
                                                className="bg-gray-100 p-2 rounded-full text-gray-600 hover:bg-blue-100 hover:text-blue-400 transition-colors"
                                            >
                                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Envíanos un Mensaje</h2>

                            <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
                                {submitSuccess && (
                                    <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                                        <p className="font-medium">¡Mensaje enviado con éxito!</p>
                                        <p className="text-sm">Nos pondremos en contacto contigo a la brevedad.</p>
                                    </div>
                                )}

                                {submitError && (
                                    <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                        <p className="font-medium">Error al enviar el mensaje:</p>
                                        <p className="text-sm">{submitError}</p>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                                Nombre completo *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                placeholder="Tu nombre"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                                Correo electrónico *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                placeholder="tu@email.com"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                                Teléfono
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                placeholder="Tu teléfono"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                                Asunto *
                                            </label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                required
                                            >
                                                <option value="">Selecciona un asunto</option>
                                                <option value="consulta">Consulta General</option>
                                                <option value="producto">Información de Producto</option>
                                                <option value="pedido">Estado de Pedido</option>
                                                <option value="servicio">Servicios Profesionales</option>
                                                <option value="reclamo">Reclamo o Devolución</option>
                                                <option value="otro">Otro</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                            Mensaje *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={5}
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            placeholder="Escribe tu mensaje aquí..."
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`w-full flex items-center justify-center bg-yellow-500 text-white py-3 px-6 rounded-md font-medium hover:bg-yellow-600 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                                                }`}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Enviando...
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={18} className="mr-2" />
                                                    Enviar Mensaje
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-gray-50 py-12">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl font-bold mb-2">Preguntas Frecuentes</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Encuentra respuestas rápidas a las preguntas más comunes.
                            </p>
                        </div>

                        <div className="max-w-3xl mx-auto space-y-6">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold mb-2">¿Cuáles son los métodos de pago aceptados?</h3>
                                <p className="text-gray-600">
                                    Aceptamos tarjetas de crédito/débito (Visa, MasterCard), transferencia bancaria, PayPal y pago en efectivo en tienda.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold mb-2">¿Cuánto tiempo tarda la entrega?</h3>
                                <p className="text-gray-600">
                                    El tiempo de entrega varía según tu ubicación. Normalmente entre 1-3 días hábiles para envíos locales y 3-7 días hábiles para envíos nacionales.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold mb-2">¿Tienen servicio de instalación?</h3>
                                <p className="text-gray-600">
                                    Sí, contamos con servicios profesionales de instalación. Puedes solicitar más información en nuestra sección de <a href="/servicios" className="text-yellow-500 hover:underline">Servicios</a> o contactarnos directamente.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold mb-2">¿Cuál es la política de devoluciones?</h3>
                                <p className="text-gray-600">
                                    Puedes devolver productos sin usar dentro de los 15 días posteriores a la compra con el comprobante de pago. Algunos productos tienen restricciones de devolución por motivos de higiene o seguridad.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;