import React from 'react';
import Navbar from './components/Navbar';
import SummaryCards from './components/SummaryCards';
import TradesTable from './components/TradesTable';
import ActionCards from './components/ActionCards';
import TransactionsList from './components/TransactionsList';
import AccountsTable from './components/AccountsTable';

function App() {
  return (
    <div className="min-h-screen bg-brand-dark pb-12">
      <Navbar />
      
      <main className="max-w-[1860px] mx-auto px-4 md:px-6 mt-4 md:mt-8 space-y-6 md:space-y-8">
        {/* Top Section: Hello and Balance */}
        <SummaryCards />

        {/* Middle Section: Trades and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1196fr)_minmax(0,603fr)] gap-[13.14px]">
          <div className="min-w-0">
            <TradesTable />
          </div>
          <div className="min-w-0 w-full lg:h-[434px] flex flex-col gap-[13.14px]">
            <ActionCards />
            <TransactionsList />
          </div>
        </div>

        {/* Bottom Section: Accounts and Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,785fr)_minmax(0,1051fr)] gap-[13.14px]">
          <div className="min-w-0">
            <AccountsTable />
          </div>
          <div className="min-w-0 bg-white rounded-[20px] border border-[#E2E2E4] shadow-[0_4px_6px_rgba(207,207,207,0.10)] h-[325px]" />
        </div>
      </main>
    </div>
  );
}

export default App;
