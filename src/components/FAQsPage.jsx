import React, { useState } from 'react';
import { Home, ChevronRight, Moon, Globe, ChevronDown, Search, HelpCircle } from 'lucide-react';

const TRANSLATIONS = {
  EN: { news: 'News', userDashboard: 'User Dashboard', ibDashboard: 'IB Dashboard' },
  HI: { news: 'समाचार', userDashboard: 'यूजर डैशबोर्ड', ibDashboard: 'आईबी डैशबोर्ड' },
};

const CATEGORIES = [
  'Account', 'Deposit', 'Client', 'Meta Trader', 'Withdrawal', 'Internal Transfer', 'IB'
];

const FAQ_DATA = {
  'Account': [
    { 
      q: "What documents are required to open a forex trading account?", 
      a: "Typically, you'll need a government-issued ID (like a passport or driver's license), proof of address (like a utility bill or bank statement), and possibly additional financial information depending on the broker's requirements." 
    },
    
    
    
    
  ]
};

const FAQsPage = ({ onNavigate }) => {
  const [dashboardType, setDashboardType] = useState('User');
  const [language, setLanguage] = useState('EN');
  const [selectedCategory, setSelectedCategory] = useState('Account');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const t = (key) => TRANSLATIONS[language]?.[key] || key;

  const currentFaqs = FAQ_DATA[selectedCategory] || [];

  return (
    <div className="flex flex-col w-full animate-fade-in pb-20">
      {/* ── Top Header ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/5 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-[22px] font-extrabold text-white tracking-tight uppercase">FAQ</h1>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#AF6C56] animate-pulse" />
            <span className="bg-[#158B86] text-white text-sm font-medium px-2 rounded-sm">{t('news')}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="bg-[#122D32] p-1.5 rounded-full flex items-center h-[38px]">
            <button onClick={() => setDashboardType('User')} className={`px-4 py-1.5 rounded-full text-[13px] transition-colors ${dashboardType === 'User' ? 'bg-[#158B86] text-white font-semibold' : 'text-[#8e9d9b] hover:text-white'}`}>{t('userDashboard')}</button>
            <button onClick={() => setDashboardType('IB')}   className={`px-4 py-1.5 rounded-full text-[13px] transition-colors ${dashboardType === 'IB'   ? 'bg-[#158B86] text-white font-semibold' : 'text-[#8e9d9b] hover:text-white'}`}>{t('ibDashboard')}</button>
          </div>
          <button className="text-[#8e9d9b] hover:text-white transition-colors"><Moon size={20} strokeWidth={2} /></button>
          <div className="flex items-center gap-1.5 bg-[#122D32] px-3 py-1.5 rounded-full h-[38px] text-[#8e9d9b] text-[13px] cursor-pointer hover:text-white transition-all">
            <Globe size={16} /> <span>US</span>
          </div>
        </div>
      </div>

      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <div className="flex items-center gap-2 text-[15px] mb-7 font-medium">
        <Home size={17} className="text-[#158B86] cursor-pointer hover:text-white transition-colors" strokeWidth={2.5} onClick={() => onNavigate('Dashboard')} />
        <ChevronRight size={15} className="text-gray-500" strokeWidth={2} />
        <span className="text-white">FAQ</span>
      </div>

      {/* ── Category Selector ───────────────────────────────────── */}
      <div className="relative mb-6 w-full max-w-[280px]">
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-[8px] text-white text-[14px] hover:border-[#158B86]/40 transition-all shadow-lg"
        >
          <span className="opacity-80">{selectedCategory}</span>
          <ChevronDown size={16} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#1A1A1A] border border-white/10 rounded-[8px] overflow-hidden z-50 shadow-[0_10px_30px_rgba(0,0,0,0.5)] animate-slide-down">
            {CATEGORIES.map((cat) => (
              <button 
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setIsDropdownOpen(false);
                  setExpandedIndex(null);
                }}
                className={`w-full text-left px-4 py-3 text-[14px] transition-colors ${selectedCategory === cat ? 'bg-[#158B86] text-white' : 'text-[#8e9d9b] hover:bg-white/5 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── FAQ Content Area ───────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-h-[450px] border border-white/10 rounded-[12px] bg-[#1A1A1A]/30 backdrop-blur-sm p-8 relative overflow-hidden">
        {/* Category Header Inside */}
        <h2 className="text-[18px] font-bold text-white mb-8">{selectedCategory} FAQs</h2>

        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#158B86 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="flex-1 flex flex-col gap-0 relative z-10">
          {currentFaqs.length > 0 ? (
            <div className="bg-[#1A1A1A]/50 border border-white/5 rounded-[12px] overflow-hidden">
              {currentFaqs.map((faq, index) => (
                <div key={index} className="transition-all">
                  <button 
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left group"
                  >
                    <span className="text-[15px] font-medium text-white/90 group-hover:text-white transition-colors">
                      {faq.q}
                    </span>
                    <div className="text-white/40 group-hover:text-[#158B86] transition-colors">
                      {expandedIndex === index ? <span className="text-[24px] leading-none">−</span> : <span className="text-[24px] leading-none">+</span>}
                    </div>
                  </button>
                  
                  {expandedIndex === index && (
                    <div className="px-6 pb-6 text-[14px] text-[#8e9d9b] leading-relaxed animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center animate-fade-in">
               <h3 className="text-[15px] font-semibold text-[#158B86]">No Record Found</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQsPage;
