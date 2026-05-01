import React from 'react';
import { useRealtimeJson } from '../hooks/useRealtimeJson';
import { endpoints } from '../api/endpoints';
import { useLanguage } from '../contexts/LanguageContext';

const TRANSLATIONS = {
  EN: {
    title: "Open Trades",
    viewAll: "View All",
    noTrades: "No open trades",
    symbol: "Symbol",
    type: "Type",
    volume: "Volume",
    openPrice: "Open Price",
    currentPrice: "Current Price",
    stopLoss: "Stop Loss",
    takeProfit: "Take Profit",
    swap: "Swap",
    openTime: "Open Time",
    profitLoss: "Profit Loss",
    close: "Close",
    buy: "Buy",
    sell: "Sell"
  },
  HI: {
    title: "खुले ट्रेड",
    viewAll: "सभी देखें",
    noTrades: "कोई खुला ट्रेड नहीं",
    symbol: "प्रतीक",
    type: "प्रकार",
    volume: "वॉल्यूम",
    openPrice: "प्रारंभिक मूल्य",
    currentPrice: "वर्तमान मूल्य",
    stopLoss: "स्टॉप लॉस",
    takeProfit: "टेक प्रॉफिट",
    swap: "स्वैप",
    openTime: "खुलने का समय",
    profitLoss: "लाभ हानि",
    close: "बंद करें",
    buy: "खरीदें",
    sell: "बेचें"
  }
};

const TradesTable = ({ data: dataProp }) => {
  const { language } = useLanguage();
  const t = (key) => TRANSLATIONS[language]?.[key] || key;
  const headers = [
    { key: 'symbol', label: t('symbol') },
    { key: 'type', label: t('type') },
    { key: 'volume', label: t('volume') },
    { key: 'openPrice', label: t('openPrice') },
    { key: 'currentPrice', label: t('currentPrice') },
    { key: 'stopLoss', label: t('stopLoss') },
    { key: 'takeProfit', label: t('takeProfit') },
    { key: 'swap', label: t('swap') },
    { key: 'openTime', label: t('openTime') },
    { key: 'profitLoss', label: t('profitLoss') },
    { key: 'close', label: t('close') }
  ];
  const { data: dataRemote } = useRealtimeJson(endpoints.openTrades, { enabled: Boolean(!dataProp && endpoints.openTrades) });
  const data = dataProp ?? dataRemote;
  const rows = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : Array.isArray(data?.rows) ? data.rows : [];

  return (
    <div className="bg-[var(--card-bg)] rounded-[20px] overflow-hidden border border-[var(--border-color)] h-full lg:h-[434px] flex flex-col transition-colors">
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <h2 className="text-[16px] font-bold text-[var(--text-color)]">{t('title')}</h2>
        <button className="text-[11px] bg-[#158B86] px-4 py-1.5 rounded-full text-white font-semibold hover:opacity-90 transition-colors">
          {t('viewAll')}
        </button>
      </div>

      <div className="px-5 pb-5 flex-1 min-w-0">
        <div className="h-full rounded-[16px] border border-[var(--border-color)] overflow-hidden bg-[var(--card-bg)]">

          <div className="overflow-x-auto h-full">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="bg-[var(--sub-bg)]">
                  {headers.map((h, i) => (
                    <th
                      key={i}
                      className="py-3 px-2 xl:px-4 text-left text-[11px] xl:text-[12px] font-bold text-[var(--text-color)]"
                    >
                      {h.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={headers.length} className="h-[320px] text-center align-middle">
                      <p className="text-[var(--text-color)] opacity-30 text-[13px] font-medium">{t('noTrades')}</p>
                    </td>
                  </tr>
                ) : (
                  rows.map((r, idx) => (
                    <tr key={r.id ?? idx} className="border-t border-[var(--border-color)]">
                      <td className="py-3 px-2 xl:px-4 text-[12px] font-medium text-[var(--text-color)] opacity-80">{r.symbol ?? r.Symbol ?? '-'}</td>
                      <td className="py-3 px-2 xl:px-4 text-[12px] font-medium text-[var(--text-color)] opacity-80">{r.type ?? r.Type ?? (r.Action === 0 ? t('buy') : r.Action === 1 ? t('sell') : '-')}</td>
                      <td className="py-3 px-2 xl:px-4 text-[12px] font-medium text-[var(--text-color)] opacity-80">{r.volume ?? r.Volume ?? '-'}</td>
                      <td className="py-3 px-2 xl:px-4 text-[12px] font-medium text-[var(--text-color)] opacity-80">{r.openPrice ?? r.PriceOpen ?? r.open_price ?? '-'}</td>
                      <td className="py-3 px-2 xl:px-4 text-[12px] font-medium text-[var(--text-color)] opacity-80">{r.currentPrice ?? r.PriceCurrent ?? r.current_price ?? '-'}</td>
                      <td className="py-3 px-2 xl:px-4 text-[12px] font-medium text-[var(--text-color)] opacity-80">{r.stopLoss ?? r.Sl ?? r.stop_loss ?? '-'}</td>
                      <td className="py-3 px-2 xl:px-4 text-[12px] font-medium text-[var(--text-color)] opacity-80">{r.takeProfit ?? r.Tp ?? r.take_profit ?? '-'}</td>
                      <td className="py-3 px-2 xl:px-4 text-[12px] font-medium text-[var(--text-color)] opacity-80">{r.swap ?? r.Storage ?? '-'}</td>
                      <td className="py-3 px-2 xl:px-4 text-[12px] font-medium text-[var(--text-color)] opacity-80">
                        {r.openTime ? new Date(r.openTime).toLocaleString() : (r.TimeCreate ? new Date(r.TimeCreate * 1000).toLocaleString() : '-')}
                      </td>
                      <td className={`py-3 px-2 xl:px-4 text-[12px] font-bold ${(r.profit ?? r.Profit ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {typeof (r.profit ?? r.Profit) === 'number' ? `$ ${(r.profit ?? r.Profit).toFixed(2)}` : (r.profit ?? r.Profit ?? '-')}
                      </td>
                      <td className="py-3 px-2 xl:px-4 text-[12px] font-medium text-[var(--text-color)] opacity-80">—</td>
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
