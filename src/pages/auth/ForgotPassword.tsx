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
    <div className="w-full min-h-screen bg-surface flex flex-col items-center justify-center pt-24 pb-12 px-4 sm:px-6 relative overflow-hidden">
      <style>{`
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
      `}</style>
      
      <div className="tessellation-bg"></div>

      <div className="w-full max-w-[440px] flex flex-col items-center relative z-10">
        <div className="w-full bg-surface-container-lowest shadow-xl rounded-2xl p-8 md:p-10 transition-stage">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-primary-container border-2 border-outline-variant rounded-2xl flex items-center justify-center relative shadow-sm">
              <div className="absolute w-2 h-2 bg-white rounded-full top-2 right-2" />
              <div className="absolute w-2 h-2 bg-white rounded-full bottom-2 left-2" />
              <span className="font-mono text-on-primary font-bold text-2xl tracking-tighter">IF</span>
            </div>
          </div>

          <h2 className="font-display text-headline-md font-bold text-on-surface text-center leading-tight mb-2">
            {step === 1 ? 'Forgot Password' : step === 2 ? 'Enter OTP' : 'New Password'}
          </h2>
          <p className="font-body-md text-secondary text-center mb-8">
            {step === 1 && "Enter your official email to reset your password"}
            {step === 2 && "We've sent a 4-digit OTP to your email"}
            {step === 3 && "Secure your account with a new password"}
          </p>

          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="font-label-sm text-label-sm uppercase tracking-wider font-bold text-secondary mb-2 block">Official Email</label>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10 transition-transform ${focusedInput === 'email' ? '' : ''}`}>
                    <Mail className={`h-5 w-5 ${focusedInput === 'email' ? 'text-primary-container' : 'text-secondary'}`} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                    className="w-full bg-surface-container-low border border-transparent pl-10 pr-4 py-3 rounded-lg text-on-surface font-body-md placeholder:text-outline-variant focus:outline-none focus:border-primary-container focus:bg-surface-container-lowest transition-colors"
                    placeholder="e.g. yourname.it21@mcet.in"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-container hover:bg-primary text-on-primary py-4 rounded-lg font-label-md text-label-md font-bold uppercase tracking-wider shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <label className="font-label-sm text-label-sm uppercase tracking-wider font-bold text-secondary mb-3 block text-center">Enter 4-Digit OTP</label>
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
                      className="w-14 h-14 bg-surface-container-low border border-transparent rounded-lg text-center text-2xl font-mono font-bold text-on-surface focus:outline-none focus:border-primary-container focus:bg-surface-container-lowest transition-colors"
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
                  className="w-1/3 flex justify-center items-center py-3.5 rounded-lg font-label-md text-label-md font-bold uppercase tracking-wider border-2 border-outline-variant text-on-surface hover:bg-surface-container-low transition-all"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-primary-container hover:bg-primary text-on-primary py-3.5 rounded-lg font-label-md text-label-md font-bold uppercase tracking-wider shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                >
                  {loading ? 'Verifying...' : 'Verify'} <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="font-label-sm text-label-sm font-bold text-primary-container hover:underline uppercase tracking-wider"
                >
                  Resend OTP
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div>
                <label className="font-label-sm text-label-sm uppercase tracking-wider font-bold text-secondary mb-2 block">New Password</label>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10 transition-transform ${focusedInput === 'password' ? '' : ''}`}>
                    <Lock className={`h-5 w-5 ${focusedInput === 'password' ? 'text-primary-container' : 'text-secondary'}`} />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                    className="w-full bg-surface-container-low border border-transparent pl-10 pr-4 py-3 rounded-lg text-on-surface font-body-md placeholder:text-outline-variant focus:outline-none focus:border-primary-container focus:bg-surface-container-lowest transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label className="font-label-sm text-label-sm uppercase tracking-wider font-bold text-secondary mb-2 block">Confirm Password</label>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10 transition-transform ${focusedInput === 'confirmPassword' ? '' : ''}`}>
                    <Lock className={`h-5 w-5 ${focusedInput === 'confirmPassword' ? 'text-primary-container' : 'text-secondary'}`} />
                  </div>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setFocusedInput('confirmPassword')}
                    onBlur={() => setFocusedInput(null)}
                    className="w-full bg-surface-container-low border border-transparent pl-10 pr-4 py-3 rounded-lg text-on-surface font-body-md placeholder:text-outline-variant focus:outline-none focus:border-primary-container focus:bg-surface-container-lowest transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-container hover:bg-primary text-on-primary py-4 rounded-lg font-label-md text-label-md font-bold uppercase tracking-wider shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}
          
          {step === 1 && (
            <div className="mt-6 border-t border-outline-variant pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link to="/student/signin" className="font-label-sm text-label-sm font-medium text-secondary hover:text-primary-container transition-colors flex items-center group">
                <ArrowLeft className="h-4 w-4 mr-1 transform group-hover:-translate-x-1 transition-transform" /> Back to Sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
