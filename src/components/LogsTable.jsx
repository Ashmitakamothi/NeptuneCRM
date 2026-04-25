import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

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

const LogsTable = ({ language = 'EN' }) => {
  const t = (key) => TRANSLATIONS[language]?.[key] || key;
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isRowsDropdownOpen, setIsRowsDropdownOpen] = useState(false);

  // Empty data for now. Will be populated by API later.
  const mockData = [];

  const totalPages = Math.max(1, Math.ceil(mockData.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = mockData.slice(startIndex, startIndex + itemsPerPage);

  const renderPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button 
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`w-8 h-8 flex items-center justify-center rounded-[6px] font-medium text-[13px] transition-colors ${
            currentPage === i 
              ? 'bg-[#158B86] text-white' 
              : 'text-white hover:bg-white/5'
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="rounded-[16px] border border-white/10 overflow-hidden flex flex-col h-full min-h-[325px] bg-transparent">
      <div className="flex-1 overflow-x-auto min-h-0">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="bg-[#1A1A1A] border-b border-white/10">
              <th className="py-3 px-2 md:px-4 text-left text-[13px] md:text-[14px] font-bold text-white w-3/4">{t('message')}</th>
              <th className="py-3 px-2 md:px-4 text-left text-[13px] md:text-[14px] font-bold text-white border-l border-white/10 w-1/4">{t('updateDate')}</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <tr key={row.id} className="border-b border-white/5 last:border-0 hover:bg-[#1A1A1A] transition-colors">
                  <td className="py-3.5 px-2 md:px-4 text-[13px] md:text-[14px] font-medium text-white">
                    {row.message}
                  </td>
                  <td className="py-3.5 px-2 md:px-4 text-[13px] md:text-[14px] font-medium text-white">
                    {row.updateDate}
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

      <div className="px-4 py-3 flex items-center justify-between border-t border-white/10 shrink-0 flex-wrap gap-4">
        <div className="relative">
          <button 
            className="flex items-center justify-between w-[120px] px-3 py-1.5 bg-[#1A1A1A] border border-white/10 rounded-[6px] text-white text-[13px] font-medium hover:border-white/30 transition-colors"
            onClick={() => setIsRowsDropdownOpen(!isRowsDropdownOpen)}
          >
            <span>{itemsPerPage} / Page</span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>
          
          {isRowsDropdownOpen && (
            <div className="absolute bottom-[calc(100%+4px)] left-0 w-full bg-[#1E1E1E] border border-white/10 rounded-[6px] overflow-hidden z-10 shadow-xl">
              {[5, 10, 20, 50].map((num) => (
                <button
                  key={num}
                  className={`w-full px-3 py-2 text-left text-[13px] transition-colors ${
                    itemsPerPage === num 
                      ? 'bg-[#158B86] text-white' 
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
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
                : 'text-white hover:bg-white/5 cursor-pointer'
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
                : 'text-white hover:bg-white/5 cursor-pointer'
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
