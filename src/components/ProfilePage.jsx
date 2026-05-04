import React, { useState, useEffect, useRef } from 'react';
import { Home, ChevronRight, CheckCircle2, Lock, Plus, Edit2, Trash2, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const TRANSLATIONS = {
  EN: {
    profile: "Profile",
    news: "News",
    userDashboard: "User Dashboard",
    ibDashboard: "IB Dashboard",
    personalInfo: "Personal Information",
    security: "Security",
    paymentDetails: "Payment Details",
    kycVerified: "KYC Verified",
    kycMessage: "Your profile details are locked because your KYC has been verified. Please contact support if you need to make changes.",
    uploadPhoto: "Upload new photo",
    photoRequirement: "Allowed JPG, JPEG or PNG. Max size of 800KB",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    mobileNo: "Mobile No.",
    dob: "Date Of Birth",
    city: "City",
    experienceIB: "Experience As IB",
    country: "Country",
    changePassword: "Change Password",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm Password",
    passwordRequirements: "Password Requirements:",
    req1: "Minimum 8 characters long - the more, the better",
    req2: "At least one lowercase character and uppercase character",
    req3: "At least one number and one special character",
    saveChanges: "Save changes",
    twoStepVerif: "Two-steps verification",
    twoStepDesc: "Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to log in.",
    enable2FA: "Enable Two-Factor Authentication",
    transVerif: "Transaction Verification",
    transVerifDesc: "Require verification for specific transaction types.",
    walletToAccount: "Wallet to Account",
    accountToAccount: "Account to Account",
    accountToWallet: "Account to Wallet",
    withdraw: "Withdraw",
    savedBanks: "Saved Banks",
    addBank: "Add Bank",
  },
  HI: {
    profile: "प्रोफाइल",
    news: "समाचार",
    userDashboard: "यूजर डैशबोर्ड",
    ibDashboard: "आईबी डैशबोर्ड",
    personalInfo: "व्यक्तिगत जानकारी",
    security: "सुरक्षा",
    paymentDetails: "भुगतान विवरण",
    kycVerified: "KYC सत्यापित",
    kycMessage: "आपका प्रोफाइल विवरण लॉक कर दिया गया है क्योंकि आपका KYC सत्यापित हो चुका है। यदि आपको परिवर्तन करने की आवश्यकता है तो कृपया सहायता टीम से संपर्क करें।",
    uploadPhoto: "नई फोटो अपलोड करें",
    photoRequirement: "JPG, JPEG या PNG की अनुमति है। अधिकतम आकार 800KB",
    firstName: "पहला नाम",
    lastName: "अंतिम नाम",
    email: "ईमेल",
    mobileNo: "मोबाइल नंबर",
    dob: "जन्म तिथि",
    city: "शहर",
    experienceIB: "IB के रूप में अनुभव",
    country: "देश",
    changePassword: "पासवर्ड बदलें",
    currentPassword: "वर्तमान पासवर्ड",
    newPassword: "नया पासवर्ड",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    passwordRequirements: "पासवर्ड आवश्यकताएँ:",
    req1: "न्यूनतम 8 अक्षर लंबा - जितना अधिक, उतना बेहतर",
    req2: "कम से कम एक छोटा अक्षर और एक बड़ा अक्षर",
    req3: "कम से कम एक नंबर और एक विशेष अक्षर",
    saveChanges: "परिवर्तन सहेजें",
    twoStepVerif: "दो-चरण सत्यापन",
    twoStepDesc: "दो-कारक प्रमाणीकरण लॉगिन करने के लिए केवल पासवर्ड से अधिक की आवश्यकता के द्वारा आपके खाते में सुरक्षा की एक अतिरिक्त परत जोड़ता है।",
    enable2FA: "दो-कारक प्रमाणीकरण सक्षम करें",
    transVerif: "लेनदेन सत्यापन",
    transVerifDesc: "विशिष्ट लेनदेन प्रकारों के लिए सत्यापन की आवश्यकता है।",
    walletToAccount: "वॉलेट से अकाउंट",
    accountToAccount: "अकाउंट से अकाउंट",
    accountToWallet: "अकाउंट से वॉलेट",
    withdraw: "निकासी",
    savedBanks: "सहेजे गए बैंक",
    addBank: "बैंक जोड़ें",
  }
};

const ProfilePage = ({ onNavigate }) => {
  const { language } = useLanguage();
  const { token, userId, user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [dashboardType, setDashboardType] = useState('User');
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  const [verifications, setVerifications] = useState({
    walletToAccount: true,
    accountToAccount: true,
    accountToWallet: true,
    withdraw: true
  });

  // Live user profile state
  const [profileData, setProfileData] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId || !token) return;
      setProfileLoading(true);
      setProfileError(null);
      try {
        const res = await fetch(`/mt5-api/api/UserMaster/User-GetById/${userId}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        // API may return the object directly or wrapped in data/result
        let data = json?.data ?? json?.result ?? json;
        if (Array.isArray(data)) data = data[0];
        
        // Merge with local user data if server data is missing the image
        if (data && !data.profileImage && user?.profileImage) {
          data.profileImage = user.profileImage;
        }
        
        setProfileData(data);
        
        // Sync global user state if it's missing image but server has it
        if (data?.profileImage && !user?.profileImage) {
           updateUser({ profileImage: data.profileImage });
        }
      } catch (err) {
        console.error('Profile fetch error:', err);
        setProfileError(err.message);
      } finally {
        setProfileLoading(false);
      }
    };
    fetchProfile();
  }, [userId, token]);

  const t = (key) => TRANSLATIONS[language]?.[key] || key;

  const togglePassword = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const toggleVerif = (field) => {
    setVerifications(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check size (800KB)
    if (file.size > 800 * 1024) {
      alert("Photo size should be less than 800KB");
      return;
    }

    setUploading(true);
    
    const reader = new FileReader();
    reader.onloadend = async () => {
      const imageData = reader.result;
      
      // Update UI immediately for best UX
      setProfileData(prev => ({
        ...prev,
        profileImage: imageData
      }));
      updateUser({ profileImage: imageData });

      try {
        const res = await fetch(`/mt5-api/api/UserMaster/Update-User`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            userId: userId,
            profileImage: imageData
          })
        });

        if (res.ok) {
          console.log('Profile image saved to server successfully');
        } else {
          console.warn('Profile image failed to save to server, using local cache instead');
        }
      } catch (err) {
        console.error('Server sync error:', err);
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Helper: get value from profileData with fallback
  const pv = (key, fallback = '') => profileData?.[key] ?? fallback;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        if (profileLoading) {
          return (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="animate-spin text-[#158B86]" size={36} />
              <span className="text-[#8e9d9b] text-[14px]">Loading profile...</span>
            </div>
          );
        }
        if (profileError) {
          return (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <AlertCircle className="text-red-400" size={36} />
              <span className="text-red-400 text-[14px]">Failed to load profile: {profileError}</span>
            </div>
          );
        }
        return (
          <div className="space-y-8">
            {/* KYC Alert */}
            <div className="bg-[#E6F9F4] border border-[#BFF2E4] rounded-[12px] p-4 flex items-start gap-3">
              <CheckCircle2 className="text-[#158B86] shrink-0 mt-0.5" size={20} />
              <div className="flex flex-col">
                <span className="text-[#158B86] font-bold text-[15px]">{t('kycVerified')}</span>
                <span className="text-[#158B86] opacity-80 text-[13px] leading-relaxed">
                  {t('kycMessage')}
                </span>
              </div>
            </div>

            {/* Photo Section */}
            <div className="flex items-center gap-6">
              <div className="w-[100px] h-[100px] rounded-[12px] bg-[#1A1A1A] overflow-hidden border border-[var(--border-color)]">
                <img
                  src={pv('profileImage') || user?.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${pv('firstName', 'User')}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="bg-[#158B86] hover:bg-[#117672] text-white px-6 py-2.5 rounded-[8px] text-[14px] font-bold transition-all w-fit flex items-center gap-2"
                >
                  {uploading && <Loader2 size={16} className="animate-spin" />}
                  {t('uploadPhoto')}
                </button>
                <span className="text-[#8e9d9b] text-[12px]">{t('photoRequirement')}</span>
              </div>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-bold text-[var(--text-color)]">{t('firstName')}</label>
                <input type="text" readOnly value={pv('firstName')} className="bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] px-4 py-3 text-[var(--text-color)] opacity-60 cursor-not-allowed outline-none" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-bold text-[var(--text-color)]">{t('lastName')}</label>
                <input type="text" readOnly value={pv('lastName')} className="bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] px-4 py-3 text-[var(--text-color)] opacity-60 cursor-not-allowed outline-none" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-bold text-[var(--text-color)]">{t('email')}</label>
                <input type="email" readOnly value={pv('email')} className="bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] px-4 py-3 text-[var(--text-color)] opacity-60 cursor-not-allowed outline-none" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-bold text-[var(--text-color)]">{t('mobileNo')}</label>
                <input type="text" readOnly value={pv('mobile') || pv('mobileNo') || pv('phoneNumber')} placeholder="Mobile No." className="bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] px-4 py-3 text-[var(--text-color)] opacity-60 cursor-not-allowed outline-none" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-bold text-[var(--text-color)]">{t('dob')}</label>
                <input type="text" readOnly value={pv('dateOfBirth') || pv('dob')} className="bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] px-4 py-3 text-[var(--text-color)] opacity-60 cursor-not-allowed outline-none" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-bold text-[var(--text-color)]">{t('city')}</label>
                <input type="text" readOnly value={pv('city')} className="bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] px-4 py-3 text-[var(--text-color)] opacity-60 cursor-not-allowed outline-none" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-bold text-[var(--text-color)]">{t('experienceIB')}</label>
                <input type="text" readOnly value={pv('experienceAsIB') || pv('ibExperience') || pv('experience')} className="bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] px-4 py-3 text-[var(--text-color)] opacity-60 cursor-not-allowed outline-none" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-bold text-[var(--text-color)]">{t('country')}</label>
                <input type="text" readOnly value={pv('country') || pv('countryName')} className="bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] px-4 py-3 text-[var(--text-color)] opacity-60 cursor-not-allowed outline-none" />
              </div>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Change Password Card */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[12px] p-8 shadow-sm">
              <h3 className="text-[18px] font-bold text-[var(--text-color)] mb-8">{t('changePassword')}</h3>
              
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-bold text-[var(--text-color)]">{t('currentPassword')}</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#158B86]" size={18} />
                    <input 
                      type={showPasswords.current ? "text" : "password"} 
                      placeholder={t('currentPassword')} 
                      className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] pl-12 pr-12 py-3 text-[var(--text-color)] outline-none focus:border-[#158B86]/50 transition-colors"
                    />
                    <button onClick={() => togglePassword('current')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8e9d9b] hover:text-[var(--text-color)] transition-colors">
                      {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold text-[var(--text-color)]">{t('newPassword')}</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#158B86]" size={18} />
                      <input 
                        type={showPasswords.new ? "text" : "password"} 
                        placeholder={t('newPassword')} 
                        className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] pl-12 pr-12 py-3 text-[var(--text-color)] outline-none focus:border-[#158B86]/50 transition-colors"
                      />
                      <button onClick={() => togglePassword('new')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8e9d9b] hover:text-[var(--text-color)] transition-colors">
                        {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold text-[var(--text-color)]">{t('confirmPassword')}</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#158B86]" size={18} />
                      <input 
                        type={showPasswords.confirm ? "text" : "password"} 
                        placeholder={t('confirmPassword')} 
                        className="w-full bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[8px] pl-12 pr-12 py-3 text-[var(--text-color)] outline-none focus:border-[#158B86]/50 transition-colors"
                      />
                      <button onClick={() => togglePassword('confirm')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8e9d9b] hover:text-[var(--text-color)] transition-colors">
                        {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[14px] font-bold text-[var(--text-color)]">{t('passwordRequirements')}</h4>
                  <ul className="space-y-2">
                    {[t('req1'), t('req2'), t('req3')].map((req, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[13px] text-[#8e9d9b]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#158B86]" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="bg-[#158B86] hover:bg-[#117672] text-white px-8 py-3 rounded-[8px] text-[14px] font-bold transition-all w-fit mt-4">
                  {t('saveChanges')}
                </button>
              </div>
            </div>

            {/* Verification Settings */}
            <div className="space-y-8">
              {/* 2FA Card */}
              <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[12px] p-8 shadow-sm">
                <h3 className="text-[18px] font-bold text-[var(--text-color)] mb-4">{t('twoStepVerif')}</h3>
                <p className="text-[#8e9d9b] text-[14px] leading-relaxed mb-8">
                  {t('twoStepDesc')}
                </p>
                <button className="bg-[#158B86] hover:bg-[#117672] text-white px-8 py-3 rounded-[8px] text-[14px] font-bold transition-all">
                  {t('enable2FA')}
                </button>
              </div>

              {/* Transaction Verif Card */}
              <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[12px] p-8 shadow-sm">
                <h3 className="text-[18px] font-bold text-[var(--text-color)] mb-2">{t('transVerif')}</h3>
                <p className="text-[#8e9d9b] text-[13px] mb-8">{t('transVerifDesc')}</p>
                
                <div className="space-y-6">
                  {[
                    { id: 'walletToAccount', label: t('walletToAccount') },
                    { id: 'accountToAccount', label: t('accountToAccount') },
                    { id: 'accountToWallet', label: t('accountToWallet') },
                    { id: 'withdraw', label: t('withdraw') }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <span className="text-[14px] font-bold text-[var(--text-color)]">{item.label}</span>
                      <button 
                        onClick={() => toggleVerif(item.id)}
                        className={`w-12 h-6 rounded-full transition-all relative ${verifications[item.id] ? 'bg-[#158B86]' : 'bg-[#1A1A1A] border border-[var(--border-color)]'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${verifications[item.id] ? 'right-1 bg-white' : 'left-1 bg-[#8e9d9b]'}`} />
                        <span className={`absolute ${verifications[item.id] ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 text-[8px] font-bold text-white uppercase`}>
                          {verifications[item.id] ? 'on' : 'off'}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'payment':
        return (
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[12px] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[18px] font-bold text-[var(--text-color)]">{t('savedBanks')}</h3>
              <button className="bg-[#158B86] hover:bg-[#117672] text-white px-6 py-2 rounded-[6px] text-[13px] font-bold transition-all flex items-center gap-2">
                <Plus size={16} />
                {t('addBank')}
              </button>
            </div>

            <div className="space-y-4">
              {[
                { name: 'demo 1', bank: 'demo test 1', account: '123456' },
                { name: 'demo', bank: 'demo test', account: '12345678910' }
              ].map((bank, idx) => (
                <div key={idx} className="flex items-center justify-between p-6 bg-[var(--sub-bg)] border border-[var(--border-color)] rounded-[12px] hover:border-[#158B86]/30 transition-all group">
                  <div className="flex flex-col gap-1">
                    <span className="text-[15px] font-bold text-[var(--text-color)]">{bank.name}</span>
                    <span className="text-[13px] text-[#8e9d9b] font-medium">{bank.bank}</span>
                    <span className="text-[12px] text-[#8e9d9b] opacity-60 font-mono tracking-wider">{bank.account}</span>
                  </div>
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-[#158B86] hover:bg-[#158B86]/10 rounded-full transition-all">
                      <Edit2 size={18} />
                    </button>
                    <button className="p-2 text-[#FF4D4F] hover:bg-[#FF4D4F]/10 rounded-full transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col w-full animate-fade-in pb-20">
      {/* ── Mobile Back Header (lg:hidden) ── */}
      <div className="flex lg:hidden items-center gap-3 py-4 border-b border-[var(--border-color)] mb-6 -mx-4 px-4 bg-[var(--bg-color)] sticky top-0 z-[100]">
        <button onClick={() => onNavigate('Settings')} className="p-1 -ml-1 transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <h1 className="text-[20px] font-bold text-[#3B82F6]">{t('profile')}</h1>
      </div>

      {/* Top Header Bar (Desktop only) */}
      <div className="hidden lg:flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)] mb-6 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-[20px] md:text-[24px] font-extrabold text-[var(--text-color)] tracking-tight leading-none">{t('profile')}</h1>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#AF6C56] animate-pulse" />
            <span className="bg-[#158B86] text-white text-sm font-medium px-2 rounded-sm">{t('news')}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="bg-[var(--sub-bg)] border border-[var(--border-color)] p-1.5 rounded-full flex items-center h-[40px]">
                <button onClick={() => { setDashboardType('User'); onNavigate('Dashboard'); }} className={`px-4 sm:px-5 py-1.5 rounded-full text-[13px] sm:text-[14px] transition-colors ${dashboardType === 'User' ? 'font-semibold bg-[#158B86] text-white shadow-sm' : 'font-medium text-[#8e9d9b] hover:text-[var(--text-color)]'}`}>{t('userDashboard')}</button>
                <button onClick={() => { setDashboardType('IB'); onNavigate('IB_Dashboard'); }}   className={`px-4 sm:px-5 py-1.5 rounded-full text-[13px] sm:text-[14px] transition-colors ${dashboardType === 'IB'   ? 'font-semibold bg-[#158B86] text-white shadow-sm' : 'font-medium text-[#8e9d9b] hover:text-[var(--text-color)]'}`}>{t('ibDashboard')}</button>
            </div>
        </div>
      </div>

      {/* Breadcrumb (Desktop only) */}
      <div className="hidden lg:flex items-center gap-2 text-[15px] mb-8 font-medium shrink-0">
        <Home size={18} className="text-[#158B86] cursor-pointer hover:opacity-80 transition-colors" strokeWidth={2.5} onClick={() => onNavigate('Dashboard')} />
        <ChevronRight size={16} className="text-gray-500" strokeWidth={2} />
        <span className="text-[var(--text-color)]">{t('profile')}</span>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-8 mb-8 border-b border-[var(--border-color)] px-2">
        {[
          { id: 'personal', label: t('personalInfo') },
          { id: 'security', label: t('security') },
          { id: 'payment', label: t('paymentDetails') }
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-[14px] md:text-[15px] font-bold transition-all relative ${activeTab === tab.id ? 'text-[#158B86]' : 'text-[#8e9d9b] hover:text-[var(--text-color)]'}`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#158B86] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[16px] p-6 md:p-10 shadow-sm min-h-[600px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProfilePage;
