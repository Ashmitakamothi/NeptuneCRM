import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, Wallet } from 'lucide-react';
import InternalTransferTable from './InternalTransferTable';

const MobileInternalTransfer = ({ onNavigate, t, currentItems, sortConfig, handleSort }) => {
  const [amount, setAmount] = useState('');
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  const accounts = [
    { id: 'wallet', label: 'Wallet', sub: 'Primary wallet account' },
    { id: 'trading', label: 'Trading', sub: 'Live trading account' },
    { id: '555166', label: '555166', sub: '' }
  ];

  const selectedFrom = accounts.find(a => a.id === fromAccount) || { label: 'Select From Account' };
  const selectedTo = accounts.find(a => a.id === toAccount) || { label: 'Select To Account' };

  const statCards = [
    { label: 'Wallet No.', value: '4523', bg: '#7367f038', color: '#7367F0', icon: <Wallet size={18} /> },
    { label: 'Balance',    value: '$ 0',    bg: '#28c76f30', color: '#28C76F', icon: <svg viewBox="64 64 896 896" width="18" height="18" fill="currentColor"><path d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"/><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"/></svg> },
    { label: 'Min Deposit', value: '$ 10', bg: '#ff9f432b', color: '#FF9F43', icon: <Wallet size={18} /> },
    { label: 'Max Deposit', value: '$ 100000', bg: '#ff4c5130', color: '#ff4c51', icon: <Wallet size={18} /> },
  ];

  return (
    <div className="block lg:hidden pb-28">
      {/* ── Back Header ── */}
      <div className="flex items-center gap-3 py-4 border-b border-[var(--border-color)] mb-6 -mx-4 px-4 bg-[var(--bg-color)] sticky top-0 z-[100]">
        <button onClick={() => onNavigate('Dashboard')} className="p-1 -ml-1 transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <h1 className="text-[20px] font-bold text-[#3B82F6]">Transfer</h1>
      </div>

      {/* ── 2×2 Stats Grid ── */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {statCards.map((s) => (
          <div key={s.label} className="rounded-2xl p-3 shadow-md border border-[var(--border-color)] bg-[var(--card-bg)] hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-[10px] flex-shrink-0" style={{ background: s.bg, color: s.color }}>
                {s.icon}
              </div>
              <div>
                <h3 className="text-xs font-bold leading-5">{s.label}</h3>
                <p className="text-sm font-bold">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Form ── */}
      <div className="space-y-6">
        {/* Amount */}
        <div>
          <label className="text-base font-medium block mb-2 text-[var(--text-color)]">Amount in USD</label>
          <input 
            type="number" 
            placeholder="Amount in USD" 
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-xl py-3.5 px-4 text-[var(--text-color)] outline-none focus:border-[#3B82F6] transition-colors text-base" 
          />
        </div>

        {/* From Account Dropdown */}
        <div className="relative">
          <label className="text-base font-medium block mb-2 text-[var(--text-color)]">
            <span className="text-[#EF4444] mr-1">*</span>Select From Account
          </label>
          <div 
            onClick={() => { setIsFromOpen(!isFromOpen); setIsToOpen(false); }}
            className="flex items-center justify-between py-3.5 px-4 bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-xl cursor-pointer"
          >
            <span className={`text-base font-medium ${fromAccount ? 'text-[var(--text-color)]' : 'text-[#8e9d9b]'}`}>
              {selectedFrom.label}
            </span>
            <ChevronDown size={18} className="text-[#8e9d9b]" />
          </div>
          {isFromOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[var(--nav-bg)] border border-[var(--border-color)] rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
              {accounts.map((a) => (
                <div key={a.id} onClick={() => { setFromAccount(a.id); setIsFromOpen(false); }}
                  className={`px-4 py-3.5 cursor-pointer transition-colors border-b border-[var(--border-color)] last:border-none ${fromAccount === a.id ? 'bg-[#3B82F615] text-[#3B82F6]' : 'hover:bg-[var(--sub-bg)] text-[var(--text-color)]'}`}>
                  <div className="font-semibold text-sm">{a.label}</div>
                  {a.sub && <div className="text-xs opacity-60">{a.sub}</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* To Account Dropdown */}
        <div className="relative">
          <label className="text-base font-medium block mb-2 text-[var(--text-color)]">
            <span className="text-[#EF4444] mr-1">*</span>Select To Account
          </label>
          <div 
            onClick={() => { setIsToOpen(!isToOpen); setIsFromOpen(false); }}
            className="flex items-center justify-between py-3.5 px-4 bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-xl cursor-pointer"
          >
            <span className={`text-base font-medium ${toAccount ? 'text-[var(--text-color)]' : 'text-[#8e9d9b]'}`}>
              {selectedTo.label}
            </span>
            <ChevronDown size={18} className="text-[#8e9d9b]" />
          </div>
          {isToOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[var(--nav-bg)] border border-[var(--border-color)] rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
              {accounts.map((a) => (
                <div key={a.id} onClick={() => { setToAccount(a.id); setIsToOpen(false); }}
                  className={`px-4 py-3.5 cursor-pointer transition-colors border-b border-[var(--border-color)] last:border-none ${toAccount === a.id ? 'bg-[#3B82F615] text-[#3B82F6]' : 'hover:bg-[var(--sub-bg)] text-[var(--text-color)]'}`}>
                  <div className="font-semibold text-sm">{a.label}</div>
                  {a.sub && <div className="text-xs opacity-60">{a.sub}</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Terms */}
        <label className="flex items-center gap-2 mt-4 cursor-pointer">
          <input type="checkbox" checked={isAgreed} onChange={e => setIsAgreed(e.target.checked)} className="w-4 h-4 accent-[#3B82F6]" />
          <span className="text-sm text-[var(--text-color)] opacity-80">
            Yes, I agreed to the <span className="text-[#3B82F6] cursor-pointer hover:underline">Terms & Conditions</span>
          </span>
        </label>

        <button 
          className="w-full py-4 text-sm text-white font-semibold rounded-xl uppercase mt-2 transition-all hover:opacity-90 shadow-lg shadow-blue-500/10"
          style={{ background: '#3B82F6' }}
        >
          Submit
        </button>
      </div>

      {/* ── History Table ── */}
      <div className="mt-10">
        <h2 className="text-lg font-bold text-[var(--text-color)] mb-4 px-1">Transfer History</h2>
        <div className="border border-[var(--border-color)] rounded-2xl overflow-hidden shadow-sm">
          <InternalTransferTable data={currentItems} sortConfig={sortConfig} onSort={handleSort} isMobile={true} />
        </div>
      </div>
    </div>
  );
};

export default MobileInternalTransfer;
