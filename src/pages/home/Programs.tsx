import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, BookOpen, Clock, Target, Users, X, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { ProgramItem } from '../../types';
import { programsData } from '../../data';

export default function Programs() {
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);

  return (
    <section id="programs" className="relative pt-36 pb-28 text-gray-900 bg-[#F4F1ED] overflow-hidden">
      {/* Professional Grid Pattern Background */}
      <div className="absolute inset-0 bg-[#FAF9F6] z-0">
        {/* The Grid */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
            backgroundSize: '3.5rem 3.5rem',
            opacity: 0.7
          }}
        />
        {/* Fading Mask */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6] via-transparent to-[#FAF9F6] pointer-events-none" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20 space-y-2">
          <span className="text-xs font-bold font-mono tracking-widest text-[#f06c25] uppercase">
           PROGRAMS CONDUCTED
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mt-2 mb-4">
            Sharpening the Next Generation
          </h2>
          <div className="h-1 w-12 bg-[#f06c25]" />
        </div>

        {/* Alternating Grid List matching the screenshot exactly */}
        <div className="space-y-24 sm:space-y-32">
          
          {/* Program 1: Coding Bootcamps */}
          <div className="relative overflow-hidden bg-white border border-gray-200 p-8 lg:p-12 shadow-sm hover:shadow-md transition-shadow">
            {/* Decorative Color Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#f06c25] opacity-[0.08] rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{ backgroundImage: 'radial-gradient(#f06c25 2px, transparent 2px)', backgroundSize: '24px 24px' }}
            />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Image column */}
              <div className="lg:col-span-7">
                <img
                  src={programsData[0].image}
                  alt="Coding Bootcamps"
                  className="w-full aspect-[16/10] object-cover shadow-md"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Text column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="w-12 h-12 bg-[#f06c25] flex items-center justify-center text-white shadow-lg">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                  Coding Bootcamps
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light">
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
          </div>

          {/* Program 2: Technical Symposiums */}
          <div className="relative overflow-hidden bg-white border border-gray-200 p-8 lg:p-12 shadow-sm hover:shadow-md transition-shadow">
            {/* Decorative Color Pattern */}
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#f06c25] opacity-[0.08] rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{ backgroundImage: 'radial-gradient(#f06c25 2px, transparent 2px)', backgroundSize: '24px 24px' }}
            />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Text column */}
              <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
                <div className="w-12 h-12 bg-[#f06c25] flex items-center justify-center text-white shadow-lg">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                  Technical Symposiums
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light">
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
                <img
                  src={programsData[1].image}
                  alt="Technical Symposiums"
                  className="w-full aspect-[16/10] object-cover shadow-md"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Program 3: Industry Talks */}
          <div className="relative overflow-hidden bg-white border border-gray-200 p-8 lg:p-12 shadow-sm hover:shadow-md transition-shadow">
            {/* Decorative Color Pattern */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#f06c25] opacity-[0.05] rounded-full blur-3xl pointer-events-none" />
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{ backgroundImage: 'radial-gradient(#f06c25 2px, transparent 2px)', backgroundSize: '24px 24px' }}
            />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Image column */}
              <div className="lg:col-span-7">
                <img
                  src={programsData[2].image}
                  alt="Industry Talks"
                  className="w-full aspect-[16/10] object-cover shadow-md"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Text column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="w-12 h-12 bg-[#f06c25] flex items-center justify-center text-white shadow-lg">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                  Industry Talks
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light">
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
      </div>

      {/* Program Details Dialog Slide-Over Overlay */}
      <AnimatePresence>
        {selectedProgram && (
          <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProgram(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
            />

            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 26, stiffness: 180 }}
                className="w-screen max-w-lg bg-white border-l border-gray-200 text-gray-900 shadow-2xl flex flex-col h-full"
              >
                {/* Header */}
                <div className="px-6 py-5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                  <span className="font-display font-bold text-base tracking-tight flex items-center space-x-2 text-gray-900">
                    <span className="w-2.5 h-2.5 bg-brand-orange rounded-full" />
                    <span>Program Curriculum</span>
                  </span>
                  <button
                    onClick={() => setSelectedProgram(null)}
                    className="p-1.5 rounded-sm text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8">
                  {/* Banner */}
                  <div>
                    <h3 className="font-display font-bold text-2xl text-gray-900 mb-2 tracking-tight">
                      {selectedProgram.title}
                    </h3>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {selectedProgram.learnMoreText}
                    </p>
                  </div>

                  {/* Core Details */}
                  <div className="bg-gray-50 p-4 rounded-none border border-gray-200 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-gray-600">
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
                        <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 border-l-2 border-brand-orange">
                          <span className="font-mono text-xs text-gray-500 mt-0.5">0{idx + 1}</span>
                          <span className="text-xs text-gray-700 leading-tight">{mod}</span>
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
                        <li key={idx} className="flex items-start space-x-2 text-xs text-gray-600">
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
                        <span key={idx} className="px-3 py-1 bg-white rounded-none border border-gray-200 text-xs text-gray-700">
                          {inst}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-5 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedProgram(null)}
                    className="px-5 py-2.5 bg-gray-900 hover:bg-brand-orange text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
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
