import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FooterProps {
  onNavClick: (selector: string) => void;
  onCalendarClick: () => void;
  onPortalClick: () => void;
}

export default function Footer({ onNavClick, onCalendarClick, onPortalClick }: FooterProps) {
  const handleLinkClick = (e: React.MouseEvent, selector: string) => {
    e.preventDefault();
    onNavClick(selector);
  };

  return (
    <footer className="bg-surface-container-lowest text-secondary py-16 border-t border-surface-container font-sans">
      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-gutter">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Logo & Description */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/Logo.jpg" alt="Infobee Logo" className="w-12 h-12 rounded-lg" />
              <span className="font-headline-sm text-headline-sm font-bold text-on-surface tracking-tight">
                Infobee
              </span>
            </div>
            
            <p className="text-body-sm font-body-sm leading-relaxed max-w-sm text-secondary">
              Shaping the future of Information Technology through structured innovation, peer-to-peer mentoring,
              and collective excellence. Empowering MCET students to reach world-class engineering standards.
            </p>

            <div className="text-[11px] font-bold text-brand-grayMuted">
              Department of IT, Dr. MCET Campus
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 lg:col-start-7 space-y-4">
            <h4 className="font-label-sm font-bold text-label-sm text-on-surface tracking-widest uppercase">
              Hackathon
            </h4>
            <ul className="space-y-2.5 text-body-sm font-body-sm">
              <li>
                <a href="#challenge" onClick={(e) => handleLinkClick(e, '#challenge')} className="hover:text-brand-orange transition-colors">
                  The Challenge
                </a>
              </li>
              <li>
                <a href="#round1" onClick={(e) => handleLinkClick(e, '#round1')} className="hover:text-brand-orange transition-colors">
                  Round 1 Details
                </a>
              </li>
              <li>
                <a href="#round2" onClick={(e) => handleLinkClick(e, '#round2')} className="hover:text-brand-orange transition-colors">
                  Round 2 Details
                </a>
              </li>
              <li>
                <a href="#round3" onClick={(e) => handleLinkClick(e, '#round3')} className="hover:text-brand-orange transition-colors">
                  Round 3 Details
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-3 lg:col-start-10 space-y-4">
            <h4 className="font-label-sm font-bold text-label-sm text-on-surface tracking-widest uppercase">
              Resources
            </h4>
            <ul className="space-y-2.5 text-body-sm font-body-sm">
              <li>
                <a href="#faq" onClick={(e) => handleLinkClick(e, '#faq')} className="hover:text-brand-orange transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <Link to="/register" className="hover:text-brand-orange transition-colors flex items-center gap-1">
                  Registration Portal
                </Link>
              </li>
              <li>
                <button onClick={onPortalClick} className="hover:text-brand-orange text-left transition-colors cursor-pointer flex items-center gap-1">
                  Student Portal
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-surface-container pt-8 flex flex-col md:flex-row justify-between items-center text-label-sm font-label-sm">
          <div className="text-secondary text-center md:text-left mb-4 md:mb-0">
            © {new Date().getFullYear()} Infobee - IT Student Association. Dr. MCET. All rights reserved.
          </div>
          
          <div className="flex space-x-6 text-brand-grayMuted font-bold uppercase tracking-wider">
            <a href="https://www.instagram.com/infobee_it?stkn=ZTJwczhpaGs4bWRz" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">
              INSTAGRAM
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
