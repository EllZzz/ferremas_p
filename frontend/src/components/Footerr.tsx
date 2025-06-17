import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  HelpCircle
} from 'lucide-react';

const Footerr = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Ferre<span className="text-yellow-500">+</span>Mas</h3>
            <p className="text-gray-300 mb-4">
              Tu tienda de confianza para todos los productos de ferretería y construcción con más de 20 años de experiencia.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categorías</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categoria/herramientas-electricas" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Herramientas Eléctricas
                </Link>
              </li>
              <li>
                <Link to="/categoria/herramientas-manuales" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Herramientas Manuales
                </Link>
              </li>
              <li>
                <Link to="/categoria/pintura" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Pintura
                </Link>
              </li>
              <li>
                <Link to="/categoria/plomeria" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Plomería
                </Link>
              </li>
              <li>
                <Link to="/categoria/iluminacion" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Iluminación
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Atención al Cliente</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contacto" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/preguntas-frecuentes" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link to="/terminos-condiciones" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link to="/politica-privacidad" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 text-yellow-500 flex-shrink-0" />
                <span className="text-gray-300">
                  Cabo de Hornos 0487, Maipú, Santiago, Chile
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-yellow-500 flex-shrink-0" />
                <span className="text-gray-300">+56 9 1234 5678</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-yellow-500 flex-shrink-0" />
                <a href="mailto:info@ferremas.com" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  info@ferremas.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Features Banner */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center">
              <Truck size={24} className="text-yellow-500 mb-2" />
              <span className="text-sm text-gray-300">Envío a todo el país</span>
            </div>
            <div className="flex flex-col items-center">
              <CreditCard size={24} className="text-yellow-500 mb-2" />
              <span className="text-sm text-gray-300">Pago seguro</span>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck size={24} className="text-yellow-500 mb-2" />
              <span className="text-sm text-gray-300">Garantía de calidad</span>
            </div>
            <div className="flex flex-col items-center">
              <HelpCircle size={24} className="text-yellow-500 mb-2" />
              <span className="text-sm text-gray-300">Soporte 24/7</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="bg-gray-950 py-4">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Ferre+Mas. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footerr;