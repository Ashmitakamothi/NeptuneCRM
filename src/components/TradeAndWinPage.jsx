import React, { useState } from 'react';
import { Home, ChevronRight, Moon, Globe, Trophy, Info } from 'lucide-react';
import noDataImg from '../assets/nodata.svg';

const TRANSLATIONS = {
  EN: { news: 'News', userDashboard: 'User Dashboard', ibDashboard: 'IB Dashboard' },
  HI: { news: 'समाचार', userDashboard: 'यूजर डैशबोर्ड', ibDashboard: 'आईबी डैशबोर्ड' },
};

const TradeAndWinPage = ({ onNavigate }) => {
  const [dashboardType, setDashboardType] = useState('User');
  const [language, setLanguage] = useState('EN');

  const t = (key) => TRANSLATIONS[language]?.[key] || key;

  return (
    <div className="flex flex-col w-full animate-fade-in pb-20">
      {/* ── Top Header ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/5 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-[22px] font-extrabold text-white tracking-tight uppercase">TRADE & WIN</h1>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#AF6C56] animate-pulse" />
            <span className="bg-[#158B86] text-white text-sm font-medium px-2 rounded-sm">{t('news')}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="bg-[#122D32] p-1.5 rounded-full flex items-center h-[38px]">
            <button onClick={() => setDashboardType('User')} className={`px-4 py-1.5 rounded-full text-[13px] transition-colors ${dashboardType === 'User' ? 'bg-[#158B86] text-white font-semibold' : 'text-[#8e9d9b] hover:text-white'}`}>{t('userDashboard')}</button>
            <button onClick={() => setDashboardType('IB')}   className={`px-4 py-1.5 rounded-full text-[13px] transition-colors ${dashboardType === 'IB'   ? 'bg-[#158B86] text-white font-semibold' : 'text-[#8e9d9b] hover:text-white'}`}>{t('ibDashboard')}</button>
          </div>
          <button className="text-[#8e9d9b] hover:text-white transition-colors"><Moon size={20} strokeWidth={2} /></button>
          <div className="flex items-center gap-1.5 bg-[#122D32] px-3 py-1.5 rounded-full h-[38px] text-[#8e9d9b] text-[13px] cursor-pointer hover:text-white transition-all">
            <Globe size={16} /> <span>US</span>
          </div>
        </div>
      </div>

      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <div className="flex items-center gap-2 text-[15px] mb-7 font-medium">
        <Home size={17} className="text-[#158B86] cursor-pointer hover:text-white transition-colors" strokeWidth={2.5} onClick={() => onNavigate('Dashboard')} />
        <ChevronRight size={15} className="text-gray-500" strokeWidth={2} />
        <span className="text-white">Trade & Win</span>
      </div>

      {/* ── Empty State Content ─────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-[500px] border border-[#158B86]/20 rounded-[12px] bg-[#06120f]/30 backdrop-blur-sm p-10">
        <div className="w-full max-w-[400px] flex flex-col items-center">
            <div className="relative mb-8 group">
                <div className="absolute inset-0 bg-[#158B86] rounded-full blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity" />
                <img src={noDataImg} alt="No active campaign" className="w-[180px] h-auto relative z-10 opacity-70 group-hover:opacity-100 transition-opacity" />
            </div>
            <h2 className="text-[18px] font-bold text-white/90 mb-3 tracking-wide">No active campaign available</h2>
            <p className="text-[#8e9d9b] text-[14px] text-center max-w-[300px] leading-relaxed">
                Stay tuned! New trading campaigns and rewards will be announced here soon.
            </p>
            
            <button 
                onClick={() => onNavigate('Dashboard')}
                className="mt-8 px-8 py-2.5 rounded-full bg-[#158B86] hover:bg-[#117672] text-white text-[14px] font-bold transition-all shadow-[0_5px_15px_rgba(21,139,134,0.3)] hover:-translate-y-0.5"
            >
                Return to Dashboard
            </button>
        </div>
      </div>
      
      {/* ── Info Footer ─────────────────────────────────────────── */}
      <div className="mt-8 flex items-center justify-center gap-2 text-[#8e9d9b] text-[12px]">
        <Info size={14} className="text-[#158B86]" />
        Participate in our regular trading contests to win exclusive prizes and bonuses.
      </div>
    </div>
  );
};

export default TradeAndWinPage;
