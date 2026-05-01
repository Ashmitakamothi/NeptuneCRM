import React from 'react';
import { Empty } from 'antd';
import { Copy } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import DashboardHeader from './DashboardHeader';

const TRANSLATIONS = {
  EN: {
    tradeAndWin: "Trade & Win",
    noCampaign: "No active campaign available",
    referralLink: "My Referral Link",
  },
  HI: {
    tradeAndWin: "ट्रेड और विन",
    noCampaign: "कोई सक्रिय अभियान उपलब्ध नहीं है",
    referralLink: "मेरा रेफरल लिंक",
  }
};

const IBTradeAndWinPage = ({ onNavigate }) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language] || TRANSLATIONS.EN;

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
        title={t.tradeAndWin}
        breadcrumbs={[{ title: t.tradeAndWin, active: true }]}
        onNavigate={onNavigate}
        activeTab="IB Dashboard"
        extra={extraHeader}
      />

      <div className="flex justify-center items-center min-h-[500px]">
        <Empty 
          description={<span className="text-[#8e9d9b] text-lg font-medium">{t.noCampaign}</span>}
          image={Empty.PRESENTED_IMAGE_DEFAULT}
          className="opacity-80"
        />
      </div>
    </div>
  );
};

export default IBTradeAndWinPage;
