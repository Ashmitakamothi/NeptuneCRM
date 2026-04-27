import React, { useMemo, useState } from 'react';
import { useRealtimeJson } from '../hooks/useRealtimeJson';
import { endpoints } from '../api/endpoints';
import { useLanguage } from '../contexts/LanguageContext';

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

const AccountsTable = ({ data: dataProp, hideHeader = false, externalAccountType = null, statusFilter = 'All', isDashboard = false }) => {
  const [internalAccountType, setInternalAccountType] = useState('Live');
  const accountType = externalAccountType || internalAccountType;
  const { language } = useLanguage();
  const { data: dataRemote } = useRealtimeJson(endpoints.accounts, { enabled: Boolean(!dataProp && endpoints.accounts) });
  const data = dataProp ?? dataRemote;
  const accountsRaw = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : null;
  const accounts = useMemo(() => {
    const list = accountsRaw || [];
    const t = accountType.toLowerCase();
    
    return list.filter((a) => {
      // 1. Live/Demo Filter
      let typeMatch = false;
      if (typeof a.isLive === 'boolean' && typeof a.isDemo === 'boolean') {
        typeMatch = t === 'live' ? a.isLive : a.isDemo;
      } else {
        const typeStr = (a.type || a.accountType || a.acType || '').toString().toLowerCase();
        typeMatch = !typeStr ? true : (t === 'live' ? typeStr.includes('live') : typeStr.includes('demo'));
      }
      if (!typeMatch) return false;

      // 2. Status Filter
      if (statusFilter && statusFilter !== 'All') {
        const s = (a.status || 'APPROVED').toUpperCase();
        if (s !== statusFilter.toUpperCase()) return false;
      }
      return true;
    });
  }, [accountsRaw, accountType, statusFilter]);

  const t = (key) => TRANSLATIONS[language]?.[key] || key;

  return (
    <div className="rounded-[16px] border border-[var(--border-color)] overflow-hidden flex flex-col h-full min-h-[325px] bg-transparent">
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
            <tr className="bg-[var(--card-bg)] border-b border-[var(--border-color)]">
              <th className="py-3 px-1 md:px-2 text-left text-[12px] md:text-[13px] font-bold text-[var(--text-color)]">{t('login')}</th>
              <th className="py-3 px-1 md:px-2 text-left text-[12px] md:text-[13px] font-bold text-[var(--text-color)] border-l border-[var(--border-color)]">{t('platform')}</th>
              <th className="py-3 px-1 md:px-2 text-left text-[12px] md:text-[13px] font-bold text-[var(--text-color)] border-l border-[var(--border-color)]">{t('acType')}</th>
              <th className="py-3 px-1 md:px-2 text-left text-[12px] md:text-[13px] font-bold text-[var(--text-color)] border-l border-[var(--border-color)]">{t('balance')}</th>
              <th className="py-3 px-1 md:px-2 text-left text-[12px] md:text-[13px] font-bold text-[var(--text-color)] border-l border-[var(--border-color)]">{t('leverage')}</th>
              <th className="py-3 px-1 md:px-2 text-left text-[12px] md:text-[13px] font-bold text-[var(--text-color)] border-l border-[var(--border-color)]">{t('currency')}</th>
              <th className="py-3 px-1 md:px-2 text-left text-[12px] md:text-[13px] font-bold text-[var(--text-color)] border-l border-[var(--border-color)]">{t('createdAt')}</th>
              {!isDashboard && (
                <>
                  <th className="py-3 px-1 md:px-2 text-left text-[12px] md:text-[13px] font-bold text-[var(--text-color)] border-l border-[var(--border-color)]">{t('status')}</th>
                  <th className="py-3 px-1 md:px-2 text-left text-[12px] md:text-[13px] font-bold text-[var(--text-color)] border-l border-[var(--border-color)]">{t('actions')}</th>
                </>
              )}
            </tr>
          </thead>

          <tbody>
            {accounts.length > 0 ? (
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
                    {typeof a.balance === 'number' ? `$ ${a.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : (a.balance ?? '—')}
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
                            return <span className="text-[#00BFA5]">APPROVED</span>;
                          } else if (status === 'PENDING') {
                            return <span className="text-[#F5A623]">PENDING</span>;
                          } else {
                            return <span className="text-[#D0021B]">{status}</span>;
                          }
                        })()}
                      </td>
                      <td className="py-3.5 px-2 md:px-4 text-[13px] md:text-[14px] font-medium text-[var(--text-color)]">
                        <div className="flex items-center gap-3">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 hover:opacity-100 cursor-pointer"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 hover:opacity-100 cursor-pointer"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={isDashboard ? 7 : 9} className="py-[60px] text-center">
                   <div className="flex flex-col items-center justify-center text-[var(--text-color)] opacity-60">

                     <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-3 opacity-60">
                       <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                       <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                     </svg>
                     <span className="text-[14px] font-medium">{t('noRecord')}</span>
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
