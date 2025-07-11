import { useEffect, useState } from 'react';
import { useCart } from "../context/CartContext";
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Product {
  idProduct: number;
  product_name: string;
  stock: number;
  product_unitprice: number;
  product_img: string;
  fk_category: number;
  fk_idBrand: number;
  brand_name: string;
}

interface Category {
  idCategory: number;
  name: string;
}

interface Brand {
  idBrand: number;
  name: string;
}

const CLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

export default function Productos() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [showCategories, setShowCategories] = useState(false);
  const [showBrands, setShowBrands] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error al obtener productos:", err));

    fetch('http://localhost:5000/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Error al obtener categorías:", err));

    fetch('http://localhost:5000/api/brand')
      .then(res => res.json())
      .then(data => setBrands(data))
      .catch(err => console.error("Error al obtener marcas:", err));
  }, []);

  const filteredProducts = products
    .filter(p => !selectedCategory || p.fk_category === selectedCategory.idCategory)
    .filter(p => !selectedBrand || p.fk_idBrand === selectedBrand.idBrand)
    .filter(p => p.product_unitprice >= priceRange[0] && p.product_unitprice <= priceRange[1])
    .filter(p =>
      p.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand_name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.product_unitprice - b.product_unitprice
        : b.product_unitprice - a.product_unitprice
    );

  return (
    <div className="flex min-h-screen w-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 p-6 bg-white border-r border-gray-300 overflow-y-auto max-h-screen sticky top-0">
        <h2 className="text-xl font-bold text-blue-800 mb-4">Filtrar</h2>

        {/* Etiquetas activas */}
        <div className="mb-6 flex flex-wrap gap-2">
          {selectedCategory && (
            <span className="flex items-center bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
              {selectedCategory.name}
              <button onClick={() => setSelectedCategory(null)} className="ml-1">
                <X size={14} />
              </button>
            </span>
          )}
          {selectedBrand && (
            <span className="flex items-center bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
              {selectedBrand.name}
              <button onClick={() => setSelectedBrand(null)} className="ml-1">
                <X size={14} />
              </button>
            </span>
          )}
          {priceRange[1] < 1000000 && (
            <span className="flex items-center bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
              Hasta {CLP.format(priceRange[1])}
              <button onClick={() => setPriceRange([0, 1000000])} className="ml-1">
                <X size={14} />
              </button>
            </span>
          )}
        </div>

        {/* Categorías */}
        <div className="mb-6">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowCategories(!showCategories)}>
            <h3 className="font-semibold text-gray-700">Categorías</h3>
            {showCategories ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
          {showCategories && (
            <ul className="mt-2">
              <li>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`text-sm ${!selectedCategory ? "text-blue-800 font-bold" : "text-blue-700 hover:underline"}`}
                >
                  Todas
                </button>
              </li>
              {categories.map(cat => (
                <li key={cat.idCategory}>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-sm ${selectedCategory?.idCategory === cat.idCategory ? "text-blue-800 font-bold" : "text-gray-700 hover:underline"}`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Marcas */}
        <div className="mb-6">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowBrands(!showBrands)}>
            <h3 className="font-semibold text-gray-700">Marcas</h3>
            {showBrands ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
          {showBrands && (
            <ul className="mt-2">
              <li>
                <button
                  onClick={() => setSelectedBrand(null)}
                  className={`text-sm ${!selectedBrand ? "text-blue-800 font-bold" : "text-blue-700 hover:underline"}`}
                >
                  Todas
                </button>
              </li>
              {brands.map(brand => (
                <li key={brand.idBrand}>
                  <button
                    onClick={() => setSelectedBrand(brand)}
                    className={`text-sm ${selectedBrand?.idBrand === brand.idBrand ? "text-blue-800 font-bold" : "text-gray-700 hover:underline"}`}
                  >
                    {brand.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Rango de precios */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Rango de precio</h3>
          <input
            type="range"
            min="0"
            max="1000000"
            step="10000"
            value={priceRange[1]}
            onChange={e => setPriceRange([0, Number(e.target.value)])}
            className="w-full"
          />
          <p className="text-sm text-gray-600">Hasta {CLP.format(priceRange[1])}</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Buscar por producto o marca"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border rounded"
          />
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700"
          >
            Ordenar por precio: {sortOrder === "asc" ? "Ascendente" : "Descendente"}
          </button>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {filteredProducts.map(product => {
            const image = product.product_img
              ? `http://localhost:5000${product.product_img}`
              : "/images/default-tool.jpg";

            return (
              <div
                key={product.idProduct}
                className="bg-white p-4 rounded shadow flex flex-col cursor-pointer hover:shadow-lg transition"
                onClick={() => navigate(`/products/${product.idProduct}`)}
              >
                <img
                  src={image}
                  alt={product.product_name}
                  className="h-48 w-full object-cover rounded"
                />
                <h4 className="mt-2 font-semibold">{product.product_name}</h4>
                <p className="text-gray-500 text-sm">{product.brand_name}</p>
                <p className="text-gray-700">{CLP.format(product.product_unitprice)}</p>
                <button
                  className="mt-auto bg-blue-800 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                  disabled={product.stock === 0}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  {product.stock === 0 ? "Agotado" : "Agregar al carrito"}
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}