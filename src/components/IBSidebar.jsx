import React from 'react';
import { 
  LayoutGrid, 
  Wallet, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Users, 
  Network, 
  BadgePercent, 
  ShieldCheck, 
  Presentation, 
  UserPlus, 
  Trophy, 
  BarChart3, 
  Mail,
  ChevronRight
} from 'lucide-react';

const IBSidebar = ({ activeItem, onNavigate }) => {
  const menuItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: <LayoutGrid size={22} /> },
    { id: 'IB Wallet', label: 'IB Wallet', icon: <Wallet size={22} /> },
    { id: 'Deposit', label: 'Deposit', icon: <ArrowUpCircle size={22} /> },
    { id: 'Withdraw', label: 'Withdraw', icon: <ArrowDownCircle size={22} /> },
    { id: 'My Team', label: 'My Team', icon: <Users size={22} /> },
    { id: 'IB Tree', label: 'IB Tree', icon: <Network size={22} /> },
    { id: 'Commission', label: 'Commission', icon: <BadgePercent size={22} /> },
    { id: 'KYC', label: 'KYC', icon: <ShieldCheck size={22} /> },
    { id: 'IB Manager', label: 'IB Manager', icon: <Presentation size={22} /> },
    { id: 'Live Account', label: 'Live Account', icon: <UserPlus size={22} /> },
    { id: 'Trade & Win', label: 'Trade & Win', icon: <Trophy size={22} /> },
    { 
      id: 'Reports', 
      label: 'Reports', 
      icon: <BarChart3 size={22} />,
      hasDropdown: true 
    },
    { id: 'Messenger', label: 'Messenger', icon: <Mail size={22} /> },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0B0E11] rounded-[24px] p-4 py-8 shadow-2xl border border-white/5">
      <div className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                flex items-center justify-between w-full px-5 py-4 rounded-[16px] transition-all duration-300 group
                ${isActive 
                  ? 'bg-gradient-to-r from-[#158B86] to-[#1DB9B0] text-white shadow-lg shadow-[#158B86]/20' 
                  : 'text-[#D1D5DB] hover:bg-white/5 hover:text-white'
                }
              `}
            >
              <div className="flex items-center gap-4">
                <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110 opacity-70 group-hover:opacity-100'}`}>
                  {item.icon}
                </span>
                <span className={`text-[15px] font-bold tracking-wide ${isActive ? 'font-extrabold' : 'font-semibold'}`}>
                  {item.label}
                </span>
              </div>
              
              {item.hasDropdown && (
                <ChevronRight size={18} className={`opacity-60 ${isActive ? 'rotate-90' : ''}`} />
              )}
            </button>
          );
        })}
      </div>
      
      {/* Footer / Logout could go here */}
      <div className="mt-auto pt-8 flex flex-col gap-4">
         <button 
           onClick={() => onGlobalNavigate('Dashboard')}
           className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-[#8e9d9b] hover:text-white transition-all text-sm font-bold"
         >
           <LayoutGrid size={18} />
           Switch to User
         </button>

         <div className="px-4 py-2 border-t border-white/5 flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-[#158B86]" />
            <div className="flex flex-col">
               <span className="text-[12px] font-bold text-[var(--text-color)]">IB Account</span>
               <span className="text-[10px] text-[#158B86]">Verified Partner</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default IBSidebar;
