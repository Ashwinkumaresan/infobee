import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar as CalendarIcon, ArrowRight, CheckCircle, RefreshCw, MapPin, Clock } from 'lucide-react';
import { EventItem } from '../../types';
import { eventsData } from '../../data';

interface EventsProps {
  onRegisterClick: (event: EventItem) => void;
  onCalendarClick: () => void;
  onViewDetailsClick: (event: EventItem) => void;
  registeredEventIds: string[];
}

type TabType = 'all' | 'upcoming' | 'past';

export default function Events({ 
  onRegisterClick, 
  onCalendarClick, 
  onViewDetailsClick, 
  registeredEventIds 
}: EventsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  // Filter events based on active tab selection
  const filteredEvents = eventsData.filter((evt) => {
    if (activeTab === 'all') return true;
    return evt.type === activeTab;
  });

  // Category specific colors matching the image's high-art feel
  const getCategoryColorClass = (category: string) => {
    const cat = category.toLowerCase();
    if (cat === 'hackathon') return 'text-[#f06c25]';
    if (cat === 'workshop') return 'text-[#2D5A7B]';
    if (cat.includes('research')) return 'text-[#f06c25]';
    if (cat === 'seminar') return 'text-[#f06c25]';
    return 'text-[#f06c25]';
  };

  // Strip ", 2026" or ", 2024" for upcoming events to match image typography
  const formatEventDate = (dateStr: string, isPast: boolean) => {
    if (!isPast && dateStr.endsWith(', 2026')) {
      return dateStr.replace(', 2026', '');
    }
    return dateStr;
  };

  // Find specific events for the exact grid positioning
  const beecodeEvent = eventsData.find(e => e.id === 'evt-beecode');
  const cyberEvent = eventsData.find(e => e.id === 'evt-cyberfold');

  // Find extra events not explicitly placed in the top showcases
  const topShowcaseIds = ['evt-beecode', 'evt-cyberfold'];
  const extraEvents = filteredEvents.filter(e => !topShowcaseIds.includes(e.id));

  // Determine which featured blocks to show based on tabs
  const showBeeCode = beecodeEvent && (activeTab === 'all' || activeTab === 'past');
  const showCyber = cyberEvent && (activeTab === 'all' || activeTab === 'upcoming');
  const showCalendarBox = (activeTab === 'all' || activeTab === 'upcoming');

  return (
    <section id="events" className="py-24 bg-[#FAF9F6] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="mb-16">
          <div className="relative">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-none">
              Explore Our <span className="font-handwritten font-normal text-brand-orange">Portal</span>
            </h2>
            {/* Elegant Thick Orange Line exactly matching the image */}
            <div className="w-24 h-[5px] bg-[#f06c25] mt-4" />
          </div>
        </div>

        {/* Dynamic Layout Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key="portal-features"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* BENTO GRID LAYOUT */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  id: 'research',
                  title: 'Research Papers',
                  description: 'Explore peer-reviewed research papers, projects, and journal publications authored by students and faculty.',
                  category: 'Knowledge Base',
                  link: '/research',
                  actionText: 'EXPLORE PAPERS',
                },
                {
                  id: 'projects',
                  title: 'Student Project Showcase',
                  description: 'Discover innovative applications, open-source tools, and capstone projects built by our students.',
                  category: 'Showcase',
                  link: '/', 
                  actionText: 'VIEW PROJECTS',
                },
                {
                  id: 'roadmap',
                  title: 'IT Career Roadmap',
                  description: 'Follow our curated roadmaps and learning paths for software engineering, AI, and cybersecurity.',
                  category: 'Development',
                  link: '/',
                  actionText: 'VIEW ROADMAPS',
                },
                {
                  id: 'collab',
                  title: 'Collaboration Hub',
                  description: 'Connect with peers, find project partners, and build open-source solutions together.',
                  category: 'Community',
                  link: '/',
                  actionText: 'JOIN THE HUB',
                }
              ].map((feature, index) => {
                // 1st row: 1 big (col-2), 1 small (col-1)
                // 2nd row: 1 small (col-1), 1 big (col-2)
                const isBig = index === 0 || index === 3;

                return (
                  <div
                    key={feature.id}
                    className={`relative bg-white border border-[#E2E1DF] rounded-none overflow-hidden flex flex-col ${isBig ? 'md:col-span-2' : 'md:col-span-1'} p-8 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-[#f06c25] transition-all duration-300 group`}
                  >
                    {/* Coming Soon Overlay */}
                    {feature.id !== 'research' && (
                      <div className="absolute inset-0 bg-white/50 backdrop-blur-[4px] z-50 flex items-center justify-center transition-all duration-300">
                        <div className="bg-white px-6 py-2.5 border border-gray-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex items-center gap-2.5">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 font-medium text-sm tracking-wide">
                            Coming Soon
                          </span>
                        </div>
                      </div>
                    )}

                    {/* New Decorative Patterns */}
                    {/* Full card fine grid pattern fading to bottom */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#f06c2522_1px,transparent_1px),linear-gradient(to_bottom,#f06c2522_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:linear-gradient(to_bottom,white_20%,transparent)]"></div>
                    
                    {/* Top right geometric accent (dense grid/crosses) */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[linear-gradient(to_right,#f06c2544_1px,transparent_1px),linear-gradient(to_bottom,#f06c2544_1px,transparent_1px)] bg-[size:8px_8px] [mask-image:radial-gradient(circle_at_top_right,white,transparent)]"></div>
                    
                    {/* Bottom-right ambient glow */}
                    <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-[#f06c25] rounded-full blur-[100px] opacity-25 pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col justify-between h-full">
                      <div>
                        <div className={`font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-4 text-[#f06c25]`}>
                          {feature.category.toUpperCase()}
                        </div>
                        <h3 className={`font-display ${isBig ? 'text-3xl lg:text-4xl' : 'text-xl sm:text-2xl'} font-bold text-gray-900 tracking-tight mb-5`}>
                          {feature.title}
                        </h3>
                        <p className={`text-gray-600 text-sm leading-relaxed mb-8 ${!isBig && 'line-clamp-4'}`}>
                          {feature.description}
                        </p>
                      </div>

                      <div className="mt-auto">
                        <Link
                          to={feature.link}
                          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                          className="inline-flex items-center space-x-1.5 text-xs font-bold tracking-widest uppercase text-[#f06c25] hover:text-[#d65718] transition-colors cursor-pointer"
                        >
                          <span>{feature.actionText}</span>
                          <span className="text-base font-normal transform transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
