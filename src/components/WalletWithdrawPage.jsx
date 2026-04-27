import React, { useState } from 'react';
import { Home, ChevronRight, Info, ShieldCheck, Lock, EyeOff, Wallet, Percent, Clock, BadgeDollarSign } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import WalletWithdrawTable from './WalletWithdrawTable';
import { useRealtimeJson } from '../hooks/useRealtimeJson';
import { endpoints } from '../api/endpoints';

// Reuse images or use relevant ones if available
import bep20Img from '../assets/BEP_20.jpg';
import trc20Img from '../assets/TRC20.png';
import bankImg from '../assets/bank.png';

const TRANSLATIONS = {
  EN: {
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

  const [dashboardType, setDashboardType] = useState('User');
  const [filterStatus, setFilterStatus] = useState('Approved');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isRowsMenuOpen, setIsRowsMenuOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'requestDate', direction: 'desc' });

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
      {/* ── Top Header ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)] mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-[22px] font-extrabold text-[var(--text-color)] tracking-tight uppercase">{t('withdraw')}</h1>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#AF6C56] animate-pulse" />
            <span className="bg-[#158B86] text-white text-sm font-medium px-2 rounded-sm">{t('news')}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="bg-[var(--sub-bg)] p-1.5 rounded-full border border-[var(--border-color)] flex items-center h-[38px]">
            <button onClick={() => setDashboardType('User')} className={`px-4 py-1.5 rounded-full text-[13px] transition-colors ${dashboardType === 'User' ? 'bg-[#158B86] text-white font-semibold' : 'text-[#8e9d9b] hover:text-[var(--text-color)]'}`}>{t('userDashboard')}</button>
            <button onClick={() => setDashboardType('IB')}   className={`px-4 py-1.5 rounded-full text-[13px] transition-colors ${dashboardType === 'IB'   ? 'bg-[#158B86] text-white font-semibold' : 'text-[#8e9d9b] hover:text-[var(--text-color)]'}`}>{t('ibDashboard')}</button>
          </div>
          {/*
          <button className="text-[#8e9d9b] hover:text-white transition-colors"><Moon size={20} strokeWidth={2} /></button>
          <div className="flex items-center gap-1.5 bg-[#122D32] px-3 py-1.5 rounded-full h-[38px] text-[#8e9d9b] text-[13px] cursor-pointer hover:text-white transition-all">
            <Globe size={16} /> <span>US</span>
          </div>
          */}
        </div>
      </div>


      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <div className="flex items-center gap-2 text-[15px] mb-7 font-medium">
        <Home size={17} className="text-[#158B86] cursor-pointer hover:opacity-80 transition-colors" strokeWidth={2.5} onClick={() => onNavigate('Dashboard')} />
        <ChevronRight size={15} className="text-gray-500" strokeWidth={2} />
        <span className="text-[var(--text-color)]">{t('breadcrumb')}</span>
      </div>


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
      <div className="border border-[var(--border-color)] rounded-[12px] p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[18px] font-bold text-[var(--text-color)] tracking-tight">{t('selectWithdrawMethod')}</h2>
          <div className="flex items-center gap-2 text-[11px] text-[#8e9d9b] tracking-wider">
            <Info size={14} className="text-[#158B86]" /> {t('allWithdrawSecure')}
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {WITHDRAWAL_METHODS.map((method) => (
            <div key={method.id} className={`flex flex-col bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[12px] p-5 hover:border-[#158B86]/50 transition-all group relative overflow-hidden`}>
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

              <button className="w-full py-2.5 bg-[#158B86] hover:bg-[#127a75] text-white text-[13px] font-bold rounded-[6px] transition-all shadow-[0_4px_12px_rgba(21,139,134,0.2)]">
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
