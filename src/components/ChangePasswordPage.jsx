import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const TRANSLATIONS = {
  EN: {
    changePassword: "Change Password",
    description: "Change Your Password to Keep Your Account Safe and Secure",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm Password",
    passwordRequirements: "Password Requirements:",
    req1: "Minimum 8 characters long - the more, the better",
    req2: "At least one lowercase character and uppercase character",
    req3: "At least one number and one special character",
    buttonText: "Change Password"
  },
  HI: {
    changePassword: "पासवर्ड बदलें",
    description: "अपने खाते को सुरक्षित रखने के लिए अपना पासवर्ड बदलें",
    currentPassword: "वर्तमान पासवर्ड",
    newPassword: "नया पासवर्ड",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    passwordRequirements: "पासवर्ड आवश्यकताएँ:",
    req1: "न्यूनतम 8 अक्षर लंबा - जितना अधिक, उतना बेहतर",
    req2: "कम से कम एक छोटा अक्षर और एक बड़ा अक्षर",
    req3: "कम से कम एक नंबर और एक विशेष अक्षर",
    buttonText: "पासवर्ड बदलें"
  }
};

const ChangePasswordPage = ({ onNavigate }) => {
  const { language } = useLanguage();
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  const [formData, setFormData] = useState({ current: '', new: '', confirm: '' });

  const t = (key) => TRANSLATIONS[language]?.[key] || key;

  const toggleVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="block lg:hidden min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
      {/* ── Header ── */}
      <div className="flex items-center gap-3 px-4 py-4 sticky top-0 bg-[var(--bg-color)] z-10 border-b border-[var(--border-color)]">
        <button onClick={() => onNavigate('Settings')} className="p-1 -ml-1 transition-colors">
          <ArrowLeft size={24} className="text-[#3B82F6]" strokeWidth={2.5} />
        </button>
        <h1 className="text-[20px] font-bold text-[#3B82F6]">{t('changePassword')}</h1>
      </div>

      <div className="px-4 py-6 space-y-8">
        {/* Description */}
        <p className="text-[15px] text-white/70 leading-relaxed max-w-[90%]">
          {t('description')}
        </p>

        {/* Form */}
        <div className="space-y-4">
          {/* Current Password */}
          <div className="relative">
            <input 
              type={showPasswords.current ? "text" : "password"}
              name="current"
              value={formData.current}
              onChange={handleInputChange}
              placeholder={t('currentPassword')}
              className="w-full bg-[#1a1a1e] border border-white/5 rounded-2xl px-5 py-4 text-[15px] text-white placeholder:text-white/20 outline-none focus:border-[#3B82F6]/50 transition-all shadow-sm"
            />
            <button 
              onClick={() => toggleVisibility('current')}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 transition-colors"
            >
              {showPasswords.current ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* New Password */}
          <div className="relative">
            <input 
              type={showPasswords.new ? "text" : "password"}
              name="new"
              value={formData.new}
              onChange={handleInputChange}
              placeholder={t('newPassword')}
              className="w-full bg-[#1a1a1e] border border-white/5 rounded-2xl px-5 py-4 text-[15px] text-white placeholder:text-white/20 outline-none focus:border-[#3B82F6]/50 transition-all shadow-sm"
            />
            <button 
              onClick={() => toggleVisibility('new')}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 transition-colors"
            >
              {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input 
              type={showPasswords.confirm ? "text" : "password"}
              name="confirm"
              value={formData.confirm}
              onChange={handleInputChange}
              placeholder={t('confirmPassword')}
              className="w-full bg-[#1a1a1e] border border-white/5 rounded-2xl px-5 py-4 text-[15px] text-white placeholder:text-white/20 outline-none focus:border-[#3B82F6]/50 transition-all shadow-sm"
            />
            <button 
              onClick={() => toggleVisibility('confirm')}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 transition-colors"
            >
              {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Requirements */}
        <div className="space-y-4 pt-2">
          <h3 className="text-[17px] font-bold text-white">{t('passwordRequirements')}</h3>
          <ul className="space-y-3">
            {[t('req1'), t('req2'), t('req3')].map((req, idx) => (
              <li key={idx} className="flex items-start gap-3 text-[14px] text-white/40">
                <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-2 shrink-0" />
                <span className="leading-tight">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <button 
            className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-4 rounded-2xl text-[16px] font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
          >
            {t('buttonText')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
