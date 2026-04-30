import React, { useState } from 'react';
import { Home, ChevronRight, Download, ChevronDown } from 'lucide-react';
import { DatePicker, ConfigProvider, theme as antdTheme } from 'antd';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import MyTransactionsTable from './MyTransactionsTable';
import DashboardHeader from './DashboardHeader';

const { RangePicker } = DatePicker;

const TRANSLATIONS = {
  EN: {
    breadcrumb: "My Transactions",
    transactions: "MY TRANSACTIONS",
    news: "News",
    userDashboard: "User Dashboard",
    ibDashboard: "IB Dashboard",
    all: "All",
    export: "Export",
    startDate: "Start date",
    endDate: "End date",
  },
  HI: {
    breadcrumb: "मेरे लेन-देन",
    transactions: "मेरे लेन-देन",
    news: "समाचार",
    userDashboard: "यूजर डैशबोर्ड",
    ibDashboard: "आईबी डैशबोर्ड",
    all: "सभी",
    export: "निर्यात",
    startDate: "प्रारंभ तिथि",
    endDate: "अंतिम तिथि",
  }
};

const MyTransactionsPage = ({ onNavigate, initialFilter = 'All', onFilterChange }) => {
  const { isDark } = useTheme();
  const { language } = useLanguage();
  const [operationFilter, setOperationFilter] = useState(initialFilter);
  const [dateRange, setDateRange] = useState(null);
  const [isOperationDropdownOpen, setIsOperationDropdownOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [exportTrigger, setExportTrigger] = useState(0);

  // Sync with prop
  React.useEffect(() => {
    if (initialFilter !== operationFilter) {
      setOperationFilter(initialFilter);
    }
  }, [initialFilter]);

  const handleFilterChange = (filter) => {
    setOperationFilter(filter);
    if (onFilterChange) onFilterChange(filter);
  };

  const t = (key) => TRANSLATIONS[language]?.[key] || key;


  return (
    <div className="flex flex-col w-full h-full animate-fade-in pb-20">
      <DashboardHeader 
        title={t('transactions')}
        breadcrumbs={[{ title: t('breadcrumb'), active: true }]}
        onNavigate={onNavigate}
        activeTab="User Dashboard"
      />

      {/* Top Filters & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {/* Left Side: Operation Dropdown */}
        <div className="relative z-20 w-full sm:w-[240px]">
          <button 
            className="flex items-center justify-between w-full px-4 py-2.5 bg-transparent border border-[var(--border-color)] rounded-[6px] text-[var(--text-color)] font-medium hover:opacity-80 transition-opacity"
            onClick={() => setIsOperationDropdownOpen(!isOperationDropdownOpen)}
          >
            <span>{operationFilter === 'All' ? t('all') : operationFilter}</span>
            <ChevronDown size={16} className="text-[#8e9d9b]" />
          </button>
          
          {isOperationDropdownOpen && (
            <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[8px] overflow-hidden shadow-2xl py-2">

              {['All', 'Deposit', 'Withdrawal', 'Wallet To Account', 'Account To Wallet', 'IB Wallet To Wallet'].map((op) => (
                <button
                  key={op}
                  className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                    operationFilter === op 
                      ? 'bg-[#158B86]/20 text-[#158B86] font-medium' 
                      : 'text-[var(--text-color)] opacity-80 hover:opacity-100 hover:bg-white/5'
                  }`}
                  onClick={() => {
                    handleFilterChange(op);
                    setIsOperationDropdownOpen(false);
                  }}
                >
                  {op === 'All' ? t('all') : op}
                </button>
              ))}
            </div>
          )}
        </div>


        {/* Right Side: Date Picker & Export */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <ConfigProvider
             theme={{
               algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
               token: {
                 colorPrimary: '#158B86',
                 colorBgContainer: 'transparent',
                 colorBorder: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                 colorTextPlaceholder: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                 colorText: isDark ? '#fff' : '#000',
                 borderRadius: 6,
                 controlHeight: 40,
               },
               components: {
                 DatePicker: {
                   activeBorderColor: '#158B86',
                   hoverBorderColor: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                   activeBg: 'transparent',
                 }
               }
             }}
           >
            <RangePicker 
              className="w-full sm:w-[280px] hover:border-[var(--border-color)] transition-colors"
              placeholder={[t('startDate'), t('endDate')]}
              onChange={(dates) => setDateRange(dates)}
              style={{ backgroundColor: 'transparent' }}
            />
          </ConfigProvider>


          <div className="relative">
            <button 
              onClick={() => setIsExportOpen(!isExportOpen)}
              className="flex items-center justify-center gap-2 bg-[#158B86] hover:bg-[#117672] text-white px-5 py-2.5 rounded-[6px] font-bold text-sm transition-colors w-full sm:w-auto shadow-[0_4px_14px_0_rgba(21,139,134,0.39)] hover:shadow-[0_6px_20px_rgba(21,139,134,0.23)]"
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
                  Export as CSV
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Table Section */}
      <MyTransactionsTable 
        operationFilter={operationFilter}
        language={language}
        dateRange={dateRange}
        exportTrigger={exportTrigger}
      />
    </div>
  );
};

export default MyTransactionsPage;
