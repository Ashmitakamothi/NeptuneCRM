import React, { useState } from 'react';
import { Breadcrumb, Segmented, Button, Table, Input, Checkbox } from 'antd';
import dayjs from 'dayjs';
import { Home, ChevronRight, Copy, Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import * as IBIcons from './IBIcons';

const TRANSLATIONS = {
  EN: {
    ibWithdraw: "IB WITHDRAW",
    news: "News",
    referralLink: "My Referral Link",
    userDashboard: "User Dashboard",
    ibDashboard: "IB Dashboard",
    generateCommission: "Generate Commission",
    availableCommission: "Available Commission",
    withdrawCommission: "Withdraw Commission",
    minTransfer: "Minimum Transfer",
    maxTransfer: "Maximum Transfer",
    withdrawTitle: "IB Withdraw",
    amountLabel: "Amount In USD",
    agreeTerms: "Yes, I agree to the",
    termsLink: "Terms & Conditions",
    submit: "SUBMIT",
    name: "Name",
    type: "Type",
    amount: "Amount",
    status: "Status",
    requestedDate: "Requested Date",
    noRecord: "No Record Found"
  },
  HI: {
    ibWithdraw: "IB निकासी",
    news: "समाचार",
    referralLink: "मेरा रेफरल लिंक",
    userDashboard: "यूजर डैशबोर्ड",
    ibDashboard: "IB डैशबोर्ड",
    generateCommission: "जेनरेट कमीशन",
    availableCommission: "उपलब्ध कमीशन",
    withdrawCommission: "निकासी कमीशन",
    minTransfer: "न्यूनतम ट्रांसफर",
    maxTransfer: "अधिकतम ट्रांसफर",
    withdrawTitle: "निकासी",
    amountLabel: "USD में राशि",
    agreeTerms: "हाँ, मैं सहमत हूँ",
    termsLink: "नियम और शर्तें",
    submit: "सबमिट करें",
    name: "नाम",
    type: "प्रकार",
    amount: "राशि",
    status: "स्थिति",
    requestedDate: "अनुरोध की तारीख",
    noRecord: "कोई रिकॉर्ड नहीं मिला"
  }
};

const MetricCard = ({ icon, val, label, color, bg }) => (
  <div className="bg-[var(--bg-color)] border border-[var(--theme-border)] rounded-2xl p-6 flex items-center gap-4 hover:border-[#158B86]/30 transition-all cursor-pointer">
    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: bg }}>
       {icon}
    </div>
    <div>
       <p className="text-xl font-bold text-white">{val}</p>
       <p className="text-xs text-[#8e9d9b] font-medium uppercase tracking-wider mt-0.5">{label}</p>
    </div>
  </div>
);

