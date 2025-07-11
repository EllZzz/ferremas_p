import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import UserReview from "./UserReview";
import AuthPage from "./AuthPage";
import { X } from "lucide-react";

interface Product {
  idProduct: number;
  product_name: string;
  product_unitprice: number;
  stock: number;
  product_img: string;
  fk_category: number;
  description?: string;
  old_price?: number;
}

const CLP = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  minimumFractionDigits: 0,
});

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then(setProduct)
      .catch((err) => console.error("Error al cargar producto:", err));
  }, [id]);

  if (!product) {
    return <p className="text-center p-6 text-gray-500">Cargando producto...</p>;
  }

  const {
    product_name,
    product_unitprice,
    product_img,
    stock,
    description,
    old_price,
  } = product;

  const imageUrl = product_img
    ? `http://localhost:5000${product_img}`
    : "/images/default-tool.jpg";

  const descuento =
    old_price && old_price > product_unitprice
      ? Math.round(((old_price - product_unitprice) / old_price) * 100)
      : null;

  return (
    <>
      <div className="h-full w-screen bg-white px-6 py-10 grid justify-center grid-cols-2">
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-center place-content-center">
          <div className="w-full md:w-1/2">
            <img
              src={imageUrl}
              alt={product_name}
              className="max-h-96 object-contain rounded-lg shadow-md"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">{product_name}</h1>

          {old_price && (
            <div className="text-gray-500 line-through text-sm">
              {CLP.format(old_price)}
            </div>
          )}

          <div className="text-2xl font-semibold text-blue-800">
            {CLP.format(product_unitprice)}
            {descuento && (
              <span className="ml-3 text-green-600 text-lg font-bold">
                {descuento}% descuento
              </span>
            )}
          </div>

          <p className={`text-sm ${stock > 0 ? "text-green-600" : "text-red-600"}`}>
            Stock: {stock > 0 ? stock : "Agotado"}
          </p>

          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800">Detalles del producto</h3>
            <ul className="mt-2 list-disc list-inside text-sm text-gray-700 space-y-1">
              {description ? (
                description.split(".").map((item, i) =>
                  item.trim() ? <li key={i}>{item.trim()}.</li> : null
                )
              ) : (
                <>
                  <li>Producto de calidad garantizada</li>
                  <li>Entrega rápida y segura</li>
                  <li>Disponible para despacho</li>
                </>
              )}
            </ul>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800 transition"
              disabled={stock === 0}
            >
              Comprar ahora
            </button>
            <button
              onClick={() => addToCart(product)}
              disabled={stock === 0}
              className="border border-blue-700 text-blue-700 px-6 py-3 rounded hover:bg-blue-50 transition disabled:opacity-50"
            >
              Agregar al carrito
            </button>
          </div>
        </div>

        <div className="col-span-2 px-12">
          <UserReview onLoginRequest={() => setShowAuth(true)} />
        </div>
      </div>

      {/* Modal login */}
      {showAuth && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setShowAuth(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg font-bold"
            >
              <X />
            </button>
            <AuthPage />
          </div>
        </div>
      )}
    </>
  );
}
