import React, { useState, useEffect, useCallback } from 'react';
import { Home, ChevronRight, Play, X, Eye, ChevronLeft, ChevronRight as ChevronRightIcon, LifeBuoy, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

import RedCrossIcon from '../assets/red-cross-icon.svg';

const BASE = '/mt5-api/api';

const SUPPORT_VIDEO = {
  id: "BLe49KNPiMg",
  titleEN: "How to Manage Support Tickets Effectively",
  titleHI: "सपोर्ट टिकट को प्रभावी ढंग से कैसे प्रबंधित करें",
  descEN: "Creating a Support Ticket Go to the \"Support\" section to view all your tickets. To create a new one, click \"Create Ticket,\" then provide the necessary details like title, description, query type, and select the priority — let's choose \"High\" for this example. Once done, hit \"Save.\" Your ticket is now created, and you can review its details here. You'll receive a response from us shortly regarding your issue.",
  descHI: "सपोर्ट टिकट बनाना: अपने सभी टिकट देखने के लिए \"सपोर्ट\" सेक्शन में जाएं। नया बनाने के लिए, \"क्रिएट टिकट\" पर क्लिक करें, फिर शीर्षक, विवरण, प्रश्न प्रकार जैसे आवश्यक विवरण प्रदान करें, और प्राथमिकता चुनें - आइए इस उदाहरण के लिए \"हाई\" चुनें। एक बार हो जाने के बाद, \"सेव\" पर क्लिक करें। आपका टिकट अब बन गया है, और आप यहां इसके विवरण की समीक्षा कर सकते हैं। आपको अपनी समस्या के संबंध में शीघ्र ही हमसे प्रतिक्रिया प्राप्त होगी।"
};

const TRANSLATIONS = {
  EN: {
    news: 'News', userDashboard: 'User Dashboard', ibDashboard: 'IB Dashboard',
    support: 'SUPPORT', supportBread: 'Support', ticketList: 'Ticket List',
    createTicket: 'Create Ticket', title: 'Title', description: 'Description',
    queryType: 'Query Type', priorityType: 'Priority Type',
    selectQuery: 'Select query type', selectPriority: 'Select priority',
    submit: 'SUBMIT', submitting: 'SUBMITTING TICKET...',
    noRecord: 'No Record Found', noTicketSub: "You haven't created any support tickets yet.",
    ticketNo: 'Ticket No.', name: 'Name', createdAt: 'Created At',
    priority: 'Priority', status: 'Status', action: 'Action', videoTutorial: 'Video Tutorial',
    supportTicket: 'Support Ticket', closeTicket: 'CLOSE TICKET'
  },
  HI: {
    news: 'समाचार', userDashboard: 'यूजर डैशबोर्ड', ibDashboard: 'आईबी डैशबोर्ड',
    support: 'सपोर्ट', supportBread: 'सपोर्ट', ticketList: 'टिकट सूची',
    createTicket: 'टिकट बनाएं', title: 'शीर्षक', description: 'विवरण',
    queryType: 'प्रश्न का प्रकार', priorityType: 'प्राथमिकता',
    selectQuery: 'प्रश्न प्रकार चुनें', selectPriority: 'प्राथमिकता चुनें',
    submit: 'सबमिट करें', submitting: 'सबमिट हो रहा है...',
    noRecord: 'कोई रिकॉर्ड नहीं मिला', noTicketSub: 'आपने अभी तक कोई सपोर्ट टिकट नहीं बनाया है।',
    ticketNo: 'टिकट नं.', name: 'नाम', createdAt: 'बनने की तिथि',
    priority: 'प्राथमिकता', status: 'स्थिति', action: 'एक्शन', videoTutorial: 'वीडियो ट्यूटोरियल',
  },
};

const inputCls = 'w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] px-4 py-3 text-[var(--text-color)] text-[14px] outline-none focus:border-[#158B86] transition-all';
const selectCls = inputCls + ' appearance-none cursor-pointer';

/* ─────────────── CreateTicketModal ─────────────── */
const CreateTicketModal = ({ isOpen, onClose, onSubmitted, language, token, userId }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', queryType: '', priority: '' });
  const [submitting, setSubmitting] = useState(false);
  const [queryTypes, setqueryTypes] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const t = (k) => TRANSLATIONS[language]?.[k] || k;

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  useEffect(() => {
    if (!isOpen) { setTimeout(() => setIsAnimating(false), 300); return; }
    setIsAnimating(true);
    setForm({ title: '', description: '', queryType: '', priority: '' });
    // fetch dropdowns
    Promise.all([
      fetch(`${BASE}/DropDown/Ticket-Query?QueryType=user`, { headers }).then(r => r.ok ? r.json() : null),
      fetch(`${BASE}/DropDown/Priority`, { headers }).then(r => r.ok ? r.json() : null),
    ]).then(([qData, pData]) => {
      if (qData) { const l = qData?.data ?? qData; setQueryTypes(Array.isArray(l) ? l : []); }
      if (pData) { const l = pData?.data ?? pData; setPriorities(Array.isArray(l) ? l : []); }
    }).catch(() => {});
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!form.title || !form.queryType || !form.priority) return;
    setSubmitting(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        ticketQueryId: form.queryType, // The GUID string
        priorityId: Number(form.priority) // The numeric priority ID
      };
      const res = await fetch(`${BASE}/TicketMaster/Generate-Ticket`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });
      if (res.ok || res.status === 200) { onClose(); onSubmitted(); }
    } catch (_) {}
    finally { setSubmitting(false); }
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[10vh] transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-[var(--card-bg)] border border-[var(--border-color)] w-full max-w-[500px] rounded-[12px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 ${isOpen ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-10 scale-95 opacity-0'}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)]">
          <h2 className="text-[17px] font-bold text-[var(--text-color)]">{t('createTicket')}</h2>
          <button onClick={onClose} className="text-[#8e9d9b] hover:text-[var(--text-color)] transition-colors"><X size={20} /></button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-[var(--text-color)] opacity-80">{t('title')}</label>
            <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder={t('title')} className={inputCls} />
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-[var(--text-color)] opacity-80">{t('description')}</label>
            <textarea rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder={t('description')} className={inputCls + ' resize-none'} />
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-[var(--text-color)] opacity-80">{t('queryType')}</label>
            <select value={form.queryType} onChange={e => setForm(f => ({ ...f, queryType: e.target.value }))} className={selectCls}>
              <option value="">{t('selectQuery')}</option>
              {queryTypes.length > 0
                ? queryTypes.map((q, i) => <option key={i} value={q.id ?? q.queryId ?? q.value}>{q.queryName ?? q.name ?? q.label}</option>)
                : [
                    {id: '695fe51a-73f6-11ee-b962-0242ac120002', name: 'Withdrawal'},
                    {id: '695fe628-73f6-11ee-b962-0242ac120002', name: 'Deposit'},
                    {id: '695fe74a-73f6-11ee-b962-0242ac120002', name: 'Account'},
                    {id: '695fe9ca-73f6-11ee-b962-0242ac120002', name: 'Trading'},
                    {id: '695feaec-73f6-11ee-b962-0242ac120002', name: 'Other'}
                  ].map(q => <option key={q.id} value={q.id}>{q.name}</option>)
              }
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-[var(--text-color)] opacity-80">{t('priorityType')}</label>
            <select value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))} className={selectCls}>
              <option value="">{t('selectPriority')}</option>
              {priorities.length > 0
                ? priorities.map((p, i) => <option key={i} value={p.priorityId ?? p.id ?? p.value}>{p.priorityName ?? p.name ?? p.label}</option>)
                : [
                    {id: 1, name: 'LOW'},
                    {id: 2, name: 'MEDIUM'},
                    {id: 3, name: 'HIGH'}
                  ].map(p => <option key={p.id} value={p.id}>{p.name}</option>)
              }
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex justify-center">
          <button onClick={handleSubmit} disabled={submitting || !form.title || !form.queryType || !form.priority}
            className="px-12 py-2.5 bg-[#158B86] hover:bg-[#117672] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-[8px] text-[13px] uppercase tracking-wider transition-all flex items-center gap-2">
            {submitting && (
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            )}
            {submitting ? t('submitting') : t('submit')}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────── VideoTutorialModal ─────────────── */
