import React, { useMemo, useState } from 'react';
import { useRealtimeJson } from '../hooks/useRealtimeJson';
import { endpoints } from '../api/endpoints';
import { useLanguage } from '../contexts/LanguageContext';
import { useDashboardSocket } from '../hooks/useDashboardSocket';
import { useSocket } from '../contexts/SocketContext';

const TRANSLATIONS = {
  EN: {
    login: "Login",
    platform: "Platform",
    acType: "A/C Type",
    balance: "Balance",
    leverage: "Leverage",
    currency: "Currency",
    createdAt: "Created At",
    status: "Status",
    actions: "Actions",
    noRecord: "No Record Found",
    liveAccount: "Live Account",
    demoAccount: "Demo Account",
    accounts: "Accounts"
  },
  HI: {
    login: "लॉगिन",
    platform: "प्लेटफार्म",
    acType: "ए/सी प्रकार",
    balance: "बैलेंस",
    leverage: "लेवरेज",
    currency: "मुद्रा",
    createdAt: "बनने की तिथि",
    status: "स्थिति",
    actions: "एक्शन",
    noRecord: "कोई रिकॉर्ड नहीं मिला",
    liveAccount: "लाइव अकाउंट",
    demoAccount: "डेमो अकाउंट",
    accounts: "अकाउंट्स"
  }
};

