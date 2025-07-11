import { useEffect, useState } from 'react';
import { useCart } from "../context/CartContext";

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

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { addToCart } = useCart();

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
    ? products.filter(p => p.fk_category === selectedCategory)
    : products;

  return (
    <>
      {/* CATEGORÍAS */}
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

      {/* PRODUCTOS */}
      <section className="py-10 bg-white max-w-7xl mx-auto px-4">
        <h3 className="text-xl font-bold text-blue-800 mb-6">Productos</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.idProduct} className="bg-gray-100 p-4 rounded shadow flex flex-col">
              <img
                src={`/images/tools/${product.product_img}`}
                alt={product.product_name}
                className="h-48 w-full object-cover rounded"
              />
              <h4 className="mt-2 font-semibold">{product.product_name}</h4>
              <p className="text-gray-700">{product.product_unitprice.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
              <button
                className="mt-auto bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                disabled={product.stock === 0}
                onClick={() => addToCart(product)}
              >
                {product.stock === 0 ? "Agotado" : "Agregar al carrito"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
