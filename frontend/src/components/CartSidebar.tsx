// src/components/CartSidebar.tsx
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

export default function CartSidebar({ isOpen, onClose }: Props) {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((acc, item) => acc + item.product_unitprice * item.quantity, 0);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold text-blue-800">Carrito de compras</h2>
        <button
          onClick={onClose}
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
            <div key={item.idProduct} className="flex text-blue-950 items-center justify-between mb-4 border-b border-gray-200 pb-4">
              <div className="flex-1">
                <p className="font-semibold">{item.product_name}</p>
                <p className="text-sm text-gray-600">{CLP.format(item.product_unitprice)} c/u</p>
                <div className="mt-1 flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.idProduct, item.quantity - 1)}
                    className="!px-2 !py-0 bg-gray-200 rounded hover:bg-gray-300 !transition-colors"
                  >-</button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.idProduct, item.quantity + 1)}
                    className="!px-2 !py-0 bg-gray-200 rounded hover:bg-gray-300 !transition-colors"
                    disabled={item.quantity >= item.stock}
                  >+</button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{CLP.format(item.product_unitprice * item.quantity)}</p>
                <button
                  onClick={() => removeFromCart(item.idProduct)}
                  className="text-red-700 hover:text-red-500 mt-2 text-sm !transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash-icon lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="absolute bg-white border-gray-300 bottom-0 left-0 right-0 p-4 border-t">
        <div className="font-bold text-blue-900 flex justify-between mb-4">
          <span>Total:</span>
          <span>{CLP.format(totalPrice)}</span>
        </div>
        {cart.length > 0 && (
          <button
            className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-700 !transition-colors"
            onClick={() => {
              onClose();
              navigate('/checkout');
            }}
          >
            Proceder al pago
          </button>
        )}
      </div>
    </div>
  );
}