import React, { useState } from 'react';
import { 
  ArrowLeft, ChevronRight, UserCircle, UserCheck, Moon, 
  ShieldCheck, Lock, CreditCard, Users, FileText, 
  MessageCircle, PlayCircle, Download, Headphones, 
  HelpCircle, LogOut, Trophy, LayoutDashboard, Network, BadgePercent, X
} from 'lucide-react';
import { Sun } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const MobileSettings = ({ onNavigate, isIB }) => {
  const { logout, user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const [expandedSections, setExpandedSections] = useState({});
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleSection = (label) => {
    setExpandedSections(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  // Settings items based on mode
  const settingsItems = isIB ? [
    { label: 'Dark Mode', icon: isDark ? <Sun size={20} /> : <Moon size={20} />, type: 'toggle', value: isDark, onToggle: toggleTheme },
    { label: 'KYC Manager', icon: <UserCheck size={20} />, page: 'KYC' },
    { label: 'IB Manager', icon: <Users size={20} />, page: 'IB Manager' },
    { label: 'Live Account', icon: <LayoutDashboard size={20} />, page: 'Live Account' },
    { 
      label: 'Reports', 
      icon: <FileText size={20} />, 
      children: [
        { label: 'Earning', icon: <BadgePercent size={20} />, page: 'IB_Commission' },
        { label: 'Withdraw', icon: <CreditCard size={20} />, page: 'IB Wallet' },
        { label: 'My Team', icon: <Users size={20} />, page: 'IB_MyTeam' },
        { label: 'My Sub IB', icon: <Network size={20} />, page: 'IB Manager' },
      ]
    },
  ] : [
    { label: 'IB Request', icon: <UserCheck size={20} />, page: 'More_IBRequest' },
    { label: 'Dark Mode', icon: isDark ? <Sun size={20} /> : <Moon size={20} />, type: 'toggle', value: isDark, onToggle: toggleTheme },
    { label: 'Two Factor Authentication', icon: <ShieldCheck size={20} />, type: 'toggle', value: false },
    { label: 'Change Password', icon: <Lock size={20} />, page: 'Change_Password' },
    { label: 'Payment Details', icon: <CreditCard size={20} />, page: 'Payment_Details' },
    { label: 'Account', icon: <Users size={20} />, page: 'Accounts' },
    { label: 'Report', icon: <FileText size={20} />, page: 'Reports_Deposit' },
    { label: 'Messenger', icon: <MessageCircle size={20} />, page: 'More_Messenger' },
    { label: 'Tutorial', icon: <PlayCircle size={20} />, page: 'More_Tutorial' },
    { label: 'MT5 Download', icon: <Download size={20} />, page: 'More_MT5Download' },
    { label: 'Support', icon: <Headphones size={20} />, page: 'More_Support' },
    { label: 'FAQ\'s', icon: <HelpCircle size={20} />, page: 'More_FAQs' },
  ];

  return (
    <div className="block lg:hidden min-h-screen bg-[var(--bg-color)] pb-28 transition-colors">
      {/* ── Header ── */}
      <div className="flex items-center gap-3 px-4 py-4 sticky top-0 bg-[var(--bg-color)] z-10 border-b border-[var(--border-color)]">
        <button onClick={() => onNavigate(isIB ? 'IB_Dashboard' : 'Dashboard')} className="p-1 -ml-1 transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <h1 className="text-[20px] font-bold text-[#3B82F6]">{isIB ? 'IB Settings' : 'Settings'}</h1>
      </div>

      <div className="px-4 py-6 space-y-3">
        {/* ── User Info (Hidden in IB Settings as per screenshot) ── */}
        {!isIB && (
          <div 
            onClick={() => onNavigate('Profile')}
            className="bg-[var(--mobile-card-bg)] rounded-lg p-4 flex items-center justify-between border border-[var(--mobile-card-border)] active:bg-[var(--mobileThemeHover)] transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[var(--mobile-icon-bg)] flex items-center justify-center">
                <UserCircle size={40} className="text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--text-color)]">{user?.email || 'asmitajethva52@gmail.com'}</h3>
              </div>
            </div>
            <button className="w-8 h-8 bg-[var(--mobile-icon-bg)] rounded-[10px] flex items-center justify-center transition-colors">
              <ChevronRight size={18} className="text-[#45556C]" />
            </button>
          </div>
        )}

        {/* ── Settings List ── */}
        <div className="space-y-3 pb-4">
          {settingsItems.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              {item.type === 'toggle' ? (
                <div className="bg-[var(--mobile-card-bg)] rounded-lg p-4 py-3 flex items-center justify-between border border-[var(--mobile-card-border)]">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 grid place-items-center bg-[var(--mobile-icon-bg)] rounded-[14px]">
                      <div className="text-[var(--mobile-text-secondary)]">{item.icon}</div>
                    </div>
                    <span className="font-medium text-[var(--text-color)]">{item.label}</span>
                  </div>
                  <button 
                    onClick={item.onToggle}
                    className={`w-12 h-6 rounded-full transition-colors relative ${item.value ? 'bg-[#3B82F6]' : 'bg-[var(--segmented-bg)]'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${item.value ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              ) : item.children ? (
                <div className="flex flex-col gap-3">
                  <div 
                    onClick={() => toggleSection(item.label)}
                    className="bg-[var(--mobile-card-bg)] rounded-lg p-4 py-3 flex items-center justify-between border border-[var(--mobile-card-border)] active:bg-[var(--mobileThemeHover)] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 grid place-items-center bg-[var(--mobile-icon-bg)] rounded-[14px]">
                        <div className="text-[var(--mobile-text-secondary)]">{item.icon}</div>
                      </div>
                      <span className="font-medium text-[var(--text-color)]">{item.label}</span>
                    </div>
                    <button className="w-8 h-8 bg-[var(--mobile-icon-bg)] rounded-[10px] flex items-center justify-center transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#45556C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${expandedSections[item.label] ? 'rotate-180' : ''}`}>
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                  </div>
                  {expandedSections[item.label] && (
                    <div className="flex flex-col gap-3">
                      {item.children.map((child, childIdx) => (
                        <div 
                          key={childIdx}
                          onClick={() => child.page && onNavigate(child.page)}
                          className="bg-[var(--mobile-card-bg)] rounded-lg p-4 py-3 flex items-center justify-between border border-[var(--mobile-card-border)] active:bg-[var(--mobileThemeHover)] transition-colors cursor-pointer ml-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 grid place-items-center bg-[var(--mobile-icon-bg)] rounded-[14px]">
                              <div className="text-[var(--mobile-text-secondary)]">{child.icon}</div>
                            </div>
                            <span className="font-medium text-[var(--text-color)]">{child.label}</span>
                          </div>
                          <button className="w-8 h-8 bg-[var(--mobile-icon-bg)] rounded-[10px] flex items-center justify-center transition-colors">
                            <ChevronRight size={18} className="text-[var(--mobile-text-secondary)]" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div 
                  onClick={() => item.page && onNavigate(item.page)}
                  className="bg-[var(--mobile-card-bg)] rounded-lg p-4 py-3 flex items-center justify-between border border-[var(--mobile-card-border)] active:bg-[var(--mobileThemeHover)] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 grid place-items-center bg-[var(--mobile-icon-bg)] rounded-[14px]">
                      <div className="text-[var(--mobile-text-secondary)]">{item.icon}</div>
                    </div>
                    <span className="font-medium text-[var(--text-color)]">{item.label}</span>
                  </div>
                  <button className="w-8 h-8 bg-[var(--mobile-icon-bg)] rounded-[10px] flex items-center justify-center transition-colors">
                    <ChevronRight size={18} className="text-[var(--mobile-text-secondary)]" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Logout Button ── */}
        <div className="mb-8">
          <button 
            onClick={() => setShowLogoutModal(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-blue-500/10"
          >
            <LogOut size={22} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* ── Logout Modal ── */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[var(--card-bg)] rounded-2xl p-6 w-full max-w-[340px] border border-[var(--border-color)] shadow-2xl flex flex-col items-center relative overflow-hidden">
            {/* Red Jagged Icon */}
            <div className="w-[85px] h-[85px] mb-5 relative flex items-center justify-center text-[var(--text-color)]">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#ea5455] fill-current">
                 <path d="M12 1.5l2.64 1.84 3.2-.84 1.48 2.89 3.24.46-.2 3.32 2.57 2.1-1.6 2.87 1.6 2.87-2.57 2.1.2 3.32-3.24.46-1.48 2.89-3.2-.84L12 22.5l-2.64-1.84-3.2.84-1.48-2.89-3.24-.46.2-3.32-2.57-2.1 1.6-2.87-1.6-2.87 2.57-2.1-.2-3.32 3.24-.46 1.48-2.89 3.2.84L12 1.5z" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                 <X size={40} strokeWidth={4} />
              </div>
            </div>
            
            <h2 className="text-[var(--text-color)] text-[18px] font-bold text-center mb-8">
              Are you sure you want to logout?
            </h2>
            
            <div className="flex gap-4 w-full">
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 bg-[#ea5455] hover:bg-[#d44141] text-white font-bold py-3 rounded-[4px] transition-colors shadow-md text-[15px]"
              >
                NO
              </button>
              <button 
                onClick={() => {
                  setShowLogoutModal(false);
                  logout();
                  onNavigate('Login');
                }}
                className="flex-1 bg-[#28c76f] hover:bg-[#1fb861] text-white font-bold py-3 rounded-[4px] transition-colors shadow-md text-[15px]"
              >
                YES
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileSettings;
