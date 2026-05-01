import React, { useState } from 'react';
import { DatePicker, Input, Button, Table } from 'antd';
import { Download, Search, Copy } from 'lucide-react';
import dayjs from 'dayjs';
import { useLanguage } from '../contexts/LanguageContext';
import DashboardHeader from './DashboardHeader';

const { RangePicker } = DatePicker;

const ranges = {
  'Today': [dayjs(), dayjs()],
  'Yesterday': [dayjs().add(-1, 'd'), dayjs().add(-1, 'd')],
  'Last 7 Days': [dayjs().add(-7, 'd'), dayjs()],
  'Last 14 Days': [dayjs().add(-14, 'd'), dayjs()],
  'Last 30 Days': [dayjs().add(-30, 'd'), dayjs()],
  'Last 90 Days': [dayjs().add(-90, 'd'), dayjs()],
};
const TRANSLATIONS = {
  EN: {
    ibCommission: "IB Commission",
    news: "News",
    dashboard: "Dashboard",
    search: "Search...",
    export: "Export",
    noRecord: "No Record Found",
    referralLink: "My Referral Link",
    summaryPrefix: "IB Commission",
    lot: "Lot",
    commission: "Commission",
    columns: {
      user: "User",
      loginId: "Login ID",
      level: "Level",
      lots: "Lots",
      commission: "Commission",
      symbol: "Symbol",
      affiliateCode: "Affiliate Code",
      accountNumber: "Account Number",
      accountType: "Account Type",
      userRole: "User Role",
      commissionDate: "Commission Date"
    }
  },
  HI: {
    ibCommission: "IB कमीशन",
    news: "समाचार",
    dashboard: "डैशबोर्ड",
    search: "खोजें...",
    export: "निर्यात",
    noRecord: "कोई रिकॉर्ड नहीं मिला",
    referralLink: "मेरा रेफरल लिंक",
    summaryPrefix: "IB कमीशन",
    lot: "लॉट",
    commission: "कमीशन",
    columns: {
      user: "उपयोगकर्ता",
      loginId: "लॉगिन आईडी",
      level: "लेवल",
      lots: "लॉट्स",
      commission: "कमीशन",
      symbol: "सिंबल",
      affiliateCode: "एफिलिएट कोड",
      accountNumber: "अकाउंट नंबर",
      accountType: "अकाउंट प्रकार",
      userRole: "उपयोगकर्ता भूमिका",
      commissionDate: "कमीशन तिथि"
    }
  }
};

