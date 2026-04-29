import React, { useState } from 'react';
import { Plus, Wallet, Users, BarChart3, PieChart, Activity } from 'lucide-react';
import myBalanceIcon from '../assets/my-balance.png.png';
import equityIcon from '../assets/equityicon.png.png';
import totalProfitIcon from '../assets/totalprofit.png.png';
import usedMarginIcon from '../assets/usedmargin.png.png';
import freeMarginIcon from '../assets/freemargin.png.png';
import { useRealtimeJson } from '../hooks/useRealtimeJson';
import { useLanguage } from '../contexts/LanguageContext';

const TRANSLATIONS = {
  EN: {
    hello: "Hello Antoine!",
    displayingData: "Displaying the data from",
    monthYear: "June 2025",
    userDashboard: "User Dashboard",
    ibDashboard: "IB Dashboard",
    addProductBatch: "Add Product Batch",
    myBalance: "My Balance",
    equity: "equity",
    totalProfit: "Total Profit",
    usedMargin: "Used Margin",
    freeMargin: "Free Margin",
  },
  HI: {
    hello: "नमस्ते एंटोनी!",
    displayingData: "डेटा प्रदर्शित किया जा रहा है",
    monthYear: "जून 2025",
    userDashboard: "यूजर डैशबोर्ड",
    ibDashboard: "आईबी डैशबोर्ड",
    addProductBatch: "उत्पाद बैच जोड़ें",
    myBalance: "मेरा बैलेंस",
    equity: "इक्विटी",
    totalProfit: "कुल लाभ",
    usedMargin: "प्रयुक्त मार्जिन",
    freeMargin: "फ्री मार्जिन",
  }
};

