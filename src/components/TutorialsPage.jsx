import React, { useState } from 'react';
import { Home, ChevronRight, Search, Play } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';





const TRANSLATIONS = {
  EN: { 
    news: 'News', userDashboard: 'User Dashboard', ibDashboard: 'IB Dashboard',
    tutorials: 'TUTORIALS', search: 'Search',
    noTutorials: 'No Tutorials Found',
    tryKeywords: 'Try searching with different keywords.'
  },
  HI: { 
    news: 'समाचार', userDashboard: 'यूजर डैशबोर्ड', ibDashboard: 'आईबी डैशबोर्ड',
    tutorials: 'ट्यूटोरियल', search: 'खोजें',
    noTutorials: 'कोई ट्यूटोरियल नहीं मिला',
    tryKeywords: 'विभिन्न कीवर्ड के साथ खोजने का प्रयास करें।'
  },
};

import { TUTORIALS } from '../data/tutorialsData';
import youtubeIcon from '../assets/youtubeimage.jpg';



const TutorialsPage = ({ onNavigate }) => {
  const { language } = useLanguage();
  const [dashboardType, setDashboardType] = useState('User');
  const [searchQuery, setSearchQuery] = useState('');

  const t = (key) => TRANSLATIONS[language]?.[key] || key;

  const filteredTutorials = TUTORIALS.filter(video => {
    const title = language === 'EN' ? video.titleEN : video.titleHI;
    const desc = language === 'EN' ? video.descEN : video.descHI;
    return title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           desc.toLowerCase().includes(searchQuery.toLowerCase());
  });


  return (
    <div className="flex flex-col w-full animate-fade-in pb-20">
      {/* ── Top Header ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)] mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-[22px] font-extrabold text-[var(--text-color)] tracking-tight">{t('tutorials')}</h1>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#AF6C56] animate-pulse" />
            <span className="bg-[#158B86] text-white text-sm font-medium px-2 rounded-sm">{t('news')}</span>
          </div>
        </div>


        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="bg-[var(--sub-bg)] border border-[var(--border-color)] p-1.5 rounded-full flex items-center h-[38px]">
            <button onClick={() => setDashboardType('User')} className={`px-4 py-1.5 rounded-full text-[13px] transition-colors ${dashboardType === 'User' ? 'bg-[#158B86] text-white font-semibold' : 'text-[#8e9d9b] hover:text-[var(--text-color)]'}`}>{t('userDashboard')}</button>
            <button onClick={() => setDashboardType('IB')}   className={`px-4 py-1.5 rounded-full text-[13px] transition-colors ${dashboardType === 'IB'   ? 'bg-[#158B86] text-white font-semibold' : 'text-[#8e9d9b] hover:text-[var(--text-color)]'}`}>{t('ibDashboard')}</button>
          </div>
          {/*
          <button className="text-[#8e9d9b] hover:text-white transition-colors"><Moon size={20} strokeWidth={2} /></button>
          <div className="flex items-center gap-1.5 bg-[#122D32] px-3 py-1.5 rounded-full h-[38px] text-[#8e9d9b] text-[13px] cursor-pointer hover:text-white transition-all">
            <Globe size={16} /> <span>US</span>
          </div>
          */}
        </div>
      </div>


      {/* ── Breadcrumb & Search ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-2 text-[15px] font-medium">
          <Home size={17} className="text-[#158B86] cursor-pointer hover:opacity-80 transition-colors" strokeWidth={2.5} onClick={() => onNavigate('Dashboard')} />
          <ChevronRight size={15} className="text-gray-500" strokeWidth={2} />
          <span className="text-[var(--text-color)]">{t('tutorials')}</span>
        </div>

        <div className="relative w-full sm:w-[320px]">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-color)] opacity-40" />
          <input 
            type="text" 
            placeholder={t('search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] pl-11 pr-4 py-3 text-[var(--text-color)] text-[14px] outline-none focus:border-[#158B86] transition-all placeholder:text-[var(--text-color)] placeholder:opacity-20"
          />
        </div>

      </div>

      {/* ── Tutorials Grid ──────────────────────────────────────── */}
      {filteredTutorials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredTutorials.map((video, index) => (
            <div key={index} className="group cursor-pointer">
              {/* Thumbnail */}
              <div className="relative aspect-video rounded-[12px] overflow-hidden mb-4 border border-[var(--border-color)] bg-[var(--card-bg)]">
                {/* Video Thumbnail */}

                <img 
                  src={video.thumbnail} 
                  alt={language === 'EN' ? video.titleEN : video.titleHI} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay with play button */}

                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center z-10">
                  <div className="w-14 h-10 bg-red-600 rounded-[8px] flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                    <Play size={20} fill="white" className="text-white ml-0.5" />
                  </div>
                </div>
                
                {/* Branding Overlays (Matches Screenshot) */}
                <div className="absolute top-3 left-3 flex items-center gap-2 z-20">
                  <div className="w-8 h-8 rounded-full bg-white border border-white/20 flex items-center justify-center overflow-hidden">
                    <img src={youtubeIcon} alt="" className="w-full h-full object-contain" />


                  </div>


                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-white leading-none shadow-sm">{language === 'EN' ? video.titleEN : video.titleHI}</span>
                    <span className="text-[10px] text-white/70 font-medium">Neptunefxcrm</span>
                  </div>
                </div>

                {/* Mock YouTube UI elements */}
                <div className="absolute bottom-3 right-3 bg-black/80 px-1.5 py-0.5 rounded text-[11px] font-bold text-white z-20">
                  {video.duration}
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-[16px] font-bold text-[var(--text-color)] group-hover:text-[#158B86] transition-colors line-clamp-1">
                  {language === 'EN' ? video.titleEN : video.titleHI}
                </h3>
                <p className="text-[13px] text-[var(--text-color)] opacity-40 leading-relaxed line-clamp-2 font-medium">
                  {language === 'EN' ? video.descEN : video.descHI}
                </p>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 bg-[var(--card-bg)] rounded-full flex items-center justify-center mb-4 border border-[var(--border-color)]">
            <Search size={32} className="text-[var(--text-color)] opacity-20" />
          </div>
          <h3 className="text-xl font-bold text-[var(--text-color)] mb-2">{t('noTutorials')}</h3>
          <p className="text-[#8e9d9b] max-w-md">
            {t('tryKeywords')}
          </p>

          <button 
            onClick={() => setSearchQuery('')}
            className="mt-6 text-[#158B86] font-semibold hover:underline"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>

  );
};

export default TutorialsPage;
