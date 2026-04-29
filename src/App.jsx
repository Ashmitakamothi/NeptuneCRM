import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AccountsPage from './components/AccountsPage';
import InternalTransferPage from './components/InternalTransferPage';
import MyTransactionsPage from './components/MyTransactionsPage';
import PlaceholderPage from './components/PlaceholderPage';
import ReportsPage from './components/ReportsPage';
import LogsPage from './components/LogsPage';
import LeaderboardPage from './components/LeaderboardPage';
import WalletDepositPage from './components/WalletDepositPage';
import WalletWithdrawPage from './components/WalletWithdrawPage';
import WebTraderPage from './components/WebTraderPage';
import TradeAndWinPage from './components/TradeAndWinPage';
import IBRequestPage from './components/IBRequestPage';
import FAQsPage from './components/FAQsPage';
import SupportPage from './components/SupportPage';
import TutorialsPage from './components/TutorialsPage';
import MessengerPage from './components/MessengerPage';
import DownloadPage from './components/DownloadPage';
import ProfilePage from './components/ProfilePage';
import AccountDetailsPage from './components/AccountDetailsPage';
import AccountTypesPage from './components/AccountTypesPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import IBDashboard from './components/IBDashboard';
import IBWalletPage from './components/IBWalletPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [activePage, setActivePageInternal] = useState(() => {
    // 1. Check URL path first
    const path = window.location.pathname.replace(/^\//, '');
    
    // If on Login/Signup path, return those
    if (path === 'login') return 'Login';
    if (path === 'signup') return 'Signup';

    const urlMap = {
      'dashboard': 'Dashboard',
      'accounts': 'Accounts',
      'internal-transfer': 'Internal Transfer',
      'transactions': 'My Transaction',
      'leaderboard': 'More_Leaderboard',
      'wallet/deposit': 'Wallet_Deposit',
      'wallet/withdraw': 'Wallet_Withdraw',
      'webTrader': 'More_WebTrader',
      'trade_and_win': 'More_TradeAndWin',
      'ib_request': 'More_IBRequest',
      'faq': 'More_FAQs',
      'support': 'More_Support',
      'messenger': 'More_Messenger',
      'tutorial': 'More_Tutorial',
      'download': 'More_Download',
      'mt5-download': 'More_MT5Download',
      'profile': 'Profile',
      'accounts/details': 'Account_Details',
      'accounts/types': 'Account_Types',
      'deposit_Report': 'Reports_Deposit',
      'withdrawal_Report': 'Reports_Withdraw',
      'transfer_Report': 'Reports_Transfer',
      'logs': 'Reports_Logs',
      'ib/dashboard': 'IB_Dashboard',
      'ib/wallet': 'IB Wallet'
    };

    if (urlMap[path]) return urlMap[path];
    
   
    if (path.startsWith('view_ticket/')) {
      const guid = path.split('/')[1];
      setPageData({ ticketId: guid });
      return 'View_Ticket';
    }

    // 2. Fallback to localStorage
    return localStorage.getItem('activePage') || 'Dashboard';
  });

  const [pageData, setPageData] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const filter = searchParams.get('filter');
    if (filter) return { filter };
    return null;
  });

  const setActivePage = (page, data = null) => {
    setActivePageInternal(page);
    setPageData(data);
  };

  // Sync state to URL and localStorage
  React.useEffect(() => {
    localStorage.setItem('activePage', activePage);
    
    const pageToPath = {
      'Dashboard': 'dashboard',
      'Accounts': 'accounts',
      'Internal Transfer': 'internal-transfer',
      'My Transaction': 'transactions',
      'My Transactions': 'transactions',
      'More_Leaderboard': 'leaderboard',
      'Wallet_Deposit': 'wallet/deposit',
      'Wallet_Withdraw': 'wallet/withdraw',
      'More_WebTrader': 'webTrader',
      'More_TradeAndWin': 'trade_and_win',
      'More_IBRequest': 'ib_request',
      'More_FAQs': 'faq',
      'More_Support': 'support',
      'More_Messenger': 'messenger',
      'More_Tutorial': 'tutorial',
      'More_Download': 'download',
      'More_MT5Download': 'download',
      'Profile': 'profile',
      'Account_Details': 'accounts/details',
      'Account_Types': 'accounts/types',
      'Login': 'login',
      'Signup': 'signup',
      'View_Ticket': 'view_ticket',
      'Reports_Deposit': 'deposit_Report',
      'Reports_Withdraw': 'withdrawal_Report',
      'Reports_Transfer': 'transfer_Report',
      'Reports_Logs': 'logs',
      'IB_Dashboard': 'ib/dashboard',
      'IB Wallet': 'ib/wallet'
    };

    let path = pageToPath[activePage] || '';
    if (activePage === 'View_Ticket' && pageData?.ticketId) {
      path = `view_ticket/${pageData.ticketId}`;
    }

    const currentPath = window.location.pathname.replace(/^\//, '');
    const currentSearch = window.location.search;
    
    if (path !== currentPath) {
      let search = '';
      if (activePage === 'Accounts' || activePage === 'Account_Types' || activePage === 'Account_Details') {
        search = (currentSearch || '?filter=live');
      } else if (activePage === 'My Transaction') {
        const filter = pageData?.filter || 'All';
        search = `?filter=${filter}`;
      }
      window.history.pushState({ page: activePage, data: pageData }, '', `/${path}${search}`);
    } else if (activePage === 'My Transaction') {
      // If path is same but filter changed, update URL
      const filter = pageData?.filter || 'All';
      const newSearch = `?filter=${filter}`;
      if (currentSearch !== newSearch) {
        window.history.replaceState({ page: activePage, data: pageData }, '', `/${path}${newSearch}`);
      }
    }
  }, [activePage, pageData]);

  // Handle browser Back/Forward buttons
  React.useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        setActivePage(event.state.page);
      } else {
        const path = window.location.pathname.replace(/^\//, '');
        const urlMap = {
          'dashboard': 'Dashboard',
          'accounts': 'Accounts',
          'internal-transfer': 'Internal Transfer',
          'transactions': 'My Transaction',
          'leaderboard': 'More_Leaderboard',
          'wallet/deposit': 'Wallet_Deposit',
          'wallet/withdraw': 'Wallet_Withdraw',
          'webTrader': 'More_WebTrader',
          'trade_and_win': 'More_TradeAndWin',
          'ib_request': 'More_IBRequest',
          'faq': 'More_FAQs',
          'support': 'More_Support',
          'messenger': 'More_Messenger',
          'tutorial': 'More_Tutorial',
          'download': 'More_Download',
          'mt5-download': 'More_MT5Download',
          'profile': 'Profile',
          'accounts/details': 'Account_Details',
          'accounts/types': 'Account_Types',
          'login': 'Login',
          'signup': 'Signup',
          'view_ticket': 'View_Ticket',
          'deposit_Report': 'Reports_Deposit',
          'withdrawal_Report': 'Reports_Withdraw',
          'transfer_Report': 'Reports_Transfer',
          'logs': 'Reports_Logs',
          'my_transaction': 'My Transaction'
        };

        if (path.startsWith('view_ticket/')) {
          const guid = path.split('/')[1];
          setActivePage('View_Ticket', { ticketId: guid });
        } else if (urlMap[path]) {
          setActivePage(urlMap[path]);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderContent = () => {
    // Auth Guard
    if (!isAuthenticated) {
      if (activePage === 'Signup') return <SignupPage onNavigate={setActivePage} />;
      return <LoginPage onNavigate={setActivePage} />;
    }

    if (activePage.startsWith('Reports_')) {
      const type = activePage.replace('Reports_', '');
      if (type === 'Logs') return <LogsPage onNavigate={setActivePage} />;
      return <ReportsPage type={type} onNavigate={setActivePage} />;
    }

    switch (activePage) {
      case 'Dashboard': return <Dashboard onNavigate={setActivePage} />;
      case 'Accounts': return <AccountsPage onNavigate={setActivePage} />;
      case 'Account_Details': return <AccountDetailsPage onNavigate={setActivePage} pageData={pageData} />;
      case 'Account_Types': return <AccountTypesPage onNavigate={setActivePage} pageData={pageData} />;
      case 'Internal Transfer': return <InternalTransferPage onNavigate={setActivePage} />;
      case 'My Transactions':
      case 'My Transaction': return (
        <MyTransactionsPage 
          onNavigate={setActivePage} 
          initialFilter={pageData?.filter || 'All'}
          onFilterChange={(f) => setPageData({ filter: f })}
        />
      );
      case 'More_Leaderboard': return <LeaderboardPage onNavigate={setActivePage} />;
      case 'Wallet_Deposit': return <WalletDepositPage onNavigate={setActivePage} />;
      case 'Wallet_Withdraw': return <WalletWithdrawPage onNavigate={setActivePage} />;
      case 'More_WebTrader': return <WebTraderPage onNavigate={setActivePage} />;
      case 'More_TradeAndWin': return <TradeAndWinPage onNavigate={setActivePage} />;
      case 'More_IBRequest': return <IBRequestPage onNavigate={setActivePage} />;
      case 'More_FAQs': return <FAQsPage onNavigate={setActivePage} />;
      case 'More_Support': return <SupportPage onNavigate={setActivePage} />;
      case 'View_Ticket': return <SupportPage onNavigate={setActivePage} initialTicketId={pageData?.ticketId} />;
      case 'More_Messenger': return <MessengerPage onNavigate={setActivePage} />;
      case 'More_Tutorial': return <TutorialsPage onNavigate={setActivePage} />;
      case 'More_Download':
      case 'More_MT5Download': return <DownloadPage onNavigate={setActivePage} />;
      case 'Profile': return <ProfilePage onNavigate={setActivePage} />;
      case 'Login': return <LoginPage onNavigate={setActivePage} />;
      case 'Signup': return <SignupPage onNavigate={setActivePage} />;
      case 'IB_Dashboard':
      case 'More_IB_Dashboard': return <IBDashboard onNavigate={setActivePage} />;
      case 'IB Wallet': return <IBWalletPage onNavigate={setActivePage} />;
      default: return <PlaceholderPage title={activePage} />;
    }
  };

    const isIB = activePage === 'IB_Dashboard' || activePage === 'IB Wallet';

    return (
      <div className={`min-h-screen ${!isAuthenticated ? '' : 'bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300 pb-12'}`}>
        {isAuthenticated && <Navbar onNavigate={setActivePage} activeMenu={activePage} isIB={isIB} />}
        
        <main className={isAuthenticated ? "max-w-[1860px] mx-auto px-4 md:px-6 mt-4 md:mt-8" : ""}>
          {renderContent()}
        </main>
      </div>
    );
};

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <AppContent />
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
