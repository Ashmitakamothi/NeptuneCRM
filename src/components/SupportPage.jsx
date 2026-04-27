import React, { useState } from 'react';
import { Home, ChevronRight, Play, Plus, X, Eye, ChevronLeft, ChevronRight as ChevronRightIcon, LifeBuoy } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const TRANSLATIONS = {
  EN: { 
    news: 'News', userDashboard: 'User Dashboard', ibDashboard: 'IB Dashboard',
    support: 'SUPPORT', supportBread: 'Support', ticketList: 'Ticket List',
    createTicket: 'Create Ticket', title: 'Title', description: 'Description',
    queryType: 'Query Type', priorityType: 'Priority Type', selectQuery: 'Select query type',
    selectPriority: 'Select priority', submit: 'SUBMIT', low: 'LOW', medium: 'MEDIUM', high: 'HIGH',
    noTickets: 'No tickets found', id: 'ID', status: 'Status', date: 'Date', actions: 'Actions',
    ticketNo: 'Ticket No.', name: 'Name', createdAt: 'Created At', priority: 'Priority',
    action: 'Action', noRecord: 'No Record Found', noTicketSub: "You haven't created any support tickets yet.",
    videoTutorial: 'Video Tutorial'
  },
  HI: { 
    news: 'समाचार', userDashboard: 'यूजर डैशबोर्ड', ibDashboard: 'आईबी डैशबोर्ड',
    support: 'सपोर्ट', supportBread: 'सपोर्ट', ticketList: 'टिकट सूची',
    createTicket: 'टिकट बनाएं', title: 'शीर्षक', description: 'विवरण',
    queryType: 'प्रश्न का प्रकार', priorityType: 'प्राथमिकता', selectQuery: 'प्रश्न प्रकार चुनें',
    selectPriority: 'प्राथमिकता चुनें', submit: 'सबमिट करें', low: 'कम', medium: 'मध्यम', high: 'उच्च',
    noTickets: 'कोई टिकट नहीं मिला', id: 'आईडी', status: 'स्थिति', date: 'तिथि', actions: 'एक्शन',
    ticketNo: 'टिकट नं.', name: 'नाम', createdAt: 'बनने की तिथि', priority: 'प्राथमिकता',
    action: 'एक्शन', noRecord: 'कोई रिकॉर्ड नहीं मिला', noTicketSub: 'आपने अभी तक कोई सपोर्ट टिकट नहीं बनाया है।',
    videoTutorial: 'वीडियो ट्यूटोरियल'
  },
};

const CreateTicketModal = ({ isOpen, onClose, language }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const t = (key) => TRANSLATIONS[language]?.[key] || key;

  React.useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-start justify-center p-4 transition-all duration-300 pt-[10vh] ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`bg-[var(--card-bg)] border border-[var(--border-color)] w-full max-w-[600px] rounded-[12px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden transition-all duration-300 transform ${isOpen ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-10 scale-95 opacity-0'}`}>
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">
          <h2 className="text-[18px] font-bold text-[var(--text-color)]">{t('createTicket')}</h2>
          <button onClick={onClose} className="text-[#8e9d9b] hover:text-[var(--text-color)] transition-colors">
            <X size={20} />
          </button>
        </div>


        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-[14px] font-medium text-[var(--text-color)] opacity-80">{t('title')}</label>
            <input 
              type="text" 
              placeholder={t('title')} 
              className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] px-4 py-3 text-[var(--text-color)] text-[14px] outline-none focus:border-[#158B86] transition-all"
            />
          </div>


          <div className="space-y-2">
            <label className="text-[14px] font-medium text-[var(--text-color)] opacity-80">{t('description')}</label>
            <textarea 
              rows={4}
              placeholder={t('description')} 
              className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] px-4 py-3 text-[var(--text-color)] text-[14px] outline-none focus:border-[#158B86] transition-all resize-none"
            />
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[14px] font-medium text-[var(--text-color)] opacity-80">{t('queryType')}</label>
              <select className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] px-4 py-3 text-[var(--text-color)] text-[14px] outline-none focus:border-[#158B86] transition-all appearance-none cursor-pointer">
                <option value="">{t('selectQuery')}</option>

                <option value="Record Transaction">Record Transaction</option>
                <option value="Withdrawal">Withdrawal</option>
                <option value="Deposit">Deposit</option>
                <option value="Account">Account</option>
                <option value="Other">Other</option>
                <option value="Trading">Trading</option>
                <option value="IB Commission Role Back">IB Commission Role Back</option>
                <option value="Calculate IB Commission">Calculate IB Commission</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[14px] font-medium text-[var(--text-color)] opacity-80">{t('priorityType')}</label>
              <select className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] px-4 py-3 text-[var(--text-color)] text-[14px] outline-none focus:border-[#158B86] transition-all appearance-none cursor-pointer">
                <option value="">{t('selectPriority')}</option>

                <option value="LOW">{t('low')}</option>
                <option value="MEDIUM">{t('medium')}</option>
                <option value="HIGH">{t('high')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 pt-0 flex justify-end">
          <button 
            onClick={onClose}
            className="px-10 py-3 bg-[#158B86] hover:bg-[#117672] text-white font-bold rounded-[8px] transition-all shadow-lg text-[14px] uppercase tracking-wider"
          >
            {t('submit')}
          </button>
        </div>
      </div>
    </div>
  );
};

