import React from 'react';
import { Plus, Wallet, Scale, LineChart, PieChart, BadgePercent } from 'lucide-react';

const SummaryCards = () => {
  return (
    <div className="bg-[#122D32] border-[1.31px] border-[#1F383D] rounded-[15.76px] p-5 md:p-[31.53px]">
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5">
        <div>
          <h1 className="text-[22px] md:text-[26px] font-semibold text-white tracking-tight leading-tight">Hello Antoine!</h1>
          <p className="text-[#8e9d9b] text-[12px] md:text-[13px] mt-1 font-medium">Displaying the data from <span className="text-white">June 2025</span></p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
           <div className="bg-[#1E3335] p-1.5 rounded-full border border-[#364D50] flex items-center h-[46px]">
              <button className="flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-full text-[12px] sm:text-[13px] font-medium text-[#8e9d9b] hover:text-white transition-colors">User Dashboard</button>
              <button className="flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-full text-[12px] sm:text-[13px] font-semibold bg-[#4C5E62] text-white shadow-sm border border-[#5A6D71]">IB Dashboard</button>
           </div>
           <button className="flex justify-center items-center gap-2 bg-[#D1F7E9] hover:bg-[#c2ebd9] text-[#0A181B] px-6 py-2.5 rounded-full text-[14px] font-bold h-[46px] transition-all">
             Add Product Batch <Plus size={18} strokeWidth={2.5} />
           </button>
        </div>
      </div>

      {/* Cards Grid: Exact gap from Figma */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-[13.14px] mt-6 md:mt-8 items-center">
        {/* Main Balance Card */}
        <div className="bg-[#06120F] rounded-[15.76px] border-[1.31px] border-[#1F383D] p-5 flex flex-col justify-between min-h-[145px] relative overflow-hidden sm:col-span-2 xl:col-span-1">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(165,214,63,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(165,214,63,0.5) 1px, transparent 1px)', backgroundSize: '30px 30px', transform: 'perspective(500px) rotateX(20deg) scale(1.2)' }}></div>
          
          {/* Intense vertical glow effect */}
          <div className="absolute right-[15%] top-1/2 -translate-y-1/2 w-[50px] h-[160px] bg-[#c7f284] blur-[35px] opacity-90 rounded-full"></div>
          
          <div className="relative z-10 flex flex-col h-full justify-between w-full">
             {/* Top: Flat Icon */}
             <div>
                <Wallet size={30} className="text-[#A5D63F]" strokeWidth={2} />
             </div>
             
             {/* Bottom: Text and 3D Badge */}
             <div className="flex items-end justify-between mt-5">
                <h3 className="text-[17px] font-medium text-white mb-0.5 tracking-wide">My Balance:</h3>
                <div className="bg-[#A5D63F] px-5 py-2 rounded-[12px] shadow-[inset_0_-4px_0_rgba(0,0,0,0.18),0_0_20px_rgba(165,214,63,0.2)] border border-[#c7f284]/40 relative -right-1">
                   <span className="text-[18px] font-extrabold text-[#0B1C1E] tracking-tight">$7348</span>
                </div>
             </div>
          </div>
        </div>

        {/* Metric Cards */}
        {[
          { label: 'Equity', value: '$ 0.00', icon: <div className="flex items-center justify-center"><Scale size={18} className="text-white" /></div> },
          { label: 'Total Profit', value: '$ 0.00', icon: <div className="flex items-center justify-center"><LineChart size={18} className="text-white" /></div> },
          { label: 'Used Margin', value: '$ 0.00', icon: <div className="flex items-center justify-center"><PieChart size={18} className="text-white" /></div> },
          { label: 'Free Margin', value: '$ 0.00', icon: <div className="flex items-center justify-center"><BadgePercent size={18} className="text-white" /></div> },
        ].map((card, idx) => (
          <div key={idx} className="bg-[#25393B] rounded-[15.76px] border-[1.31px] border-[#314A4D] p-5 h-[125px] flex items-center gap-4 hover:bg-[#2d4447] transition-all cursor-pointer relative z-10">
            <div className="w-[42px] h-[42px] bg-[#43595B] rounded-full flex items-center justify-center shrink-0">
               {card.icon}
            </div>
            <div className="flex flex-col justify-center">
               <div className="text-[18px] lg:text-[22px] font-bold text-white tracking-tight leading-tight">{card.value}</div>
               <div className="text-[12px] lg:text-[13px] font-semibold text-[#5CBA47] leading-tight mt-1">{card.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryCards;
