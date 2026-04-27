import React, { useState } from 'react';
import { Bell, Settings, ChevronDown, LayoutDashboard, Users, RefreshCcw, ClipboardList, BarChart3, Trophy, Menu, X, Wallet, Mail, PlaySquare, Download, Headphones } from 'lucide-react';
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
    { 
      name: 'Wallet', 
      icon: <Wallet className="w-[18px] h-[18px]" strokeWidth={2} />, 
      hasDropdown: true,
      dropdownItems: [
        { name: 'Deposit', label: 'Deposit' },
        { name: 'Withdraw', label: 'Withdraw' }
      ]
    },
    { name: 'Internal Transfer', icon: <img src={internalTransferIcon} alt="Internal Transfer" className="w-[18px] h-[18px] object-contain" /> },
    { name: 'My Transaction', icon: <img src={myTransactionIcon} alt="My Transaction" className="w-[18px] h-[18px] object-contain" /> },
    { 
      name: 'Reports', 
      icon: <img src={reportsIcon} alt="Reports" className="w-[18px] h-[18px] object-contain" />, 
      hasDropdown: true,
      dropdownItems: [
        { name: 'Deposit', label: 'Deposit' },
        { name: 'Withdraw', label: 'Withdraw' },
        { name: 'Transfer', label: 'Transfer' },
        { name: 'Logs', label: 'Logs' }
      ]
    },
    { name: 'Leaderboard', icon: <img src={leaderboardIcon} alt="Leaderboard" className="w-[18px] h-[18px] object-contain" /> },
    { 
      name: 'More', 
      icon: null, 
      hasDropdown: true,
      dropdownItems: [
        { 
          name: 'Tools', 
          label: 'Tools', 
          icon: <ClipboardList size={18} strokeWidth={2} />, 
          hasNestedDropdown: true,
          nestedItems: [
            { name: 'WebTrader', label: 'Web Trader' }
          ]
        },
        { name: 'TradeAndWin', label: 'Trade & Win', icon: <Trophy size={18} strokeWidth={2} /> },
        { name: 'IBRequest', label: 'IB Request', icon: <Users size={18} strokeWidth={2} /> },
        { name: 'Messenger', label: 'Messenger', icon: <Mail size={18} strokeWidth={2} /> },
        { name: 'Tutorial', label: 'Tutorial', icon: <PlaySquare size={18} strokeWidth={2} /> },
        { name: 'Download', label: 'MT5 Download', icon: <Download size={18} strokeWidth={2} /> },

        { name: 'Support', label: 'Support', icon: <Headphones size={18} strokeWidth={2} /> },
        { name: 'FAQs', label: 'FAQs', icon: <ClipboardList size={18} strokeWidth={2} /> },
      ]
    },
  ];

  const handleNavClick = (name, dropdownItemName = null) => {
    if (dropdownItemName) {
      onNavigate(`${name}_${dropdownItemName}`);
    } else {
      // Don't navigate to base menus if they have dropdowns and are clicked directly
      if (name === 'Reports' || name === 'Wallet' || name === 'More') return;
      onNavigate(name);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-[#06120f] border-b border-white/5 h-[53px] sticky top-0 z-50">
      <div className="max-w-[1860px] mx-auto h-full flex items-center justify-between px-4 md:px-6">
        {/* Left Section: Logo & Nav Links grouped together */}
        <div className="flex items-center gap-10">
          {/* Logo Pill */}
          <img src={logo} alt="Neptune Logo" className="h-[40px] w-auto cursor-pointer object-contain" onClick={() => handleNavClick('Dashboard')} />

          {/* Navigation Links */}
          <div className="hidden xl:flex items-center gap-0.5">
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                <div className="relative group flex items-center h-[53px]">
                  <button
                    onClick={() => handleNavClick(item.name)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-[14px] font-semibold transition-all duration-200 ${
                      activeMenu && activeMenu.startsWith(item.name + '_') && item.hasDropdown ? 'bg-white text-[#06120f]' :
                      activeMenu === item.name
                        ? 'bg-white text-[#06120f]' 
                        : 'text-[#8e9d9b] hover:text-white'
                    }`}
                  >
                    {item.icon && (
                      <span className={(activeMenu === item.name || (activeMenu && activeMenu.startsWith(item.name + '_') && item.hasDropdown)) ? 'brightness-0' : ''}>
                        {item.icon}
                      </span>
                    )}
                    <span>{item.name}</span>
                    {item.hasDropdown && <ChevronDown size={14} className="ml-0.5 opacity-60" />}
                  </button>
                  
                  {/* Dropdown Menu */}
                  {item.dropdownItems && (
                    <div className="absolute top-[53px] left-0 min-w-[180px] bg-[#1A1A1A] border border-white/10 rounded-[8px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)] z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto transform translate-y-2 group-hover:translate-y-0">
                      <div className="py-2">
                        {item.dropdownItems.map((dropItem, dropIndex) => {
                          const isActive = activeMenu === `${item.name}_${dropItem.name}`;
                          return (
                            <div key={dropIndex} className="relative group/nested">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (dropItem.hasNestedDropdown) return;
                                  handleNavClick(item.name, dropItem.name);
                                }}
                                className={`w-full text-left py-2.5 text-[14px] flex items-center justify-between transition-colors ${
                                  isActive ? 'text-[#00BFA5] bg-white/5' : 'text-gray-300 hover:text-white hover:bg-white/5'
                                } px-4`}
                              >
                                <div className="flex items-center gap-3">
                                  {dropItem.icon ? (
                                    <span className="opacity-80 flex items-center justify-center w-[18px]">{dropItem.icon}</span>
                                  ) : (
                                    <div className="flex items-center justify-center w-4 h-4 rounded-full border border-current">
                                      {isActive && <div className="w-2 h-2 rounded-full bg-current"></div>}
                                    </div>
                                  )}
                                  <span className={isActive ? 'font-medium' : ''}>{dropItem.label}</span>
                                </div>
                                {dropItem.hasNestedDropdown && <ChevronDown size={14} className="opacity-60" />}
                              </button>
                              
                              {/* Nested Inline Menu */}
                              {dropItem.hasNestedDropdown && (
                                <div className="hidden group-hover/nested:block bg-[#222222]">
                                  {dropItem.nestedItems.map((nested, nIndex) => {
                                    const isNestedActive = activeMenu === `${item.name}_${nested.name}`;
                                    return (
                                      <button
                                        key={nIndex}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleNavClick(item.name, nested.name);
                                        }}
                                        className={`w-full text-left py-2.5 pl-12 pr-4 text-[14px] flex items-center gap-3 transition-colors ${
                                          isNestedActive ? 'text-[#00BFA5] bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/10'
                                        }`}
                                      >
                                        <div className="flex items-center justify-center w-[14px] h-[14px] rounded-full border border-current">
                                          {isNestedActive && <div className="w-1.5 h-1.5 rounded-full bg-current"></div>}
                                        </div>
                                        <span className={isNestedActive ? 'font-medium' : ''}>{nested.label}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                {/* Vertical Divider */}
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
