import React, { useState, useEffect } from 'react';
import { Table, Input, Segmented, Button } from 'antd';
import { Search, Copy, Download } from 'lucide-react';
import dayjs from 'dayjs';
import { useLanguage } from '../contexts/LanguageContext';
import DashboardHeader from './DashboardHeader';

const TRANSLATIONS = {
  EN: {
    withdrawReport: "Withdraw Report",
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    search: "Search",
    export: "Export",
    noRecord: "No Record Found",
    referralLink: "My Referral Link",
    columns: {
      name: "Name",
      type: "Type",
      amount: "Amount",
      status: "Status",
      requestedDate: "Requested Date"
    }
  },
  HI: {
    withdrawReport: "निकासी रिपोर्ट",
    pending: "लंबित",
    approved: "स्वीकृत",
    rejected: "अस्वीकृत",
    search: "खोजें",
    export: "निर्यात",
    noRecord: "कोई रिकॉर्ड नहीं मिला",
    referralLink: "मेरा रेफरल लिंक",
    columns: {
      name: "नाम",
      type: "प्रकार",
      amount: "रकम",
      status: "स्थिति",
      requestedDate: "अनुरोध की तिथि"
    }
  }
};

const IBWithdrawReportPage = ({ onNavigate }) => {
  const { language } = useLanguage();
  const currentLang = language?.toUpperCase() || 'EN';
  const t = (key) => (TRANSLATIONS[currentLang] || TRANSLATIONS.EN)?.[key] || key;
  const colT = (key) => (TRANSLATIONS[currentLang] || TRANSLATIONS.EN)?.columns?.[key] || key;

  const [searchText, setSearchText] = useState('');
  
  const [statusFilter, setStatusFilter] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');
    if (['Pending', 'Approved', 'Rejected'].includes(status)) return status;
    return 'Pending';
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('status', statusFilter);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
  }, [statusFilter]);

  const handleStatusChange = (val) => {
    let newStatus = 'Pending';
    if (val === t('approved')) newStatus = 'Approved';
    else if (val === t('rejected')) newStatus = 'Rejected';

    if (newStatus !== statusFilter) {
      setIsLoading(true);
      setStatusFilter(newStatus);
      setTimeout(() => setIsLoading(false), 600);
    }
  };

  const columns = [
    {
      title: colT('name'),
      dataIndex: 'name',
      key: 'name',
      // sorter: (a, b) => (a.name || '').localeCompare(b.name || ''),
      render: (text) => <span className="text-[var(--text-color)] opacity-90 font-medium">{text}</span>
    },
    { 
      title: colT('type'), 
      dataIndex: 'type', 
      key: 'type',
      // sorter: (a, b) => (a.type || '').localeCompare(b.type || ''),
    },
    { 
      title: colT('amount'), 
      dataIndex: 'amount', 
      key: 'amount',
      // sorter: (a, b) => parseFloat(a.amount || 0) - parseFloat(b.amount || 0),
    },
    { 
      title: colT('status'), 
      dataIndex: 'status', 
      key: 'status',
      // sorter: (a, b) => (a.status || '').localeCompare(b.status || ''),
    },
    {
      title: colT('requestedDate'),
      dataIndex: 'requestedDate',
      key: 'requestedDate',
      // sorter: (a, b) => dayjs(a.requestedDate).unix() - dayjs(b.requestedDate).unix(),
    }
  ];

  const dataSource = []; // Empty default

  const extraHeader = (
    <div className="hidden md:flex items-center gap-3 bg-[var(--segmented-bg)] border border-[var(--border-color)] px-5 py-2 rounded-xl">
       <p className="text-[14px] font-medium text-[var(--text-color)]">{t('referralLink')}: <span className="text-[var(--text-color)]">IFAHGGAP</span></p>
       <button className="text-[var(--text-color)] opacity-40 hover:opacity-100 transition-opacity">
         <Copy size={16} />
       </button>
    </div>
  );

  return (
    <div className="animate-fade-in space-y-4 pb-10">
      <DashboardHeader 
        title={t('withdrawReport').toUpperCase()}
        breadcrumbs={[{ title: t('withdrawReport'), active: true }]}
        onNavigate={onNavigate}
        activeTab="IB Dashboard"
        extra={extraHeader}
        showMobileBack={true}
        mobileBackTo="IB_Dashboard"
      />

      {/* Tabs & Filters Section */}
      <div className="flex items-center justify-between flex-wrap gap-5">
        <div className="w-full md:w-auto">
          <Segmented
            options={[t('pending'), t('approved'), t('rejected')]}
            value={statusFilter === 'Pending' ? t('pending') : statusFilter === 'Approved' ? t('approved') : t('rejected')}
            onChange={handleStatusChange}
            className="ib-segmented"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Input 
            placeholder={t('search')} 
            prefix={<Search size={16} className="text-[var(--text-color)] opacity-30" />}
            className="ib-input w-full md:w-[220px]"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button 
            icon={<Download size={16} />} 
            className="bg-[#158B86] hover:!bg-[#0E5E5A] text-white border-none h-[38px] px-4 font-medium transition-colors"
          >
            {t('export')}
          </Button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="border-[2px] border-[var(--theme-light)] bg-[var(--bg-color)] rounded-xl pt-3 lg:pt-4 w-full mt-3 shadow-sm min-h-[400px] overflow-hidden flex flex-col">
        
        <div className="my-4 flex-1">
          {isLoading ? (
            <div className="w-full p-6 space-y-4 animate-pulse">
              <div className="grid grid-cols-5 gap-4 mb-8">
                {Array(5).fill(0).map((_, i) => (
                  <div key={i} className="h-4 bg-white/5 rounded-md w-full"></div>
                ))}
              </div>
              {Array(5).fill(0).map((_, i) => (
                <div key={i} className="grid grid-cols-5 gap-4 py-2 border-b border-white/5">
                  {Array(5).fill(0).map((_, j) => (
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
              scroll={{ x: 800 }}
              locale={{
                emptyText: (
                  <div className="flex flex-col items-center justify-center py-12 text-[var(--text-color)] opacity-40">
                    <div className="bg-[var(--hover-bg)] p-4 rounded-full mb-4">
                       <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                         <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                         <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                       </svg>
                    </div>
                    <span className="text-[14px] font-medium">{t('noRecord')}</span>
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

export default IBWithdrawReportPage;
