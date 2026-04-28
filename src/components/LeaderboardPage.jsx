import React, { useState, useEffect } from 'react';
import { Home, ChevronRight, Trophy, Medal } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import noDataImage from '../assets/nodata.svg';
import rank1 from '../assets/rank1.png';
import rank2 from '../assets/rank2.png';

const BASE = 'https://mt5.neptunefxcrm.com/api';

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
  
  const getMedalImg = () => {
    if (rank === 1) return rank1;
    if (rank === 2) return rank2;
    return null;
  };

  const getMedalBg = () => {
    if (rank === 1) return 'bg-[#FFD700]/5';
    if (rank === 2) return 'bg-[#C0C0C0]/5';
    return 'bg-[#CD7F32]/5';
  };

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[12px] p-6 flex flex-col shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center overflow-hidden`}>
                {getMedalImg() ? (
                  <img src={getMedalImg()} alt={`Rank ${rank}`} className="w-full h-full object-contain" />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${getMedalBg()}`}>
                    <Medal size={32} className="text-[#CD7F32]" />
                  </div>
                )}
            </div>
            <div className="flex flex-col">
                <span className="text-[18px] font-bold text-[var(--text-color)]">{name}</span>
                <span className="text-[13px] text-[#8e9d9b]">{login}</span>
            </div>
        </div>
        <div className="text-[22px] font-bold text-[#00C853]">
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
  const { token } = useAuth();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const t = (key) => TRANSLATIONS[language]?.[key] || key;

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/LeaderBoard/Get-Leader-Board?PageNumber=1&PageSize=20&searchKeyword=`, {
        headers: { Accept: 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }
      });
      if (res.ok) {
        const json = await res.json();
        const list = json?.data?.list ?? json?.data ?? [];
        setLeaderboardData(Array.isArray(list) ? list : []);
      }
    } catch (_) {}
    finally { setLoading(false); }
  };

  useEffect(() => { fetchLeaderboard(); }, [token]);

  const topTwo = leaderboardData.slice(0, 2).map((item, idx) => ({
    rank: idx + 1,
    name: item.traderName ?? item.trader ?? item.Trader ?? '***',
    login: item.login ?? item.Login ?? '***',
    amount: Number(item.profit ?? item.Profit ?? 0).toFixed(2),
    stats: {
      profitPerc: Number(item.profitPerc ?? item.ProfitPercentage ?? 0).toFixed(0),
      avgWin: Number(item.avgWin ?? item.AvgWin ?? 0).toFixed(2),
      avgLoss: Number(item.avgLoss ?? item.AvgLoss ?? 0).toFixed(2),
      totalLots: Number(item.totalLots ?? item.TotalLots ?? 0).toFixed(2)
    }
  }));

  const tableHeaders = [
    'rank', 'login', 'trader', 'profit', 'profitPerc', 'winRatio', 'pair', 
    'avgWin', 'avgLoss', 'avgDuration', 'trades', 'losingStreak', 'winningStreak', 'totalLots'
  ];

  return (
    <div className="flex flex-col w-full animate-fade-in pb-20">
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

      <div className="flex items-center gap-2 text-[15px] mb-8 font-medium shrink-0">
        <Home size={18} className="text-[#158B86] cursor-pointer hover:opacity-80 transition-colors" strokeWidth={2.5} onClick={() => onNavigate('Dashboard')} />
        <ChevronRight size={16} className="text-gray-500" strokeWidth={2} />
        <span className="text-[var(--text-color)]">{t('leaderboard')}</span>
      </div>

      {leaderboardData.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {topTwo.map((winner, idx) => (
              <WinnerCard key={idx} {...winner} language={language} />
            ))}
          </div>

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
                  {loading ? (
                    <tr><td colSpan={tableHeaders.length} className="py-20 text-center text-[#8e9d9b]">Loading...</td></tr>
                  ) : leaderboardData.map((item, i) => (
                    <tr key={i} className="border-b border-[var(--border-color)] hover:bg-white/5 transition-colors">
                      <td className="px-4 py-4 text-[14px] text-[var(--text-color)] font-medium">{i + 1}</td>
                      <td className="px-4 py-4 text-[14px] text-[var(--text-color)] border-l border-[var(--border-color)]">{item.login ?? item.Login ?? '***'}</td>
                      <td className="px-4 py-4 text-[14px] text-[var(--text-color)] border-l border-[var(--border-color)]">{item.traderName ?? item.trader ?? item.Trader ?? '***'}</td>
                      <td className="px-4 py-4 text-[14px] text-[#00C853] font-bold border-l border-[var(--border-color)]">${Number(item.profit ?? item.Profit ?? 0).toFixed(2)}</td>
                      <td className="px-4 py-4 text-[14px] text-[var(--text-color)] border-l border-[var(--border-color)]">{Number(item.profitPerc ?? item.ProfitPercentage ?? 0).toFixed(0)}%</td>
                      <td className="px-4 py-4 text-[14px] text-[var(--text-color)] border-l border-[var(--border-color)]">{Number(item.winRatio ?? item.WinRatio ?? 0).toFixed(2)}%</td>
                      <td className="px-4 py-4 text-[14px] text-[var(--text-color)] border-l border-[var(--border-color)]">{item.pair ?? item.Pair ?? '-'}</td>
                      <td className="px-4 py-4 text-[14px] text-[var(--text-color)] border-l border-[var(--border-color)]">{Number(item.avgWin ?? item.AvgWin ?? 0).toFixed(2)}</td>
                      <td className="px-4 py-4 text-[14px] text-red-400 border-l border-[var(--border-color)]">{Number(item.avgLoss ?? item.AvgLoss ?? 0).toFixed(2)}</td>
                      <td className="px-4 py-4 text-[14px] text-[var(--text-color)] border-l border-[var(--border-color)]">{item.avgDuration ?? item.AvgDuration ?? '-'}</td>
                      <td className="px-4 py-4 text-[14px] text-[var(--text-color)] border-l border-[var(--border-color)]">{item.trades ?? item.Trades ?? 0}</td>
                      <td className="px-4 py-4 text-[14px] text-red-400 border-l border-[var(--border-color)]">{item.losingStreak ?? item.LosingStreak ?? 0}</td>
                      <td className="px-4 py-4 text-[14px] text-green-400 border-l border-[var(--border-color)]">{item.winningStreak ?? item.WinningStreak ?? 0}</td>
                      <td className="px-4 py-4 text-[14px] text-[var(--text-color)] border-l border-[var(--border-color)]">{Number(item.totalLots ?? item.TotalLots ?? 0).toFixed(2)}</td>
                    </tr>
                  ))}
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
