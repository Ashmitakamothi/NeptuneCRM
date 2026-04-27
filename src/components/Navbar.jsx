import React, { useState } from 'react';
import { Bell, Settings, ChevronDown, LayoutDashboard, Users, RefreshCcw, ClipboardList, BarChart3, Trophy, Menu, X, Wallet, Mail, PlaySquare, Download, Headphones, Moon, Sun, Globe, Check } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import homeSmileIcon from '../assets/home-smile.png';
import internalTransferIcon from '../assets/internal-transfer.png.png';
import accountsIcon from '../assets/account.png.png';
import myTransactionIcon from '../assets/my-transaction.png.png';
import reportsIcon from '../assets/reports.png.png';
import leaderboardIcon from '../assets/leaderboard.png.png';
import logo from '../assets/logo.png.png';

const Navbar = ({ onNavigate, activeMenu }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const t = (key) => {
    const TRANSLATIONS = {
      EN: {
        Dashboard: 'Dashboard', Accounts: 'Accounts', Wallet: 'Wallet', Deposit: 'Deposit', Withdraw: 'Withdraw',
        'Internal Transfer': 'Internal Transfer', 'My Transaction': 'My Transaction', Reports: 'Reports', Transfer: 'Transfer', Logs: 'Logs',
        More: 'More', Leaderboard: 'Leaderboard', Tools: 'Tools', 'Web Trader': 'Web Trader', 'Trade & Win': 'Trade & Win',
        'IB Request': 'IB Request', Messenger: 'Messenger', Tutorial: 'Tutorial', 'MT5 Download': 'MT5 Download', Support: 'Support', FAQs: 'FAQs'
      },
      HI: {
        Dashboard: 'डैशबोर्ड', Accounts: 'अकाउंट्स', Wallet: 'वॉलेट', Deposit: 'जमा करें', Withdraw: 'निकासी',
        'Internal Transfer': 'आंतरिक स्थानांतरण', 'My Transaction': 'मेरा लेनदेन', Reports: 'रिपोर्ट', Transfer: 'ट्रांसफर', Logs: 'लॉग्स',
        More: 'अधिक', Leaderboard: 'लीडरबोर्ड', Tools: 'उपकरण', 'Web Trader': 'वेब ट्रेडर', 'Trade & Win': 'ट्रेड एंड विन',
        'IB Request': 'IB अनुरोध', Messenger: 'मैसेंजर', Tutorial: 'ट्यूटोरियल', 'MT5 Download': 'MT5 डाउनलोड', Support: 'समर्थन', FAQs: 'अक्सर पूछे जाने वाले प्रश्न'
      }
    };
    return TRANSLATIONS[language]?.[key] || key;
  };
  
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
    { 
      name: 'More', 
      icon: null, 
      hasDropdown: true,
      dropdownItems: [
        { name: 'Leaderboard', label: 'Leaderboard', icon: <img src={leaderboardIcon} alt="Leaderboard" className="w-[18px] h-[18px] object-contain" /> },
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

  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="bg-[var(--nav-bg)] border-b border-[var(--border-color)] h-[53px] sticky top-0 z-50 transition-colors">
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
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-[14px] font-semibold whitespace-nowrap transition-all duration-200 ${
                      (activeMenu && activeMenu.startsWith(item.name + '_') && item.hasDropdown) || activeMenu === item.name
                        ? 'bg-[#158B86] text-white shadow-[0_2px_10px_rgba(21,139,134,0.3)]'
                        : 'text-[#8e9d9b] hover:text-[var(--text-color)]'
                    }`}
                  >
                    {item.icon && (
                      <span className={`flex items-center justify-center ${
                        (activeMenu === item.name || (activeMenu && activeMenu.startsWith(item.name + '_') && item.hasDropdown))
                          ? ''
                          : (!isDark ? '[&>img]:brightness-0 [&>img]:opacity-60' : '[&>img]:opacity-60')
                      }`}>
                        {item.icon}
                      </span>
                    )}
                    <span>{t(item.name)}</span>
                    {item.hasDropdown && <ChevronDown size={14} className="ml-0.5 opacity-60" />}
                  </button>
                  
                  {/* Dropdown Menu */}
                  {item.dropdownItems && (
                    <div className="absolute top-[53px] left-0 min-w-[180px] bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[8px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)] z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto transform translate-y-2 group-hover:translate-y-0">

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
                                  isActive ? 'text-[#00BFA5] bg-[var(--sub-bg)]' : 'text-[var(--text-color)] opacity-80 hover:text-[var(--text-color)] hover:bg-[var(--sub-bg)]'
                                } px-4`}

                              >
                                <div className="flex items-center gap-3">
                                  {dropItem.icon ? (
                                    <span className={`opacity-80 flex items-center justify-center w-[18px] ${!isDark ? '[&>img]:brightness-0' : ''}`}>{dropItem.icon}</span>
                                  ) : (
                                    <div className="flex items-center justify-center w-4 h-4 rounded-full border border-current">
                                      {isActive && <div className="w-2 h-2 rounded-full bg-current"></div>}
                                    </div>
                                  )}
                                  <span className={isActive ? 'font-medium' : ''}>{t(dropItem.label)}</span>
                                </div>
                                {dropItem.hasNestedDropdown && <ChevronDown size={14} className="opacity-60" />}
                              </button>
                              
                              {/* Nested Inline Menu */}
                              {dropItem.hasNestedDropdown && (
                                <div className="hidden group-hover/nested:block bg-[var(--sub-bg)]">
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
                                          isNestedActive ? 'text-[#00BFA5] bg-[var(--sub-bg)]' : 'text-[var(--text-color)] opacity-70 hover:text-[var(--text-color)] hover:bg-[var(--sub-bg)]'
                                        }`}

                                      >
                                        <div className="flex items-center justify-center w-[14px] h-[14px] rounded-full border border-current">
                                          {isNestedActive && <div className="w-1.5 h-1.5 rounded-full bg-current"></div>}
                                        </div>
                                        <span className={isNestedActive ? 'font-medium' : ''}>{t(nested.label)}</span>
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
                  <div className="w-[1.31px] h-[24px] bg-[var(--border-color)] mx-0.5"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right Section: User Actions & Mobile Menu */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-1.5 text-[#8e9d9b] hover:text-[var(--text-color)] transition-colors"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Moon size={20} strokeWidth={2} /> : <Sun size={20} strokeWidth={2} />}
          </button>

          {/* Language Selector */}
          <div className="relative group/lang flex items-center h-[53px]">
            <button className="flex items-center gap-1.5 p-1.5 text-[#8e9d9b] hover:text-[var(--text-color)] transition-colors h-full">
              <Globe size={18} strokeWidth={2} />
              <span className="text-[14px] font-bold">{language === 'EN' ? 'US' : 'IN'}</span>
            </button>
            <div className="absolute top-[53px] right-0 w-32 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[8px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)] z-50 opacity-0 invisible group-hover/lang:opacity-100 group-hover/lang:visible transition-all duration-200 pointer-events-none group-hover/lang:pointer-events-auto transform translate-y-2 group-hover/lang:translate-y-0">
              <div className="py-2">
                <button 
                  onClick={() => setLanguage('EN')} 
                  className={`w-full text-left px-4 py-2 text-[14px] font-semibold transition-colors flex items-center justify-between ${language === 'EN' ? 'text-[var(--text-color)] bg-[var(--sub-bg)]' : 'text-[var(--text-color)] opacity-80 hover:bg-[var(--sub-bg)]'}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-[12px] opacity-60 font-bold w-[20px]">US</span>
                    <span>English</span>
                  </span>
                  {language === 'EN' && <Check size={14} strokeWidth={2.5} />}
                </button>
                <button 
                  onClick={() => setLanguage('HI')} 
                  className={`w-full text-left px-4 py-2 text-[14px] font-semibold transition-colors flex items-center justify-between ${language === 'HI' ? 'text-[var(--text-color)] bg-[var(--sub-bg)]' : 'text-[var(--text-color)] opacity-80 hover:bg-[var(--sub-bg)]'}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-[12px] opacity-60 font-bold w-[20px]">IN</span>
                    <span className="text-[15px]">हिन्दी</span>
                  </span>
                  {language === 'HI' && <Check size={14} strokeWidth={2.5} />}
                </button>
              </div>
            </div>
          </div>

          <div className="w-[1px] h-5 bg-[var(--border-color)] mx-1 hidden sm:block"></div>

          <button className="relative p-1.5 text-[#8e9d9b] hover:text-[var(--text-color)] transition-colors">
            <Bell size={20} strokeWidth={2} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF4D4F] rounded-full border-2 border-[var(--nav-bg)]"></span>
          </button>
          
          <button className="p-1.5 text-[#8e9d9b] hover:text-[var(--text-color)] transition-colors hidden sm:block">
            <Settings size={20} strokeWidth={2} />
          </button>
          
          <div className="w-9 h-9 rounded-full bg-[#D1F7E9] cursor-pointer border border-[var(--border-color)] ml-1"></div>
          
          {/* Mobile Hamburger Menu */}
          <button 
            className="xl:hidden p-1.5 text-[#8e9d9b] hover:text-[var(--text-color)] transition-colors ml-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
          </button>

        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 right-0 bg-[var(--nav-bg)] border-b border-[var(--border-color)] py-4 px-6 flex flex-col gap-4 shadow-2xl z-50">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavClick(item.name)}
              className={`flex items-center gap-3 py-2 px-3 rounded-md text-sm font-semibold transition-colors ${
                activeMenu === item.name ? 'bg-[#158B86] text-white shadow-md' : 'text-[#8e9d9b] hover:text-[var(--text-color)]'
              }`}
            >
              {item.icon && <span className={`w-5 h-5 flex items-center justify-center ${activeMenu === item.name ? '' : (!isDark ? '[&>img]:brightness-0 [&>img]:opacity-60' : '[&>img]:opacity-60')}`}>{item.icon}</span>}
              <span>{t(item.name)}</span>
            </button>
          ))}
        </div>
      )}

    </nav>
  );
};

export default Navbar;
