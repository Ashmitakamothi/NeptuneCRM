import React from 'react';
import { ArrowDownToLine, ArrowUpToLine } from 'lucide-react';
import withdrawIcon from '../assets/withdraw.png.png';
import depositIcon from '../assets/deposite.png.png';
import { useLanguage } from '../contexts/LanguageContext';

const TRANSLATIONS = {
  EN: {
    withdraw: "Withdraw",
    deposit: "Deposit"
  },
  HI: {
    withdraw: "निकासी",
    deposit: "जमा"
  }
};

const ActionCards = ({ onNavigate, data }) => {
  const { language } = useLanguage();
  const t = (key) => TRANSLATIONS[language]?.[key] || key;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] 2xl:gap-[21px] min-h-[130px]">
      {/* Withdraw Card */}
      <div 
        onClick={() => onNavigate('Wallet_Withdraw')}
        className="bg-[var(--card-bg)] rounded-[20px] border border-[var(--border-color)] px-4 2xl:px-6 py-4 md:py-0 h-full min-h-[100px] md:min-h-[130px] min-w-0 flex items-center gap-3 2xl:gap-5 cursor-pointer shadow-[0_10px_25px_rgba(18,45,50,0.12)] hover:opacity-90 transition-all"
      >
        <div className="w-[42px] 2xl:w-[54px] h-[42px] 2xl:h-[54px] rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] shadow-[0_10px_18px_rgba(18,45,50,0.12)] flex items-center justify-center shrink-0">
          <img src={withdrawIcon} alt="Withdraw" className="w-[34px] 2xl:w-[46px] h-[34px] 2xl:h-[46px] object-contain" />
        </div>
        <div className="flex flex-col min-w-0">
          <div className="text-[17px] lg:text-[18px] 2xl:text-[24px] font-extrabold text-[var(--text-color)] tracking-tight leading-none whitespace-nowrap">
            ${data?.totalWithdrawal ?? data?.totalwithdrawal ?? data?.withdrawAmount ? Number(data?.totalWithdrawal ?? data?.totalwithdrawal ?? data?.withdrawAmount).toLocaleString() : '1,882'}
          </div>
          <div className="text-[14px] 2xl:text-[18px] font-semibold text-[#B2BEBB] leading-none mt-1.5 2xl:mt-2 whitespace-nowrap">{t('withdraw')}</div>
        </div>
      </div>


      {/* Deposit Card */}
      <div 
        onClick={() => onNavigate('Wallet_Deposit')}
        className="bg-[var(--card-bg)] rounded-[20px] border border-[var(--border-color)] px-4 2xl:px-6 py-4 md:py-0 h-full min-h-[100px] md:min-h-[130px] min-w-0 flex items-center gap-3 2xl:gap-5 cursor-pointer shadow-[0_10px_25px_rgba(18,45,50,0.12)] hover:opacity-90 transition-all"
      >
        <div className="w-[42px] 2xl:w-[54px] h-[42px] 2xl:h-[54px] rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] shadow-[0_10px_18px_rgba(18,45,50,0.12)] flex items-center justify-center shrink-0">
          <img src={depositIcon} alt="Deposit" className="w-[34px] 2xl:w-[46px] h-[34px] 2xl:h-[46px] object-contain" />
        </div>
        <div className="flex flex-col min-w-0">
          <div className="text-[17px] lg:text-[18px] 2xl:text-[24px] font-extrabold text-[var(--text-color)] tracking-tight leading-none whitespace-nowrap">
            ${data?.totalDeposit ?? data?.totaldeposit ?? data?.depositeAmount ? Number(data?.totalDeposit ?? data?.totaldeposit ?? data?.depositeAmount).toLocaleString() : '84,454.45'}
          </div>
          <div className="text-[14px] 2xl:text-[18px] font-semibold text-[#B2BEBB] leading-none mt-1.5 2xl:mt-2 whitespace-nowrap">{t('deposit')}</div>
        </div>
      </div>

    </div>
  );
};

export default ActionCards;
