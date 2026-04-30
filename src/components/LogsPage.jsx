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
      <DashboardHeader 
        title={t('logs')}
        breadcrumbs={[{ title: t('logsBread'), active: true }]}
        onNavigate={onNavigate}
        activeTab="User Dashboard"
      />


      {/* Table Section */}
      <LogsTable language={language} />
    </div>
  );
};

export default LogsPage;