const AccountsTable = ({ data: dataProp, hideHeader = false, externalAccountType = null, statusFilter = 'All', isDashboard = false, onNavigate }) => {
  const [internalAccountType, setInternalAccountType] = useState('Live');
  const accountType = externalAccountType || internalAccountType;
  const { language } = useLanguage();

  const dynamicAccountsEndpoint = useMemo(() => {
    if (!endpoints.accounts) return null;
    let url = endpoints.accounts;
    
    // Toggle between true/false for Live/Demo
    if (accountType === 'Demo') {
      url = url.replace('/true?', '/false?');
    } else {
      url = url.replace('/false?', '/true?');
    }

    if (statusFilter === 'Pending') {
      return url.replace('FilterText=approved', 'FilterText=pending');
    } else if (statusFilter === 'Declined') {
      return url.replace('FilterText=approved', 'FilterText=rejected');
    }
    return url;
  }, [accountType, statusFilter]);

  const { data: dataRemote, loading } = useRealtimeJson(dynamicAccountsEndpoint, { enabled: Boolean(!dataProp && dynamicAccountsEndpoint) });
  const data = dataProp ?? dataRemote;
  const accountsRaw = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : null;

  // Real-time socket data from global context
  const { socketData, loginId: socketLoginId } = useSocket();
  const accounts = useMemo(() => {
    const list = accountsRaw || [];
    const t = accountType.toLowerCase();
    
    return list.filter((a) => {
      // 1. Live/Demo Filter
      let typeMatch = true;
      if (typeof a.isLive === 'boolean') {
        typeMatch = t === 'live' ? a.isLive : !a.isLive;
      } else if (typeof a.isDemo === 'boolean') {
        typeMatch = t === 'live' ? !a.isDemo : a.isDemo;
      } else {
        const typeStr = (a.type || a.accountType || a.acType || '').toString().toLowerCase();
        if (typeStr) {
          typeMatch = t === 'live' ? typeStr.includes('live') : typeStr.includes('demo');
        }
      }
      if (!typeMatch) return false;

      // 2. Status Filter
      if (statusFilter && statusFilter !== 'All') {
        // If the API response doesn't have a status field, we assume it's valid
        // because we called a status-specific endpoint (e.g., FilterText=approved)
        if (a.status) {
          const s = a.status.toUpperCase();
          if (s !== statusFilter.toUpperCase()) return false;
        }
      }
      return true;
    });
  }, [accountsRaw, accountType, statusFilter]);

  const t = (key) => TRANSLATIONS[language]?.[key] || key;

  return (
    <div className="rounded-[16px] border border-[var(--border-color)] overflow-x-auto flex flex-col h-full min-h-[325px] bg-transparent">
      {!hideHeader && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 pt-4 pb-4">
          <h2 className="text-[16px] font-extrabold text-[var(--text-color)]">{t('accounts')}</h2>
          <div className="bg-[var(--sub-bg)] p-1 rounded-full border border-[var(--border-color)] flex gap-1 items-center h-[32px] w-full sm:w-auto">


            <button 
              onClick={() => setInternalAccountType('Live')}
              className={`flex-1 sm:flex-none text-[11px] px-4 h-full rounded-full font-semibold transition-all ${accountType === 'Live' ? 'bg-[#00BFA5] text-white shadow-sm' : 'text-[#8e9d9b] hover:text-white'}`}
            >
              {t('liveAccount')}
            </button>
            <button 
              onClick={() => setInternalAccountType('Demo')}
              className={`flex-1 sm:flex-none text-[11px] px-4 h-full rounded-full font-semibold transition-all ${accountType === 'Demo' ? 'bg-[#00BFA5] text-white shadow-sm' : 'text-[#8e9d9b] hover:text-white'}`}
            >
              {t('demoAccount')}
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-x-auto min-h-0 custom-scrollbar">
        <table className="w-full whitespace-nowrap min-w-[800px]">
          <thead>
            <tr className="bg-[#1a1a1e] border-b border-white/5">
              <th className="py-4 px-4 text-left text-[14px] font-bold text-white uppercase tracking-wider">{t('login')}</th>
              <th className="py-4 px-4 text-left text-[14px] font-bold text-white uppercase tracking-wider border-l border-white/5">{t('platform')}</th>
              <th className="py-4 px-4 text-left text-[14px] font-bold text-white uppercase tracking-wider border-l border-white/5">{t('acType')}</th>
              <th className="py-4 px-4 text-left text-[14px] font-bold text-white uppercase tracking-wider border-l border-white/5">{t('balance')}</th>
              <th className="py-4 px-4 text-left text-[14px] font-bold text-white uppercase tracking-wider border-l border-white/5">{t('leverage')}</th>
              <th className="py-4 px-4 text-left text-[14px] font-bold text-white uppercase tracking-wider border-l border-white/5">{t('currency')}</th>
              <th className="py-4 px-4 text-left text-[14px] font-bold text-white uppercase tracking-wider border-l border-white/5">{t('createdAt')}</th>
              {!isDashboard && (
                <>
                  <th className="py-4 px-4 text-left text-[14px] font-bold text-white uppercase tracking-wider border-l border-white/5">{t('status')}</th>
                  <th className="py-4 px-4 text-left text-[14px] font-bold text-white uppercase tracking-wider border-l border-white/5">{t('actions')}</th>
                </>
              )}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              // Skeleton Loader Rows
              [...Array(5)].map((_, i) => (
                <tr key={`skeleton-${i}`} className="border-b border-[var(--border-color)] animate-pulse">
                  {[...Array(isDashboard ? 7 : 9)].map((_, j) => (
                    <td key={`cell-${j}`} className="py-4 px-1 md:px-2">
                      <div className="h-7 bg-[var(--border-color)] opacity-20 rounded-[8px] w-full"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : accounts.length > 0 ? (
              accounts.map((a, idx) => (
                <tr key={a.id ?? idx} className="border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--sub-bg)] transition-colors">
                  <td className="py-3.5 px-1 md:px-2 text-[12px] md:text-[13px] font-medium text-[var(--text-color)]">
                    {a.accountNo ?? a.account_no ?? a.login ?? '—'}
                  </td>
                  <td className="py-3.5 px-1 md:px-2 text-[12px] md:text-[13px] font-medium text-[var(--text-color)]">
                    MT5
                  </td>
                  <td className="py-3.5 px-1 md:px-2 text-[12px] md:text-[13px] font-medium text-[var(--text-color)]">
                    {a.acType ?? a.type ?? a.accountType ?? '—'}
                  </td>
                  <td className="py-3.5 px-1 md:px-2 text-[12px] md:text-[13px] font-medium text-[var(--text-color)]">
                    {(() => {
                      const currentLogin = a.accountNo ?? a.account_no ?? a.login;
                      // Use socket data if it matches current row's account
                      const balance = (currentLogin && String(currentLogin) === String(socketLoginId) && socketData?.balance) 
                        ? socketData.balance 
                        : a.balance;
                        
                      return typeof balance === 'number' 
                        ? `$ ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
                        : (balance ?? '—');
                    })()}
                  </td>
                  <td className="py-3.5 px-1 md:px-2 text-[12px] md:text-[13px] font-medium text-[var(--text-color)]">
                    {a.leverage ?? '—'}
                  </td>
                  <td className="py-3.5 px-1 md:px-2 text-[12px] md:text-[13px] font-medium text-[var(--text-color)]">
                    USD
                  </td>
                  <td className="py-3.5 px-1 md:px-2 text-[12px] md:text-[13px] font-medium text-[var(--text-color)]">
                    {a.createdDate ? (() => {
                      const date = new Date(a.createdDate);
                      const day = String(date.getDate()).padStart(2, '0');
                      const month = String(date.getMonth() + 1).padStart(2, '0');
                      const year = date.getFullYear();
                      return `${day}-${month}-${year}`;
                    })() : (a.createdAt ?? '—')}
                  </td>

                  {!isDashboard && (
                    <>
                      <td className="py-3.5 px-1 md:px-2 text-[12px] md:text-[13px]">
                        {(() => {
                          const status = (a.status || 'APPROVED').toUpperCase();
                          if (status === 'APPROVED') {
                            return <span className="px-3 py-1 rounded-full bg-[#D9F7E8] text-[#00B69B] text-[10px] font-bold tracking-wider">APPROVED</span>;
                          } else if (status === 'PENDING') {
                            return <span className="px-3 py-1 rounded-full bg-[#FFF4E5] text-[#FF9800] text-[10px] font-bold tracking-wider">PENDING</span>;
                          } else {
                            return <span className="px-3 py-1 rounded-full bg-[#FEE2E2] text-[#EF4444] text-[10px] font-bold tracking-wider">{status}</span>;
                          }
                        })()}
                      </td>
                      <td className="py-3.5 px-2 md:px-4 text-[13px] md:text-[14px] font-medium text-[var(--text-color)]">
                        <div className="flex items-center gap-3">
                          <div className="ant-dropdown-trigger cursor-pointer">
                            <button className="bg-transparent border-none p-0 flex items-center justify-center">
                              <div>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 hover:opacity-100 transition-opacity">
                                  <circle cx="12" cy="12" r="3"></circle>
                                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                </svg>
                              </div>
                            </button>
                          </div>
                          <div className="ant-dropdown-trigger cursor-pointer" onClick={() => onNavigate && onNavigate('Account_Details', a)}>
                            <button className="bg-transparent border-none p-0 flex items-center justify-center">
                              <div>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 hover:opacity-100 transition-opacity">
                                  <line x1="4" y1="21" x2="4" y2="14"></line>
                                  <line x1="4" y1="10" x2="4" y2="3"></line>
                                  <line x1="12" y1="21" x2="12" y2="12"></line>
                                  <line x1="12" y1="8" x2="12" y2="3"></line>
                                  <line x1="20" y1="21" x2="20" y2="16"></line>
                                  <line x1="20" y1="12" x2="20" y2="3"></line>
                                  <line x1="1" y1="14" x2="7" y2="14"></line>
                                  <line x1="9" y1="8" x2="15" y2="8"></line>
                                  <line x1="17" y1="16" x2="23" y2="16"></line>
                                </svg>
                              </div>
                            </button>
                          </div>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={isDashboard ? 7 : 9} className="py-20 px-4 text-center">
                   <div className="flex flex-col items-center justify-center p-8 bg-[#1a1a1e] border border-white/5 rounded-2xl w-full">
                     <div className="w-20 h-20 mb-6 flex items-center justify-center bg-blue-500/10 rounded-full">
                       <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                         <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                         <line x1="3" y1="9" x2="21" y2="9" />
                         <line x1="9" y1="21" x2="9" y2="9" />
                       </svg>
                     </div>
                     <h2 className="text-[18px] font-bold text-white mb-2">No Accounts Found</h2>
                     <p className="text-white/40 text-[14px]">There are no accounts to display</p>
                   </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountsTable;
