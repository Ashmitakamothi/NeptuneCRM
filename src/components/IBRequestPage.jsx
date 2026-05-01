import React, { useState } from 'react';
import { Home, ChevronRight, CheckCircle2, LayoutDashboard, Copy, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const TRANSLATIONS = {
  EN: { 
    news: 'News', userDashboard: 'User Dashboard', ibDashboard: 'IB Dashboard',
    ibRequest: 'IB REQUEST', myReferral: 'My Referral Link:',
    requestApproved: 'Request Approved',
    congratsApproved: 'Congratulations! Your IB request has been approved. You can now access the IB Dashboard.',
    exploreIBDashboard: 'Explore IB Dashboard'
  },
  HI: { 
    news: 'समाचार', userDashboard: 'यूजर डैशबोर्ड', ibDashboard: 'आईबी डैशबोर्ड',
    ibRequest: 'IB अनुरोध', 
    myReferral: 'मेरा रेफरल लिंक:',
    requestApproved: 'अनुरोध स्वीकृत',
    congratsApproved: 'बधाई हो! आपका IB अनुरोध स्वीकृत हो गया है। आप अब IB डैशबोर्ड एक्सेस कर सकते हैं।',
    exploreIBDashboard: 'IB डैशबोर्ड देखें'
  },
};

const IBRequestPage = ({ onNavigate }) => {
  const [dashboardType, setDashboardType] = useState('User');
  const { language } = useLanguage();
  const referralLink = 'NX5VFSL6';

  const t = (key) => TRANSLATIONS[language]?.[key] || key;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
  };

  return (
    <div className="w-full animate-fade-in">
      {/* ─── Mobile View (lg:hidden) ─── */}
      <div className="block lg:hidden">
        {/* Mobile Header */}
        <div className="flex lg:hidden items-center gap-3 py-4 border-b border-[var(--border-color)] mb-6 -mx-4 px-4 bg-[var(--bg-color)] sticky top-0 z-[100]">
          <button onClick={() => onNavigate('Settings')} className="p-1 -ml-1 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <h1 className="text-[20px] font-bold text-[#3B82F6]">IB Request</h1>
        </div>

        {/* Mobile Success Content */}
        <div className="h-[calc(100vh-160px)] min-h-fit p-4 pb-[100px]">
          <div className="flex flex-col items-center justify-center min-h-[65vh] px-4">
            <div className="relative mb-6">
              <div className="absolute inset-0 w-28 h-28 rounded-full opacity-20 blur-xl" style={{ background: 'rgb(40, 199, 111)' }}></div>
              <div className="relative w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(40, 199, 111, 0.15) 0%, rgba(40, 199, 111, 0.05) 100%)', border: '2px solid rgba(40, 199, 111, 0.3)' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18457 2.99721 7.13633 4.39828 5.49707C5.79935 3.85782 7.69279 2.71538 9.79619 2.24015C11.8996 1.76491 14.1003 1.98234 16.07 2.86" stroke="#28C76F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M22 4L12 14.01L9 11.01" stroke="#28C76F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
            </div>
            
            <h2 className="text-xl font-bold mb-2 text-center text-[var(--text-color)]">{t('requestApproved')}</h2>
            <p className="text-gray-500 text-sm mb-8 text-center leading-relaxed px-4">
              {t('congratsApproved')}
            </p>
            
            <button 
              onClick={() => onNavigate('IB_Dashboard')}
              className="inline-flex items-center gap-2 bg-[#3B82F6] text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#2563EB] transition-all duration-300 w-full justify-center shadow-lg shadow-blue-500/20"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V7C20 7.55228 19.5523 8 19 8H5C4.44772 8 4 7.55228 4 7V5Z" stroke="white" strokeWidth="1.5"></path>
                <path d="M4 13C4 12.4477 4.44772 12 5 12H11C11.5523 12 12 12.4477 12 13V19C12 19.5523 11.5523 20 11 20H5C4.44772 20 4 19.5523 4 19V13Z" stroke="white" stroke-width="1.5"></path>
                <path d="M16 13C16 12.4477 16.4477 12 17 12H19C19.5523 12 20 12.4477 20 13V19C20 19.5523 19.5523 20 19 20H17C16.4477 20 16 19.5523 16 19V13Z" stroke="white" stroke-width="1.5"></path>
              </svg>
              {t('exploreIBDashboard')}
            </button>
          </div>
        </div>
      </div>

      {/* ─── Desktop View (lg:flex) ─── */}
      <div className="hidden lg:flex flex-col w-full pb-20">
        {/* ── Top Header ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)] mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-[22px] font-extrabold text-[var(--text-color)] tracking-tight">{t('ibRequest')}</h1>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#AF6C56] animate-pulse" />
              <span className="bg-[#158B86] text-white text-sm font-medium px-2 rounded-sm">{t('news')}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-3 bg-[var(--sub-bg)] px-4 py-2 rounded-[6px] border border-[var(--border-color)] text-[13px] text-[var(--text-color)]">
              <span className="text-[#8e9d9b]">{t('myReferral')}</span>
              <span className="font-bold tracking-wider">{referralLink}</span>
              <button onClick={handleCopy} className="hover:text-[#158B86] transition-colors"><Copy size={14} /></button>
            </div>

            <div className="bg-[var(--sub-bg)] border border-[var(--border-color)] p-1.5 rounded-full flex items-center h-[38px]">
              <button onClick={() => setDashboardType('User')} className={`px-4 py-1.5 rounded-full text-[13px] transition-colors ${dashboardType === 'User' ? 'bg-[#158B86] text-white font-semibold' : 'text-[#8e9d9b] hover:text-[var(--text-color)]'}`}>{t('userDashboard')}</button>
              <button onClick={() => setDashboardType('IB')}   className={`px-4 py-1.5 rounded-full text-[13px] transition-colors ${dashboardType === 'IB'   ? 'bg-[#158B86] text-white font-semibold' : 'text-[#8e9d9b] hover:text-[var(--text-color)]'}`}>{t('ibDashboard')}</button>
            </div>
          </div>
        </div>

        {/* ── Breadcrumb ── */}
        <div className="flex items-center gap-2 text-[15px] mb-7 font-medium">
          <Home size={17} className="text-[#158B86] cursor-pointer hover:opacity-80 transition-colors" strokeWidth={2.5} onClick={() => onNavigate('Dashboard')} />
          <ChevronRight size={15} className="text-gray-500" strokeWidth={2} />
          <span className="text-[var(--text-color)]">{t('ibRequest')}</span>
        </div>

        {/* ── Approval State Content ── */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#38A169] rounded-full blur-[150px] opacity-[0.03] pointer-events-none" />

          <div className="w-full max-w-[500px] flex flex-col items-center animate-scale-in">
            <div className="relative mb-10">
              <div className="absolute inset-0 bg-[#38A169] rounded-full blur-[40px] opacity-20 animate-pulse" />
              <div className="w-24 h-24 rounded-full border-[3px] border-[#38A169] flex items-center justify-center bg-[var(--bg-color)] relative z-10">
                  <CheckCircle2 size={56} className="text-[#38A169]" />
              </div>
            </div>

            <h2 className="text-[32px] font-extrabold text-[var(--text-color)] mb-4 tracking-tight">{t('requestApproved')}</h2>
            <div className="text-[#8e9d9b] text-[16px] text-center max-w-[400px] leading-relaxed mb-10">
              {t('congratsApproved')}
            </div>

            <button 
              onClick={() => onNavigate('IB_Dashboard')}
              className="flex items-center gap-3 px-10 py-3.5 rounded-[8px] bg-[#158B86] hover:bg-[#117672] text-white text-[15px] font-bold transition-all shadow-[0_10px_25px_rgba(21,139,134,0.3)] hover:-translate-y-1 active:translate-y-0"
            >
              <LayoutDashboard size={20} />
              {t('exploreIBDashboard')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IBRequestPage;
