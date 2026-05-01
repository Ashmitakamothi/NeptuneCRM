import React, { useState } from 'react';
import { Breadcrumb, DatePicker, Input, Button, Table, Tag } from 'antd';
import { Home, ChevronRight, Download, Search, Copy } from 'lucide-react';
import dayjs from 'dayjs';
import { useLanguage } from '../contexts/LanguageContext';
import DashboardHeader from './DashboardHeader';

const { RangePicker } = DatePicker;

const TRANSLATIONS = {
  EN: {
    deposit: "Deposit",
    news: "News",
    dashboard: "Dashboard",
    teamDeposit: "Team Deposit",
    search: "Search...",
    export: "Export",
    noRecord: "No Record Found",
    columns: {
      user: "User",
      paymentFrom: "Payment From",
      paymentTo: "Payment To",
      amount: "Amount",
      depositType: "Deposit Type",
      commission: "Commission",
      transactionDate: "Transaction Date",
      referenceId: "Reference ID",
      status: "Status",
      actions: "Actions"
    }
  },
  HI: {
    deposit: "जमा (Deposit)",
    news: "समाचार",
    dashboard: "डैशबोर्ड",
    teamDeposit: "टीम जमा",
    search: "खोजें...",
    export: "निर्यात",
    noRecord: "कोई रिकॉर्ड नहीं मिला",
    columns: {
      user: "उपयोगकर्ता",
      paymentFrom: "भुगतान से",
      paymentTo: "भुगतान प्राप्तकर्ता",
      amount: "राशि",
      depositType: "जमा प्रकार",
      commission: "कमीशन",
      transactionDate: "लेन-देन की तिथि",
      referenceId: "संदर्भ आईडी",
      status: "स्थिति",
      actions: "कार्रवाई"
    }
  }
};

const IBTeamDepositPage = ({ onNavigate }) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language] || TRANSLATIONS.EN;
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState(null);

  const columns = [
    {
      title: t.columns.user,
      dataIndex: 'user',
      key: 'user',
      sorter: (a, b) => a.user.localeCompare(b.user),
      render: (text) => <span className="text-white/90 font-medium">{text}</span>
    },
    {
      title: t.columns.paymentFrom,
      dataIndex: 'paymentFrom',
      key: 'paymentFrom',
    },
    {
      title: t.columns.paymentTo,
      dataIndex: 'paymentTo',
      key: 'paymentTo',
    },
    {
      title: t.columns.amount,
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => parseFloat(a.amount) - parseFloat(b.amount),
      render: (amount) => <span className="font-bold text-white">${amount}</span>
    },
    {
      title: t.columns.depositType,
      dataIndex: 'depositType',
      key: 'depositType',
    },
    {
      title: t.columns.commission,
      dataIndex: 'commission',
      key: 'commission',
      render: (val) => <span className="text-[#12716E] font-bold">${val}</span>
    },
    {
      title: t.columns.transactionDate,
      dataIndex: 'transactionDate',
      key: 'transactionDate',
      sorter: (a, b) => dayjs(a.transactionDate, 'DD-MM-YYYY HH:mm').unix() - dayjs(b.transactionDate, 'DD-MM-YYYY HH:mm').unix(),
    },
    {
      title: t.columns.referenceId,
      dataIndex: 'referenceId',
      key: 'referenceId',
    },
    {
      title: t.columns.status,
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'gold';
        if (status === 'SUCCESS') color = 'green';
        if (status === 'REJECTED') color = 'red';
        return <Tag color={color}>{status}</Tag>;
      }
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
    <div className="hidden md:flex items-center gap-3 bg-[#111818] border border-white/5 px-5 py-2 rounded-xl">
       <p className="text-[14px] font-medium text-white">My Referral Link: <span className="text-white">IFAHGGAP</span></p>
       <button className="text-white hover:opacity-80 transition-all">
         <Copy size={16} />
       </button>
    </div>
  );

  return (
    <div className="animate-fade-in space-y-4 pb-10">
      <DashboardHeader 
        title={t.deposit}
        breadcrumbs={[{ title: t.teamDeposit, active: true }]}
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

export default IBTeamDepositPage;
