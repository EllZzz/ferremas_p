import React, { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';

interface PaymentFormProps {
  amount: number;
  onPaymentSuccess: () => void;
  onBackClick: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, onPaymentSuccess, onBackClick }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
    if (errors.cardNumber) {
      setErrors({ ...errors, cardNumber: '' });
    }
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setExpiryDate(formatted);
    if (errors.expiryDate) {
      setErrors({ ...errors, expiryDate: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    
    if (!cardName.trim()) {
      newErrors.cardName = 'Name on card is required';
    }
    
    if (!expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      newErrors.expiryDate = 'Expiry date must be in MM/YY format';
    }
    
    if (!cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (cvv.length < 3 || cvv.length > 4) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsProcessing(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        onPaymentSuccess();
      } catch (error) {
        setErrors({
          form: 'Pago fallido. Inténtalo de nuevo.'
        });
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Información de pago</h2>
      
      {errors.form && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
          {errors.form}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <CreditCard size={20} className="text-gray-500" />
            <h3 className="text-lg font-medium text-gray-900">Detalles de la tarjeta</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                Número de tarjeta
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="4242 4242 4242 4242"
                  maxLength={19}
                  className={`block w-full pr-10 border ${errors.cardNumber ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2.5`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="35" height="23" rx="3.5" fill="white" stroke="#E5E7EB"/>
                    <path d="M23.5 7H26.5V17H23.5V7Z" fill="#FF5F00"/>
                    <path d="M12.5 7H15.5V17H12.5V7Z" fill="#FF5F00"/>
                    <path d="M13 12C13 9.5 14.2 7.3 16 6C14.5 4.9 12.7 4.5 11 4.5C6.9 4.5 3.5 7.9 3.5 12C3.5 16.1 6.9 19.5 11 19.5C12.7 19.5 14.5 19 16 18C14.2 16.7 13 14.5 13 12Z" fill="#EB001B"/>
                    <path d="M33.5 12C33.5 16.1 30.1 19.5 26 19.5C24.3 19.5 22.5 19 21 18C22.8 16.7 24 14.5 24 12C24 9.5 22.8 7.3 21 6C22.5 4.9 24.3 4.5 26 4.5C30.1 4.5 33.5 7.9 33.5 12Z" fill="#F79E1B"/>
                  </svg>
                </div>
              </div>
              {errors.cardNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
                Nombre en la tarjeta
              </label>
              <input
                type="text"
                id="cardName"
                value={cardName}
                onChange={(e) => {
                  setCardName(e.target.value);
                  if (errors.cardName) setErrors({ ...errors, cardName: '' });
                }}
                className={`mt-1 block w-full border ${errors.cardName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.cardName && (
                <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                  Fecha de expiración
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  placeholder="MM/AA"
                  maxLength={5}
                  className={`mt-1 block w-full border ${errors.expiryDate ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {errors.expiryDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  value={cvv}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setCvv(value);
                    if (errors.cvv) setErrors({ ...errors, cvv: '' });
                  }}
                  maxLength={4}
                  className={`mt-1 block w-full border ${errors.cvv ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {errors.cvv && (
                  <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="bg-blue-50 border border-blue-100 rounded-md p-4 flex items-start">
            <Lock size={20} className="text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">Tu pago está seguro</p>
              <p className="mt-1">Utilizamos encriptación estándar de la industria para proteger su información personal.</p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">Al hacer clic en "Pagar ahora", usted acepta nuestro <a href="#" className="text-blue-600 hover:text-blue-800">Términos</a> y <a href="#" className="text-blue-600 hover:text-blue-800">Política de Privacidad</a>.</p>
        </div>
        
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
          <button
            type="button"
            onClick={onBackClick}
            className="py-3 px-4 rounded-md border border-gray-300 shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Volver a Envíos
          </button>
          
          <button
            type="submit"
            disabled={isProcessing}
            className="flex-1 bg-blue-600 py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando...
              </span>
            ) : (
              `Pagar ahora $${amount.toFixed(2)}`
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;