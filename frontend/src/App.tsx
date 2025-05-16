import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useEffect, useState } from 'react'

interface Product {
  idProduct: number;
  product_name: string;
  stock: number;
  product_unitprice: number;
  product_img: string;
  fk_category: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface Category {
  idCategory: number;
  Category_name: string;
}


export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    // Obtener productos
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error al obtener productos:", error));
    
    // Obtener categorías
    fetch('http://localhost:5000/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(error => console.error("Error al obtener categorías:", error));
  }, []);

  // Filtrar productos por categoría seleccionada
  const filteredProducts = selectedCategory
    ? products.filter(product => product.fk_category === selectedCategory)
    : products;

  const addToCart = (product: Product) => {
    // Verificar stock antes de agregar al carrito
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.idProduct === product.idProduct);
      if (existingItem) {
        // Verificar si hay suficiente stock para incrementar
        if (existingItem.quantity < product.stock) {
          return prevCart.map(item =>
            item.idProduct === product.idProduct
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return prevCart; // No hacer cambios si no hay stock suficiente
      } else {
        // Solo agregar si hay stock
        if (product.stock > 0) {
          return [...prevCart, { ...product, quantity: 1 }];
        }
        return prevCart;
      }
    });
  };

  const removeFromCart = (idProduct: number) => {
    setCart(prevCart => prevCart.filter(item => item.idProduct !== idProduct));
  };

  const updateQuantity = (idProduct: number, quantity: number) => {
    if (quantity < 1) {
      // Si la cantidad es menor a 1, eliminar del carrito
      removeFromCart(idProduct);
      return;
    }
    
    // Verificar el stock disponible antes de actualizar
    const product = products.find(p => p.idProduct === idProduct);
    if (product && quantity <= product.stock) {
      setCart(prevCart =>
        prevCart.map(item =>
          item.idProduct === idProduct ? { ...item, quantity } : item
        )
      );
    }
  };

  // Calcular el total del carrito
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

        {/* Botón flotante carrito */}
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="fixed top-4 right-4 z-50 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 flex items-center space-x-2"
          aria-label="Toggle carrito"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 5m12-5l1.6-4M9 21h6" />
          </svg>
          {totalItems > 0 && <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">{totalItems}</span>}
        </button>

        {/* Sidebar del carrito */}
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
                        aria-label={`Disminuir cantidad de ${item.product_name}`}
                      >-</button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.idProduct, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        disabled={item.quantity >= item.stock}
                        aria-label={`Aumentar cantidad de ${item.product_name}`}
                      >+</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{CLP.format(item.product_unitprice * item.quantity)}</p>
                    <button
                      onClick={() => removeFromCart(item.idProduct)}
                      className="text-red-600 hover:text-red-800 mt-2 text-sm"
                      aria-label={`Eliminar ${item.product_name} del carrito`}
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
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                onClick={() => alert(`Gracias por tu compra de ${CLP.format(totalPrice)}`)}
              >
                Proceder al pago
              </button>
            )}
          </div>
        </div>

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

        {/* Filtro de categorías */}
        <section className="bg-white py-6">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Categorías</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded ${
                  selectedCategory === null
                    ? "bg-blue-800 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Todas
              </button>
{categories.map((cat) => (
  <button
    key={cat.idCategory}
    onClick={() => setSelectedCategory(cat.idCategory)}
    className={`px-4 py-2 rounded ${
      selectedCategory === cat.idCategory
        ? "bg-blue-800 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`}
  >
    {cat.Category_name}
  </button>
))}

            </div>
          </div>
        </section>

        <section className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-xl font-bold text-blue-800 mb-6">Productos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.idProduct} className="border p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col">
                 <img
  src={`/images/${product.product_img}`}
  alt={product.product_name}
  className="w-full h-48 object-cover mb-4 rounded-lg"
/>

                  <h4 className="text-lg font-semibold">{product.product_name}</h4>
                  <p className="text-blue-800 font-bold">{CLP.format(product.product_unitprice)}</p>
                  <div className="mt-auto pt-4">
                    <button
                      onClick={() => addToCart(product)}
                      className={`w-full px-4 py-2 rounded text-white flex items-center justify-center ${product.stock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                      disabled={product.stock === 0}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 5m12-5l1.6-4M9 21h6" />
                      </svg>
                      {product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-blue-800 text-white py-10 text-center">
          <h2 className="text-2xl font-bold mb-2">¿Tienes dudas? ¡Estamos para ayudarte!</h2>
          <p className="mb-4">Contáctanos para cotizaciones, productos especiales o ayuda personalizada.</p>
          <a href="#" className="bg-yellow-400 text-blue-800 px-6 py-3 rounded hover:bg-yellow-300">Habla con un asesor</a>
        </section>

        <Footer />
      </div>
    </>
  );
}