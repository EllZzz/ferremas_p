import React, { useState, useEffect } from 'react';
import OrderSummary from '../components/checkout/OrderSummary';
import ShippingForm from '../components/checkout/ShippingForm';
import type { ShippingMethod } from '../components/checkout/ShippingForm';
import PaymentForm from '../components/checkout/PaymentForm';
import OrderConfirmation from '../components/checkout/OrderConfirmation';
import CheckoutSteps from '../components/checkout/CheckoutSteps';
import { ArrowLeft, Wrench } from 'lucide-react';
import { useCart } from "../context/CartContext";
import { convertCartItemToOrderItem } from '../utils/cartMappers';

const CHECKOUT_STEPS = ['Carrito', 'Despacho', 'Pago', 'Confirmación'];

const CheckoutPage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');
    const { cart: cartItems, clearCart } = useCart();
    const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('standard');

    const [shippingInfo, setShippingInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'CL'
    });

    const subtotal = cartItems.reduce((sum, item) => sum + item.product_unitprice * item.quantity, 0);
    const [shippingCost, setShippingCost] = useState(4990);
    const tax = Math.round(subtotal * 0.19);
    const total = subtotal + shippingCost + tax;

    useEffect(() => {
        if (orderComplete) {
            alert(`Pago exitoso! Número de orden: ${orderNumber}`);
        }
    }, [orderComplete, orderNumber]);

    const handleNextStep = () => {
        if (currentStep < CHECKOUT_STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePreviousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleShippingSubmit = (data: typeof shippingInfo) => {
        setShippingInfo(data);
        handleNextStep();
    };

    const handlePaymentSuccess = () => {
        const generatedOrderNumber = `PED-${Math.floor(Math.random() * 1000000)}`;
        setOrderNumber(generatedOrderNumber);
        setOrderComplete(true);
        clearCart();
        handleNextStep();
    };

    return (
        <div className="min-h-screen bg-zinc-100">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-center">
                    <Wrench className="h-8 w-8 text-blue-800 mr-3" />
                    <h1 className="text-3xl font-bold text-gray-900">Finalizar Compra</h1>
                </div>

                <CheckoutSteps steps={CHECKOUT_STEPS} currentStep={currentStep} />

                <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 mt-8">
                    <div className="lg:col-span-7">
                        {currentStep > 0 && currentStep < CHECKOUT_STEPS.length - 1 && (
                            <button
                                onClick={handlePreviousStep}
                                className="flex items-center text-blue-800 mb-4 transition duration-150 hover:text-blue-600"
                            >
                                <ArrowLeft size={16} className="mr-1" />
                                Volver
                            </button>
                        )}

                        {currentStep === 0 && (
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                <h2 className="text-xl font-semibold mb-4">Revisa tu Carro</h2>
                                {cartItems.length === 0 ? (
                                    <p className="text-gray-600">Tu carrito está vacío.</p>
                                ) : (
                                    <>
                                        <div className="space-y-4 mb-6">
                                            {cartItems.map(item => (
                                                <div key={item.idProduct} className="flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0">
                                                    <img src={item.product_img} alt={item.product_name} className="w-16 h-16 object-cover rounded-md" />
                                                    <div className="flex-1">
                                                        <h3 className="font-medium text-gray-900">{item.product_name}</h3>
                                                        <p className="text-gray-600">Cantidad: {item.quantity}</p>
                                                    </div>
                                                    <p className="font-medium text-gray-900">
                                                        ${item.product_unitprice.toLocaleString('es-CL')}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            onClick={handleNextStep}
                                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium transition duration-150 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            Continuar al Despacho
                                        </button>
                                    </>
                                )}
                            </div>
                        )}

                        {currentStep === 1 && (
                            <ShippingForm
                                shippingInfo={shippingInfo}
                                onSubmit={handleShippingSubmit}
                                onShippingCostChange={setShippingCost}
                                shippingMethod={shippingMethod}
                                onShippingMethodChange={setShippingMethod}
                            />
                        )}

                        {currentStep === 2 && (
                            <PaymentForm
                                amount={total}
                                onPaymentSuccess={handlePaymentSuccess}
                                onBackClick={handlePreviousStep}
                            />
                        )}

                        {currentStep === 3 && (
                            <OrderConfirmation
                                orderNumber={orderNumber}
                                orderItems={cartItems.map(convertCartItemToOrderItem)}
                                shippingInfo={shippingInfo}
                            />
                        )}

                    </div>

                    <div className="lg:col-span-5 mt-8 lg:mt-0">
                        <OrderSummary
                            items={cartItems.map(item => ({
                                id: item.idProduct,
                                name: item.product_name,
                                price: item.product_unitprice,
                                quantity: item.quantity,
                                image: item.product_img
                            }))}
                            subtotal={subtotal}
                            shipping={shippingCost}
                            tax={tax}
                            total={total}
                            shippingMethod={shippingMethod}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
