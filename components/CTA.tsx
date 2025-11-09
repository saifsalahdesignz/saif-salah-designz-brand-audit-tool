
import React from 'react';

const CTA: React.FC = () => {
  return (
    <div className="mt-8 bg-brand-gray text-white rounded-xl shadow-2xl p-8 md:p-12 text-center">
      <h2 className="text-3xl font-bold font-display">Ready to Elevate Your Brand?</h2>
      <p className="mt-4 max-w-2xl mx-auto text-gray-300">
        Contact us at Saif Salah Designz for a free consultation and tailored solutions to maximize your results.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
        <a
          href="https://calendly.com/hello-saifsalahdesignz/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-brand-turquoise text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
        >
          Get a Free Consultation
        </a>
        <a
          href="https://www.saifsalahdesignz.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-brand-gray font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
        >
          Check Our Work
        </a>
      </div>
    </div>
  );
};

export default CTA;
