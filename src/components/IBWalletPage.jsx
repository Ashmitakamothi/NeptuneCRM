import React, { useState } from 'react';
import { Breadcrumb, Segmented, Button, Table, Input, Checkbox } from 'antd';
import dayjs from 'dayjs';
import { Home, ChevronRight, Copy, Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import * as IBIcons from './IBIcons';

const TRANSLATIONS = {
  EN: {
    ibWithdraw: "IB Withdraw",
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
    submit: "Submit",
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
       <p className="text-xl font-bold text-[var(--text-color)]">{val}</p>
       <p className="text-xs text-[var(--text-color)] opacity-60 font-medium tracking-wider mt-0.5">{label}</p>
    </div>
  </div>
);

const IBWalletPage = ({ onNavigate }) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language] || TRANSLATIONS.EN;

  return (
    <div className="animate-fade-in space-y-4 pb-10">
      {/* ── Mobile View (lg:hidden) ── */}
      <div className="lg:hidden h-[calc(100vh-160px)] min-h-fit p-4 pb-[100px] bg-[var(--theme-bg)] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center gap-3 py-4 border-b border-[var(--border-color)] mb-6 bg-[var(--bg-color)] sticky top-0 z-[100]">
          <button onClick={() => onNavigate('IB_Dashboard')} className="p-1 -ml-1 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <h1 className="text-[20px] font-bold text-[#3B82F6]">{t.ibWithdraw}</h1>
        </div>

        <div className="px-4 space-y-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Generate Commission */}
            <div className="rounded-2xl p-3 shadow-md border border-[var(--border-color)] bg-[var(--card-bg)] cursor-pointer hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="p-2 bg-[#7367F010] rounded-[10px] flex flex-col items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-6" viewBox="0 0 24 24" fill="none" stroke="#7367F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path><path d="m15 9-6 6"></path><path d="M9 9h.01"></path><path d="M15 15h.01"></path></svg>
                </div>
                <div className="ml-2 min-w-0">
                  <h3 className="text-xs font-bold leading-tight text-[var(--text-color)] opacity-60">Generate Commission</h3>
                  <p className="text-sm font-bold text-[var(--text-color)]">$ 0</p>
                </div>
              </div>
            </div>

            {/* Available Commission */}
            <div className="rounded-2xl p-3 shadow-md border border-[var(--border-color)] bg-[var(--card-bg)] cursor-pointer hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="p-2 bg-[#00727D10] rounded-[10px] flex flex-col items-center justify-center shrink-0">
                  <svg width="64px" height="64px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-6">
                    <path d="M12.8702 16.97V18.0701C12.8702 18.2478 12.7995 18.4181 12.6739 18.5437C12.5482 18.6694 12.3778 18.74 12.2001 18.74C12.0224 18.74 11.852 18.6694 11.7264 18.5437C11.6007 18.4181 11.5302 18.2478 11.5302 18.0701V16.9399C11.0867 16.8668 10.6625 16.7051 10.2828 16.4646C9.90316 16.2241 9.57575 15.9097 9.32013 15.54C9.21763 15.428 9.16061 15.2817 9.16016 15.1299C9.16006 15.0433 9.17753 14.9576 9.21155 14.8779C9.24557 14.7983 9.29545 14.7263 9.35809 14.6665C9.42074 14.6067 9.49484 14.5601 9.57599 14.5298C9.65713 14.4994 9.7436 14.4859 9.83014 14.49C9.91602 14.4895 10.0009 14.5081 10.0787 14.5444C10.1566 14.5807 10.2254 14.6338 10.2802 14.7C10.6 15.1178 11.0342 15.4338 11.5302 15.6099V13.0701C10.2002 12.5401 9.53015 11.77 9.53015 10.76C9.55019 10.2193 9.7627 9.70353 10.1294 9.30566C10.4961 8.9078 10.9929 8.65407 11.5302 8.59009V7.47998C11.5302 7.30229 11.6007 7.13175 11.7264 7.0061C11.852 6.88045 12.0224 6.81006 12.2001 6.81006C12.3778 6.81006 12.5482 6.88045 12.6739 7.0061C12.7995 7.13175 12.8702 7.30229 12.8702 7.47998V8.58008C13.2439 8.63767 13.6021 8.76992 13.9234 8.96924C14.2447 9.16856 14.5226 9.43077 14.7402 9.73999C14.8284 9.85568 14.8805 9.99471 14.8901 10.1399C14.8928 10.2256 14.8783 10.3111 14.8473 10.3911C14.8163 10.4711 14.7696 10.5439 14.7099 10.6055C14.6502 10.667 14.5787 10.7161 14.4998 10.7495C14.4208 10.7829 14.3359 10.8001 14.2501 10.8C14.1607 10.7989 14.0725 10.7787 13.9915 10.7407C13.9104 10.7028 13.8384 10.648 13.7802 10.5801C13.5417 10.2822 13.2274 10.054 12.8702 9.91992V12.1699L13.1202 12.27C14.3902 12.76 15.1802 13.4799 15.1802 14.6299C15.163 15.2399 14.9149 15.8208 14.4862 16.2551C14.0575 16.6894 13.4799 16.9449 12.8702 16.97ZM11.5302 11.5901V9.96997C11.3688 10.0285 11.2298 10.1363 11.1329 10.2781C11.0361 10.4198 10.9862 10.5884 10.9902 10.76C10.9984 10.93 11.053 11.0945 11.1483 11.2356C11.2435 11.3767 11.3756 11.4889 11.5302 11.5601V11.5901ZM13.7302 14.6599C13.7302 14.1699 13.3902 13.8799 12.8702 13.6599V15.6599C13.1157 15.6254 13.3396 15.5009 13.4985 15.3105C13.6574 15.1202 13.74 14.8776 13.7302 14.6299V14.6599Z" fill="#00727D" />
                  </svg>
                </div>
                <div className="ml-2 min-w-0">
                  <h3 className="text-xs font-bold leading-tight text-[var(--text-color)] opacity-60">Available Commission</h3>
                  <p className="text-sm font-bold text-[var(--text-color)]">$ 0</p>
                </div>
              </div>
            </div>

            {/* Withdraw Commission */}
            <div className="rounded-2xl p-3 shadow-md border border-[var(--border-color)] bg-[var(--card-bg)] cursor-pointer hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="p-2 bg-[#00BAD110] rounded-[10px] flex flex-col items-center justify-center shrink-0">
                  <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-6">
                    <path d="M12 9C11.4477 9 11 9.44771 11 10V15.5856L9.70711 14.2928C9.3166 13.9024 8.68343 13.9024 8.29292 14.2928C7.90236 14.6834 7.90236 15.3165 8.29292 15.7071L11.292 18.7063C11.6823 19.0965 12.3149 19.0968 12.7055 18.707L15.705 15.7137C16.0955 15.3233 16.0955 14.69 15.705 14.2996C15.3145 13.909 14.6814 13.909 14.2908 14.2996L13 15.5903V10C13 9.44771 12.5523 9 12 9Z" fill="#00BAD1" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M21 1C22.6569 1 24 2.34315 24 4V8C24 9.65685 22.6569 11 21 11H19V20C19 21.6569 17.6569 23 16 23H8C6.34315 23 5 21.6569 5 20V11H3C1.34315 11 0 9.65685 0 8V4C0 2.34315 1.34315 1 3 1H21ZM22 8C22 8.55228 21.5523 9 21 9H19V7H20C20.5523 7 21 6.55229 21 6C21 5.44772 20.5523 5 20 5H4C3.44772 5 3 5.44772 3 6C3 6.55229 3.44772 7 4 7H5V9H3C2.44772 9 2 8.55228 2 8V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V8ZM7 7V20C7 20.5523 7.44772 21 8 21H16C16.5523 21 17 20.5523 17 20V7H7Z" fill="#00BAD1" />
                  </svg>
                </div>
                <div className="ml-2 min-w-0">
                  <h3 className="text-xs font-bold leading-tight text-[var(--text-color)] opacity-60">Withdraw Commission</h3>
                  <p className="text-sm font-bold text-[var(--text-color)]">$ 0</p>
                </div>
              </div>
            </div>

            {/* Minimum Transfer */}
            <div className="rounded-2xl p-3 shadow-md border border-[var(--border-color)] bg-[var(--card-bg)] cursor-pointer hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="p-2 bg-[#28C76F10] rounded-[10px] flex flex-col items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-6" viewBox="0 0 24 24" fill="none" stroke="#28C76F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path><path d="M12 18V6"></path></svg>
                </div>
                <div className="ml-2 min-w-0">
                  <h3 className="text-xs font-bold leading-tight text-[var(--text-color)] opacity-60">Minimum Transfer</h3>
                  <p className="text-sm font-bold text-[var(--text-color)]">$ 1</p>
                </div>
              </div>
            </div>

            {/* Maximum Transfer */}
            <div className="rounded-2xl p-3 shadow-md border border-[var(--border-color)] bg-[var(--card-bg)] cursor-pointer hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="p-2 bg-[#FF9F4310] rounded-[10px] flex flex-col items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-6" viewBox="0 0 24 24" fill="none" stroke="#FF9F43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path><path d="M12 18V6"></path></svg>
                </div>
                <div className="ml-2 min-w-0">
                  <h3 className="text-xs font-bold leading-tight text-[var(--text-color)] opacity-60">Maximum Transfer</h3>
                  <p className="text-sm font-bold text-[var(--text-color)]">$ 100</p>
                </div>
              </div>
            </div>
          </div>

          {/* Withdraw Form */}
          <div className="border-[2px] border-[var(--border-color)] rounded-xl bg-[var(--card-bg)] pt-4 w-full mt-5">
            <p className="text-xl font-semibold px-4 pb-4 border-b border-[var(--border-color)] text-[var(--text-color)]">Withdraw</p>
            <form autoComplete="off" className="w-full">
              <div className="p-4">
                <div className="md:w-1/3">
                  <label className="text-lg font-medium text-[var(--text-color)] block mb-2">Amount In USD</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-color)] opacity-30">$</span>
                    <input 
                      type="number" 
                      placeholder="0" 
                      className="w-full bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl h-12 pl-8 pr-4 text-[var(--text-color)] focus:border-[#3B82F6] outline-none transition-colors"
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-between items-center mt-6">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 rounded border-[var(--border-color)] bg-[var(--bg-color)] text-[#3B82F6]" />
                    <span className="text-[14px] text-[var(--text-color)] opacity-60">
                      Yes, I agree to the <a href="https://mt5.neptunefxcrm.com/TermsPdf/CommissionWithdraw.pdf" target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] underline hover:text-[#2563EB] duration-300">Terms & Conditions</a>
                    </span>
                  </div>
                  
                  <div className="mt-4 w-full sm:w-auto">
                    <button type="submit" className="w-full sm:w-auto bg-[#3B82F6] text-sm text-white font-semibold rounded-lg px-8 py-2.5 uppercase transition-all duration-500 hover:bg-[#2563EB] active:scale-95 shadow-lg shadow-blue-500/20">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* History Table */}
          <div className="py-6">
            <div className="border border-[var(--border-color)] rounded-xl overflow-hidden shadow-xl bg-[var(--card-bg)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[var(--segmented-bg)] text-[var(--text-color)] text-[11px] tracking-wider uppercase">
                    <tr>
                      <th className="px-4 py-4 font-bold border-b border-[var(--border-color)]">Name</th>
                      <th className="px-4 py-4 font-bold border-b border-[var(--border-color)]">Type</th>
                      <th className="px-4 py-4 font-bold border-b border-[var(--border-color)]">Amount</th>
                      <th className="px-4 py-4 font-bold border-b border-[var(--border-color)]">Status</th>
                      <th className="px-4 py-4 font-bold border-b border-[var(--border-color)]">Requested Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-color)]">
                    <tr>
                      <td colSpan="5" className="px-4 py-20 text-center">
                        <div className="flex flex-col items-center justify-center opacity-20">
                          <svg width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg" className="mb-2">
                            <g transform="translate(0 1)" fill="none" fillRule="evenodd">
                              <ellipse fill="#272727" cx="32" cy="33" rx="32" ry="7"></ellipse>
                              <g fillRule="nonzero" stroke="#3e3e3e">
                                <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                                <path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#1d1d1d"></path>
                              </g>
                            </g>
                          </svg>
                          <span className="text-sm font-medium text-[var(--text-color)] opacity-40">No Record Found</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Desktop View (lg:block hidden on mobile) ── */}
      <div className="hidden lg:block">
        {/* Header Section */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            <h1 className="text-[22px] font-bold uppercase tracking-tight text-[var(--text-color)]">{t.ibWithdraw}</h1>
            <div className="flex items-center gap-2">
               <div className="w-2.5 h-2.5 bg-[#AF6C56] rounded-full dotanim"></div>
               <div className="bg-[#12716E] text-white text-[13px] font-medium px-3 py-1 rounded-[4px] cursor-pointer">
                  {t.news}
               </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Referral Link */}
            <div className="hidden md:flex items-center gap-3 bg-[var(--segmented-bg)] border border-[var(--border-color)] px-5 py-2 rounded-xl">
               <p className="text-[14px] font-medium text-[var(--text-color)] opacity-70">{t.referralLink}: <span className="text-[var(--text-color)]">IFAHGGAP</span></p>
               <button className="text-[var(--text-color)] opacity-40 hover:opacity-100 transition-opacity">
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
                    prefix={<span className="text-[var(--text-color)] opacity-40 mr-1">$</span>}
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
    </div>
  );
};

export default IBWalletPage;
