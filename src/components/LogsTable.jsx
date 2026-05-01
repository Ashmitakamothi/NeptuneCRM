import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const BASE = 'https://mt5.neptunefxcrm.com/api';

const TRANSLATIONS = {
  EN: {
    message: "Message",
    updateDate: "Update Date",
    noRecord: "No Record Found",
  },
  HI: {
    message: "संदेश",
    updateDate: "अद्यतन तिथि",
    noRecord: "कोई रिकॉर्ड नहीं मिला",
  }
};

const LogsTable = () => {
  const { language } = useLanguage();
  const { token, userId } = useAuth();
  const t = (key) => TRANSLATIONS[language]?.[key] || key;
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isRowsDropdownOpen, setIsRowsDropdownOpen] = useState(false);
  const [logsData, setLogsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);

  const formatDate = (dateStr) => {
    if (!dateStr || dateStr === '-') return '-';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      
      let hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const strTime = String(hours).padStart(2, '0') + ':' + minutes + ' ' + ampm;
      
      return `${day}-${month}-${year}, ${strTime}`;
    } catch (_) {
      return dateStr;
    }
  };

  const fetchLogs = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const url = `${BASE}/Admin/AuditLog-ByUserId/${userId}?PageNumber=${currentPage}&PageSize=${itemsPerPage}`;
      
      const res = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });

      if (res.ok) {
        const json = await res.json();
        setLogsData(json.data || []);
        setTotalRecords(json.totalRecords || 0);
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [currentPage, itemsPerPage, token, userId]);

  const totalPages = Math.max(1, Math.ceil(totalRecords / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = logsData; // API handles pagination

  const renderPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button 
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`w-8 h-8 flex items-center justify-center rounded-[6px] font-bold text-[13px] transition-all ${
            currentPage === i 
              ? 'bg-[#3B82F6] text-white shadow-lg shadow-blue-500/20' 
              : 'text-[var(--text-color)] opacity-40 hover:opacity-100 hover:bg-[var(--hover-bg)]'
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="rounded-[16px] border border-[var(--border-color)] overflow-hidden flex flex-col h-full min-h-[325px] bg-transparent">
      <div className="flex-1 overflow-x-auto min-h-0">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="bg-[var(--segmented-bg)] border-b border-[var(--border-color)]">
              <th className="py-4 px-4 text-left text-[14px] font-bold text-[var(--text-color)] min-w-[200px]">{t('message')}</th>
              <th className="py-4 px-4 text-left text-[14px] font-bold text-[var(--text-color)] border-l border-[var(--border-color)] min-w-[150px]">{t('updateDate')}</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr><td colSpan="2" className="py-20 text-center text-[#8e9d9b]">Loading logs...</td></tr>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => (
                <tr key={row.id || idx} className="border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--hover-bg)] transition-colors">
                  <td className="py-4 px-4 text-[14px] font-medium text-[var(--text-color)] opacity-90 whitespace-normal">
                    {row.message || row.Message || '-'}
                  </td>
                  <td className="py-4 px-4 text-[14px] font-medium text-[var(--text-color)] opacity-60">
                    {formatDate(row.updateDate || row.UpdateDate || row.createdDate || row.date || row.dateTime)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="py-[60px] text-center">
                   <div className="flex flex-col items-center justify-center text-[#8e9d9b]">
                     <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-3 opacity-60">
                       <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                       <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                     </svg>
                     <span className="text-[14px] font-medium">{t('noRecord')}</span>
                   </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 flex items-center justify-between border-t border-[var(--border-color)] shrink-0 flex-wrap gap-4">
        <div className="relative">
          <button 
            className="flex items-center justify-between w-[120px] px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[6px] text-[var(--text-color)] text-[13px] font-medium hover:opacity-80 transition-colors"
            onClick={() => setIsRowsDropdownOpen(!isRowsDropdownOpen)}
          >
            <span>{itemsPerPage} / Page</span>
            <ChevronDown size={14} className="opacity-60" />
          </button>
          
          {isRowsDropdownOpen && (
            <div className="absolute bottom-[calc(100%+4px)] left-0 w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[6px] overflow-hidden z-10 shadow-xl">
              {[5, 10, 20, 50].map((num) => (
                <button
                  key={num}
                  className={`w-full px-3 py-2 text-left text-[13px] transition-colors ${
                    itemsPerPage === num 
                      ? 'bg-[#158B86] text-white' 
                      : 'text-[var(--text-color)] hover:bg-[var(--hover-bg)]'
                  }`}

                  onClick={() => {
                    setItemsPerPage(num);
                    setCurrentPage(1);
                    setIsRowsDropdownOpen(false);
                  }}
                >
                  {num} / Page
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button 
            className={`w-8 h-8 flex items-center justify-center rounded-[6px] transition-colors ${
              currentPage === 1 
                ? 'text-gray-500 cursor-not-allowed' 
                : 'text-[var(--text-color)] hover:bg-[var(--hover-bg)] cursor-pointer'
            }`}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </button>

          {renderPageNumbers()}

          <button 
            className={`w-8 h-8 flex items-center justify-center rounded-[6px] transition-colors ${
              currentPage === totalPages || totalPages === 0
                ? 'text-gray-500 cursor-not-allowed' 
                : 'text-[var(--text-color)] hover:bg-[var(--hover-bg)] cursor-pointer'
            }`}

            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogsTable;
