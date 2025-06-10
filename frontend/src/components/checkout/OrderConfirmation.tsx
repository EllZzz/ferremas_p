import React from 'react';
import { Check, Package } from 'lucide-react';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface OrderConfirmationProps {
  orderNumber: string;
  orderItems: OrderItem[];
  shippingInfo: ShippingInfo;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  orderNumber,
  orderItems,
  shippingInfo
}) => {
  
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7);
  
  const formattedDeliveryDate = new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).format(deliveryDate);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 bg-green-50 border-b border-green-100">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </span>
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-900">Pedido confirmado</h2>
            <p className="text-sm text-gray-600 mt-1">
              Gracias por tu compra. Hemos recibido tu pago y procesaremos tu pedido en breve.
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium text-gray-900">Detalles del pedido</h3>
            <span className="text-sm text-gray-600">Pedido #{orderNumber}</span>
          </div>
          
          <div className="border-t border-b border-gray-200 py-4 space-y-4">
            {orderItems.map(item => (
              <div key={item.id} className="flex items-center">
                <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-500">Cant.: {item.quantity}</p>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Información de envío</h3>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <h4 className="text-xs font-medium text-gray-500 uppercase mb-1">Dirección de envío</h4>
                <p className="text-sm text-gray-800">{shippingInfo.firstName} {shippingInfo.lastName}</p>
                <p className="text-sm text-gray-800">{shippingInfo.address}</p>
                <p className="text-sm text-gray-800">{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                <p className="text-sm text-gray-800">{shippingInfo.country}</p>
              </div>
              
              <div>
                <h4 className="text-xs font-medium text-gray-500 uppercase mb-1">Información de contacto</h4>
                <p className="text-sm text-gray-800">{shippingInfo.email}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-3">
            <Package className="h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-medium text-gray-900">Detalles de entrega</h3>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-gray-900">Entrega estimada</p>
              <p className="text-sm text-gray-900">{formattedDeliveryDate}</p>
            </div>
            
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full w-[15%]"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>Pedido realizado</span>
                <span>Procesando</span>
                <span>Enviado</span>
                <span>Entregado</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <a
            href="#" 
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Rastrear pedido
          </a>
          <p className="text-sm text-gray-600 mt-2">
            Se ha enviado un correo de confirmación a {shippingInfo.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
