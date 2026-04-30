import React, { useState } from 'react';
import { DatePicker, Input, Button, Table } from 'antd';
import { Download, Search, Copy } from 'lucide-react';
import dayjs from 'dayjs';
import { useLanguage } from '../contexts/LanguageContext';
import DashboardHeader from './DashboardHeader';

const { RangePicker } = DatePicker;

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
      <DashboardHeader 
        title={t.ibCommission}
        breadcrumbs={[{ title: t.ibCommission, active: true }]}
        onNavigate={onNavigate}
        activeTab="IB Dashboard"
        extra={extraHeader}
      />

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-2">
        <RangePicker 
          className="ib-datepicker w-full md:w-auto"
          format="DD-MM-YYYY"
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
          <Button 
            type="primary"
            icon={<Download size={16} />}
            disabled={dataSource.length === 0}
            className={`!bg-[#158B86] border-none flex items-center gap-2 h-[38px] px-6 rounded-lg font-semibold shadow-lg shadow-[#158b86]/20 !text-white transition-all ${dataSource.length === 0 ? 'opacity-60 cursor-not-allowed' : 'hover:!bg-[#12726e]'}`}
          >
            {t.export}
          </Button>
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
  );
};

export default IBCommissionPage;
