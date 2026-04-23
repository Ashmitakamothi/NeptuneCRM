import React from 'react';

const TransactionsList = () => {
  const transactions = [
    { from: 'Telcopay', to: 'Wallet', amount: '$ 100' },
    { from: 'Telcopay', to: 'Wallet', amount: '$ 100' },
    { from: 'Campaign Reward: deposit test offer', to: 'Wallet', amount: '$ 100' },
  ];

  return (
    <div className="bg-white rounded-[20px] border border-[#E2E2E4] shadow-[0_10px_25px_rgba(18,45,50,0.12)] flex flex-col overflow-hidden flex-1 min-h-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 pt-4 pb-3">
        <h2 className="text-[16px] font-extrabold text-[#122D32]">Recent Transactions</h2>
        <div className="bg-[#F4F5F7] p-1 rounded-full border border-[#E2E2E4] flex gap-1 items-center h-[32px] w-full sm:w-auto">
          <button className="flex-1 sm:flex-none text-[11px] px-4 h-full rounded-full bg-[#4C5E62] text-white font-semibold">
            Deposit
          </button>
          <button className="flex-1 sm:flex-none text-[11px] px-4 h-full rounded-full text-[#122D32] font-semibold opacity-80 hover:opacity-100 transition-opacity">
            Withdraw
          </button>
        </div>
      </div>

      <div className="px-6 pb-5 flex-1 min-h-0">
        <div className="h-full rounded-[16px] border border-[#E2E2E4] overflow-hidden bg-white">
          <div className="overflow-x-auto h-full">
            <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="bg-[#E6E6E6]">
                <th className="py-3 px-2 md:px-4 text-left text-[11px] md:text-[12px] font-bold text-[#122D32]">Payment From</th>
                <th className="py-3 px-2 md:px-4 text-left text-[11px] md:text-[12px] font-bold text-[#122D32]">Payment To</th>
                <th className="py-3 px-2 md:px-4 text-right text-[11px] md:text-[12px] font-bold text-[#122D32]">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={i} className="border-b border-[#E2E2E4] last:border-0">
                  <td className="py-3.5 px-2 md:px-4 text-[11px] md:text-[12px] font-medium text-[#122D32]/80">{t.from}</td>
                  <td className="py-3.5 px-2 md:px-4 text-[11px] md:text-[12px] font-medium text-[#122D32]/80">{t.to}</td>
                  <td className="py-3.5 px-2 md:px-4 text-[11px] md:text-[12px] font-extrabold text-[#122D32] text-right">{t.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsList;
