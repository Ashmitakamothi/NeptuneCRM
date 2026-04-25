import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AccountsPage from './components/AccountsPage';
import PlaceholderPage from './components/PlaceholderPage';

function App() {
  const [activePage, setActivePage] = useState('Dashboard');

  const renderContent = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard onNavigate={setActivePage} />;
      case 'Accounts':
        return <AccountsPage onNavigate={setActivePage} />;
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
