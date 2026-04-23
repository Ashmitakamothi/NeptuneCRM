import React, { useState } from 'react';
import { Bell, Settings, ChevronDown, LayoutDashboard, Users, RefreshCcw, ClipboardList, BarChart3, Trophy, Menu, X } from 'lucide-react';
import homeSmileIcon from '../assets/home-smile.png';
import internalTransferIcon from '../assets/internal-transfer.png.png';
import accountsIcon from '../assets/account.png.png';
import myTransactionIcon from '../assets/my-transaction.png.png';
import reportsIcon from '../assets/reports.png.png';
import leaderboardIcon from '../assets/leaderboard.png.png';
import logo from '../assets/logo.png.png';

const Navbar = ({ onNavigate, activeMenu }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const menuItems = [
    { name: 'Dashboard', icon: <img src={homeSmileIcon} alt="Dashboard" className="w-[18px] h-[18px] object-contain" /> },
    { name: 'Accounts', icon: <img src={accountsIcon} alt="Accounts" className="w-[18px] h-[18px] object-contain" /> },
    { name: 'Internal Transfer', icon: <img src={internalTransferIcon} alt="Internal Transfer" className="w-[18px] h-[18px] object-contain" /> },
    { name: 'My Transaction', icon: <img src={myTransactionIcon} alt="My Transaction" className="w-[18px] h-[18px] object-contain" /> },
    { name: 'Reports', icon: <img src={reportsIcon} alt="Reports" className="w-[18px] h-[18px] object-contain" /> },
    { name: 'Leaderboard', icon: <img src={leaderboardIcon} alt="Leaderboard" className="w-[18px] h-[18px] object-contain" /> },
    { name: 'More', icon: null, hasDropdown: true },
  ];

  const handleNavClick = (name) => {
    onNavigate(name);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-[#06120f] border-b border-white/5 h-[53px] sticky top-0 z-50">
      <div className="max-w-[1860px] mx-auto h-full flex items-center justify-between px-4 md:px-6">
        {/* Left Section: Logo & Nav Links grouped together */}
        <div className="flex items-center gap-10">
          {/* Logo Pill (Removed redundant wrapper to fix double border) */}
          <img src={logo} alt="Neptune Logo" className="h-[40px] w-auto cursor-pointer object-contain" onClick={() => handleNavClick('Dashboard')} />

          {/* Navigation Links (Now closer to logo) */}
          <div className="hidden xl:flex items-center gap-0.5">
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                <button
                  onClick={() => handleNavClick(item.name)}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-200 ${
                    activeMenu === item.name
                      ? 'bg-white text-[#06120f]' 
                      : 'text-[#8e9d9b] hover:text-white'
                  }`}
                >
                  {item.icon && <span>{item.icon}</span>}
                  <span>{item.name}</span>
                  {item.hasDropdown && <ChevronDown size={14} className="ml-0.5 opacity-60" />}
                </button>
                {/* Vertical Divider (Vector from Figma) - Skip after Dashboard */}
                {index < menuItems.length - 1 && item.name !== 'Dashboard' && (
                  <div className="w-[1.31px] h-[24px] bg-white/10 mx-0.5"></div>
                )}
              </React.Fragment>
            ))}
          </div>
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
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 right-0 bg-[#06120f] border-b border-white/5 py-4 px-6 flex flex-col gap-4 shadow-2xl z-50">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavClick(item.name)}
              className={`flex items-center gap-3 py-2 text-sm font-semibold transition-colors ${
                activeMenu === item.name ? 'text-white' : 'text-[#8e9d9b]'
              }`}
            >
              {item.icon && <span className="w-5 h-5 flex items-center justify-center">{item.icon}</span>}
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