const SupportPage = ({ onNavigate }) => {
  const { language } = useLanguage();
  const [dashboardType, setDashboardType] = useState('User');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tickets, setTickets] = useState([]);

  const t = (key) => TRANSLATIONS[language]?.[key] || key;

  return (
    <div className="flex flex-col w-full animate-fade-in pb-20">
      {/* ── Top Header ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)] mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-[22px] font-extrabold text-[var(--text-color)] tracking-tight">{t('support')}</h1>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#AF6C56] animate-pulse" />
            <span className="bg-[#158B86] text-white text-sm font-medium px-2 rounded-sm">{t('news')}</span>
          </div>
        </div>


        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="bg-[var(--sub-bg)] p-1.5 rounded-full border border-[var(--border-color)] flex items-center h-[38px]">
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

      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <div className="flex items-center gap-2 text-[15px] mb-7 font-medium">
        <Home size={17} className="text-[#158B86] cursor-pointer hover:opacity-80 transition-colors" strokeWidth={2.5} onClick={() => onNavigate('Dashboard')} />
        <ChevronRight size={15} className="text-gray-500" strokeWidth={2} />
        <span className="text-[var(--text-color)]">{t('supportBread')}</span>
      </div>

      {/* ── Page Header with Actions ────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-[20px] font-bold text-[var(--text-color)]">{t('ticketList')}</h2>

        
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <button className="bg-[#158B86] hover:bg-[#117672] text-white pl-5 pr-9 py-2 rounded-full text-[14px] font-bold transition-all shadow-lg relative z-10">
            {t('videoTutorial')}
            </button>
            <div className="w-[38px] h-[38px] rounded-full bg-[#AF6C56] flex items-center justify-center -ml-7 relative z-20 shadow-lg cursor-pointer hover:bg-[#965a48] transition-all">
              <Play size={14} fill="white" className="ml-0.5" />
            </div>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#158B86] hover:bg-[#117672] text-white px-5 py-2.5 rounded-[8px] text-[14px] font-bold transition-all shadow-lg"
          >
            {t('createTicket')}
          </button>
        </div>
      </div>

      <div className="w-full h-px bg-[var(--border-color)] mb-8" />

      {/* ── Ticket Table ────────────────────────────────────────── */}
      <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[12px] overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[var(--sub-bg)] border-b border-[var(--border-color)]">
              <tr>
                <th className="px-6 py-4 text-[13px] font-bold text-[var(--text-color)] tracking-wider">{t('ticketNo')}</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[var(--text-color)] tracking-wider">{t('queryType')}</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[var(--text-color)] tracking-wider">{t('title')}</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[var(--text-color)] tracking-wider">{t('name')}</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[var(--text-color)] tracking-wider">{t('createdAt')}</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[var(--text-color)] tracking-wider">{t('priority')}</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[var(--text-color)] tracking-wider">{t('status')}</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[var(--text-color)] tracking-wider">{t('action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">

              {tickets.length > 0 ? (
                tickets.map((ticket, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-5 text-[14px] font-medium text-[var(--text-color)]">{ticket.id}</td>
                    <td className="px-6 py-5 text-[14px] text-[var(--text-color)]">{ticket.type}</td>
                    <td className="px-6 py-5 text-[14px] text-[var(--text-color)]">{ticket.title}</td>
                    <td className="px-6 py-5 text-[14px] text-[var(--text-color)]">{ticket.name}</td>
                    <td className="px-6 py-5 text-[14px] text-[var(--text-color)]">{ticket.date}</td>
                    <td className="px-6 py-5">

                      <span className={`text-[12px] font-bold ${
                        ticket.priority === 'HIGH' ? 'text-[#AF6C56]' : 
                        ticket.priority === 'MEDIUM' ? 'text-yellow-500/80' : 
                        'text-[#158B86]/80'
                      }`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        ticket.status === 'OPEN' ? 'bg-[#158B86]/20 text-[#158B86]' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#158B86] hover:bg-[#158B86] hover:text-white transition-all">
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                         <div className="w-8 h-8 text-[#158B86]/40">
                           <LifeBuoy size={32} />
                         </div>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-[var(--text-color)] font-bold text-[16px]">{t('noRecord')}</h3>
                        <p className="text-[var(--text-color)] opacity-40 text-[13px]">{t('noTicketSub')}</p>
                      </div>

                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ──────────────────────────────────────────── */}
        {tickets.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-t border-[var(--border-color)]">
            <div className="relative">
              <select className="bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-md px-3 py-1.5 text-[13px] text-[var(--text-color)] outline-none cursor-pointer appearance-none pr-8">
                <option>10 / Page</option>

                <option>20 / Page</option>
                <option>50 / Page</option>
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                 <ChevronRightIcon size={14} className="rotate-90" />
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button className="p-2 text-[var(--text-color)] opacity-40 hover:opacity-100 transition-colors"><ChevronLeft size={18} /></button>
              <button className="w-8 h-8 rounded-md bg-[#158B86] text-white text-[13px] font-bold">1</button>
              <button className="w-8 h-8 rounded-md hover:bg-white/5 text-[var(--text-color)] opacity-60 text-[13px] font-bold">2</button>
              <button className="w-8 h-8 rounded-md hover:bg-white/5 text-[var(--text-color)] opacity-60 text-[13px] font-bold">3</button>
              <button className="p-2 text-[var(--text-color)] opacity-40 hover:opacity-100 transition-colors"><ChevronRightIcon size={18} /></button>
            </div>

          </div>
        )}
      </div>

      <CreateTicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default SupportPage;
