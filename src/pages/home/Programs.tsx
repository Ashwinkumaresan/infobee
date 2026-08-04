import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, BookOpen, Clock, Target, Users, X, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { ProgramItem } from '../../types';
import { programsData } from '../../data';

export default function Programs() {
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);

  return (
    <section id="programs" className="relative pt-36 pb-28 text-white overflow-hidden">
      {/* Sharp V-Cut Background */}
      <div 
        className="absolute inset-0 bg-[#13110F] z-0" 
        style={{ clipPath: 'polygon(0 0, 50% 40px, 100% 0, 100% 100%, 0 100%)' }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20 space-y-2">
          <span className="text-xs font-bold font-mono tracking-widest text-[#f06c25] uppercase">
            // PROGRAMS CONDUCTED
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-2 mb-4">
            Sharpening the Next Generation
          </h2>
          <div className="h-1 w-12 bg-[#f06c25]" />
        </div>

        {/* Alternating Grid List matching the screenshot exactly */}
        <div className="space-y-24 sm:space-y-32">
          
          {/* Program 1: Coding Bootcamps */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Image column */}
            <div className="lg:col-span-7">
              <div 
                className="bg-[#E5DFD7] p-3 shadow-2xl rounded-xs"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0 100%)' }}
              >
                <img
                  src={programsData[0].image}
                  alt="Coding Bootcamps"
                  className="w-full aspect-[16/10] object-cover"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%)' }}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Text column */}
            <div className="lg:col-span-5 space-y-6">
              <div 
                className="w-12 h-12 bg-[#f06c25] flex items-center justify-center text-white shadow-lg"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}
              >
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Coding Bootcamps
              </h3>
              <p className="text-[#D1C7BD] text-sm sm:text-base leading-relaxed font-light">
                Intensive, project-based learning tracks focused on modern stacks like MERN, DevOps, and Machine Learning.
                Designed to bridge the gap between curriculum and industry demands.
              </p>
              <button
                onClick={() => setSelectedProgram(programsData[0])}
                className="inline-flex items-center space-x-2 text-xs font-bold font-mono tracking-widest text-[#f06c25] hover:text-[#f06c25]/80 transition-colors uppercase group"
              >
                <span>LEARN MORE</span>
                <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Program 2: Technical Symposiums */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Text column */}
            <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
              <div 
                className="w-12 h-12 bg-[#f06c25] flex items-center justify-center text-white shadow-lg"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}
              >
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Technical Symposiums
              </h3>
              <p className="text-[#D1C7BD] text-sm sm:text-base leading-relaxed font-light">
                Annual flagship events featuring paper presentations, technical quizzes, and project expos that challenge the limits of student innovation.
              </p>
              <button
                onClick={() => setSelectedProgram(programsData[1])}
                className="inline-flex items-center space-x-2 text-xs font-bold font-mono tracking-widest text-[#f06c25] hover:text-[#f06c25]/80 transition-colors uppercase group"
              >
                <span>LEARN MORE</span>
                <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Image column */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div 
                className="bg-[#E5DFD7] p-3 shadow-2xl rounded-xs"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0 100%)' }}
              >
                <img
                  src={programsData[1].image}
                  alt="Technical Symposiums"
                  className="w-full aspect-[16/10] object-cover"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%)' }}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Program 3: Industry Talks */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Image column */}
            <div className="lg:col-span-7">
              <div 
                className="bg-[#E5DFD7] p-3 shadow-2xl rounded-xs"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0 100%)' }}
              >
                <img
                  src={programsData[2].image}
                  alt="Industry Talks"
                  className="w-full aspect-[16/10] object-cover"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%)' }}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Text column */}
            <div className="lg:col-span-5 space-y-6">
              <div 
                className="w-12 h-12 bg-[#f06c25] flex items-center justify-center text-white shadow-lg"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}
              >
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Industry Talks
              </h3>
              <p className="text-[#D1C7BD] text-sm sm:text-base leading-relaxed font-light">
                Direct interaction with tech leaders from Fortune 500 companies, providing students with critical insights into career paths and emerging tech trends.
              </p>
              <button
                onClick={() => setSelectedProgram(programsData[2])}
                className="inline-flex items-center space-x-2 text-xs font-bold font-mono tracking-widest text-[#f06c25] hover:text-[#f06c25]/80 transition-colors uppercase group"
              >
                <span>LEARN MORE</span>
                <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Program Details Dialog Slide-Over Overlay */}
      <AnimatePresence>
        {selectedProgram && (
          <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProgram(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-xs"
            />

            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 26, stiffness: 180 }}
                className="w-screen max-w-lg bg-[#161311] border-l border-white/10 text-white shadow-2xl flex flex-col h-full"
              >
                {/* Header */}
                <div className="px-6 py-5 bg-[#13110F] border-b border-white/10 flex items-center justify-between">
                  <span className="font-display font-bold text-base tracking-tight flex items-center space-x-2 text-white">
                    <span className="w-2.5 h-2.5 bg-brand-orange rounded-full" />
                    <span>Program Curriculum</span>
                  </span>
                  <button
                    onClick={() => setSelectedProgram(null)}
                    className="p-1 rounded-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8">
                  {/* Banner */}
                  <div>
                    <h3 className="font-display font-bold text-2xl text-white mb-2 tracking-tight">
                      {selectedProgram.title}
                    </h3>
                    <p className="text-[#D1C7BD] text-xs leading-relaxed">
                      {selectedProgram.learnMoreText}
                    </p>
                  </div>

                  {/* Core Details */}
                  <div className="bg-white/5 p-4 rounded-none border border-white/5 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                      <span>DURATION:</span>
                      <span className="text-brand-orange font-bold">{selectedProgram.details.duration}</span>
                    </div>
                  </div>

                  {/* Syllabus Modules */}
                  <div className="space-y-3">
                    <h4 className="font-mono text-xs font-bold text-brand-orange uppercase tracking-wider">
                      COURSE SYLLABUS / ROADMAP
                    </h4>
                    <div className="space-y-3">
                      {selectedProgram.details.modules.map((mod, idx) => (
                        <div key={idx} className="flex items-start space-x-3 p-3 bg-white/5 border-l-2 border-brand-orange">
                          <span className="font-mono text-xs text-gray-400 mt-0.5">0{idx + 1}</span>
                          <span className="text-xs text-gray-200 leading-tight">{mod}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Program Outcomes */}
                  <div className="space-y-3">
                    <h4 className="font-mono text-xs font-bold text-brand-orange uppercase tracking-wider">
                      EXPECTED LEARNING OUTCOMES
                    </h4>
                    <ul className="space-y-2">
                      {selectedProgram.details.outcomes.map((out, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-xs text-gray-400">
                          <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                          <span>{out}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Distinguished Instructors */}
                  <div className="space-y-3">
                    <h4 className="font-mono text-xs font-bold text-brand-orange uppercase tracking-wider">
                      COHORT MENTORS & GUEST SPEAKERS
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProgram.details.pastInstructors.map((inst, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white/5 rounded-none border border-white/5 text-xs text-gray-300">
                          {inst}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-5 border-t border-white/10 bg-[#13110F] flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedProgram(null)}
                    className="px-4 py-2 border border-white/20 hover:border-white/40 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors text-gray-300 hover:text-white"
                  >
                    Close Curriculum
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
