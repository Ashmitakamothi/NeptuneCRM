import React, { useState } from 'react';
import { DatePicker, Input, Button, Table } from 'antd';
import { Download, Search, Copy } from 'lucide-react';
import dayjs from 'dayjs';
import { useLanguage } from '../contexts/LanguageContext';
import DashboardHeader from './DashboardHeader';

const { RangePicker } = DatePicker;

const TRANSLATIONS = {
  EN: {
    withdraw: "Withdraw",
    news: "News",
    dashboard: "Dashboard",
    teamWithdraw: "Withdraw",
    search: "Search...",
    export: "Export",
    noRecord: "No Record Found",
    referralLink: "My Referral Link",
    columns: {
      user: "User",
      walletNo: "Wallet No.",
      balance: "Balance",
      amount: "Amount",
      withdrawType: "Withdraw Type",
      requestDate: "Request Date",
      actionDate: "Action Date",
      actionBy: "Action By",
      actions: "Actions"
    }
  },
  HI: {
    withdraw: "निकासी (Withdraw)",
    news: "समाचार",
    dashboard: "डैशबोर्ड",
    teamWithdraw: "निकासी",
    search: "खोजें...",
    export: "निर्यात",
    noRecord: "कोई रिकॉर्ड नहीं मिला",
    referralLink: "मेरा रेफरल लिंक",
    columns: {
      user: "उपयोगकर्ता",
      walletNo: "वॉलेट नंबर",
      balance: "बैलेंस",
      amount: "राशि",
      withdrawType: "निकासी प्रकार",
      requestDate: "अनुरोध की तिथि",
      actionDate: "कार्रवाई की तिथि",
      actionBy: "किसके द्वारा",
      actions: "कार्रवाई"
    }
  }
};

const IBTeamWithdrawPage = ({ onNavigate }) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language] || TRANSLATIONS.EN;
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState(null);

  const columns = [
    {
      title: t.columns.user,
      dataIndex: 'user',
      key: 'user',
      // sorter: (a, b) => a.user.localeCompare(b.user),
      render: (text) => <span className="text-white/90 font-medium">{text}</span>
    },
    {
      title: t.columns.walletNo,
      dataIndex: 'walletNo',
      key: 'walletNo',
    },
    {
      title: t.columns.balance,
      dataIndex: 'balance',
      key: 'balance',
      render: (val) => <span className="text-white font-medium">${val}</span>
    },
    {
      title: t.columns.amount,
      dataIndex: 'amount',
      key: 'amount',
      // sorter: (a, b) => parseFloat(a.amount) - parseFloat(b.amount),
      render: (amount) => <span className="font-bold text-[var(--text-color)]">${amount}</span>
    },
    {
      title: t.columns.withdrawType,
      dataIndex: 'withdrawType',
      key: 'withdrawType',
    },
    {
      title: t.columns.requestDate,
      dataIndex: 'requestDate',
      key: 'requestDate',
      // sorter: (a, b) => dayjs(a.requestDate, 'DD-MM-YYYY HH:mm').unix() - dayjs(b.requestDate, 'DD-MM-YYYY HH:mm').unix(),
    },
    {
      title: t.columns.actionDate,
      dataIndex: 'actionDate',
      key: 'actionDate',
    },
    {
      title: t.columns.actionBy,
      dataIndex: 'actionBy',
      key: 'actionBy',
    },
    {
      title: t.columns.actions,
      key: 'actions',
      render: () => (
        <Button type="text" className="text-[#12716E] hover:text-white transition-colors p-0">
          <Search size={18} />
        </Button>
      ),
    },
  ];

  const dataSource = [];

  const extraHeader = (
    <div className="hidden md:flex items-center gap-3 bg-[var(--segmented-bg)] border border-[var(--border-color)] px-5 py-2 rounded-xl">
       <p className="text-[14px] font-medium text-[var(--text-color)]">{t.referralLink}: <span className="text-[var(--text-color)]">IFAHGGAP</span></p>
       <button className="text-[var(--text-color)] opacity-40 hover:opacity-100 transition-opacity">
         <Copy size={16} />
       </button>
    </div>
  );

  return (
    <div className="animate-fade-in space-y-4 pb-10">
      <DashboardHeader 
        title={t.withdraw}
        breadcrumbs={[{ title: t.teamWithdraw, active: true }]}
        onNavigate={onNavigate}
        activeTab="IB Dashboard"
        extra={extraHeader}
        showMobileBack={true}
        mobileBackTo="IB_Dashboard"
      />

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row items-center justify-end gap-4 py-2">
        <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
          <RangePicker 
            className="ib-datepicker w-full md:w-auto"
            format="DD-MM-YYYY"
            onChange={(dates) => setDateRange(dates)}
            placeholder={['Start date', 'End date']}
          />
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Input 
              placeholder={t.search} 
              prefix={<Search size={16} className="text-[var(--text-color)] opacity-30" />}
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
      </div>

      {/* Main Content Card */}
      <div className="bg-[var(--bg-color)] border border-[var(--border-color)] rounded-2xl p-0 overflow-hidden shadow-sm min-h-[400px]">
        {/* Table Section */}
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

export default IBTeamWithdrawPage;
