import {
  ShoppingCart,
  Truck,
  CreditCard,
  CheckCircle,
} from "lucide-react";

interface Props {
  steps: string[];
  currentStep: number; // 0-based index
}

const icons = [
  <ShoppingCart key="cart" className="w-5 h-5 text-white" />,
  <Truck key="shipping" className="w-5 h-5 text-white" />,
  <CreditCard key="payment" className="w-5 h-5 text-white" />,
  <CheckCircle key="confirm" className="w-5 h-5 text-white" />,
];

export default function CheckoutSteps({ steps, currentStep }: Props) {
  return (
    <div className="flex justify-between items-center w-full relative">
      {steps.map((label, index) => {
        const isCompleted = currentStep > index;
        const isActive = currentStep === index;

        return (
          <div key={label} className="flex-1 flex flex-col items-center relative">
            {/* Línea de conexión izquierda (omitida en el primer ítem) */}
            {index !== 0 && (
              <div className="absolute top-5 -left-1/2 w-full h-0.5 bg-gray-300 z-0" />
            )}

            {/* Círculo del ícono */}
            <div
              className={`z-10 w-10 h-10 rounded-full flex items-center justify-center
                ${isCompleted ? "bg-green-500" :
                  isActive ? "bg-blue-700 shadow-lg" :
                  "bg-gray-300"}
              `}
            >
              {icons[index]}
            </div>

            {/* Etiqueta */}
            <p className={`mt-2 text-sm text-center
              ${isActive ? "text-blue-700 font-semibold" : "text-gray-500"}
            `}>
              {label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
