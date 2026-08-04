import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Users, Calendar, Milestone, ArrowRight, ShieldAlert, Sparkles, X } from 'lucide-react';

interface AboutProps {
  onExploreEventsClick: () => void;
}

interface TimelineItem {
  year: string;
  title: string;
  desc: string;
}

export default function About({ onExploreEventsClick }: AboutProps) {
  const [showTimeline, setShowTimeline] = useState(false);
  const [membersCount, setMembersCount] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);
  const [yearCount, setYearCount] = useState(2026);

  // Counter animations on load
  useEffect(() => {
    const duration = 1200; // ms
    const steps = 30;
    const stepTime = duration / steps;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setMembersCount(Math.min(Math.round((500 / steps) * step), 500));
      setEventsCount(Math.min(Math.round((20 / steps) * step), 20));
      setYearCount(Math.max(2026 - Math.round(((2026 - 2012) / steps) * step), 2012));

      if (step >= steps) {
        clearInterval(timer);
        setMembersCount(500);
        setEventsCount(20);
        setYearCount(2012);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const timelineData: TimelineItem[] = [
    { year: '2012', title: 'Infobee Inception', desc: 'Founded by the IT Department student body to bridge the gap between rigorous curriculum schedules and real-world technology demands.' },
    { year: '2015', title: 'First National Symposium', desc: 'Launched "Infobee Symposium" inviting engineering students across Tamil Nadu for tech paper presentation competitions.' },
    { year: '2018', title: 'Mega Hackathon Series', desc: 'Introduced 24-hour non-stop hackathons, teaming up with local tech hubs and providing direct intern placements.' },
    { year: '2021', title: 'Virtual Cloud Sandboxes', desc: 'Transitioned to online modules, hosting cloud workspace labs and specialized bootcamp cohorts for remote learning.' },
    { year: '2024', title: 'BeeCode Mega Hack 2.0', desc: 'Achieved an all-time record of 500+ active student registrations, partnering with national sponsors and tech leaders.' },
    { year: '2026', title: 'Next-Gen Web Frameworks', desc: 'Integrated state-of-the-art UI architectures, Tailwind v4 integrations, and full-stack DevOps automation sprints.' }
  ];

  return (
    <section id="about" className="py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with beautiful offset framework frame */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-orange-100/60 rounded-none -z-10 transform -rotate-2" />
            <div className="relative border-4 border-gray-900 bg-white shadow-xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
                alt="Students collaborating at Infobee"
                className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-xs font-mono">Infobee Incubation Center • Block C, MCET</p>
              </div>
            </div>
            
            {/* Tiny origami folded decoration tag */}
            <div className="absolute -bottom-4 -right-4 bg-brand-orange text-white px-4 py-2 font-mono text-xs shadow-md">
              ORIGAMI OF IT
            </div>
          </div>

          {/* Right Column: Text & Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-xs font-bold font-mono tracking-widest text-brand-orange uppercase mb-2">
              OUR LEGACY OF INNOVATION
            </span>
            
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
              Empowering Minds, Shaping Technological Futures
            </h2>
            
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
              Infobee is more than just a student club; it is a structural framework for growth.
              We operate on the principle that knowledge, like origami, can be folded and shaped
              into intricate masterpieces of technical functionalism. Through peer-to-peer mentoring,
              intense hackathons, and real industry exposure, we help students build practical
              skills that elevate them to global engineering standards.
            </p>

            {/* Stats Boxes Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {/* Stat 1: Members */}
              <div className="border border-gray-200 p-4 sm:p-5 text-center bg-gray-50/50 hover:bg-white hover:border-brand-orange transition-all duration-300">
                <span className="block font-display text-2xl sm:text-3xl font-bold text-gray-900">
                  {membersCount}+
                </span>
                <span className="block text-[10px] font-mono tracking-wider text-gray-500 uppercase mt-1">
                  Active Members
                </span>
              </div>

              {/* Stat 2: Events */}
              <div className="border border-gray-200 p-4 sm:p-5 text-center bg-gray-50/50 hover:bg-white hover:border-brand-orange transition-all duration-300">
                <span className="block font-display text-2xl sm:text-3xl font-bold text-gray-900">
                  {eventsCount}+
                </span>
                <span className="block text-[10px] font-mono tracking-wider text-gray-500 uppercase mt-1">
                  Events / Year
                </span>
              </div>

              {/* Stat 3: Year established */}
              <button 
                onClick={() => setShowTimeline(true)}
                className="border border-gray-200 p-4 sm:p-5 text-center bg-gray-50/50 hover:bg-white hover:border-brand-orange hover:shadow-xs transition-all duration-300 cursor-pointer group"
                title="Click to view full club timeline history"
              >
                <span className="block font-display text-2xl sm:text-3xl font-bold text-brand-orange group-hover:scale-105 transition-transform">
                  Est. {yearCount}
                </span>
                <span className="block text-[10px] font-mono tracking-wider text-gray-500 uppercase mt-1 flex items-center justify-center gap-1">
                  Club History <ArrowRight className="w-2.5 h-2.5 text-brand-orange" />
                </span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={onExploreEventsClick}
                className="inline-flex items-center space-x-2 text-xs font-bold tracking-wider text-brand-orange hover:text-brand-orange-hover uppercase"
              >
                <span>Browse upcoming activities</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* History Timeline Overlay Drawer */}
      <AnimatePresence>
        {showTimeline && (
          <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTimeline(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Slider Container */}
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full"
              >
                {/* Drawer Header */}
                <div className="px-6 py-5 bg-brand-dark text-white flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Milestone className="w-5 h-5 text-brand-orange" />
                    <span className="font-display font-bold tracking-tight">Infobee Club History</span>
                  </div>
                  <button
                    onClick={() => setShowTimeline(false)}
                    className="p-1 rounded-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer Scrollable Timeline */}
                <div className="flex-1 overflow-y-auto px-6 py-8">
                  <div className="relative border-l-2 border-gray-100 ml-4 pl-6 space-y-8">
                    {timelineData.map((item, index) => (
                      <div key={index} className="relative">
                        {/* Dot */}
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-brand-orange bg-white flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                        </div>
                        
                        {/* Year */}
                        <div className="inline-block bg-orange-50 text-brand-orange text-xs font-mono font-bold px-2 py-0.5 rounded-sm mb-1">
                          {item.year}
                        </div>

                        {/* Title */}
                        <h4 className="font-display font-bold text-gray-900 text-sm mb-1">
                          {item.title}
                        </h4>

                        {/* Desc */}
                        <p className="text-gray-600 text-xs leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Drawer Footer */}
                <div className="px-6 py-5 border-t border-gray-100 bg-gray-50 flex justify-end">
                  <button
                    onClick={() => setShowTimeline(false)}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
                  >
                    Close History
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
