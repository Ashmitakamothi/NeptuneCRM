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

function App() {
  const [activePage, setActivePage] = useState(() => {
    // 1. Check URL path first
    const path = window.location.pathname.replace(/^\//, '');
    const urlMap = {
      'dashboard': 'Dashboard',
      'accounts': 'Accounts',
      'internal-transfer': 'Internal Transfer',
      'transactions': 'My Transaction',
      'leaderboard': 'Leaderboard',
      'wallet/deposit': 'Wallet_Deposit',
      'wallet/withdraw': 'Wallet_Withdraw',
      'webTrader': 'More_WebTrader',
      'trade_and_win': 'More_TradeAndWin',
      'ib_request': 'More_IBRequest'
    };
    
    if (urlMap[path]) return urlMap[path];
    
    // 2. Fallback to localStorage
    return localStorage.getItem('activePage') || 'Dashboard';
  });

  // Sync state to URL and localStorage
  React.useEffect(() => {
    localStorage.setItem('activePage', activePage);
    
    const pageToPath = {
      'Dashboard': 'dashboard',
      'Accounts': 'accounts',
      'Internal Transfer': 'internal-transfer',
      'My Transaction': 'transactions',
      'My Transactions': 'transactions',
      'Leaderboard': 'leaderboard',
      'Wallet_Deposit': 'wallet/deposit',
      'Wallet_Withdraw': 'wallet/withdraw',
      'More_WebTrader': 'webTrader',
      'More_TradeAndWin': 'trade_and_win',
      'More_IBRequest': 'ib_request'
    };

    const path = pageToPath[activePage] || '';
    const currentPath = window.location.pathname.replace(/^\//, '');
    
    if (path !== currentPath) {
      window.history.pushState({ page: activePage }, '', `/${path}`);
    }
  }, [activePage]);

  // Handle browser Back/Forward buttons
  React.useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        setActivePage(event.state.page);
      } else {
        // Fallback mapping based on current URL after pop
        const path = window.location.pathname.replace(/^\//, '');
        const urlMap = {
          'dashboard': 'Dashboard',
          'accounts': 'Accounts',
          'internal-transfer': 'Internal Transfer',
          'transactions': 'My Transaction',
          'leaderboard': 'Leaderboard',
          'wallet/deposit': 'Wallet_Deposit',
          'wallet/withdraw': 'Wallet_Withdraw',
          'webTrader': 'More_WebTrader',
          'trade_and_win': 'More_TradeAndWin',
          'ib_request': 'More_IBRequest'
        };
        if (urlMap[path]) setActivePage(urlMap[path]);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderContent = () => {
    if (activePage.startsWith('Report_')) {
      const type = activePage.replace('Report_', '');
      if (type === 'Logs') {
        return <LogsPage onNavigate={setActivePage} />;
      }
      return <ReportsPage type={type} onNavigate={setActivePage} />;
    }

    switch (activePage) {
      case 'Dashboard':
        return <Dashboard onNavigate={setActivePage} />;
      case 'Accounts':
        return <AccountsPage onNavigate={setActivePage} />;
      case 'Internal Transfer':
        return <InternalTransferPage onNavigate={setActivePage} />;
      case 'My Transactions':
      case 'My Transaction': // Handle both singular and plural forms for safety
        return <MyTransactionsPage onNavigate={setActivePage} />;
      case 'Leaderboard':
        return <LeaderboardPage onNavigate={setActivePage} />;
      case 'Wallet_Deposit':
        return <WalletDepositPage onNavigate={setActivePage} />;
      case 'Wallet_Withdraw':
        return <WalletWithdrawPage onNavigate={setActivePage} />;
      case 'More_WebTrader':
        return <WebTraderPage onNavigate={setActivePage} />;
      case 'More_TradeAndWin':
        return <TradeAndWinPage onNavigate={setActivePage} />;
      case 'More_IBRequest':
        return <IBRequestPage onNavigate={setActivePage} />;
      default:
        return <PlaceholderPage title={activePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark pb-12">
      <Navbar onNavigate={setActivePage} activeMenu={activePage} />
      
      <main className="max-w-[1860px] mx-auto px-4 md:px-6 mt-4 md:mt-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
