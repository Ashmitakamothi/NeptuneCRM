import React, { useState } from 'react';
import { Bell, Settings, ChevronDown, LayoutDashboard, Users, Repeat, FileText, BarChart3, Trophy, Menu, X } from 'lucide-react';

const Navbar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={14} />, active: true },
    { name: 'Accounts', icon: <Users size={14} />, active: false },
    { name: 'Internal Transfer', icon: <Repeat size={14} />, active: false },
    { name: 'My Transaction', icon: <FileText size={14} />, active: false },
    { name: 'Reports', icon: <BarChart3 size={14} />, active: false },
    { name: 'Leaderboard', icon: <Trophy size={14} />, active: false },
    { name: 'More', icon: null, active: false, hasDropdown: true },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-4 md:px-8 bg-[#06120f] border-b border-white/5 h-[53px] sticky top-0 z-50">
      {/* Left Section: Logo */}
      <div className="flex items-center gap-3">
        <div className="relative w-8 h-8">
          <div className="w-full h-full rounded-full overflow-hidden flex flex-wrap shadow-md">
             <div className="w-1/2 h-1/2 bg-[#0061FF]"></div>
             <div className="w-1/2 h-1/2 bg-[#00D1FF]"></div>
             <div className="w-1/2 h-1/2 bg-[#FFD600]"></div>
             <div className="w-1/2 h-1/2 bg-[#A5D63F]"></div>
          </div>
        </div>
        <span className="text-[16px] font-bold tracking-tight text-white uppercase">Neptune</span>
      </div>

      {/* Center Section: Navigation Links (Hidden on Mobile) */}
      <div className="hidden xl:flex items-center gap-0.5">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-200 ${
              item.active 
                ? 'bg-white text-[#06120f]' 
                : 'text-[#8e9d9b] hover:text-white'
            }`}
          >
            {item.icon && <span>{item.icon}</span>}
            <span>{item.name}</span>
            {item.hasDropdown && <ChevronDown size={14} className="ml-0.5 opacity-60" />}
          </button>
        ))}
      </div>

      {/* Right Section: User Actions & Mobile Menu */}
      <div className="flex items-center gap-3 md:gap-4">
        <button className="relative p-1 text-[#8e9d9b] hover:text-white transition-colors">
          <Bell size={18} strokeWidth={2} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-[#FF4D4F] rounded-full border-2 border-[#06120f]"></span>
        </button>
        <button className="p-1 text-[#8e9d9b] hover:text-white transition-colors">
          <Settings size={18} strokeWidth={2} />
        </button>
        <div className="w-8 h-8 rounded-full bg-[#D1F7E9] cursor-pointer border border-white/10"></div>
        
        {/* Mobile Hamburger Menu */}
        <button 
          className="xl:hidden p-1 text-[#8e9d9b] hover:text-white transition-colors ml-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-[53px] left-0 w-full bg-[#0A181B] border-b border-white/5 py-4 px-6 flex flex-col gap-2 xl:hidden shadow-xl">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-semibold transition-all duration-200 w-full ${
                item.active 
                  ? 'bg-white/10 text-white' 
                  : 'text-[#8e9d9b] hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon && <span>{item.icon}</span>}
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
