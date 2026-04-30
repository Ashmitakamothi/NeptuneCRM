import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Segmented } from 'antd';
import { Search, Copy } from 'lucide-react';
import dayjs from 'dayjs';
import { useLanguage } from '../contexts/LanguageContext';
import DashboardHeader from './DashboardHeader';

const TRANSLATIONS = {
  EN: {
    liveAccount: "Live Account",
    approved: "Approved",
    pending: "Pending",
    declined: "Declined",
    search: "Search",
    noRecord: "No Record Found",
    referralLink: "My Referral Link",
    approvedAccounts: "Approved Accounts",
    pendingAccounts: "Pending Accounts",
    declinedAccounts: "Declined Accounts",
    columns: {
      name: "Name",
      accountNumber: "Account Number",
      accountType: "Account Type",
      leverage: "Leverage",
      balance: "Balance",
      currency: "Currency",
      requestTime: "Request Time",
      actionBy: "Action By",
      remark: "Remark"
    }
  },
  HI: {
    liveAccount: "लाइव अकाउंट",
    approved: "स्वीकृत",
    pending: "लंबित",
    declined: "अस्वीकृत",
    search: "खोजें",
    noRecord: "कोई रिकॉर्ड नहीं मिला",
    referralLink: "मेरा रेफरल लिंक",
    approvedAccounts: "स्वीकृत खाते",
    pendingAccounts: "लंबित खाते",
    declinedAccounts: "अस्वीकृत खाते",
    columns: {
      name: "नाम",
      accountNumber: "खाता संख्या",
      accountType: "खाते का प्रकार",
      leverage: "लीवरेज",
      balance: "बैलेंस",
      currency: "मुद्रा",
      requestTime: "अनुरोध का समय",
      actionBy: "किसके द्वारा",
      remark: "टिप्पणी"
    }
  }
};

const IBLiveAccountPage = ({ onNavigate }) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language] || TRANSLATIONS.EN;
  const [searchText, setSearchText] = useState('');
  
  const [statusFilter, setStatusFilter] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');
    if (['Approved', 'Pending', 'Declined'].includes(status)) return status;
    return 'Approved';
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('status', statusFilter);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
  }, [statusFilter]);

  const handleStatusChange = (val) => {
    let newStatus = 'Approved';
    if (val === t.pending) newStatus = 'Pending';
    else if (val === t.declined) newStatus = 'Declined';

    if (newStatus !== statusFilter) {
      setIsLoading(true);
      setStatusFilter(newStatus);
      setTimeout(() => setIsLoading(false), 600);
    }
  };

  const columns = [
    {
      title: t.columns.name,
      dataIndex: 'name',
      key: 'name',
      // sorter: (a, b) => (a.name || '').localeCompare(b.name || ''),
      render: (text) => <span className="text-white/90 font-medium">{text}</span>
    },
    { 
      title: t.columns.accountNumber, 
      dataIndex: 'accountNumber', 
      key: 'accountNumber',
      // sorter: (a, b) => (a.accountNumber || '').localeCompare(b.accountNumber || ''),
    },
    { 
      title: t.columns.accountType, 
      dataIndex: 'accountType', 
      key: 'accountType',
      // sorter: (a, b) => (a.accountType || '').localeCompare(b.accountType || ''),
    },
    { 
      title: t.columns.leverage, 
      dataIndex: 'leverage', 
      key: 'leverage',
      // sorter: (a, b) => (a.leverage || '').localeCompare(b.leverage || ''),
    },
    { 
      title: t.columns.balance, 
      dataIndex: 'balance', 
      key: 'balance',
      // sorter: (a, b) => parseFloat(a.balance || 0) - parseFloat(b.balance || 0),
    },
    { 
      title: t.columns.currency, 
      dataIndex: 'currency', 
      key: 'currency',
      // sorter: (a, b) => (a.currency || '').localeCompare(b.currency || ''),
    },
    {
      title: t.columns.requestTime,
      dataIndex: 'requestTime',
      key: 'requestTime',
      // sorter: (a, b) => dayjs(a.requestTime).unix() - dayjs(b.requestTime).unix(),
    },
    { 
      title: t.columns.actionBy, 
      dataIndex: 'actionBy', 
      key: 'actionBy',
      // sorter: (a, b) => (a.actionBy || '').localeCompare(b.actionBy || ''),
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

  const tableTitle = statusFilter === 'Approved' ? t.approvedAccounts : statusFilter === 'Pending' ? t.pendingAccounts : t.declinedAccounts;

  return (
    <div className="animate-fade-in space-y-4 pb-10">
      <DashboardHeader 
        title={t.liveAccount}
        breadcrumbs={[{ title: t.liveAccount, active: true }]}
        onNavigate={onNavigate}
        activeTab="IB Dashboard"
        extra={extraHeader}
      />

      {/* Tabs & Filters Section */}
      <div className="flex items-center justify-between flex-wrap gap-5">
        <div className="w-full md:w-auto">
          <Segmented
            options={[t.approved, t.pending, t.declined]}
            value={statusFilter === 'Approved' ? t.approved : statusFilter === 'Pending' ? t.pending : t.declined}
            onChange={handleStatusChange}
            className="ib-segmented"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Input 
            placeholder={t.search} 
            prefix={<Search size={16} className="text-white/30" />}
            className="ib-input w-full md:w-[220px]"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      {/* Main Content Card */}
      <div className="border-[2px] border-[var(--theme-light)] bg-[var(--bg-color)] rounded-xl pt-3 lg:pt-4 w-full mt-3 shadow-sm min-h-[400px] overflow-hidden flex flex-col">
        <div className="px-4 lg:px-6">
          <p className="text-xl font-semibold text-white">{tableTitle}</p>
        </div>
        
        <div className="my-4 flex-1">
          {isLoading ? (
            <div className="w-full p-6 space-y-4 animate-pulse">
              <div className="grid grid-cols-9 gap-4 mb-8">
                {Array(9).fill(0).map((_, i) => (
                  <div key={i} className="h-4 bg-white/5 rounded-md w-full"></div>
                ))}
              </div>
              {Array(5).fill(0).map((_, i) => (
                <div key={i} className="grid grid-cols-9 gap-4 py-2 border-b border-white/5">
                  {Array(9).fill(0).map((_, j) => (
                    <div key={j} className="h-8 bg-white/5 rounded-md w-full"></div>
                  ))}
                </div>
              ))}
            </div>
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
    </div>
  );
};

export default IBLiveAccountPage;
