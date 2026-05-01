import React, { useState } from 'react';
import {
  Home, Wallet, RefreshCcw, History, MoreHorizontal,
  X, LayoutDashboard, Users, Trophy, Mail, PlaySquare,
  Download, Headphones, HelpCircle, LogOut, UserCircle,
  BadgePercent, Network, FileBarChart, UserCheck, ArrowUpCircle,
  ArrowDownCircle, Settings
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// ─── Bottom Navigation Bar ────────────────────────────────────────────────────
const MobileBottomNav = ({ onNavigate, activePage }) => {
  const isIBPage = [
    'IB_Dashboard', 'IB Wallet', 'IB_TeamDeposit', 'IB_TeamWithdraw',
    'IB_MyTeam', 'IB_Tree', 'IB_Commission', 'KYC', 'IB Manager',
    'Live Account', 'IBTradeAndWin', 'IBMessenger', 'More_IBMessenger',
    'More_IB Manager', 'More_My Sab-IB', 'More_Live Account', 'More_IBTradeAndWin',
    'More_My Team', 'More_Earning', 'More_Withdraw'
  ].includes(activePage);

  const tabs = isIBPage ? [
    {
      id: 'home',
      label: 'Home',
      page: 'IB_Dashboard',
      icon: (
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20">
          <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
          <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
      ),
      isActive: (p) => p === 'IB_Dashboard',
    },
    {
      id: 'wallet',
      label: 'IB Wallet',
      page: 'IB Wallet',
      icon: (
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20">
          <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
          <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
        </svg>
      ),
      isActive: (p) => ['IB Wallet', 'IB_TeamDeposit', 'IB_TeamWithdraw'].includes(p),
    },
    {
      id: 'team',
      label: 'My Team',
      page: 'IB_MyTeam',
      icon: (
        <Users size={20} />
      ),
      isActive: (p) => p === 'IB_MyTeam',
    },
    {
      id: 'commission',
      label: 'Commission',
      page: 'IB_Commission',
      icon: (
        <BadgePercent size={20} />
      ),
      isActive: (p) => p === 'IB_Commission',
    },
    {
      id: 'more',
      label: 'More',
      page: 'IB_Settings',
      icon: (
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20">
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      ),
      isActive: (p) => p === 'IB_Settings',
    },
  ] : [
    {
      id: 'home',
      label: 'Home',
      page: 'Dashboard',
      icon: (
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20">
          <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
          <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
      ),
      isActive: (p) => p === 'Dashboard',
    },
    {
      id: 'wallet',
      label: 'My Wallet',
      page: 'Wallet_Deposit',
      icon: (
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20">
          <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
          <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
        </svg>
      ),
      isActive: (p) => ['Wallet_Deposit', 'Wallet_Withdraw'].includes(p),
    },
    {
      id: 'transfer',
      label: 'Transfer',
      page: 'Internal Transfer',
      icon: (
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20">
          <path d="m17 2 4 4-4 4" />
          <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
          <path d="m7 22-4-4 4-4" />
          <path d="M21 13v1a4 4 0 0 1-4 4H3" />
        </svg>
      ),
      isActive: (p) => p === 'Internal Transfer',
    },
    {
      id: 'transactions',
      label: 'Transactions',
      page: 'My Transaction',
      icon: (
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          <path d="M12 7v5l4 2" />
        </svg>
      ),
      isActive: (p) => ['My Transaction', 'My Transactions'].includes(p),
    },
    {
      id: 'more',
      label: 'More',
      page: 'Settings',
      icon: (
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20">
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      ),
      isActive: (p) => p === 'Settings',
    },
  ];


  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--nav-bg)] border-t border-[var(--border-color)] shadow-lg lg:hidden">
      <div className="flex justify-around items-center max-w-full mx-auto px-2 py-2">
        {tabs.map((tab) => {
          const active = tab.isActive(activePage);
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.page) {
                  onNavigate(tab.page);
                }
              }}
              className={`flex flex-col items-center justify-center py-2 px-1 cursor-pointer transition-all duration-200 rounded-xl min-w-[60px] flex-1 max-w-[80px] hover:bg-[var(--sub-bg)]`}
            >
              <div
                className="mb-1 flex items-center justify-center w-8 h-8 transition-colors duration-200"
                style={{ color: active ? '#3B82F6' : '#9ca3af' }}
              >
                {tab.icon}
              </div>
              <span
                className="text-[11px] font-medium text-center leading-tight transition-colors duration-200 whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
                style={{ color: active ? '#3B82F6' : '#9ca3af' }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
