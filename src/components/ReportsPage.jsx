import React, { useState } from 'react';
import { Home, ChevronRight, Download } from 'lucide-react';
import { DatePicker, ConfigProvider, theme as antdTheme } from 'antd';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import ReportsTable from './ReportsTable';
import DashboardHeader from './DashboardHeader';

const { RangePicker } = DatePicker;

const TRANSLATIONS = {
  EN: {
    news: "News",
    userDashboard: "User Dashboard",
    ibDashboard: "IB Dashboard",
    export: "Export",
    startDate: "Start date",
    endDate: "End date",
    exportCSV: "Export as CSV",
    depositReport: "DEPOSIT REPORT",
    withdrawReport: "WITHDRAW REPORT",
    transferReport: "TRANSFER REPORT",
    lossReport: "LOSS REPORT",
    depositBread: "Deposit Report",
    withdrawBread: "Withdraw Report",
    transferBread: "Transfer Report",
    lossBread: "Loss Report",
  },
  HI: {
    news: "समाचार",
    userDashboard: "यूजर डैशबोर्ड",
    ibDashboard: "आईबी डैशबोर्ड",
    export: "निर्यात",
    startDate: "प्रारंभ तिथि",
    endDate: "अंतिम तिथि",
    exportCSV: "CSV के रूप में निर्यात करें",
    depositReport: "जमा रिपोर्ट",
    withdrawReport: "निकासी रिपोर्ट",
    transferReport: "ट्रांसफर रिपोर्ट",
    lossReport: "लॉस रिपोर्ट",
    depositBread: "जमा रिपोर्ट",
    withdrawBread: "निकासी रिपोर्ट",
    transferBread: "ट्रांसफर रिपोर्ट",
    lossBread: "लॉस रिपोर्ट",
  }
};

const ReportsPage = ({ type, onNavigate }) => {
  const { isDark } = useTheme();
  const { language } = useLanguage();
  const [dateRange, setDateRange] = useState(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [exportTrigger, setExportTrigger] = useState(0);

  const t = (key) => TRANSLATIONS[language]?.[key] || key;

  // Format the title and breadcrumb based on type
  const getReportKeys = (type) => {
    switch(type?.toLowerCase()) {
      case 'deposit': return { title: 'depositReport', bread: 'depositBread' };
      case 'withdraw': return { title: 'withdrawReport', bread: 'withdrawBread' };
      case 'transfer': return { title: 'transferReport', bread: 'transferBread' };
      case 'loss': return { title: 'lossReport', bread: 'lossBread' };
      default: return { title: `${type} Report`.toUpperCase(), bread: `${type} Report` };
    }
  };

  const keys = getReportKeys(type);
  const reportTitle = TRANSLATIONS[language]?.[keys.title] || keys.title;
  const breadcrumbText = TRANSLATIONS[language]?.[keys.bread] || keys.bread;

  return (
    <div className="flex flex-col w-full h-full animate-fade-in pb-20">
      <DashboardHeader 
        title={reportTitle}
        breadcrumbs={[{ title: breadcrumbText, active: true }]}
        onNavigate={onNavigate}
        activeTab="User Dashboard"
      />


      {/* Top Actions: Date Picker & Export Only */}
      <div className="flex justify-end w-full mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <ConfigProvider
            theme={{
               algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
               token: {
                 colorPrimary: '#158B86',
                 colorBgContainer: 'transparent',
                 colorBorder: isDark ? 'rgba(142, 157, 155, 0.3)' : 'rgba(0, 0, 0, 0.1)',
                 colorTextPlaceholder: isDark ? 'rgba(142, 157, 155, 0.7)' : 'rgba(0, 0, 0, 0.3)',
                 colorText: 'inherit',
                 borderRadius: 6,
                 controlHeight: 40,
               },
               components: {
                 DatePicker: {
                   activeBorderColor: '#158B86',
                   hoverBorderColor: isDark ? 'rgba(142, 157, 155, 0.6)' : 'rgba(0, 0, 0, 0.3)',
                   activeBg: 'transparent',
                 }
               }
             }}
          >
            <RangePicker 
              className="w-full sm:w-[280px] hover:border-[var(--border-color)] transition-colors text-[var(--text-color)]"
              placeholder={[t('startDate'), t('endDate')]}
              onChange={(dates) => setDateRange(dates)}
              style={{ backgroundColor: 'transparent' }}
            />
          </ConfigProvider>

          <div className="relative w-full sm:w-auto">
            <button 
              onClick={() => setIsExportOpen(!isExportOpen)}
              className="flex items-center justify-center gap-2 bg-[#158B86] hover:bg-[#117672] text-white px-5 py-2.5 rounded-[6px] font-bold text-sm transition-colors w-full shadow-[0_4px_14px_0_rgba(21,139,134,0.39)] hover:shadow-[0_6px_20px_rgba(21,139,134,0.23)]"
            >
              <Download size={18} />
              {t('export')}
            </button>
            
            {isExportOpen && (
              <div className="absolute top-[calc(100%+8px)] right-0 min-w-[140px] bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[8px] overflow-hidden shadow-2xl py-2 z-50">
                <div className="absolute -top-2 right-6 w-4 h-4 bg-[var(--card-bg)] border-l border-t border-[var(--border-color)] transform rotate-45"></div>
                <button
                  className="relative z-10 w-full px-4 py-2 text-left text-[14px] text-[var(--text-color)] hover:bg-white/5 hover:text-[#00BFA5] transition-colors"
                  onClick={() => {
                    setIsExportOpen(false);
                    setExportTrigger(prev => prev + 1);
                  }}
                >
                  {t('exportCSV')}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Table Section */}
      <ReportsTable 
        type={type}
        dateRange={dateRange}
        exportTrigger={exportTrigger}
      />
    </div>
  );
};

export default ReportsPage;
