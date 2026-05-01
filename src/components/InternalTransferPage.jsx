import React, { useState } from 'react';
import { Home, ChevronRight, Wallet, BadgeDollarSign, Briefcase, Search } from 'lucide-react';
import { DatePicker, ConfigProvider, theme as antdTheme } from 'antd';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import InternalTransferTable from './InternalTransferTable';
import DashboardHeader from './DashboardHeader';
import MobileInternalTransfer from './MobileInternalTransfer';

import mt5Logo from '../assets/mt5.png';

const { RangePicker } = DatePicker;

const TRANSLATIONS = {
  EN: {
    transfer: "TRANSFER",
    news: "News",
    userDashboard: "User Dashboard",
    ibDashboard: "IB Dashboard",
    breadcrumb: "Transfer",
    walletAccountNo: "Wallet Account No",
    walletBalance: "Wallet Balance",
    minDeposit: "Minimum Deposit",
    maxDeposit: "Maximum Deposit",
    amountInUsd: "Amount In USD",
    selectFromAccount: "Select From Account",
    selectToAccount: "Select To Account",
    wallet: "Wallet",
    agreeTo: "Yes, I agreed to the",
    terms: "Terms & Conditions",
    submit: "SUBMIT",
    approved: "Approved",
    pending: "Pending",
    rejected: "Rejected",
    startDate: "Start date",
    endDate: "End date",
    search: "Search",
    itemsPerPage: "/ Page",
    walletSub: "Primary wallet account",
    tradingSub: "Live trading account"
  },
  HI: {
    transfer: "ट्रांसफर",
    news: "समाचार",
    userDashboard: "यूजर डैशबोर्ड",
    ibDashboard: "आईबी डैशबोर्ड",
    breadcrumb: "ट्रांसफर",
    walletAccountNo: "वॉलेट अकाउंट नंबर",
    walletBalance: "वॉलेट बैलेंस",
    minDeposit: "न्यूनतम जमा",
    maxDeposit: "अधिकतम जमा",
    amountInUsd: "USD में राशि",
    selectFromAccount: "प्रेषक अकाउंट चुनें",
    selectToAccount: "प्राप्तकर्ता अकाउंट चुनें",
    wallet: "वॉलेट",
    agreeTo: "हां, मैं सहमत हूं",
    terms: "नियम और शर्तें",
    submit: "सबमिट",
    approved: "स्वीकृत",
    pending: "लंबित",
    rejected: "अस्वीकृत",
    startDate: "प्रारंभ तिथि",
    endDate: "अंतिम तिथि",
    search: "खोजें",
    itemsPerPage: "/ पेज",
    walletSub: "मुख्य वॉलेट अकाउंट",
    tradingSub: "लाइव ट्रेडिंग अकाउंट"
  }
};

const CustomWalletIcon = () => (
  <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
    <rect x="2" y="8" width="17" height="12" rx="3" stroke="#00BFA5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 11L16 5.5C17.1046 5.06656 18.3284 5.6632 18.7618 6.76777C18.9189 7.16805 19 7.59253 19 8.02494V12" stroke="#00BFA5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 15H15" stroke="#00BFA5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SelectableCard = ({ id, label, subtext, isSelected, onClick, imageSrc, customIcon, icon: IconComponent }) => (
  <label 
    onClick={(e) => { e.preventDefault(); onClick(id); }}
    className={`flex items-center gap-1 border-2 rounded-lg p-3 m-0 transition-all cursor-pointer bg-transparent ${
      isSelected ? 'border-[#00BFA5]' : 'border-[var(--border-color)] hover:border-[#00BFA5]/50'
    }`}
  >
    <div className={`w-4 h-4 rounded-full border-2 flex flex-shrink-0 items-center justify-center mr-1 ${isSelected ? 'border-[#00BFA5]' : 'border-[#8e9d9b]'}`}>
      {isSelected && <div className="w-2 h-2 rounded-full bg-[#00BFA5]"></div>}
    </div>
    <div className="flex items-center gap-2 ml-1">
      {imageSrc ? (
        <img src={imageSrc} alt="logo" className="w-8 h-8 object-contain" />
      ) : customIcon ? (
        customIcon
      ) : (
        <div className="w-6 h-6 bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[4px] flex items-center justify-center">
          {IconComponent && <IconComponent size={14} className="text-[#00BFA5]" />}
        </div>
      )}
      <div className="flex flex-col justify-center">
        <span className="text-[14px] font-bold text-[var(--text-color)] leading-tight">{label}</span>
        {subtext && <span className="text-[12px] font-medium text-[#8e9d9b] leading-tight mt-0.5">{subtext}</span>}
      </div>
    </div>
  </label>
);

