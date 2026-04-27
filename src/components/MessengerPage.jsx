import React, { useState } from 'react';
import { Home, ChevronRight, Moon, Globe, Search, MessageSquare, X, Paperclip, Send, RefreshCcw } from 'lucide-react';
import logo from '../assets/logo.png.png';
import logoWhite from '../assets/logo-white.png';


const TRANSLATIONS = {
  EN: { news: 'News', userDashboard: 'User Dashboard', ibDashboard: 'IB Dashboard' },
  HI: { news: 'समाचार', userDashboard: 'यूजर डैशबोर्ड', ibDashboard: 'आईबी डैशबोर्ड' },
};

const StartChatModal = ({ isOpen, onClose, onSelectUser }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const uplinks = [
    { id: 1, name: 'Test SubAdmin1', role: 'Uplink', email: 'testsubadmin145+1@yopmail.com', initial: 'TS', color: 'bg-teal-500/20 text-teal-500' },
    { id: 2, name: 'Moin Pathan', role: 'Uplink', email: 'moinpathan@yopmail.com', initial: 'MP', color: 'bg-teal-500/20 text-teal-500' },
    { id: 3, name: 'Isha Patel', role: 'Uplink', email: 'isha198@yopmail.com', initial: 'IP', color: 'bg-teal-500/20 text-teal-500' },
    { id: 4, name: 'Aryan Singh', role: 'Uplink', email: 'aryansingh1703@yopmail.com', initial: 'AS', color: 'bg-teal-500/20 text-teal-500' },
    { id: 5, name: 'man Donda', role: 'Uplink', email: 'jason.mann00@yopmail.com', initial: 'MD', color: 'bg-teal-500/20 text-teal-500' },
    { id: 6, name: 'Test SubAdmin', role: 'Uplink', email: 'testsubadmin145@yopmail.com', initial: 'TS', color: 'bg-teal-500/20 text-teal-500' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-[#1A1A1A] border border-white/20 w-full max-w-[450px] rounded-[12px] shadow-2xl relative overflow-hidden animate-scale-in">
        <div className="flex items-center justify-between p-5 border-b border-white/20">
          <h2 className="text-[17px] font-bold text-white">Start new chat with Uplink</h2>
          <button onClick={onClose} className="text-[#8e9d9b] hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-5">
          <div className="relative mb-6">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full bg-black/30 border border-white/20 rounded-[8px] pl-10 pr-4 py-2.5 text-white text-[14px] outline-none focus:border-[#00BFA5]/50 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-1 max-h-[400px] overflow-y-auto custom-scrollbar">
            {uplinks
              .filter(user => {
                const search = searchQuery.toLowerCase();
                const nameMatch = user.name.toLowerCase().includes(search);
                const emailPrefix = user.email.split('@')[0].toLowerCase();
                const emailMatch = emailPrefix.includes(search);
                return nameMatch || emailMatch;
              })

              .map((user) => (
                <div 
                  key={user.id} 
                  className="flex items-center gap-4 p-3 rounded-[8px] hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-white/20"
                  onClick={() => onSelectUser(user)}
                >
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-[14px] ${user.color}`}>
                    {user.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-[15px]">{user.name}</span>
                      <span className="bg-[#00BFA5]/10 text-[#00BFA5] text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">{user.role}</span>
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

const MessengerPage = ({ onNavigate }) => {
  const [dashboardType, setDashboardType] = useState('User');
  const [language, setLanguage] = useState('EN');
  const [activeTab, setActiveTab] = useState('Active');
  const [isStartChatOpen, setIsStartChatOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');

  const t = (key) => TRANSLATIONS[language]?.[key] || key;

  const users = [

    { id: 1, name: 'Mike JH', role: 'Downlink', lastMsg: 'hi', initial: 'MJ', color: 'bg-[#158B86]/20 text-[#158B86]', status: 'Active' },
    { id: 2, name: 'Brayden Conner IB', role: 'Downlink', lastMsg: 'hello', initial: 'BI', color: 'bg-green-500/20 text-green-500', status: 'Active' },
    { id: 3, name: 'Moin Pathan', role: 'Downlink', lastMsg: 'Hello', initial: 'MP', color: 'bg-teal-500/20 text-teal-500', status: 'Active' },
    { id: 4, name: 'Tom David', role: 'Uplink', lastMsg: 'Hi Sam', initial: 'TD', color: 'bg-green-600/20 text-green-600', status: 'Active' },
    { id: 5, name: 'Old Client', role: 'Downlink', lastMsg: 'Old chat', initial: 'OC', color: 'bg-gray-500/20 text-gray-500', status: 'Archived' },
  ];

  const filteredUsers = users.filter(user => user.status === activeTab);

  const handleSelectUser = (user) => {
    setSelectedChat(user);
    setIsStartChatOpen(false);
  };

  return (
    <div className="flex flex-col w-full animate-fade-in h-[calc(100vh-140px)]">
      {/* ── Top Header ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/20 mb-6 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-[22px] font-extrabold text-white tracking-tight uppercase">INBOX</h1>
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
      <div className="flex items-center gap-2 text-[15px] mb-7 font-medium shrink-0">
        <Home size={17} className="text-[#158B86] cursor-pointer hover:text-white transition-colors" strokeWidth={2.5} onClick={() => onNavigate('Dashboard')} />
        <ChevronRight size={15} className="text-gray-500" strokeWidth={2} />
        <span className="text-white">Inbox</span>
      </div>

      {/* ── Main Layout ────────────────────────────────────────── */}
      <div className="flex flex-1 border border-white/20 rounded-[12px] overflow-hidden backdrop-blur-sm">
        {/* Sidebar */}
        <div className="w-[320px] border-r border-white/20 flex flex-col">
          <div className="p-4 border-b border-white/20 flex items-center justify-between">
            <span className="text-white font-bold text-[18px]">Users</span>
            <div className="flex bg-black/40 rounded-[8px] p-1 scale-90">
              <button 
                onClick={() => setActiveTab('Active')}
                className={`px-3 py-1 rounded-[6px] text-[12px] font-bold transition-all ${activeTab === 'Active' ? 'bg-[#158B86] text-white shadow-lg' : 'text-[#8e9d9b] hover:text-white'}`}
              >
                Active
              </button>
              <button 
                onClick={() => setActiveTab('Archived')}
                className={`px-3 py-1 rounded-[6px] text-[12px] font-bold transition-all ${activeTab === 'Archived' ? 'bg-[#158B86] text-white shadow-lg' : 'text-[#8e9d9b] hover:text-white'}`}
              >
                Archived
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div 
                  key={user.id} 
                  onClick={() => setSelectedChat(user)}
                  className={`flex items-center gap-4 p-4 border-b border-white/20 cursor-pointer transition-colors hover:bg-white/[0.02] ${selectedChat?.id === user.id ? 'bg-white/[0.04]' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] shrink-0 ${user.color}`}>
                    {user.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-white font-bold text-[14px] truncate">{user.name}</span>
                      <span className={`${user.role === 'Downlink' ? 'bg-[#158B86]/10 text-[#158B86]' : 'bg-green-500/10 text-green-500'} text-[10px] px-1.5 py-0.5 rounded font-bold uppercase`}>{user.role}</span>
                    </div>
                    <div className="text-white/40 text-[12px] truncate font-medium">{user.lastMsg}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center opacity-40">
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center mb-3">
                  <MessageSquare size={20} className="text-white/40" />
                </div>
                <p className="text-white/60 text-sm font-medium">No {activeTab.toLowerCase()} chats</p>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-white/20">
            <button 
              onClick={() => setIsStartChatOpen(true)}
              className="w-full flex items-center justify-center gap-2 bg-[#158B86] hover:bg-[#117672] text-white py-3 rounded-[8px] font-bold transition-all shadow-lg text-[14px]"
            >
              <MessageSquare size={18} />
              Start Chat
            </button>
          </div>
        </div>


        {/* Content Area */}
        <div className="flex-1 flex flex-col">

          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-white/20 flex items-center justify-between bg-black/20">

                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] ${selectedChat.color}`}>
                    {selectedChat.initial}
                  </div>
                  <span className="text-white font-bold text-[16px]">{selectedChat.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setSelectedChat(null)}
                    className="text-red-500 hover:text-red-400 font-bold text-[14px] transition-colors"
                  >
                    End Chat
                  </button>
                  <button className="text-[#158B86] hover:text-[#117672] transition-colors">
                    <RefreshCcw size={20} />
                  </button>
                </div>
              </div>

              {/* Message Area */}
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                {/* Messages would go here */}
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-white/20">

                <div className="bg-[#121212]/50 border border-white/20 rounded-[12px] flex items-center gap-3 px-4 py-2 focus-within:border-[#158B86]/50 transition-all backdrop-blur-md">
                  <button className="text-[#00BFA5] hover:text-[#00BFA5]/80 transition-colors">
                    <Paperclip size={20} />
                  </button>

                  <input 
                    type="text" 
                    placeholder="Type a message..." 
                    className="flex-1 bg-transparent border-none outline-none text-white text-[14px] py-2 placeholder:text-white/20"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && setMessage('')}
                  />
                  <button 
                    className="text-[#00BFA5] hover:text-[#00BFA5]/80 transition-all"
                    onClick={() => setMessage('')}
                  >
                    <Send size={22} className="rotate-[15deg]" />
                  </button>
                </div>
              </div>

            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
              <img src={logoWhite} alt="Neptune" className="h-16 object-contain" />


            </div>

          )}
        </div>
      </div>

      <StartChatModal 
        isOpen={isStartChatOpen} 
        onClose={() => setIsStartChatOpen(false)} 
        onSelectUser={handleSelectUser}
      />
    </div>
  );
};

export default MessengerPage;
