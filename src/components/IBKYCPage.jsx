import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Segmented } from 'antd';
import { Download, Search, Copy } from 'lucide-react';
import dayjs from 'dayjs';
import { useLanguage } from '../contexts/LanguageContext';
import DashboardHeader from './DashboardHeader';

const TRANSLATIONS = {
  EN: {
    kycManager: "KYC Manager",
    news: "News",
    approved: "Approved",
    pending: "Pending",
    rejected: "Rejected",
    search: "Search...",
    export: "Export",
    noRecord: "No Record Found",
    referralLink: "My Referral Link",
    columns: {
      name: "Name",
      email: "Email",
      mobileNumber: "Mobile Number",
      kycType: "KYC Type",
      requestDate: "Request Date",
      actionDate: "Action Date",
      actionBy: "Action By",
      userType: "User Type",
      status: "Status"
    }
  },
  HI: {
    kycManager: "KYC प्रबंधक",
    news: "समाचार",
    approved: "स्वीकृत",
    pending: "लंबित",
    rejected: "अस्वीकृत",
    search: "खोजें...",
    export: "निर्यात",
    noRecord: "कोई रिकॉर्ड नहीं मिला",
    referralLink: "मेरा रेफरल लिंक",
    columns: {
      name: "नाम",
      email: "ईमेल",
      mobileNumber: "मोबाइल नंबर",
      kycType: "KYC प्रकार",
      requestDate: "अनुरोध तिथि",
      actionDate: "कार्रवाई तिथि",
      actionBy: "किसके द्वारा",
      userType: "उपयोगकर्ता प्रकार",
      status: "स्थिति"
    }
  }
};

const IBKYCPage = ({ onNavigate }) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language] || TRANSLATIONS.EN;
  const [searchText, setSearchText] = useState('');
  
  // URL sync for status
  const [statusFilter, setStatusFilter] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');
    if (['Approved', 'Pending', 'Rejected'].includes(status)) return status;
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
    else if (val === t.rejected) newStatus = 'Rejected';

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
      render: (text) => <span className="text-white/90 font-medium">{text}</span>,
      sorter: (a, b) => dayjs(a.name).unix() - dayjs(b.name).unix(),
    },
    { title: t.columns.email, dataIndex: 'email', key: 'email' ,
    sorter: (a, b) => dayjs(a.email).unix() - dayjs(b.email).unix()},
    { title: t.columns.mobileNumber, dataIndex: 'mobileNumber', key: 'mobileNumber',  
    sorter: (a, b) => dayjs(a.mobileNumber).unix() - dayjs(b.mobileNumber).unix(), },
    { title: t.columns.kycType, dataIndex: 'kycType', key: 'kycType',
    sorter: (a, b) => dayjs(a.kycType).unix() - dayjs(b.kycType).unix(),
     },
    {
      title: t.columns.requestDate,
      dataIndex: 'requestDate',
      key: 'requestDate',
      sorter: (a, b) => dayjs(a.requestDate).unix() - dayjs(b.requestDate).unix(),
    },
    {
      title: t.columns.actionDate,
      dataIndex: 'actionDate',
      key: 'actionDate',
        sorter: (a, b) => dayjs(a.actionDate).unix() - dayjs(b.actionDate).unix(),
    },
    { title: t.columns.actionBy, dataIndex: 'actionBy', key: 'actionBy',
      sorter: (a, b) => dayjs(a.actionBy).unix() - dayjs(b.actionBy).unix(),
     },
    { title: t.columns.userType, dataIndex: 'userType', key: 'userType',
      sorter: (a, b) => dayjs(a.userType).unix() - dayjs(b.userType).unix(),
     },
    { 
      title: t.columns.status, 
      dataIndex: 'status', 
      key: 'status',
      render: (status) => {
        let color = '#ff9f43';
        if (status === 'Approved') color = '#158B86';
        if (status === 'Rejected') color = '#ea5455';
        return <span style={{ color }}>{status}</span>;
      },
      sorter: (a, b) => dayjs(a.status).unix() - dayjs(b.status).unix(),
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
      {/* ── Mobile View (lg:hidden) ── */}
      <div className="lg:hidden h-[calc(100vh-160px)] min-h-fit p-4 pb-[100px] bg-[var(--theme-bg)] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center gap-3 py-4 border-b border-white/5 mb-6 bg-[var(--theme-bg)] sticky top-0 z-[100]">
          <button onClick={() => onNavigate('IB_Dashboard')} className="p-1 -ml-1 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <h1 className="text-[20px] font-bold text-[#3B82F6]">{t.kycManager}</h1>
        </div>

        <div className="space-y-5">
          {/* Tabs & Filters Section */}
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <Segmented
                options={[t.approved, t.pending, t.rejected]}
                value={statusFilter === 'Approved' ? t.approved : statusFilter === 'Pending' ? t.pending : t.rejected}
                onChange={handleStatusChange}
                className="ib-segmented w-full"
                block
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
                disabled={dataSource.length === 0 || isLoading}
                className={`h-11 px-4 bg-[#2b7fff] text-white border-none rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all ${dataSource.length === 0 || isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#1a66ff]'}`}
              >
                <Download size={18} />
                {t.export}
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="mt-6 border border-white/5 rounded-xl overflow-hidden bg-[var(--theme-bg)] shadow-xl">
            {isLoading ? (
              <div className="p-10 text-center"><SkeletonTable /></div>
            ) : (
              <div className="overflow-x-auto w-full">
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
            )}
          </div>
        </div>
      </div>

      {/* ── Desktop View (lg:block hidden on mobile) ── */}
      <div className="hidden lg:block">
        <DashboardHeader 
          title={t.kycManager}
          breadcrumbs={[{ title: t.kycManager, active: true }]}
          onNavigate={onNavigate}
          activeTab="IB Dashboard"
          extra={extraHeader}
          showMobileBack={true}
          mobileBackTo="IB_Dashboard"
        />

        {/* Tabs & Filters Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-2">
          <Segmented
            options={[t.approved, t.pending, t.rejected]}
            value={statusFilter === 'Approved' ? t.approved : statusFilter === 'Pending' ? t.pending : t.rejected}
            onChange={handleStatusChange}
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
            <button 
              type="button"
              disabled={dataSource.length === 0 || isLoading}
              className={`h-[38px] px-6 bg-[#158B86] hover:bg-[#117672] text-white border-none rounded-lg font-semibold flex items-center gap-2 shadow-lg shadow-teal-900/20 transition-all ${dataSource.length === 0 || isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <Download size={16} />
              {t.export}
            </button>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-[var(--bg-color)] border border-[var(--border-color)] rounded-2xl p-0 overflow-hidden shadow-sm min-h-[400px] w-full max-w-full">
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
    </div>
  );
};

export default IBKYCPage;
