import React, { useState } from 'react';
import { Home, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LogsTable from './LogsTable';
import DashboardHeader from './DashboardHeader';

const TRANSLATIONS = {
  EN: {
    news: "News",
    userDashboard: "User Dashboard",
    ibDashboard: "IB Dashboard",
    logs: "LOGS",
    logsBread: "Logs"
  },
  HI: {
    news: "समाचार",
    userDashboard: "यूजर डैशबोर्ड",
    ibDashboard: "आईबी डैशबोर्ड",
    logs: "लॉग्स",
    logsBread: "लॉग्स"
  }
};

const LogsPage = ({ onNavigate }) => {
  const { language } = useLanguage();

  const t = (key) => TRANSLATIONS[language]?.[key] || key;

  return (
    <div className="flex flex-col w-full h-full animate-fade-in pb-20">
      {/* ── Mobile Header (lg:hidden) ── */}
      <div className="flex lg:hidden items-center gap-3 py-4 border-b border-[var(--border-color)] mb-6 -mx-4 px-4 bg-[var(--bg-color)] sticky top-0 z-[100]">
        <button onClick={() => onNavigate('Settings')} className="p-1 -ml-1 transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <h1 className="text-[20px] font-bold text-[#3B82F6]">Reports</h1>
      </div>

      <div className="hidden lg:block">
        <DashboardHeader 
          title={t('logs')}
          breadcrumbs={[{ title: t('logsBread'), active: true }]}
          onNavigate={onNavigate}
          activeTab="User Dashboard"
        />
      </div>

      {/* ── Mobile Tabs (lg:hidden) ── */}
      <div className="flex lg:hidden items-center justify-center gap-1 bg-[#1a1a1e] p-1 rounded-xl mb-6 overflow-x-auto custom-scrollbar">
        {[
          { id: 'Deposit', label: 'Deposit', page: 'Reports_Deposit' },
          { id: 'Withdraw', label: 'Withdraw', page: 'Reports_Withdraw' },
          { id: 'Transfer', label: 'Transfer', page: 'Reports_Transfer' },
          { id: 'Logs', label: 'Logs', page: 'Reports_Logs' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.page)}
            className={`flex-1 min-w-[90px] py-2.5 rounded-lg text-[14px] font-bold transition-all ${
              tab.id === 'Logs'
                ? 'bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] text-white shadow-lg'
                : 'text-white/40 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table Section */}
      <LogsTable language={language} />
    </div>
  );
};

export default LogsPage;
