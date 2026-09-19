import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function StudentSignup() {
  const [phase, setPhase] = useState(1);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const navigate = useNavigate();

  const goToPhase = (nextPhase: number) => {
    setPhase(nextPhase);
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

        .faceted-card::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 34px;
            height: 34px;
            background: #eae8e7;
            clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
            border-left: 1px solid #8d7166;
            border-bottom: 1px solid #8d7166;
            pointer-events: none;
        }

        .step-segment {
            clip-path: polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%, 10% 50%);
            height: 8px;
            width: 100%;
            transition: background-color 0.4s ease;
        }
        
        .step-segment:first-child {
            clip-path: polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%);
        }

        .step-segment:last-child {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 10% 50%);
        }

        .shadow-sm rounded-xl {
            box-shadow: 4px 4px 0px 0px #1b1c1c;
        }

        .shadow-sm rounded-xl:active {
            box-shadow: 0px 0px 0px 0px #1b1c1c;
            transform: translate(2px, 2px);
        }

        .transition-stage {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
      
      <div className="tessellation-bg"></div>
      
      <main className="w-full max-w-[440px] flex flex-col items-center relative z-10">

        {/* Main Card */}
        <div className="w-full bg-surface-container-lowest shadow-xl rounded-2xl p-8 md:p-10 transition-stage" id="signup-card">
          
          {/* Step Indicator */}
          <div className="flex gap-1 mb-10">
            <div className={`step-segment ${phase >= 1 ? 'bg-[#f46b24]' : 'bg-[#dbd9d9]'}`}></div>
            <div className={`step-segment ${phase >= 2 ? 'bg-[#f46b24]' : 'bg-[#dbd9d9]'}`}></div>
            <div className={`step-segment ${phase >= 3 ? 'bg-[#f46b24]' : 'bg-[#dbd9d9]'}`}></div>
          </div>

          {/* Phase 1: Email */}
          {phase === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h2 className="font-display text-headline-md font-bold text-on-surface leading-tight mb-2">Create your Infobee account</h2>
                <p className="font-body-md text-secondary">Enter your college email to get started</p>
              </div>
              
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); goToPhase(2); }}>
                <div className="flex flex-col gap-1.5">
                  <label 
                    className={`font-label-sm text-label-sm uppercase tracking-wider font-bold transition-colors ${focusedInput === 'email' ? 'text-primary-container' : 'text-secondary'}`} 
                    htmlFor="email"
                  >
                    College Email
                  </label>
                  <input 
                    className="w-full bg-surface-container-low border border-transparent px-4 py-3 rounded-lg text-on-surface font-body-md placeholder:text-outline-variant focus:outline-none focus:border-primary-container focus:bg-surface-container-lowest transition-colors" 
                    id="email" 
                    placeholder="name@college.edu" 
                    type="email"
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-[#f46b24] text-white py-4 font-bold uppercase tracking-wider shadow-sm transition-all hover:bg-[#a33e00]" 
                >
                  Send OTP
                </button>
              </form>
              
              <div className="pt-4 text-center">
                <p className="font-body-md text-secondary">
                  Already have an account?{' '}
                  <Link to="/student/signin" className="text-primary-container font-bold hover:underline decoration-2 underline-offset-4">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          )}

          {/* Phase 2: Verify */}
          {phase === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h2 className="font-display text-headline-md font-bold text-on-surface leading-tight mb-2">Verify your email</h2>
                <p className="font-body-md text-secondary">We've sent a code to your email address.</p>
              </div>
              
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); goToPhase(3); }}>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] uppercase tracking-widest text-on-surface-variant font-bold text-center">
                    Enter 6-digit Code
                  </label>
                  <div className="flex justify-between gap-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <input 
                        key={i}
                        className="w-10 h-14 sm:w-12 sm:h-14 text-center text-xl font-mono border border-outline bg-[#ffffff] rounded-none focus:outline-none focus:border-primary-container transition-colors" 
                        maxLength={1} 
                        type="text"
                      />
                    ))}
                  </div>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-[#f46b24] text-white py-4 font-bold uppercase tracking-wider shadow-sm transition-all hover:bg-[#a33e00] mt-4" 
                >
                  Verify Code
                </button>
                <button 
                  type="button"
                  className="w-full text-on-surface-variant text-sm font-bold uppercase tracking-wider py-2 hover:text-on-surface transition-colors" 
                  onClick={() => goToPhase(1)}
                >
                  Back to email
                </button>
              </form>
            </div>
          )}

          {/* Phase 3: Details */}
          {phase === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h2 className="font-display text-headline-md font-bold text-on-surface leading-tight mb-2">Almost there</h2>
                <p className="font-body-md text-secondary">Complete your profile to join the hive.</p>
              </div>
              
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate('/student/profile', { replace: true }); }}>
                <div className="flex flex-col gap-1.5">
                  <label 
                    className={`font-label-sm text-label-sm uppercase tracking-wider font-bold transition-colors ${focusedInput === 'fullname' ? 'text-primary-container' : 'text-secondary'}`} 
                    htmlFor="fullname"
                  >
                    Full Name
                  </label>
                  <input 
                    className="w-full bg-surface-container-low border border-transparent px-4 py-3 rounded-lg text-on-surface font-body-md focus:outline-none focus:border-primary-container focus:bg-surface-container-lowest transition-colors" 
                    id="fullname" 
                    placeholder="John Doe" 
                    type="text"
                    onFocus={() => setFocusedInput('fullname')}
                    onBlur={() => setFocusedInput(null)}
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label 
                    className={`font-label-sm text-label-sm uppercase tracking-wider font-bold transition-colors ${focusedInput === 'password' ? 'text-primary-container' : 'text-secondary'}`} 
                    htmlFor="password"
                  >
                    Create Password
                  </label>
                  <input 
                    className="w-full bg-surface-container-low border border-transparent px-4 py-3 rounded-lg text-on-surface font-body-md focus:outline-none focus:border-primary-container focus:bg-surface-container-lowest transition-colors" 
                    id="password" 
                    placeholder="••••••••" 
                    type="password"
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                  />
                </div>
                
                <div className="flex items-start gap-3 pt-2">
                  <input 
                    className="mt-1 w-4 h-4 rounded-none border-outline text-primary-container focus:ring-[#f46b24]" 
                    id="terms" 
                    type="checkbox"
                  />
                  <label className="text-sm text-on-surface-variant leading-snug cursor-pointer" htmlFor="terms">
                    I agree to the <span className="text-primary-container font-bold hover:underline">Terms of Service</span> and <span className="text-primary-container font-bold hover:underline">Privacy Policy</span>.
                  </label>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-[#f46b24] text-white py-4 font-bold uppercase tracking-wider shadow-sm transition-all hover:bg-[#a33e00] mt-4"
                >
                  Complete Setup
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
