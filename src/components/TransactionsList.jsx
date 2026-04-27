import React, { useState } from 'react';
import { useRealtimeJson } from '../hooks/useRealtimeJson';
import { endpoints } from '../api/endpoints';
import { useLanguage } from '../contexts/LanguageContext';

const TRANSLATIONS = {
  EN: {
    title: "Recent Transactions",
    deposit: "Deposit",
    withdraw: "Withdraw",
    paymentFrom: "Payment From",
    paymentTo: "Payment To",
    amount: "Amount",
    noRecords: "No transactions found"
  },
  HI: {
    title: "हाल के लेनदेन",
    deposit: "जमा",
    withdraw: "निकासी",
    paymentFrom: "भुगतान यहाँ से",
    paymentTo: "भुगतान यहाँ को",
    amount: "राशि",
    noRecords: "कोई लेनदेन नहीं मिला"
  }
};

const TransactionsList = ({ data: dataProp }) => {
  const { language } = useLanguage();
  const t = (key) => TRANSLATIONS[language]?.[key] || key;
  const [transactionType, setTransactionType] = useState('Deposit');

  const demoTransactions = [
    { from: 'Telcopay', to: 'Wallet', amount: '$ 100', type: 'Deposit' },
    { from: 'Telcopay', to: 'Wallet', amount: '$ 100', type: 'Deposit' },
    { from: 'Campaign Reward: deposit test offer', to: 'Wallet', amount: '$ 100', type: 'Deposit' },
  ];

  const { data: dataRemote } = useRealtimeJson(endpoints.recentTransactions, {
    enabled: Boolean(!dataProp && endpoints.recentTransactions),
  });
  const data = dataProp ?? dataRemote;

  const allTransactions = transactionType === 'Deposit' 
    ? (data?.deposits || []) 
    : (data?.withdrawals || []);

  const filteredTransactions = allTransactions.length > 0 ? allTransactions : demoTransactions.filter(t => t.type === transactionType);

  return (
    <div className="bg-[var(--card-bg)] rounded-[20px] border border-[var(--border-color)] shadow-[0_10px_25px_rgba(18,45,50,0.12)] flex flex-col overflow-hidden flex-1 min-h-0 transition-colors">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 pt-4 pb-3">
        <h2 className="text-[16px] font-extrabold text-[var(--text-color)]">{t('title')}</h2>
        <div className="bg-[var(--sub-bg)] p-1 rounded-full border border-[var(--border-color)] flex gap-1 items-center h-[32px] w-full sm:w-auto">
          <button 
            onClick={() => setTransactionType('Deposit')}
            className={`flex-1 sm:flex-none text-[11px] px-4 h-full rounded-full font-semibold transition-all ${transactionType === 'Deposit' ? 'bg-[#158B86] text-white shadow-sm' : 'text-[var(--text-color)] opacity-80 hover:opacity-100'}`}
          >
            {t('deposit')}
          </button>
          <button 
            onClick={() => setTransactionType('Withdraw')}
            className={`flex-1 sm:flex-none text-[11px] px-4 h-full rounded-full font-semibold transition-all ${transactionType === 'Withdraw' ? 'bg-[#158B86] text-white shadow-sm' : 'text-[var(--text-color)] opacity-80 hover:opacity-100'}`}
          >
            {t('withdraw')}
          </button>
        </div>
      </div>


      <div className="px-6 pb-5 flex-1 min-h-0">
        <div className="h-full rounded-[16px] border border-[var(--border-color)] overflow-hidden bg-[var(--card-bg)]">
          <div className="overflow-x-auto h-full">
            <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="bg-[var(--sub-bg)]">
                <th className="py-3 px-2 md:px-4 text-left text-[11px] md:text-[12px] font-bold text-[var(--text-color)]">{t('paymentFrom')}</th>
                <th className="py-3 px-2 md:px-4 text-left text-[11px] md:text-[12px] font-bold text-[var(--text-color)] border-l border-[var(--border-color)]">{t('paymentTo')}</th>
                <th className="py-3 px-2 md:px-4 text-right text-[11px] md:text-[12px] font-bold text-[var(--text-color)] border-l border-[var(--border-color)]">{t('amount')}</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((t, i) => (
                  <tr key={i} className="border-b border-[var(--border-color)] last:border-0">
                    <td className="py-3.5 px-2 md:px-4 text-[11px] md:text-[12px] font-medium text-[var(--text-color)] opacity-80">
                      {t.from ?? t.paymentFrom ?? t.PaymentFrom ?? '-'}
                    </td>
                    <td className="py-3.5 px-2 md:px-4 text-[11px] md:text-[12px] font-medium text-[var(--text-color)] opacity-80">
                      {t.to ?? t.paymentTo ?? t.PaymentTo ?? '-'}
                    </td>
                    <td className="py-3.5 px-2 md:px-4 text-[11px] md:text-[12px] font-extrabold text-[var(--text-color)] text-right">
                      {typeof t.amount === 'number' ? `$ ${t.amount.toLocaleString()}` : (t.amount ?? t.Amount ?? '-')}
                    </td>
                  </tr>

                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-8 text-center text-[#B2BEBB] text-[12px]">{t('noRecords')}</td>
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

export default TransactionsList;
