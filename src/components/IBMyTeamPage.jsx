import React, { useState, useEffect } from 'react';
import { Input, Button, Table, Segmented } from 'antd';
import { Download, Search, Copy } from 'lucide-react';
import dayjs from 'dayjs';
import { useLanguage } from '../contexts/LanguageContext';
import DashboardHeader from './DashboardHeader';

const TRANSLATIONS = {
  EN: {
    myTraderTeam: "My Trader Team",
    news: "News",
    myTeam: "My Team",
    allTeam: "All Team",
    search: "Search...",
    export: "Export",
    noRecord: "No Record Found",
    referralLink: "My Referral Link",
    columns: {
      user: "User",
      level: "Level",
      ftd: "FTD",
      referralCode: "Referral Code",
      userType: "User Type",
      lots: "Lots",
      commission: "Commission",
      registeredDate: "Registered Date",
      remark: "Remark"
    }
  },
  HI: {
    myTraderTeam: "मेरी ट्रेडर टीम",
    news: "समाचार",
    myTeam: "मेरी टीम",
    allTeam: "सभी टीम",
    search: "खोजें...",
    export: "निर्यात",
    noRecord: "कोई रिकॉर्ड नहीं मिला",
    referralLink: "मेरा रेफरल लिंक",
    columns: {
      user: "उपयोगकर्ता",
      level: "लेवल",
      ftd: "FTD",
      referralCode: "रेफरल कोड",
      userType: "उपयोगकर्ता प्रकार",
      lots: "लॉट्स",
      commission: "कमीशन",
      registeredDate: "पंजीकरण की तिथि",
      remark: "टिप्पणी"
    }
  }
};

const IBMyTeamPage = ({ onNavigate }) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language] || TRANSLATIONS.EN;
  const [searchText, setSearchText] = useState('');
  
  // Initialize filter from URL if present
  const [teamFilter, setTeamFilter] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const filter = params.get('filter');
    if (filter === 'All Team') return 'All Team';
    return 'My Team';
  });

  const [isLoading, setIsLoading] = useState(false);

  // Sync URL with filter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('filter', teamFilter);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
  }, [teamFilter]);

  const handleFilterChange = (val) => {
    const newFilter = val === t.myTeam ? 'My Team' : 'All Team';
    if (newFilter !== teamFilter) {
      setIsLoading(true);
      setTeamFilter(newFilter);
      // Simulate loading for the "load" effect
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }
  };

  const columns = [
    {
      title: t.columns.user,
      dataIndex: 'user',
      key: 'user',
      sorter: (a, b) => a.user.localeCompare(b.user),
      render: (text) => <span className="text-white/90 font-medium">{text}</span>
    },
    { title: t.columns.level, dataIndex: 'level', key: 'level', sorter: (a, b) => a.level - b.level },
    { title: t.columns.ftd, dataIndex: 'ftd', key: 'ftd' },
    { title: t.columns.referralCode, dataIndex: 'referralCode', key: 'referralCode' },
    { title: t.columns.userType, dataIndex: 'userType', key: 'userType' },
    { title: t.columns.lots, dataIndex: 'lots', key: 'lots', sorter: (a, b) => a.lots - b.lots },
    {
      title: t.columns.commission,
      dataIndex: 'commission',
      key: 'commission',
      sorter: (a, b) => parseFloat(a.commission) - parseFloat(b.commission),
      render: (val) => <span className="text-[#12716E] font-bold">${val}</span>
    },
    {
      title: t.columns.registeredDate,
      dataIndex: 'registeredDate',
      key: 'registeredDate',
      sorter: (a, b) => dayjs(a.registeredDate).unix() - dayjs(b.registeredDate).unix(),
    },
    { title: t.columns.remark, dataIndex: 'remark', key: 'remark' },
  ];

  const dataSource = [];

  const extraHeader = (
    <div className="hidden md:flex items-center gap-3 bg-[#111818] border border-white/5 px-5 py-2 rounded-xl">
       <p className="text-[14px] font-medium text-white">{t.referralLink}: <span className="text-white">IFAHGGAP</span></p>
       <button className="text-white hover:opacity-80 transition-all">
         <Copy size={16} />
       </button>
    </div>
  );

  // Skeleton Table for loading state
  const SkeletonTable = () => (
    <div className="w-full p-6 space-y-4 animate-pulse">
      <div className="grid grid-cols-9 gap-4 mb-8">
        {Array(9).fill(0).map((_, i) => (
          <div key={i} className="h-4 bg-white/5 rounded-md w-full"></div>
        ))}
      </div>
      {Array(8).fill(0).map((_, i) => (
        <div key={i} className="grid grid-cols-9 gap-4 py-2 border-b border-white/5">
          {Array(9).fill(0).map((_, j) => (
            <div key={j} className="h-8 bg-white/5 rounded-md w-full"></div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="animate-fade-in space-y-4 pb-10">
      <DashboardHeader 
        title={t.myTraderTeam}
        breadcrumbs={[{ title: t.myTraderTeam, active: true }]}
        onNavigate={onNavigate}
        activeTab="IB Dashboard"
        extra={extraHeader}
      />

      {/* Tabs & Filters Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-2">
        <Segmented
          options={[t.myTeam, t.allTeam]}
          value={teamFilter === 'My Team' ? t.myTeam : t.allTeam}
          onChange={handleFilterChange}
          className="ib-segmented"
        />

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Input 
            placeholder={t.search} 
            prefix={<Search size={16} className="text-white/30" />}
            className="ib-input w-full md:w-[220px]"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button 
            type="primary"
            icon={<Download size={16} />}
            disabled={dataSource.length === 0 || isLoading}
            className={`!bg-[#158B86] border-none flex items-center gap-2 h-[38px] px-6 rounded-lg font-semibold shadow-lg shadow-[#158b86]/20 !text-white transition-all ${dataSource.length === 0 || isLoading ? 'opacity-60 cursor-not-allowed' : 'hover:!bg-[#12726e]'}`}
          >
            {t.export}
          </Button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-[var(--bg-color)] border border-[var(--border-color)] rounded-2xl p-0 overflow-hidden shadow-sm min-h-[400px]">
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <div className="overflow-x-auto w-full">
          <Table 
            columns={columns}
            dataSource={dataSource}
            pagination={{
              pageSize: 10,
              className: "ib-pagination px-6 py-4",
            }}
            className="ib-table"
            scroll={{ x: 1300 }}
            locale={{
              emptyText: (
                <div className="flex flex-col items-center justify-center py-12 text-[#8e9d9b]">
                  <div className="bg-white/5 p-4 rounded-full mb-4">
                     <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
                       <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                       <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                     </svg>
                  </div>
                  <span className="text-[14px] font-medium">{t.noRecord}</span>
                </div>
              )
            }}
          />
          </div>
        )}
      </div>
    </div>
  );
};

export default IBMyTeamPage;
