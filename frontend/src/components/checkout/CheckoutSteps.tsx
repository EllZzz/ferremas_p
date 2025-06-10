import React from 'react';
import { Check } from 'lucide-react';

interface CheckoutStepsProps {
  steps: string[];
  currentStep: number;
}

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ steps, currentStep }) => {
  return (
    <div className="py-6">
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center">
          {steps.map((step, index) => (
            <li key={step} className={`relative ${index < steps.length - 1 ? 'pr-8 sm:pr-20' : ''} flex-1 ${index < steps.length - 1 ? '' : ''}`}>
              <div className="flex items-center">
                <div
                  className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                    index < currentStep
                      ? 'bg-blue-600'
                      : index === currentStep
                      ? 'border-2 border-blue-600 bg-white'
                      : 'border-2 border-gray-300 bg-white'
                  }`}
                >
                  {index < currentStep ? (
                    <Check className="h-5 w-5 text-white" aria-hidden="true" />
                  ) : (
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        index === currentStep ? 'bg-blue-600' : 'bg-transparent'
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 w-20 ${
                      index < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
              <div
                className={`mt-2 flex justify-center text-sm font-medium ${
                  index <= currentStep ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                {step}
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default CheckoutSteps;