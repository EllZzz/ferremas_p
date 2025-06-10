import React, { useState, useEffect } from 'react';
export type ShippingMethod = 'standard' | 'express' | 'pickup';

interface ShippingFormProps {
  shippingInfo: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  shippingMethod: ShippingMethod;
  onShippingCostChange: (cost: number) => void;
  onShippingMethodChange: (method: ShippingMethod) => void;
  onSubmit: (data: ShippingFormProps['shippingInfo'], shippingMethod: ShippingMethod) => void;
}


const ShippingForm: React.FC<ShippingFormProps> = ({ shippingInfo, shippingMethod, onSubmit, onShippingMethodChange, onShippingCostChange, }) => {
  const [formData, setFormData] = useState(shippingInfo);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
  if (shippingMethod === 'standard') onShippingCostChange(4990);
  else if (shippingMethod === 'express') onShippingCostChange(7990);
  else if (shippingMethod === 'pickup') onShippingCostChange(0);
}, [shippingMethod, onShippingCostChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es requerido';
    if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.address.trim()) newErrors.address = 'La dirección es requerida';
    if (!formData.city.trim()) newErrors.city = 'La ciudad es requerida';
    if (!formData.state.trim()) newErrors.state = 'La región es requerida';
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'El código postal es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData, shippingMethod);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Información de Despacho</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`mt-1 block w-full border ${errors.firstName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm`}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Apellido
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`mt-1 block w-full border ${errors.lastName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm`}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Dirección
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`mt-1 block w-full border ${errors.address ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm`}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address}</p>
            )}
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              Ciudad
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`mt-1 block w-full border ${errors.city ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm`}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city}</p>
            )}
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              Región
            </label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            >
              <option value="">Selecciona una región</option>
              <option value="RM">Región Metropolitana</option>
              <option value="V">Valparaíso</option>
              <option value="VIII">Biobío</option>
              <option value="VI">O'Higgins</option>
              <option value="VII">Maule</option>
              <option value="IX">Araucanía</option>
            </select>
            {errors.state && (
              <p className="mt-1 text-sm text-red-600">{errors.state}</p>
            )}
          </div>

          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
              Código Postal
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className={`mt-1 block w-full border ${errors.zipCode ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm`}
            />
            {errors.zipCode && (
              <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Método de Envío</h3>

          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="radio"
                id="shipping-standard"
                name="shipping-method"
                value="standard"
                checked={shippingMethod === 'standard'}
                onChange={() => onShippingMethodChange('standard')}
                className="h-4 w-4 text-yellow-600 border-gray-300 focus:ring-yellow-500"
              />
              <label htmlFor="shipping-standard" className="ml-3 flex flex-col">
                <span className="block text-sm font-medium text-gray-900">Estándar</span>
                <span className="block text-sm text-gray-500">3-5 días hábiles - $4.990</span>
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                id="shipping-express"
                name="shipping-method"
                value="express"
                checked={shippingMethod === 'express'}
                onChange={() => onShippingMethodChange('express')}
                className="h-4 w-4 text-yellow-600 border-gray-300 focus:ring-yellow-500"
              />
              <label htmlFor="shipping-express" className="ml-3 flex flex-col">
                <span className="block text-sm font-medium text-gray-900">Express</span>
                <span className="block text-sm text-gray-500">1-2 días hábiles - $7.990</span>
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                id="shipping-pickup"
                name="shipping-method"
                value="pickup"
                checked={shippingMethod === 'pickup'}
                onChange={() => onShippingMethodChange('pickup')}
                className="h-4 w-4 text-yellow-600 border-gray-300 focus:ring-yellow-500"
              />
              <label htmlFor="shipping-pickup" className="ml-3 flex flex-col">
                <span className="block text-sm font-medium text-gray-900">Retiro en Tienda</span>
                <span className="block text-sm text-gray-500">Disponible en 24 horas - Gratis</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-3 px-4 rounded-md font-medium transition duration-150 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Continuar al Pago
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;