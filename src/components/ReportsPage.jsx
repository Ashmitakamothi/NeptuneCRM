import React, { useState } from 'react';
import { Home, ChevronRight, Download, Moon, Globe } from 'lucide-react';
import { DatePicker, ConfigProvider, theme } from 'antd';
import ReportsTable from './ReportsTable';

const { RangePicker } = DatePicker;

const TRANSLATIONS = {
  EN: {
    news: "News",
    userDashboard: "User Dashboard",
    ibDashboard: "IB Dashboard",
    export: "Export",
    startDate: "Start date",
    endDate: "End date",
  },
  HI: {
    news: "समाचार",
    userDashboard: "यूजर डैशबोर्ड",
    ibDashboard: "आईबी डैशबोर्ड",
    export: "निर्यात",
    startDate: "प्रारंभ तिथि",
    endDate: "अंतिम तिथि",
  }
};

const ReportsPage = ({ type, onNavigate }) => {
  const [dashboardType, setDashboardType] = useState('User');
  const [language, setLanguage] = useState('EN');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [dateRange, setDateRange] = useState(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [exportTrigger, setExportTrigger] = useState(0);

  const t = (key) => TRANSLATIONS[language]?.[key] || key;

  // Format the title and breadcrumb based on type
  const reportTitle = `${type} Report`.toUpperCase();
  const breadcrumbText = `${type} Report`;

  return (
    <div className="flex flex-col w-full h-full animate-fade-in pb-20">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/5 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-[20px] md:text-[24px] font-extrabold text-white tracking-tight leading-none uppercase">{reportTitle}</h1>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#AF6C56] animate-pulse" style={{ animationDuration: '1s' }}></div>
            <span className="bg-[#158B86] text-white text-sm sm:text-lg font-medium px-2 rounded-sm cursor-pointer">{t('news')}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
           <div className="bg-[#122D32] p-1.5 rounded-full flex items-center h-[40px]">
              <button 
                onClick={() => setDashboardType('User')}
                className={`px-4 sm:px-5 py-1.5 rounded-full text-[13px] sm:text-[14px] transition-colors ${dashboardType === 'User' ? 'font-semibold bg-[#158B86] text-white shadow-sm' : 'font-medium text-[#8e9d9b] hover:text-white'}`}
              >{t('userDashboard')}</button>
              <button 
                onClick={() => setDashboardType('IB')}
                className={`px-4 sm:px-5 py-1.5 rounded-full text-[13px] sm:text-[14px] transition-colors ${dashboardType === 'IB' ? 'font-semibold bg-[#158B86] text-white shadow-sm' : 'font-medium text-[#8e9d9b] hover:text-white'}`}
              >{t('ibDashboard')}</button>
           </div>
           
           <button className="text-[#8e9d9b] hover:text-white transition-colors">
              <Moon size={20} strokeWidth={2} />
           </button>
           
           <div className="relative">
             <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1 text-[#8e9d9b] hover:text-white transition-colors text-[14px] font-medium"
             >
                <Globe size={18} strokeWidth={2} /> {language}
             </button>
             
             {isLangMenuOpen && (
               <div className="absolute right-0 top-full mt-2 w-36 bg-[#1A1A1A] border border-white/10 rounded-[8px] shadow-[0_4px_20px_rgba(0,0,0,0.5)] py-2 z-50 animate-fade-in">
                 <button 
                   onClick={() => { setLanguage('EN'); setIsLangMenuOpen(false); }}
                   className={`w-full px-4 py-2 text-left flex items-center justify-between transition-colors ${language === 'EN' ? 'text-white bg-white/5' : 'text-[#8e9d9b] hover:text-white hover:bg-white/5'}`}
                 >
                   <span className="flex items-center gap-3 text-[14px]"><span className="font-bold opacity-60">US</span> English</span>
                   {language === 'EN' && <span className="text-white text-[12px]">✓</span>}
                 </button>
                 <button 
                   onClick={() => { setLanguage('HI'); setIsLangMenuOpen(false); }}
                   className={`w-full px-4 py-2 text-left flex items-center justify-between transition-colors ${language === 'HI' ? 'text-white bg-white/5' : 'text-[#8e9d9b] hover:text-white hover:bg-white/5'}`}
                 >
                   <span className="flex items-center gap-3 text-[14px]"><span className="font-bold opacity-60">IN</span> Hindi</span>
                   {language === 'HI' && <span className="text-white text-[12px]">✓</span>}
                 </button>
               </div>
             )}
           </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[15px] mb-6 font-medium">
        <Home size={18} className="text-[#158B86] cursor-pointer hover:text-white transition-colors" strokeWidth={2.5} onClick={() => onNavigate('Dashboard')} />
        <ChevronRight size={16} className="text-gray-500" strokeWidth={2} />
        <span className="text-white cursor-default tracking-wide">{breadcrumbText}</span>
      </div>

      {/* Top Actions: Date Picker & Export Only */}
      <div className="flex justify-end w-full mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <ConfigProvider
            theme={{
              algorithm: theme.darkAlgorithm,
              token: {
                colorPrimary: '#158B86',
                colorBgContainer: 'transparent',
                colorBorder: 'rgba(255, 255, 255, 0.1)',
                colorTextPlaceholder: 'rgba(255, 255, 255, 0.3)',
                colorText: 'white',
                borderRadius: 6,
                controlHeight: 40,
              },
              components: {
                DatePicker: {
                  activeBorderColor: '#158B86',
                  hoverBorderColor: 'rgba(255, 255, 255, 0.3)',
                  activeBg: 'transparent',
                }
              }
            }}
          >
            <RangePicker 
              className="w-full sm:w-[280px] hover:border-white/30 transition-colors"
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
              <div className="absolute top-[calc(100%+8px)] right-0 min-w-[140px] bg-[#1A1A1A] border border-white/10 rounded-[8px] overflow-hidden shadow-2xl py-2 z-50">
                <div className="absolute -top-2 right-6 w-4 h-4 bg-[#1A1A1A] border-l border-t border-white/10 transform rotate-45"></div>
                <button
                  className="relative z-10 w-full px-4 py-2 text-left text-[14px] text-white hover:bg-white/5 hover:text-[#00BFA5] transition-colors"
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
      <ReportsTable 
        type={type}
        language={language}
        dateRange={dateRange}
        exportTrigger={exportTrigger}
      />
    </div>
  );
};

export default ReportsPage;
