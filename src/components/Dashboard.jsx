import React, { useMemo } from 'react';
import SummaryCards from './SummaryCards';
import TradesTable from './TradesTable';
import ActionCards from './ActionCards';
import TransactionsList from './TransactionsList';
import AccountsTable from './AccountsTable';
import { useRealtimeJson } from '../hooks/useRealtimeJson';
import { useDashboardSocket } from '../hooks/useDashboardSocket';
import { endpoints } from '../api/endpoints';

const Dashboard = ({ onNavigate }) => {
  const { data: dashboardData } = useRealtimeJson(endpoints.dashboard, {
    enabled: Boolean(endpoints.dashboard),
  });

  const { data: mt5Data } = useRealtimeJson(endpoints.deposits, {
    enabled: Boolean(endpoints.deposits),
  });

  const { data: socketData } = useDashboardSocket();

  const slices = useMemo(() => {
    // Extract main data objects
    const dash = dashboardData?.data || dashboardData || {};
    const mt5 = mt5Data?.data || mt5Data || {};
    const sock = socketData || {};

    // Merge everything, prioritizing the WalletDetails (dash) then MT5 then Socket
    const d = { ...mt5, ...dash, ...sock };
    
    return {
      summary: d,
      openTrades: d.openTrades ?? d.open_trades ?? d.trades ?? d.openTradesList ?? null,
      recentTransactions: {
        deposits: d.lastfiveDeposit || [],
        withdrawals: d.lastfiveWithdrawal || []
      },
      accounts: d.mT5AccountList ?? d.accounts ?? d.accountList ?? null,
    };
  }, [dashboardData, mt5Data, socketData]);

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Top Section: Hello and Balance */}
      <SummaryCards onNavigate={onNavigate} data={slices.summary} />

      {/* Middle Section: Trades and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1196fr)_minmax(0,603fr)] gap-[13.14px]">
        <div className="min-w-0">
          <TradesTable data={slices.openTrades} />
        </div>
        <div className="min-w-0 w-full lg:h-[434px] flex flex-col gap-[13.14px]">
          <ActionCards onNavigate={onNavigate} data={slices.summary} />
          <TransactionsList data={slices.recentTransactions} />
        </div>
      </div>

      {/* Bottom Section: Accounts and Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1051fr)_minmax(0,785fr)] gap-[13.14px]">
        <div className="min-w-0">
          <AccountsTable data={slices.accounts} isDashboard={true} />
        </div>
        <div className="min-w-0 bg-[var(--card-bg)] rounded-[20px] border border-[var(--border-color)] shadow-[0_4px_6px_rgba(207,207,207,0.10)] h-[325px]" />
      </div>

    </div>
  );
};

export default Dashboard;
