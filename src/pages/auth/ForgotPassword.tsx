import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, KeyRound, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { API_URL } from '../../api';

export default function ForgotPassword() {
  const [step, setStep] = useState<1 | 2 | 3>(() => {
    const saved = localStorage.getItem('forgot_pwd_step');
    return saved ? parseInt(saved) as 1 | 2 | 3 : 1;
  });
  const [email, setEmail] = useState(() => {
    return localStorage.getItem('forgot_pwd_email') || '';
  });
  const [otp, setOtp] = useState(['', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/auth/forgot-password/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('OTP sent successfully!');
        setStep(2);
        localStorage.setItem('forgot_pwd_step', '2');
        localStorage.setItem('forgot_pwd_email', email);
      } else {
        toast.error(data.detail || 'Failed to send OTP.');
      }
    } catch (err) {
      toast.error('Unable to connect. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length !== 4) {
      toast.error('Please enter all 4 digits');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/verify-otp/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpString }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('OTP verified successfully!');
        setStep(3);
        localStorage.setItem('forgot_pwd_step', '3');
      } else {
        toast.error(data.detail || 'Invalid OTP.');
      }
    } catch (err) {
      toast.error('Unable to connect. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/reset-password/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Password reset successfully!');
        localStorage.removeItem('forgot_pwd_step');
        localStorage.removeItem('forgot_pwd_email');
        navigate('/student/signin'); 
      } else {
        toast.error(data.detail || 'Failed to reset password.');
      }
    } catch (err) {
      toast.error('Unable to connect. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value !== '' && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // If current is empty, focus previous and clear it
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        const prevInput = document.getElementById(`otp-${index - 1}`);
        prevInput?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (!pastedData) return;
    
    // Only take the first 4 digits
    const pastedDigits = pastedData.replace(/\D/g, '').slice(0, 4).split('');
    if (pastedDigits.length === 0) return;
    
    const newOtp = [...otp];
    pastedDigits.forEach((digit, index) => {
      if (index < 4) newOtp[index] = digit;
    });
    setOtp(newOtp);
    
    // Focus the next empty input, or the last one if full
    const nextIndex = Math.min(pastedDigits.length, 3);
    const nextInput = document.getElementById(`otp-${nextIndex}`);
    nextInput?.focus();
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-sans p-4 bg-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap');
        
        .tessellation-bg {
            position: fixed;
            inset: 0;
            background-image: 
                linear-gradient(30deg, #f5f5f5 12%, transparent 12.5%, transparent 87%, #f5f5f5 87.5%, #f5f5f5),
                linear-gradient(150deg, #f5f5f5 12%, transparent 12.5%, transparent 87%, #f5f5f5 87.5%, #f5f5f5),
                linear-gradient(30deg, #f5f5f5 12%, transparent 12.5%, transparent 87%, #f5f5f5 87.5%, #f5f5f5),
                linear-gradient(150deg, #f5f5f5 12%, transparent 12.5%, transparent 87%, #f5f5f5 87.5%, #f5f5f5),
                linear-gradient(60deg, #eaeaea 25%, transparent 25.5%, transparent 75%, #eaeaea 75%, #eaeaea),
                linear-gradient(60deg, #eaeaea 25%, transparent 25.5%, transparent 75%, #eaeaea 75%, #eaeaea);
            background-size: 80px 140px;
            background-position: 0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px;
            opacity: 0.3;
            z-index: 0;
        }

        .faceted-card {
            background: #fbf9f8;
            border: 1px solid #8d7166;
            clip-path: polygon(0% 0%, 92% 0%, 100% 8%, 100% 100%, 0% 100%);
            position: relative;
        }

        .input-brutalist {
            border: 1px solid #8d7166;
            background: white;
            transition: all 0.2s ease;
        }

        .input-brutalist:focus {
            outline: none;
            border-color: #f46b24;
            box-shadow: 4px 4px 0px #8d7166;
            transform: translate(-2px, -2px);
        }

        .btn-brutalist {
            border: 1px solid #8d7166;
            background: #f46b24;
            color: white;
            box-shadow: 4px 4px 0px #8d7166;
            transition: all 0.2s ease;
        }

        .btn-brutalist:hover:not(:disabled) {
            transform: translate(-2px, -2px);
            box-shadow: 6px 6px 0px #8d7166;
        }

        .btn-brutalist:active:not(:disabled) {
            transform: translate(4px, 4px);
            box-shadow: 0px 0px 0px #8d7166;
        }
        
        .btn-brutalist:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: translate(0, 0);
            box-shadow: 4px 4px 0px #8d7166;
        }
      `}</style>

      <div className="tessellation-bg" />

      <div className="relative z-10 w-full max-w-md">
        <div className="faceted-card p-8">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-[#f46b24] border-2 border-[#8d7166] flex items-center justify-center relative shadow-[4px_4px_0px_#8d7166]">
              <div className="absolute w-2 h-2 bg-white rounded-full top-2 right-2" />
              <div className="absolute w-2 h-2 bg-white rounded-full bottom-2 left-2" />
              <span className="font-['JetBrains_Mono'] text-white font-bold text-2xl tracking-tighter">IF</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#f46b24] text-center uppercase tracking-tight mb-2">
            {step === 1 ? 'Forgot Password' : step === 2 ? 'Enter OTP' : 'New Password'}
          </h2>
          <p className="text-[#8d7166] text-center mb-8 font-medium">
            {step === 1 && "Enter your official email to reset your password"}
            {step === 2 && "We've sent a 4-digit OTP to your email"}
            {step === 3 && "Secure your account with a new password"}
          </p>

          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-[#8d7166] uppercase tracking-wide mb-2">Official Email</label>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10 transition-transform ${focusedInput === 'email' ? '' : ''}`}>
                    <Mail className={`h-5 w-5 ${focusedInput === 'email' ? 'text-[#f46b24]' : 'text-[#8d7166]'}`} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                    className="input-brutalist block w-full pl-10 pr-3 py-3 text-[#333] placeholder-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="e.g. yourname.it21@mcet.in"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-brutalist w-full flex justify-center py-3 px-4 font-bold uppercase tracking-wider text-sm mt-8"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#8d7166] uppercase tracking-wide mb-3 text-center">Enter 4-Digit OTP</label>
                <div className="flex justify-center gap-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      onFocus={() => setFocusedInput(`otp-${index}`)}
                      onBlur={() => setFocusedInput(null)}
                      className="input-brutalist w-14 h-14 text-center text-2xl font-['JetBrains_Mono'] font-bold text-[#333] focus:ring-0"
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    localStorage.setItem('forgot_pwd_step', '1');
                  }}
                  className="w-1/3 flex justify-center items-center py-3 px-4 font-bold uppercase tracking-wider text-sm border border-[#8d7166] text-[#8d7166] hover:bg-[#fbf9f8] transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-brutalist flex-1 flex justify-center items-center py-3 px-4 font-bold uppercase tracking-wider text-sm"
                >
                  {loading ? 'Verifying...' : 'Verify'} <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="text-sm font-bold text-[#f46b24] hover:underline uppercase tracking-wider"
                >
                  Resend OTP
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-[#8d7166] uppercase tracking-wide mb-2">New Password</label>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10 transition-transform ${focusedInput === 'password' ? '' : ''}`}>
                    <Lock className={`h-5 w-5 ${focusedInput === 'password' ? 'text-[#f46b24]' : 'text-[#8d7166]'}`} />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                    className="input-brutalist block w-full pl-10 pr-3 py-3 text-[#333] placeholder-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#8d7166] uppercase tracking-wide mb-2">Confirm Password</label>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10 transition-transform ${focusedInput === 'confirmPassword' ? '' : ''}`}>
                    <Lock className={`h-5 w-5 ${focusedInput === 'confirmPassword' ? 'text-[#f46b24]' : 'text-[#8d7166]'}`} />
                  </div>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setFocusedInput('confirmPassword')}
                    onBlur={() => setFocusedInput(null)}
                    className="input-brutalist block w-full pl-10 pr-3 py-3 text-[#333] placeholder-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-brutalist w-full flex justify-center py-3 px-4 font-bold uppercase tracking-wider text-sm mt-8"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}
          
          {step === 1 && (
            <div className="mt-6 border-t border-[#e0c0b3] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link to="/student/signin" className="text-sm font-medium text-[#8d7166] hover:text-[#f46b24] transition-colors flex items-center group">
                <ArrowLeft className="h-4 w-4 mr-1 transform group-hover:-translate-x-1 transition-transform" /> Back to Sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
