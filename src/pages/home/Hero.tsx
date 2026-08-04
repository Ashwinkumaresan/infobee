import { motion } from 'motion/react';
import { ArrowDown, Calendar, Sparkles, ChevronRight } from 'lucide-react';

interface HeroProps {
  onExploreEventsClick: () => void;
  onLearnMoreClick: () => void;
}

export default function Hero({ onExploreEventsClick, onLearnMoreClick }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-white"
    >
      {/* Dynamic Parallel Slanted (Skewed) Vertical Rectangle Background Grid */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none bg-white">
        <div className="absolute inset-0 flex justify-center items-center w-full h-full gap-4 md:gap-6 px-4 md:px-8">
          {/* Panel 1: Far Left Slanted Rectangle */}
          <div 
            className="hidden md:block relative w-[18%] md:w-[22%] h-[125%] flex-shrink-0 overflow-hidden shadow-xs border-r border-gray-100/50"
            style={{ 
              transform: 'skewX(14deg)',
              willChange: 'transform'
            }}
          >
            <div className="w-full h-full" style={{ transform: 'skewX(-14deg) scale(1.3)' }}>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Tech Collaboration"
                className="w-full h-full object-cover object-center opacity-30 mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Subtle soft edge shadow to simulate 3D overlap */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/[0.04]" />
          </div>

          {/* Panel 2: Mid Left Slanted Rectangle */}
          <div 
            className="relative w-[44%] md:w-[26%] h-[125%] flex-shrink-0 overflow-hidden shadow-sm border-r border-gray-100/50"
            style={{ 
              transform: 'skewX(14deg)',
              willChange: 'transform'
            }}
          >
            <div className="w-full h-full" style={{ transform: 'skewX(-14deg) scale(1.3)' }}>
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80"
                alt="Hackathon Infobee Stage"
                className="w-full h-full object-cover object-center opacity-35 mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/[0.02] to-transparent" />
          </div>

          {/* Panel 3: Mid Right Slanted Rectangle */}
          <div 
            className="relative w-[44%] md:w-[26%] h-[125%] flex-shrink-0 overflow-hidden shadow-sm border-r border-gray-100/50"
            style={{ 
              transform: 'skewX(14deg)',
              willChange: 'transform'
            }}
          >
            <div className="w-full h-full" style={{ transform: 'skewX(-14deg) scale(1.3)' }}>
              <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"
                alt="Ideas & Planning"
                className="w-full h-full object-cover object-center opacity-30 mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/[0.02] to-transparent" />
          </div>

          {/* Panel 4: Far Right Slanted Rectangle */}
          <div 
            className="hidden md:block relative w-[18%] md:w-[22%] h-[125%] flex-shrink-0 overflow-hidden shadow-xs"
            style={{ 
              transform: 'skewX(14deg)',
              willChange: 'transform'
            }}
          >
            <div className="w-full h-full" style={{ transform: 'skewX(-14deg) scale(1.3)' }}>
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
                alt="Student Prototyping"
                className="w-full h-full object-cover object-center opacity-25 mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/[0.04]" />
          </div>
        </div>

        {/* Dynamic Fades to blend the slanted background perfectly with white areas */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.85)_65%,rgba(255,255,255,1)_100%)] z-25" />
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-white via-white/80 to-transparent z-25" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/70 to-transparent z-25" />
      </div>

      <div className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Department Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center space-y-1 mb-8 bg-transparent"
        >
          <span className="text-2xl sm:text-3.5xl font-italianno font-bold tracking-wide text-gray-900 leading-tight">
            Dr. Mahalingam College of Engineering and Technology
          </span>
          <span className="text-xl sm:text-2.5xl font-italianno font-bold tracking-wide text-brand-orange leading-tight">
            Department of Information Technology
          </span>
        </motion.div>

        {/* Hero Main Heading with exact typography */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6.5xl font-bold tracking-tight text-gray-900 leading-tight"
        >
          <span className="font-handwritten font-normal text-gray-900">Infobee</span> — Where <span className="font-handwritten font-normal text-brand-orange">Ideas</span> Take Shape
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 max-w-3xl mx-auto text-base sm:text-lg text-gray-700 leading-relaxed font-sans font-normal"
        >
          A student-run IT community driving tech events, hackathons, and industry
          exposure to transform complex data into structured excellence.
        </motion.p>

        {/* Call to Actions - Perfectly styled blocky buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-5"
        >
          <button
            onClick={onExploreEventsClick}
            className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold tracking-widest px-8 py-4.5 rounded-none uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Explore Events
          </button>
          
          <button
            onClick={onLearnMoreClick}
            className="w-full sm:w-auto bg-[#F0EEEE] hover:bg-gray-100 text-gray-900 text-xs font-bold tracking-widest px-8 py-4.5 rounded-none uppercase border border-black border-[1.5px] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Learn More
          </button>
        </motion.div>


      </div>
    </section>
  );
}
