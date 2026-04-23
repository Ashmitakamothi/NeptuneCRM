import React from 'react';

const TradesTable = () => {
  const headers = ['Symbol', 'Type', 'Volume', 'Open Price', 'Current Price', 'Stop Loss', 'Take Profit', 'Swap', 'Open Time', 'Profit Loss', 'Close'];

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
                <tr>
                  <td colSpan={headers.length} className="h-[320px] text-center align-middle">
                    <p className="text-gray-300 text-[13px] font-medium"> </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradesTable;
