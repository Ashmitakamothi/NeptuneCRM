import React, { useState, useEffect } from 'react';
import { Home, ChevronRight, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { endpoints } from '../api/endpoints';
import Loader from './Loader';

const TRANSLATIONS = {
  EN: {
    accountTypes: 'ACCOUNT TYPES',
    news: 'News',
    userDashboard: 'User Dashboard',
    ibDashboard: 'IB Dashboard',
    breadcrumbAccounts: 'Accounts',
    breadcrumbTypes: 'Account Types',
    openLiveAccount: 'Open Live Account',
    forExperienced: 'For experienced traders',
    minDeposit: 'Minimum Deposit',
    pipsSpread: 'Pips Spread',
    swapFree: 'Swap free',
    marginCall: 'Margin Call',
    leverage: 'Leverage',
    loading: 'Loading account types...',
    noTypes: 'No account types found.',
  },
  HI: {
    accountTypes: 'अकाउंट प्रकार',
    news: 'समाचार',
    userDashboard: 'यूजर डैशबोर्ड',
    ibDashboard: 'आईबी डैशबोर्ड',
    breadcrumbAccounts: 'अकाउंट्स',
    breadcrumbTypes: 'अकाउंट प्रकार',
    openLiveAccount: 'लाइव अकाउंट खोलें',
    forExperienced: 'अनुभवी ट्रेडर्स के लिए',
    minDeposit: 'न्यूनतम जमा',
    pipsSpread: 'पिप्स स्प्रेड',
    swapFree: 'स्वैप मुक्त',
    marginCall: 'मार्जिन कॉल',
    leverage: 'लेवरेज',
    loading: 'अकाउंट प्रकार लोड हो रहे हैं...',
    noTypes: 'कोई अकाउंट प्रकार नहीं मिला।',
  },
};

// Fallback static types matching the live site design
const FALLBACK_TYPES = [
  {
    id: 1,
    name: 'Gold',
    description: 'For experienced traders',
    minDeposit: '$3000',
    pipsSpread: '0 Pips Spread',
    swapFree: true,
    marginCall: '50% Margin Call',
    leverage: '300x Leverage',
  },
  {
    id: 2,
    name: 'Silver',
    description: 'For experienced traders',
    minDeposit: '$3000',
    pipsSpread: '0 Pips Spread',
    swapFree: false,
    marginCall: '50% Margin Call',
    leverage: '200x Leverage',
  },
];

// Map raw API account type object → display shape
const normalizeType = (raw, idx) => {
  // Try many possible field names where the actual name (Gold/Silver) may live
  // planName must come BEFORE groupName — groupName contains internal paths like "demo\forex-net-usd-01"
  const name =
    raw.planName ??
    raw.accountTypeName ??
    raw.typeName ??
    raw.name ??
    raw.accountGroupName ??
    raw.groupName ??
    `Type ${idx + 1}`;

  // Pips spread — API may return raw number 0 or string
  const rawSpread = raw.pipsSpread ?? raw.spread ?? raw.pip ?? null;
  const pipsSpread =
    rawSpread != null
      ? `${rawSpread} Pips Spread`
      : '0 Pips Spread';

  // Margin call — API may return raw number 50 or string
  const rawMargin = raw.marginCall ?? raw.margin ?? raw.marginCallPercent ?? null;
  const marginCall =
    rawMargin != null
      ? `${rawMargin}% Margin Call`
      : '50% Margin Call';

  // Leverage — API may return number 300 or string '300x'
  const rawLev = raw.leverage ?? raw.maxLeverage ?? null;
  const leverage =
    rawLev != null
      ? `${String(rawLev).replace(/x$/i, '')}x Leverage`
      : '—';

  // Min deposit
  const rawDep = raw.minimumDeposit ?? raw.minDeposit ?? raw.minDepositAmount ?? null;
  const minDeposit = rawDep != null ? `$${rawDep}` : '$3000';

  return {
    id: raw.id ?? raw.accountTypeId ?? raw.accounttypeId ?? idx + 1,
    // preserve raw IDs and groupName for the CreateLive-Account API payload
    planId: raw.planId ?? raw.id ?? raw.accountTypeId ?? null,
    groupId: raw.groupId ?? null,
    groupName: raw.groupName ?? null,
    name,
    description: raw.description ?? raw.details ?? 'For experienced traders',
    minDeposit,
    pipsSpread,
    swapFree: raw.isSwapFree ?? raw.swapFree ?? false,
    marginCall,
    leverage,
  };
};

const AccountTypesPage = ({ onNavigate, pageData }) => {
  const { language } = useLanguage();
  const { token, userId } = useAuth();
  const isDemo = pageData?.isDemo ?? false;
  const [dashboardType, setDashboardType] = useState('User');
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedLeverage, setSelectedLeverage] = useState('');
  const [proceeding, setProceeding] = useState(false);
  const [modalResult, setModalResult] = useState(null); // { success, message }

  const LEVERAGE_OPTIONS = [20, 50, 100, 200, 300, 400, 500];
  const DEPOSIT_OPTIONS = [1000, 3000, 5000, 50000, 100000]; // demo only
  const [selectedDeposit, setSelectedDeposit] = useState('');

  const openModal = (type) => {
    setSelectedType(type);
    setSelectedLeverage('');
    setSelectedDeposit('');
    setModalResult(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedType(null);
    setSelectedLeverage('');
    setSelectedDeposit('');
    setModalResult(null);
    setProceeding(false);
  };

  const handleProceed = async () => {
    if (!selectedLeverage) return;
    if (isDemo && !selectedDeposit) return;
    setProceeding(true);
    setModalResult(null);
    try {
      // Exact payload matching live site (camelCase)
      const payload = isDemo
        ? {
            depositAmount: Number(selectedDeposit),
            groupId: selectedType?.groupId ?? null,
            groupName: selectedType?.groupName ?? null,
            isDemoAccount: true,
            isLiveAccount: false,
            leverage: Number(selectedLeverage),
            planId: selectedType?.planId ?? selectedType?.id ?? null,
            userId: userId,
          }
        : {
            depositAmount: 0,
            groupId: selectedType?.groupId ?? null,
            groupName: selectedType?.groupName ?? null,
            isDemoAccount: false,
            isLiveAccount: true,
            leverage: Number(selectedLeverage),
            planId: selectedType?.planId ?? selectedType?.id ?? null,
            userId: userId,
          };
      const apiUrl = endpoints.createLiveAccount;
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      // Safely parse response — API may return empty body
      const text = await res.text();
      let json = {};
      if (text && text.trim()) {
        try { json = JSON.parse(text); } catch (_) { json = { message: text }; }
      }

      const isSuccess = json.success ?? json.Success ?? res.ok;
      const msg =
        json.message ??
        json.Message ??
        json.error?.Message ??
        (isSuccess
          ? 'Your account request is under review. Once approved, your login credentials will be sent to your email.'
          : null);
      if (isSuccess) {
        setModalResult({ success: true, message: msg });
        setTimeout(() => closeModal(), 4000);
      } else {
        // Close silently on error — don't show technical HTTP errors to user
        closeModal();
      }
    } catch (err) {
      console.error('CreateAccount error:', err);
      closeModal(); // close silently
    } finally {
      setProceeding(false);
    }
  };

  const t = (key) => TRANSLATIONS[language]?.[key] || key;

  useEffect(() => {
    const fetchTypes = async () => {
      setLoading(true);
      setError(null);
      try {
        // Build endpoint: use AccountType=false for demo, true for live
        let url = endpoints.accountTypes ?? '';
        if (userId) url = url.replace('{userId}', userId);
        if (isDemo) {
          url = url.replace('AccountType=true', 'AccountType=false');
        }

        const res = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const raw = Array.isArray(json)
          ? json
          : Array.isArray(json?.data)
          ? json.data
          : Array.isArray(json?.result)
          ? json.result
          : [];

        if (raw.length > 0) {
          setTypes(raw.map(normalizeType));
        } else {
          setTypes(FALLBACK_TYPES);
        }
      } catch (err) {
        console.error('AccountTypes fetch error:', err);
        // Use fallback on error so the page still looks good
        setTypes(FALLBACK_TYPES);
        setError(null); // silent fallback
      } finally {
        setLoading(false);
      }
    };

    fetchTypes();
  }, [userId, token, isDemo]);

  return (
    <div className="flex flex-col w-full animate-fade-in pb-20">
      {/* ── Mobile Back Header (lg:hidden) ── */}
      <div className="flex lg:hidden items-center gap-3 py-4 border-b border-[var(--border-color)] mb-6 -mx-4 px-4 bg-[var(--bg-color)] sticky top-0 z-[100]">
        <button onClick={() => onNavigate('Accounts')} className="p-1 -ml-1 transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <h1 className="text-[20px] font-bold text-[#3B82F6]">{t('breadcrumbTypes')}</h1>
      </div>

      {/* ── Mobile Tabs (lg:hidden) ── */}
      <div className="lg:hidden px-4 mb-8">
        <div className="bg-[#1a1a1e] rounded-lg shadow-sm py-2 px-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-tabs-scrollbar">
            {types.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type)}
                className={`whitespace-nowrap px-8 py-2.5 rounded-xl text-[15px] font-bold transition-all ${
                  (selectedType?.id === type.id || (!selectedType && types[0]?.id === type.id))
                    ? 'bg-[#3B82F6] text-white shadow-lg'
                    : 'text-white hover:text-white/80'
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Active Type Title (lg:hidden) ── */}
      <div className="lg:hidden flex flex-col items-center mb-8">
        <h2 className="text-[24px] font-bold bg-gradient-to-r from-[#155DFC] to-[#193CB8] bg-clip-text text-transparent mb-1">
          {(selectedType || types[0])?.name}
        </h2>
        <div className="w-14 h-1.5 mt-1 rounded-full bg-gradient-to-r from-[#51A2FF] to-[#155DFC]" />
      </div>

      {/* ── Mobile Spec Cards (lg:hidden) ── */}
      <div className="lg:hidden flex flex-col gap-4 mb-8">
        {(() => {
          const activeType = selectedType || types[0];
          if (!activeType) return null;
          
          const specs = [
            { label: t('minDeposit'), value: activeType.minDeposit },
            { label: t('pipsSpread'), value: activeType.pipsSpread.split(' ')[0] },
            ...(activeType.swapFree ? [{ label: t('swapFree'), value: 'Yes' }] : []),
            { label: t('marginCall'), value: activeType.marginCall.split(' ')[0] },
            { label: t('leverage'), value: activeType.leverage.split(' ')[0] }
          ];

          return specs.map((spec, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-6 rounded-3xl bg-gradient-to-tl from-[#0d3064] to-[#000308] border border-white/5 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-7 h-7 rounded-full bg-[#7367f038] flex items-center justify-center">
                  <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-[16px] font-medium text-white/90 tracking-wide">{spec.label}</span>
              </div>
              <span className="text-[16px] font-bold text-white tabular-nums">{spec.value}</span>
            </div>
          ));
        })()}
      </div>

      {/* ── Mobile CTA (lg:hidden) ── */}
      <div className="lg:hidden mb-8">
        <button
          className="w-full bg-[#193CB8] hover:bg-[#1534a1] text-white py-4 rounded-2xl text-[18px] font-bold shadow-xl shadow-blue-900/20 transition-all active:scale-[0.98]"
          onClick={() => openModal(selectedType || types[0])}
        >
          {isDemo ? t('openDemoAccount') : t('openLiveAccount')}
        </button>
      </div>


      {/* ── Desktop Header Bar (hidden on mobile) ── */}
      <div className="hidden lg:flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)] mb-6 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-[20px] md:text-[24px] font-extrabold text-[var(--text-color)] tracking-tight leading-none">
            {t('accountTypes')}
          </h1>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#AF6C56] animate-pulse" />
            <span className="bg-[#158B86] text-white text-sm font-medium px-2 rounded-sm">
              {t('news')}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <div className="bg-[var(--segmented-bg)] border border-[var(--border-color)] p-1.5 rounded-full flex items-center h-[40px]">
            <button
              onClick={() => setDashboardType('User')}
              className={`px-4 sm:px-5 py-1.5 rounded-full text-[13px] sm:text-[14px] transition-colors ${
                dashboardType === 'User'
                  ? 'font-semibold bg-[#158B86] text-white shadow-sm'
                  : 'font-medium text-[var(--text-color)] opacity-60 hover:opacity-100'
              }`}
            >
              {t('userDashboard')}
            </button>
            <button
              onClick={() => setDashboardType('IB')}
              className={`px-4 sm:px-5 py-1.5 rounded-full text-[13px] sm:text-[14px] transition-colors ${
                dashboardType === 'IB'
                  ? 'font-semibold bg-[#158B86] text-white shadow-sm'
                  : 'font-medium text-[var(--text-color)] opacity-60 hover:opacity-100'
              }`}
            >
              {t('ibDashboard')}
            </button>
          </div>
        </div>
      </div>

      {/* Breadcrumb (Desktop) */}
      <div className="hidden lg:flex items-center gap-2 text-[15px] mb-10 font-medium shrink-0">
        <Home
          size={18}
          className="text-[#158B86] cursor-pointer hover:opacity-80 transition-colors"
          strokeWidth={2.5}
          onClick={() => onNavigate('Dashboard')}
        />
        <ChevronRight size={16} className="text-gray-500" strokeWidth={2} />
        <span
          className="text-[var(--text-color)] opacity-60 cursor-pointer hover:opacity-100 transition-colors"
          onClick={() => onNavigate('Accounts')}
        >
          {t('breadcrumbAccounts')}
        </span>
        <ChevronRight size={16} className="text-gray-500" strokeWidth={2} />
        <span className="text-[var(--text-color)]">{t('breadcrumbTypes')}</span>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-40">
          <Loader />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <AlertCircle className="text-red-400" size={40} />
          <span className="text-red-400 text-[14px]">{error}</span>
        </div>
      ) : (
        <div className="hidden lg:flex flex-wrap justify-center items-stretch gap-8 pt-2">
          {types.map((type, idx) => (
            <div
              key={type.id}
              className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[12px] p-8 flex flex-col w-full max-w-[280px] transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {/* Number Badge */}
              <div className="w-9 h-9 rounded-[8px] bg-[#158B86] text-white text-[15px] font-extrabold flex items-center justify-center mb-5">
                {idx + 1}
              </div>

              {/* Title + description */}
              <div className="mb-5">
                <h2 className="text-[22px] font-extrabold text-[#158B86] tracking-tight leading-tight">
                  {type.name}
                </h2>
                <p className="text-[var(--text-color)] opacity-60 text-[13px] mt-1">{type.description}</p>
              </div>

              {/* Divider */}
              <div className="h-px bg-[var(--border-color)] mb-5" />

              {/* Feature List */}
              <ul className="flex flex-col gap-3.5 flex-1">
                {[
                  ...(!isDemo ? [`${type.minDeposit} Minimum Deposit`] : []),
                  type.pipsSpread,
                  ...(type.swapFree ? [t('swapFree')] : []),
                  type.marginCall,
                  type.leverage,
                ].map((feat, fi) => (
                  <li key={fi} className="flex items-center gap-2.5">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#158B86"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="9 12 11 14 15 10" />
                    </svg>
                    <span className="text-[var(--text-color)] opacity-70 text-[13px] font-medium">{feat}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className="mt-5 w-full bg-[#158B86] hover:bg-[#117672] active:scale-[0.98] text-white py-3 rounded-[8px] text-[14px] font-semibold transition-all shadow-lg shadow-[#158B86]/10"
                onClick={() => openModal(type)}
              >
                {isDemo ? t('openDemoAccount') : t('openLiveAccount')}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Open Live Account Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[12px] w-full max-w-[400px] mx-4 shadow-2xl animate-fade-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-color)]">
              <h3 className="text-[17px] font-bold text-[var(--text-color)]">
                {isDemo ? 'Open Demo Account' : 'Open Live Account'}
              </h3>
              <button
                onClick={closeModal}
                className="text-[#8e9d9b] hover:text-[var(--text-color)] transition-colors text-[20px] leading-none"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-6 space-y-5">
              {/* Success / Error Message */}
              {modalResult && (
                <div className={`rounded-[8px] px-4 py-3 text-[13px] font-medium ${
                  modalResult.success
                    ? 'bg-[#E6F9F4] border border-[#BFF2E4] text-[#158B86]'
                    : 'bg-[#FEE2E2] border border-[#FECACA] text-[#DC2626]'
                }`}>
                  {modalResult.message}
                </div>
              )}

              {/* Leverage Dropdown — hide after success */}
              {!modalResult?.success && (
                <>
                  {/* Deposit Dropdown — demo only */}
                  {isDemo && (
                    <div className="flex flex-col gap-2">
                      <label className="text-[14px] font-bold text-[var(--text-color)]">Deposit</label>
                      <div className="relative">
                        <select
                          value={selectedDeposit}
                          onChange={(e) => setSelectedDeposit(e.target.value)}
                          disabled={proceeding}
                          className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] px-4 py-3 text-[var(--text-color)] outline-none focus:border-[#158B86]/60 transition-colors appearance-none font-medium text-[14px] disabled:opacity-50"
                        >
                          <option value="" disabled>Select deposit</option>
                          {DEPOSIT_OPTIONS.map((dep) => (
                            <option key={dep} value={dep}>{dep}</option>
                          ))}
                        </select>
                        <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#8e9d9b]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold text-[var(--text-color)]">Leverage</label>
                    <div className="relative">
                      <select
                        value={selectedLeverage}
                        onChange={(e) => setSelectedLeverage(e.target.value)}
                        disabled={proceeding}
                        className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] px-4 py-3 text-[var(--text-color)] outline-none focus:border-[#158B86]/60 transition-colors appearance-none font-medium text-[14px] disabled:opacity-50"
                      >
                        <option value="" disabled>Select Leverage</option>
                        {LEVERAGE_OPTIONS.map((lev) => (
                          <option key={lev} value={lev}>{lev}</option>
                        ))}
                      </select>
                      <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#8e9d9b]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center gap-3 px-6 pb-6">
              {!modalResult?.success && (
                <button
                  onClick={handleProceed}
                  disabled={!selectedLeverage || (isDemo && !selectedDeposit) || proceeding}
                  className="flex-1 bg-[#158B86] hover:bg-[#117672] disabled:opacity-40 disabled:cursor-not-allowed text-white py-3 rounded-[8px] text-[14px] font-bold transition-all flex items-center justify-center gap-2"
                >
                  {proceeding && (
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                  )}
                  {proceeding ? 'Processing...' : 'PROCEED'}
                </button>
              )}
              <button
                onClick={closeModal}
                className="flex-1 bg-[#C0392B] hover:bg-[#a93226] text-white py-3 rounded-[8px] text-[14px] font-bold transition-all"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountTypesPage;
