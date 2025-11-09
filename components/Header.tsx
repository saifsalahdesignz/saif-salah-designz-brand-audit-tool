import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white py-6 shadow-md">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-brand-gray tracking-tight font-display">
          Saif Salah Designz
        </h1>
        <p className="text-lg text-gray-600 font-medium mt-1">
          Your Brand Factory
        </p>
        <p className="mt-4 text-lg text-brand-turquoise font-semibold">
          AI Brand Audit Tool
        </p>
      </div>
    </header>
  );
};

export default Header;