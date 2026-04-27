import React, { useState, useMemo } from 'react';
import { Home, ChevronRight, Wallet, Activity, BarChart3, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft, X, BadgeCheck, Repeat, Sliders } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useRealtimeJson } from '../hooks/useRealtimeJson';
import { useDashboardSocket } from '../hooks/useDashboardSocket';
import { endpoints } from '../api/endpoints';

const TRANSLATIONS = {
  EN: {
    accountDetails: "ACCOUNT DETAILS",
    news: "News",
    userDashboard: "User Dashboard",
    ibDashboard: "IB Dashboard",
    breadcrumb: "Account Details",
    openPL: "Open P/L",
    closedPL: "Closed P/L",
    currentEquity: "Current Equity",
    deposit: "Deposit",
    withdraw: "Withdraw",
    inOut: "In | Out",
    netPNL: "Net PNL",
    totalLots: "Total Lots",
    openTrades: "Open Trades",
    closedTrades: "Closed Trades",
    totalTrades: "Total Trades",
    profit: "Profit",
    symbol: "Symbol",
    type: "Type",
    volume: "Volume",
    openPrice: "Open Price",
    currentPrice: "Current Price",
    stopLoss: "Stop Loss",
    takeProfit: "Take Profit",
    swap: "Swap",
    openTime: "Open Time",
    profitLoss: "Profit Loss",
    close: "Close"
  },
  HI: {
    accountDetails: "अकाउंट विवरण",
    news: "समाचार",
    userDashboard: "यूजर डैशबोर्ड",
    ibDashboard: "आईबी डैशबोर्ड",
    breadcrumb: "अकाउंट विवरण",
    openPL: "ओपन P/L",
    closedPL: "क्लोज्ड P/L",
    currentEquity: "वर्तमान इक्विटी",
    deposit: "जमा",
    withdraw: "निकासी",
    inOut: "इन | आउट",
    netPNL: "नेट PNL",
    totalLots: "कुल लॉट्स",
    openTrades: "ओपन ट्रेड्स",
    closedTrades: "क्लोज्ड ट्रेड्स",
    totalTrades: "कुल ट्रेड्स",
    profit: "लाभ",
    symbol: "सिंबल",
    type: "प्रकार",
    volume: "वॉल्यूम",
    openPrice: "ओपन प्राइस",
    currentPrice: "करंट प्राइस",
    stopLoss: "स्टॉप लॉस",
    takeProfit: "टेक प्रॉफिट",
    swap: "स्वैप",
    openTime: "ओपन टाइम",
    profitLoss: "लाभ हानि",
    close: "बंद करें"
  }
};

