import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Briefcase, Download } from 'lucide-react';
import { scenarios } from '../../data/scenarios';

export default function ScenarioDetails() {
  const { id } = useParams<{ id: string }>();
  const scenario = scenarios.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!scenario) {
    return (
      <div className="min-h-screen bg-surface flex flex-col font-poppins">
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-3xl font-bold text-on-surface mb-4">Scenario Not Found</h2>
          <p className="text-secondary mb-8">The problem statement you are looking for does not exist.</p>
          <Link
            to="/hackathon"
            className="inline-flex items-center gap-2 bg-brand-orange text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-orange-600 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Hackathon
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface font-poppins selection:bg-brand-orange/20 selection:text-brand-orange-dark overflow-x-hidden flex flex-col">
      
      {/* 1. HERO SECTION (WHITE) */}
      <section className="relative w-full min-h-[30vh] flex flex-col justify-center bg-white pt-20 pb-8 overflow-hidden">
        {/* Dynamic Slanted Background Elements */}
        <div className="absolute inset-0 w-full h-full flex z-0 pointer-events-none opacity-40">
          <div
            className="relative w-[30%] h-[125%] flex-shrink-0 overflow-hidden shadow-md"
            style={{ transform: 'skewX(14deg)', willChange: 'transform' }}
          >
            <div className="w-full h-full" style={{ transform: 'skewX(-14deg) scale(1.3)' }}>
              <img
                src="/2F0A9821.JPG"
                alt="Hackathon Event"
                className="w-full h-full object-cover object-center opacity-30 mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/[0.04]" />
          </div>
          <div
            className="relative w-[40%] h-[125%] flex-shrink-0 overflow-hidden shadow-sm border-r border-gray-100/50"
            style={{ transform: 'skewX(14deg)', willChange: 'transform' }}
          >
            <div className="w-full h-full" style={{ transform: 'skewX(-14deg) scale(1.3)' }}>
              <img
                src="/2F0A9821.JPG"
                alt="Tech Collaboration"
                className="w-full h-full object-cover object-center opacity-20 mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Fades */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0.95)_65%,rgba(255,255,255,1)_100%)] z-10" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-white/80 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />

        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 text-left flex flex-col items-start mt-8">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 font-label-eyebrow text-label-eyebrow uppercase tracking-widest mb-4">
            SCENARIO 0{scenario.id}
          </div>
          
          <h1 className="font-display-md text-3xl md:text-5xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-6">
            {scenario.title.split(' — ').map((part, idx, arr) => (
              <React.Fragment key={idx}>
                {part}
                {idx < arr.length - 1 && <span className="text-brand-orange mx-2">—</span>}
              </React.Fragment>
            ))}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-600 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2">
              <Briefcase size={16} className="text-gray-400" />
              <span>{scenario.industry}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTENT SECTION */}
      <section className="flex-1 w-full bg-surface-container-lowest py-8 relative z-30">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 shadow-sm flex items-center justify-center">
                <FileText size={24} className="text-gray-700" strokeWidth={1.5} />
              </div>
              <h2 className="font-display text-3xl font-bold text-gray-900 tracking-tight">Abstract</h2>
            </div>
            
            <div className="prose prose-lg prose-orange max-w-none text-gray-700 leading-relaxed space-y-6">
              <p className="font-body-lg text-md">
                {scenario.abstract}
              </p>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500 font-medium">
                This is an official Nexora'26 Problem Statement.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <a
                  href="/Problem_Statements.docx"
                  download
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-bold shadow-sm hover:bg-gray-50 transition-all duration-200"
                >
                  <Download size={20} />
                  Scenario Details
                </a>
                <Link
                  to="/hackathon/register"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-brand-orange text-white px-8 py-3 rounded-lg font-bold shadow-md hover:bg-orange-600 transition-all duration-200"
                >
                  Register Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
