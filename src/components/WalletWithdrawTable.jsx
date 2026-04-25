import React from 'react';
import { Eye } from 'lucide-react';
import { Tooltip } from 'antd';

const WalletWithdrawTable = ({ data, filterStatus, sortConfig, onSort }) => {
  const displayData = data || [];

  const renderSortIcon = (key) => {
    const isActive = sortConfig?.key === key;
    return (
      <div className="flex flex-col ml-2 gap-[1px]">
        <svg width="10" height="10" viewBox="0 0 24 24" className={`transition-opacity ${isActive && sortConfig?.direction === 'asc' ? 'opacity-100 fill-[#158B86]' : 'opacity-40 fill-white'}`}>
          <polygon points="12,6 4,16 20,16" />
        </svg>
        <svg width="10" height="10" viewBox="0 0 24 24" className={`transition-opacity ${isActive && sortConfig?.direction === 'desc' ? 'opacity-100 fill-[#158B86]' : 'opacity-40 fill-white'}`}>
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
          <tr className="text-[13px] text-[#8e9d9b] bg-[#1A1A1A] border-b border-[#158B86]/20">
            <th className="py-3.5 px-5 font-bold whitespace-nowrap text-white">Wallet Account No</th>
            <th className="py-3.5 px-5 font-bold whitespace-nowrap text-white border-l border-white/10">Withdraw Type</th>
            <th className="py-3.5 px-5 font-bold whitespace-nowrap text-white border-l border-white/10">Amount</th>
            <th className="py-3.5 px-5 font-bold whitespace-nowrap text-white border-l border-white/10">Balance</th>
            <th className="p-0 font-bold whitespace-nowrap text-white cursor-pointer hover:bg-white/5 transition-colors border-l border-white/10" onClick={() => handleSortClick('requestDate')}>
              <Tooltip title={getSortTooltip('requestDate')} placement="top" color="#404040" overlayInnerStyle={{ borderRadius: '6px', padding: '4px 12px', fontSize: '13px' }}>
                <div className="flex items-center justify-between w-full h-full py-3.5 px-5">
                  <span>Request Date</span>
                  {renderSortIcon('requestDate')}
                </div>
              </Tooltip>
            </th>
            <th className="p-0 font-bold whitespace-nowrap text-white cursor-pointer hover:bg-white/5 transition-colors border-l border-white/10" onClick={() => handleSortClick('actionDate')}>
              <Tooltip title={getSortTooltip('actionDate')} placement="top" color="#404040" overlayInnerStyle={{ borderRadius: '6px', padding: '4px 12px', fontSize: '13px' }}>
                <div className="flex items-center justify-between w-full h-full py-3.5 px-5">
                  <span>Action Date</span>
                  {renderSortIcon('actionDate')}
                </div>
              </Tooltip>
            </th>
            <th className="py-3.5 px-5 font-bold whitespace-nowrap text-white border-l border-white/10">Status</th>
            <th className="py-3.5 px-5 font-bold whitespace-nowrap text-white border-l border-white/10">Remark</th>
          </tr>
        </thead>
        <tbody>
          {displayData.length > 0 ? (
            displayData.map((row) => (
              <tr key={row.id} className="text-[14px] text-white border-b border-[#1a2825] hover:bg-[#1A1A1A] transition-colors">
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
                  <Eye size={15} className="text-[#158B86] cursor-pointer hover:text-white transition-colors" />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="py-10 text-center text-[#8e9d9b] text-[14px]">
                No {filterStatus} records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WalletWithdrawTable;
