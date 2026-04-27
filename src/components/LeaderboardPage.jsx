import React, { useState } from 'react';
import { Home, ChevronRight, Trophy, Award, Medal } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import noDataImage from '../assets/nodata.svg';

const TRANSLATIONS = {
  EN: {
    news: "News",
    userDashboard: "User Dashboard",
    ibDashboard: "IB Dashboard",
    leaderboard: "Leaderboard",
    profit: "Profit",
    profitPerc: "Profit %",
    avgWin: "Avg Win:",
    avgLoss: "Avg Loss:",
    totalLots: "Total Lots:",
    noRecord: "No Record Found",
    rank: "Rank",
    login: "Login",
    trader: "Trader",
    winRatio: "Win Ratio",
    pair: "Pair",
    avgDuration: "Avg. Duration",
    trades: "Trades",
    losingStreak: "Losing Streak",
    winningStreak: "Winning Streak",
    noLeaderboardData: "No Leaderboard Data Yet",
    noDataShow: "There is no data to show you right now"
  },
  HI: {
    news: "समाचार",
    userDashboard: "यूजर डैशबोर्ड",
    ibDashboard: "आईबी डैशबोर्ड",
    leaderboard: "लीडरबोर्ड",
    profit: "लाभ",
    profitPerc: "लाभ %",
    avgWin: "औसत जीत:",
    avgLoss: "औसत हानि:",
    totalLots: "कुल लॉट्स:",
    noRecord: "कोई रिकॉर्ड नहीं मिला",
    rank: "रैंक",
    login: "लॉगिन",
    trader: "ट्रेडर",
    winRatio: "जीत का अनुपात",
    pair: "पेयर",
    avgDuration: "औसत अवधि",
    trades: "ट्रेड्स",
    losingStreak: "हार का सिलसिला",
    winningStreak: "जीत का सिलसिला",
    noLeaderboardData: "अभी तक कोई लीडरबोर्ड डेटा नहीं है",
    noDataShow: "अभी आपको दिखाने के लिए कोई डेटा नहीं है"
  }
};

