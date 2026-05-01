import React, { useState } from 'react';
import { ChevronDown, Download, Calendar } from 'lucide-react';
import { DatePicker, ConfigProvider, theme as antdTheme } from 'antd';
import dayjs from 'dayjs';
import MyTransactionsTable from './MyTransactionsTable';

const MobileMyTransactions = ({ 
  onNavigate, 
  operationFilter, 
  handleFilterChange, 
  dateRange, 
  setDateRange,
  onExport 
}) => {
  const [isOpOpen, setIsOpOpen] = useState(false);
  const operations = ['All', 'Deposit', 'Withdrawal', 'Wallet To Account', 'Account To Wallet', 'IB Wallet To Wallet'];

  return (
    <div className="block lg:hidden pb-28">
      {/* ── Back Header ── */}
      <div className="flex items-center gap-3 py-4 border-b border-[var(--border-color)] mb-6 -mx-4 px-4 bg-[var(--bg-color)] sticky top-0 z-[100]">
        <button onClick={() => onNavigate('Dashboard')} className="p-1 -ml-1 transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <h1 className="text-[20px] font-bold text-[#3B82F6]">My Transactions</h1>
      </div>

      {/* ── Operation Filter ── */}
      <div className="relative mb-4">
        <div 
          onClick={() => setIsOpOpen(!isOpOpen)}
          className="flex items-center justify-between py-3.5 px-4 bg-[#1a1a1a] border border-[var(--border-color)] rounded-xl cursor-pointer"
        >
          <span className="text-base font-medium text-[var(--text-color)]">{operationFilter}</span>
          <ChevronDown size={18} className="text-[#8e9d9b]" />
        </div>
        {isOpOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-[var(--nav-bg)] border border-[var(--border-color)] rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
            {operations.map((op) => (
              <div key={op} onClick={() => { handleFilterChange(op); setIsOpOpen(false); }}
                className={`px-4 py-3.5 cursor-pointer transition-colors border-b border-[var(--border-color)] last:border-none ${operationFilter === op ? 'bg-[#3B82F615] text-[#3B82F6]' : 'hover:bg-[var(--sub-bg)] text-[var(--text-color)]'}`}>
                {op}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Date Filters ── */}
      <ConfigProvider theme={{ algorithm: antdTheme.darkAlgorithm }}>
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <DatePicker 
              placeholder="From Date" 
              className="w-full bg-[#1a1a1a] border border-[var(--border-color)] rounded-xl py-3.5 pl-4 pr-4 text-[var(--text-color)] outline-none text-sm font-medium hover:border-[#3B82F6] focus:border-[#3B82F6]"
              suffixIcon={<Calendar size={16} className="text-[#8e9d9b]" />}
              value={dateRange ? dateRange[0] : null}
              onChange={(date) => setDateRange([date, dateRange ? dateRange[1] : null])}
            />
          </div>
          <div className="flex-1 relative">
            <DatePicker 
              placeholder="To Date" 
              className="w-full bg-[#1a1a1a] border border-[var(--border-color)] rounded-xl py-3.5 pl-4 pr-4 text-[var(--text-color)] outline-none text-sm font-medium hover:border-[#3B82F6] focus:border-[#3B82F6]"
              suffixIcon={<Calendar size={16} className="text-[#8e9d9b]" />}
              value={dateRange ? dateRange[1] : null}
              onChange={(date) => setDateRange([dateRange ? dateRange[0] : null, date])}
            />
          </div>
        </div>
      </ConfigProvider>

      {/* ── Export Button ── */}
      <button 
        onClick={onExport}
        className="w-full py-4 text-sm text-white font-semibold rounded-xl flex items-center justify-center gap-2 mb-8 transition-all hover:opacity-90 shadow-lg shadow-blue-500/10"
        style={{ background: '#3B82F6' }}
      >
        <Download size={18} />
        Export
      </button>

      {/* ── Transactions Table ── */}
      <div className="border border-[var(--border-color)] rounded-2xl overflow-hidden shadow-sm bg-[var(--card-bg)]">
        <div className="overflow-x-auto scrollbar-hide">
          <MyTransactionsTable operationFilter={operationFilter} dateRange={dateRange} isMobile={true} />
        </div>
      </div>
    </div>
  );
};

export default MobileMyTransactions;
