import React from 'react';

const PlaceholderPage = ({ title }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
        <div className="w-12 h-12 border-2 border-brand-primary border-t-transparent rounded-full animate-spin opacity-20"></div>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h1>
      <p className="text-[#8e9d9b] max-w-md text-lg">
        This page is currently under development. We're working hard to bring you the best experience for {title.toLowerCase()}.
      </p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-8 px-6 py-3 bg-white text-brand-dark rounded-full font-semibold hover:bg-opacity-90 transition-all"
      >
        Go Back to Dashboard
      </button>
    </div>
  );
};

export default PlaceholderPage;
