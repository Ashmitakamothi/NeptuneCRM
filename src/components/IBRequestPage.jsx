import React, { useState } from 'react';
import { Home, ChevronRight, Moon, Globe, CheckCircle2, LayoutDashboard, Copy } from 'lucide-react';

const TRANSLATIONS = {
  EN: { news: 'News', userDashboard: 'User Dashboard', ibDashboard: 'IB Dashboard' },
  HI: { news: 'समाचार', userDashboard: 'यूजर डैशबोर्ड', ibDashboard: 'आईबी डैशबोर्ड' },
};

const IBRequestPage = ({ onNavigate }) => {
  const [dashboardType, setDashboardType] = useState('User');
  const [language, setLanguage] = useState('EN');
  const referralLink = 'NX5VFSL6';

  const t = (key) => TRANSLATIONS[language]?.[key] || key;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    // Optional: add toast notification here
  };

  return (
    <div className="flex flex-col w-full animate-fade-in pb-20">
      {/* ── Top Header ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/5 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-[22px] font-extrabold text-white tracking-tight uppercase">IB REQUEST</h1>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#AF6C56] animate-pulse" />
            <span className="bg-[#158B86] text-white text-sm font-medium px-2 rounded-sm">{t('news')}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {/* Referral Link Pill - New element from screenshot */}
          <div className="flex items-center gap-3 bg-[#122D32] px-4 py-2 rounded-[6px] border border-white/5 text-[13px] text-white">
            <span className="text-[#8e9d9b]">My Referral Link:</span>
            <span className="font-bold tracking-wider">{referralLink}</span>
            <button onClick={handleCopy} className="hover:text-[#158B86] transition-colors"><Copy size={14} /></button>
          </div>

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
        <span className="text-white">IB Request</span>
      </div>

      {/* ── Approval State Content ─────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#38A169] rounded-full blur-[150px] opacity-[0.03] pointer-events-none" />

        <div className="w-full max-w-[500px] flex flex-col items-center animate-scale-in">
          {/* Success Icon */}
          <div className="relative mb-10">
            <div className="absolute inset-0 bg-[#38A169] rounded-full blur-[40px] opacity-20 animate-pulse" />
            <div className="w-24 h-24 rounded-full border-[3px] border-[#38A169] flex items-center justify-center bg-[#06120f] relative z-10">
                <CheckCircle2 size={56} className="text-[#38A169]" />
            </div>
          </div>

          <h2 className="text-[32px] font-extrabold text-white mb-4 tracking-tight">Request Approved</h2>
          <div className="text-[#8e9d9b] text-[16px] text-center max-w-[400px] leading-relaxed mb-10">
            Congratulations! Your IB request has been approved. You can now access the IB Dashboard.
          </div>

          <button 
            onClick={() => onNavigate('Dashboard')}
            className="flex items-center gap-3 px-10 py-3.5 rounded-[8px] bg-[#158B86] hover:bg-[#117672] text-white text-[15px] font-bold transition-all shadow-[0_10px_25px_rgba(21,139,134,0.3)] hover:-translate-y-1 active:translate-y-0"
          >
            <LayoutDashboard size={20} />
            Explore IB Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default IBRequestPage;
