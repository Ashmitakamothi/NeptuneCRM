import React, { useMemo, useState } from 'react';
import { useRealtimeJson } from '../hooks/useRealtimeJson';
import { endpoints } from '../api/endpoints';

const AccountsTable = ({ data: dataProp }) => {
  const [accountType, setAccountType] = useState('Live');
  const { data: dataRemote } = useRealtimeJson(endpoints.accounts, { enabled: Boolean(!dataProp && endpoints.accounts) });
  const data = dataProp ?? dataRemote;
  const accountsRaw = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : null;
  const accounts = useMemo(() => {
    const list = accountsRaw || [];
    const t = accountType.toLowerCase();
    
    return list.filter((a) => {
      // Prioritize the boolean flags from the live API
      if (typeof a.isLive === 'boolean' && typeof a.isDemo === 'boolean') {
        return t === 'live' ? a.isLive : a.isDemo;
      }
      
      // Fallback to string based type checking
      const typeStr = (a.type || a.accountType || a.acType || '').toString().toLowerCase();
      if (!typeStr) return true;
      return t === 'live' ? typeStr.includes('live') : typeStr.includes('demo');
    });
  }, [accountsRaw, accountType]);

  return (
    <div className="bg-white rounded-[20px] border border-[#E2E2E4] shadow-[0_4px_6px_rgba(207,207,207,0.10)] overflow-hidden h-[325px] flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 pt-4 pb-3">
        <h2 className="text-[16px] font-extrabold text-[#122D32]">Accounts</h2>
        <div className="bg-[#F4F5F7] p-1 rounded-full border border-[#E2E2E4] flex gap-1 items-center h-[32px] w-full sm:w-auto">
          <button 
            onClick={() => setAccountType('Live')}
            className={`flex-1 sm:flex-none text-[11px] px-4 h-full rounded-full font-semibold transition-all ${accountType === 'Live' ? 'bg-[#4C5E62] text-white shadow-sm' : 'text-[#122D32] opacity-80 hover:opacity-100'}`}
          >
            Live Account
          </button>
          <button 
            onClick={() => setAccountType('Demo')}
            className={`flex-1 sm:flex-none text-[11px] px-4 h-full rounded-full font-semibold transition-all ${accountType === 'Demo' ? 'bg-[#4C5E62] text-white shadow-sm' : 'text-[#122D32] opacity-80 hover:opacity-100'}`}
          >
            Demo Account
          </button>
        </div>
      </div>

      <div className="px-5 pb-4 flex-1 min-h-0">
        <div className="h-full rounded-[16px] border border-[#E2E2E4] overflow-hidden bg-white">
          <div className="overflow-x-auto h-full">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="bg-[#E6E6E6]">
                  <th className="py-3 px-2 md:px-4 text-left text-[11px] md:text-[12px] font-bold text-[#122D32]">Account No</th>
                  <th className="py-3 px-2 md:px-4 text-left text-[11px] md:text-[12px] font-bold text-[#122D32]">A/C Type</th>
                  <th className="py-3 px-2 md:px-4 text-left text-[11px] md:text-[12px] font-bold text-[#122D32]">Balance</th>
                  <th className="py-3 px-2 md:px-4 text-left text-[11px] md:text-[12px] font-bold text-[#122D32]">Leverage</th>
                  <th className="py-3 px-2 md:px-4 text-left text-[11px] md:text-[12px] font-bold text-[#122D32]">Created At</th>
                </tr>
              </thead>
              <tbody>
                {accounts.length > 0 ? (
                  accounts.map((a, idx) => (
                    <tr key={a.id ?? idx} className="border-b border-[#E2E2E4] last:border-0">
                      <td className="py-3.5 px-2 md:px-4 text-[11px] md:text-[12px] font-medium text-[#122D32]/80">
                        {a.accountNo ?? a.account_no ?? a.login ?? '—'}
                      </td>
                      <td className="py-3.5 px-2 md:px-4 text-[11px] md:text-[12px] font-medium text-[#122D32]/80">
                        {a.acType ?? a.type ?? a.accountType ?? '—'}
                      </td>
                      <td className="py-3.5 px-2 md:px-4 text-[11px] md:text-[12px] font-medium text-[#122D32]/80">
                        {typeof a.balance === 'number' ? `$ ${a.balance.toLocaleString()}` : (a.balance ?? '—')}
                      </td>
                      <td className="py-3.5 px-2 md:px-4 text-[11px] md:text-[12px] font-medium text-[#122D32]/80">
                        {a.leverage ?? '—'}
                      </td>
                      <td className="py-3.5 px-2 md:px-4 text-[11px] md:text-[12px] font-medium text-[#122D32]/80">
                        {a.createdDate ? (() => {
                          const date = new Date(a.createdDate);
                          const day = String(date.getDate()).padStart(2, '0');
                          const month = String(date.getMonth() + 1).padStart(2, '0');
                          const year = date.getFullYear();
                          let hours = date.getHours();
                          const minutes = String(date.getMinutes()).padStart(2, '0');
                          const ampm = hours >= 12 ? 'PM' : 'AM';
                          hours = hours % 12;
                          hours = hours ? hours : 12; // the hour '0' should be '12'
                          return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
                        })() : (a.createdAt ?? '—')}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-10 text-center text-[#B2BEBB] text-[12px]">No {accountType} accounts found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsTable;
