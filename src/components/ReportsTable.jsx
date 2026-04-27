import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const TRANSLATIONS = {
  EN: {
    operation: "Operation",
    paymentFrom: "Payment From",
    paymentTo: "Payment To",
    amount: "Amount",
    currency: "Currency",
    transactionDate: "Transaction Date",
    status: "Status",
    remark: "Remark",
    noRecord: "No Record Found",
    success: "SUCCESS",
    fail: "FAIL",
    pending: "PENDING",
  },
  HI: {
    operation: "ऑपरेशन",
    paymentFrom: "भुगतान से",
    paymentTo: "भुगतान प्राप्तकर्ता",
    amount: "राशि",
    currency: "मुद्रा",
    transactionDate: "लेन-देन की तिथि",
    status: "स्थिति",
    remark: "रिमार्क",
    noRecord: "कोई रिकॉर्ड नहीं मिला",
    success: "सफल",
    fail: "असफल",
    pending: "लंबित",
  }
};

const ReportsTable = ({ type, dateRange = null, exportTrigger = 0 }) => {
  const { language } = useLanguage();
  const t = (key) => TRANSLATIONS[language]?.[key] || key;
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isRowsDropdownOpen, setIsRowsDropdownOpen] = useState(false);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [type, dateRange]);

  // Empty data for now. Will be populated by API later.
  const mockData = [];

  const filteredData = mockData.filter(item => {
    // 1. Date Filter
    if (dateRange && dateRange[0] && dateRange[1]) {
      const [datePart, timePart, ampm] = item.transactionDate.split(' ');
      const [day, month, year] = datePart.split('-');
      let [hours, minutes] = timePart.split(':');
      hours = parseInt(hours);
      if (ampm === 'PM' && hours < 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;
      
      const itemDate = new Date(year, month - 1, day, hours, minutes);
      const start = dateRange[0].toDate();
      start.setHours(0, 0, 0, 0);
      const end = dateRange[1].toDate();
      end.setHours(23, 59, 59, 999);
      
      if (itemDate < start || itemDate > end) {
        return false;
      }
    }
    
    return true;
  });

  useEffect(() => {
    if (exportTrigger > 0 && filteredData.length > 0) {
      const headers = ['Operation', 'Payment From', 'Payment To', 'Amount', 'Currency', 'Transaction Date', 'Status'];
      const csvRows = [headers.join(',')];
      
      filteredData.forEach(row => {
        const values = [
          row.operation,
          row.paymentFrom,
          row.paymentTo,
          row.amount.replace(',', ''),
          row.currency,
          row.transactionDate,
          row.status
        ];
        csvRows.push(values.map(v => `"${v}"`).join(','));
      });
      
      const csvContent = "data:text/csv;charset=utf-8," + csvRows.join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `${type.toLowerCase()}_report.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [exportTrigger, filteredData, type]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

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
              : 'text-[var(--text-color)] hover:bg-[var(--sub-bg)]'
          }`}

        >
          {i}
        </button>
      );
    }
    return pages;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'SUCCESS':
        return 'text-[#10B981] bg-[#06331e] px-3 py-1 rounded-full';
      case 'FAIL':
      case 'REJECTED':
        return 'text-[#EF4444] bg-[#3a1010] px-3 py-1 rounded-full';
      case 'PENDING':
        return 'text-[#F59E0B] bg-[#3e2709] px-3 py-1 rounded-full';
      default:
        return 'text-[var(--text-color)] bg-white/10 px-3 py-1 rounded-full';
    }
  };

  return (
    <div className="rounded-[16px] border border-[var(--border-color)] overflow-hidden flex flex-col h-full min-h-[325px] bg-transparent">
      <div className="flex-1 overflow-x-auto min-h-0">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="bg-[var(--sub-bg)] border-b border-[var(--border-color)]">
              <th className="py-3 px-2 md:px-4 text-left text-[13px] md:text-[14px] font-bold text-[var(--text-color)]">{t('operation')}</th>
              <th className="py-3 px-2 md:px-4 text-left text-[13px] md:text-[14px] font-bold text-[var(--text-color)] border-l border-[var(--border-color)]">{t('paymentFrom')}</th>
              <th className="py-3 px-2 md:px-4 text-left text-[13px] md:text-[14px] font-bold text-[var(--text-color)] border-l border-[var(--border-color)]">{t('paymentTo')}</th>
              <th className="py-3 px-2 md:px-4 text-left text-[13px] md:text-[14px] font-bold text-[var(--text-color)] border-l border-[var(--border-color)]">{t('amount')}</th>
              <th className="py-3 px-2 md:px-4 text-left text-[13px] md:text-[14px] font-bold text-[var(--text-color)] border-l border-[var(--border-color)]">{t('currency')}</th>
              <th className="py-3 px-2 md:px-4 text-left text-[13px] md:text-[14px] font-bold text-[var(--text-color)] border-l border-[var(--border-color)]">{t('transactionDate')}</th>
              <th className="py-3 px-2 md:px-4 text-left text-[13px] md:text-[14px] font-bold text-[var(--text-color)] border-l border-[var(--border-color)]">{t('status')}</th>
              <th className="py-3 px-2 md:px-4 text-left text-[13px] md:text-[14px] font-bold text-[var(--text-color)] border-l border-[var(--border-color)]">{t('remark')}</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <tr key={row.id} className="border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--sub-bg)] transition-colors">
                  <td className="py-3.5 px-2 md:px-4 text-[13px] md:text-[14px] font-medium text-[var(--text-color)]">
                    {row.operation}
                  </td>
                  <td className="py-3.5 px-2 md:px-4 text-[13px] md:text-[14px] font-medium text-[var(--text-color)]">
                    {row.paymentFrom}
                  </td>
                  <td className="py-3.5 px-2 md:px-4 text-[13px] md:text-[14px] font-medium text-[var(--text-color)]">
                    {row.paymentTo}
                  </td>
                  <td className="py-3.5 px-2 md:px-4 text-[13px] md:text-[14px] font-medium text-[var(--text-color)]">
                    {row.amount}
                  </td>
                  <td className="py-3.5 px-2 md:px-4 text-[13px] md:text-[14px] font-medium text-[var(--text-color)]">
                    {row.currency}
                  </td>
                  <td className="py-3.5 px-2 md:px-4 text-[13px] md:text-[14px] font-medium text-[var(--text-color)]">
                    {row.transactionDate}
                  </td>

                  <td className="py-3.5 px-2 md:px-4 text-[13px] md:text-[14px]">
                    <span className={`${getStatusColor(row.status)} text-[11px] font-semibold inline-block`}>
                      {language === 'HI' ? t(row.status.toLowerCase()) : row.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-2 md:px-4 text-[13px] md:text-[14px] font-medium text-[#158B86]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer text-[#00BFA5] hover:text-white transition-colors">
                      <path d="M4 14c4.5-6.5 11.5-6.5 16 0" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-[60px] text-center">
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
            className="flex items-center justify-between w-[120px] px-3 py-1.5 bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[6px] text-[var(--text-color)] text-[13px] font-medium hover:opacity-80 transition-colors"
            onClick={() => setIsRowsDropdownOpen(!isRowsDropdownOpen)}
          >
            <span>{itemsPerPage} / Page</span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>
          
          {isRowsDropdownOpen && (
            <div className="absolute bottom-[calc(100%+4px)] left-0 w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[6px] overflow-hidden z-10 shadow-xl">
              {[5, 10, 20, 50].map((num) => (
                <button
                  key={num}
                  className={`w-full px-3 py-2 text-left text-[13px] transition-colors ${
                    itemsPerPage === num 
                      ? 'bg-[#158B86] text-white' 
                      : 'text-[var(--text-color)] opacity-80 hover:bg-[var(--sub-bg)] hover:opacity-100'
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
                ? 'text-gray-500 cursor-not-allowed opacity-50' 
                : 'text-[var(--text-color)] hover:bg-[var(--sub-bg)] cursor-pointer'
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
                ? 'text-gray-500 cursor-not-allowed opacity-50' 
                : 'text-[var(--text-color)] hover:bg-[var(--sub-bg)] cursor-pointer'
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

export default ReportsTable;
