import React, { useState, useEffect } from 'react';

const auditSteps = [
  "Verifying Business Details...",
  "Analyzing Website Branding & SEO...",
  "Inspecting Icon Quality...",
  "Detecting Technology Stack...",
  "Estimating Web Traffic...",
  "Auditing Social Media Presence...",
  "Comparing Against Competitors...",
  "Finalizing Your Report...",
];

const CheckIcon: React.FC = () => (
    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="Completed">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
);

const SpinnerIcon: React.FC = () => (
    <svg className="animate-spin h-6 w-6 text-brand-turquoise" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-label="In Progress">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const PendingIcon: React.FC = () => (
    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="Pending">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const Loader: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Estimate audit time and divide by number of steps for interval duration
    // e.g., 21 seconds total / 7 steps = 3s per step
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev < auditSteps.length - 1 ? prev + 1 : prev));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center py-12 md:py-20 animate-fade-in">
      <h2 className="text-3xl font-bold text-brand-gray font-display mb-4">Crafting Your Brand Analysis</h2>
      <p className="text-gray-600 mb-10 max-w-lg mx-auto">Our AI is performing a live audit of your digital presence. Please wait a few moments.</p>

      <div className="max-w-md mx-auto space-y-3" role="status" aria-live="polite">
        {auditSteps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center p-3 rounded-lg transition-all duration-500 transform ${
              index < currentStep ? 'bg-green-50' : 
              index === currentStep ? 'bg-cyan-50 scale-105 shadow-lg' : 
              'bg-gray-50 opacity-70'
            }`}
            aria-current={index === currentStep ? 'step' : 'false'}
          >
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full mr-4 bg-white shadow-sm">
              {index < currentStep ? <CheckIcon /> : 
               index === currentStep ? <SpinnerIcon /> : 
               <PendingIcon />}
            </div>
            <span className={`font-semibold text-left ${
              index <= currentStep ? 'text-brand-gray' : 'text-gray-500'
            }`}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;