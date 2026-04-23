import React, { useState } from 'react';
import { Plus, Wallet, Users, BarChart3, PieChart, Activity } from 'lucide-react';
import myBalanceIcon from '../assets/my-balance.png.png';
import equityIcon from '../assets/equityicon.png.png';
import totalProfitIcon from '../assets/totalprofit.png.png';
import usedMarginIcon from '../assets/usedmargin.png.png';
import freeMarginIcon from '../assets/freemargin.png.png';

const SummaryCards = () => {
  const [dashboardType, setDashboardType] = useState('IB');

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
              <button 
                onClick={() => setDashboardType('User')}
                className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-full text-[12px] sm:text-[13px] transition-colors ${dashboardType === 'User' ? 'font-semibold bg-[#4C5E62] text-white shadow-sm border border-[#5A6D71]' : 'font-medium text-[#8e9d9b] hover:text-white border border-transparent'}`}
              >User Dashboard</button>
              <button 
                onClick={() => setDashboardType('IB')}
                className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-full text-[12px] sm:text-[13px] transition-colors ${dashboardType === 'IB' ? 'font-semibold bg-[#4C5E62] text-white shadow-sm border border-[#5A6D71]' : 'font-medium text-[#8e9d9b] hover:text-white border border-transparent'}`}
              >IB Dashboard</button>
           </div>
           <button className="flex justify-center items-center gap-2 bg-[#D1F7E9] hover:bg-[#c2ebd9] text-[#0A181B] px-6 py-2.5 rounded-full text-[14px] font-bold h-[46px] transition-all">
             Add Product Batch <Plus size={18} strokeWidth={2.5} />
           </button>
        </div>
      </div>

      {/* Cards Grid: Exact gap from Figma */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-[13.14px] mt-6 md:mt-8 items-center">
        {/* Main Balance Card - Larger than others */}
        <div className="bg-[#06120F] rounded-[15.76px] border-[1.31px] border-[#1F383D] p-5 flex flex-col justify-start h-[130px] relative overflow-hidden sm:col-span-2 xl:col-span-1">
          {/* Perfect Soft Vertical Spotlight (Figma Style) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* The Beam - Centered exactly behind the badge */}
            <div className="absolute right-[10px] inset-y-0 w-[180px] flex items-center justify-center">
               {/* Main soft wide glow */}
               <div className="absolute w-[140px] h-full bg-[#A5D63F] blur-[55px] opacity-35"></div>
               {/* Bright central vertical core - Whiter and more intense */}
               <div className="absolute w-[45px] h-full bg-white blur-[20px] opacity-80"></div>
               <div className="absolute w-[80px] h-full bg-[#d4ff94] blur-[30px] opacity-60"></div>
            </div>
          </div>
          
          <div className="relative z-10 flex flex-col gap-4 w-full">
             {/* Top: Flat Icon */}
             <div className="mt-1">
                <img src={myBalanceIcon} alt="Wallet" className="w-[30px] h-[30px] object-contain" />
             </div>
             
             {/* Bottom: Text and 3D Badge */}
              <div className="flex items-end justify-between">
                <h3 className="text-[17px] font-medium text-white mb-0.5 tracking-wide">My Balance:</h3>
                
                {/* Clean Solid Figma Badge */}
                <div className="bg-[#A5D63F] px-5 py-1.5 rounded-full border border-[#0B1C1E]/45 shadow-[inset_0_-3px_0_rgba(0,0,0,0.22),0_10px_18px_rgba(0,0,0,0.26)] relative z-10">
                   <span className="text-[16px] font-extrabold text-[#0B1C1E] tracking-tight">$7348</span>
                </div>
             </div>
          </div>
        </div>

        {/* Metric Cards - Slightly Taller */}
        {[
          { label: 'Equity', value: '$ 0.00', icon: <img src={equityIcon} alt="Equity" className="w-[38px] h-[38px] object-contain" /> },
          { label: 'Total Profit', value: '$ 0.00', icon: <img src={totalProfitIcon} alt="Total Profit" className="w-[38px] h-[38px] object-contain" /> },
          { label: 'Used Margin', value: '$ 0.00', icon: <img src={usedMarginIcon} alt="Used Margin" className="w-[38px] h-[38px] object-contain" /> },
          { label: 'Free Margin', value: '$ 0.00', icon: <img src={freeMarginIcon} alt="Free Margin" className="w-[38px] h-[38px] object-contain" /> },
        ].map((card, idx) => (
          <div key={idx} className="bg-[#25393B] rounded-[15.76px] border-[1.31px] border-[#314A4D] p-4 h-[115px] flex items-center gap-4 hover:bg-[#2d4447] transition-all cursor-pointer relative z-10">
            <div className="shrink-0">
               {card.icon}
            </div>
            <div className="flex flex-col justify-center">
               <div className="text-[18px] lg:text-[20px] font-bold text-white tracking-tight leading-tight">{card.value}</div>
               <div className="text-[12px] lg:text-[13px] font-semibold text-[#5CBA47] leading-tight mt-1">{card.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryCards;
