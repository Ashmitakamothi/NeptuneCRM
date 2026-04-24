import React from 'react';
import { useRealtimeJson } from '../hooks/useRealtimeJson';
import { endpoints } from '../api/endpoints';

const TradesTable = ({ data: dataProp }) => {
  const headers = ['Symbol', 'Type', 'Volume', 'Open Price', 'Current Price', 'Stop Loss', 'Take Profit', 'Swap', 'Open Time', 'Profit Loss', 'Close'];
  const { data: dataRemote } = useRealtimeJson(endpoints.openTrades, { enabled: Boolean(!dataProp && endpoints.openTrades) });
  const data = dataProp ?? dataRemote;
  const rows = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : Array.isArray(data?.rows) ? data.rows : [];

  return (
    <div className="bg-white rounded-[20px] overflow-hidden border border-[#E2E2E4] h-full lg:h-[434px] flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <h2 className="text-[16px] font-bold text-[#122D32]">Open Trades</h2>
        <button className="text-[11px] bg-[#4C5E62] px-4 py-1.5 rounded-full text-white font-semibold hover:bg-[#3a474a] transition-colors">
          View All
        </button>
      </div>
      <div className="px-5 pb-5 flex-1 min-w-0">
        <div className="h-full rounded-[16px] border border-[#E2E2E4] overflow-hidden bg-white">
          <div className="overflow-x-auto h-full">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="bg-[#E6E6E6]">
                  {headers.map((h, i) => (
                    <th
                      key={i}
                      className="py-3 px-2 xl:px-4 text-left text-[11px] xl:text-[12px] font-bold text-[#122D32]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={headers.length} className="h-[320px] text-center align-middle">
                      <p className="text-gray-300 text-[13px] font-medium">No open trades</p>
                    </td>
                  </tr>
                ) : (
                  rows.map((r, idx) => (
                    <tr key={r.id ?? idx} className="border-t border-[#E2E2E4]">
                      <td className="py-3 px-2 xl:px-4 text-[12px] font-medium text-[#122D32]/80">{r.symbol ?? r.Symbol ?? '-'}</td>
                      <td className="py-3 px-2 xl:px-4 text-[12px] font-medium text-[#122D32]/80">{r.type ?? r.Type ?? (r.Action === 0 ? 'Buy' : r.Action === 1 ? 'Sell' : '-')}</td>
                      <td className="py-3 px-2 xl:px-4 text-[12px] font-medium text-[#122D32]/80">{r.volume ?? r.Volume ?? '-'}</td>
                      <td className="py-3 px-2 xl:px-4 text-[12px] font-medium text-[#122D32]/80">{r.openPrice ?? r.PriceOpen ?? r.open_price ?? '-'}</td>
                      <td className="py-3 px-2 xl:px-4 text-[12px] font-medium text-[#122D32]/80">{r.currentPrice ?? r.PriceCurrent ?? r.current_price ?? '-'}</td>
                      <td className="py-3 px-2 xl:px-4 text-[12px] font-medium text-[#122D32]/80">{r.stopLoss ?? r.Sl ?? r.stop_loss ?? '-'}</td>
                      <td className="py-3 px-2 xl:px-4 text-[12px] font-medium text-[#122D32]/80">{r.takeProfit ?? r.Tp ?? r.take_profit ?? '-'}</td>
                      <td className="py-3 px-2 xl:px-4 text-[12px] font-medium text-[#122D32]/80">{r.swap ?? r.Storage ?? '-'}</td>
                      <td className="py-3 px-2 xl:px-4 text-[12px] font-medium text-[#122D32]/80">
                        {r.openTime ? new Date(r.openTime).toLocaleString() : (r.TimeCreate ? new Date(r.TimeCreate * 1000).toLocaleString() : '-')}
                      </td>
                      <td className={`py-3 px-2 xl:px-4 text-[12px] font-bold ${(r.profit ?? r.Profit ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {typeof (r.profit ?? r.Profit) === 'number' ? `$ ${(r.profit ?? r.Profit).toFixed(2)}` : (r.profit ?? r.Profit ?? '-')}
                      </td>
                      <td className="py-3 px-2 xl:px-4 text-[12px] font-medium text-[#122D32]/80">—</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradesTable;
