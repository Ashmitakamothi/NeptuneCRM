import React, { useState } from 'react';
import { Breadcrumb, Segmented, Button, DatePicker, Table } from 'antd';
import dayjs from 'dayjs';
import { Home, ChevronRight, Copy, Info } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';
import userWalletImg from '../assets/userWallet.png';
import * as IBIcons from './IBIcons';

const TRANSLATIONS = {
  EN: {
    ibDashboard: "IB Dashboard",
    news: "News",
    welcomeBack: "Welcome back",
    progressMessage: "Your progress this week is awesome. Let's keep it up!",
    todayEarning: "Today Earning",
    todayLots: "Today Lots",
    myTeam: "My Team",
    ibWallet: "IB Wallet",
    availableCommission: "Available IB Commission",
    withdraw: "Withdraw",
    depositWithdraw: "Deposit/Withdraw",
    deposit: "Deposit",
    kycDetails: "KYC Details",
    pending: "Pending",
    complete: "Complete",
    liveAccount: "Live Account",
    ibRequests: "IB Requests",
    approved: "Approved",
    lot: "Lot",
    commission: "Commission",
    topScorer: "Top Scorer",
    user: "USER",
    userType: "USER TYPE",
    commissionHeader: "COMMISSION",
    referralLink: "My Referral Link",
    userDashboard: "User Dashboard",
  },
  HI: {
    ibDashboard: "IB डैशबोर्ड",
    news: "समाचार",
    welcomeBack: "वापसी पर स्वागत है",
    progressMessage: "इस सप्ताह आपकी प्रगति शानदार है। चलिए इसे बनाए रखें!",
    todayEarning: "आज की कमाई",
    todayLots: "आज के लॉट्स",
    myTeam: "मेरी टीम",
    ibWallet: "IB वॉलेट",
    availableCommission: "उपलब्ध IB कमीशन",
    withdraw: "निकासी",
    depositWithdraw: "जमा/निकासी",
    deposit: "जमा",
    kycDetails: "KYC विवरण",
    pending: "लंबित",
    complete: "पूर्ण",
    liveAccount: "लाइव खाता",
    ibRequests: "IB अनुरोध",
    approved: "स्वीकृत",
    lot: "लॉट",
    commission: "कमीशन",
    topScorer: "शीर्ष स्कोरर",
    user: "उपयोगकर्ता",
    userType: "उपयोगकर्ता प्रकार",
    commissionHeader: "कमीशन",
    referralLink: "मेरा रेफरल लिंक",
    userDashboard: "यूजर डैशबोर्ड",
  }
};

const { RangePicker } = DatePicker;