const IBCommissionPage = ({ onNavigate }) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language] || TRANSLATIONS.EN;
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState(null);

  const columns = [
    {
      title: t.columns.user,
      dataIndex: 'user',
      key: 'user',
      render: (text) => <span className="text-white/90 font-medium">{text}</span>
    },
    { title: t.columns.loginId, dataIndex: 'loginId', key: 'loginId' },
    { title: t.columns.level, dataIndex: 'level', key: 'level' },
    { title: t.columns.lots, dataIndex: 'lots', key: 'lots' },
    {
      title: t.columns.commission,
      dataIndex: 'commission',
      key: 'commission',
      render: (val) => <span className="text-[#12716E] font-bold">${val}</span>
    },
    { title: t.columns.symbol, dataIndex: 'symbol', key: 'symbol' },
    { title: t.columns.affiliateCode, dataIndex: 'affiliateCode', key: 'affiliateCode' },
    { title: t.columns.accountNumber, dataIndex: 'accountNumber', key: 'accountNumber' },
    { title: t.columns.accountType, dataIndex: 'accountType', key: 'accountType' },
    { title: t.columns.userRole, dataIndex: 'userRole', key: 'userRole' },
    {
      title: t.columns.commissionDate,
      dataIndex: 'commissionDate',
      key: 'commissionDate',
      // sorter: (a, b) => dayjs(a.commissionDate).unix() - dayjs(b.commissionDate).unix(),
    },
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

  return (
    <div className="animate-fade-in space-y-4 pb-10">
      {/* ── Mobile View (lg:hidden) ── */}
      <div className="lg:hidden h-[calc(100vh-160px)] min-h-fit p-4 pb-[100px] bg-[var(--theme-bg)] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center gap-3 py-4 border-b border-white/5 mb-6 bg-[var(--theme-bg)] sticky top-0 z-[100]">
          <button onClick={() => onNavigate('IB_Dashboard')} className="p-1 -ml-1 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <h1 className="text-[20px] font-bold text-[#3B82F6]">{t.ibCommission}</h1>
        </div>

        <div className="space-y-5">
          {/* Filters Section */}
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <RangePicker 
                className="ib-datepicker w-full h-11 !border-[#3B82F6]/30 hover:!border-[#3B82F6]"
                format="DD-MM-YYYY"
                ranges={ranges}
                onChange={(dates) => setDateRange(dates)}
                placeholder={['Start date', 'End date']}
              />
            </div>

            <div className="flex items-center gap-3 w-full">
              <Input 
                placeholder={t.search} 
                prefix={<Search size={16} className="text-white/30" />}
                className="ib-input flex-1 h-11"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button 
                type="button"
                disabled={dataSource.length === 0}
                className={`h-11 px-4 bg-[#2b7fff] text-white border-none rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all ${dataSource.length === 0 ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#1a66ff]'}`}
              >
                <Download size={18} />
                {t.export}
              </button>
            </div>
          </div>

          {/* Summary Section */}
          <div className="flex flex-wrap items-center gap-1 text-white">
            <p className="text-[18px] font-bold">{t.summaryPrefix}</p>
            <span className="text-white/70 text-sm">
              ({t.lot}:<span className="text-white font-bold ml-1">0</span> {t.commission}:<span className="text-white font-bold ml-1">$ 0</span>)
            </span>
          </div>

          {/* Table Container */}
          <div className="mt-6 border border-white/5 rounded-xl overflow-hidden bg-[var(--theme-bg)] shadow-xl">
            <div className="overflow-x-auto">
              <Table 
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                className="ib-table"
                scroll={{ x: 1300 }}
                locale={{
                  emptyText: (
                    <div className="flex flex-col items-center justify-center py-20 text-white/30 italic font-medium">
                      <div className="mb-4 opacity-20">
                        <svg width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
                          <g transform="translate(0 1)" fill="none" fillRule="evenodd">
                            <ellipse fill="#272727" cx="32" cy="33" rx="32" ry="7"></ellipse>
                            <g fillRule="nonzero" stroke="#3e3e3e">
                              <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                              <path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#1d1d1d"></path>
                            </g>
                          </g>
                        </svg>
                      </div>
                      {t.noRecord}
                    </div>
                  )
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Desktop View (lg:block hidden on mobile) ── */}
      <div className="hidden lg:block">
        <DashboardHeader 
          title={t.ibCommission}
          breadcrumbs={[{ title: t.ibCommission, active: true }]}
          onNavigate={onNavigate}
          activeTab="IB Dashboard"
          extra={extraHeader}
          showMobileBack={true}
          mobileBackTo="IB_Dashboard"
        />

        {/* Filters Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-2">
          <RangePicker 
            className="ib-datepicker w-full md:w-auto"
            format="DD-MM-YYYY"
            ranges={ranges}
            onChange={(dates) => setDateRange(dates)}
            placeholder={['Start date', 'End date']}
          />
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Input 
              placeholder={t.search} 
              prefix={<Search size={16} className="text-white/30" />}
              className="ib-input w-full md:w-[220px]"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button 
              type="button"
              disabled={dataSource.length === 0}
              className={`h-[38px] px-6 bg-[#158B86] hover:bg-[#117672] text-white border-none rounded-lg font-semibold flex items-center gap-2 shadow-lg shadow-teal-900/20 transition-all ${dataSource.length === 0 ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <Download size={16} />
              {t.export}
            </button>
          </div>
        </div>

        {/* Summary Section */}
        <div className="px-1">
          <h3 className="text-[18px] font-semibold text-white">
            {t.summaryPrefix} <span className="text-white/60 text-[14px] font-normal">({t.lot}:<span className="text-white font-bold mx-1">0</span> {t.commission}:<span className="text-white font-bold mx-1">-$ 0</span>)</span>
          </h3>
        </div>

        {/* Main Content Card */}
        <div className="bg-[var(--bg-color)] border border-[var(--border-color)] rounded-2xl p-0 overflow-hidden shadow-sm min-h-[400px]">
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
      </div>
    </div>
  );
};

export default IBCommissionPage;
