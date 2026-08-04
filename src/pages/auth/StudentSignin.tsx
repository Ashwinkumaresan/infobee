import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface StudentSigninProps {
  setIsLoggedIn?: (value: boolean) => void;
}

export default function StudentSignin({ setIsLoggedIn }: StudentSigninProps) {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignIn = () => {
    if (setIsLoggedIn) setIsLoggedIn(true);
    navigate('/student/profile');
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-['Poppins',_sans-serif] p-4 bg-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700;800;900&family=JetBrains+Mono&display=swap');
        
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

        .block-shadow {
            box-shadow: 4px 4px 0px 0px #1b1c1c;
        }

        .block-shadow:active {
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
        <div className="faceted-card w-full p-8 md:p-10 transition-stage" id="signin-card">
          
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl text-[#1b1c1c] font-bold leading-tight mb-2">Welcome back</h2>
              <p className="text-[#594238]">Sign in to your Infobee account</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label 
                  className={`text-[12px] uppercase tracking-widest font-bold transition-colors ${focusedInput === 'email' ? 'text-[#a33e00]' : 'text-[#594238]'}`} 
                  htmlFor="email"
                >
                  College Email
                </label>
                <input 
                  className="w-full bg-[#ffffff] border border-[#8d7166] px-4 py-3 rounded-none text-[#1b1c1c] placeholder:text-[#dbd9d9] focus:outline-none focus:border-[#f46b24] transition-colors" 
                  id="email" 
                  placeholder="name@college.edu" 
                  type="email"
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label 
                  className={`text-[12px] uppercase tracking-widest font-bold transition-colors ${focusedInput === 'password' ? 'text-[#a33e00]' : 'text-[#594238]'}`} 
                  htmlFor="password"
                >
                  Password
                </label>
                <input 
                  className="w-full bg-[#ffffff] border border-[#8d7166] px-4 py-3 rounded-none text-[#1b1c1c] focus:outline-none focus:border-[#f46b24] transition-colors" 
                  id="password" 
                  placeholder="••••••••" 
                  type="password"
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                />
              </div>
              
              <button 
                className="w-full bg-[#f46b24] text-white py-4 font-bold uppercase tracking-widest block-shadow transition-all hover:bg-[#a33e00] mt-4" 
                onClick={handleSignIn}
              >
                Sign In
              </button>
            </div>
            
            <div className="pt-4 text-center">
              <p className="text-[#594238]">
                Don't have an account?{' '}
                <Link to="/student/signup" className="text-[#f46b24] font-bold hover:underline decoration-2 underline-offset-4">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
