import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, User, Mail, Phone, Globe, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { endpoints } from '../api/endpoints';
import logo from '../assets/logom.png';
import AuthBackground from './AuthBackground';

const SignupPage = ({ onNavigate }) => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countries, setCountries] = useState([]);
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    referralCode: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch Countries on Mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(endpoints.getAllCountry);
        const data = await response.json();
        if (data.success) {
          setCountries(data.data || []);
        }
      } catch (err) {
        console.error('Error fetching countries:', err);
      }
    };
    fetchCountries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    // Basic Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(endpoints.userRegister, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          country: formData.country,
          phoneNumber: formData.mobile,
          password: formData.password,
          referralCode: formData.referralCode,
          platformName: 'user' // Changed to match live site
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMessage('Account created successfully!');
        // Automatically login on successful signup
        const token = data.data?.token || data.token;
        const userData = data.data?.user || data.user || { email: formData.email };
        const userId = data.data?._id || data.user?._id || data._id;
        
        setTimeout(() => {
          login(token, userData, userId);
          onNavigate('Dashboard');
        }, 1500);
      } else {
        setError(data.error?.message || data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Connection failed. Please check your internet and try again.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden">
      <AuthBackground />
      <div className="auth-card max-w-[650px] relative z-10 my-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Neptune Logo" className="h-10 object-contain" />
        </div>

        <div className="auth-page">
          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100 text-center">
                {error}
              </div>
            )}
            {successMessage && (
              <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm font-medium border border-green-100 text-center flex items-center justify-center gap-2">
                <CheckCircle2 size={18} />
                {successMessage}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div className="space-y-1">
                <label className="text-[14px] font-semibold text-[#374151]">First Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name" 
                    className="auth-input w-full px-4 py-2.5 rounded-[12px] text-[14px]"
                    required
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className="space-y-1">
                <label className="text-[14px] font-semibold text-[#374151]">Last Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name" 
                    className="auth-input w-full px-4 py-2.5 rounded-[12px] text-[14px]"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1 md:col-span-2">
                <label className="text-[14px] font-semibold text-[#374151]">Email</label>
                <div className="relative">
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email-id" 
                    className="auth-input w-full px-4 py-2.5 rounded-[12px] text-[14px]"
                    required
                  />
                </div>
              </div>

              {/* Country */}
              <div className="space-y-1">
                <label className="text-[14px] font-semibold text-[#374151]">Select Country</label>
                <div className="relative">
                  <select 
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="auth-input w-full px-4 py-2.5 rounded-[12px] text-[14px] appearance-none bg-white"
                    required
                  >
                    <option value="">Select Country</option>
                    {countries.map((c) => (
                      <option key={c.countryId || c.countryName} value={c.countryName}>
                        {c.countryName}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={18} />
                </div>
              </div>

              {/* Mobile */}
              <div className="space-y-1">
                <label className="text-[14px] font-semibold text-[#374151]">Mobile No.</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Mobile No." 
                    className="auth-input w-full px-4 py-2.5 rounded-[12px] text-[14px]"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1 md:col-span-2">
                <label className="text-[14px] font-semibold text-[#374151]">New Password</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#158B86]">
                    <Lock size={20} />
                  </span>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="New Password" 
                    className="auth-input w-full pl-12 pr-12 py-2.5 rounded-[12px] text-[14px]"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1 md:col-span-2">
                <label className="text-[14px] font-semibold text-[#374151]">Confirm Password</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#158B86]">
                    <Lock size={20} />
                  </span>
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password" 
                    className="auth-input w-full pl-12 pr-12 py-2.5 rounded-[12px] text-[14px]"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Referral Code */}
              <div className="space-y-1 md:col-span-2">
                <label className="text-[14px] font-semibold text-[#374151]">Referral Code (Optional)</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="referralCode"
                    value={formData.referralCode}
                    onChange={handleChange}
                    placeholder="Referral Code" 
                    className="auth-input w-full px-4 py-2.5 rounded-[12px] text-[14px]"
                  />
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-center gap-2 pt-2">
              <input type="checkbox" className="w-4 h-4 accent-[#158B86] cursor-pointer" id="terms" required />
              <label htmlFor="terms" className="text-[13px] text-[#4B5563] cursor-pointer">
                Yes, I agreed to the <a href="#" className="primary-text underline font-semibold">Terms & Conditions</a>
              </label>
            </div>

            {/* Submit */}
            <button 
              type="submit" 
              disabled={loading}
              className="primary-btn w-full py-3 text-white font-bold text-[16px] rounded-[12px] mt-6 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Open Account'
              )}
            </button>

            {/* Link */}
            <p className="text-center text-[14px] text-[#4B5563] mt-6">
              Already have an account? <button type="button" onClick={() => onNavigate('Login')} className="primary-text font-bold underline ml-1">Sign In</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