const MetricCard = ({ title, leftLabel, rightLabel, leftVal, rightVal, color, accent }) => (
  <div className="bg-[var(--bg-color)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm hover:border-[#158B86]/30 transition-all cursor-pointer">
     <h4 className="text-lg font-medium mb-6">{title}</h4>
     <div className="grid grid-cols-2 gap-4 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-12 bg-[var(--border-color)]"></div>
        
        <div className="flex flex-col items-center gap-2">
           <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
              <IBIcons.MetricIcon color={color} />
           </div>
           <p className="text-2xl font-bold text-white">{leftVal}</p>
           <p className="text-sm text-[#8e9d9b]">{leftLabel}</p>
        </div>

        <div className="flex flex-col items-center gap-2">
           <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${accent}15` }}>
              <IBIcons.MetricIcon color={accent} />
           </div>
           <p className="text-2xl font-bold text-white">{rightVal}</p>
           <p className="text-sm text-[#8e9d9b]">{rightLabel}</p>
        </div>
     </div>
  </div>
);

const CustomTooltip = ({ active, payload, label, t }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-3 flex flex-col gap-2 shadow-2xl">
        <span className="text-[10px] text-white/40 font-bold uppercase">{label}</span>
        <div className="flex items-center gap-2">
           <div className="w-2.5 h-2.5 rounded-full bg-[#AF6C56]"></div>
           <span className="text-sm font-medium text-white/80">{t.lot}: <span className="text-white">{payload[0].value}</span></span>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-2.5 h-2.5 rounded-full bg-[#12716E]"></div>
           <span className="text-sm font-medium text-white/80">{t.commission}: <span className="text-white">{payload[1].value}</span></span>
        </div>
      </div>
    );
  }
  return null;
};

const IBDashboard = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('IB Dashboard');
  const { language } = useLanguage();
  const t = TRANSLATIONS[language] || TRANSLATIONS.EN;

  const chartData = [
    { name: 'Apr 23', lot: 0, commission: 0 },
    { name: 'Apr 24', lot: 0, commission: 0 },
    { name: 'Apr 25', lot: 0, commission: 0 },
    { name: 'Apr 26', lot: 0.1, commission: 0.05 },
    { name: 'Apr 27', lot: 0, commission: 0 },
    { name: 'Apr 28', lot: 0, commission: 0 },
    { name: 'Apr 29', lot: 0, commission: 0 },
  ];

  return (
    <div className="animate-fade-in space-y-4 pb-10">
      {/* Sub-Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-3">
          <h1 className="text-[22px] font-bold uppercase tracking-tight text-white">{t.ibDashboard}</h1>
          <div className="flex items-center gap-2">
             <div className="w-2.5 h-2.5 bg-[#AF6C56] rounded-full dotanim"></div>
             <div className="bg-[#12716E] text-white text-[13px] font-medium px-3 py-1 rounded-[4px] cursor-pointer">
                {t.news}
             </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Referral Link */}
          <div className="hidden md:flex items-center gap-3 bg-[#111818] border border-white/5 px-5 py-2 rounded-xl">
             <p className="text-[14px] font-medium text-white/70">{t.referralLink}: <span className="text-white">IFAHGGAP</span></p>
             <button className="text-white/50 hover:text-white transition-colors">
               <Copy size={14} />
             </button>
          </div>

          {/* Dashboard Toggle */}
          <Segmented
            options={[t.userDashboard, t.ibDashboard]}
            value={activeTab === 'IB Dashboard' ? t.ibDashboard : t.userDashboard}
            onChange={(val) => {
              if (val === t.userDashboard) onNavigate('Dashboard');
            }}
            className="ib-segmented"
          />
        </div>
      </div>

      {/* Breadcrumb Section */}
      <div className="flex items-center gap-2 py-2">
         <Breadcrumb
           separator={<ChevronRight size={14} className="text-[#8e9d9b] mt-0.5" />}
           items={[
             { title: <Home size={18} className="text-[#00727d] cursor-pointer opacity-65" onClick={() => onNavigate('Dashboard')} /> },
             { title: <span className="text-[var(--text-color)] font-medium">{t.ibDashboard}</span> },
           ]}
         />
      </div>

      {/* Welcome & Wallet Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-4">
        {/* Welcome Card */}
        <div className="xl:col-span-2 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-2xl p-6 relative overflow-hidden shadow-sm">
           <div className="flex flex-col gap-1 text-white">
              <h2 className="text-2xl font-semibold flex items-end gap-2">
                 {t.welcomeBack}, <span className="opacity-80">Ashmita Jethava</span>
              </h2>
              <p className="text-[#8e9d9b] mt-1">{t.progressMessage}</p>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-[var(--hover-bg)] transition-colors cursor-pointer group">
                 <div className="flex items-center justify-center w-12 h-12 bg-[#7367f038] rounded-lg">
                    <IBIcons.EarningIcon color="#7367F0" />
                 </div>
                 <div>
                    <h4 className="text-xl font-bold text-white">$ 0</h4>
                    <p className="text-xs text-[#8e9d9b]">{t.todayEarning}</p>
                 </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-[var(--hover-bg)] transition-colors cursor-pointer group">
                 <div className="flex items-center justify-center w-12 h-12 bg-[#00bad130] rounded-lg">
                    <IBIcons.LotsIcon color="#00BAD1" />
                 </div>
                 <div>
                    <h4 className="text-xl font-bold text-white">0</h4>
                    <p className="text-xs text-[#8e9d9b]">{t.todayLots}</p>
                 </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-[var(--hover-bg)] transition-colors cursor-pointer group">
                 <div className="flex items-center justify-center w-12 h-12 bg-[#ff9f432b] rounded-lg">
                    <IBIcons.MyTeamIcon color="#FF9F43" />
                 </div>
                 <div>
                    <h4 className="text-xl font-bold text-white">0</h4>
                    <p className="text-xs text-[#8e9d9b]">{t.myTeam}</p>
                 </div>
              </div>
           </div>
        </div>

        {/* IB Wallet Card */}
        <div className="bg-[var(--bg-color)] border border-[var(--border-color)] rounded-2xl p-6 flex justify-between relative overflow-hidden shadow-sm">
           <div className="z-10 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-semibold text-white">{t.ibWallet}</h3>
                <p className="text-[#8e9d9b] text-sm mt-1">{t.availableCommission}</p>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-bold text-[#158B86]">$ 00</p>
                <button 
                  onClick={() => onNavigate('IB Wallet')}
                  className="mt-4 px-6 py-2.5 bg-[#158B86] text-white rounded-xl font-semibold shadow-lg shadow-[#158b86]/20 hover:bg-[#12726e] transition-all"
                >
                   {t.withdraw}
                </button>
              </div>
           </div>
           <div className="absolute right-0 bottom-0 w-1/2 h-full pointer-events-none opacity-40 xl:opacity-100">
              <img src={userWalletImg} alt="Wallet" className="w-full h-full object-contain object-right-bottom translate-y-4" />
           </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricCard title={t.depositWithdraw} leftLabel={t.deposit} rightLabel={t.withdraw} leftVal="0" rightVal="0" color="#00727d" accent="#FF9F43" />
        <MetricCard title={t.kycDetails} leftLabel={t.pending} rightLabel={t.complete} leftVal="0" rightVal="0" color="#6A7292" accent="#FF9F43" />
        <MetricCard title={t.liveAccount} leftLabel={t.pending} rightLabel={t.complete} leftVal="0" rightVal="0" color="#00BAD1" accent="#FF9F43" />
        <MetricCard title={t.ibRequests} leftLabel={t.pending} rightLabel={t.approved} leftVal="0" rightVal="0" color="#FF9F43" accent="#28C76F" />
      </div>

      {/* Analytics & Top Scorer Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics Chart */}
        <div className="lg:col-span-2 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-[20px] p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-6">
               <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#AF6C56]"></div>
                  <span className="text-sm font-medium text-white/70">{t.lot}</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#12716E]"></div>
                  <span className="text-sm font-medium text-white/70">{t.commission}</span>
               </div>
            </div>
            <RangePicker 
               className="ib-datepicker" 
               defaultValue={[dayjs('2026-04-23'), dayjs('2026-04-29')]}
               format="DD-MM-YYYY"
            />
          </div>
          
          <div className="h-[300px] w-full mt-10">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                   <CartesianGrid strokeDasharray="0" vertical={false} stroke="rgba(255,255,255,0.05)" />
                   <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }}
                      dy={15}
                   />
                   <YAxis 
                      domain={[0, 2]} 
                      ticks={[0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2]}
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }}
                   />
                   <Tooltip content={<CustomTooltip t={t} />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
                   <Line 
                      type="monotone" 
                      dataKey="lot" 
                      stroke="#AF6C56" 
                      strokeWidth={2.5} 
                      dot={{ r: 0 }} 
                      activeDot={{ r: 5, strokeWidth: 2, fill: 'white' }} 
                   />
                   <Line 
                      type="monotone" 
                      dataKey="commission" 
                      stroke="#12716E" 
                      strokeWidth={2.5} 
                      dot={{ r: 0 }} 
                      activeDot={{ r: 5, strokeWidth: 2, fill: 'white' }} 
                   />
                </LineChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Top Scorer Table */}
        <div className="bg-[var(--bg-color)] border border-[var(--border-color)] rounded-[20px] p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-white">{t.topScorer}</h2>
            <Button type="text" icon={<Info size={18} className="text-white/30" />} />
          </div>
          
          <Table 
            columns={[
              { title: t.user, dataIndex: 'user', key: 'user', render: (text) => <span className="font-semibold text-white/90">{text}</span> },
              { title: t.userType, dataIndex: 'type', key: 'type', render: (type) => <span className="opacity-60 text-white/70">{type}</span> },
              { title: t.commissionHeader, dataIndex: 'commission', key: 'commission', render: (val) => <span className="text-[#12716E] font-bold">${val}</span> },
            ]}
            dataSource={[
              { key: '1', user: 'Ashmita J.', type: 'Master IB', commission: '1,240.00' },
              { key: '2', user: 'John Doe', type: 'Sub IB', commission: '850.50' },
              { key: '3', user: 'Sarah W.', type: 'IB', commission: '420.00' },
            ]}
            pagination={false}
            className="ib-table"
          />
        </div>
      </div>
    </div>
  );
};

export default IBDashboard;