const SummaryCards = ({ onNavigate, data }) => {
  const { language } = useLanguage();
  const [dashboardType, setDashboardType] = useState('User');
  const t = (key) => TRANSLATIONS[language]?.[key] || key;
  const { data: summaryDataRemote } = useRealtimeJson(import.meta.env.VITE_ENDPOINT_SUMMARY, {
    enabled: Boolean(!data && import.meta.env.VITE_ENDPOINT_SUMMARY),
  });
  const summaryData = data ?? summaryDataRemote;

  const rawBalance =
    summaryData?.walletAmount ??
    summaryData?.walletBalance ??
    summaryData?.balance ??
    0;
    
  const balanceValue = typeof rawBalance === 'number' 
    ? rawBalance.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
    : rawBalance || '0';

  return (
    <div className="bg-[var(--sub-bg)] border-[1.31px] border-[var(--border-color)] rounded-[15.76px] p-5 md:p-[31.53px] transition-colors">

      {/* Header Section */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5">
        <div>
          <h1 className="text-[22px] md:text-[26px] font-semibold text-[var(--text-color)] tracking-tight leading-tight">{t('hello')}</h1>
          <p className="text-[#8e9d9b] text-[12px] md:text-[13px] mt-1 font-medium">{t('displayingData')} <span className="text-[var(--text-color)] font-bold">{t('monthYear')}</span></p>
        </div>

        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
           <div className="bg-[var(--card-bg)] p-1.5 rounded-full border border-[var(--border-color)] flex items-center h-[46px]">
              <button 
                onClick={() => { setDashboardType('User'); onNavigate('Dashboard'); }}
                className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-full text-[12px] sm:text-[13px] transition-colors ${dashboardType === 'User' ? 'font-semibold bg-[#4C5E62] text-white shadow-sm border border-[var(--border-color)]' : 'font-medium text-[#8e9d9b] hover:text-[var(--text-color)] border border-transparent'}`}
              >{t('userDashboard')}</button>
              <button 
                onClick={() => { setDashboardType('IB'); onNavigate('IB_Dashboard'); }}
                className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-full text-[12px] sm:text-[13px] transition-colors ${dashboardType === 'IB' ? 'font-semibold bg-[#4C5E62] text-white shadow-sm border border-[var(--border-color)]' : 'font-medium text-[#8e9d9b] hover:text-[var(--text-color)] border border-transparent'}`}
              >{t('ibDashboard')}</button>
           </div>

           <button 
             onClick={() => onNavigate('Add Product Batch')}
             className="flex justify-center items-center gap-2 bg-[#D1F7E9] hover:bg-[#c2ebd9] text-[#0A181B] px-6 py-2.5 rounded-full text-[14px] font-bold h-[46px] transition-all"
           >
             {t('addProductBatch')} <Plus size={18} strokeWidth={2.5} />
           </button>
        </div>
      </div>

      {/* Cards Grid: Adjusted to 6 columns for Figma parity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-[13.14px] mt-6 md:mt-8 items-center">
        {/* Main Balance Card - HIGH FIDELITY FIGMA BLOOM */}
        <div className="bg-[var(--card-bg)] rounded-[21px] border-[1.31px] border-[var(--border-color)] p-[26px] flex flex-col justify-between h-[145px] relative overflow-hidden sm:col-span-2 xl:col-span-2 shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-colors">

          {/* Subtle Grid Pattern - Nearly Invisible */}
          <div className="absolute inset-0 opacity-[0.005] pointer-events-none" 
               style={{ 
                 backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', 
                 backgroundSize: '24px 24px'
               }}></div>

          {/* Localized Lighting Container (Matching Image 52) */}
          <div className="absolute right-[15%] inset-y-0 w-[180px] pointer-events-none flex items-center justify-center">
             {/* Localized Green Bloom Layers */}
             <div className="absolute w-[150px] h-[150px] bg-[#76D041] blur-[40px] opacity-40 rounded-full"></div>
             <div className="absolute w-[190px] h-[190px] bg-[#76D041] blur-[65px] opacity-50 rounded-full"></div>
             <div className="absolute w-[230px] h-[230px] bg-[#76D041] blur-[90px] opacity-35 rounded-full"></div>
             
             {/* Top and Bottom Refraction Beams (Image 51/52 Style) */}
             <div className="absolute top-0 w-[80px] h-[40%] bg-gradient-to-b from-white/25 via-white/5 to-transparent blur-[30px]"></div>
             <div className="absolute bottom-0 w-[80px] h-[40%] bg-gradient-to-t from-white/25 via-white/5 to-transparent blur-[30px]"></div>
             
             {/* Subtle Shimmer Core */}
             <div className="absolute inset-y-0 w-[1px] bg-white/10 blur-[2px]"></div>

             {/* Middle: Absolute Positioned Badge (Centered in Localized Light) */}
             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
                <div className="bg-gradient-to-b from-[#BAED4A] to-[#86BC25] px-6 py-2 rounded-full border-[1.31px] border-white/40 shadow-[0_15px_30px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.7)] flex items-center justify-center min-w-[115px]">
                    <span className="text-[22px] font-black text-[#0B1C1E] tracking-tighter leading-none">
                      ${balanceValue}
                    </span>
                </div>
             </div>
          </div>
          
          <div className="relative z-10 h-full flex flex-col justify-between">
             {/* Top Section: Wallet Icon (Image 48 Scale) */}
             <div className="flex justify-start">
                <img src={myBalanceIcon} alt="Wallet" className="w-[30px] h-[30px] object-contain opacity-90" />
             </div>
             
             {/* Flex Spacer to maintain layout */}
             <div className="flex-1"></div>

             {/* Bottom Section: Small Text (Image 48 Match) */}
             <div className="flex items-end justify-start w-full">
               <h3 className="text-[15px] font-medium text-[var(--text-color)] opacity-90 tracking-tight leading-none mb-1">{t('myBalance')}</h3>
             </div>

          </div>
        </div>

        {/* Metric Cards - Slightly Taller */}
        {[
          { key: 'equity', label: t('equity'), value: summaryData?.equity ?? summaryData?.Equity ?? 0, icon: <img src={equityIcon} alt="Equity" className="w-[54px] h-[54px] object-contain" /> },
          { 
            key: 'totalProfit',
            label: t('totalProfit'), 
            value: (summaryData?.openTrades && Array.isArray(summaryData.openTrades)) 
                   ? summaryData.openTrades.reduce((sum, t) => sum + (Number(t.profit ?? t.Profit) || 0), 0)
                   : (summaryData?.totalProfit ?? summaryData?.TotalProfit ?? 0), 
            icon: <img src={totalProfitIcon} alt="Total Profit" className="w-[54px] h-[54px] object-contain" /> 
          },
          { key: 'usedMargin', label: t('usedMargin'), value: summaryData?.usedMargin ?? summaryData?.UsedMargin ?? 0, icon: <img src={usedMarginIcon} alt="Used Margin" className="w-[54px] h-[54px] object-contain" /> },
          { key: 'freeMargin', label: t('freeMargin'), value: summaryData?.freeMargin ?? summaryData?.FreeMargin ?? 0, icon: <img src={freeMarginIcon} alt="Free Margin" className="w-[54px] h-[54px] object-contain" /> },
        ].map((card, idx) => (
          <div 
            key={idx} 
            onClick={() => onNavigate(card.label)}
            className="bg-[var(--card-bg)] rounded-[15.76px] border-[1.31px] border-[var(--border-color)] p-4 h-[115px] flex items-center gap-4 hover:opacity-90 transition-all cursor-pointer relative z-10"
          >

            <div className="shrink-0">
               {card.icon}
            </div>
            <div className="flex flex-col justify-center">
               <div className="text-[18px] lg:text-[20px] font-bold text-[var(--text-color)] tracking-tight leading-tight">
                 {typeof card.value === 'number' ? `$ ${card.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : card.value}
               </div>

               <div className="text-[12px] lg:text-[13px] font-semibold text-[#5CBA47] leading-tight mt-1">{card.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryCards;
