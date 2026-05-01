import React from 'react';
import { Eye } from 'lucide-react';
import { Tooltip } from 'antd';
import { useLanguage } from '../contexts/LanguageContext';

const TRANSLATIONS = {
  EN: { walletAccountNo: 'Wallet Account No', withdrawType: 'Withdraw Type', amount: 'Amount', balance: 'Balance', requestDate: 'Request Date', actionDate: 'Action Date', status: 'Status', remark: 'Remark', noRecords: 'No' },
  HI: { walletAccountNo: 'वॉलेट अकाउंट नं.', withdrawType: 'निकासी प्रकार', amount: 'राशि', balance: 'बैलेंस', requestDate: 'अनुरोध तिथि', actionDate: 'कार्रवाई तिथि', status: 'स्थिति', remark: 'रिमार्क', noRecords: 'कोई नहीं' },
};

const WalletWithdrawTable = ({ data, filterStatus, sortConfig, onSort, isMobile = false }) => {
  const { language } = useLanguage();
  const t = (key) => TRANSLATIONS[language]?.[key] || key;
  const displayData = data || [];
  const themeColor = isMobile ? '#3B82F6' : '#158B86';

  const renderSortIcon = (key) => {
    const isActive = sortConfig?.key === key;
    return (
      <div className="flex flex-col ml-2 gap-[1px]">
        <svg width="10" height="10" viewBox="0 0 24 24" className={`transition-opacity ${isActive && sortConfig?.direction === 'asc' ? 'opacity-100' : 'opacity-40 fill-[var(--text-color)]'}`} style={isActive && sortConfig?.direction === 'asc' ? { fill: themeColor } : {}}>
          <polygon points="12,6 4,16 20,16" />
        </svg>
        <svg width="10" height="10" viewBox="0 0 24 24" className={`transition-opacity ${isActive && sortConfig?.direction === 'desc' ? 'opacity-100' : 'opacity-40 fill-[var(--text-color)]'}`} style={isActive && sortConfig?.direction === 'desc' ? { fill: themeColor } : {}}>
          <polygon points="12,18 4,8 20,8" />
        </svg>
      </div>
    );
  };

  const getSortTooltip = (key) => {
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') return "Click to sort descending";
    return "Click to sort ascending";
  };

  const handleSortClick = (key) => {
    if (onSort) onSort(key);
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[1100px]">
        <thead>
          <tr className="text-[13px] text-[#8e9d9b] bg-[var(--sub-bg)] border-b border-[var(--border-color)]">
            <th className="py-3.5 px-5 font-bold whitespace-nowrap text-[var(--text-color)]">{t('walletAccountNo')}</th>
            <th className="py-3.5 px-5 font-bold whitespace-nowrap text-[var(--text-color)] border-l border-[var(--border-color)]">{t('withdrawType')}</th>
            <th className="py-3.5 px-5 font-bold whitespace-nowrap text-[var(--text-color)] border-l border-[var(--border-color)]">{t('amount')}</th>
            <th className="py-3.5 px-5 font-bold whitespace-nowrap text-[var(--text-color)] border-l border-[var(--border-color)]">{t('balance')}</th>
            <th className="p-0 font-bold whitespace-nowrap text-[var(--text-color)] cursor-pointer hover:bg-white/5 transition-colors border-l border-[var(--border-color)]" onClick={() => handleSortClick('requestDate')}>
              <Tooltip title={getSortTooltip('requestDate')} placement="top" color="#404040" overlayInnerStyle={{ borderRadius: '6px', padding: '4px 12px', fontSize: '13px' }}>
                <div className="flex items-center justify-between w-full h-full py-3.5 px-5">
                  <span>{t('requestDate')}</span>
                  {renderSortIcon('requestDate')}
                </div>
              </Tooltip>
            </th>
            <th className="p-0 font-bold whitespace-nowrap text-[var(--text-color)] cursor-pointer hover:bg-white/5 transition-colors border-l border-[var(--border-color)]" onClick={() => handleSortClick('actionDate')}>
              <Tooltip title={getSortTooltip('actionDate')} placement="top" color="#404040" overlayInnerStyle={{ borderRadius: '6px', padding: '4px 12px', fontSize: '13px' }}>
                <div className="flex items-center justify-between w-full h-full py-3.5 px-5">
                  <span>{t('actionDate')}</span>
                  {renderSortIcon('actionDate')}
                </div>
              </Tooltip>
            </th>
            <th className="py-3.5 px-5 font-bold whitespace-nowrap text-[var(--text-color)] border-l border-[var(--border-color)]">{t('status')}</th>
            <th className="py-3.5 px-5 font-bold whitespace-nowrap text-[var(--text-color)] border-l border-[var(--border-color)]">{t('remark')}</th>
          </tr>
        </thead>
        <tbody>
          {displayData.length > 0 ? (
            displayData.map((row) => (
              <tr key={row.id} className="text-[14px] text-[var(--text-color)] border-b border-[var(--border-color)] hover:bg-white/5 transition-colors">
                <td className="py-3 px-5 whitespace-nowrap">{row.accountNo}</td>
                <td className="py-3 px-5 whitespace-nowrap">{row.withdrawType}</td>
                <td className="py-3 px-5 whitespace-nowrap">{row.amount}</td>
                <td className="py-3 px-5 whitespace-nowrap">{row.balance}</td>
                <td className="py-3 px-5 whitespace-nowrap">{row.requestDate}</td>
                <td className="py-3 px-5 whitespace-nowrap">{row.actionDate}</td>
                <td className="py-3 px-5 whitespace-nowrap">
                   <span className="opacity-80">{row.status}</span>
                </td>
                <td className="py-3 px-5 whitespace-nowrap">
                  <Eye size={15} className="cursor-pointer hover:text-white transition-colors" style={{ color: themeColor }} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="py-10 text-center text-[#8e9d9b] text-[14px]">
                {t('noRecords')} {filterStatus} records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WalletWithdrawTable;
