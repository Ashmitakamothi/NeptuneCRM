import React from 'react';

const NoAccountsState = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center py-6 md:py-10 px-4 text-center animate-fade-in bg-white dark:bg-transparent rounded-[24px]">
      {/* Large Plus Icon - Responsive Colors */}
      <div className="w-[120px] h-[120px] md:w-[140px] md:h-[140px] rounded-full border-[4px] md:border-[5px] border-[#B2C2F2] md:border-[#B2D4D2] flex items-center justify-center mb-6 md:mb-8">
        <svg width="50" height="50" md:width="60" md:height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#B2C2F2] md:text-[#B2D4D2]">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-[24px] md:text-[40px] font-extrabold text-[#111827] dark:text-white mb-2 md:mb-3 tracking-tight">
        You have no live Account
      </h1>

      {/* Subtitle */}
      <p className="text-[15px] md:text-[22px] text-[#4B5563] dark:text-gray-400 mb-8 md:mb-12 max-w-[600px] leading-snug">
        To get started, you'll need to create an account.
      </p>

      {/* Buttons - Responsive Colors (Blue on Mobile, Teal on Desktop) */}
      <div className="flex flex-row gap-3 w-full max-w-[550px]">
        <button 
          onClick={() => onNavigate('Account_Types', { defaultType: 'Live' })}
          className="flex-1 bg-[#1a3fb5] md:bg-[#158B86] hover:bg-[#1534a1] md:hover:bg-[#127a75] text-white h-[48px] md:h-[56px] rounded-[12px] font-bold text-[14px] md:text-[18px] transition-all shadow-lg"
        >
          Open Live Account
        </button>
        <button 
          onClick={() => onNavigate('Account_Types', { defaultType: 'Demo' })}
          className="flex-1 bg-[#1a3fb5] md:bg-[#158B86] hover:bg-[#1534a1] md:hover:bg-[#127a75] text-white h-[48px] md:h-[56px] rounded-[12px] font-bold text-[14px] md:text-[18px] transition-all shadow-lg"
        >
          Open Demo Account
        </button>
      </div>
    </div>
  );
};

export default NoAccountsState;
