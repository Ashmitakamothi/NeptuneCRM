import React, { useState } from 'react';

const AccountsTable = () => {
  const [accountType, setAccountType] = useState('Live');

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
                <tr className="border-b border-[#E2E2E4] last:border-0">
                  <td className="py-3.5 px-2 md:px-4 text-[11px] md:text-[12px] font-medium text-[#122D32]/80">555166</td>
                  <td className="py-3.5 px-2 md:px-4 text-[11px] md:text-[12px] font-medium text-[#122D32]/80">Gold</td>
                  <td className="py-3.5 px-2 md:px-4 text-[11px] md:text-[12px] font-medium text-[#122D32]/80">$0</td>
                  <td className="py-3.5 px-2 md:px-4 text-[11px] md:text-[12px] font-medium text-[#122D32]/80">50</td>
                  <td className="py-3.5 px-2 md:px-4 text-[11px] md:text-[12px] font-medium text-[#122D32]/80">25-03-2026 6:21 PM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsTable;
