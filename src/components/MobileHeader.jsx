import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import NotificationSidebar from './NotificationSidebar';
import logo from '../assets/logo.png.png';

const MobileHeader = ({ onNavigate, activePage }) => {
  const { user } = useAuth();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const isIBPage = [
    'IB_Dashboard', 'IB Wallet', 'IB_TeamDeposit', 'IB_TeamWithdraw',
    'IB_MyTeam', 'IB_Tree', 'IB_Commission', 'KYC', 'IB Manager',
    'Live Account', 'IBTradeAndWin', 'IBMessenger', 'More_IBMessenger',
    'More_IB Manager', 'More_My Sab-IB', 'More_Live Account', 'More_IBTradeAndWin',
    'More_My Team', 'More_Earning', 'More_Withdraw'
  ].includes(activePage);

  const notifications = [
    { id: 1, title: 'Campaign Cancelled', message: 'The campaign "Trade to Win 2026" has been cancelled.', time: 'an hour ago' },
    { id: 2, title: 'Ticket T2604280 closed', message: 'Ticket T2604280 has been closed by Ashmita Jethava', time: '20 hours ago' },
    { id: 3, title: 'Ticket T2604281 closed', message: 'Ticket T2604281 has been closed by Ashmita Jethava', time: '20 hours ago' },
    { id: 4, title: 'Ticket T2604282 closed', message: 'Ticket T2604282 has been closed by Ashmita Jethava', time: '21 hours ago' },
    { id: 5, title: 'KYC Request Approved', message: 'Your KYC Request has been approved.', time: 'a day ago' },
  ];

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <>
      <div className="bg-[var(--nav-bg)] shadow-sm border-b border-[var(--border-color)] px-4 py-3 flex items-center justify-between sticky top-0 z-40 lg:hidden">
        {/* Logo */}
        <div className="shrink-0 flex items-center">
          <img
            src={logo}
            alt="Neptune"
            className="h-8 max-h-10 w-auto object-contain cursor-pointer"
            onClick={() => onNavigate(isIBPage ? 'IB_Dashboard' : 'Dashboard')}
          />
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* User / IB Segmented Toggle */}
          <div
            className="flex rounded-lg p-0.5 text-xs font-semibold"
            style={{ background: 'var(--sub-bg)', border: '1px solid var(--border-color)' }}
          >
            <button
              onClick={() => onNavigate('Dashboard')}
              className="px-3 py-1.5 rounded-md transition-all duration-200"
              style={
                !isIBPage
                  ? { background: '#3B82F6', color: '#fff' }
                  : { color: 'var(--text-color)', opacity: 0.7 }
              }
            >
              User
            </button>
            <button
              onClick={() => onNavigate('IB_Dashboard')}
              className="px-3 py-1.5 rounded-md transition-all duration-200"
              style={
                isIBPage
                  ? { background: '#3B82F6', color: '#fff' }
                  : { color: 'var(--text-color)', opacity: 0.7 }
              }
            >
              IB
            </button>
          </div>

          {/* Bell */}
          <button
            className="relative rounded-lg p-1 hover:bg-[var(--sub-bg)] transition-colors"
            onClick={() => setIsNotificationOpen(true)}
          >
            <Bell strokeWidth={1.5} className="w-7 h-7 text-[#3B82F6]" />
            {notifications.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#EF4444] text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 leading-none shadow-sm">
                {notifications.length > 5 ? '5+' : notifications.length}
              </span>
            )}
          </button>

          {/* Avatar */}
          <button className="p-0.5 rounded-lg hover:bg-[var(--sub-bg)] transition-colors">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm uppercase"
              style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6' }}
            >
              {initials}
            </div>
          </button>
        </div>
      </div>

      <NotificationSidebar
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
      />
    </>
  );
};

export default MobileHeader;
