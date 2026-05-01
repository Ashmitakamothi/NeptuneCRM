import React, { useState, useRef } from 'react';
import { Home, ChevronRight, Info, ShieldCheck, Lock, EyeOff, Wallet, Percent, Clock, BadgeDollarSign, ArrowLeft, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import WalletDepositTable from './WalletDepositTable';
import { useRealtimeJson } from '../hooks/useRealtimeJson';
import { endpoints } from '../api/endpoints';
import DashboardHeader from './DashboardHeader';
import MobileWalletDeposit from './MobileWalletDeposit';

import bep20Img from '../assets/BEP_20.jpg';
import trc20Img from '../assets/TRC20.png';
import teriopayImg from '../assets/teriopay.png';
import bankImg from '../assets/bank.png';
import zaropayImg from '../assets/zaropay.png';
import upiImg from '../assets/upiLogo.png';
import uploadDocumentIcon from '../assets/Upload_Document_icon.svg';

const TRANSLATIONS = {
  EN: { 
    news: 'News', userDashboard: 'User Dashboard', ibDashboard: 'IB Dashboard',
    deposit: 'Deposit', breadcrumb: 'Deposit', selectPaymentMethod: 'Select Payment Method',
    secureEncrypted: 'All transactions are encrypted and secure',
    processingTime: 'Processing Time:', fee: 'Fee:', minMax: 'Min / Max:',
    depositWith: 'Deposit With', securityProtection: 'Security and Protection',
    sslTitle: '256-bit SSL Encryption', sslDesc: 'Your data is protected by bank-level encryption',
    secureTitle: 'Secure Transactions', secureDesc: 'All transactions are encrypted and protected from unauthorized access',
    privacyTitle: 'Privacy Protected', privacyDesc: 'Your financial information is never stored on our servers',
    walletBalance: 'Wallet Balance', transactionFees: 'Transaction Fees', processingTimeLabel: 'Processing Time:',
    minDeposit: 'Minimum Deposit', maxDeposit: 'Maximum Deposit',
    approved: 'Approved', pending: 'Pending', rejected: 'Rejected',
    securePayment: 'Secure Payment', secureTerio: 'Secure Teriopay payment',
    secureBank: 'Secure Bank Transfer payment', secureZaro: 'Secure ZaroPay_USDT payment',
    secureUPI: 'Secure UPI payment', footerInfo: 'All payment methods are secured with industry-standard encryption. Processing times may vary based on your bank or payment provider.',
    itemsPerPage: '/ Page'
  },
  HI: {
    news: 'समाचार', userDashboard: 'यूजर डैशबोर्ड', ibDashboard: 'आईबी डैशबोर्ड',
    deposit: 'जमा', breadcrumb: 'जमा', selectPaymentMethod: 'भुगतान विधि चुनें',
    secureEncrypted: 'सभी लेन-देन एन्क्रिप्टेड और सुरक्षित हैं',
    processingTime: 'प्रोसेसिंग समय:', fee: 'शुल्क:', minMax: 'न्यूनतम/अधिकतम:',
    depositWith: 'जमा करें', securityProtection: 'सुरक्षा और संरक्षण',
    sslTitle: '256-बिट SSL एन्क्रिप्शन', sslDesc: 'आपका डेटा बैंक-स्तरीय एन्क्रिप्शन से सुरक्षित है',
    secureTitle: 'सुरक्षित लेन-देन', secureDesc: 'सभी लेन-देन एन्क्रिप्टेड हैं और अनधिकृत पहुंच से सुरक्षित हैं',
    privacyTitle: 'गोपनीयता सुरक्षित', privacyDesc: 'आपकी वित्तीय जानकारी हमारे सर्वर पर कभी संग्रहीत नहीं होती',
    walletBalance: 'वॉलेट बैलेंस', transactionFees: 'लेन-देन शुल्क', processingTimeLabel: 'प्रोसेसिंग समय:',
    minDeposit: 'न्यूनतम जमा', maxDeposit: 'अधिकतम जमा',
    approved: 'स्वीकृत', pending: 'लंबित', rejected: 'अस्वीकृत',
    securePayment: 'सुरक्षित भुगतान', secureTerio: 'सुरक्षित Teriopay भुगतान',
    secureBank: 'सुरक्षित बैंक ट्रांसफर भुगतान', secureZaro: 'सुरक्षित ZaroPay_USDT भुगतान',
    secureUPI: 'सुरक्षित UPI भुगतान', footerInfo: 'सभी भुगतान विधियां उद्योग-मानक एन्क्रिप्शन के साथ सुरक्षित हैं। प्रोसेसिंग समय आपके बैंक या भुगतान प्रदाता के आधार पर भिन्न हो सकता है।',
    itemsPerPage: '/ पेज'
  },
};

const WalletDepositPage = ({ onNavigate }) => {
  const { language } = useLanguage();
  const t = (key) => TRANSLATIONS[language]?.[key] || key;

  const PAYMENT_METHODS = [
    { id: 'bep20',   name: 'USDT_BEP20',   subtext: t('securePayment'), time: '24 H', fee: '0 %', minMax: '$10 - $500000', img: bep20Img },
    { id: 'trc20',   name: 'USDT_TRC20',   subtext: t('securePayment'), time: '1 H',  fee: '0 %', minMax: '$10 - $500000', img: trc20Img },
    { id: 'terio',   name: 'Teriopay',     subtext: t('secureTerio'),   time: '24 H', fee: '0 %', minMax: '$10 - $500000', img: teriopayImg },
    { id: 'bank',    name: 'Bank Transfer', subtext: t('secureBank'),    time: '2 H',  fee: '0 %', minMax: '$10 - $500000', img: bankImg },
    { id: 'zaro',    name: 'ZaroPay_USDT', subtext: t('secureZaro'),    time: '22 H', fee: '2 %', minMax: '$10 - $500000', img: zaropayImg },
    { id: 'upi',     name: 'UPI',          subtext: t('secureUPI'),     time: '24 H', fee: '0 %', minMax: '$10 - $500000', img: upiImg },
  ];

  const [filterStatus, setFilterStatus] = useState('Approved');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isRowsMenuOpen, setIsRowsMenuOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'requestDate', direction: 'desc' });

  // State for Payment Flow
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [upiId, setUpiId] = useState('');
  const [comment, setComment] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [currency, setCurrency] = useState('INR (India)');
  const [zaroStep, setZaroStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);

  const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    if (file) setter(file);
  };

  React.useEffect(() => {
    setZaroStep(1);
  }, [selectedMethod]);

  const { data: realData } = useRealtimeJson(endpoints.deposits, {
    enabled: Boolean(endpoints.deposits),
  });

  const rawData = React.useMemo(() => {
    const data = realData?.data || realData || {};
    return data.depositList || data.deposits || [];
  }, [realData]);

  const summaryData = React.useMemo(() => {
    const d = realData?.data || realData || {};
    return {
      balance: d.walletBalance || d.balance || '$ 6930',
      fees: d.transactionFees || '0 %',
      processing: d.processingTime || '24 H',
      min: d.minDeposit || '$ 10',
      max: d.maxDeposit || '$ 500000'
    };
  }, [realData]);

  const summaryCards = [
    { labelKey: 'walletBalance',      value: summaryData.balance,    icon: <Wallet size={20} />,          iconBg: 'bg-[#3B1919]', iconColor: 'text-[#E53E3E]' },
    { labelKey: 'transactionFees',    value: summaryData.fees,       icon: <Percent size={20} />,         iconBg: 'bg-[#1a1535]', iconColor: 'text-[#9d6bff]' },
    { labelKey: 'processingTimeLabel',value: summaryData.processing, icon: <Clock size={20} />,           iconBg: 'bg-[#0e2535]', iconColor: 'text-[#4dabf7]' },
    { labelKey: 'minDeposit',         value: summaryData.min,        icon: <BadgeDollarSign size={20} />, iconBg: 'bg-[#4A2D23]', iconColor: 'text-[#DD6B20]' },
    { labelKey: 'maxDeposit',         value: summaryData.max,        icon: <BadgeDollarSign size={20} />, iconBg: 'bg-[#123620]', iconColor: 'text-[#38A169]' },
  ];

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredData = React.useMemo(() => {
    let items = rawData.filter(item =>
      filterStatus === 'All' || (item.status || '').toLowerCase() === filterStatus.toLowerCase()
    );

    if (sortConfig.key) {
      items.sort((a, b) => {
        const aValue = a[sortConfig.key] === '--' ? '' : a[sortConfig.key];
        const bValue = b[sortConfig.key] === '--' ? '' : b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return items;
  }, [rawData, filterStatus, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col w-full animate-fade-in">

      {/* ════════ MOBILE VIEW (hidden on lg+) ════════ */}
      <div className="block lg:hidden">
        <MobileWalletDeposit
          onNavigate={onNavigate}
          PAYMENT_METHODS={PAYMENT_METHODS}
          summaryData={summaryData}
          currentItems={currentItems}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      </div>

      {/* ════════ DESKTOP VIEW (hidden on mobile) ════════ */}
      <div className="hidden lg:block">

      <DashboardHeader 
        title={t('deposit')}
        breadcrumbs={[{ title: t('breadcrumb'), active: true }]}
        onNavigate={onNavigate}
        activeTab="User Dashboard"
      />


      {/* ── Summary Cards ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-0 mb-8 border border-[var(--border-color)] rounded-[10px] overflow-hidden divide-x divide-[var(--border-color)]">
        {summaryCards.map((card, i) => (
          <div key={i} className="flex items-center gap-3 px-5 py-4">
            <div className={`w-11 h-11 rounded-[10px] flex items-center justify-center shrink-0 ${card.iconBg} ${card.iconColor}`}>
                {card.icon}
              </div>
            <div className="flex flex-col">
              <span className="text-[18px] font-bold text-[var(--text-color)] leading-tight">{card.value}</span>
              <span className="text-[12px] text-[#8e9d9b] mt-0.5">{t(card.labelKey)}</span>
            </div>
          </div>
        ))}
      </div>


      {/* ── Main Box: Grid or Details ─────────────────────────── */}
      <div className="border border-[var(--border-color)] rounded-[10px] p-6 mb-6">
        {!selectedMethod ? (
          /* GRID VIEW */
          <>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-[15px] font-bold text-[var(--text-color)]">{t('selectPaymentMethod')}</h2>
              <div className="flex items-center gap-1.5 text-[11px] text-[#8e9d9b]">
                <Info size={12} />
                {t('secureEncrypted')}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PAYMENT_METHODS.map((m) => (
                <div key={m.id} className="flex flex-col bg-[var(--card-bg)] p-4 rounded-[10px] border border-[var(--border-color)] hover:border-[var(--theme)] transition-all relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-[var(--theme)] before:opacity-0 hover:before:opacity-100 before:transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full overflow-hidden bg-[var(--sub-bg)] border border-[var(--border-color)] shrink-0">
                        <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-[var(--text-color)]">{m.name}</p>
                        <p className="text-[10px] text-[#8e9d9b]">{m.subtext}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800]"></span>
                      <span className="text-[11px] font-bold text-[var(--text-color)]">{m.time}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 text-[12px] mb-4">
                    <div className="flex justify-between"><span className="text-[#8e9d9b]">{t('processingTime')}</span><span className="text-[var(--text-color)]">{m.time}</span></div>
                    <div className="flex justify-between"><span className="text-[#8e9d9b]">{t('fee')}</span><span className="text-[var(--text-color)]">{m.fee}</span></div>
                    <div className="flex justify-between"><span className="text-[#8e9d9b]">{t('minMax')}</span><span className="text-[var(--text-color)]">{m.minMax}</span></div>
                  </div>

                  <button 
                    onClick={() => setSelectedMethod(m)}
                    className="w-full py-2 bg-primary hover:opacity-90 border-none text-white font-bold text-[12px] transition-all shadow-md"
                  >
                    {t('depositWith')} {m.name}
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-1.5 mt-5 text-[#8e9d9b] text-[11px]">
              <Info size={12} />
              {t('footerInfo')}
            </div>
          </>
        ) : (
          /* DETAIL VIEW (Unified Box inside the same container) */
          <div className="flex flex-col gap-6">
            {/* Detail Header */}
            <div className="flex items-center justify-between mb-4 pb-4">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSelectedMethod(null)}
                  className="p-1.5 rounded-full hover:bg-white/5 text-[var(--text-color)] transition-all"
                >
                  <ArrowLeft size={22} />
                </button>
                <h2 className="text-[18px] font-bold text-[var(--text-color)]">Payment Details</h2>
              </div>
              
              <div className="flex items-center gap-3 bg-[var(--sub-bg)] px-4 py-2 rounded-[10px] border border-[var(--border-color)]">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-white flex items-center justify-center p-1">
                  <img src={selectedMethod.img} alt={selectedMethod.name} className="w-full h-full object-contain" />
                </div>
                <span className="text-[14px] font-bold text-[var(--text-color)]">{selectedMethod.name}</span>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content Area (Form/QR) */}
              <div className="flex-1 bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[12px] p-8">
                {selectedMethod.id === 'bank' ? (
                  /* BANK TRANSFER SPECIFIC LAYOUT */
                  <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Currency */}
                      <div className="flex flex-col gap-2">
                         <label className="text-[14px] font-bold text-[var(--text-color)]">Currency</label>
                         <div className="relative">
                            <select 
                              value={currency}
                              onChange={(e) => setCurrency(e.target.value)}
                              className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] py-3.5 px-4 text-[15px] text-[var(--text-color)] focus:border-[#158B86] outline-none transition-colors appearance-none"
                            >
                               <option>INR (India)</option>
                               <option>USD (International)</option>
                            </select>
                            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-color)] opacity-60 pointer-events-none" />
                         </div>
                      </div>
                      {/* Where to Deposit */}
                      <div className="flex flex-col gap-2">
                         <label className="text-[14px] font-bold text-[var(--text-color)]">Where to Deposit</label>
                         <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#158B86]">
                               <Wallet size={18} />
                            </div>
                            <div className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] py-3.5 pl-11 pr-10 text-[15px] text-[var(--text-color)] flex justify-between items-center cursor-pointer">
                               <span>Wallet <span className="opacity-60">$0</span></span>
                               <ChevronDown size={16} className="opacity-60" />
                            </div>
                         </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 max-w-[400px]">
                       <label className="text-[14px] font-bold text-[var(--text-color)]">Deposit Amount<span className="text-[#158B86] text-[13px] ml-2">($1 = 94 INR)</span></label>
                       <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-color)] opacity-60 text-[13px] border-r border-[var(--border-color)] pr-3">INR</span>
                          <input 
                            type="number" 
                            placeholder="0"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                            className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] py-3.5 pl-14 pr-20 text-[15px] text-[var(--text-color)] focus:border-[#158B86] outline-none transition-colors font-mono"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-color)] opacity-60 text-[13px] font-bold">$ 0.00</span>
                       </div>
                    </div>

                    <div className="flex flex-col gap-2 max-w-[400px]">
                       <label className="text-[14px] font-bold text-[var(--text-color)]">UTR Reference Number</label>
                       <input 
                         type="text" 
                         placeholder="Please enter UTR Reference Number"
                         value={transactionId}
                         onChange={(e) => setTransactionId(e.target.value)}
                         className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] py-3.5 px-4 text-[15px] text-[var(--text-color)] focus:border-[#158B86] outline-none transition-colors"
                       />
                    </div>

                    <div className="flex flex-col gap-2 mb-6">
                      <label className="text-[14px] font-bold text-[var(--text-color)]"><span className="text-[#E53E3E] mr-1">*</span>Upload Document</label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,application/pdf"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, setUploadedFile)}
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full max-w-[400px] flex items-center justify-center gap-3 bg-[var(--sub-bg)] border border-[var(--border-color)] hover:border-[#158B86] rounded-[8px] py-3 px-4 text-[13px] text-[var(--text-color)] opacity-70 hover:opacity-100 transition-all"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        {uploadedFile ? uploadedFile.name : 'Click to Upload'}
                      </button>
                    </div>

                    {/* Bank Account Details */}
                    <div className="grid grid-cols-2 gap-y-4 gap-x-12 mt-2">
                       <div className="flex flex-col"><span className="text-[12px] text-[var(--text-color)] font-bold">Bank Name: <span className="text-[#8e9d9b] font-medium ml-1">HDFC</span></span></div>
                       <div className="flex flex-col"><span className="text-[12px] text-[var(--text-color)] font-bold">Account Holder: <span className="text-[#8e9d9b] font-medium ml-1">Neptune</span></span></div>
                       <div className="flex flex-col"><span className="text-[12px] text-[var(--text-color)] font-bold">Account Number: <span className="text-[#8e9d9b] font-medium ml-1">123456</span></span></div>
                       <div className="flex flex-col"><span className="text-[12px] text-[var(--text-color)] font-bold">IFSC Code: <span className="text-[#8e9d9b] font-medium ml-1">HDFCBANK</span></span></div>
                       <div className="flex flex-col"><span className="text-[12px] text-[var(--text-color)] font-bold">Branch: <span className="text-[#8e9d9b] font-medium ml-1">Mumbai</span></span></div>
                    </div>

                    <div className="border-t border-[var(--border-color)] pt-6 mt-2">
                       <div className="flex items-center gap-3 mb-6">
                          <input 
                            type="checkbox" 
                            id="terms"
                            checked={isAgreed}
                            onChange={(e) => setIsAgreed(e.target.checked)}
                            className="w-4 h-4 rounded border-[var(--border-color)] text-[#158B86] focus:ring-[#158B86]"
                          />
                          <label htmlFor="terms" className="text-[13px] text-[#8e9d9b]">
                             Yes, I agreed to the <span className="text-[#158B86] cursor-pointer hover:underline">Terms & Conditions</span>
                          </label>
                       </div>

                       <button 
                         className="w-full py-3.5 rounded-[8px] bg-primary text-white font-bold text-[15px] transition-all shadow-[0_4px_15px_rgba(21,139,134,0.4)]"
                       >
                          SUBMIT
                       </button>
                    </div>
                  </div>
                ) : (
                  /* STANDARD LAYOUT (for Crypto, UPI, etc.) */
                  <div className="w-full">
                    {selectedMethod.id === 'zaro' && zaroStep === 2 ? (
                      /* ZAROPAY STEP 2: QR VIEW */
                      <div className="flex flex-col gap-8">
                        {/* Top row: readonly fields to match image */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="flex flex-col gap-2">
                             <label className="text-[14px] font-bold text-[var(--text-color)]">Deposit Amount In USD</label>
                             <div className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] py-3.5 px-4 text-[15px] text-[var(--text-color)] opacity-80">
                                $ {depositAmount || '0'}
                             </div>
                          </div>
                          <div className="flex flex-col gap-2">
                             <label className="text-[14px] font-bold text-[var(--text-color)]">Where to Deposit</label>
                             <div className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] py-3.5 px-4 text-[15px] text-[var(--text-color)] flex justify-between items-center opacity-80">
                                <span>Wallet <span className="opacity-60">$0</span></span>
                                <ChevronDown size={16} className="opacity-60" />
                             </div>
                          </div>
                        </div>

                        {/* Bottom row: details and QR */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                           <div className="flex flex-col gap-5">
                              <div className="flex items-center gap-4">
                                 <span className="text-[14px] font-bold text-[var(--text-color)] w-[120px] shrink-0">Address to Pay:</span>
                                 <span className="text-[14px] text-[var(--text-color)] break-all font-mono">TJMU7yvcDJoFFvNucqMto8161Wya5pkcGr</span>
                              </div>
                              <div className="flex items-center gap-4">
                                 <span className="text-[14px] font-bold text-[var(--text-color)] w-[120px] shrink-0">Order Id:</span>
                                 <span className="text-[14px] text-[var(--text-color)] break-all font-mono">ala82a3a-51f5-49de-b6cd-4d41ad117ec5</span>
                              </div>
                              <div className="flex items-center gap-4">
                                 <span className="text-[14px] font-bold text-[var(--text-color)] w-[120px] shrink-0">Amount:</span>
                                 <span className="text-[14px] text-[var(--text-color)]">$ {depositAmount || '0'}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                 <span className="text-[14px] font-bold text-[var(--text-color)] w-[120px] shrink-0">Amount to Pay:</span>
                                 <span className="text-[14px] font-bold text-[var(--text-color)]">$ {depositAmount ? Number(depositAmount).toFixed(2) : '0.00'}</span>
                              </div>

                              <button 
                                className="w-fit px-14 py-3 rounded-[8px] bg-primary text-white font-bold text-[14px] transition-all mt-6 shadow-[0_4px_15px_rgba(21,139,134,0.4)]"
                              >
                                 VERIFY
                              </button>
                           </div>

                           <div className="flex flex-col items-center justify-center">
                              <div className="bg-white p-3 rounded-[8px] shadow-xl w-full max-w-[220px]">
                                 <img 
                                   src="https://staging.zaropay.com/qr_image/ala82a3a-51f5-49de-b6cd-4d41ad117ec5.svg" 
                                   alt="Payment QR" 
                                   className="w-full h-auto object-contain"
                                 />
                              </div>
                           </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                         {/* Left Column: Form Fields */}
                         <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                               <label className="text-[14px] font-bold text-[var(--text-color)]">Deposit Amount In USD</label>
                               <div className="relative">
                                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-color)] opacity-60">$</span>
                                  <input 
                                    type="number" 
                                    placeholder="0"
                                    value={depositAmount}
                                    onChange={(e) => setDepositAmount(e.target.value)}
                                    className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] py-3.5 pl-8 pr-4 text-[15px] text-[var(--text-color)] focus:border-[#158B86] outline-none transition-colors"
                                  />
                               </div>
                            </div>

                            {selectedMethod.id === 'upi' && (
                               <>
                                  <div className="flex flex-col gap-2">
                                     <label className="text-[14px] font-bold text-[var(--text-color)]">UTR Reference Number</label>
                                     <input 
                                       type="text" 
                                       placeholder="Please enter UTR Reference Number"
                                       value={transactionId}
                                       onChange={(e) => setTransactionId(e.target.value)}
                                       className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] py-3.5 px-4 text-[15px] text-[var(--text-color)] focus:border-[#158B86] outline-none transition-colors"
                                     />
                                  </div>

                                  <div className="flex flex-col gap-2">
                                     <div className="flex flex-col">
                                        <label className="text-[14px] font-bold text-[var(--text-color)]">UPI Id</label>
                                        <span className="text-[11px] text-[#E53E3E] font-medium">Please enter UPI Id from where payment is done.</span>
                                     </div>
                                     <input 
                                       type="text" 
                                       placeholder="Upi Id"
                                       value={upiId}
                                       onChange={(e) => setUpiId(e.target.value)}
                                       className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] py-3.5 px-4 text-[15px] text-[var(--text-color)] focus:border-[#158B86] outline-none transition-colors"
                                     />
                                  </div>

                                  <div className="flex flex-col gap-2">
                                      <label className="text-[14px] font-bold text-[var(--text-color)]">Comment</label>
                                      <input 
                                        type="text" 
                                        placeholder="Comment"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] py-3.5 px-4 text-[15px] text-[var(--text-color)] focus:border-[#158B86] outline-none transition-colors"
                                      />
                                   </div>

                                   <div className="flex flex-col gap-2">
                                      <label className="text-[14px] font-bold text-[var(--text-color)]">Upload</label>
                                      <input
                                        ref={fileInputRef2}
                                        type="file"
                                        accept="image/*,application/pdf"
                                        className="hidden"
                                        onChange={(e) => handleFileChange(e, setUploadedFile)}
                                      />
                                      <button
                                        type="button"
                                        onClick={() => fileInputRef2.current?.click()}
                                        className="w-full flex items-center justify-center gap-3 bg-[var(--sub-bg)] border border-[var(--border-color)] hover:border-[#158B86] rounded-[8px] py-3.5 px-4 text-[14px] text-[var(--text-color)] opacity-70 hover:opacity-100 transition-all"
                                      >
                                         <img src={uploadDocumentIcon} alt="Upload" className="w-[18px] h-[18px]" />
                                         {uploadedFile ? uploadedFile.name : 'Click to Upload'}
                                      </button>
                                   </div>
                               </>
                            )}

                            {!['terio', 'zaro', 'upi'].includes(selectedMethod.id) && (
                               <>
                                  <div className="flex flex-col gap-2">
                                     <label className="text-[14px] font-bold text-[var(--text-color)]"><span className="text-[#E53E3E] mr-1">*</span>Transaction ID</label>
                                     <input 
                                       type="text" 
                                       placeholder="Transaction ID"
                                       value={transactionId}
                                       onChange={(e) => setTransactionId(e.target.value)}
                                       className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] py-3.5 px-4 text-[15px] text-[var(--text-color)] focus:border-[#158B86] outline-none transition-colors"
                                     />
                                  </div>

                                  <div className="flex flex-col gap-2">
                                     <label className="text-[14px] font-bold text-[var(--text-color)]">Comment</label>
                                     <input 
                                       type="text" 
                                       placeholder="Comment"
                                       value={comment}
                                       onChange={(e) => setComment(e.target.value)}
                                       className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] py-3.5 px-4 text-[15px] text-[var(--text-color)] focus:border-[#158B86] outline-none transition-colors"
                                     />
                                  </div>

                                  <div className="flex flex-col gap-2">
                                      <label className="text-[14px] font-bold text-[var(--text-color)]">Upload Document</label>
                                      <input
                                        ref={fileInputRef3}
                                        type="file"
                                        accept="image/*,application/pdf"
                                        className="hidden"
                                        onChange={(e) => handleFileChange(e, setUploadedFile)}
                                      />
                                      <button
                                        type="button"
                                        onClick={() => fileInputRef3.current?.click()}
                                        className="w-full flex items-center justify-center gap-3 bg-[var(--sub-bg)] border border-[var(--border-color)] hover:border-[#158B86] rounded-[8px] py-3.5 px-4 text-[14px] text-[var(--text-color)] opacity-70 hover:opacity-100 transition-all"
                                      >
                                         <img src={uploadDocumentIcon} alt="Upload" className="w-[18px] h-[18px]" />
                                         {uploadedFile ? uploadedFile.name : 'Click to Upload'}
                                      </button>
                                   </div>
                               </>
                            )}

                            <div className="flex items-center gap-3 mt-2">
                               <input 
                                 type="checkbox" 
                                 id="terms"
                               checked={isAgreed}
                               onChange={(e) => setIsAgreed(e.target.checked)}
                               className="w-4 h-4 rounded border-[var(--border-color)] text-[#158B86] focus:ring-[#158B86]"
                             />
                             <label htmlFor="terms" className="text-[13px] text-[#8e9d9b]">
                                Yes, I agreed to the <span className="text-[#158B86] cursor-pointer hover:underline">Terms & Conditions</span>
                             </label>
                          </div>

                          <button 
                            onClick={() => {
                              if (selectedMethod.id === 'zaro') {
                                setZaroStep(2);
                              }
                            }}
                            className="w-full py-3.5 rounded-[8px] bg-primary text-white font-bold text-[15px] transition-all mt-4 shadow-[0_4px_15px_rgba(21,139,134,0.4)]"
                          >
                             {selectedMethod.id === 'zaro' ? 'NEXT' : 'SUBMIT'}
                          </button>
                       </div>

                       {/* Right Column: Where to Deposit / QR Code */}
                       <div className="flex flex-col items-center">
                          <div className="flex flex-col gap-2 w-full mb-8">
                             <label className="text-[14px] font-bold text-[var(--text-color)]">Where to Deposit</label>
                             <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#158B86]">
                                   <Wallet size={18} />
                                </div>
                                <div className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] py-3.5 pl-11 pr-10 text-[15px] text-[var(--text-color)] flex justify-between items-center cursor-pointer">
                                   <span>Wallet <span className="opacity-60">$0</span></span>
                                   <ChevronDown size={16} className="opacity-60" />
                                </div>
                             </div>
                          </div>

                          {!['terio', 'zaro'].includes(selectedMethod.id) && (
                             <div className="flex flex-col items-center w-full">
                                <div className="bg-white p-2 rounded-[12px] shadow-lg mb-6 w-full max-w-[280px]">
                                   <img 
                                     src="https://mt5.neptunefxcrm.com/PaymentLogoImage/638991296573891892.png" 
                                     alt="Payment QR" 
                                     className="w-full h-auto object-contain"
                                   />
                                </div>

                                 {selectedMethod.id !== 'upi' && (
                                    <div className="text-center w-full max-w-[320px]">
                                       <p className="text-[13px] font-bold text-[var(--text-color)] mb-2">Wallet Address</p>
                                       <div className="flex items-center gap-2 bg-[var(--sub-bg)] px-3 py-2.5 rounded-[8px] border border-[var(--border-color)]">
                                          <span className="text-[11px] text-[var(--text-color)] opacity-80 break-all font-mono">0x149EFbaE3B42441337621B7F17F C705b5507C942</span>
                                          <button className="text-[#8e9d9b] hover:text-white transition-colors shrink-0">
                                             <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                             </svg>
                                          </button>
                                       </div>
                                    </div>
                                 )}
                             </div>
                          )}
                       </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Sidebar: Summary */}
            <div className="w-full lg:w-[350px] flex flex-col gap-6">
              <div className="bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[12px] p-6 flex flex-col">
                 <h3 className="text-[18px] font-bold text-[var(--text-color)] mb-6">Transaction Summary</h3>
                 
                 <div className="flex flex-col gap-4 mb-6">
                    <div className="flex justify-between items-center">
                       <span className="text-[14px] text-[#8e9d9b]">Deposit Amount:</span>
                       <span className="text-[14px] font-bold text-[var(--text-color)]">${depositAmount || '0'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-[14px] text-[#8e9d9b]">Processing Fee:</span>
                       <span className="text-[14px] font-bold text-[var(--text-color)]">$0.00</span>
                    </div>
                    <div className="border-t border-[var(--border-color)] pt-4 flex justify-between items-center">
                       <span className="text-[16px] font-bold text-[var(--text-color)]">Total Amount:</span>
                       <span className="text-[18px] font-bold text-[#4caf50]">${depositAmount || '0'}</span>
                    </div>
                 </div>

                 {/* Important Information */}
                 <div className="pt-6 border-t border-[var(--border-color)]">
                       <div className="flex items-start gap-2 text-[#158B86] mb-4">
                          <Info size={16} className="shrink-0 mt-0.5" />
                          <span className="text-[13px] font-bold text-[#158B86]">Important Information</span>
                       </div>
                    <ul className="flex flex-col gap-3">
                       <li className="flex items-start gap-2 text-[12.5px] text-[#158B86] leading-relaxed">
                          <span className="text-[#158B86] font-bold text-[14px] mt-2 leading-none">•</span>
                          Funds will be available instantly after successful payment
                       </li>
                       <li className="flex items-start gap-2 text-[12.5px] text-[#158B86] leading-relaxed">
                          <span className="text-[#158B86] font-bold text-[14px] mt-2 leading-none">•</span>
                          All transactions are encrypted with SSL technology
                       </li>
                       <li className="flex items-start gap-2 text-[12.5px] text-[#158B86] leading-relaxed">
                          <span className="text-[#158B86] font-bold text-[14px] mt-2 leading-none">•</span>
                          Transaction fees may apply based on payment method
                       </li>
                    </ul>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

      {/* ── Table Container ────────────────────────────────────────── */}
      <div className="border border-[var(--border-color)] rounded-[10px] p-4 flex flex-col gap-4 mt-6">
        <div className="flex items-center justify-between gap-5 mb-2">
          <div className="bg-[var(--sub-bg)] p-1.5 rounded-[10px] flex items-center gap-1 overflow-x-auto hide-scrollbar">
            {['Approved', 'Pending', 'Rejected'].map(status => (
              <button key={status} onClick={() => setFilterStatus(status)}
                className={`whitespace-nowrap px-6 py-2 rounded-[8px] text-[14px] font-bold transition-all ${filterStatus === status ? 'bg-[#158B86] text-white shadow-[0_2px_8px_rgba(21,139,134,0.3)]' : 'text-[var(--text-color)] hover:text-[var(--text-color)]/80 bg-transparent'}`}
              >{t(status.toLowerCase())}</button>
            ))}
          </div>
        </div>

        <div className="border border-[var(--border-color)]/50 rounded-[8px] overflow-hidden">
          <WalletDepositTable 
            data={currentItems} 
            filterStatus={filterStatus} 
            sortConfig={sortConfig} 
            onSort={handleSort} 
          />
        </div>

        <div className="flex items-center justify-between px-1">
          <div className="relative">
            <button 
              onClick={() => setIsRowsMenuOpen(!isRowsMenuOpen)}
              className="flex items-center justify-between w-[120px] px-3 py-2 bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[5px] text-[var(--text-color)] text-[13px] gap-2 hover:opacity-80 transition-all"
            >
              <span>{itemsPerPage} {t('itemsPerPage')}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>

            {isRowsMenuOpen && (
              <div className="absolute bottom-full left-0 mb-1 w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[5px] shadow-lg z-50 overflow-hidden">
                {[10, 20, 50, 100].map(size => (
                  <button
                    key={size}
                    onClick={() => {
                      setItemsPerPage(size);
                      setCurrentPage(1);
                      setIsRowsMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-[13px] transition-colors ${itemsPerPage === size ? 'bg-[#158B86] text-white' : 'text-[#8e9d9b] hover:bg-[var(--sub-bg)] hover:text-[var(--text-color)]'}`}
                  >
                    {size} {t('itemsPerPage')}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center justify-center w-8 h-8 rounded-[4px] transition-colors ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'text-[#8e9d9b] hover:text-[var(--text-color)] hover:bg-[var(--sub-bg)]'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button 
                key={page} 
                onClick={() => handlePageChange(page)}
                className={`flex items-center justify-center w-8 h-8 rounded-[4px] font-bold text-[12px] transition-all ${currentPage === page ? 'text-white bg-[#158B86] shadow-[0_2px_8px_rgba(21,139,134,0.4)]' : 'text-[#8e9d9b] hover:text-[var(--text-color)] hover:bg-[var(--sub-bg)]'}`}
              >
                {page}
              </button>
            ))}
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center justify-center w-8 h-8 rounded-[4px] transition-colors ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'text-[#8e9d9b] hover:text-[var(--text-color)] hover:bg-[var(--sub-bg)]'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Security Footer ────────────────────────────────────────── */}
      <div className="w-full mt-6 border border-[var(--border-color)] rounded-[10px] p-6">
        <h2 className="text-[17px] font-bold text-[var(--text-color)] mb-8">{t('securityProtection')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <ShieldCheck size={26} />, color: 'text-[#51CF66]', bg: 'bg-[#51CF66]/10 border-[#51CF66]/20', tKey: 'sslTitle',     dKey: 'sslDesc' },
            { icon: <Lock size={26} />,        color: 'text-[#FFB800]', bg: 'bg-[#FFB800]/10 border-[#FFB800]/20', tKey: 'secureTitle', dKey: 'secureDesc' },
            { icon: <EyeOff size={26} />,      color: 'text-[#9D6BFF]', bg: 'bg-[#9D6BFF]/10 border-[#9D6BFF]/20', tKey: 'privacyTitle',dKey: 'privacyDesc' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-3">
              <div className={`w-14 h-14 rounded-full border flex items-center justify-center ${item.bg} ${item.color}`}>{item.icon}</div>
              <div>
                <h3 className="text-[14px] font-bold text-[var(--text-color)] mb-1">{t(item.tKey)}</h3>
                <p className="text-[12px] text-[#158B86] leading-relaxed">{t(item.dKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      </div>

    </div>
  );
};

export default WalletDepositPage;
