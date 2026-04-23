import React from 'react';
import SummaryCards from './SummaryCards';
import TradesTable from './TradesTable';
import ActionCards from './ActionCards';
import TransactionsList from './TransactionsList';
import AccountsTable from './AccountsTable';

const Dashboard = ({ onNavigate }) => {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Top Section: Hello and Balance */}
      <SummaryCards onNavigate={onNavigate} />

      {/* Middle Section: Trades and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1196fr)_minmax(0,603fr)] gap-[13.14px]">
        <div className="min-w-0">
          <TradesTable />
        </div>
        <div className="min-w-0 w-full lg:h-[434px] flex flex-col gap-[13.14px]">
          <ActionCards onNavigate={onNavigate} />
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
    </div>
  );
};

export default Dashboard;
