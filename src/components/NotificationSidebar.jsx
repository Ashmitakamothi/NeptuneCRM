import React from 'react';
import { X, Bell } from 'lucide-react';

const NotificationSidebar = ({ isOpen, onClose }) => {
  const notifications = [
    {
      id: 1,
      title: 'Campaign Cancelled',
      message: 'The campaign "Trade to Win 2026" has been cancelled. xyz',
      time: 'an hour ago',
    },
    {
      id: 2,
      title: 'A ticket no: T2604280 has been closed',
      message: 'A ticket no: T2604280 has been closed by Ashmita Jethava',
      time: '20 hours ago',
    },
    {
      id: 3,
      title: 'A ticket no: T2604281 has been closed',
      message: 'A ticket no: T2604281 has been closed by Ashmita Jethava',
      time: '20 hours ago',
    },
    {
      id: 4,
      title: 'A ticket no: T2604282 has been closed',
      message: 'A ticket no: T2604282 has been closed by Ashmita Jethava',
      time: '21 hours ago',
    },
    {
      id: 5,
      title: 'A ticket no: T2604283 has been closed',
      message: 'A ticket no: T2604283 has been closed by Ashmita Jethava',
      time: '21 hours ago',
    },
    {
      id: 6,
      title: 'KYC Request Approved',
      message: 'Your KYC Request has been approved.',
      time: 'a day ago',
    }
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-[60] transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-[350px] md:w-[400px] bg-[var(--nav-bg)] border-l border-[var(--border-color)] z-[70] transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col shadow-2xl`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--border-color)] shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="text-[#8e9d9b] hover:text-[var(--text-color)] transition-colors flex items-center justify-center">
              <X size={18} strokeWidth={2} />
            </button>
            <h2 className="text-[15px] font-bold text-[var(--text-color)]">Notification</h2>
          </div>
          <button className="text-[13px] font-bold text-[var(--text-color)] hover:text-[#158B86] transition-colors">
            Clear all
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.map((notif) => (
            <div key={notif.id} className="p-5 border-b border-[var(--border-color)] hover:bg-[var(--sub-bg)] transition-colors cursor-pointer flex gap-4">
              <div className="mt-0.5 shrink-0">
                 <Bell size={18} strokeWidth={2} className="text-[#158B86]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2 mb-1.5">
                  <h3 className="text-[13.5px] font-bold text-[var(--text-color)] leading-tight truncate">{notif.title}</h3>
                  <span className="text-[11px] text-[#8e9d9b] whitespace-nowrap shrink-0">{notif.time}</span>
                </div>
                <p className="text-[12px] text-[#8e9d9b] leading-relaxed">
                  {notif.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NotificationSidebar;
