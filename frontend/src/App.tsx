import './App.css';
import { useEffect, useState } from 'react';
import { useCart } from "./context/CartContext";
import Carousel from './components/Carousel';
import ProductGrid from './components/ProductGrid';

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
  name: string;
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

      < ProductGrid />
    </div>
  );
}
