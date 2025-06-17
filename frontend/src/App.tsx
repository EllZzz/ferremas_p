import './App.css';
import { useEffect, useState } from 'react';
import { useCart } from "./context/CartContext";
import Carousel from './components/Carousel';

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

const slides = [
  {
    id: 1,
    image: "/images/Tools1.webp",
    title: "Bienvenido",
    description: "Explora nuestras herramientas",
    buttonText: "Ver más",
    buttonLink: "/products",
  },
  {
    id: 2,
    image: "/images/Tools2.webp",
    title: "Nuevas funciones",
    description: "Descubre las novedades de este mes",
    buttonText: "Leer novedades",
    buttonLink: "/products",
  },
];

const CLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { addToCart } = useCart();
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        updateRandomProducts(data, selectedCategory);
      })
      .catch(error => console.error("Error al obtener productos:", error));

    fetch('http://localhost:5000/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(error => console.error("Error al obtener categorías:", error));
  }, []);

  useEffect(() => {
    updateRandomProducts(products, selectedCategory);
  }, [selectedCategory, products]);

  const updateRandomProducts = (all: Product[], categoryId: number | null) => {
    const filtered = categoryId
      ? all.filter(product => product.fk_category === categoryId)
      : all;

    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    setDisplayedProducts(shuffled.slice(0, 8));
  };

  return (
    <div className="min-h-screen w-screen">
      <Carousel slides={slides} />

      {/* Oferta destacada */}
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

      {/* Categorías */}
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

      {/* Productos aleatorios */}
      <section className="py-10 bg-white max-w-7xl mx-auto px-4">
        <h3 className="text-xl font-bold text-blue-800 mb-6">Productos destacados</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts.map(product => {
            const selectedImage = product.product_img
              ? `http://localhost:5000${product.product_img}`
              : "/images/default-tool.jpg";

            return (
              <div key={product.idProduct} className="bg-gray-100 p-4 rounded shadow flex flex-col">
                <img
                  src={selectedImage}
                  alt={product.product_name}
                  className="h-48 w-full object-cover rounded"
                />
                <h4 className="mt-2 font-semibold">{product.product_name}</h4>
                <p className="text-gray-700">{CLP.format(product.product_unitprice)}</p>
                <button
                  className="mt-auto bg-blue-800 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
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
    </div>
  );
}