const IBWalletPage = ({ onNavigate }) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language] || TRANSLATIONS.EN;
  const [activeTab, setActiveTab] = useState('IB Dashboard');

  return (
    <div className="animate-fade-in space-y-4 pb-10">
      {/* Sub-Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-3">
          <h1 className="text-[22px] font-bold uppercase tracking-tight text-white">{t.ibWithdraw}</h1>
          <div className="flex items-center gap-2">
             <div className="w-2.5 h-2.5 bg-[#AF6C56] rounded-full dotanim"></div>
             <div className="bg-[#12716E] text-white text-[13px] font-medium px-3 py-1 rounded-[4px] cursor-pointer">
                {t.news}
             </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Referral Link */}
          <div className="hidden md:flex items-center gap-3 bg-[#111818] border border-white/5 px-5 py-2 rounded-xl">
             <p className="text-[14px] font-medium text-white/70">{t.referralLink}: <span className="text-white">IFAHGGAP</span></p>
             <button className="text-white/50 hover:text-white transition-colors">
               <Copy size={14} />
             </button>
          </div>

          {/* Dashboard Toggle */}
          <Segmented
            options={[t.userDashboard, t.ibDashboard]}
            value={t.ibDashboard}
            onChange={(val) => {
              if (val === t.userDashboard) onNavigate('Dashboard');
              else onNavigate('IB_Dashboard');
            }}
            className="ib-segmented"
          />
        </div>
      </div>

      {/* Breadcrumb Section */}
      <div className="flex items-center gap-2 py-2">
         <Breadcrumb
           separator={<ChevronRight size={14} className="text-[#8e9d9b] mt-0.5" />}
           items={[
             { title: <Home size={18} className="text-[#00727d] cursor-pointer opacity-65" onClick={() => onNavigate('Dashboard')} /> },
             { title: <span className="text-[var(--text-color)] font-medium opacity-60">{t.withdrawTitle}</span> },
           ]}
         />
      </div>

      {/* Wallet Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-4">
        <MetricCard 
           icon={<IBIcons.MetricIcon color="#7367F0" />} 
           val="$ 0" 
           label={t.generateCommission} 
           bg="#E9E7FD" 
        />
        <MetricCard 
           icon={<IBIcons.MetricIcon color="#00727D" />} 
           val="$ 0" 
           label={t.availableCommission} 
           bg="#E5F1F2" 
        />
        <MetricCard 
           icon={<IBIcons.MetricIcon color="#00BAD1" />} 
           val="$ 0" 
           label={t.withdrawCommission} 
           bg="#D6F4F8" 
        />
        <MetricCard 
           icon={<IBIcons.MetricIcon color="#28C76F" />} 
           val="$ 1" 
           label={t.minTransfer} 
           bg="#DDF6E8" 
        />
        <MetricCard 
           icon={<IBIcons.MetricIcon color="#FF9F43" />} 
           val="$ 100" 
           label={t.maxTransfer} 
           bg="#FFF0E1" 
        />
      </div>

      {/* Withdraw Form */}
      <div className="bg-[var(--bg-color)] border border-[var(--theme-border)] rounded-2xl overflow-hidden shadow-sm mt-6">
         <div className="px-6 py-4 border-b border-[var(--theme-border)]">
            <h3 className="text-xl font-bold text-[var(--theme-text)]">{t.withdrawTitle}</h3>
         </div>
         <div className="p-6 space-y-6">
            <div className="max-w-md">
               <label className="text-[16px] font-bold text-[var(--theme-text)] block mb-3 uppercase tracking-wide opacity-90">{t.amountLabel}</label>
               <Input 
                  type="number" 
                  placeholder="0" 
                  prefix={<span className="text-white/40 mr-1">$</span>}
                  className="ib-input h-12 text-[16px] font-medium"
               />
            </div>
            
            <div className="flex flex-wrap items-center justify-between gap-6">
               <div className="flex items-center gap-2">
                  <Checkbox className="ib-checkbox" />
                  <span className="text-sm text-white/60">
                     {t.agreeTerms} <a href="#" className="text-[#12716E] hover:underline">{t.termsLink}</a>
                  </span>
               </div>
               
               <Button 
                  type="primary" 
                  className="h-11 px-10 bg-[#12716E] hover:bg-[#0e5e5a] border-none rounded-xl font-bold uppercase tracking-wider"
               >
                  {t.submit}
               </Button>
            </div>
         </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-[var(--bg-color)] border border-[var(--theme-border)] rounded-2xl overflow-hidden shadow-sm mt-6">
         <Table 
            columns={[
              { title: t.name, dataIndex: 'name', key: 'name' },
              { title: t.type, dataIndex: 'type', key: 'type' },
              { title: t.amount, dataIndex: 'amount', key: 'amount' },
              { title: t.status, dataIndex: 'status', key: 'status' },
              { title: t.requestedDate, dataIndex: 'date', key: 'date' },
            ]}
            dataSource={[]}
            pagination={false}
            className="ib-table"
            locale={{ emptyText: <div className="py-20 text-center text-white/30 italic font-medium">{t.noRecord}</div> }}
         />
      </div>
    </div>
  );
};

export default IBWalletPage;
