import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { API_URL } from '../../api';

interface StudentSigninProps {
  setIsLoggedIn?: (value: boolean) => void;
}

export default function StudentSignin({ setIsLoggedIn }: StudentSigninProps) {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/student/profile';

  useEffect(() => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; access_token=`);
    if (parts.length === 2) {
      navigate('/');
    }
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Clear old data first, but preserve hackathon drafts
    document.cookie = 'access_token=; path=/; max-age=0';
    document.cookie = 'refresh_token=; path=/; max-age=0';
    
    const hackathonKeys: { key: string; value: string }[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('hackathon_')) {
        const val = localStorage.getItem(key);
        if (val !== null) hackathonKeys.push({ key, value: val });
      }
    }
    
    localStorage.clear();
    sessionStorage.clear();
    
    hackathonKeys.forEach(item => {
      localStorage.setItem(item.key, item.value);
    });

    try {
      const response = await fetch(`${API_URL}/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // username is the roll number, so we get it from email and uppercase it
          username: email.split('@')[0].toUpperCase(),
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Save token to cookie
        document.cookie = `access_token=${data.access}; path=/; max-age=86400`; // 1 day
        if (data.refresh) {
            document.cookie = `refresh_token=${data.refresh}; path=/; max-age=604800`; // 7 days
        }
        if (setIsLoggedIn) setIsLoggedIn(true);

        // Fetch user role
        try {
          const roleResponse = await fetch(`${API_URL}/user/me/`, {
            headers: {
              'Authorization': `Bearer ${data.access}`
            }
          });
          if (roleResponse.ok) {
            toast.success('Login success');
            const roleData = await roleResponse.json();
            localStorage.setItem('user_role', roleData.role);
            if (roleData.role === 'staff') {
              navigate('/staff/profile', { replace: true });
            } else {
              navigate(from, { replace: true });
            }
          } else {
            toast.success('Login success');
            navigate(from, { replace: true });
          }
        } catch (roleErr) {
          toast.success('Login success');
          navigate(from, { replace: true });
        }
      } else {
        const data = await response.json();
        toast.error(data.detail || 'Invalid email or password');
      }
    } catch (err) {
      toast.error('Unable to connect to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
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
        <div className="w-full bg-surface-container-lowest shadow-xl rounded-2xl p-8 md:p-10 transition-stage" id="signin-card">
          
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-headline-md font-bold text-on-surface leading-tight mb-2">Student Portal</h2>
              <p className="font-body-md text-secondary">Sign in to your student account</p>
            </div>
            
            <form className="space-y-4" onSubmit={handleSignIn}>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 text-sm">
                  {error}
                </div>
              )}
              
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
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  required
                />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label 
                  className={`font-label-sm text-label-sm uppercase tracking-wider font-bold transition-colors ${focusedInput === 'password' ? 'text-primary-container' : 'text-secondary'}`} 
                  htmlFor="password"
                >
                  Password
                </label>
                <input 
                  className="w-full bg-surface-container-low border border-transparent px-4 py-3 rounded-lg text-on-surface font-body-md focus:outline-none focus:border-primary-container focus:bg-surface-container-lowest transition-colors" 
                  id="password" 
                  placeholder="••••••••" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  required
                />
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-primary-container hover:bg-primary text-on-primary py-4 rounded-lg font-label-md text-label-md font-bold uppercase tracking-wider shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 mt-4 disabled:opacity-70 disabled:cursor-not-allowed" 
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
            
            <div className="pt-4 text-center">
              <Link to="/forgot-password" className="font-label-sm text-label-sm font-medium text-secondary hover:text-primary-container transition-colors block mb-4">
                Forgot password?
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