const VideoTutorialModal = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;
  const title = language === 'EN' ? SUPPORT_VIDEO.titleEN : SUPPORT_VIDEO.titleHI;
  const desc = language === 'EN' ? SUPPORT_VIDEO.descEN : SUPPORT_VIDEO.descHI;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0A1A1D] border border-white/10 rounded-[20px] w-full max-w-[900px] overflow-hidden shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 z-50 text-white/50 hover:text-white transition-colors">
          <X size={24} />
        </button>
        
        <div className="aspect-video w-full bg-black">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${SUPPORT_VIDEO.id}?autoplay=1`}
            title="Video Tutorial"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="p-8 text-center sm:text-left">
          <h3 className="text-[22px] font-extrabold text-white mb-4">{title}</h3>
          <p className="text-[14px] text-white/60 leading-relaxed font-medium">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ─────────────── CloseTicketModal ─────────────── */
const CloseTicketModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#1C1C1C] border border-white/10 rounded-[20px] w-full max-w-[450px] p-10 text-center shadow-2xl animate-scale-in">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full flex items-center justify-center">
            <img src={RedCrossIcon} alt="Alert" className="w-full h-full object-contain" />
          </div>
        </div>
        <h3 className="text-[20px] font-bold text-white mb-10 leading-tight px-6">Are you sure you want to close this ticket?</h3>
        <div className="flex items-center justify-center gap-4">
          <button onClick={onClose}
            className="w-32 py-3 bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-black rounded-[8px] text-[15px] transition-all shadow-lg uppercase tracking-wider">
            NO
          </button>
          <button onClick={onConfirm}
            className="w-32 py-3 bg-[#388E3C] hover:bg-[#2E7D32] text-white font-black rounded-[8px] text-[15px] transition-all shadow-lg uppercase tracking-wider">
            YES
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────── TicketDetailView ─────────────── */
const TicketDetailView = ({ ticketId, onClose, onRefresh, language, token, userId }) => {
  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const t = (k) => TRANSLATIONS[language]?.[k] || k;

  const fetchDetails = useCallback(async () => {
    setLoading(true);
    try {
      const headers = { Accept: 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
      // 1. Fetch Ticket Basic Info
      const res = await fetch(`${BASE}/TicketMaster/GetTicket-ByTicketId?TicketId=${ticketId}`, { headers });
      if (res.ok) {
        const json = await res.json();
        setTicket(json?.data?.[0] ?? json?.data ?? json);
      }
      // 2. Fetch/Init Chat
      const chatRes = await fetch(`${BASE}/TicketMaster/AddOrGet-ChatByTicketId`, {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ TicketId: ticketId })
      });
      if (chatRes.ok) {
        const chatJson = await chatRes.json();
        const data = chatJson?.data ?? chatJson;
        const list = data?.comments ?? data?.list ?? (Array.isArray(data) ? data : []);
        setMessages(Array.isArray(list) ? list : []);
      }
    } catch (_) {}
    finally { setLoading(false); }
  }, [ticketId, token, userId]);

  useEffect(() => { fetchDetails(); }, [fetchDetails]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const res = await fetch(`${BASE}/TicketMaster/AddOrGet-ChatByTicketId`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ TicketId: ticketId, message: newMessage })
      });
      if (res.ok) {
        setNewMessage('');
        fetchDetails(); // Refresh chat
      }
    } catch (_) {}
  };

  const handleConfirmClose = async () => {
    try {
      const res = await fetch(`${BASE}/TicketMaster/Update-Ticket`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ 
          TicketId: ticketId, 
          AdminComments: "Closed by User",
          TicketStatusId: 3,
          UserId: userId
        })
      });
      if (res.ok) {
        setIsCloseModalOpen(false);
        if (onRefresh) await onRefresh();
        // Redirect logic would go here
      }
    } catch (_) {}
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative w-12 h-12 animate-spin"><span className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#158B86]" /></div>
      <span className="text-[#158B86] mt-4 font-medium">Loading Ticket...</span>
    </div>
  );

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header Info */}
      <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[12px] p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-[20px] font-bold text-[var(--text-color)]">Ticket - #{ticket?.ticketNo ?? ticket?.id}</h2>
          <button onClick={() => setIsCloseModalOpen(true)}
            className="px-6 py-2 bg-[#158B86] text-white font-bold rounded-[6px] text-[13px] uppercase hover:bg-[#117672] transition-all">
            {t('closeTicket')}
          </button>
        </div>
        <div className="space-y-2 border-t border-[var(--border-color)] pt-6">
          <h3 className="text-[18px] font-bold text-[#158B86]">{ticket?.title}</h3>
          <p className="text-[14px] text-[var(--text-color)] opacity-70 leading-relaxed">{ticket?.description}</p>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[12px] flex flex-col min-h-[500px] shadow-sm">
        {/* User Header */}
        <div className="px-6 py-4 border-b border-[var(--border-color)] flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#0A3D3B] flex items-center justify-center text-[#158B86] font-bold text-[14px]">
            {ticket?.name?.substring(0, 2).toUpperCase() ?? 'AA'}
          </div>
          <span className="text-[15px] font-bold text-[var(--text-color)]">{ticket?.name ?? 'User'}</span>
        </div>

        {/* Messages area */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto max-h-[450px]">
          {messages.length > 0 ? messages.map((m, i) => {
            const isMe = !m.isAdmin && (m.isClient !== false);
            const senderName = m.userName ?? m.name ?? (isMe ? 'Ashmita Jethava' : 'Admin');
            return (
              <div key={i} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} mb-6`}>
                <div className={`flex justify-between items-center w-full max-w-[85%] mb-2 px-1`}>
                  <span className="text-[12px] font-bold text-[var(--text-color)]">{senderName}</span>
                  <span className="text-[11px] text-[#8e9d9b]">{new Date(m.createdDate ?? m.date).toLocaleString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className={`w-full max-w-[85%] p-4 rounded-[8px] text-[14px] leading-relaxed shadow-md ${isMe ? 'bg-[#0E1B1E] border border-[#158B86]/20 text-[var(--text-color)]' : 'bg-[var(--sub-bg)] text-[var(--text-color)]'}`}>
                  {m.userComments ?? m.message}
                </div>
              </div>
            );
          }) : (
            <div className="text-center py-10 text-[#8e9d9b] text-[14px]">
              <p className="font-bold mb-1">Have any query?</p>
              <p className="opacity-60 text-[12px]">Ask our team</p>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-[var(--border-color)] bg-[var(--sub-bg)] rounded-b-[12px]">
          <div className="relative flex items-center">
            <input 
              type="text" 
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..." 
              className="w-full bg-[var(--bg-color)] border border-[var(--border-color)] rounded-full py-3 px-6 pr-14 text-[14px] text-[var(--text-color)] outline-none focus:border-[#158B86] transition-all"
            />
            <button onClick={handleSendMessage} className="absolute right-4 text-[#158B86] hover:text-[#117672] transition-colors">
              <Send size={20} fill="currentColor" />
            </button>
          </div>
        </div>
      </div>

      <CloseTicketModal 
        isOpen={isCloseModalOpen} 
        onClose={() => setIsCloseModalOpen(false)} 
        onConfirm={handleConfirmClose} 
      />
    </div>
  );
};

