import React from 'react';
import { Breadcrumb, Segmented, Button } from 'antd';
import { Home, ChevronRight, Copy, Sun, Globe } from 'lucide-react';

const DashboardHeader = ({ title, breadcrumbs, activeTab = 'User Dashboard', onNavigate, extra, showMobileBack, mobileBackTo }) => {
  return (
    <div className="mb-6">
      {showMobileBack && (
        <div className="flex lg:hidden items-center gap-3 py-4 border-b border-[var(--border-color)] mb-6 -mx-4 px-4 bg-[var(--bg-color)] sticky top-0 z-[100]">
          <button onClick={() => onNavigate(mobileBackTo || 'Dashboard')} className="p-1 -ml-1 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <h1 className="text-[20px] font-bold text-[#3B82F6]">{title}</h1>
        </div>
      )}

      {/* Main Header Row */}
      <div className={`${showMobileBack ? 'hidden lg:flex' : 'flex'} flex-wrap items-center justify-between gap-4 py-4 border-b border-[var(--border-color)] mb-4`}>
        <div className="flex items-center gap-4">
          <h1 className="text-[20px] font-bold uppercase tracking-tight">{title}</h1>
          <div className="flex items-center gap-2 px-3 py-1 bg-[#158B86] text-white rounded-md text-sm font-medium">
             <div className="w-2 h-2 bg-[#FF9F43] rounded-full dotanim"></div>
             News
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {extra}
          {/* Dashboard Toggle */}
          <Segmented
            options={['User Dashboard', 'IB Dashboard']}
            value={activeTab}
            onChange={(val) => {
              if (val === 'IB Dashboard') onNavigate('IB_Dashboard');
              else if (val === 'User Dashboard') onNavigate('Dashboard');
            }}
            className="ib-segmented"
          />
        </div>
      </div>

      {/* Breadcrumb Row */}
      <div className="hidden lg:flex items-center gap-2 py-2 px-1">
         <Breadcrumb
           separator={<ChevronRight size={14} className="text-[#8e9d9b] mt-0.5" />}
           items={[
             { title: <Home size={18} className="text-[#00727d] cursor-pointer opacity-65" onClick={() => onNavigate('Dashboard')} /> },
             ...breadcrumbs.map(bc => ({
               title: <span className={`text-[var(--text-color)] font-medium ${bc.active ? '' : 'opacity-60'}`}>{bc.title}</span>
             }))
           ]}
         />
      </div>
    </div>
  );
};

export default DashboardHeader;
