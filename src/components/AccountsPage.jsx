import React, { useState } from 'react';
import AccountsTable from './AccountsTable';
import { Home, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useRealtimeJson } from '../hooks/useRealtimeJson';
import { endpoints } from '../api/endpoints';
import DashboardHeader from './DashboardHeader';

const TRANSLATIONS = {
  EN: {
    accounts: "Accounts",
    news: "News",
    userDashboard: "User Dashboard",
    ibDashboard: "IB Dashboard",
    liveAccount: "Live Account",
    demoAccount: "Demo Account",
    pending: "Pending",
    approved: "Approved",
    declined: "Declined",
    openLiveAccount: "Open Live Account",
    openDemoAccount: "Open Demo Account",
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
    openDemoAccount: "डेमो अकाउंट खोलें",
    breadcrumb: "अकाउंट्स"
  }
};

const AccountsPage = ({ onNavigate }) => {
  const [accountType, setAccountType] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const filter = params.get('filter');
    if (filter === 'demo') return 'Demo';
    return 'Live';
  });
  const [statusFilter, setStatusFilter] = useState('Approved');
  const { language } = useLanguage();

  // Reset status filter to Approved when switching between Live/Demo
  React.useEffect(() => {
    setStatusFilter('Approved');
  }, [accountType]);

  // Update URL search params when accountType changes
  React.useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('filter', accountType.toLowerCase());
    window.history.replaceState({ page: 'Accounts' }, '', url.toString());
  }, [accountType]);

  // Call the live APIs as requested by user
  useRealtimeJson(endpoints.accountTypes, { enabled: Boolean(endpoints.accountTypes) });
  useRealtimeJson(endpoints.accountTutorials, { enabled: Boolean(endpoints.accountTutorials) });

  const t = (key) => TRANSLATIONS[language]?.[key] || key;

  return (
    <div className="animate-fade-in flex flex-col h-full pb-20">
      {/* ── Mobile Header (lg:hidden) ── */}
      <div className="flex lg:hidden items-center gap-3 py-4 border-b border-[var(--border-color)] mb-6 -mx-4 px-4 bg-[var(--bg-color)] sticky top-0 z-[100]">
        <button onClick={() => onNavigate('Dashboard')} className="p-1 -ml-1 transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <h1 className="text-[20px] font-bold text-[#3B82F6]">Accounts</h1>
      </div>

      <div className="hidden lg:block">
        <DashboardHeader 
          title={t('accounts')}
          breadcrumbs={[{ title: t('breadcrumb'), active: true }]}
          onNavigate={onNavigate}
          activeTab="User Dashboard"
          showMobileBack={false}
        />
      </div>


      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
         
         {/* ── Mobile Segmented Controls (lg:hidden) ── */}
         <div className="lg:hidden flex flex-col gap-5 mb-6">
            <div className="flex flex-col gap-3">
              <div className="bg-[#1a1a1e] p-1 rounded-xl flex items-center w-full">
                <button 
                  onClick={() => setAccountType('Live')}
                  className={`flex-1 py-2.5 rounded-lg text-[14px] font-bold transition-all ${accountType === 'Live' ? 'bg-[#3B82F6] text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                >
                  {t('liveAccount')}
                </button>
                <button 
                  onClick={() => setAccountType('Demo')}
                  className={`flex-1 py-2.5 rounded-lg text-[14px] font-bold transition-all ${accountType === 'Demo' ? 'bg-[#3B82F6] text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                >
                  {t('demoAccount')}
                </button>
              </div>

              {accountType === 'Live' && (
                <div className="bg-[#1a1a1e] p-1 rounded-xl flex items-center w-full">
                  {['Pending', 'Approved', 'Declined'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`flex-1 py-2.5 rounded-lg text-[14px] font-bold transition-all ${
                        statusFilter === status 
                          ? 'bg-[#3B82F6] text-white shadow-lg' 
                          : 'text-white/40 hover:text-white'
                      }`}
                    >
                      {t(status.toLowerCase())}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-8 py-3.5 rounded-xl text-[14px] font-bold shadow-lg shadow-blue-500/20 transition-all"
              onClick={() => onNavigate('Account_Types', { isDemo: accountType === 'Demo' })}
            >
              {accountType === 'Live' ? t('openLiveAccount') : t('openDemoAccount')}
            </button>
         </div>

         {/* ── Desktop Tab Row (hidden lg:flex) ── */}
         <div className="hidden lg:flex flex-row items-center justify-between gap-5 mb-6">
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-1.5 rounded-[10px] flex items-center gap-1">
               <button 
                 onClick={() => setAccountType('Live')}
                 className={`px-6 py-2 rounded-[8px] text-[14px] font-bold transition-all ${accountType === 'Live' ? 'bg-[#158B86] text-white shadow-md' : 'text-[var(--text-color)] hover:opacity-80'}`}
               >{t('liveAccount')}</button>
               <button 
                 onClick={() => setAccountType('Demo')}
                 className={`px-6 py-2 rounded-[8px] text-[14px] font-bold transition-all ${accountType === 'Demo' ? 'bg-[#158B86] text-white shadow-md' : 'text-[var(--text-color)] hover:opacity-80'}`}
               >{t('demoAccount')}</button>
            </div>

            <div className="flex items-center gap-3">
               {accountType === 'Live' && (
                 <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-1.5 rounded-[10px] flex items-center gap-1">
                   {['Pending', 'Approved', 'Declined'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-5 py-2 rounded-[8px] text-[13px] font-bold transition-all ${
                           statusFilter === status 
                           ? 'bg-[#158B86] text-white shadow-md' 
                           : 'text-[var(--text-color)] hover:opacity-80'
                        }`}
                      >
                        {t(status.toLowerCase())}
                      </button>
                   ))}
                 </div>
               )}

               <button
                 className="bg-[#158B86] hover:bg-[#117672] text-white px-6 py-2.5 rounded-[8px] text-[14px] font-bold shadow-md transition-all whitespace-nowrap"
                 onClick={() => onNavigate('Account_Types', { isDemo: accountType === 'Demo' })}
               >
                  {accountType === 'Live' ? t('openLiveAccount') : t('openDemoAccount')}
               </button>
            </div>
         </div>

         {/* Table Container */}
         <div className="flex-1 min-h-0">
            <AccountsTable 
               hideHeader={true} 
               externalAccountType={accountType} 
               statusFilter={statusFilter}
               onNavigate={onNavigate}
            />
         </div>
      </div>
    </div>
  );
};

export default AccountsPage;