const AccountDetailsPage = ({ onNavigate, pageData }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('Open');
  const [dashboardType, setDashboardType] = useState('User');
  const [hoveredPoint, setHoveredPoint] = useState(null);
  
  const t = (key) => TRANSLATIONS[language]?.[key] || key;

  const login = pageData?.login || pageData?.accountNo || pageData?.account_no || '555006';

  // Real-time Data via WebSocket
  const { data: socketData } = useDashboardSocket(login);

  // Dates for profit API (Default to last 10 days)
  const today = new Date();
  const tenDaysAgo = new Date(today);
  tenDaysAgo.setDate(today.getDate() - 9);

  const formatDate = (date) => {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    return `${d}-${m}-${y}`;
  };

  const fromDate = formatDate(tenDaysAgo);
  const toDate = formatDate(today);

  // Fetch Historical Profit Data
  const profitUrl = (endpoints.accountProfit || '/mt5-api/api/MTFiveAccount/Get-Account-Profit-ByDateRange/') + login + `?FromDate=${fromDate}&ToDate=${toDate}`;
  const { data: profitData } = useRealtimeJson(profitUrl, { enabled: !!login });

  const summaryCards = useMemo(() => [
    { label: t('openPL'), value: `$ ${(socketData?.floatingProfit ?? pageData?.floatingProfit ?? 0).toFixed(2)}`, icon: Wallet, color: "#00BCD4", bgColor: "#E0F7F9" },
    { label: t('closedPL'), value: `$ ${(pageData?.closedProfit ?? -11.84).toFixed(2)}`, icon: X, color: "#9575CD", bgColor: "#F3E5F5" },
    { label: t('currentEquity'), value: `$ ${(socketData?.equity ?? pageData?.equity ?? pageData?.balance ?? 10313.76).toFixed(2)}`, icon: TrendingUp, color: "#4CAF50", bgColor: "#E8F5E9" },
    { label: t('deposit'), value: `$ ${(pageData?.totalDeposit ?? 10220.00).toFixed(2)}`, icon: ArrowUpRight, color: "#03A9F4", bgColor: "#E1F5FE" },
    { label: t('withdraw'), value: `$ ${(pageData?.totalWithdraw ?? 0.00).toFixed(2)}`, icon: ArrowDownLeft, color: "#FF9800", bgColor: "#FFF3E0" },
  ], [pageData, socketData, t]);

  const statCards = useMemo(() => [
    { label: t('inOut'), value: `$ ${(pageData?.totalDeposit ?? 10220.00).toFixed(2)}`, icon: Repeat, color: "#00BCD4", bgColor: "#E0F7F9" },
    { label: t('netPNL'), value: `$ ${(pageData?.netProfit ?? 93.76).toFixed(2)}`, icon: Sliders, color: "#9575CD", bgColor: "#F3E5F5" },
    { label: t('totalLots'), value: (pageData?.totalLots ?? 0.72).toFixed(2), icon: BadgeCheck, color: "#4CAF50", bgColor: "#E8F5E9" },
    { label: t('openTrades'), value: (socketData?.openTrades?.length ?? pageData?.openTradesCount ?? 1).toString(), icon: BarChart3, color: "#00BCD4", bgColor: "#E0F7F9" },
    { label: t('closedTrades'), value: (pageData?.closedTradesCount ?? 3).toString(), icon: BarChart3, color: "#FF9800", bgColor: "#FFF3E0" },
    { label: t('totalTrades'), value: ((socketData?.openTrades?.length ?? 0) + (pageData?.closedTradesCount ?? 0) || 4).toString(), icon: BarChart3, color: "#EF5350", bgColor: "#FFEBEE" },
  ], [pageData, socketData, t]);

  const openTrades = socketData?.openTrades || [];
  const closedTrades = []; 

  return (
    <div className="animate-fade-in flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-3">
          <h1 className="text-[20px] md:text-[24px] font-extrabold text-[var(--text-color)] tracking-tight leading-none">{t('accountDetails')}</h1>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#AF6C56] animate-pulse"></div>
            <span className="bg-[#158B86] text-white text-sm sm:text-lg font-medium px-2 rounded-sm cursor-pointer">{t('news')}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[var(--sub-bg)] border border-[var(--border-color)] p-1 rounded-full flex items-center h-[40px]">
            <button 
              onClick={() => setDashboardType('User')}
              className={`px-4 py-1.5 rounded-full text-[13px] transition-colors ${dashboardType === 'User' ? 'font-semibold bg-[#158B86] text-white' : 'text-[#8e9d9b] hover:text-white'}`}
            >{t('userDashboard')}</button>
            <button 
              onClick={() => setDashboardType('IB')}
              className={`px-4 py-1.5 rounded-full text-[13px] transition-colors ${dashboardType === 'IB' ? 'font-semibold bg-[#158B86] text-white' : 'text-[#8e9d9b] hover:text-white'}`}
            >{t('ibDashboard')}</button>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[14px] font-semibold mt-4 mb-6">
         <Home size={16} className="text-[#158B86] cursor-pointer" onClick={() => onNavigate('Dashboard')} />
         <ChevronRight size={14} className="text-[#8e9d9b]" />
         <span className="text-[#8e9d9b] cursor-pointer" onClick={() => onNavigate('Accounts')}>Accounts</span>
         <ChevronRight size={14} className="text-[#8e9d9b]" />
         <span className="text-[var(--text-color)]">{t('breadcrumb')}</span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {summaryCards.map((card, idx) => (
          <div key={idx} className="bg-[var(--card-bg)] border border-[var(--border-color)] p-4 rounded-[12px] flex items-center justify-between shadow-sm transition-all hover:shadow-md">
            <div>
              <p className="text-[#8e9d9b] text-[13px] font-medium">{card.label}</p>
              <h3 className="text-[18px] font-bold text-[var(--text-color)] mt-1">{card.value}</h3>
            </div>
            <div className="p-2.5 rounded-[10px]" style={{ backgroundColor: card.bgColor }}>
              <card.icon size={20} style={{ color: card.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-6">
        {/* Left: Stats Cards */}
        <div className="xl:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {statCards.map((card, idx) => (
            <div key={idx} className="bg-[var(--card-bg)] border border-[var(--border-color)] p-6 rounded-[12px] flex flex-col items-center justify-center text-center shadow-sm transition-all hover:shadow-md">
              <div className="p-3 rounded-full mb-3" style={{ backgroundColor: `${card.color}15` }}>
                <card.icon size={24} style={{ color: card.color }} />
              </div>
              <h3 className="text-[20px] font-extrabold text-[var(--text-color)]">{card.value}</h3>
              <p className="text-[#8e9d9b] text-[13px] font-bold mt-1 uppercase tracking-wide">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Right: Profit Chart */}
        <div className="xl:col-span-7 bg-[var(--card-bg)] border border-[var(--border-color)] p-6 rounded-[12px] shadow-sm relative">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[18px] font-bold text-[var(--text-color)] uppercase tracking-tight">{t('profit')}</h3>
            <div className="bg-[var(--sub-bg)] border border-[var(--border-color)] px-4 py-1.5 rounded-full text-[13px] font-bold text-[var(--text-color)] flex items-center gap-3 cursor-pointer">
               <span>18-04-2026</span>
               <span className="text-[#8e9d9b]">→</span>
               <span>27-04-2026</span>
               <Activity size={14} className="text-[#8e9d9b]" />
            </div>
          </div>

          <div className="w-full relative mt-4 group">
             {/* Tooltip */}
             {hoveredPoint && (
               <div 
                 className="absolute z-10 bg-[var(--card-bg)] border border-[var(--border-color)] p-3 rounded-[8px] shadow-xl pointer-events-none transition-all duration-200"
                 style={{ 
                   left: `${hoveredPoint.x}%`, 
                   top: `${hoveredPoint.y - 60}px`,
                   transform: 'translateX(-50%)'
                 }}
               >
                 <div className="text-[11px] font-bold text-[#8e9d9b] uppercase mb-1">{hoveredPoint.date}</div>
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-[#158B86]"></div>
                   <div className="text-[14px] font-extrabold text-[var(--text-color)]">Profit: {hoveredPoint.value}</div>
                 </div>
                 {/* Tooltip arrow */}
                 <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[var(--card-bg)] border-r border-b border-[var(--border-color)] rotate-45"></div>
               </div>
             )}

             <div className="h-[250px] relative">
               {/* Simple SVG Chart with Curved Path */}
               <svg width="100%" height="100%" viewBox="0 0 1000 300" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#158B86" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#158B86" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Horizontal Grid Lines */}
                  {[0, 75, 150, 225, 300].map(y => (
                    <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="var(--border-color)" strokeWidth="0.5" opacity="0.3" />
                  ))}

                  {/* Vertical Guide Line on Hover */}
                  {hoveredPoint && (
                    <line 
                      x1={hoveredPoint.x * 10} 
                      y1="0" 
                      x2={hoveredPoint.x * 10} 
                      y2="300" 
                      stroke="#158B86" 
                      strokeWidth="1" 
                      strokeDasharray="4 4" 
                      opacity="0.5" 
                    />
                  )}

                  {/* The Curved Path (Rounded Bottom) */}
                  <path 
                    d="M 0 0 L 700 0 C 750 0, 800 250, 850 250 C 900 250, 950 0, 1000 0" 
                    fill="transparent" 
                    stroke="#158B86" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                  <path 
                    d="M 0 0 L 700 0 C 750 0, 800 250, 850 250 C 900 250, 950 0, 1000 0 V 300 H 0 Z" 
                    fill="url(#chartGradient)" 
                  />

                  {/* Points on Hover */}
                  {hoveredPoint && (
                    <circle 
                      cx={hoveredPoint.x * 10} 
                      cy={hoveredPoint.y} 
                      r="5" 
                      fill="#158B86" 
                      stroke="white" 
                      strokeWidth="2" 
                    />
                  )}
               </svg>

               {/* Hover Detection Zones */}
               <div className="absolute inset-0 flex">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div 
                      key={i}
                      className="flex-1 h-full cursor-pointer"
                      onMouseEnter={() => {
                        const xPos = i * 11.1; // roughly 100 / 9
                        const dates = ["Apr 18", "Apr 19", "Apr 20", "Apr 21", "Apr 22", "Apr 23", "Apr 24", "Apr 25", "Apr 26", "Apr 27"];
                        // Mock curve values for the dip at i=8 (Apr 26)
                        let yPos = 0;
                        if (i === 7) yPos = 125;
                        if (i === 8) yPos = 250;
                        if (i === 9) yPos = 125;
                        
                        setHoveredPoint({
                          x: i * 11.1,
                          y: yPos,
                          date: dates[i],
                          value: i === 8 ? "-11.84" : "0.00"
                        });
                      }}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  ))}
               </div>
             </div>
             
             {/* X-Axis Labels */}
             <div className="flex justify-between mt-6 text-[#8e9d9b] text-[12px] font-bold uppercase tracking-wider px-2">
                {["Apr 18", "Apr 19", "Apr 20", "Apr 21", "Apr 22", "Apr 23", "Apr 24", "Apr 25", "Apr 26", "Apr 27"].map(d => (
                  <span key={d}>{d}</span>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* Trades Table Section */}
      <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[12px] shadow-sm overflow-hidden flex flex-col flex-1">
        <div className="border-b border-[var(--border-color)] px-6 pt-4 flex items-center gap-8">
          <button 
            onClick={() => setActiveTab('Open')}
            className={`pb-4 text-[14px] font-bold relative transition-colors ${activeTab === 'Open' ? 'text-[#158B86]' : 'text-[#8e9d9b] hover:text-white'}`}
          >
            {t('openTrades')}
            {activeTab === 'Open' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#158B86]"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('Closed')}
            className={`pb-4 text-[14px] font-bold relative transition-colors ${activeTab === 'Closed' ? 'text-[#158B86]' : 'text-[#8e9d9b] hover:text-white'}`}
          >
            {t('closedTrades')}
            {activeTab === 'Closed' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#158B86]"></div>}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--border-color)] bg-[var(--sub-bg)] bg-opacity-30">
                {[t('symbol'), t('type'), t('volume'), t('openPrice'), t('currentPrice'), t('stopLoss'), t('takeProfit'), t('swap'), t('openTime'), t('profitLoss'), t('close')].map((head, idx) => (
                  <th key={idx} className="py-4 px-6 text-[12px] font-bold text-[#8e9d9b] uppercase tracking-wider">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activeTab === 'Open' ? (
                <tr className="border-b border-[var(--border-color)] last:border-0 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 text-[14px] font-bold text-[var(--text-color)]">GBPUSD</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full bg-[#D9F7E8] text-[#00B69B] text-[11px] font-bold">Buy</span>
                  </td>
                  <td className="py-4 px-6 text-[14px] font-medium text-[var(--text-color)]">0.2</td>
                  <td className="py-4 px-6 text-[14px] font-medium text-[var(--text-color)]">$ 1.34998</td>
                  <td className="py-4 px-6 text-[14px] font-medium text-[var(--text-color)]">$ 1.35526</td>
                  <td className="py-4 px-6 text-[14px] font-medium text-[var(--text-color)]">$ 0</td>
                  <td className="py-4 px-6 text-[14px] font-medium text-[var(--text-color)]">$ 0</td>
                  <td className="py-4 px-6 text-[14px] font-medium text-[var(--text-color)]">$ 0</td>
                  <td className="py-4 px-6 text-[13px] font-medium text-[#8e9d9b]">24-04-2026 11:29 PM</td>
                  <td className="py-4 px-6 text-[14px] font-bold text-[#00B69B]">$ 105.60</td>
                  <td className="py-4 px-6">
                    <button className="text-[#EF5350] hover:text-[#f44336] transition-colors">
                      <X size={18} strokeWidth={2.5} />
                    </button>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="11" className="py-12 text-center text-[#8e9d9b] font-medium">No closed trades found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountDetailsPage;
