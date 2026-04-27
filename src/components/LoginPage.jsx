import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/logom.png';
import AuthBackground from './AuthBackground';
import { endpoints } from '../api/endpoints';

const LoginPage = ({ onNavigate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch(endpoints.userLogin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          password,
          platformName: 'user' // Changed to match live site
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMessage(data.message || 'Logged in successfully.');
        const token = data.data?.access_token || data.access_token || data.token;
        const userData = data.data || data.user || { email };
        const userId = data.data?._id || data.user?._id || data._id;
        
        // Brief delay to show success message before redirecting
        setTimeout(() => {
          login(token, userData, userId);
          onNavigate('Dashboard');
        }, 1500);
      } else {
        setError(data.error?.message || data.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('Connection failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden">
      <AuthBackground />
      <div className="auth-card max-w-[450px] relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <img src={logo} alt="Neptune Logo" className="h-10 object-contain" />
        </div>

        <div className="auth-page">
          <form onSubmit={handleSubmit} className="space-y-6">
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
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[14px] font-bold text-[#374151]">Email</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#158B86]">
                  <Mail size={20} />
                </span>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email-id" 
                  className="auth-input w-full pl-12 pr-4 py-3 rounded-[14px] text-[15px]"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[14px] font-bold text-[#374151]">Password</label>
                <button type="button" className="text-[13px] primary-text font-bold hover:underline">Forgot Password?</button>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#158B86]">
                  <Lock size={20} />
                </span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password" 
                  className="auth-input w-full pl-12 pr-12 py-3 rounded-[14px] text-[15px]"
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

            {/* Submit */}
            <button 
              type="submit" 
              disabled={loading}
              className="primary-btn w-full py-3.5 text-white font-bold text-[17px] rounded-[14px] mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Login'
              )}
            </button>

            {/* Link */}
            <p className="text-center text-[14px] text-[#4B5563] mt-8">
              Don't have an account? <button type="button" onClick={() => onNavigate('Signup')} className="primary-text font-bold underline ml-1">Sign Up</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
