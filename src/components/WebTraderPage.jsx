import React, { useState } from 'react';
import { Home, ChevronRight, Moon, Globe, Link2, UserPlus, Lock, ShieldCheck, ChevronDown } from 'lucide-react';

const TRANSLATIONS = {
  EN: { news: 'News', userDashboard: 'User Dashboard', ibDashboard: 'IB Dashboard' },
  HI: { news: 'समाचार', userDashboard: 'यूजर डैशबोर्ड', ibDashboard: 'आईबी डैशबोर्ड' },
};

const WebTraderPage = ({ onNavigate }) => {
  const [dashboardType, setDashboardType] = useState('User');
  const [language, setLanguage] = useState('EN');
  const [activeTab, setActiveTab] = useState('connect');
  const [savePassword, setSavePassword] = useState(true);

  const t = (key) => TRANSLATIONS[language]?.[key] || key;

  return (
    <div className="flex flex-col w-full animate-fade-in pb-20">
      {/* ── Top Header ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/5 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-[22px] font-extrabold text-white tracking-tight uppercase">WEB TRADER</h1>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#AF6C56] animate-pulse" />
            <span className="bg-[#158B86] text-white text-sm font-medium px-2 rounded-sm">{t('news')}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="bg-[#122D32] p-1.5 rounded-full flex items-center h-[38px]">
            <button onClick={() => setDashboardType('User')} className={`px-4 py-1.5 rounded-full text-[13px] transition-colors ${dashboardType === 'User' ? 'bg-[#158B86] text-white font-semibold' : 'text-[#8e9d9b] hover:text-white'}`}>{t('userDashboard')}</button>
            <button onClick={() => setDashboardType('IB')}   className={`px-4 py-1.5 rounded-full text-[13px] transition-colors ${dashboardType === 'IB'   ? 'bg-[#158B86] text-white font-semibold' : 'text-[#8e9d9b] hover:text-white'}`}>{t('ibDashboard')}</button>
          </div>
          <button className="text-[#8e9d9b] hover:text-white transition-colors"><Moon size={20} strokeWidth={2} /></button>
          <div className="flex items-center gap-1.5 bg-[#122D32] px-3 py-1.5 rounded-full h-[38px] text-[#8e9d9b] text-[13px] cursor-pointer hover:text-white transition-all">
            <Globe size={16} /> <span>US</span>
          </div>
        </div>
      </div>

      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <div className="flex items-center gap-2 text-[15px] mb-7 font-medium">
        <Home size={17} className="text-[#158B86] cursor-pointer hover:text-white transition-colors" strokeWidth={2.5} onClick={() => onNavigate('Dashboard')} />
        <ChevronRight size={15} className="text-gray-500" strokeWidth={2} />
        <span className="text-white">Web Trader</span>
      </div>

      {/* ── Main Content Area (Mockup of MT5 WebTrader) ───────────────── */}
      <div className="w-full bg-[#f0f0f0] rounded-[12px] min-h-[600px] flex items-center justify-center p-10 overflow-hidden relative border border-white/5 shadow-2xl">
        {/* Background texture or grid if needed, but the screenshot is clean white-ish */}
        
        {/* The Login Box */}
        <div className="w-full max-w-[800px] bg-white rounded-[4px] shadow-[0_15px_50px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden animate-slide-up">
          {/* Box Header */}
          <div className="bg-[#4285F4] px-6 py-3.5 flex items-center">
            <span className="text-white text-[15px] font-medium tracking-wide">Trading accounts: MetaQuotes Ltd.</span>
          </div>

          <div className="flex flex-1">
            {/* Left Sidebar */}
            <div className="w-[280px] bg-[#f9f9f9] border-r border-[#e0e0e0] flex flex-col pt-4">
              <button 
                onClick={() => setActiveTab('connect')}
                className={`flex items-center gap-4 px-6 py-4 text-[15px] transition-all border-l-[3px] ${activeTab === 'connect' ? 'bg-white border-[#4285F4] text-[#4285F4] font-bold shadow-sm' : 'border-transparent text-[#555] hover:bg-[#ececec]'}`}
              >
                <Link2 size={20} className={activeTab === 'connect' ? 'text-[#4285F4]' : 'text-gray-400'} />
                <span>Connect to account</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('demo')}
                className={`flex items-center gap-4 px-6 py-4 text-[15px] transition-all border-l-[3px] ${activeTab === 'demo' ? 'bg-white border-[#4285F4] text-[#4285F4] font-bold shadow-sm' : 'border-transparent text-[#555] hover:bg-[#ececec]'}`}
              >
                <UserPlus size={20} className={activeTab === 'demo' ? 'text-[#4285F4]' : 'text-gray-400'} />
                <span>Open Demo account</span>
              </button>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Box Footer (Copyright) */}
              <div className="p-8 border-t border-[#e0e0e0] text-[12px] text-[#999]">
                <p>© 2000 - 2026, MetaQuotes Ltd.</p>
                <a href="#" className="text-[#4285F4] hover:underline block mt-1">End-User License Agreement</a>
              </div>
            </div>

            {/* Right Form Area */}
            <div className="flex-1 p-10 flex flex-col">
              {activeTab === 'connect' ? (
                <>
                  <h2 className="text-[18px] font-bold text-[#333] mb-8">Connect to account</h2>
                  <div className="space-y-6 max-w-[450px]">
                    <div className="flex items-center gap-4">
                      <label className="w-[100px] text-[14px] text-[#555] font-medium">Login</label>
                      <input 
                        type="text" 
                        placeholder="Enter Login"
                        className="flex-1 h-11 px-4 bg-white border border-[#dcdcdc] rounded-[4px] text-[14px] focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] outline-none transition-all placeholder:text-gray-300 shadow-sm"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="w-[100px] text-[14px] text-[#555] font-medium">Password</label>
                      <div className="flex-1 flex flex-col gap-2">
                        <input 
                          type="password" 
                          placeholder="Enter Password"
                          className="w-full h-11 px-4 bg-white border border-[#dcdcdc] rounded-[4px] text-[14px] focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] outline-none transition-all placeholder:text-gray-300 shadow-sm"
                        />
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setSavePassword(!savePassword)}>
                            <div className={`w-4 h-4 rounded-[2px] border transition-all flex items-center justify-center ${savePassword ? 'bg-[#4285F4] border-[#4285F4]' : 'bg-white border-[#dcdcdc]'}`}>
                              {savePassword && <span className="text-white text-[10px]">✓</span>}
                            </div>
                            <span className="text-[13px] text-[#666] group-hover:text-[#333]">Save password</span>
                          </div>
                          <div className="text-[12px] text-[#888]">
                            Forgot Password? <a href="#" className="text-[#4285F4] hover:underline ml-1">Contact company</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="w-[100px] text-[14px] text-[#555] font-medium">Server</label>
                      <div className="flex-1 text-[15px] text-[#333] font-bold">MetaQuotes-Demo</div>
                    </div>
                    <div className="pt-6 flex justify-end">
                      <button className="px-8 py-3 bg-[#4CAF50] hover:bg-[#43a047] text-white text-[14px] font-bold rounded-[4px] shadow-lg shadow-green-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0 active:shadow-md">
                        Connect to account
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-[18px] font-bold text-[#333] mb-8">Open Demo account</h2>
                  <div className="space-y-5 max-w-[500px]">
                    <div className="flex items-center gap-4">
                      <label className="w-[110px] text-[14px] text-[#555] font-medium">Company</label>
                      <span className="text-[15px] text-[#4285F4] font-medium">MetaQuotes Ltd.</span>
                    </div>

                    <div className="flex items-start gap-4">
                      <label className="w-[110px] text-[14px] text-[#555] font-medium mt-3">Your Name</label>
                      <div className="flex-1 flex flex-col gap-3">
                        <input type="text" placeholder="Name" className="w-full h-10 px-4 bg-white border border-[#dcdcdc] rounded-[4px] text-[14px] outline-none" />
                        <input type="text" placeholder="Surname" className="w-full h-10 px-4 bg-white border border-[#dcdcdc] rounded-[4px] text-[14px] outline-none" />
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="w-[110px] text-[14px] text-[#555] font-medium">Email</label>
                      <input type="email" placeholder="Email" className="flex-1 h-10 px-4 bg-white border border-[#dcdcdc] rounded-[4px] text-[14px] outline-none" />
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="w-[110px] text-[14px] text-[#555] font-medium">Mobile phone</label>
                      <input type="text" placeholder="Phone number" className="flex-1 h-10 px-4 bg-white border border-[#dcdcdc] rounded-[4px] text-[14px] outline-none" />
                    </div>

                    <div className="pl-[126px] flex items-center gap-3">
                       <input type="checkbox" className="w-4 h-4 rounded-[2px]" />
                       <span className="text-[13px] text-[#333]">Use hedge in trading</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="w-[110px] text-[14px] text-[#555] font-medium">Account type</label>
                      <div className="flex-1 relative">
                        <select className="w-full h-10 pl-4 pr-10 bg-white border border-[#dcdcdc] rounded-[4px] text-[14px] appearance-none outline-none cursor-pointer">
                          <option>Forex Hedged USD</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="w-[110px] text-[14px] text-[#555] font-medium">Deposit</label>
                      <div className="flex items-center gap-3 flex-1">
                        <input type="text" defaultValue="100000" className="w-24 h-10 px-4 bg-white border border-[#dcdcdc] rounded-[4px] text-[14px] outline-none" />
                        <span className="text-[13px] text-[#555]">USD</span>
                        <span className="text-[13px] text-[#555] ml-4 font-medium">Leverage</span>
                        <div className="flex-1 relative">
                          <select className="w-full h-10 pl-4 pr-10 bg-white border border-[#dcdcdc] rounded-[4px] text-[14px] appearance-none outline-none cursor-pointer">
                            <option>100</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="pl-[126px] flex flex-col gap-3">
                      <div className="flex items-start gap-3">
                        <input type="checkbox" className="w-4 h-4 rounded-[2px] mt-1" />
                        <span className="text-[12px] text-[#333] leading-relaxed">
                          I agree with the terms and conditions for opening an account and the data protection policy
                        </span>
                      </div>
                      <a href="#" className="text-[12px] text-[#4285F4] hover:underline">www.metaquotes.net</a>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button className="px-8 py-3 bg-[#4CAF50] hover:bg-[#43a047] text-white text-[14px] font-bold rounded-[4px] shadow-lg shadow-green-500/20 transition-all">
                        Open Demo account
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Floating security badge or similar if helpful */}
        <div className="absolute bottom-6 right-8 flex items-center gap-2 text-[12px] text-[#777] bg-white/50 backdrop-blur px-3 py-1.5 rounded-full border border-white/30">
          <ShieldCheck size={14} className="text-[#4285F4]" /> Secure Connection via 256-bit SSL
        </div>
      </div>
    </div>
  );
};

export default WebTraderPage;
