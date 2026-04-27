import React, { useState } from 'react';
import { Home, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LogsTable from './LogsTable';

const TRANSLATIONS = {
  EN: {
    news: "News",
    userDashboard: "User Dashboard",
    ibDashboard: "IB Dashboard",
    logs: "LOGS",
    logsBread: "Logs"
  },
  HI: {
    news: "समाचार",
    userDashboard: "यूजर डैशबोर्ड",
    ibDashboard: "आईबी डैशबोर्ड",
    logs: "लॉग्स",
    logsBread: "लॉग्स"
  }
};

const LogsPage = ({ onNavigate }) => {
  const [dashboardType, setDashboardType] = useState('User');
  const { language } = useLanguage();

  const t = (key) => TRANSLATIONS[language]?.[key] || key;

  return (
    <div className="flex flex-col w-full h-full animate-fade-in pb-20">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)] mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-[20px] md:text-[24px] font-extrabold text-[var(--text-color)] tracking-tight leading-none uppercase">{t('logs')}</h1>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#AF6C56] animate-pulse" style={{ animationDuration: '1s' }}></div>
            <span className="bg-[#158B86] text-white text-sm sm:text-lg font-medium px-2 rounded-sm cursor-pointer">{t('news')}</span>
          </div>
        </div>

        
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
           <div className="bg-[var(--sub-bg)] border border-[var(--border-color)] p-1.5 rounded-full flex items-center h-[40px]">
              <button 
                onClick={() => setDashboardType('User')}
                className={`px-4 sm:px-5 py-1.5 rounded-full text-[13px] sm:text-[14px] transition-colors ${dashboardType === 'User' ? 'font-semibold bg-[#158B86] text-white shadow-sm' : 'font-medium text-[#8e9d9b] hover:text-[var(--text-color)]'}`}
              >{t('userDashboard')}</button>
              <button 
                onClick={() => setDashboardType('IB')}
                className={`px-4 sm:px-5 py-1.5 rounded-full text-[13px] sm:text-[14px] transition-colors ${dashboardType === 'IB' ? 'font-semibold bg-[#158B86] text-white shadow-sm' : 'font-medium text-[#8e9d9b] hover:text-[var(--text-color)]'}`}
              >{t('ibDashboard')}</button>
           </div>
           
           {/*
           <button className="text-[#8e9d9b] hover:text-white transition-colors">
              <Moon size={20} strokeWidth={2} />
           </button>
           
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
                   <span className="flex items-center gap-3 text-[14px]"><span className="font-bold opacity-60">IN</span> Hindi</span>
                   {language === 'HI' && <span className="text-white text-[12px]">✓</span>}
                 </button>
               </div>
             )}
           </div>
           */}
        </div>
      </div>


      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[15px] mb-6 font-medium">
        <Home size={18} className="text-[#158B86] cursor-pointer hover:opacity-80 transition-colors" strokeWidth={2.5} onClick={() => onNavigate('Dashboard')} />
        <ChevronRight size={16} className="text-gray-500" strokeWidth={2} />
        <span className="text-[var(--text-color)] cursor-default tracking-wide">{t('logsBread')}</span>
      </div>


      {/* Table Section */}
      <LogsTable language={language} />
    </div>
  );
};

export default LogsPage;
