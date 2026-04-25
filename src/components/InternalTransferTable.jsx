import React, { useState, useEffect } from 'react';
import { Tooltip } from 'antd';

const TRANSLATIONS = {
  EN: {
    from: "From",
    to: "To",
    amount: "Amount",
    requestDate: "Request Date",
    actionDate: "Action Date",
    status: "Status",
    remark: "Remark",
    noRecord: "No Record Found",
    approved: "Approved",
    pending: "Pending",
    rejected: "Rejected",
    wallet: "Wallet"
  },
  HI: {
    from: "से",
    to: "को",
    amount: "राशि",
    requestDate: "अनुरोध तिथि",
    actionDate: "कार्रवाई तिथि",
    status: "स्थिति",
    remark: "रिमार्क",
    noRecord: "कोई रिकॉर्ड नहीं मिला",
    approved: "स्वीकृत",
    pending: "लंबित",
    rejected: "अस्वीकृत",
    wallet: "वॉलेट"
  }
};

const InternalTransferTable = ({ statusFilter = 'All', language = 'EN', searchQuery = '', dateRange = null }) => {
  const t = (key) => TRANSLATIONS[language]?.[key] || key;
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isRowsDropdownOpen, setIsRowsDropdownOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, searchQuery, dateRange, sortConfig]);

  // Mock data matching the screenshot
  /*
  const mockData = [
    { id: 1, from: 'Wallet', to: '555006', amount: 10, requestDate: '16-04-2026 05:11 PM', actionDate: '--', status: 'Approved' },
    { id: 2, from: 'Wallet', to: '555006', amount: 10, requestDate: '08-04-2026 06:30 PM', actionDate: '08-04-2026 06:31 PM', status: 'Approved' },
    { id: 3, from: 'Wallet', to: '555006', amount: 50, requestDate: '08-04-2026 06:29 PM', actionDate: '08-04-2026 06:30 PM', status: 'Approved' },
    { id: 4, from: 'Wallet', to: '555006', amount: 10, requestDate: '08-04-2026 06:23 PM', actionDate: '08-04-2026 06:29 PM', status: 'Approved' },
    { id: 5, from: 'Wallet', to: '555006', amount: 10, requestDate: '08-04-2026 06:05 PM', actionDate: '08-04-2026 06:22 PM', status: 'Approved' },
    { id: 6, from: 'Wallet', to: '555006', amount: 10, requestDate: '08-04-2026 06:01 PM', actionDate: '08-04-2026 06:04 PM', status: 'Approved' },
    { id: 7, from: 'Wallet', to: '555006', amount: 10, requestDate: '08-04-2026 05:54 PM', actionDate: '08-04-2026 06:01 PM', status: 'Approved' },
    { id: 8, from: 'Wallet', to: '555006', amount: 10, requestDate: '08-04-2026 05:52 PM', actionDate: '08-04-2026 05:54 PM', status: 'Approved' },
    { id: 9, from: 'Wallet', to: '555006', amount: 100, requestDate: '08-04-2026 05:47 PM', actionDate: '08-04-2026 05:51 PM', status: 'Approved' },
    { id: 10, from: 'Wallet', to: '555115', amount: 500, requestDate: '17-03-2026 05:21 PM', actionDate: '--', status: 'Approved' },
    { id: 11, from: 'Wallet', to: '555006', amount: 20, requestDate: '16-03-2026 01:10 PM', actionDate: '--', status: 'Pending' },
    { id: 12, from: 'Wallet', to: '555166', amount: 35, requestDate: '15-03-2026 04:05 PM', actionDate: '15-03-2026 04:10 PM', status: 'Rejected' },
    { id: 13, from: 'Wallet', to: '555006', amount: 15, requestDate: '10-03-2026 02:00 PM', actionDate: '--', status: 'Pending' }
  ];
  */
  const mockData = [];

  const filteredData = mockData.filter(item => {
    // 1. Status Filter
    if (statusFilter && statusFilter !== 'All') {
      if (item.status.toUpperCase() !== statusFilter.toUpperCase()) return false;
    }
    
    // 2. Search Query (Matches From or To account or Amount)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!item.from.toLowerCase().includes(q) && 
          !item.to.toLowerCase().includes(q) && 
          !item.amount.toString().includes(q)) {
        return false;
      }
    }
    
    // 3. Date Range Filter
    if (dateRange && dateRange[0] && dateRange[1]) {
      // Parse requestDate "DD-MM-YYYY hh:mm A"
      const [datePart] = item.requestDate.split(' ');
      const [day, month, year] = datePart.split('-');
      // Convert to format comparable by dayjs or native Date
      const itemDate = new Date(year, month - 1, day);
      const startDate = dateRange[0].toDate();
      const endDate = dateRange[1].toDate();
      
      // Strip time from dates for comparison
      startDate.setHours(0,0,0,0);
      endDate.setHours(23,59,59,999);
      
      if (itemDate < startDate || itemDate > endDate) {
        return false;
      }
    }

    return true;
  });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];
    
    // Custom parsing for dates
    if (sortConfig.key === 'requestDate' || sortConfig.key === 'actionDate') {
      const parseDate = (dateStr) => {
        if (!dateStr || dateStr === '--') return 0;
        const [datePart, timePart, ampm] = dateStr.split(' ');
        const [day, month, year] = datePart.split('-');
        let [hours, minutes] = timePart.split(':');
        hours = parseInt(hours);
        if (ampm === 'PM' && hours < 12) hours += 12;
        if (ampm === 'AM' && hours === 12) hours = 0;
        return new Date(year, month - 1, day, hours, minutes).getTime();
      };
      aVal = parseDate(aVal);
      bVal = parseDate(bVal);
    }
    
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sortedData.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

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

  const renderSortIcon = (key) => {
    const isActive = sortConfig.key === key;
    return (
      <div className="flex flex-col ml-2 gap-[1px]">
        <svg width="10" height="10" viewBox="0 0 24 24" className={`transition-opacity ${isActive && sortConfig.direction === 'asc' ? 'opacity-100 fill-[#158B86]' : 'opacity-40 fill-white'}`}>
          <polygon points="12,6 4,16 20,16" />
        </svg>
        <svg width="10" height="10" viewBox="0 0 24 24" className={`transition-opacity ${isActive && sortConfig.direction === 'desc' ? 'opacity-100 fill-[#158B86]' : 'opacity-40 fill-white'}`}>
          <polygon points="12,18 4,8 20,8" />
        </svg>
      </div>
    );
  };

  const getSortTooltip = (key) => {
    if (sortConfig.key === key && sortConfig.direction === 'asc') return "Click to sort descending";
    return "Click to sort ascending";
  };

  return (
    <div className="rounded-[16px] border border-white/10 overflow-hidden flex flex-col h-full min-h-[325px] bg-transparent">
      <div className="flex-1 overflow-x-auto min-h-0">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="bg-[#1A1A1A] border-b border-white/10">
              <th className="py-3 px-2 md:px-4 text-left text-[13px] md:text-[14px] font-bold text-white">{t('from')}</th>
              <th className="py-3 px-2 md:px-4 text-left text-[13px] md:text-[14px] font-bold text-white border-l border-white/10">{t('to')}</th>
              <th className="py-3 px-2 md:px-4 text-left text-[13px] md:text-[14px] font-bold text-white border-l border-white/10">{t('amount')}</th>
              <th className="p-0 text-left text-[13px] md:text-[14px] font-bold text-white border-l border-white/10 cursor-pointer hover:bg-white/5 transition-colors" onClick={() => handleSort('requestDate')}>
                <Tooltip title={getSortTooltip('requestDate')} placement="top" color="#404040" overlayInnerStyle={{ borderRadius: '6px', padding: '4px 12px', fontSize: '13px' }} mouseEnterDelay={0.3}>
                  <div className="flex items-center justify-between w-full h-full py-3 px-2 md:px-4">
                    <span>{t('requestDate')}</span>
                    {renderSortIcon('requestDate')}
                  </div>
                </Tooltip>
              </th>
              <th className="p-0 text-left text-[13px] md:text-[14px] font-bold text-white border-l border-white/10 cursor-pointer hover:bg-white/5 transition-colors" onClick={() => handleSort('actionDate')}>
                <Tooltip title={getSortTooltip('actionDate')} placement="top" color="#404040" overlayInnerStyle={{ borderRadius: '6px', padding: '4px 12px', fontSize: '13px' }} mouseEnterDelay={0.3}>
                  <div className="flex items-center justify-between w-full h-full py-3 px-2 md:px-4">
                    <span>{t('actionDate')}</span>
                    {renderSortIcon('actionDate')}
                  </div>
                </Tooltip>
              </th>
              <th className="py-3 px-2 md:px-4 text-left text-[13px] md:text-[14px] font-bold text-white border-l border-white/10">{t('status')}</th>
              <th className="py-3 px-2 md:px-4 text-left text-[13px] md:text-[14px] font-bold text-white border-l border-white/10">{t('remark')}</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <tr key={row.id} className="border-b border-white/5 last:border-0 hover:bg-[#1A1A1A] transition-colors">
                  <td className="py-3.5 px-2 md:px-4 text-[13px] md:text-[14px] font-medium text-white">
                    {language === 'HI' && row.from === 'Wallet' ? t('wallet') : row.from}
                  </td>
                  <td className="py-3.5 px-2 md:px-4 text-[13px] md:text-[14px] font-medium text-white">
                    {row.to}
                  </td>
                  <td className="py-3.5 px-2 md:px-4 text-[13px] md:text-[14px] font-medium text-white">
                    $ {row.amount}
                  </td>
                  <td className="py-3.5 px-2 md:px-4 text-[13px] md:text-[14px] font-medium text-white">
                    {row.requestDate}
                  </td>
                  <td className="py-3.5 px-2 md:px-4 text-[13px] md:text-[14px] font-medium text-white">
                    {row.actionDate}
                  </td>
                  <td className="py-3.5 px-2 md:px-4 text-[13px] md:text-[14px]">
                    <span className="text-white opacity-80">{language === 'HI' ? t(row.status.toLowerCase()) : row.status}</span>
                  </td>
                  <td className="py-3.5 px-2 md:px-4 text-[13px] md:text-[14px] font-medium text-[#158B86]">
                    <svg width="22" height="22" viewBox="0 0 24 25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer text-[#00BFA5] hover:text-white transition-colors" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 12.5s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12.5" r="3" />
                    </svg>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-[60px] text-center">
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
      
      {/* Pagination Bar */}
      <div className="bg-[#1A1A1A] p-3 flex flex-col sm:flex-row items-center justify-between border-t border-white/10 gap-4 sm:gap-0">
        <div className="relative">
          <div 
            className="bg-[#06120f] border border-white/10 rounded-[6px] px-3 py-1.5 flex items-center justify-between min-w-[100px] cursor-pointer hover:border-white/20 transition-colors"
            onClick={() => setIsRowsDropdownOpen(!isRowsDropdownOpen)}
          >
            <span className="text-white text-[13px] font-medium">{itemsPerPage} / Page</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-[#8e9d9b] transition-transform ${isRowsDropdownOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
          </div>
          
          {isRowsDropdownOpen && (
            <div className="absolute bottom-full left-0 mb-1 w-full bg-[#06120f] border border-white/10 rounded-[6px] overflow-hidden z-10 shadow-xl">
              {[5, 10, 20, 50].map((num) => (
                <div 
                  key={num}
                  className={`px-3 py-2 text-[13px] cursor-pointer hover:bg-white/5 transition-colors ${itemsPerPage === num ? 'text-[#158B86] font-medium' : 'text-white'}`}
                  onClick={() => {
                    setItemsPerPage(num);
                    setCurrentPage(1);
                    setIsRowsDropdownOpen(false);
                  }}
                >
                  {num} / Page
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`w-8 h-8 flex items-center justify-center rounded-[6px] transition-colors ${currentPage === 1 ? 'text-white/30 cursor-not-allowed' : 'text-white hover:bg-white/5'}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          
          {renderPageNumbers()}
          
          <button 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className={`w-8 h-8 flex items-center justify-center rounded-[6px] transition-colors ${currentPage === totalPages ? 'text-white/30 cursor-not-allowed' : 'text-white hover:bg-white/5'}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InternalTransferTable;
