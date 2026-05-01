import React, { useState } from 'react';
import { ArrowLeft, X, CreditCard, Plus } from 'lucide-react';

const PaymentDetailsPage = ({ onNavigate }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    bankName: '',
    accountNumber: '',
    branchAddress: '',
    ifscCode: '',
    accountHolderName: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    if (isAdding) {
      setIsAdding(false);
    } else {
      onNavigate('Settings');
    }
  };

  return (
    <div className="block lg:hidden min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
      {/* ── Header ── */}
      <div className="flex items-center gap-3 px-4 py-4 sticky top-0 bg-[var(--bg-color)] z-10 border-b border-[var(--border-color)]">
        <button onClick={handleBack} className="p-1 -ml-1 transition-colors">
          <ArrowLeft size={24} className="text-[#3B82F6]" strokeWidth={2.5} />
        </button>
        <h1 className="text-[20px] font-bold text-[#3B82F6]">Payment Details</h1>
      </div>

      <div className="px-4 py-2">
        {!isAdding ? (
          /* ── List View ── */
          <div className="space-y-6">
            <div className="flex justify-end">
              <button 
                onClick={() => setIsAdding(true)}
                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-5 py-2.5 rounded-lg text-[14px] font-bold transition-all active:scale-[0.98] shadow-lg shadow-blue-500/20"
              >
                Add Bank
              </button>
            </div>
            
            <div className="mt-10">
              <p className="text-white/30 text-[15px]">No bank added yet.</p>
            </div>
          </div>
        ) : (
          /* ── Add Bank Form View ── */
          <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden animate-fade-in">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[17px] font-bold text-[#3B82F6]">Add Bank</h2>
                <button onClick={() => setIsAdding(false)} className="text-white/40 hover:text-white transition-colors">
                  <X size={22} />
                </button>
              </div>

              <div className="space-y-3">
                {/* Bank Name */}
                <div className="space-y-1">
                  <label className="text-[12px] font-medium text-white flex items-center gap-1">
                    <span className="text-red-500">*</span> Bank Name
                  </label>
                  <input 
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    placeholder="Enter bank name"
                    className="w-full bg-[#252525] border border-white/10 rounded-lg px-4 py-2 text-[13px] text-white placeholder:text-white/20 outline-none focus:border-[#3B82F6]/50 transition-all"
                  />
                </div>

                {/* Account Number */}
                <div className="space-y-1">
                  <label className="text-[12px] font-medium text-white flex items-center gap-1">
                    <span className="text-red-500">*</span> Account Number
                  </label>
                  <input 
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    placeholder="Enter account number"
                    className="w-full bg-[#252525] border border-white/10 rounded-lg px-4 py-2 text-[13px] text-white placeholder:text-white/20 outline-none focus:border-[#3B82F6]/50 transition-all"
                  />
                </div>

                {/* Branch Address */}
                <div className="space-y-1">
                  <label className="text-[12px] font-medium text-white flex items-center gap-1">
                    <span className="text-red-500">*</span> Branch Address
                  </label>
                  <input 
                    type="text"
                    name="branchAddress"
                    value={formData.branchAddress}
                    onChange={handleInputChange}
                    placeholder="Enter branch address"
                    className="w-full bg-[#252525] border border-white/10 rounded-lg px-4 py-2 text-[13px] text-white placeholder:text-white/20 outline-none focus:border-[#3B82F6]/50 transition-all"
                  />
                </div>

                {/* IFSC Code */}
                <div className="space-y-1">
                  <label className="text-[12px] font-medium text-white flex items-center gap-1">
                    <span className="text-red-500">*</span> IFSC Code
                  </label>
                  <input 
                    type="text"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleInputChange}
                    placeholder="IFSC code"
                    className="w-full bg-[#252525] border border-white/10 rounded-lg px-4 py-2 text-[13px] text-white placeholder:text-white/20 outline-none focus:border-[#3B82F6]/50 transition-all"
                  />
                </div>

                {/* Account Holder Name */}
                <div className="space-y-1">
                  <label className="text-[12px] font-medium text-white flex items-center gap-1">
                    <span className="text-red-500">*</span> Account Holder Name
                  </label>
                  <input 
                    type="text"
                    name="accountHolderName"
                    value={formData.accountHolderName}
                    onChange={handleInputChange}
                    placeholder="Enter account holder name"
                    className="w-full bg-[#252525] border border-white/10 rounded-lg px-4 py-2 text-[13px] text-white placeholder:text-white/20 outline-none focus:border-[#3B82F6]/50 transition-all"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-1">
                  <button 
                    onClick={() => setIsAdding(false)}
                    className="flex-1 bg-[#22C55E] hover:bg-[#16A34A] text-white py-2.5 rounded-lg text-[14px] font-bold transition-all active:scale-[0.98] shadow-lg shadow-green-500/10"
                  >
                    Cancel
                  </button>
                  <button 
                    className="flex-1 bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2.5 rounded-lg text-[14px] font-bold transition-all active:scale-[0.98] shadow-lg shadow-blue-500/10"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentDetailsPage;
