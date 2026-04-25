import React, { useState } from 'react';
import AccountsTable from './AccountsTable';
import { Home, ChevronRight, Settings, Moon, Globe } from 'lucide-react';

const AccountsPage = ({ onNavigate }) => {
  const [dashboardType, setDashboardType] = useState('User');
  const [accountType, setAccountType] = useState('Live');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All', 'Pending', 'Approved', 'Declined'

  return (
    <div className="animate-fade-in flex flex-col h-full">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <h1 className="text-[20px] md:text-[24px] font-extrabold text-white tracking-tight leading-none uppercase">ACCOUNTS</h1>
          <span className="bg-[#158B86] text-white text-[10px] md:text-[12px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">News</span>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
           <div className="bg-[#122D32] p-1.5 rounded-full flex items-center h-[40px]">
              <button 
                onClick={() => setDashboardType('User')}
                className={`px-4 sm:px-5 py-1.5 rounded-full text-[13px] sm:text-[14px] transition-colors ${dashboardType === 'User' ? 'font-semibold bg-[#158B86] text-white shadow-sm' : 'font-medium text-[#8e9d9b] hover:text-white'}`}
              >User Dashboard</button>
              <button 
                onClick={() => setDashboardType('IB')}
                className={`px-4 sm:px-5 py-1.5 rounded-full text-[13px] sm:text-[14px] transition-colors ${dashboardType === 'IB' ? 'font-semibold bg-[#158B86] text-white shadow-sm' : 'font-medium text-[#8e9d9b] hover:text-white'}`}
              >IB Dashboard</button>
           </div>
           
           <button className="text-[#8e9d9b] hover:text-white transition-colors">
              <Moon size={20} strokeWidth={2} />
           </button>
           <button className="flex items-center gap-1 text-[#8e9d9b] hover:text-white transition-colors text-[14px] font-medium">
              <Globe size={18} strokeWidth={2} /> EN
           </button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[14px] font-semibold mt-4 mb-8">
         <Home size={16} className="text-[#158B86] cursor-pointer" onClick={() => onNavigate('Dashboard')} />
         <ChevronRight size={14} className="text-[#8e9d9b]" />
         <span className="text-white">Accounts</span>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
         
         {/* Tab Controls Row */}
         <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 mb-6">
            {/* Left: Live / Demo */}
            <div className="bg-[#1A1A1A] p-1.5 rounded-[10px] flex items-center w-full xl:w-auto overflow-x-auto hide-scrollbar">
               <button 
                 onClick={() => setAccountType('Live')}
                 className={`whitespace-nowrap px-6 py-2 rounded-[8px] text-[14px] font-bold transition-all flex-shrink-0 ${accountType === 'Live' ? 'bg-[#158B86] text-white shadow-[0_2px_8px_rgba(21,139,134,0.3)]' : 'bg-transparent text-white hover:text-white/80'}`}
               >Live Account</button>
               <button 
                 onClick={() => setAccountType('Demo')}
                 className={`whitespace-nowrap px-6 py-2 rounded-[8px] text-[14px] font-bold transition-all flex-shrink-0 ${accountType === 'Demo' ? 'bg-[#158B86] text-white shadow-[0_2px_8px_rgba(21,139,134,0.3)]' : 'bg-transparent text-white hover:text-white/80'}`}
               >Demo Account</button>
            </div>

            {/* Right: Status Filters & Action Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full xl:w-auto">
               <div className="bg-[#1A1A1A] p-1.5 rounded-[10px] flex items-center gap-1 overflow-x-auto w-full sm:w-auto hide-scrollbar">
                 {['Pending', 'Approved', 'Declined'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(statusFilter === status ? 'All' : status)}
                      className={`whitespace-nowrap flex-shrink-0 px-5 py-2 rounded-[8px] text-[13px] font-bold transition-all ${
                         statusFilter === status 
                         ? 'bg-[#158B86] text-white shadow-[0_2px_8px_rgba(21,139,134,0.3)]' 
                         : 'bg-transparent text-white hover:text-white/80'
                      }`}
                    >
                      {status}
                    </button>
                 ))}
               </div>
               
               <button className="bg-[#158B86] hover:bg-[#117672] text-white px-6 py-2.5 rounded-[8px] text-[14px] font-bold shadow-[0_4px_10px_rgba(21,139,134,0.3)] transition-all whitespace-nowrap w-full sm:w-auto">
                  Open Live Account
               </button>
            </div>
         </div>

         {/* Table Container */}
         <div className="flex-1 min-h-0">
            {/* Reusing the exact AccountsTable but passing hideHeader and our new state controls */}
            <AccountsTable 
               hideHeader={true} 
               externalAccountType={accountType} 
               statusFilter={statusFilter} 
            />
         </div>
      </div>
    </div>
  );
};

export default AccountsPage;
