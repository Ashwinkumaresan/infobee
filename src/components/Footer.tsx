import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

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
    <footer className="bg-brand-dark text-gray-400 py-16 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Logo & Description */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-2">
              {/* Geometric Fold Icon */}
              <div className="w-8 h-8 bg-brand-orange rounded-md flex items-center justify-center overflow-hidden">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M12 3l9 9-9 9-9-9 9-9z" />
                </svg>
              </div>
              <span className="font-display text-lg font-bold text-white tracking-tight">
                Infobee
              </span>
            </div>
            
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Shaping the future of Information Technology through structured innovation, Peer-to-peer mentoring,
              and collective excellence. Empowering MCET students to reach world-class engineering standards.
            </p>

            <div className="text-[10px] font-mono text-gray-500">
              Department of IT, Dr. MCET Campus
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6 space-y-4">
            <h4 className="font-display font-bold text-xs text-white tracking-widest uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#about" onClick={(e) => handleLinkClick(e, '#about')} className="hover:text-brand-orange transition-colors">
                  About Infobee
                </a>
              </li>
              <li>
                <button onClick={onCalendarClick} className="hover:text-brand-orange text-left transition-colors cursor-pointer">
                  Event Calendar
                </button>
              </li>
              <li>
                <a href="#gallery" onClick={(e) => handleLinkClick(e, '#gallery')} className="hover:text-brand-orange transition-colors">
                  Student Gallery
                </a>
              </li>
              <li>
                <a href="#programs" onClick={(e) => handleLinkClick(e, '#programs')} className="hover:text-brand-orange transition-colors">
                  Programs Conducted
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2 lg:col-start-9 space-y-4">
            <h4 className="font-display font-bold text-xs text-white tracking-widest uppercase">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="https://mcet.in/?page_id=1418" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">
                  Department of IT
                </a>
              </li>
              <li>
                <button onClick={onPortalClick} className="hover:text-brand-orange text-left transition-colors cursor-pointer flex items-center gap-1">
                  Research Papers <span className="text-[9px] font-mono text-gray-500">(Admin)</span>
                </button>
              </li>
              <li>
                <button onClick={onPortalClick} className="hover:text-brand-orange text-left transition-colors cursor-pointer flex items-center gap-1">
                  Tech Articles <span className="text-[9px] font-mono text-gray-500">(Admin)</span>
                </button>
              </li>
              <li>
                <button onClick={onPortalClick} className="hover:text-brand-orange text-left transition-colors cursor-pointer">
                  Student Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2 lg:col-start-11 space-y-4">
            <h4 className="font-display font-bold text-xs text-white tracking-widest uppercase">
              Legal
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <span className="hover:text-white transition-colors cursor-help" title="No user cookies are tracked except for mock registrations in localStorage">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-help" title="Encourage respect, integrity, peer tutoring, and positive workspace ethics">
                  Code of Conduct
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-help" title="All educational material is freely open-sourced for the benefit of college students">
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <div className="text-gray-500 text-center md:text-left mb-4 md:mb-0">
            © 2024 Infobee IT Student Association. Dr. MCET. All rights reserved.
          </div>
          
          <div className="flex space-x-6 text-gray-500 font-bold uppercase tracking-wider">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">
              INSTAGRAM
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">
              LINKEDIN
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">
              TWITTER
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
