import React, { useState } from 'react';
import { Home, ChevronRight, Monitor, Apple, Smartphone, Laptop, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import downloadBg from '../assets/download-bg.jpg';
import mt5Logo from '../assets/mt5.png';

const TRANSLATIONS = {
  EN: { 
    news: 'News', 
    userDashboard: 'User Dashboard', 
    ibDashboard: 'IB Dashboard',
    title: 'DOWNLOAD TERMINAL',
    heroTitle: 'MT5 Trading App',
    heroSubtitle: 'Download the MT5 trading app on App Store and Google Play Store',
    downloadSection: 'Download',
    mt5Title: 'METATRADER 5',
    mt5Subtitle: 'Download Meta Trader for PC, web browsers, smartphones and tablets',
    riskTitle: 'RISK STATEMENT :',
    riskText: 'All investments entail risks and may result in both profits and losses. In particular, trading leveraged derivative products such as Foreign Exchange (Forex) and Contracts for Difference (CFDs) carries a high level of risk to your capital. All these derivative products, many of which are leveraged, may not be appropriate for all investors.',
    riskText2: 'It is important that you understand that investments, your capital is at risk. Past performance is not a guide to future performance. You should carefully consider your investment objectives, trading knowledge and experience and affordability.',
    riskText3: 'MetaTrader is a trading name of MT5, authorised and regulated by the Financial Services Authority of Seychelles with License No. SD049.'
  },
  HI: {
    news: 'समाचार',
    userDashboard: 'उपयोगकर्ता डैशबोर्ड',
    ibDashboard: 'IB डैशबोर्ड',
    title: 'टर्मिनल डाउनलोड करें',
    heroTitle: 'एमटी5 ट्रेडिंग ऐप',
    heroSubtitle: 'ऐप स्टोर और गूगल प्ले स्टोर से एमटी5 ट्रेडिंग ऐप डाउनलोड करें',
    downloadSection: 'डाउनलोड',
    mt5Title: 'मेटाट्रेडर 5',
    mt5Subtitle: 'पीसी, वेब ब्राउज़र, स्मार्टफोन और टैबलेट के लिए मेटाट्रेडर डाउनलोड करें',
    riskTitle: 'जोखिम विवरण :',
    riskText: 'सभी निवेशों में जोखिम शामिल होता है और इससे लाभ या हानि दोनों हो सकते हैं। विशेष रूप से, विदेशी मुद्रा (फॉरेक्स) और कॉन्ट्रैक्ट्स फॉर डिफरेंस (CFDs) जैसे लीवरेज्ड डेरिवेटिव उत्पादों का व्यापार आपकी पूंजी के लिए उच्च स्तर का जोखिम लेकर आता है। ऐसे सभी डेरिवेटिव उत्पाद, जिनमें से कई लीवरेज्ड होते हैं, सभी निवेशकों के लिए उपयुक्त नहीं हो सकते हैं। लीवरेज का प्रभाव यह होता है कि लाभ और हानि दोनों बढ़ जाते हैं।',
    riskText2: 'यह महत्वपूर्ण है कि आप समझें कि निवेश में आपकी पूंजी जोखिम में होती है। पिछला प्रदर्शन भविष्य के प्रदर्शन का संकेत नहीं होता है। किसी भी वित्तीय उत्पाद में निवेश करने से पहले, आपको अपने निवेश उद्देश्यों, ट्रेडिंग ज्ञान, अनुभव और वहन क्षमता पर सावधानीपूर्वक विचार करना चाहिए।',
    riskText3: 'मेटाट्रेडर, एमटी5 का एक ट्रेडिंग नाम है, जो सेशेल्स वित्तीय सेवा प्राधिकरण द्वारा लाइसेंस संख्या SD049 के अंतर्गत अधिकृत और विनियमित है।',
    windows: 'विंडोज़',
    macos: 'मैक ओएस',
    ios: 'आईफ़ोन/आईपैड',
    android: 'एंड्रॉइड/टैबलेट',
    apk: 'एपीके'
  }
};

const DownloadPage = ({ onNavigate }) => {
  const { language } = useLanguage();
  const [dashboardType, setDashboardType] = useState('User');

  const t = (key) => TRANSLATIONS[language]?.[key] || key;

  const downloadOptions = [
    { 
      id: 'windows', 
      name: t('windows'), 
      url: 'https://download.mql5.com/cdn/web/metaquotes.ltd/mt5/mt5setup.exe?utm_source=www.metaquotes.net&utm_campaign=download',
      icon: (
        <svg viewBox="0 0 448 512" className="w-5 h-5 fill-current">
          <path d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z"/>
        </svg>
      )
    },
    { 
      id: 'macos', 
      name: t('macos'), 
      url: 'https://download.mql5.com/cdn/web/metaquotes.ltd/mt5/mt5setup.exe?utm_source=www.metaquotes.net&utm_campaign=download',
      icon: (
        <svg viewBox="0 0 512 512" className="w-5 h-5 fill-current">
          <path d="M255.9 120.9l9.1-15.7c5.6-9.8 18.1-13.1 27.9-7.5 9.8 5.6 13.1 18.1 7.5 27.9l-87.5 151.5h63.3c20.5 0 32 24.1 23.1 40.8H113.8c-11.3 0-20.4-9.1-20.4-20.4 0-11.3 9.1-20.4 20.4-20.4h52l66.6-115.4-20.8-36.1c-5.6-9.8-2.3-22.2 7.5-27.9 9.8-5.6 22.2-2.3 27.9 7.5l8.9 15.7zm-78.7 218l-19.6 34c-5.6 9.8-18.1 13.1-27.9 7.5-9.8-5.6-13.1-18.1-7.5-27.9l14.6-25.2c16.4-5.1 29.8-1.2 40.4 11.6zm168.9-61.7h53.1c11.3 0 20.4 9.1 20.4 20.4 0 11.3-9.1 20.4-20.4 20.4h-29.5l19.9 34.5c5.6 9.8 2.3 22.2-7.5 27.9-9.8 5.6-22.2 2.3-27.9-7.5-33.5-58.1-58.7-101.6-75.4-130.6-17.1-29.5-4.9-59.1 7.2-69.1 13.4 23 33.4 57.7 60.1 104zM256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216z"/>
        </svg>
      )
    },
    { 
      id: 'ios', 
      name: t('ios'), 
      url: 'https://apps.apple.com/us/app/metatrader-5/id413251709?utm_campaign=install.metaquotes&utm_source=www.metaquotes.net',
      icon: (
        <svg viewBox="0 0 16 16" className="w-5 h-5 fill-current">
          <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"/>
        </svg>
      )
    },
    { 
      id: 'android', 
      name: t('android'), 
      url: 'https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5&hl=en&referrer=ref_id%3d5192043324314688962%26hl%3den%26utm_source%3dwww.metaquotes.net%26utm_campaign%3dinstall.metaquotes',
      icon: (
        <svg viewBox="0 0 16 16" className="w-5 h-5 fill-current">
          <path d="m10.213 1.471.691-1.26q.069-.124-.048-.192-.128-.057-.195.058l-.7 1.27A4.8 4.8 0 0 0 8.005.941q-1.032 0-1.956.404l-.7-1.27Q5.281-.037 5.154.02q-.117.069-.049.193l.691 1.259a4.25 4.25 0 0 0-1.673 1.476A3.7 3.7 0 0 0 3.5 5.02h9q0-1.125-.623-2.072a4.27 4.27 0 0 0-1.664-1.476ZM6.22 3.303a.37.37 0 0 1-.267.11.35.35 0 0 1-.263-.11.37.37 0 0 1-.107-.264.37.37 0 0 1 .107-.265.35.35 0 0 1 .263-.11q.155 0 .267.11a.36.36 0 0 1 .112.265.36.36 0 0 1-.112.264m4.101 0a.35.35 0 0 1-.262.11.37.37 0 0 1-.268-.11.36.36 0 0 1-.112-.264q0-.154.112-.265a.37.37 0 0 1 .268-.11q.155 0 .262.11a.37.37 0 0 1 .107.265q0 .153-.107.264M3.5 11.77q0 .441.311.75.311.306.76.307h.758l.01 2.182q0 .414.292.703a.96.96 0 0 0 .7.288.97.97 0 0 0 .71-.288.95.95 0 0 0 .292-.703v-2.182h1.343v2.182q0 .414.292.703a.97.97 0 0 0 .71.288.97.97 0 0 0 .71-.288.95.95 0 0 0 .292-.703v-2.182h.76q.436 0 .749-.308.31-.307.311-.75V5.365h-9zm10.495-6.587a.98.98 0 0 0-.702.278.9.9 0 0 0-.293.685v4.063q0 .406.293.69a.97.97 0 0 0 .702.284q.42 0 .712-.284a.92.92 0 0 0 .293-.69V6.146a.9.9 0 0 0-.293-.685 1 1 0 0 0-.712-.278m-12.702.283a1 1 0 0 1 .712-.283q.41 0 .702.283a.9.9 0 0 1 .293.68v4.063a.93.93 0 0 1-.288.69.97.97 0 0 1-.707.284 1 1 0 0 1-.712-.284.92.92 0 0 1-.293-.69V6.146q0-.396.293-.68"/>
        </svg>
      )
    },
    { 
      id: 'apk', 
      name: t('apk'), 
      url: 'https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5&hl=en&referrer=ref_id%3d5192043324314688962%26hl%3den%26utm_source%3dwww.metaquotes.net%26utm_campaign%3dinstall.metaquotes',
      icon: (
        <svg viewBox="0 0 16 16" className="w-5 h-5 fill-current">
          <path fill-rule="evenodd" d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.004-.001.274-.11a.75.75 0 0 1 .558 0l.274.11.004.001zm-1.374.527L8 5.962 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339Z"/>
        </svg>
      )
    },
  ];




  return (
    <div className="flex flex-col w-full animate-fade-in pb-12">
      {/* ── Mobile Back Header (lg:hidden) ── */}
      <div className="flex lg:hidden items-center gap-3 py-4 border-b border-[var(--border-color)] mb-6 -mx-4 px-4 bg-[var(--bg-color)] sticky top-0 z-[100]">
        <button onClick={() => onNavigate('Settings')} className="p-1 -ml-1 transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <h1 className="text-[20px] font-bold text-[#3B82F6]">{t('title')}</h1>
      </div>

      {/* ── Top Header (Desktop only) ─────────────────────────────────── */}
      <div className="hidden lg:flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)] mb-6 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-[22px] font-extrabold text-[var(--text-color)] tracking-tight">{t('title')}</h1>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#158B86] animate-pulse" />
            <span className="bg-[#158B86] text-white text-sm font-medium px-2 rounded-sm">{t('news')}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="bg-[var(--sub-bg)] p-1.5 rounded-full border border-[var(--border-color)] flex items-center h-[38px]">
            <button onClick={() => setDashboardType('User')} className={`px-4 py-1.5 rounded-full text-[13px] transition-colors ${dashboardType === 'User' ? 'bg-[#158B86] text-white font-semibold' : 'text-[#8e9d9b] hover:text-[var(--text-color)]'}`}>{t('userDashboard')}</button>
            <button onClick={() => setDashboardType('IB')}   className={`px-4 py-1.5 rounded-full text-[13px] transition-colors ${dashboardType === 'IB'   ? 'bg-[#158B86] text-white font-semibold' : 'text-[#8e9d9b] hover:text-[var(--text-color)]'}`}>{t('ibDashboard')}</button>
          </div>
        </div>
      </div>

      {/* ── Breadcrumb (Desktop only) ─────────────────────────────────── */}
      <div className="hidden lg:flex items-center gap-2 text-[15px] mb-7 font-medium shrink-0">
        <Home size={17} className="text-[#158B86] cursor-pointer hover:opacity-80 transition-colors" strokeWidth={2.5} onClick={() => onNavigate('Dashboard')} />
        <ChevronRight size={15} className="text-gray-500" strokeWidth={2} />
        <span className="text-[var(--text-color)]">Download Terminal</span>
      </div>

      {/* ── Hero Banner ────────────────────────────────────────── */}
      <div 
        className="relative w-full h-[150px] lg:h-[180px] rounded-[12px] overflow-hidden mb-8 flex flex-col items-center justify-center text-center px-6 shadow-2xl"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9)), url(${downloadBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <p className="text-white text-[16px] lg:text-[20px] font-bold leading-tight max-w-sm mb-0">
          Download the MT5 trading App on App Store and Google Play Store
        </p>
      </div>

      {/* ── Download Section ───────────────────────────────────── */}
      <div className="max-w-4xl mx-auto w-full px-2">
        <h3 className="text-[#3B82F6] lg:text-[#158B86] text-[28px] lg:text-[24px] font-bold mb-6 tracking-tight text-center lg:text-left">{t('downloadSection')}</h3>

        <div className="bg-[#1a1a1e] lg:bg-[var(--card-bg)] border border-white/5 lg:border-[var(--border-color)] rounded-[16px] p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white p-1 rounded-[4px]">
              <img src={mt5Logo} alt="MT5" className="w-6 h-6 object-contain" />
            </div>
            <h4 className="text-white lg:text-[var(--text-color)] text-[18px] lg:text-[20px] font-black tracking-tight uppercase">{t('mt5Title')}</h4>
          </div>
          <p className="text-[#3B82F6] lg:text-[var(--text-color)] text-[13px] lg:text-[14px] mb-10 font-medium leading-relaxed max-w-xs">{t('mt5Subtitle')}</p>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-y-10 gap-x-4">
            {downloadOptions.map((option) => (
              <a 
                key={option.id} 
                href={option.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-[#000000] lg:bg-[var(--sub-bg)] border border-white/5 lg:border-[var(--border-color)] flex items-center justify-center text-[#3B82F6] lg:text-[#158B86] group-hover:border-[#3B82F6]/50 lg:group-hover:border-[#158B86]/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] lg:group-hover:shadow-[0_0_20px_rgba(21,139,134,0.2)] transition-all duration-300">
                  <div className="scale-125">{option.icon}</div>
                </div>
                <span className="text-[#3B82F6] lg:text-[var(--text-color)] text-[12px] font-bold group-hover:text-white lg:group-hover:text-[#158B86] transition-colors text-center">{option.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* ── Risk Statement ────────────────────────────────────── */}
        <div className="mt-12 space-y-3 opacity-60">
          <h5 className="text-[var(--text-color)] text-[13px] font-black tracking-widest uppercase">{t('riskTitle')}</h5>
          <div className="space-y-2">
            <p className="text-[var(--text-color)] text-[11px] leading-relaxed italic">{t('riskText')}</p>
            <p className="text-[var(--text-color)] text-[11px] leading-relaxed italic text-justify">{t('riskText2')}</p>
            <p className="text-[var(--text-color)] text-[11px] leading-relaxed italic">{t('riskText3')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