const WinnerCard = ({ rank, name, login, amount, stats, language }) => {
  const t = (key) => TRANSLATIONS[language]?.[key] || key;
  
  const getMedalColor = () => {
    if (rank === 1) return 'text-[#FFD700]'; // Gold
    if (rank === 2) return 'text-[#C0C0C0]'; // Silver
    return 'text-[#CD7F32]'; // Bronze
  };

  const getMedalBg = () => {
    if (rank === 1) return 'bg-[#FFD700]/10';
    if (rank === 2) return 'bg-[#C0C0C0]/10';
    return 'bg-[#CD7F32]/10';
  };

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[12px] p-6 flex flex-col shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${getMedalBg()}`}>
                <Medal size={32} className={getMedalColor()} />
            </div>
            <div className="flex flex-col">
                <span className="text-[18px] font-bold text-[var(--text-color)]">{name}</span>
                <span className="text-[13px] text-[#8e9d9b]">{login}</span>
            </div>
        </div>
        <div className="text-[22px] font-bold text-[#158B86]">
            ${amount}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <div className="flex flex-col">
            <span className="text-[12px] text-[#8e9d9b] mb-1">{t('profitPerc')}</span>
            <span className="text-[15px] font-bold text-[var(--text-color)]">{stats.profitPerc}</span>
        </div>
        <div className="flex flex-col">
            <span className="text-[12px] text-[#8e9d9b] mb-1">{t('avgWin')}</span>
            <span className="text-[15px] font-bold text-[var(--text-color)]">{stats.avgWin}</span>
        </div>
        <div className="flex flex-col">
            <span className="text-[12px] text-[#8e9d9b] mb-1">{t('avgLoss')}</span>
            <span className="text-[15px] font-bold text-[var(--text-color)]">{stats.avgLoss}</span>
        </div>
        <div className="flex flex-col">
            <span className="text-[12px] text-[#8e9d9b] mb-1">{t('totalLots')}</span>
            <span className="text-[15px] font-bold text-[var(--text-color)]">{stats.totalLots}</span>
        </div>
      </div>
    </div>
  );
};

const LeaderboardPage = ({ onNavigate }) => {
  const [dashboardType, setDashboardType] = useState('User');
  const { language } = useLanguage();
  const t = (key) => TRANSLATIONS[language]?.[key] || key;

  // Set this to true to show the high-fidelity layout, false for empty state
  const hasRecords = false; 

  const topThree = [
    { rank: 1, name: "Mi** **", login: "**58*", amount: "1575.29", stats: { profitPerc: "100", avgWin: "166.97", avgLoss: "-122.2", totalLots: "87.54" } },
    { rank: 2, name: "Ra** Kr******** Ba****", login: "**56*", amount: "573.55", stats: { profitPerc: "100", avgWin: "279.4", avgLoss: "-227.26", totalLots: "123.14" } },
    { rank: 3, name: "Mi** **", login: "**55*", amount: "21.16", stats: { profitPerc: "100", avgWin: "7.05", avgLoss: "0", totalLots: "0.12" } }
  ];

  const tableHeaders = [
    'rank', 'login', 'trader', 'profit', 'profitPerc', 'winRatio', 'pair', 
    'avgWin', 'avgLoss', 'avgDuration', 'trades', 'losingStreak', 'winningStreak', 'totalLots'
  ];

  return (
    <div className="flex flex-col w-full animate-fade-in pb-20">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)] mb-6 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-[20px] md:text-[24px] font-extrabold text-[var(--text-color)] tracking-tight leading-none">{t('leaderboard')}</h1>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#AF6C56] animate-pulse" />
            <span className="bg-[#158B86] text-white text-sm font-medium px-2 rounded-sm">{t('news')}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="bg-[var(--sub-bg)] border border-[var(--border-color)] p-1.5 rounded-full flex items-center h-[40px]">
                <button onClick={() => setDashboardType('User')} className={`px-4 sm:px-5 py-1.5 rounded-full text-[13px] sm:text-[14px] transition-colors ${dashboardType === 'User' ? 'font-semibold bg-[#158B86] text-white shadow-sm' : 'font-medium text-[#8e9d9b] hover:text-[var(--text-color)]'}`}>{t('userDashboard')}</button>
                <button onClick={() => setDashboardType('IB')}   className={`px-4 sm:px-5 py-1.5 rounded-full text-[13px] sm:text-[14px] transition-colors ${dashboardType === 'IB'   ? 'font-semibold bg-[#158B86] text-white shadow-sm' : 'font-medium text-[#8e9d9b] hover:text-[var(--text-color)]'}`}>{t('ibDashboard')}</button>
            </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[15px] mb-8 font-medium shrink-0">
        <Home size={18} className="text-[#158B86] cursor-pointer hover:opacity-80 transition-colors" strokeWidth={2.5} onClick={() => onNavigate('Dashboard')} />
        <ChevronRight size={16} className="text-gray-500" strokeWidth={2} />
        <span className="text-[var(--text-color)]">{t('leaderboard')}</span>
      </div>

      {hasRecords ? (
        <>
          {/* Top 3 Winners */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {topThree.map((winner, idx) => (
              <WinnerCard key={idx} {...winner} language={language} />
            ))}
          </div>

          {/* Leaderboard Table */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[12px] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1200px]">
                <thead>
                  <tr className="bg-[var(--sub-bg)] border-b border-[var(--border-color)]">
                    {tableHeaders.map((header, idx) => (
                      <th key={idx} className={`px-4 py-4 text-[13px] font-bold text-[var(--text-color)] whitespace-nowrap ${idx !== 0 ? 'border-l border-[var(--border-color)]' : ''}`}>
                        {t(header)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={tableHeaders.length} className="py-20 text-center">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="w-16 h-16 bg-[var(--sub-bg)] rounded-xl flex items-center justify-center border border-[var(--border-color)]">
                            <Trophy size={32} className="text-[#8e9d9b] opacity-30" />
                        </div>
                        <span className="text-[14px] font-medium text-[#8e9d9b]">{t('noRecord')}</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center py-20 min-h-[500px]">
          <img src={noDataImage} alt="No Data" className="w-[280px] md:w-[350px] mb-8 opacity-90" />
          <h2 className="text-[26px] md:text-[30px] font-bold text-[var(--text-color)] mb-3 text-center tracking-tight opacity-90">{t('noLeaderboardData')}</h2>
          <p className="text-[#8e9d9b] text-[15px] md:text-[16px] font-medium text-center max-w-[400px]">{t('noDataShow')}</p>
        </div>
      )}
    </div>
  );
};

export default LeaderboardPage;
