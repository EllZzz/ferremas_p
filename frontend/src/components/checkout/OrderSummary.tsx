import React from 'react';
import type { ShippingMethod } from './ShippingForm';

interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderSummaryProps {
  items: Item[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingMethod: ShippingMethod;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  shipping,
  tax,
  total,
  shippingMethod
}) => {
  const formatPrice = (price: number) => price.toLocaleString('es-CL');

  const getShippingMethodText = () => {
    switch (shippingMethod) {
      case 'standard':
        return 'Estándar (3-5 días hábiles)';
      case 'express':
        return 'Express (1-2 días hábiles)';
      case 'pickup':
        return 'Retiro en Tienda';
      default:
        return 'Envío';
    }
  };


  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
      <h2 className="text-xl font-semibold mb-4">Resumen de Compra</h2>

      <div className="space-y-4 mb-6">
        {items.map(item => (
          <div key={item.id} className="flex items-center space-x-4 py-2">
            <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</h3>
              <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">
              ${formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-2 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <p className="text-gray-600">Subtotal</p>
          <p className="text-gray-900 font-medium">${formatPrice(subtotal)}</p>
        </div>

        <div className="flex justify-between text-sm">
          <p className="text-gray-600">Método de envío</p>
          <p className="text-gray-900 font-medium">{getShippingMethodText()}</p>
        </div>
        <div className="flex justify-between text-sm">
          <p className="text-gray-600">Despacho</p>
          <p className="text-gray-900 font-medium">${formatPrice(shipping)}</p>
        </div>

        <div className="flex justify-between text-sm">
          <p className="text-gray-600">IVA (19%)</p>
          <p className="text-gray-900 font-medium">${formatPrice(tax)}</p>
        </div>
        <div className="flex justify-between pt-4 border-t border-gray-200 text-base font-medium">
          <p className="text-gray-900">Total</p>
          <p className="text-orange-600">${formatPrice(total)}</p>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <p>Pago seguro por</p>
            <div className="flex items-center space-x-2 mt-2">
              <img src="https://www.webpay.cl/assets/img/logo-webpay.png" alt="WebPay" className="h-6" />
              <img src="https://www.khipu.com/assets/khipu-logo.png" alt="Khipu" className="h-6" />
            </div>
          </div>
          <div className="flex items-center">
            <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="ml-1 text-xs text-gray-500">Transacción segura</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;