/* ─────────────── SupportPage ─────────────── */
const SupportPage = ({ onNavigate, initialTicketId }) => {
  const { language } = useLanguage();
  const { token, userId } = useAuth();
  const [dashboardType, setDashboardType] = useState('User');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_SIZE = 10;
  const t = (k) => TRANSLATIONS[language]?.[k] || k;

  const fetchTickets = useCallback(async (pg = 1) => {
    setLoadingTickets(true);
    try {
      const isIB = dashboardType === 'IB';
      const res = await fetch(
        `${BASE}/TicketMaster/GetTicketList-ByUserId?PageNumber=${pg}&PageSize=${PAGE_SIZE}&isIB=${isIB}`,
        { headers: { Accept: 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) } }
      );
      if (res.ok) {
        const json = await res.json();
        const list = json?.data?.list ?? json?.data ?? json ?? [];
        setTickets(Array.isArray(list) ? list : []);
        const total = json?.data?.totalCount ?? json?.totalCount ?? (Array.isArray(list) ? list.length : 0);
        setTotalPages(Math.max(1, Math.ceil(total / PAGE_SIZE)));
      }
    } catch (_) {}
    finally { setLoadingTickets(false); }
  }, [token, dashboardType]);

  useEffect(() => { setPage(1); fetchTickets(1); }, [fetchTickets]);

  const formatDate = (val) => {
    if (!val) return '-';
    const d = new Date(val);
    return isNaN(d) ? String(val) : d.toLocaleString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const goPage = (pg) => { setPage(pg); fetchTickets(pg); };

  return (
    <div className="flex flex-col w-full animate-fade-in pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)] mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-[22px] font-extrabold text-[var(--text-color)] tracking-tight">{t('support')}</h1>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#AF6C56] animate-pulse" />
            <span className="bg-[#158B86] text-white text-sm font-medium px-2 rounded-sm">{t('news')}</span>
          </div>
        </div>
        <div className="bg-[var(--sub-bg)] p-1.5 rounded-full border border-[var(--border-color)] flex items-center h-[38px]">
          <button onClick={() => setDashboardType('User')} className={`px-4 py-1.5 rounded-full text-[13px] transition-colors ${dashboardType === 'User' ? 'bg-[#158B86] text-white font-semibold' : 'text-[#8e9d9b] hover:text-[var(--text-color)]'}`}>{t('userDashboard')}</button>
          <button onClick={() => setDashboardType('IB')} className={`px-4 py-1.5 rounded-full text-[13px] transition-colors ${dashboardType === 'IB' ? 'bg-[#158B86] text-white font-semibold' : 'text-[#8e9d9b] hover:text-[var(--text-color)]'}`}>{t('ibDashboard')}</button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[15px] mb-7 font-medium">
        <Home size={17} className="text-[#158B86] cursor-pointer hover:opacity-80" strokeWidth={2.5} onClick={() => onNavigate('Dashboard')} />
        <ChevronRight size={15} className="text-gray-500" strokeWidth={2} />
        <span className={`${initialTicketId ? 'text-[#8e9d9b] cursor-pointer hover:text-[#158B86]' : 'text-[var(--text-color)]'}`} onClick={() => onNavigate('More_Support')}>{t('supportBread')}</span>
        {initialTicketId && (
          <>
            <ChevronRight size={15} className="text-gray-500" strokeWidth={2} />
            <span className="text-[var(--text-color)]">{t('supportTicket')}</span>
          </>
        )}
      </div>

      {initialTicketId ? (
        <TicketDetailView 
          ticketId={initialTicketId} 
          onClose={() => onNavigate('More_Support')} 
          onRefresh={() => fetchTickets(page)}
          language={language}
          token={token}
          userId={userId}
        />
      ) : (
        <>
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-[20px] font-bold text-[var(--text-color)]">{t('ticketList')}</h2>
            <div className="flex items-center gap-4">
            <div className="flex items-center">
              <button 
                onClick={() => setIsVideoModalOpen(true)}
                className="bg-[#158B86] hover:bg-[#117672] text-white pl-6 pr-10 py-2.5 rounded-full text-[14px] font-bold transition-all relative z-10 shadow-lg"
              >
                {t('videoTutorial')}
              </button>
              <div 
                onClick={() => setIsVideoModalOpen(true)}
                className="w-[42px] h-[42px] rounded-full bg-[#AF6C56] flex items-center justify-center -ml-8 relative z-20 shadow-xl cursor-pointer hover:bg-[#965a48] transition-all"
              >
                <Play size={16} fill="white" className="text-white ml-0.5" />
              </div>
            </div>
              <button onClick={() => setIsModalOpen(true)}
                className="bg-[#158B86] hover:bg-[#117672] text-white px-5 py-2.5 rounded-[8px] text-[14px] font-bold transition-all shadow-lg">
                {t('createTicket')}
              </button>
            </div>
          </div>

          <div className="w-full h-px bg-[var(--border-color)] mb-8" />

          {/* Ticket Table */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[12px] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[var(--sub-bg)] border-b border-[var(--border-color)]">
                  <tr>
                    {[t('ticketNo'), t('queryType'), t('title'), t('name'), t('createdAt'), t('priority'), t('status'), t('action')].map((h, idx, arr) => (
                      <th key={h} className={`px-6 py-4 text-[13px] font-bold text-[var(--text-color)] tracking-wider whitespace-nowrap ${idx < arr.length - 1 ? 'border-r border-[var(--border-color)]' : ''}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)]">
                  {loadingTickets ? (
                    <tr><td colSpan="8" className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="relative w-10 h-10 animate-spin" style={{ animationDuration: '1s' }}>
                          <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#158B86] opacity-100" />
                          <span className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 rounded-full bg-[#158B86] opacity-70" />
                          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#158B86] opacity-40" />
                        </div>
                        <span className="text-[#158B86] text-[14px] font-medium">Loading...</span>
                      </div>
                    </td></tr>
                  ) : tickets.length > 0 ? tickets.map((tk, i) => {
                    const ticketNo  = tk.ticketNo  ?? tk.TicketNo  ?? tk.id        ?? '-';
                    const queryType = tk.queryTypeName ?? tk.queryType ?? tk.queryName ?? tk.query ?? '-';
                    const title     = tk.title      ?? tk.Title     ?? '-';
                    const name      = tk.name       ?? tk.Name      ?? tk.userName  ?? '-';
                    const createdAt = tk.createdDate ?? tk.createdAt ?? tk.CreatedAt ?? tk.date ?? '-';
                    const priority  = (tk.priority   ?? tk.Priority  ?? '-').toString().toUpperCase();
                    const status    = (tk.status     ?? tk.Status    ?? '-').toString().toUpperCase();
                    return (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-5 text-[14px] font-medium text-[var(--text-color)]">{ticketNo}</td>
                        <td className="px-6 py-5 text-[14px] text-[#158B86] font-medium">{queryType}</td>
                        <td className="px-6 py-5 text-[14px] text-[var(--text-color)]">{title}</td>
                        <td className="px-6 py-5 text-[14px] text-[var(--text-color)]">{name}</td>
                        <td className="px-6 py-5 text-[14px] text-[var(--text-color)] whitespace-nowrap">{formatDate(createdAt)}</td>
                        <td className="px-6 py-5">
                          <span className={`text-[12px] font-bold ${priority === 'HIGH' ? 'text-[#AF6C56]' : priority === 'MEDIUM' ? 'text-yellow-400' : 'text-green-500'}`}>{priority}</span>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${status === 'OPEN' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-400'}`}>{status}</span>
                        </td>
                        <td className="px-6 py-5">
                          <button onClick={() => onNavigate('View_Ticket', { ticketId: tk.id ?? tk.ticketId })}
                            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#158B86] hover:bg-[#158B86] hover:text-white transition-all">
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr><td colSpan="8" className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                          <LifeBuoy size={32} className="text-[#158B86]/40" />
                        </div>
                        <div>
                          <h3 className="text-[var(--text-color)] font-bold text-[16px]">{t('noRecord')}</h3>
                          <p className="text-[var(--text-color)] opacity-40 text-[13px] mt-1">{t('noTicketSub')}</p>
                        </div>
                      </div>
                    </td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {!loadingTickets && tickets.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-t border-[var(--border-color)]">
                <div className="relative">
                  <select className="bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-md px-3 py-1.5 text-[13px] text-[var(--text-color)] outline-none cursor-pointer appearance-none pr-8">
                    <option>10 / Page</option><option>20 / Page</option><option>50 / Page</option>
                  </select>
                  <ChevronRight size={14} className="rotate-90 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-white/40" />
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => goPage(Math.max(1, page - 1))} disabled={page === 1} className="p-2 text-[var(--text-color)] opacity-40 hover:opacity-100 disabled:opacity-20 transition-colors"><ChevronLeft size={18} /></button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(pg => (
                    <button key={pg} onClick={() => goPage(pg)} className={`w-8 h-8 rounded-md text-[13px] font-bold ${pg === page ? 'bg-[#158B86] text-white' : 'hover:bg-white/5 text-[var(--text-color)] opacity-60'}`}>{pg}</button>
                  ))}
                  <button onClick={() => goPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="p-2 text-[var(--text-color)] opacity-40 hover:opacity-100 disabled:opacity-20 transition-colors"><ChevronRight size={18} /></button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      <CreateTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitted={() => { setPage(1); fetchTickets(1); }}
        language={language}
        token={token}
        userId={userId}
      />
      
      <VideoTutorialModal 
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        language={language}
      />
    </div>
  );
};

export default SupportPage;
