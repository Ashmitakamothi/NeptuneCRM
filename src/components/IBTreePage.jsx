import React, { useState } from 'react';
import { Table, Button } from 'antd';
import { Search, Copy } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import DashboardHeader from './DashboardHeader';

const TRANSLATIONS = {
  EN: {
    ibTree: "IB Tree",
    news: "News",
    referralLink: "My Referral Link",
    columns: {
      name: "Name",
      level: "Level",
      count: "Count",
      email: "Email",
      mobileNo: "Mobile No"
    }
  },
  HI: {
    ibTree: "IB ट्री",
    news: "समाचार",
    referralLink: "मेरा रेफरल लिंक",
    columns: {
      name: "नाम",
      level: "लेवल",
      count: "गिनती",
      email: "ईमेल",
      mobileNo: "मोबाइल नंबर"
    }
  }
};

const IBTreePage = ({ onNavigate }) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language] || TRANSLATIONS.EN;

  const columns = [
    {
      title: t.columns.name,
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span className="text-[#ff9f43] font-medium">{text}</span>
    },
    {
      title: t.columns.level,
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: t.columns.count,
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: t.columns.email,
      dataIndex: 'email',
      key: 'email',
      render: (text) => <span className="text-white/70">{text}</span>
    },
    {
      title: t.columns.mobileNo,
      dataIndex: 'mobileNo',
      key: 'mobileNo',
      render: (text) => <span className="text-white/70">{text || '--'}</span>
    },
  ];

  const dataSource = [
    {
      key: '1',
      name: 'Ashmita Jethava',
      level: 0,
      count: 0,
      email: 'asmitajethva52@gmail.com',
      mobileNo: ''
    }
  ];

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
        title={t.ibTree}
        breadcrumbs={[{ title: t.ibTree, active: true }]}
        onNavigate={onNavigate}
        activeTab="IB Dashboard"
        extra={extraHeader}
        showMobileBack={true}
        mobileBackTo="IB_Dashboard"
      />

      {/* Main Content Card */}
      <div className="bg-[var(--bg-color)] border border-[var(--border-color)] rounded-2xl p-0 overflow-hidden shadow-sm mt-6">
        <Table 
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          className="ib-table"
        />
      </div>
    </div>
  );
};

export default IBTreePage;
