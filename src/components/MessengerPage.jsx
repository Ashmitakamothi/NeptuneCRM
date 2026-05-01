import React, { useState } from 'react';
import { Home, ChevronRight, Moon, Globe, Search, MessageSquare, X, Paperclip, Send, RefreshCcw, Copy } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import logom from '../assets/logom.png';
import logoWhite from '../assets/logo-white.png';

const TRANSLATIONS = {
  EN: { 
    news: 'News', userDashboard: 'User Dashboard', ibDashboard: 'IB Dashboard',
    inbox: 'INBOX', inboxBread: 'Inbox', users: 'Users', active: 'Active', archived: 'Archived',
    startChat: 'Start Chat', search: 'Search', noChatsPrefix: 'No', noChatsSuffix: 'chats',
    endChat: 'End Chat', typeMessage: 'Type a message...', startNewChat: 'Start new chat with Uplink',
    ibInbox: 'IB INBOX', ibInboxBread: 'IB Inbox', referralLink: 'My Referral Link'
  },
  HI: { 
    news: 'समाचार', userDashboard: 'यूजर डैशबोर्ड', ibDashboard: 'आईबी डैशबोर्ड',
    inbox: 'इनबॉक्स', inboxBread: 'इनबॉक्स', users: 'उपयोगकर्ता', active: 'सक्रिय', archived: 'संग्रहीत',
    startChat: 'चैट शुरू करें', search: 'खोज', noChatsPrefix: 'कोई', noChatsSuffix: 'चैट नहीं',
    endChat: 'चैट समाप्त करें', typeMessage: 'संदेश लिखें...', startNewChat: 'अपलिंक के साथ नई चैट शुरू करें',
    ibInbox: 'IB INBOX', ibInboxBread: 'IB Inbox', referralLink: 'मेरा रेफरल लिंक'
  },
};