const InternalTransferPage = ({ onNavigate }) => {
  const { isDark } = useTheme();
  const { language } = useLanguage();
  const [statusFilter, setStatusFilter] = useState('Approved');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState(null);
  
  // Form State
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [agreed, setAgreed] = useState(false);

  const t = (key) => TRANSLATIONS[language]?.[key] || key;

  return (
    <div className="animate-fade-in flex flex-col h-full">

      {/* ════════ MOBILE VIEW (hidden on lg+) ════════ */}
      <div className="block lg:hidden">
        <MobileInternalTransfer
          onNavigate={onNavigate}
          t={t}
          currentItems={[]} // Assuming empty or you can pass actual data if available
          sortConfig={{ key: '', direction: '' }}
          handleSort={() => {}}
        />
      </div>

      {/* ════════ DESKTOP VIEW (hidden on mobile) ════════ */}
      <div className="hidden lg:block">

      <DashboardHeader 
        title={t('transfer')}
        breadcrumbs={[{ title: t('breadcrumb'), active: true }]}
        onNavigate={onNavigate}
        activeTab="User Dashboard"
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 gap-6">
         
         {/* Summary Cards Row */}
         <div className="border border-[var(--border-color)] rounded-[12px] p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4 bg-[var(--card-bg)]">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-[10px] bg-[#0A3D3B] flex items-center justify-center">
                <Briefcase size={22} className="text-[#00BFA5]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="sm:text-xl text-md font-bold text-[var(--text-color)] leading-tight">0</span>
                <span className="text-sm font-medium text-gray-500 capitalize leading-tight mt-1">{t('walletAccountNo')}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-[10px] bg-[#3B1919] flex items-center justify-center">
                <Wallet size={22} className="text-[#E53E3E]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="sm:text-xl text-md font-bold text-[var(--text-color)] leading-tight">$ 0.00</span>
                <span className="text-sm font-medium text-gray-500 capitalize leading-tight mt-1">{t('walletBalance')}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-[10px] bg-[#4A2D23] flex items-center justify-center">
                <BadgeDollarSign size={22} className="text-[#DD6B20]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="sm:text-xl text-md font-bold text-[var(--text-color)] leading-tight">$ 0.00</span>
                <span className="text-sm font-medium text-gray-500 capitalize leading-tight mt-1">{t('minDeposit')}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-[10px] bg-[#123620] flex items-center justify-center">
                <BadgeDollarSign size={22} className="text-[#38A169]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="sm:text-xl text-md font-bold text-[var(--text-color)] leading-tight">$ 0.00</span>
                <span className="text-sm font-medium text-gray-500 capitalize leading-tight mt-1">{t('maxDeposit')}</span>
              </div>
            </div>
         </div>

         {/* Transfer Form Container */}
         <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[12px] p-5">
           {/* Amount Input */}
           <div className="mb-5">
             <label className="block text-lg font-medium text-gray-500 mb-2">{t('amountInUsd')}</label>
             <div className="relative max-w-[280px]">
               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-color)] font-medium">$</span>
               <input 
                 type="text" 
                 placeholder="0"
                 value={amount}
                 onChange={(e) => setAmount(e.target.value)}
                 className="w-full bg-[var(--bg-color)] border border-[var(--border-color)] rounded-[8px] py-2 pl-7 pr-3 text-[var(--text-color)] text-[14px] font-medium focus:outline-none focus:border-[#158B86] transition-colors"
               />
             </div>
           </div>

           {/* From Account */}
           <div className="mb-5">
             <label className="block text-lg font-medium text-gray-500 mb-3">
               <span className="text-[#E53E3E] mr-1">*</span>{t('selectFromAccount')}
             </label>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 max-w-4xl">
               <SelectableCard 
                 id="wallet" 
                 label={t('wallet')} 
                 subtext={t('walletSub')}
                 isSelected={fromAccount === 'wallet'} 
                 onClick={setFromAccount} 
                 customIcon={<CustomWalletIcon />}
               />
               <SelectableCard 
                 id="trading" 
                 label="Trading" 
                 subtext={t('tradingSub')}
                 isSelected={fromAccount === 'trading'} 
                 onClick={setFromAccount} 
                 imageSrc={mt5Logo}
               />
               <SelectableCard 
                 id="555166" 
                 label="555166" 
                 isSelected={fromAccount === '555166'} 
                 onClick={setFromAccount} 
                 imageSrc={mt5Logo}
               />
             </div>
           </div>

           {/* To Account */}
           <div className="mb-6">
             <label className="block text-lg font-medium text-gray-500 mb-3">
               <span className="text-[#E53E3E] mr-1">*</span>{t('selectToAccount')}
             </label>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 max-w-4xl">
               <SelectableCard 
                 id="wallet" 
                 label={t('wallet')} 
                 subtext={t('walletSub')}
                 isSelected={toAccount === 'wallet'} 
                 onClick={setToAccount} 
                 customIcon={<CustomWalletIcon />}
               />
               <SelectableCard 
                 id="trading" 
                 label="Trading" 
                 subtext={t('tradingSub')}
                 isSelected={toAccount === 'trading'} 
                 onClick={setToAccount} 
                 imageSrc={mt5Logo}
               />
               <SelectableCard 
                 id="555166_to" 
                 label="555166" 
                 isSelected={toAccount === '555166_to'} 
                 onClick={setToAccount} 
                 imageSrc={mt5Logo}
               />
             </div>
           </div>

           {/* Terms Checkbox */}
           <div className="flex items-center gap-2 mb-6">
             <div 
               className={`w-4 h-4 rounded-[4px] border flex items-center justify-center cursor-pointer transition-colors ${agreed ? 'bg-[#158B86] border-[#158B86]' : 'border-white/20 hover:border-white/40'}`}
               onClick={() => setAgreed(!agreed)}
             >
               {agreed && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
             </div>
             <span className="text-[13px] text-[#8e9d9b] font-medium">
               <span className="cursor-pointer" onClick={() => setAgreed(!agreed)}>{t('agreeTo')} </span>
               <a 
                 href="https://mt5.neptunefxcrm.com/TermsPdf/InternalTransfer.pdf" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="text-[#158B86] hover:underline cursor-pointer"
               >
                 {t('terms')}
               </a>
             </span>
             <span>{t('itemsPerPage')} {t('itemsPerPage')}</span>
           </div>

           {/* Submit Button */}
           <button className="bg-[#158B86] hover:bg-[#00BFA5] text-white px-8 py-2 rounded-[8px] text-[13px] font-bold transition-colors shadow-sm uppercase tracking-wide">
             {t('submit')}
           </button>
         </div>

         {/* Table Filters Row */}
         <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-2">
           {/* Left: Status Filters */}
           <div className="bg-[var(--sub-bg)] p-1.5 rounded-[10px] flex items-center gap-1 overflow-x-auto w-full md:w-auto hide-scrollbar">
             {['Approved', 'Pending', 'Rejected'].map((status) => {
                const statusKey = status.toLowerCase();
                return (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`whitespace-nowrap flex-shrink-0 px-5 py-2 rounded-[8px] text-[13px] font-bold transition-all ${
                       statusFilter === status 
                       ? 'bg-[#158B86] text-white shadow-[0_2px_8px_rgba(21,139,134,0.3)]' 
                       : 'bg-transparent text-[var(--text-color)] hover:opacity-80'
                    }`}
                  >
                    {t(statusKey)}
                  </button>
                );
             })}
           </div>
           
           {/* Right: Date Picker & Search */}
           <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
             <ConfigProvider
               theme={{
                 algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
                 token: {
                   colorPrimary: '#00BFA5',
                   colorBgContainer: isDark ? '#06120f' : '#ffffff',
                   colorBgElevated: isDark ? '#1A1A1A' : '#ffffff',
                   colorBorder: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                   borderRadius: 8,
                   colorText: isDark ? '#8e9d9b' : '#333333',
                   colorTextPlaceholder: isDark ? '#555' : '#aaa',
                 },
               }}
             >
               <RangePicker 
                 value={dateRange}
                 onChange={(dates) => setDateRange(dates)}
                 style={{ height: '36px', width: '260px' }}
                 format="DD-MM-YYYY"
                 placeholder={[t('startDate'), t('endDate')]}
                 separator={<span className="text-[var(--text-color)] opacity-60">→</span>}
               />
             </ConfigProvider>
             <div className="bg-[var(--bg-color)] border border-[var(--border-color)] rounded-[8px] flex items-center px-3 py-2 w-full sm:w-[200px]">
               <Search size={14} className="text-[var(--text-color)] opacity-60 mr-2" />
               <input 
                 type="text" 
                 placeholder={t('search')} 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="bg-transparent border-none outline-none text-[13px] text-[var(--text-color)] w-full placeholder-[var(--text-color)] placeholder-opacity-50"
               />
             </div>
           </div>
         </div>

         {/* Table Component */}
         <div className="flex-1 min-h-0">
           <InternalTransferTable 
             statusFilter={statusFilter} 
             searchQuery={searchQuery}
             dateRange={dateRange}
           />
         </div>
       </div>
      </div> {/* end desktop wrapper */}
    </div>
  );
};

export default InternalTransferPage;
