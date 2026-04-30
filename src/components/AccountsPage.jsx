import React, { useState } from 'react';
import AccountsTable from './AccountsTable';
import { Home, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useRealtimeJson } from '../hooks/useRealtimeJson';
import { endpoints } from '../api/endpoints';
import DashboardHeader from './DashboardHeader';

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
    <div className="animate-fade-in flex flex-col h-full">
      <DashboardHeader 
        title={t('accounts')}
        breadcrumbs={[{ title: t('breadcrumb'), active: true }]}
        onNavigate={onNavigate}
        activeTab="User Dashboard"
      />


      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
         
         {/* Tab Controls Row */}
         <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 mb-6">
            {/* Left: Live / Demo */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-1.5 rounded-[10px] flex items-center w-full xl:w-auto overflow-x-auto hide-scrollbar">
               <button 
                 onClick={() => setAccountType('Live')}
                 className={`whitespace-nowrap px-6 py-2 rounded-[8px] text-[14px] font-bold transition-all flex-shrink-0 ${accountType === 'Live' ? 'bg-[#158B86] text-white shadow-[0_2px_8px_rgba(21,139,134,0.3)]' : 'bg-transparent text-[var(--text-color)] hover:opacity-80'}`}
               >{t('liveAccount')}</button>
               <button 
                 onClick={() => setAccountType('Demo')}
                 className={`whitespace-nowrap px-6 py-2 rounded-[8px] text-[14px] font-bold transition-all flex-shrink-0 ${accountType === 'Demo' ? 'bg-[#158B86] text-white shadow-[0_2px_8px_rgba(21,139,134,0.3)]' : 'bg-transparent text-[var(--text-color)] hover:opacity-80'}`}
               >{t('demoAccount')}</button>
            </div>


            {/* Right: Status Filters & Action Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full xl:w-auto">
               {accountType === 'Live' && (
                 <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-1.5 rounded-[10px] flex items-center gap-1 overflow-x-auto w-full sm:w-auto hide-scrollbar">
                   {['Pending', 'Approved', 'Declined'].map((status) => {
                      const statusKey = status.toLowerCase();
                      return (
                        <button
                          key={status}
                          onClick={() => setStatusFilter(status)}
                          className={`whitespace-nowrap flex-shrink-0 px-5 py-2 rounded-[8px] text-[13px] font-bold transition-all ${
                             statusFilter === status 
                             ? 'bg-[#158B86] text-white shadow-[0_2px_8px_rgba(21,139,134,0.3)]' 
                             : 'bg-transparent text-[var(--text-color)] hover:opacity-80'
                          }`}
                        >
                          {t(statusKey)}
                        </button>
                      );
                   })}
                 </div>
               )}

               
               <button
                 className="bg-[#158B86] hover:bg-[#117672] text-white px-6 py-2.5 rounded-[8px] text-[14px] font-bold shadow-[0_4px_10px_rgba(21,139,134,0.3)] transition-all whitespace-nowrap w-full sm:w-auto"
                 onClick={() => onNavigate('Account_Types', { isDemo: accountType === 'Demo' })}
               >
                  {accountType === 'Live' ? t('openLiveAccount') : t('openDemoAccount')}
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
               onNavigate={onNavigate}
            />
         </div>
      </div>
    </div>
  );
};

export default AccountsPage;
