import React from 'react';

const NoAccountsState = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center animate-fade-in bg-white dark:bg-transparent rounded-[24px]">
      {/* Large Plus Icon */}
      <div className="w-[140px] h-[140px] rounded-full border-[5px] border-[#B2D4D2] flex items-center justify-center mb-8">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#B2D4D2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-[32px] md:text-[40px] font-extrabold text-[#111827] dark:text-white mb-3 tracking-tight">
        You have no live Account
      </h1>

      {/* Subtitle */}
      <p className="text-[18px] md:text-[22px] text-[#4B5563] dark:text-gray-400 mb-12 max-w-[600px]">
        To get started, you'll need to create an account.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[550px]">
        <button 
          onClick={() => onNavigate('Account_Types', { defaultType: 'Live' })}
          className="flex-1 bg-[#158B86] hover:bg-[#127a75] text-white h-[56px] rounded-[12px] font-bold text-[18px] transition-all shadow-lg shadow-[#158B86]/20"
        >
          Open Live Account
        </button>
        <button 
          onClick={() => onNavigate('Account_Types', { defaultType: 'Demo' })}
          className="flex-1 bg-[#46A7A3] hover:bg-[#3d928f] text-white h-[56px] rounded-[12px] font-bold text-[18px] transition-all shadow-lg shadow-[#46A7A3]/20"
        >
          Open Demo Account
        </button>
      </div>
    </div>
  );
};

export default NoAccountsState;
