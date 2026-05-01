import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, Wallet } from 'lucide-react';
import WalletWithdrawTable from './WalletWithdrawTable';

const MobileWalletWithdraw = ({ onNavigate, WITHDRAWAL_METHODS, summaryData, currentItems, filterStatus, setFilterStatus, sortConfig, onSort }) => {
  const [selectedMethod, setSelectedMethod] = useState(WITHDRAWAL_METHODS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);

  const m = selectedMethod;

  const statCards = [
    { label: 'Balance',         value: summaryData.balance,    bg: '#28c76f30', color: '#28C76F',
      icon: <svg viewBox="64 64 896 896" width="18" height="18" fill="currentColor"><path d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"/><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"/></svg> },
    { label: 'Time',            value: summaryData.processing, bg: '#7367f038', color: '#7367F0',
      icon: <Wallet size={18} /> },
    { label: 'Min Withdrawal',  value: summaryData.min,        bg: '#ff9f432b', color: '#FF9F43',
      icon: <Wallet size={18} /> },
    { label: 'Max Withdrawal',  value: summaryData.max,        bg: '#ff4c5130', color: '#ff4c51',
      icon: <Wallet size={18} /> },
  ];

  return (
    <div className="block lg:hidden pb-28">

      {/* ── Back Header ── */}
      <div className="flex items-center gap-3 py-4 border-b border-[var(--border-color)] mb-6 -mx-4 px-4 bg-[var(--bg-color)] sticky top-0 z-[100]">
        <button onClick={() => onNavigate('Dashboard')} className="p-1 -ml-1 transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <h1 className="text-[20px] font-bold text-[#3B82F6]">Wallet</h1>
      </div>

      {/* ── Deposit / Withdraw Tabs ── */}
      <div className="bg-[#1a1a1a] rounded-xl p-1.5 mb-6 border border-[var(--border-color)]">
        <div className="flex gap-1.5">
          <button onClick={() => onNavigate('Wallet_Deposit')}
            className="flex-1 py-2.5 text-sm font-semibold text-center text-[#8e9d9b] hover:text-white transition-all">
            Deposit
          </button>
          <button className="flex-1 py-2.5 text-sm font-bold text-center rounded-lg bg-[#3B82F6] text-white transition-all shadow-lg shadow-blue-500/20">
            Withdraw
          </button>
        </div>
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

      {/* ── Withdrawal Method Dropdown ── */}
      <div className="relative mb-5">
        <div onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center justify-between gap-2 py-2.5 px-4 bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-xl cursor-pointer">
          <div className="flex items-center gap-2">
            <img src={m.img} alt={m.name} className="h-8 w-8 object-contain rounded-full bg-white p-0.5" />
            <span className="font-semibold text-sm text-[var(--text-color)]">{m.name}</span>
          </div>
          <div className="bg-[var(--card-bg)] p-2 rounded-lg">
            <ChevronDown size={16} className="text-[var(--text-color)] opacity-60" />
          </div>
        </div>
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-[var(--nav-bg)] border border-[var(--border-color)] rounded-xl shadow-2xl z-50 overflow-hidden">
            {WITHDRAWAL_METHODS.map((wm) => (
              <div key={wm.id} onClick={() => { setSelectedMethod(wm); setIsDropdownOpen(false); }}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors border-b border-[var(--border-color)] last:border-none ${m.id === wm.id ? 'bg-[var(--sub-bg)]' : 'hover:bg-[var(--sub-bg)]'}`}>
                <img src={wm.img} alt={wm.name} className="h-7 w-7 object-contain rounded-full bg-white p-0.5" />
                <span className="text-sm font-semibold text-[var(--text-color)]">{wm.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Form ── */}
      <div className="space-y-5">

        {/* Where to Withdraw From */}
        <div>
          <label className="text-base font-medium block mb-2 text-[var(--text-color)]">Where to Withdraw From</label>
          <div className="flex items-center gap-3 py-3 px-4 bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-xl cursor-pointer">
            <Wallet size={18} className="text-[var(--theme)]" />
            <span className="font-medium text-[var(--text-color)]">Wallet</span>
            <span className="text-sm text-[var(--text-color)] opacity-50 ms-1">$0</span>
            <ChevronDown size={16} className="ml-auto opacity-50" />
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="text-base font-medium block mb-2 text-[var(--text-color)]">Withdrawal Amount In USD</label>
          <input type="number" placeholder="Amount in USD" value={withdrawAmount}
            onChange={e => setWithdrawAmount(e.target.value)}
            className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-[var(--text-color)] outline-none focus:border-[var(--theme)] transition-colors text-base" />
        </div>

        {/* Crypto-specific (BEP20 / TRC20) */}
        {['bep20', 'trc20'].includes(m.id) && (
          <div>
            <label className="text-base font-medium block mb-2 text-[var(--text-color)]"><span className="text-red-500 mr-1">*</span>Wallet Address</label>
            <input type="text" placeholder="Enter your wallet address" value={walletAddress}
              onChange={e => setWalletAddress(e.target.value)}
              className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-[var(--text-color)] outline-none focus:border-[var(--theme)] transition-colors" />
          </div>
        )}

        {/* Bank Transfer specific */}
        {m.id === 'bank' && (
          <>
            <div>
              <label className="text-base font-medium block mb-2 text-[var(--text-color)]"><span className="text-red-500 mr-1">*</span>Bank Name</label>
              <input type="text" placeholder="Enter Bank Name" value={bankName}
                onChange={e => setBankName(e.target.value)}
                className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-[var(--text-color)] outline-none focus:border-[var(--theme)] transition-colors" />
            </div>
            <div>
              <label className="text-base font-medium block mb-2 text-[var(--text-color)]"><span className="text-red-500 mr-1">*</span>Account Number</label>
              <input type="text" placeholder="Enter Account Number" value={accountNo}
                onChange={e => setAccountNo(e.target.value)}
                className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-[var(--text-color)] outline-none focus:border-[var(--theme)] transition-colors" />
            </div>
            <div>
              <label className="text-base font-medium block mb-2 text-[var(--text-color)]"><span className="text-red-500 mr-1">*</span>IFSC Code</label>
              <input type="text" placeholder="Enter IFSC Code" value={ifscCode}
                onChange={e => setIfscCode(e.target.value)}
                className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-[var(--text-color)] outline-none focus:border-[var(--theme)] transition-colors" />
            </div>
            <div>
              <label className="text-base font-medium block mb-2 text-[var(--text-color)]"><span className="text-red-500 mr-1">*</span>Account Holder Name</label>
              <input type="text" placeholder="Enter Account Holder Name" value={accountHolder}
                onChange={e => setAccountHolder(e.target.value)}
                className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-[var(--text-color)] outline-none focus:border-[var(--theme)] transition-colors" />
            </div>
          </>
        )}

        {/* Cash Withdrawal */}
        {m.id === 'cash' && (
          <div className="bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-xl p-4 text-sm text-[var(--text-color)] opacity-80">
            <p className="font-semibold mb-1">Cash Withdrawal</p>
            <p className="opacity-70">A representative will contact you to arrange the cash withdrawal. Please ensure your contact details are up to date in your profile.</p>
          </div>
        )}

        {/* Terms & Submit */}
        <label className="flex items-center gap-2 mt-4 cursor-pointer">
          <input type="checkbox" checked={isAgreed} onChange={e => setIsAgreed(e.target.checked)} className="w-4 h-4 accent-[var(--theme)]" />
          <span className="text-sm text-[var(--text-color)] opacity-80">
            Yes, I agreed to the <span className="text-[var(--theme)] cursor-pointer hover:underline">Terms & Conditions</span>
          </span>
        </label>

        <button className="w-full py-4 text-sm text-white font-semibold rounded-xl uppercase mt-2 transition-all hover:opacity-90 shadow-lg shadow-blue-500/10"
          style={{ background: '#3B82F6' }}>
          Submit
        </button>
      </div>

      {/* ── Transaction History ── */}
      <div className="mt-8">
        <div className="flex rounded-xl overflow-hidden border border-[var(--border-color)] mb-4 p-1 bg-[#1a1a1a]">
          {['Approved', 'Pending', 'Rejected'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`flex-1 py-2.5 text-sm font-bold transition-all rounded-lg ${filterStatus === s ? 'bg-[#3B82F6] text-white shadow-md' : 'text-[#8e9d9b] hover:text-white'}`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="border border-[var(--border-color)] rounded-xl overflow-hidden">
          <WalletWithdrawTable data={currentItems} sortConfig={sortConfig} onSort={onSort} isMobile={true} />
        </div>
      </div>
    </div>
  );
};

export default MobileWalletWithdraw;
