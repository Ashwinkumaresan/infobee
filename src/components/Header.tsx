import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Award, ChevronRight, Sparkles, LogIn, ChevronDown } from 'lucide-react';
import { API_URL } from '../api';

interface HeaderProps {
  onJoinClick: () => void;
  onAdminClick: () => void;
  isAdminMode: boolean;
  isLoggedIn?: boolean;
  activeSection: string;
  currentPage?: 'home' | 'research' | 'portfolio' | 'gallery';
  onNavigate?: (page: 'home' | 'research' | 'portfolio' | 'gallery', sectionId?: string) => void;
}

export default function Header({ onJoinClick, onAdminClick, isAdminMode, isLoggedIn, activeSection, currentPage = 'home', onNavigate }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);
  const userRole = localStorage.getItem('user_role');
  const profileRoute = userRole === 'staff' ? '/staff/profile' : '/student/profile';

    const navItems = [
    { 
      name: 'THE CHALLENGE', 
      href: '#challenge',
      subItems: [
        { name: 'ROUND 1', href: '#round1' },
        { name: 'ROUND 2', href: '#round2' },
        { name: 'ROUND 3', href: '#round3' },
      ]
    },
    {
      name: 'SCENARIOS',
      href: '#scenarios',
      subItems: [
        { name: 'SCENARIO 1', href: '/hackathon/scenario/1' },
        { name: 'SCENARIO 2', href: '/hackathon/scenario/2' },
        { name: 'SCENARIO 3', href: '/hackathon/scenario/3' },
        { name: 'SCENARIO 4', href: '/hackathon/scenario/4' },
        { name: 'SCENARIO 5', href: '/hackathon/scenario/5' },
      ]
    },
    { name: 'FAQ', href: '#faq' },
  ];
  
  if (isRegistrationOpen) {
    navItems.push({ name: 'REGISTER', href: '#register' });
  }
  
  navItems.push({ 
    name: 'TEAMS', 
    href: '/hackathon/teams',
    subItems: [
      { name: 'ALL TEAMS', href: '/hackathon/teams' },
      { name: 'ROUND 2', href: '/hackathon/teams?round=2' },
      { name: 'ROUND 3', href: '/hackathon/teams?round=3' },
    ]
  });

  const isItemActive = (href: string) => {
    if (href.startsWith('/')) {
      return location.pathname === href;
    }
    return activeSection === href.substring(1) && (location.pathname === '/' || location.pathname === '/hackathon');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/hackathon/available-scenarios/`)
      .then(res => res.json())
      .then(data => {
        if (data.is_registration_open === false) {
          setIsRegistrationOpen(false);
        }
      })
      .catch(() => {});
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (href === '/hackathon') {
      if (onNavigate) {
        onNavigate('hackathon' as any);
      }
      return;
    }

    if (href.startsWith('#')) {
      const sectionId = href.substring(1);
      if (onNavigate && sectionId) {
        onNavigate(currentPage, sectionId);
      }
    } else if (href.startsWith('/')) {
      navigate(href);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center space-x-2 group">
            {/* Logo Geometric Origami Fold */}
            <img src="/Logo.jpg" alt="Infobee Logo" className="w-12 h-12" />
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold tracking-tight text-gray-900 leading-none group-hover:text-brand-orange transition-colors">
                Infobee
              </span>
              <span className="text-[9px] tracking-wider text-gray-500 leading-none mt-0.5">
                IT Association • DR. MCET
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = isItemActive(item.href) || item.subItems?.some(sub => isItemActive(sub.href));
              return (
                <div key={item.name} className="relative group">
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-xs font-semibold tracking-wider relative py-1 flex items-center gap-1 transition-colors ${
                      isActive 
                        ? 'text-brand-orange' 
                        : 'text-gray-600 hover:text-brand-orange'
                    }`}
                  >
                    {item.name}
                    {item.subItems && <ChevronDown className="w-3.5 h-3.5" />}
                    {isActive && (
                      <motion.span
                        layoutId="activeUnderline"
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                  {item.subItems && (
                    <div className="absolute left-0 mt-6 w-40 bg-white border border-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="absolute -top-6 left-0 w-full h-6"></div>
                      {item.subItems.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          onClick={(e) => handleNavClick(e, subItem.href)}
                          className="block px-4 py-3 text-xs font-semibold tracking-wider text-gray-600 hover:bg-gray-50 hover:text-brand-orange transition-colors first:rounded-t-md last:rounded-b-md"
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <Link
                to={profileRoute}
                className="bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold tracking-wider px-5 py-2.5 uppercase shadow-sm transition-all hover:shadow-md transform hover:-translate-y-0.5 rounded-md"
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/student/signin"
                className="bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold tracking-wider px-5 py-2.5 uppercase shadow-sm transition-all hover:shadow-md transform hover:-translate-y-0.5 rounded-md"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button and Actions */}
          <div className="flex md:hidden items-center space-x-3">
            {isLoggedIn ? (
              <Link
                to={profileRoute}
                className="bg-brand-orange hover:bg-brand-orange-hover text-white text-[10px] font-bold tracking-wider px-4 py-2 uppercase shadow-sm transition-all rounded-md"
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/student/signin"
                className="bg-brand-orange hover:bg-brand-orange-hover text-white text-[10px] font-bold tracking-wider px-4 py-2 uppercase shadow-sm transition-all rounded-md"
              >
                Sign In
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 rounded-sm text-gray-600 hover:text-brand-orange hover:bg-gray-50 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden shadow-inner"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navItems.map((item) => {
                const isActive = isItemActive(item.href) || item.subItems?.some(sub => isItemActive(sub.href));
                return (
                  <div key={item.name} className="space-y-1">
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-sm text-sm font-semibold tracking-wider transition-colors ${
                        isActive 
                          ? 'bg-orange-50 text-brand-orange font-bold' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-brand-orange'
                      }`}
                    >
                      {item.name}
                      {item.subItems && <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </a>
                    {item.subItems && (
                      <div className="pl-6 space-y-1 pb-2">
                        {item.subItems.map(sub => (
                          <a
                            key={sub.name}
                            href={sub.href}
                            onClick={(e) => handleNavClick(e, sub.href)}
                            className="block px-3 py-2 rounded-sm text-sm font-semibold tracking-wider text-gray-500 hover:bg-gray-50 hover:text-brand-orange transition-colors"
                          >
                            {sub.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
