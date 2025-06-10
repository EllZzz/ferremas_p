import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from "./context/CartContext";

interface Product {
  idProduct: number;
  product_name: string;
  stock: number;
  product_unitprice: number;
  product_img: string;
  fk_category: number;
}

interface Category {
  idCategory: number;
  Category_name: string;
}

const toolImages = [
  "/images/tools/taladro_bosch.jpg.jpg",
  "/images/tools/destornillador.jpg",
  "/images/tools/cierra.jpg",
  "/images/tools/martillo.jpg",
  "/images/tools/taladro2.jpg",
  "/images/tools/taladro3.jpg",
  "/images/tools/herramienta1.jpg",
  "/images/tools/herramienta2jpg",
  "/images/tools/herramienta3.jpg",
  "/images/tools/herramienta4.jpg",
  "/images/tools/herramienta5.jpg",
  "/images/tools/herramienta6.jpg",
  "/images/tools/herramienta7.jpg",
  "/images/tools/herramienta8.jpg",
  "/images/tools/herramienta9.jpg",
  "/images/tools/herramienta10.jpg",
  "/images/tools/herramienta11.jpg",
  "/images/tools/herramienta12.jpg",
  "/images/tools/herramienta13.jpg",
  "/images/tools/herramienta14.jpg",
  "/images/tools/herramienta15.jpg",
  "/images/tools/herramienta16.jpg",
  "/images/tools/herramienta17.jpg",
];

export default function App() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error al obtener productos:", error));

    fetch('http://localhost:5000/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(error => console.error("Error al obtener categorías:", error));
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(product => product.fk_category === selectedCategory)
    : products;

  const totalPrice = cart.reduce((acc, item) => acc + item.product_unitprice * item.quantity, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const CLP = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  return (
    <>
      <div className="min-h-screen w-screen relative">
        <Navbar />

        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="fixed top-4 right-4 z-50 bg-blue-600 rounded-full p-3 shadow-lg hover:bg-blue-700 flex items-center space-x-2"
          aria-label="Toggle carrito"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 5m12-5l1.6-4M9 21h6" />
          </svg>
          {totalItems > 0 && <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">{totalItems}</span>}
        </button>

        <div
          className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-40
            ${isCartOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-bold text-blue-800">Carrito de compras</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-gray-600 hover:text-gray-900"
              aria-label="Cerrar carrito"
            >
              ✕
            </button>
          </div>

          <div className="p-4 overflow-y-auto h-[calc(100%-160px)]">
            {cart.length === 0 ? (
              <p className="text-center py-6 text-gray-500">El carrito está vacío.</p>
            ) : (
              cart.map(item => (
                <div key={item.idProduct} className="flex items-center justify-between mb-4 border-b pb-4">
                  <div className="flex-1">
                    <p className="font-semibold">{item.product_name}</p>
                    <p className="text-sm text-gray-600">{CLP.format(item.product_unitprice)} c/u</p>
                    <div className="mt-1 flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.idProduct, item.quantity - 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >-</button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.idProduct, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        disabled={item.quantity >= item.stock}
                      >+</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{CLP.format(item.product_unitprice * item.quantity)}</p>
                    <button
                      onClick={() => removeFromCart(item.idProduct)}
                      className="text-red-600 hover:text-red-800 mt-2 text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
            <div className="font-bold text-blue-800 flex justify-between mb-4">
              <span>Total:</span>
              <span>{CLP.format(totalPrice)}</span>
            </div>
            {cart.length > 0 && (
              <button
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-800"
                onClick={() => navigate('/checkout')}
              >
                Proceder al pago
              </button>
            )}
          </div>
        </div>

        {/* Resto del código de categorías y productos */}

        <section className="bg-gray-100">
          <div className="max-w-7xl mx-auto p-4">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6 text-center">
                <h2 className="text-2xl font-bold text-blue-800">¡Aprovecha nuestras ofertas de abril!</h2>
                <p className="mt-2 text-gray-700">Hasta 40% en herramientas eléctricas</p>
                <a href="#" className="mt-4 inline-block bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700">Ver productos</a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-6">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Categorías</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded ${selectedCategory === null ? "bg-blue-800 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
              >
                Todas
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.idCategory}
                  onClick={() => setSelectedCategory(cat.idCategory)}
                  className={`px-4 py-2 rounded ${selectedCategory === cat.idCategory ? "bg-blue-800 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                >
                  {cat.Category_name}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 bg-white max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-blue-800 mb-6">Productos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => {
              const randomImage = toolImages[Math.floor(Math.random() * toolImages.length)];
              return (
                <div key={product.idProduct} className="bg-gray-100 p-4 rounded shadow flex flex-col">
                  <img
                    src={randomImage}
                    alt={product.product_name}
                    className="h-48 w-full object-cover rounded"
                  />
                  <h4 className="mt-2 font-semibold">{product.product_name}</h4>
                  <p className="text-gray-700">{CLP.format(product.product_unitprice)}</p>
                  <button
                    className="mt-auto bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                    disabled={product.stock === 0}
                    onClick={() => addToCart(product)}
                  >
                    {product.stock === 0 ? "Agotado" : "Agregar al carrito"}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
