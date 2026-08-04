import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Menu, X, Award, ChevronRight, Sparkles, LogIn } from 'lucide-react';

interface HeaderProps {
  onJoinClick: () => void;
  onAdminClick: () => void;
  isAdminMode: boolean;
  isLoggedIn?: boolean;
  activeSection: string;
  currentPage?: 'home' | 'research';
  onNavigate?: (page: 'home' | 'research', sectionId?: string) => void;
}

export default function Header({ onJoinClick, onAdminClick, isAdminMode, isLoggedIn, activeSection, currentPage = 'home', onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: 'HOME', href: '#home' },
    { name: 'RESEARCH', href: '#research' },
    { name: 'EXPLORE', href: '#events' },
    { name: 'ABOUT', href: '#about' },
    { name: 'GALLERY', href: '#gallery' },
    { name: 'PROGRAMS', href: '#programs' },
    { name: 'CONTACT', href: '#contact' },
  ];

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (href === '#research') {
      if (onNavigate) {
        onNavigate('research');
      }
      return;
    }

    const sectionId = href.substring(1);
    if (onNavigate) {
      onNavigate('home', sectionId);
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
            <div className="relative w-9 h-9 bg-brand-orange rounded-md flex items-center justify-center overflow-hidden shadow-sm transition-transform group-hover:scale-105">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-brand-orange to-amber-500 opacity-90" />
              {/* Geometric fold line inside */}
              <svg className="w-6 h-6 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M12 3l9 9-9 9-9-9 9-9z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold tracking-tight text-gray-900 leading-none group-hover:text-brand-orange transition-colors">
                Infobee
              </span>
              <span className="text-[9px] font-mono tracking-wider text-gray-500 leading-none mt-0.5">
                IT ASSOCIATION • MCET
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-xs font-semibold tracking-wider relative py-1 transition-colors ${
                    isActive 
                      ? 'text-brand-orange' 
                      : 'text-gray-600 hover:text-brand-orange'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <Link
                to="/student/profile"
                className="bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold tracking-wider px-5 py-2.5 rounded-sm uppercase shadow-sm transition-all hover:shadow-md transform hover:-translate-y-0.5"
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/student/signin"
                className="bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold tracking-wider px-5 py-2.5 rounded-sm uppercase shadow-sm transition-all hover:shadow-md transform hover:-translate-y-0.5"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-sm text-gray-600 hover:text-brand-orange hover:bg-gray-50 transition-colors"
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
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`block px-3 py-2.5 rounded-sm text-sm font-semibold tracking-wider transition-colors ${
                      isActive 
                        ? 'bg-orange-50 text-brand-orange font-bold' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-brand-orange'
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
              <div className="pt-4 flex flex-col space-y-2 px-3">
                {isLoggedIn ? (
                  <Link
                    to="/student/profile"
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-brand-orange text-white text-center py-3 rounded-sm font-bold tracking-wider text-sm uppercase shadow-sm block"
                  >
                    Profile
                  </Link>
                ) : (
                  <Link
                    to="/student/signin"
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-brand-orange text-white text-center py-3 rounded-sm font-bold tracking-wider text-sm uppercase shadow-sm block"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
