import React, { useState } from 'react';
import { Home, ChevronRight, Info, ShieldCheck, Lock, EyeOff, Wallet, Percent, Clock, BadgeDollarSign, ArrowLeft, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import WalletWithdrawTable from './WalletWithdrawTable';
import { useRealtimeJson } from '../hooks/useRealtimeJson';
import { endpoints } from '../api/endpoints';
import DashboardHeader from './DashboardHeader';

// Reuse images or use relevant ones if available
import bep20Img from '../assets/BEP_20.jpg';
import trc20Img from '../assets/TRC20.png';
import bankImg from '../assets/bank.png';

const TRANSLATIONS = {
  EN: {
    news: 'News', userDashboard: 'User Dashboard', ibDashboard: 'IB Dashboard',
    withdraw: 'Withdraw', breadcrumb: 'Withdraw',
    selectWithdrawMethod: 'Select Withdrawal Method', allWithdrawSecure: 'All withdrawals are processed securely',
    processingTime: 'Processing Time:', fee: 'Fee:', minMax: 'Min / Max:',
    withdrawVia: 'Withdraw Via', securityProtection: 'Security and Protection',
    sslTitle: '256-bit SSL Encryption', sslDesc: 'Your data is protected by bank-level encryption',
    secureTitle: 'Secure Transactions', secureDesc: 'All transactions are encrypted and protected from unauthorized access',
    privacyTitle: 'Privacy Protected', privacyDesc: 'Your financial information is never stored on our servers',
    walletBalance: 'Wallet Balance', transactionFees: 'Transaction Fees', processingTimeLabel: 'Processing Time:',
    minWithdrawal: 'Minimum Withdrawal', maxWithdrawal: 'Maximum Withdrawal',
    approved: 'Approved', pending: 'Pending', rejected: 'Rejected',
    secureTRC: 'Secure USDT_TRC20 withdrawal', secureBank: 'Secure Bank Transfer withdrawal',
    secureBEP: 'Secure USDT_BEP20 withdrawal', secureCash: 'Secure Cash Withdrawal withdrawal',
    footerInfo: 'All withdrawal methods are secured with industry-standard encryption. Processing times may vary based on your bank or payment provider.',
    itemsPerPage: '/ Page'
  },
  HI: {
    news: 'समाचार', userDashboard: 'यूजर डैशबोर्ड', ibDashboard: 'आईबी डैशबोर्ड',
    withdraw: 'निकासी', breadcrumb: 'निकासी',
    selectWithdrawMethod: 'निकासी विधि चुनें', allWithdrawSecure: 'सभी निकासी सुरक्षित रूप से प्रोसेस होती है',
    processingTime: 'प्रोसेसिंग समय:', fee: 'शुल्क:', minMax: 'न्यूनतम/अधिकतम:',
    withdrawVia: 'निकासी करें', securityProtection: 'सुरक्षा और संरक्षण',
    sslTitle: '256-बिट SSL एन्क्रिप्शन', sslDesc: 'आपका डेटा बैंक-स्तरीय एन्क्रिप्शन से सुरक्षित है',
    secureTitle: 'सुरक्षित लेन-देन', secureDesc: 'सभी लेन-देन एन्क्रिप्टेड हैं और अनधिकृत पहुंच से सुरक्षित हैं',
    privacyTitle: 'गोपनीयता सुरक्षित', privacyDesc: 'आपकी वित्तीय जानकारी हमारे सर्वर पर कभी संग्रहीत नहीं होती',
    walletBalance: 'वॉलेट बैलेंस', transactionFees: 'लेन-देन शुल्क', processingTimeLabel: 'प्रोसेसिंग समय:',
    minWithdrawal: 'न्यूनतम निकासी', maxWithdrawal: 'अधिकतम निकासी',
    approved: 'स्वीकृत', pending: 'लंबित', rejected: 'अस्वीकृत',
    secureTRC: 'सुरक्षित USDT_TRC20 निकासी', secureBank: 'सुरक्षित बैंक ट्रांसफर निकासी',
    secureBEP: 'सुरक्षित USDT_BEP20 निकासी', secureCash: 'सुरक्षित नकद निकासी',
    footerInfo: 'सभी निकासी विधियां उद्योग-मानक एन्क्रिप्शन के साथ सुरक्षित हैं। प्रोसेसिंग समय आपके बैंक या भुगतान प्रदाता के आधार पर भिन्न हो सकता है।',
    itemsPerPage: '/ पेज'
  },
};

const SUMMARY_CARDS = [
  { label: 'Wallet Balance',   value: '$ 6930',    icon: <Wallet size={20} />,          iconBg: 'bg-[#3B1919]', iconColor: 'text-[#E53E3E]' },
  { label: 'Transaction Fees', value: 'Free',      icon: <Percent size={20} />,         iconBg: 'bg-[#1a1535]', iconColor: 'text-[#9d6bff]' },
  { label: 'Processing Time:', value: '24 H',      icon: <Clock size={20} />,           iconBg: 'bg-[#0e2535]', iconColor: 'text-[#4dabf7]' },
  { label: 'Minimum Withdrawal', value: '$ 10',    icon: <BadgeDollarSign size={20} />, iconBg: 'bg-[#4A2D23]', iconColor: 'text-[#DD6B20]' },
  { label: 'Maximum Withdrawal', value: '$ 50000', icon: <BadgeDollarSign size={20} />, iconBg: 'bg-[#123620]', iconColor: 'text-[#38A169]' },
];

const WalletWithdrawPage = ({ onNavigate }) => {
  const { language } = useLanguage();
  const t = (key) => TRANSLATIONS[language]?.[key] || key;

  const WITHDRAWAL_METHODS = [
    { id: 'trc20', name: 'USDT_TRC20', subtext: t('secureTRC'), img: trc20Img, processing: '24 H', fee: '0%', minMax: '$10 - $50000' },
    { id: 'bank',  name: 'Bank Transfer', subtext: t('secureBank'), img: bankImg, processing: '24 H', fee: '0%', minMax: '$10 - $50000' },
    { id: 'bep20', name: 'USDT_BEP20', subtext: t('secureBEP'), img: bep20Img, processing: '24 H', fee: '0%', minMax: '$10 - $50000' },
    { id: 'cash',  name: 'Cash Withdrawal', subtext: t('secureCash'), img: bankImg, processing: '24 H', fee: '0%', minMax: '$10 - $50000', isCash: true },
  ];

  const [filterStatus, setFilterStatus] = useState('Approved');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isRowsMenuOpen, setIsRowsMenuOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'requestDate', direction: 'desc' });
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);

  const { data: realData } = useRealtimeJson(endpoints.deposits, {
    enabled: Boolean(endpoints.deposits),
  });

  const rawData = React.useMemo(() => {
    const data = realData?.data || realData || {};
    return data.withdrawalList || data.withdrawals || [];
  }, [realData]);

  const summaryData = React.useMemo(() => {
    const d = realData?.data || realData || {};
    return {
      balance: d.walletBalance || d.balance || '$ 6930',
      fees: d.withdrawalFees || 'Free',
      processing: d.withdrawalProcessingTime || '24 H',
      min: d.minWithdrawal || '$ 10',
      max: d.maxWithdrawal || '$ 50000'
    };
  }, [realData]);



  const summaryCards = [
    { labelKey: 'walletBalance',      value: summaryData.balance,    icon: <Wallet size={20} />,          iconBg: 'bg-[#3B1919]', iconColor: 'text-[#E53E3E]' },
    { labelKey: 'transactionFees',    value: summaryData.fees,       icon: <Percent size={20} />,         iconBg: 'bg-[#1a1535]', iconColor: 'text-[#9d6bff]' },
    { labelKey: 'processingTimeLabel',value: summaryData.processing, icon: <Clock size={20} />,           iconBg: 'bg-[#0e2535]', iconColor: 'text-[#4dabf7]' },
    { labelKey: 'minWithdrawal',      value: summaryData.min,        icon: <BadgeDollarSign size={20} />, iconBg: 'bg-[#4A2D23]', iconColor: 'text-[#DD6B20]' },
    { labelKey: 'maxWithdrawal',      value: summaryData.max,        icon: <BadgeDollarSign size={20} />, iconBg: 'bg-[#123620]', iconColor: 'text-[#38A169]' },
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
        const aValue = a[sortConfig.key] || '';
        const bValue = b[sortConfig.key] || '';
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



  return (
    <div className="flex flex-col w-full animate-fade-in pb-20">
      <DashboardHeader 
        title={t('withdraw')}
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


      {/* ── Select Withdrawal Method ──────────────────────────── */}
      {!selectedMethod ? (
        <div className="border border-[var(--border-color)] rounded-[12px] p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[18px] font-bold text-[var(--text-color)] tracking-tight">{t('selectWithdrawMethod')}</h2>
            <div className="flex items-center gap-2 text-[11px] text-[#8e9d9b] tracking-wider">
              <Info size={14} className="text-[#158B86]" /> {t('allWithdrawSecure')}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {WITHDRAWAL_METHODS.map((method) => (
              <div key={method.id} className="flex flex-col bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[12px] p-5 hover:border-[var(--theme)] transition-all group relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-[var(--theme)] before:opacity-0 hover:before:opacity-100 before:transition-all">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-[var(--sub-bg)] border border-[var(--border-color)] shrink-0 flex items-center justify-center">
                      <img src={method.img} alt={method.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-[var(--text-color)] leading-none">{method.name}</span>
                      <span className="text-[10px] text-[#8e9d9b] mt-1">{method.subtext}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                     <div className="w-1.5 h-1.5 rounded-full bg-[#FFB800]" />
                     <span className="text-[11px] font-bold text-[var(--text-color)] opacity-80">{method.processing}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center text-[12px]">
                    <span className="text-[#8e9d9b]">{t('processingTime')}</span>
                    <span className="text-[var(--text-color)] font-bold">{method.processing}</span>
                  </div>
                  <div className="flex justify-between items-center text-[12px]">
                    <span className="text-[#8e9d9b]">{t('fee')}</span>
                    <span className="text-[var(--text-color)] font-bold">{method.fee}</span>
                  </div>
                  <div className="flex justify-between items-center text-[12px]">
                    <span className="text-[#8e9d9b]">{t('minMax')}</span>
                    <span className="text-[var(--text-color)] font-bold text-[#158B86]">{method.minMax}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedMethod(method)}
                  className="w-full py-2.5 bg-primary hover:opacity-90 border-none text-white text-[13px] font-bold rounded-[6px] transition-all shadow-md"
                >
                  {t('withdrawVia')} {method.name}
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-1.5 mt-5 text-[#8e9d9b] text-[11px]">
            <Info size={12} />
            {t('footerInfo')}
          </div>
        </div>
      ) : (
        <div className="border border-[var(--border-color)] rounded-[12px] p-6 mb-8 flex flex-col">
           <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-3">
                 <button 
                   onClick={() => {
                     setSelectedMethod(null);
                     setWithdrawAmount('');
                     setWalletAddress('');
                     setIsAgreed(false);
                   }}
                   className="text-[#8e9d9b] hover:text-[var(--text-color)] transition-all"
                 >
                    <ArrowLeft size={16} />
                 </button>
                 <h2 className="text-[18px] font-bold text-[var(--text-color)] tracking-tight">Withdrawal Details</h2>
              </div>
              <div className="flex items-center gap-2 bg-[var(--card-bg)] border border-[var(--border-color)] px-3 py-1.5 rounded-[6px]">
                 <img src={selectedMethod.img} alt={selectedMethod.name} className="w-4 h-4 object-contain rounded-full" />
                 <span className="text-[12px] font-medium text-[var(--text-color)]">{selectedMethod.name}</span>
              </div>
           </div>

           <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column: Form Fields */}
              <div className="flex-1 flex flex-col gap-6">
                 {selectedMethod.name === 'Bank Transfer' || selectedMethod.name === 'Cash Withdrawal' ? (
                    <>
                       <div className="flex flex-col md:flex-row gap-5">
                          <div className="flex-1 flex flex-col gap-2">
                             <label className="text-[14px] font-bold text-[var(--text-color)]">Currency</label>
                             <div className="relative">
                                <div className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[8px] py-3.5 pl-4 pr-10 text-[15px] text-[var(--text-color)] flex justify-between items-center cursor-pointer">
                                   <span>INR (India)</span>
                                   <ChevronDown size={16} className="opacity-60 absolute right-4 top-1/2 -translate-y-1/2" />
                                </div>
                             </div>
                          </div>
                          <div className="flex-1 flex flex-col gap-2">
                             <label className="text-[14px] font-bold text-[var(--text-color)]">Withdrawing From</label>
                             <div className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[8px] py-3.5 px-4 text-[15px] text-[var(--text-color)] flex justify-between items-center cursor-pointer">
                                <div className="flex items-center gap-2">
                                   <Wallet size={16} className="opacity-60" />
                                   <span>Wallet <span className="opacity-60">$0</span></span>
                                </div>
                                <ChevronDown size={16} className="opacity-60" />
                             </div>
                          </div>
                       </div>

                       <div className="flex flex-col md:flex-row gap-5">
                          <div className="flex-1 flex flex-col gap-2">
                             <label className="text-[14px] font-bold text-[var(--text-color)]">Withdrawal Amount In <span className="text-[#158B86]">($1 = 90 INR)</span></label>
                             <div className="flex items-center bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[8px] overflow-hidden">
                                <span className="pl-4 text-[var(--text-color)] opacity-60">$</span>
                                <input 
                                  type="number" 
                                  placeholder="0"
                                  value={withdrawAmount}
                                  onChange={(e) => setWithdrawAmount(e.target.value)}
                                  className="w-full bg-transparent py-3.5 pl-2 pr-4 text-[15px] text-[var(--text-color)] outline-none"
                                />
                                <div className="bg-[var(--card-bg)] border-l border-[var(--border-color)] h-full py-3.5 px-4 flex items-center justify-center text-[13px] text-[var(--text-color)] whitespace-nowrap opacity-80">
                                   INR {(withdrawAmount ? (parseFloat(withdrawAmount) * 90).toFixed(2) : '0.00')}
                                </div>
                             </div>
                          </div>
                          <div className="flex-1" />
                       </div>

                       {selectedMethod.name === 'Bank Transfer' ? (
                          <div className="text-[12px] text-[var(--text-color)] opacity-80 mt-1">
                             No banks added yet, please add it from profile Payment settings.
                          </div>
                       ) : (
                          <div className="flex flex-col md:flex-row gap-5">
                             <div className="flex-1 flex flex-col gap-2">
                                <label className="text-[14px] font-bold text-[var(--text-color)]">
                                   <span className="text-[#E53E3E] mr-1">*</span>Mobile Number
                                </label>
                                <input 
                                  type="text" 
                                  placeholder="Mobile Number"
                                  value={walletAddress}
                                  onChange={(e) => setWalletAddress(e.target.value)}
                                  className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[8px] py-3.5 px-4 text-[15px] text-[var(--text-color)] focus:border-[#158B86] outline-none transition-colors"
                                />
                             </div>
                             <div className="flex-1" />
                          </div>
                       )}
                    </>
                 ) : (
                    <>
                       <div className="flex flex-col md:flex-row gap-5">
                          <div className="flex-1 flex flex-col gap-2">
                             <label className="text-[14px] font-bold text-[var(--text-color)]">Withdrawal Amount In USD</label>
                             <div className="flex items-center bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[8px] overflow-hidden">
                                <span className="pl-4 text-[var(--text-color)] opacity-60">$</span>
                                <input 
                                  type="number" 
                                  placeholder="0"
                                  value={withdrawAmount}
                                  onChange={(e) => setWithdrawAmount(e.target.value)}
                                  className="w-full bg-transparent py-3.5 pl-2 pr-4 text-[15px] text-[var(--text-color)] outline-none"
                                />
                             </div>
                          </div>
                          <div className="flex-1 flex flex-col gap-2">
                             <label className="text-[14px] font-bold text-[var(--text-color)]">Withdrawing From</label>
                             <div className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[8px] py-3.5 px-4 text-[15px] text-[var(--text-color)] flex justify-between items-center cursor-pointer">
                                <div className="flex items-center gap-2">
                                   <Wallet size={16} className="opacity-60" />
                                   <span>Wallet <span className="opacity-60">$0</span></span>
                                </div>
                                <ChevronDown size={16} className="opacity-60" />
                             </div>
                          </div>
                       </div>

                       <div className="flex flex-col gap-2">
                          <label className="text-[14px] font-bold text-[var(--text-color)]">
                             <span className="text-[#E53E3E] mr-1">*</span>{`${selectedMethod.name.split('_')[1] || selectedMethod.name} Wallet Address`}
                          </label>
                          <input 
                            type="text" 
                            placeholder={`${selectedMethod.name.split('_')[1] || selectedMethod.name} Wallet Address`}
                            value={walletAddress}
                            onChange={(e) => setWalletAddress(e.target.value)}
                            className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[8px] py-3.5 px-4 text-[15px] text-[var(--text-color)] focus:border-[#158B86] outline-none transition-colors"
                          />
                       </div>
                    </>
                 )}

                 <div className="flex items-center gap-3 mt-2">
                    <input 
                      type="checkbox" 
                      id="terms-withdraw"
                      checked={isAgreed}
                      onChange={(e) => setIsAgreed(e.target.checked)}
                      className="w-4 h-4 rounded-[3px] bg-white border-none appearance-none cursor-pointer flex items-center justify-center after:content-['✓'] after:text-[#158B86] after:font-bold after:text-[14px] after:leading-none after:opacity-0 checked:after:opacity-100 transition-all"
                    />
                    <label htmlFor="terms-withdraw" className="text-[13px] text-[#8e9d9b]">
                       Yes, I agree to the <span className="text-[#158B86] cursor-pointer hover:underline">Terms & Conditions</span>
                    </label>
                 </div>

                 <button 
                   className="w-[160px] py-3.5 rounded-[8px] bg-primary text-white font-bold text-[15px] transition-all mt-2 shadow-[0_4px_15px_rgba(21,139,134,0.4)]"
                 >
                    SUBMIT
                 </button>
              </div>

              {/* Right Column: Transaction Summary */}
              <div className="w-full lg:w-[350px] flex flex-col">
                 <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[12px] p-6 flex flex-col h-full">
                    <h3 className="text-[16px] font-bold text-[var(--text-color)] mb-6">Transaction Summary</h3>
                    
                    <div className="flex flex-col gap-4 mb-6 text-[13px]">
                       <div className="flex justify-between items-center text-[#8e9d9b]">
                          <span>Withdrawal Amount:</span>
                          <span className="text-[var(--text-color)] font-bold">$ {withdrawAmount || '0'}</span>
                       </div>
                       <div className="flex justify-between items-center text-[#8e9d9b]">
                          <span>Processing Fee:</span>
                          <span className="text-[var(--text-color)] font-bold">{selectedMethod.fee}</span>
                       </div>
                    </div>
                    <div className="border-t border-[var(--border-color)] pt-4 flex justify-between items-center mb-6">
                       <span className="text-[15px] font-bold text-[var(--text-color)]">Total Amount:</span>
                       <span className="text-[16px] font-bold text-[#4caf50]">${withdrawAmount || '0'}</span>
                    </div>

                    {/* Important Information */}
                    <div className="pt-6 border-t border-[var(--border-color)] mt-auto">
                       <div className="flex items-start gap-2 text-[#3B82F6] mb-4">
                          <Info size={16} className="shrink-0 mt-0.5" />
                          <span className="text-[13px] font-bold text-[#3B82F6]">Important Information</span>
                       </div>
                       <ul className="flex flex-col gap-1.5">
                          <li className="text-[12px] text-[#3B82F6] leading-relaxed">
                             - Processing time: {selectedMethod.processing}
                          </li>
                          <li className="text-[12px] text-[#3B82F6] leading-relaxed">
                             · All transactions are encrypted with SSL technology
                          </li>
                          <li className="text-[12px] text-[#3B82F6] leading-relaxed">
                             · Withdrawal fees may apply based on payment method
                          </li>
                          <li className="text-[12px] text-[#3B82F6] leading-relaxed">
                             · Minimum withdrawal: {selectedMethod.minMax.split(' - ')[0]}
                          </li>
                          <li className="text-[12px] text-[#3B82F6] leading-relaxed">
                             · Maximum withdrawal: {selectedMethod.minMax.split(' - ')[1]}
                          </li>
                       </ul>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* ── Withdrawal History Table ───────────────────────────── */}
      <div className="border border-[var(--border-color)] rounded-[10px] p-4 flex flex-col gap-4">
        <div className="flex items-center gap-2 bg-[var(--sub-bg)] w-fit p-1.5 rounded-[10px] border border-[var(--border-color)]">
          {['Approved', 'Pending', 'Rejected'].map(status => (
            <button
              key={status}
              onClick={() => {
                setFilterStatus(status);
                setCurrentPage(1);
              }}
              className={`whitespace-nowrap px-6 py-2 rounded-[8px] text-[14px] font-bold transition-all ${filterStatus === status
                ? 'bg-[#158B86] text-white shadow-[0_2px_8px_rgba(21,139,134,0.3)]'
                : 'text-[var(--text-color)] hover:text-[var(--text-color)]/80 bg-transparent'}`}
            >{t(status.toLowerCase())}</button>
          ))}
        </div>


        <div className="border border-[var(--border-color)]/50 rounded-[8px] overflow-hidden">
          <WalletWithdrawTable 
            data={currentItems} 
            filterStatus={filterStatus}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        </div>

        {/* Pagination */}
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
            <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className={`flex items-center justify-center w-8 h-8 rounded-[4px] transition-colors ${currentPage === 1 ? 'opacity-10 cursor-not-allowed' : 'text-[#8e9d9b] hover:text-[var(--text-color)] hover:bg-[var(--sub-bg)]'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button key={page} onClick={() => setCurrentPage(page)} className={`flex items-center justify-center w-8 h-8 rounded-[4px] font-bold text-[12px] transition-all ${currentPage === page ? 'text-white bg-[#158B86] shadow-[0_2px_8px_rgba(21,139,134,0.4)]' : 'text-[#8e9d9b] hover:text-[var(--text-color)] hover:bg-[var(--sub-bg)]'}`}>
                {page}
              </button>
            ))}
            <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className={`flex items-center justify-center w-8 h-8 rounded-[4px] transition-colors ${currentPage === totalPages ? 'opacity-10 cursor-not-allowed' : 'text-[#8e9d9b] hover:text-[var(--text-color)] hover:bg-[var(--sub-bg)]'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>

        </div>
      </div>

      {/* ── Security & Protection ──────────────────────────────── */}
      <div className="mt-10 border border-[var(--border-color)] rounded-[12px] p-8">
        <h3 className="text-[var(--text-color)] text-[18px] font-bold mb-8">{t('securityProtection')}</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center text-center group">
            <div className="w-14 h-14 rounded-full bg-[#123620]/30 border border-[#38A169]/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(56,161,105,0.2)]">
              <ShieldCheck size={28} className="text-[#38A169]" />
            </div>
            <h4 className="text-[var(--text-color)] font-bold text-[15px] mb-2">{t('sslTitle')}</h4>
            <p className="text-[#8e9d9b] text-[12px] leading-relaxed">{t('sslDesc')}</p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="w-14 h-14 rounded-full bg-[#4A2D23]/30 border border-[#DD6B20]/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(221,107,32,0.2)]">
              <Lock size={28} className="text-[#DD6B20]" />
            </div>
            <h4 className="text-[var(--text-color)] font-bold text-[15px] mb-2">{t('secureTitle')}</h4>
            <p className="text-[#8e9d9b] text-[12px] leading-relaxed">{t('secureDesc')}</p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="w-14 h-14 rounded-full bg-[#1a1535]/30 border border-[#9d6bff]/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(157,107,255,0.2)]">
              <EyeOff size={28} className="text-[#9d6bff]" />
            </div>
            <h4 className="text-[var(--text-color)] font-bold text-[15px] mb-2">{t('privacyTitle')}</h4>
            <p className="text-[#8e9d9b] text-[12px] leading-relaxed">{t('privacyDesc')}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WalletWithdrawPage;