const StartChatModal = ({ isOpen, onClose, onSelectUser, language }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const t = (key) => TRANSLATIONS[language]?.[key] || key;
  
  const uplinks = [];


  return (
    <div className={`fixed inset-0 z-[200] flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-[#1a1a1e] border border-white/5 w-full max-w-[450px] rounded-[16px] shadow-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-10 scale-95 opacity-0'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <h2 className="text-[20px] font-bold text-[#3B82F6]">{t('startNewChat')}</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <div className="relative mb-6">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input 
              type="text" 
              placeholder={t('search')} 
              className="w-full bg-[#000000] border border-white/5 rounded-[8px] pl-11 pr-4 py-3 text-white text-[14px] outline-none focus:border-[#3B82F6] transition-all placeholder:text-white/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-1 max-h-[400px] overflow-y-auto custom-scrollbar -mx-2 px-2">
            {(uplinks.length > 0 ? uplinks : [
              { id: 1, name: 'Test SubAdmin1', initial: 'TS', email: 'testsubadmin145+1@yopmail.com', role: 'Uplink', color: 'bg-blue-500' },
              { id: 2, name: 'Moin Pathan', initial: 'MP', email: 'moinpathan@yopmail.com', role: 'Uplink', color: 'bg-blue-600' },
              { id: 3, name: 'Isha Patel', initial: 'IP', email: 'isha198@yopmail.com', role: 'Uplink', color: 'bg-blue-700' },
              { id: 4, name: 'man Donda', initial: 'MD', email: 'jason.mann00@yopmail.com', role: 'Uplink', color: 'bg-blue-800' },
              { id: 5, name: 'Test SubAdmin', initial: 'TS', email: 'testsubadmin145@yopmail.com', role: 'Uplink', color: 'bg-blue-500' },
              { id: 6, name: 'Aryan Singh', initial: 'AS', email: 'aryansingh1703@yopmail.com', role: 'Uplink', color: 'bg-blue-600' },
            ])
              .filter(user => {
                const search = searchQuery.toLowerCase();
                return user.name.toLowerCase().includes(search) || user.email.toLowerCase().includes(search);
              })
              .map((user) => (
                <div 
                  key={user.id} 
                  className="flex items-center gap-4 p-3 rounded-[12px] hover:bg-white/5 cursor-pointer transition-all border border-transparent"
                  onClick={() => onSelectUser(user)}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-[16px] text-white shrink-0 ${user.color}`}>
                    {user.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-white font-bold text-[15px]">{user.name}</span>
                      <span className="bg-[#3B82F6]/20 text-[#3B82F6] text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-[#3B82F6]/30">{user.role}</span>
                    </div>
                    <div className="text-white/40 text-[13px] truncate">{user.email}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MessengerPage = ({ onNavigate, isIBMode = false }) => {
  const { isDark } = useTheme();
  const { language } = useLanguage();
  const [dashboardType, setDashboardType] = useState(isIBMode ? 'IB' : 'User');
  const [activeTab, setActiveTab] = useState('Active');
  const [isStartChatOpen, setIsStartChatOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');

  const currentLang = language?.toUpperCase() || 'EN';
  const t = (key) => (TRANSLATIONS[currentLang] || TRANSLATIONS.EN)?.[key] || key;

  const users = [];
  const filteredUsers = users.filter(user => user.status === activeTab);

  const handleSelectUser = (user) => {
    setSelectedChat(user);
    setIsStartChatOpen(false);
  };

  return (
    <div className="h-[calc(100vh-160px)] min-h-fit p-4 pb-[100px] animate-fade-in">
      {/* ── Mobile Back Header (lg:hidden) ── */}
      <div className="flex lg:hidden items-center gap-3 py-4 border-b border-[var(--border-color)] mb-6 -mx-4 px-4 bg-[var(--bg-color)] sticky top-0 z-[100]">
        <button onClick={() => selectedChat ? setSelectedChat(null) : onNavigate('Settings')} className="p-1 -ml-1 transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <h1 className="text-[20px] font-bold text-[#3B82F6]">Inbox</h1>
      </div>

      {/* ── Top Header (Desktop only) ─────────────────────────────────── */}
      <div className="hidden lg:flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)] mb-6 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-[22px] font-extrabold text-[var(--text-color)] tracking-tight">{isIBMode ? t('ibInbox') : t('inbox')}</h1>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#AF6C56] animate-pulse" />
            <span className="bg-[#158B86] text-white text-sm font-medium px-2 rounded-sm">{t('news')}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="bg-[var(--sub-bg)] p-1.5 rounded-full border border-[var(--border-color)] flex items-center h-[38px]">
            <button onClick={() => { setDashboardType('User'); onNavigate('Dashboard'); }} className={`px-4 py-1.5 rounded-full text-[13px] transition-colors ${dashboardType === 'User' ? 'bg-[#158B86] text-white font-semibold' : 'text-[#8e9d9b] hover:text-[var(--text-color)]'}`}>{t('userDashboard')}</button>
            <button onClick={() => { setDashboardType('IB'); onNavigate('IB_Dashboard'); }}   className={`px-4 py-1.5 rounded-full text-[13px] transition-colors ${dashboardType === 'IB'   ? 'bg-[#158B86] text-white font-semibold' : 'text-[#8e9d9b] hover:text-[var(--text-color)]'}`}>{t('ibDashboard')}</button>
          </div>
        </div>
      </div>

      <div className="border-2 border-[var(--border-color)] rounded-xl flex overflow-hidden h-full">
        {/* Sidebar (Desktop only) */}
        <div className={`hidden xl:flex w-1/4 border-r-2 border-[var(--border-color)] flex-col bg-[#1a1a1a]`}>
          <div className="p-4 border-b border-[var(--border-color)] flex items-center justify-between sticky top-0 z-10 shadow-sm bg-[#1a1a1a]">
            <span className="text-[var(--text-color)] font-semibold text-lg">{t('users')}</span>
            <div className="flex bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] p-1 scale-90">
              <button onClick={() => setActiveTab('Active')} className={`px-3 py-1 rounded-[6px] text-[12px] font-bold transition-all ${activeTab === 'Active' ? 'bg-[#158B86] text-white' : 'text-[#8e9d9b]'}`}>{t('active')}</button>
              <button onClick={() => setActiveTab('Archived')} className={`px-3 py-1 rounded-[6px] text-[12px] font-bold transition-all ${activeTab === 'Archived' ? 'bg-[#158B86] text-white' : 'text-[#8e9d9b]'}`}>{t('archived')}</button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div 
                  key={user.id} 
                  onClick={() => setSelectedChat(user)}
                  className={`flex items-center gap-4 p-4 border-b border-[var(--border-color)] cursor-pointer transition-colors hover:bg-[var(--sub-bg)] ${selectedChat?.id === user.id ? 'bg-[var(--sub-bg)]' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] shrink-0 ${user.color}`}>
                    {user.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[var(--text-color)] font-bold text-[14px] truncate">{user.name}</span>
                    </div>
                    <div className="text-[var(--text-color)] opacity-40 text-[12px] truncate font-medium">{user.lastMsg}</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center mt-10 text-[14px]">No previous chat available</p>
            )}
          </div>
          
          <div className="p-4 border-t border-[var(--border-color)]">
            <button onClick={() => setIsStartChatOpen(true)} className="w-full flex items-center justify-center gap-2 bg-[#158B86] hover:bg-[#117672] text-white py-3 rounded-lg font-semibold transition-all text-[14px] shadow-lg lg:shadow-md">
              <MessageSquare size={18} />
              {t('startChat')}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col relative overflow-hidden bg-[#1a1a1a]">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--sub-bg)]">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] ${selectedChat.color}`}>
                    {selectedChat.initial}
                  </div>
                  <span className="text-[var(--text-color)] font-bold text-[16px]">{selectedChat.name}</span>
                </div>
                <button onClick={() => setSelectedChat(null)} className="text-red-500 hover:text-red-400 font-bold text-[14px]">{t('endChat')}</button>
              </div>
              <div className="flex-1 overflow-y-auto p-6" />
              <div className="p-6 border-t border-[var(--border-color)]">
                <div className="bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-xl flex items-center gap-3 px-4 py-2">
                  <input type="text" placeholder={t('typeMessage')} className="flex-1 bg-transparent border-none outline-none text-white text-[14px] py-2" value={message} onChange={e => setMessage(e.target.value)} />
                  <button className="text-[#3B82F6] lg:text-[#158B86]"><Send size={22} /></button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center h-full p-12">
              <img src={isDark ? logoWhite : logom} alt="Neptune" className="h-16 opacity-60 object-contain mb-6" />
              
              <button 
                onClick={() => setIsStartChatOpen(true)}
                className="xl:hidden flex items-center gap-3 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] hover:opacity-90 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20"
              >
                <MessageSquare size={20} />
                {t('startChat')}
              </button>
            </div>
          )}
        </div>
      </div>

      <StartChatModal 
        isOpen={isStartChatOpen} 
        onClose={() => setIsStartChatOpen(false)} 
        onSelectUser={handleSelectUser}
        language={language}
      />
    </div>
  );
};

export default MessengerPage;
