import React, { useState } from 'react';
import { Home, ChevronRight, Info, ShieldCheck, Lock, EyeOff, Wallet, Percent, Clock, BadgeDollarSign } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import WalletDepositTable from './WalletDepositTable';
import { useRealtimeJson } from '../hooks/useRealtimeJson';
import { endpoints } from '../api/endpoints';

import bep20Img from '../assets/BEP_20.jpg';
import trc20Img from '../assets/TRC20.png';
import teriopayImg from '../assets/teriopay.png';
import bankImg from '../assets/bank.png';
import zaropayImg from '../assets/zaropay.png';
import upiImg from '../assets/upiLogo.png';

const TRANSLATIONS = {
  EN: { 
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

const SUMMARY_CARDS = [
  { label: 'Wallet Balance',   value: '$ 6930',    icon: <Wallet size={20} />,          iconBg: 'bg-[#3B1919]', iconColor: 'text-[#E53E3E]' },
  { label: 'Transaction Fees', value: '0 %',       icon: <Percent size={20} />,         iconBg: 'bg-[#1a1535]', iconColor: 'text-[#9d6bff]' },
  { label: 'Processing Time:', value: '24 H',      icon: <Clock size={20} />,           iconBg: 'bg-[#0e2535]', iconColor: 'text-[#4dabf7]' },
  { label: 'Minimum Deposit', value: '$ 10',       icon: <BadgeDollarSign size={20} />, iconBg: 'bg-[#4A2D23]', iconColor: 'text-[#DD6B20]' },
  { label: 'Maximum Deposit', value: '$ 500000',   icon: <BadgeDollarSign size={20} />, iconBg: 'bg-[#123620]', iconColor: 'text-[#38A169]' },
];

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
    // Extract list from API response. Adjust property name based on actual API structure
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
    <div className="flex flex-col w-full animate-fade-in pb-20">

      {/* ── Top Header ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)] mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-[22px] font-extrabold text-[var(--text-color)] tracking-tight uppercase">{t('deposit')}</h1>
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
          <div className="relative">
            <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="flex items-center gap-1 text-[#8e9d9b] hover:text-white text-[14px] font-medium">
              <Globe size={17} strokeWidth={2} /> {language}
            </button>
            {isLangMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-36 bg-[#1A1A1A] border border-white/10 rounded-[8px] shadow-xl py-2 z-50">
                {['EN', 'HI'].map(lang => (
                  <button key={lang} onClick={() => { setLanguage(lang); setIsLangMenuOpen(false); }}
                    className={`w-full px-4 py-2 text-left flex items-center justify-between text-[13px] transition-colors ${language === lang ? 'text-white bg-white/5' : 'text-[#8e9d9b] hover:text-white hover:bg-white/5'}`}>
                    <span className="flex items-center gap-3"><span className="font-bold opacity-50">{lang === 'EN' ? 'US' : 'IN'}</span>{lang === 'EN' ? 'English' : 'Hindi'}</span>
                    {language === lang && <span className="text-white text-[11px]">✓</span>}
                  </button>
                ))}
              </div>
            )}
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


      {/* ── Payment Methods ───────────────────────────────────── */}
      <div className="border border-[var(--border-color)] rounded-[10px] p-6 mb-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-[15px] font-bold text-[var(--text-color)]">{t('selectPaymentMethod')}</h2>

          <div className="flex items-center gap-1.5 text-[11px] text-[#8e9d9b]">
            <Info size={12} />
            {t('secureEncrypted')}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PAYMENT_METHODS.map((m) => (
            <div key={m.id} className="flex flex-col p-4 rounded-[10px] border border-[#158B86]/40 hover:border-[#158B86] transition-all">
              {/* Card header */}
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

              {/* Details */}
              <div className="flex flex-col gap-2 text-[12px] mb-4">
                <div className="flex justify-between"><span className="text-[#8e9d9b]">{t('processingTime')}</span><span className="text-[var(--text-color)]">{m.time}</span></div>
                <div className="flex justify-between"><span className="text-[#8e9d9b]">{t('fee')}</span><span className="text-[var(--text-color)]">{m.fee}</span></div>
                <div className="flex justify-between"><span className="text-[#8e9d9b]">{t('minMax')}</span><span className="text-[var(--text-color)]">{m.minMax}</span></div>
              </div>

              {/* Action */}
              <button className="w-full py-2 rounded-[6px] bg-[#158B86] hover:bg-[#117672] text-white font-bold text-[12px] transition-all shadow-[0_3px_10px_rgba(21,139,134,0.4)]">
                {t('depositWith')} {m.name}
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-5 text-[#8e9d9b] text-[11px]">
          <Info size={12} />
          {t('footerInfo')}
        </div>
      </div>

      {/* Tab Controls Row — Matching Accounts page layout */}
      <div className="flex items-center justify-between gap-5 mb-4">
        <div className="bg-[var(--sub-bg)] p-1.5 rounded-[10px] flex items-center gap-1 overflow-x-auto hide-scrollbar">
          {['Approved', 'Pending', 'Rejected'].map(status => (
            <button key={status} onClick={() => setFilterStatus(status)}
              className={`whitespace-nowrap px-6 py-2 rounded-[8px] text-[14px] font-bold transition-all ${filterStatus === status ? 'bg-[#158B86] text-white shadow-[0_2px_8px_rgba(21,139,134,0.3)]' : 'text-[var(--text-color)] hover:text-[var(--text-color)]/80 bg-transparent'}`}
            >{t(status.toLowerCase())}</button>
          ))}
        </div>
      </div>


      {/* ── Table Container wrapped in teal border ── */}
      <div className="border border-[var(--border-color)] rounded-[10px] p-4 flex flex-col gap-4">
        {/* INNER table section with its own border */}
        <div className="border border-[var(--border-color)]/50 rounded-[8px] overflow-hidden">

          <WalletDepositTable 
            data={currentItems} 
            filterStatus={filterStatus} 
            sortConfig={sortConfig} 
            onSort={handleSort} 
          />
        </div>

        {/* Pagination — inside outer, below inner table */}
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

      {/* ── Security Footer ───────────────────────────────────── */}
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
                <p className="text-[11px] text-[#8e9d9b] leading-relaxed">{t(item.dKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletDepositPage;
