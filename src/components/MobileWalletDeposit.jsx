import React, { useState, useRef } from 'react';
import { ArrowLeft, ChevronDown, Wallet, Copy } from 'lucide-react';
import WalletDepositTable from './WalletDepositTable';
import uploadDocumentIcon from '../assets/Upload_Document_icon.svg';

const MobileWalletDeposit = ({ onNavigate, PAYMENT_METHODS, summaryData, currentItems, filterStatus, setFilterStatus, sortConfig, onSort }) => {
  const [selectedMethod, setSelectedMethod] = useState(PAYMENT_METHODS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [upiId, setUpiId] = useState('');
  const [comment, setComment] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileRef = useRef(null);

  const m = selectedMethod;

  const statCards = [
    { label: 'Balance',      value: summaryData.balance,    bg: '#28c76f30', color: '#28C76F',
      icon: <svg viewBox="64 64 896 896" width="18" height="18" fill="currentColor"><path d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"/><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"/></svg> },
    { label: 'Time',         value: summaryData.processing, bg: '#7367f038', color: '#7367F0',
      icon: <Wallet size={18} /> },
    { label: 'Min Deposit',  value: summaryData.min,        bg: '#ff9f432b', color: '#FF9F43',
      icon: <Wallet size={18} /> },
    { label: 'Max Deposit',  value: summaryData.max,        bg: '#ff4c5130', color: '#ff4c51',
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
          <button className="flex-1 py-2.5 text-sm font-bold text-center rounded-lg bg-[#3B82F6] text-white transition-all shadow-lg shadow-blue-500/20">
            Deposit
          </button>
          <button onClick={() => onNavigate('Wallet_Withdraw')}
            className="flex-1 py-2.5 text-sm font-semibold text-center text-[#8e9d9b] hover:text-white transition-all">
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

      {/* ── Payment Method Dropdown ── */}
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
            {PAYMENT_METHODS.map((pm) => (
              <div key={pm.id} onClick={() => { setSelectedMethod(pm); setIsDropdownOpen(false); }}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors border-b border-[var(--border-color)] last:border-none ${m.id === pm.id ? 'bg-[var(--sub-bg)]' : 'hover:bg-[var(--sub-bg)]'}`}>
                <img src={pm.img} alt={pm.name} className="h-7 w-7 object-contain rounded-full bg-white p-0.5" />
                <span className="text-sm font-semibold text-[var(--text-color)]">{pm.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Form ── */}
      <div className="space-y-5">
        {/* Where to Deposit */}
        <div>
          <label className="text-base font-medium block mb-2 text-[var(--text-color)]">Where to Deposit</label>
          <div className="flex items-center gap-3 py-3 px-4 bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-xl cursor-pointer">
            <Wallet size={18} className="text-[var(--theme)]" />
            <span className="font-medium text-[var(--text-color)]">Wallet</span>
            <span className="text-sm text-[var(--text-color)] opacity-50 ms-1">$0</span>
            <ChevronDown size={16} className="ml-auto opacity-50" />
          </div>
        </div>

        {/* Deposit Amount */}
        <div>
          <label className="text-base font-medium block mb-2 text-[var(--text-color)]">Deposit Amount In USD</label>
          <input type="number" placeholder="Amount in USD" value={depositAmount}
            onChange={e => setDepositAmount(e.target.value)}
            className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-[var(--text-color)] outline-none focus:border-[var(--theme)] transition-colors text-base" />
        </div>

        {/* Bank-specific */}
        {m.id === 'bank' && (
          <>
            <div>
              <label className="text-base font-medium block mb-2 text-[var(--text-color)]">UTR Reference Number</label>
              <input type="text" placeholder="Please enter UTR Reference Number" value={transactionId}
                onChange={e => setTransactionId(e.target.value)}
                className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-[var(--text-color)] outline-none focus:border-[var(--theme)] transition-colors" />
            </div>
            <div>
              <label className="text-base font-medium block mb-2 text-[var(--text-color)]">Upload Document</label>
              <input ref={fileRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={e => e.target.files[0] && setUploadedFile(e.target.files[0])} />
              <button type="button" onClick={() => fileRef.current?.click()} className="w-full flex items-center justify-center gap-2 border border-[var(--border-color)] hover:border-[var(--theme)] rounded-xl py-3 px-4 text-[var(--text-color)] opacity-70 hover:opacity-100 transition-all">
                <img src={uploadDocumentIcon} alt="Upload" className="w-5 h-5" />
                <span className="text-base font-medium">{uploadedFile ? uploadedFile.name : 'Click to Upload'}</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-y-2 text-sm bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-xl p-4">
              <span><b>Bank Name:</b> <span className="opacity-60">HDFC</span></span>
              <span><b>Holder:</b> <span className="opacity-60">Neptune</span></span>
              <span><b>Account:</b> <span className="opacity-60">123456</span></span>
              <span><b>IFSC:</b> <span className="opacity-60">HDFCBANK</span></span>
            </div>
          </>
        )}

        {/* UPI-specific */}
        {m.id === 'upi' && (
          <>
            <div>
              <label className="text-base font-medium block mb-2 text-[var(--text-color)]">UTR Reference Number</label>
              <input type="text" placeholder="Please enter UTR Reference Number" value={transactionId} onChange={e => setTransactionId(e.target.value)}
                className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-[var(--text-color)] outline-none focus:border-[var(--theme)] transition-colors" />
            </div>
            <div>
              <label className="text-base font-medium block mb-2 text-[var(--text-color)]">UPI Id</label>
              <input type="text" placeholder="UPI Id" value={upiId} onChange={e => setUpiId(e.target.value)}
                className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-[var(--text-color)] outline-none focus:border-[var(--theme)] transition-colors" />
            </div>
            <div>
              <label className="text-base font-medium block mb-2 text-[var(--text-color)]">Comment</label>
              <input type="text" placeholder="Comment" value={comment} onChange={e => setComment(e.target.value)}
                className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-[var(--text-color)] outline-none focus:border-[var(--theme)] transition-colors" />
            </div>
            <div>
              <label className="text-base font-medium block mb-2 text-[var(--text-color)]">Upload Document</label>
              <input ref={fileRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={e => e.target.files[0] && setUploadedFile(e.target.files[0])} />
              <button type="button" onClick={() => fileRef.current?.click()} className="w-full flex items-center justify-center gap-2 border border-[var(--border-color)] hover:border-[var(--theme)] rounded-xl py-3 px-4 text-[var(--text-color)] opacity-70 hover:opacity-100 transition-all">
                <img src={uploadDocumentIcon} alt="Upload" className="w-5 h-5" />
                <span>{uploadedFile ? uploadedFile.name : 'Click to Upload'}</span>
              </button>
            </div>
            <div className="flex flex-col items-center gap-3">
              <img src="https://mt5.neptunefxcrm.com/PaymentLogoImage/638991296573891892.png" alt="QR Code" className="object-contain w-[40%]" />
            </div>
          </>
        )}

        {/* Crypto / ZaroPay / Teriopay */}
        {!['bank', 'upi'].includes(m.id) && (
          <>
            <div>
              <label className="text-base font-medium block mb-2 text-[var(--text-color)]"><span className="text-red-500 mr-1">*</span>Transaction ID</label>
              <input type="text" placeholder="Transaction ID" value={transactionId} onChange={e => setTransactionId(e.target.value)}
                className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-[var(--text-color)] outline-none focus:border-[var(--theme)] transition-colors" />
            </div>
            <div>
              <label className="text-base font-medium block mb-2 text-[var(--text-color)]">Comment</label>
              <input type="text" placeholder="Comment" value={comment} onChange={e => setComment(e.target.value)}
                className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-[var(--text-color)] outline-none focus:border-[var(--theme)] transition-colors" />
            </div>
            <div>
              <label className="text-base font-medium block mb-2 text-[var(--text-color)]">Upload Document</label>
              <input ref={fileRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={e => e.target.files[0] && setUploadedFile(e.target.files[0])} />
              <button type="button" onClick={() => fileRef.current?.click()} className="w-full flex items-center justify-center gap-2 border border-[var(--border-color)] hover:border-[var(--theme)] rounded-xl py-3 px-4 text-[var(--text-color)] opacity-70 hover:opacity-100 transition-all">
                <img src={uploadDocumentIcon} alt="Upload" className="w-5 h-5" />
                <span>{uploadedFile ? uploadedFile.name : 'Click to Upload'}</span>
              </button>
            </div>
            {/* QR + Wallet Address */}
            <div className="flex flex-col items-center gap-3">
              <img src="https://mt5.neptunefxcrm.com/PaymentLogoImage/638991296573891092.png" alt="QR Code" className="object-contain w-[40%]" />
              <div className="w-full flex flex-col items-center">
                <span className="text-sm font-medium mb-1 text-[var(--text-color)]">Wallet Address</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono break-all text-[var(--text-color)]">0x149EfbaE3B42441337621B7F17FC705b5507C942</span>
                  <button className="shrink-0 opacity-70 hover:opacity-100 transition-opacity" onClick={() => navigator.clipboard.writeText('0x149EfbaE3B42441337621B7F17FC705b5507C942')}>
                    <Copy size={15} />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Terms & Submit */}
        <label className="flex items-center gap-2 mt-4 cursor-pointer">
          <input type="checkbox" id="mobile-terms" checked={isAgreed} onChange={e => setIsAgreed(e.target.checked)} className="w-4 h-4 accent-[var(--theme)]" />
          <span className="text-sm text-[var(--text-color)] opacity-80">Yes, I agreed to the <span className="text-[var(--theme)] cursor-pointer hover:underline">Terms & Conditions</span></span>
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
          <WalletDepositTable data={currentItems} sortConfig={sortConfig} onSort={onSort} isMobile={true} />
        </div>
      </div>
    </div>
  );
};

export default MobileWalletDeposit;
