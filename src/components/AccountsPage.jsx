import React, { useState } from 'react';
import AccountsTable from './AccountsTable';
import { Home, ChevronRight, Settings, Moon, Globe } from 'lucide-react';

const TRANSLATIONS = {
  EN: {
    accounts: "ACCOUNTS",
    news: "News",
    userDashboard: "User Dashboard",
    ibDashboard: "IB Dashboard",
    liveAccount: "Live Account",
    demoAccount: "Demo Account",
    pending: "Pending",
    approved: "Approved",
    declined: "Declined",
    openLiveAccount: "Open Live Account",
    breadcrumb: "Accounts"
  },
  HI: {
    accounts: "अकाउंट्स",
    news: "समाचार",
    userDashboard: "यूजर डैशबोर्ड",
    ibDashboard: "आईबी डैशबोर्ड",
    liveAccount: "लाइव अकाउंट",
    demoAccount: "डेमो अकाउंट",
    pending: "लंबित",
    approved: "स्वीकृत",
    declined: "अस्वीकृत",
    openLiveAccount: "लाइव अकाउंट खोलें",
    breadcrumb: "अकाउंट्स"
  }
};

const AccountsPage = ({ onNavigate }) => {
  const [dashboardType, setDashboardType] = useState('User');
  const [accountType, setAccountType] = useState('Live');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All', 'Pending', 'Approved', 'Declined'
  const [language, setLanguage] = useState('EN');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const t = (key) => TRANSLATIONS[language][key] || key;

  return (
    <div className="animate-fade-in flex flex-col h-full">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <h1 className="text-[20px] md:text-[24px] font-extrabold text-white tracking-tight leading-none uppercase">{t('accounts')}</h1>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#AF6C56] animate-pulse" style={{ animationDuration: '1s' }}></div>
            <span className="bg-[#158B86] text-white text-sm sm:text-lg font-medium px-2 rounded-sm cursor-pointer">{t('news')}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
           <div className="bg-[#122D32] p-1.5 rounded-full flex items-center h-[40px]">
              <button 
                onClick={() => setDashboardType('User')}
                className={`px-4 sm:px-5 py-1.5 rounded-full text-[13px] sm:text-[14px] transition-colors ${dashboardType === 'User' ? 'font-semibold bg-[#158B86] text-white shadow-sm' : 'font-medium text-[#8e9d9b] hover:text-white'}`}
              >{t('userDashboard')}</button>
              <button 
                onClick={() => setDashboardType('IB')}
                className={`px-4 sm:px-5 py-1.5 rounded-full text-[13px] sm:text-[14px] transition-colors ${dashboardType === 'IB' ? 'font-semibold bg-[#158B86] text-white shadow-sm' : 'font-medium text-[#8e9d9b] hover:text-white'}`}
              >{t('ibDashboard')}</button>
           </div>
           
           <button className="text-[#8e9d9b] hover:text-white transition-colors">
              <Moon size={20} strokeWidth={2} />
           </button>
           {/* Language Dropdown */}
           <div className="relative">
             <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1 text-[#8e9d9b] hover:text-white transition-colors text-[14px] font-medium"
             >
                <Globe size={18} strokeWidth={2} /> {language}
             </button>
             
             {isLangMenuOpen && (
               <div className="absolute right-0 top-full mt-2 w-36 bg-[#1A1A1A] border border-white/10 rounded-[8px] shadow-[0_4px_20px_rgba(0,0,0,0.5)] py-2 z-50 animate-fade-in">
                 <button 
                   onClick={() => { setLanguage('EN'); setIsLangMenuOpen(false); }}
                   className={`w-full px-4 py-2 text-left flex items-center justify-between transition-colors ${language === 'EN' ? 'text-white bg-white/5' : 'text-[#8e9d9b] hover:text-white hover:bg-white/5'}`}
                 >
                   <span className="flex items-center gap-3 text-[14px]"><span className="font-bold opacity-60">US</span> English</span>
                   {language === 'EN' && <span className="text-white text-[12px]">✓</span>}
                 </button>
                 <button 
                   onClick={() => { setLanguage('HI'); setIsLangMenuOpen(false); }}
                   className={`w-full px-4 py-2 text-left flex items-center justify-between transition-colors ${language === 'HI' ? 'text-white bg-white/5' : 'text-[#8e9d9b] hover:text-white hover:bg-white/5'}`}
                 >
                   <span className="flex items-center gap-3 text-[14px]"><span className="font-bold opacity-60">IN</span> हिन्दी</span>
                   {language === 'HI' && <span className="text-white text-[12px]">✓</span>}
                 </button>
               </div>
             )}
           </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[14px] font-semibold mt-4 mb-8">
         <Home size={16} className="text-[#158B86] cursor-pointer" onClick={() => onNavigate('Dashboard')} />
         <ChevronRight size={14} className="text-[#8e9d9b]" />
         <span className="text-white">{t('breadcrumb')}</span>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
         
         {/* Tab Controls Row */}
         <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 mb-6">
            {/* Left: Live / Demo */}
            <div className="bg-[#1A1A1A] p-1.5 rounded-[10px] flex items-center w-full xl:w-auto overflow-x-auto hide-scrollbar">
               <button 
                 onClick={() => setAccountType('Live')}
                 className={`whitespace-nowrap px-6 py-2 rounded-[8px] text-[14px] font-bold transition-all flex-shrink-0 ${accountType === 'Live' ? 'bg-[#158B86] text-white shadow-[0_2px_8px_rgba(21,139,134,0.3)]' : 'bg-transparent text-white hover:text-white/80'}`}
               >{t('liveAccount')}</button>
               <button 
                 onClick={() => setAccountType('Demo')}
                 className={`whitespace-nowrap px-6 py-2 rounded-[8px] text-[14px] font-bold transition-all flex-shrink-0 ${accountType === 'Demo' ? 'bg-[#158B86] text-white shadow-[0_2px_8px_rgba(21,139,134,0.3)]' : 'bg-transparent text-white hover:text-white/80'}`}
               >{t('demoAccount')}</button>
            </div>

            {/* Right: Status Filters & Action Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full xl:w-auto">
               <div className="bg-[#1A1A1A] p-1.5 rounded-[10px] flex items-center gap-1 overflow-x-auto w-full sm:w-auto hide-scrollbar">
                 {['Pending', 'Approved', 'Declined'].map((status) => {
                    const statusKey = status.toLowerCase();
                    return (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(statusFilter === status ? 'All' : status)}
                        className={`whitespace-nowrap flex-shrink-0 px-5 py-2 rounded-[8px] text-[13px] font-bold transition-all ${
                           statusFilter === status 
                           ? 'bg-[#158B86] text-white shadow-[0_2px_8px_rgba(21,139,134,0.3)]' 
                           : 'bg-transparent text-white hover:text-white/80'
                        }`}
                      >
                        {t(statusKey)}
                      </button>
                    );
                 })}
               </div>
               
               <button className="bg-[#158B86] hover:bg-[#117672] text-white px-6 py-2.5 rounded-[8px] text-[14px] font-bold shadow-[0_4px_10px_rgba(21,139,134,0.3)] transition-all whitespace-nowrap w-full sm:w-auto">
                  {t('openLiveAccount')}
               </button>
            </div>
         </div>

         {/* Table Container */}
         <div className="flex-1 min-h-0">
            {/* Reusing the exact AccountsTable but passing hideHeader and our new state controls */}
            <AccountsTable 
               hideHeader={true} 
               externalAccountType={accountType} 
               statusFilter={statusFilter}
               language={language}
            />
         </div>
      </div>
    </div>
  );
};

export default AccountsPage;
