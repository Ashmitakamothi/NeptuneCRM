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

function App() {
  const [activePage, setActivePage] = useState(() => {
    return localStorage.getItem('activePage') || 'Dashboard';
  });

  React.useEffect(() => {
    localStorage.setItem('activePage', activePage);
  }, [activePage]);

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
