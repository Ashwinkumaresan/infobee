import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code, Terminal, Database, Users, Shield, Zap, Target, HelpCircle, ChevronRight, X, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { API_URL } from '../../api';

export default function Hackathon() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [availableScenarios, setAvailableScenarios] = useState<string[] | null>(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${API_URL}/hackathon/available-scenarios/`)
      .then(res => res.json())
      .then(data => {
        if (data.is_registration_open === false) {
          setIsRegistrationOpen(false);
          setAvailableScenarios([]); // Force all to be full/unavailable
        } else if (data.is_full) {
          setAvailableScenarios([]);
        } else if (Array.isArray(data.available_scenarios)) {
          setAvailableScenarios(data.available_scenarios);
        }
      })
      .catch(err => console.error("Failed to fetch available scenarios", err));
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(prev => (prev === index ? null : index));
  };

  return (

    <div className="flex flex-col w-full text-on-surface">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[100vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-white">
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
                  src="/2F0A9821.JPG"
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
                  src="/2F0A9821.JPG"
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
                  src="/2F0A9821.JPG"
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
                  src="/2F0A9821.JPG"
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

        <div className="relative z-30 max-w-[1280px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-gutter text-left md:text-center flex flex-col items-start md:items-center w-full">
          <h1 className="font-display-hero text-display-hero-mobile sm:text-[4rem] md:text-display-md font-bold tracking-tight text-gray-900 leading-[1.05] mb-space-md break-words">
            Nexora<span className="text-brand-orange">'26</span>
          </h1>
          <div className="space-y-2 mb-space-xl max-w-2xl mx-0 md:mx-auto">
            <p className="font-headline-sm text-headline-sm font-semibold text-gray-900">
              3 Rounds. One Problem. Build It Into Reality.
            </p>
            <p className="font-body-lead text-body-lead text-gray-700">
              A scenario-driven hackathon where ideas become prototypes, and prototypes become complete products.
            </p>
          </div>
          
          {/* Horizontal Journey Indicator */}
          {/* <div className="bg-white/40 backdrop-blur-sm rounded-xl p-space-md mb-space-xl shadow-sm border border-gray-100 self-start md:self-center w-full sm:w-auto">
            <div className="flex flex-col sm:flex-row items-start md:items-center justify-start md:justify-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span className="font-label-md text-label-md font-bold text-gray-900 tracking-wider">50 TEAMS</span>
                <span className="font-label-sm text-label-sm text-gray-500 ">IDEA</span>
              </div>
              <span className="text-gray-300 hidden sm:inline">→</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span className="font-label-md text-label-md font-bold text-gray-900 tracking-wider">25 SHORTLISTED</span>
                <span className="font-label-sm text-label-sm text-gray-500 ">PROTOTYPE</span>
              </div>
              <span className="text-gray-300 hidden sm:inline">→</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
                <span className="font-label-md text-label-md font-bold text-gray-900 tracking-wider">14–15 FINALISTS</span>
                <span className="font-label-sm text-label-sm text-gray-500 ">PRODUCT</span>
              </div>
            </div>
          </div> */}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-start md:justify-center items-start md:items-center gap-4 w-full sm:w-auto">
            {isRegistrationOpen ? (
              <Link className="inline-flex items-center justify-center bg-[#F26522] hover:bg-[#d9581a] text-white font-label-md text-sm font-semibold px-6 py-4 rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 w-full sm:w-auto" to="/hackathon/register">
                REGISTER YOUR TEAM &rarr;
              </Link>
            ) : (
              <div className="inline-flex items-center justify-center bg-gray-300 text-gray-700 font-label-md text-sm font-semibold px-6 py-4 rounded-xl shadow-sm cursor-not-allowed w-full sm:w-auto">
                REGISTRATION CLOSED
              </div>
            )}
            <a className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 font-label-md text-sm font-semibold px-6 py-4 rounded-xl shadow-sm border border-gray-200 transition-all duration-200 hover:-translate-y-0.5 w-full sm:w-auto" href="#journey">
              VIEW THE 3 ROUNDS &rarr;
            </a>
          </div>
        </div>
      </section>
      {/* 2. SECTION 2 — THE CHALLENGE */}
      <section className="w-full bg-surface-container-low/50 py-space-3xl" id="challenge">
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-gutter">
          <div className="flex flex-col items-start max-w-2xl mb-space-2xl">
            <span className="font-label-eyebrow text-label-eyebrow uppercase text-primary-container tracking-widest mb-space-xs">THE CHALLENGE</span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-on-surface tracking-tight mb-space-sm">
              Start With a Scenario. End With a Product.
            </h2>
            <p className="font-body-lead text-body-lead text-secondary">
              Five scenario-based problem statements will challenge teams to think, design, prototype and build solutions under evolving requirements.
            </p>
          </div>
          {/* 5 Scenario Tech Spec Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {/* Scenario 01 */}
            <Link to="/hackathon/scenario/1" className={`block bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between relative overflow-hidden ${availableScenarios && !availableScenarios.includes('SCENARIO 01') ? 'pointer-events-none' : 'cursor-pointer'}`}>
              {availableScenarios && !availableScenarios.includes('SCENARIO 01') && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-surface-container-lowest/80 backdrop-blur-[2px]">
                  <div className="bg-surface-container-highest text-on-surface font-label-md px-5 py-2.5 rounded-full shadow-sm flex items-center gap-2 border border-outline-variant">
                    <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    <span className="font-bold tracking-widest uppercase text-xs text-secondary">{!isRegistrationOpen ? "Registration Closed" : "Max Teams Reached"}</span>
                  </div>
                </div>
              )}
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="font-label-eyebrow text-label-eyebrow uppercase text-secondary tracking-widest">SPEC • 001</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-bold">SCENARIO 01</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2">Smart Health Record & Care Coordination</h3>
                <p className="font-body-sm text-body-sm text-secondary mb-space-md line-clamp-4">Develop a patient-centric platform that unifies medical records, consultations, prescriptions, diagnostic reports, appointments, and follow-up activities across healthcare providers.</p>
              </div>
              <div className="bg-surface-container-low rounded-lg p-space-sm space-y-1.5 font-label-sm text-label-sm text-secondary">
                <div className="flex justify-between"><span className="text-on-surface-variant">INDUSTRY</span><span className="text-on-surface font-medium truncate ml-4">HealthTech / SaaS</span></div>
              </div>
            </Link>

            {/* Scenario 02 */}
            <Link to="/hackathon/scenario/2" className={`block bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between relative overflow-hidden ${availableScenarios && !availableScenarios.includes('SCENARIO 02') ? 'pointer-events-none' : 'cursor-pointer'}`}>
              {availableScenarios && !availableScenarios.includes('SCENARIO 02') && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-surface-container-lowest/80 backdrop-blur-[2px]">
                  <div className="bg-surface-container-highest text-on-surface font-label-md px-5 py-2.5 rounded-full shadow-sm flex items-center gap-2 border border-outline-variant">
                    <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    <span className="font-bold tracking-widest uppercase text-xs text-secondary">{!isRegistrationOpen ? "Registration Closed" : "Max Teams Reached"}</span>
                  </div>
                </div>
              )}
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="font-label-eyebrow text-label-eyebrow uppercase text-secondary tracking-widest">SPEC • 002</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-bold">SCENARIO 02</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2">Smart Campus & City Mobility System</h3>
                <p className="font-body-sm text-body-sm text-secondary mb-space-md line-clamp-4">Develop an intelligent mobility platform that connects passengers, vehicles, routes, and transportation operators through a unified system supporting route discovery and analytics.</p>
              </div>
              <div className="bg-surface-container-low rounded-lg p-space-sm space-y-1.5 font-label-sm text-label-sm text-secondary">
                <div className="flex justify-between"><span className="text-on-surface-variant">INDUSTRY</span><span className="text-on-surface font-medium truncate ml-4">Mobility Tech / Logistics</span></div>
              </div>
            </Link>

            {/* Scenario 03 */}
            <Link to="/hackathon/scenario/3" className={`block bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between relative overflow-hidden ${availableScenarios && !availableScenarios.includes('SCENARIO 03') ? 'pointer-events-none' : 'cursor-pointer'}`}>
              {availableScenarios && !availableScenarios.includes('SCENARIO 03') && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-surface-container-lowest/80 backdrop-blur-[2px]">
                  <div className="bg-surface-container-highest text-on-surface font-label-md px-5 py-2.5 rounded-full shadow-sm flex items-center gap-2 border border-outline-variant">
                    <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    <span className="font-bold tracking-widest uppercase text-xs text-secondary">{!isRegistrationOpen ? "Registration Closed" : "Max Teams Reached"}</span>
                  </div>
                </div>
              )}
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="font-label-eyebrow text-label-eyebrow uppercase text-secondary tracking-widest">SPEC • 003</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-bold">SCENARIO 03</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2">Personal Finance & Expense Intelligence</h3>
                <p className="font-body-sm text-body-sm text-secondary mb-space-md line-clamp-4">Develop a personal finance platform that transforms raw financial transactions into meaningful spending insights, with budgeting and trend analysis dashboards.</p>
              </div>
              <div className="bg-surface-container-low rounded-lg p-space-sm space-y-1.5 font-label-sm text-label-sm text-secondary">
                <div className="flex justify-between"><span className="text-on-surface-variant">INDUSTRY</span><span className="text-on-surface font-medium truncate ml-4">FinTech / Analytics</span></div>
              </div>
            </Link>

            {/* Scenario 04 */}
            <Link to="/hackathon/scenario/4" className={`block bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between relative overflow-hidden ${availableScenarios && !availableScenarios.includes('SCENARIO 04') ? 'pointer-events-none' : 'cursor-pointer'}`}>
              {availableScenarios && !availableScenarios.includes('SCENARIO 04') && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-surface-container-lowest/80 backdrop-blur-[2px]">
                  <div className="bg-surface-container-highest text-on-surface font-label-md px-5 py-2.5 rounded-full shadow-sm flex items-center gap-2 border border-outline-variant">
                    <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    <span className="font-bold tracking-widest uppercase text-xs text-secondary">{!isRegistrationOpen ? "Registration Closed" : "Max Teams Reached"}</span>
                  </div>
                </div>
              )}
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="font-label-eyebrow text-label-eyebrow uppercase text-secondary tracking-widest">SPEC • 004</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-bold">SCENARIO 04</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2">Small Business ERP & Workflow System</h3>
                <p className="font-body-sm text-body-sm text-secondary mb-space-md line-clamp-4">Develop an integrated ERP platform connecting sales, purchasing, inventory, and basic finance operations for SMEs, demonstrating workflow triggers across functions.</p>
              </div>
              <div className="bg-surface-container-low rounded-lg p-space-sm space-y-1.5 font-label-sm text-label-sm text-secondary">
                <div className="flex justify-between"><span className="text-on-surface-variant">INDUSTRY</span><span className="text-on-surface font-medium truncate ml-4">ERP / Enterprise SaaS</span></div>
              </div>
            </Link>

            {/* Scenario 05 */}
            <Link to="/hackathon/scenario/5" className={`block bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between relative overflow-hidden ${availableScenarios && !availableScenarios.includes('SCENARIO 05') ? 'pointer-events-none' : 'cursor-pointer'}`}>
              {availableScenarios && !availableScenarios.includes('SCENARIO 05') && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-surface-container-lowest/80 backdrop-blur-[2px]">
                  <div className="bg-surface-container-highest text-on-surface font-label-md px-5 py-2.5 rounded-full shadow-sm flex items-center gap-2 border border-outline-variant">
                    <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    <span className="font-bold tracking-widest uppercase text-xs text-secondary">{!isRegistrationOpen ? "Registration Closed" : "Max Teams Reached"}</span>
                  </div>
                </div>
              )}
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="font-label-eyebrow text-label-eyebrow uppercase text-secondary tracking-widest">SPEC • 005</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-bold">SCENARIO 05</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2">Unified Campus Student Success Platform</h3>
                <p className="font-body-sm text-body-sm text-secondary mb-space-md line-clamp-4">Develop a unified platform combining academic performance, skills, internships, and placement info into a single profile to provide actionable insights for success.</p>
              </div>
              <div className="bg-surface-container-low rounded-lg p-space-sm space-y-1.5 font-label-sm text-label-sm text-secondary">
                <div className="flex justify-between"><span className="text-on-surface-variant">INDUSTRY</span><span className="text-on-surface font-medium truncate ml-4">EdTech / Campus Tech</span></div>
              </div>
            </Link>

            {/* Spec Architecture Badge Card */}
            <div className="bg-surface-container rounded-2xl p-space-lg flex flex-col justify-between">
              <div>
                <span className="font-label-eyebrow text-label-eyebrow uppercase text-primary  tracking-widest block mb-space-sm">SPECIFICATION ANATOMY</span>
                <p className="font-headline-sm text-headline-sm font-bold text-on-surface mb-space-sm">Every spec is strictly standardized.</p>
                <p className="font-body-sm text-body-sm text-secondary">All 5 sheets define exact background, functional expectations, technical constraints, and demo evaluation targets.</p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-4">
                <span className="text-[10px] uppercase  px-2 py-0.5 rounded bg-surface-container-lowest text-secondary">Background</span>
                <span className="text-[10px] uppercase  px-2 py-0.5 rounded bg-surface-container-lowest text-secondary">Objectives</span>
                <span className="text-[10px] uppercase  px-2 py-0.5 rounded bg-surface-container-lowest text-secondary">Functional Specs</span>
                <span className="text-[10px] uppercase  px-2 py-0.5 rounded bg-surface-container-lowest text-secondary">Constraints</span>
                <span className="text-[10px] uppercase  px-2 py-0.5 rounded bg-surface-container-lowest text-secondary">Output Formats</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 3. SECTION 3 — THE 3 ROUND JOURNEY (GLOBAL OVERVIEW) */}
      <section id="journey" className="w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-gutter py-space-3xl">
        <div className="flex flex-col items-start max-w-2xl mb-space-2xl">
          <span className="font-label-eyebrow text-label-eyebrow uppercase text-primary-container tracking-widest mb-space-xs">THE JOURNEY</span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-on-surface tracking-tight mb-space-sm">
            From Idea to Impact.
          </h2>
          <p className="font-body-lead text-body-lead text-secondary">
            Three progressive phases designed to distill conceptual rigor into production-ready software solutions.
          </p>
        </div>
        {/* 3 Stage Progression Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter relative">
          {/* Stage 01: Idea Challenge */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-space-lg">
                <span className="font-display-hero text-[56px] leading-none font-extrabold text-emerald-600/30 group-hover:text-emerald-600 transition-colors">01</span>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-label-sm text-label-sm  font-bold tracking-wider">
                  ONLINE • 24H
                </span>
              </div>
              <span className="font-label-eyebrow text-label-eyebrow uppercase text-emerald-600 font-bold tracking-widest block mb-1">STAGE 01</span>
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-2">Idea Challenge</h3>
              <p className="font-body-sm text-body-sm text-secondary mb-space-lg">
                Spin the wheel to receive your allocated scenario. Formulate architectural logic and submit a 4-slide standardized proposal.
              </p>
            </div>
            <div className="pt-space-md border-t border-surface-container flex items-center justify-between font-label-sm text-label-sm">
              <span className="text-secondary ">COHORT</span>
              <span className="text-on-surface font-bold">~50 Teams Participating</span>
            </div>
          </div>
          {/* Stage 02: Prototype + Innovation */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-space-lg">
                <span className="font-display-hero text-[56px] leading-none font-extrabold text-blue-600/30 group-hover:text-blue-600 transition-colors">02</span>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-label-sm text-label-sm  font-bold tracking-wider">
                  OFFLINE • 1.5H BUILD
                </span>
              </div>
              <span className="font-label-eyebrow text-label-eyebrow uppercase text-blue-600 font-bold tracking-widest block mb-1">STAGE 02</span>
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-2">Prototype + Innovation</h3>
              <p className="font-body-sm text-body-sm text-secondary mb-space-lg">
                Rapid prototyping sprint. Build the primary requirement and pitch an added original feature that transcends specifications.
              </p>
            </div>
            <div className="pt-space-md border-t border-surface-container flex items-center justify-between font-label-sm text-label-sm">
              <span className="text-secondary ">COHORT</span>
              <span className="text-on-surface font-bold">25 Teams Shortlisted</span>
            </div>
          </div>
          {/* Stage 03: Complete Build */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-space-lg">
                <span className="font-display-hero text-[56px] leading-none font-extrabold text-rose-600/30 group-hover:text-rose-600 transition-colors">03</span>
                <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 font-label-sm text-label-sm  font-bold tracking-wider">
                  OFFLINE • 3–4H
                </span>
              </div>
              <span className="font-label-eyebrow text-label-eyebrow uppercase text-rose-600 font-bold tracking-widest block mb-1">STAGE 03</span>
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-2">Complete Build</h3>
              <p className="font-body-sm text-body-sm text-secondary mb-space-lg">
                Integrate frontend, backend, telemetry, and live data models inside the MCET Department Library for the ultimate jury demo.
              </p>
            </div>
            <div className="pt-space-md border-t border-surface-container flex items-center justify-between font-label-sm text-label-sm">
              <span className="text-secondary ">COHORT</span>
              <span className="text-on-surface font-bold">14–15 Finalists</span>
            </div>
          </div>
        </div>
      </section>
      {/* 4. ROUND 01 DEEP DIVE (GREEN ACCENT #22A06B) */}
      <section className="w-full bg-emerald-950/[0.02] py-space-3xl border-t border-emerald-600/10" id="round1">
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-gutter">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md mb-space-2xl">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-label-eyebrow text-label-eyebrow uppercase tracking-widest mb-space-xs">
                ROUND 01 • IDEA CHALLENGE
              </div>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-on-surface tracking-tight">
                Think Before You Build.
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2  font-label-sm text-label-sm text-secondary bg-surface-container-lowest px-4 py-2 rounded-lg shadow-sm">
              <span>~50 TEAMS</span>
              <span>•</span>
              <span>ONLINE</span>
              <span>•</span>
              <span>~24 HOURS</span>
              <span>•</span>
              <span className="text-emerald-700 font-bold">MONDAY • 6:00 PM</span>
            </div>
          </div>
          {/* Narrative & Flow */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-space-2xl items-center">
            <div className="lg:col-span-7 space-y-space-md">
              <p className="font-body-lead text-body-lead text-secondary">
                The five scenario-based problem statements will be published on the Infobee portal. Teams initiate their run with an allocation draw, giving exactly 10 teams per scenario a level competitive substrate.
              </p>
              {/* Step Progression Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-space-sm">
                <div className="bg-surface-container-lowest p-3 rounded-lg text-center shadow-sm">
                  <span className="text-[10px]  text-emerald-700 block font-bold">STEP 01</span>
                  <span className="font-label-md text-label-md font-bold text-on-surface">Register</span>
                </div>
                <div className="bg-surface-container-lowest p-3 rounded-lg text-center shadow-sm">
                  <span className="text-[10px]  text-emerald-700 block font-bold">STEP 02</span>
                  <span className="font-label-md text-label-md font-bold text-on-surface">Spin Wheel</span>
                </div>
                <div className="bg-surface-container-lowest p-3 rounded-lg text-center shadow-sm">
                  <span className="text-[10px]  text-emerald-700 block font-bold">STEP 03</span>
                  <span className="font-label-md text-label-md font-bold text-on-surface">Allocated</span>
                </div>
                <div className="bg-surface-container-lowest p-3 rounded-lg text-center shadow-sm">
                  <span className="text-[10px]  text-emerald-700 block font-bold">STEP 04</span>
                  <span className="font-label-md text-label-md font-bold text-on-surface">4-Slide PPT</span>
                </div>
                <div className="bg-surface-container-lowest p-3 rounded-lg text-center shadow-sm col-span-2 sm:col-span-1">
                  <span className="text-[10px]  text-emerald-700 block font-bold">STEP 05</span>
                  <span className="font-label-md text-label-md font-bold text-on-surface">Submit</span>
                </div>
              </div>
            </div>
            {/* Spin-Wheel Preview Graphic (Clean Inline SVG) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 bg-surface-container-lowest rounded-full p-4 shadow-lg flex items-center justify-center">
                {/* Inline SVG Wheel */}
                <svg className="w-full h-full transform -rotate-18" viewBox="0 0 200 200">
                  {/* Slices */}
                  <circle cx="100" cy="100" fill="none" r="94" stroke="#e8eeff" strokeWidth="2" />
                  <path d="M100,100 L100,8 A92,92 0 0,1 187,71 Z" fill="#22A06B" fillOpacity="0.15" />
                  <path d="M100,100 L187,71 A92,92 0 0,1 154,174 Z" fill="#22A06B" fillOpacity="0.25" />
                  <path d="M100,100 L154,174 A92,92 0 0,1 46,174 Z" fill="#22A06B" fillOpacity="0.10" />
                  <path d="M100,100 L46,174 A92,92 0 0,1 13,71 Z" fill="#22A06B" fillOpacity="0.20" />
                  <path d="M100,100 L13,71 A92,92 0 0,1 100,8 Z" fill="#22A06B" fillOpacity="0.30" />
                  {/* Dividers */}
                  <line stroke="#ffffff" strokeWidth="2" x1="100" x2="100" y1="100" y2="8" />
                  <line stroke="#ffffff" strokeWidth="2" x1="100" x2="187" y1="100" y2="71" />
                  <line stroke="#ffffff" strokeWidth="2" x1="100" x2="154" y1="100" y2="174" />
                  <line stroke="#ffffff" strokeWidth="2" x1="100" x2="46" y1="100" y2="174" />
                  <line stroke="#ffffff" strokeWidth="2" x1="100" x2="13" y1="100" y2="71" />
                </svg>
                {/* Center Hub */}
                <div className="absolute w-24 h-24 rounded-full bg-surface-container-lowest shadow-md flex flex-col items-center justify-center text-center p-2">
                  <span className="material-symbols-outlined text-emerald-600 text-lg">autorenew</span>
                  <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface">5 Scenarios</span>
                  <span className="text-[9px]  text-secondary">Random Draw</span>
                </div>
              </div>
            </div>
          </div>
          {/* PPT Challenge: 4 Slides Specifications */}
          <div className="mt-space-xl">
            <div className="flex items-center justify-between mb-space-lg">
              <div>
                <span className="font-label-eyebrow text-label-eyebrow uppercase text-emerald-600 font-bold tracking-widest block">STANDARDIZED TEMPLATE</span>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Four Slides. One Strong Idea.</h3>
              </div>
              <div className="bg-rose-50 text-rose-700 font-label-sm text-label-sm  font-bold px-3 py-1.5 rounded-lg">
                DEADLINE: TUESDAY • 1:00 PM
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
              {/* Slide 01 */}
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border-t-2 border-emerald-600 flex flex-col justify-between">
                <div>
                  <span className=" text-emerald-700 font-bold text-label-sm block mb-1">SLIDE 01</span>
                  <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2">Solution</h4>
                  <p className="font-body-sm text-body-sm text-secondary">Define the core problem clearly and present your team's proposed solution and countermeasure concisely.</p>
                </div>
                <div className="pt-4 mt-4 border-t border-surface-container text-[11px]  text-secondary">
                  Problem &amp; Solution
                </div>
              </div>
              {/* Slide 02 */}
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border-t-2 border-emerald-600 flex flex-col justify-between">
                <div>
                  <span className=" text-emerald-700 font-bold text-label-sm block mb-1">SLIDE 02</span>
                  <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2">Architecture</h4>
                  <p className="font-body-sm text-body-sm text-secondary">Visual system workflow diagram, user journey, architecture blocks, and data piping models.</p>
                </div>
                <div className="pt-4 mt-4 border-t border-surface-container text-[11px]  text-secondary">
                  Logic &amp; Schema
                </div>
              </div>
              {/* Slide 03 */}
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border-t-2 border-emerald-600 flex flex-col justify-between">
                <div>
                  <span className=" text-emerald-700 font-bold text-label-sm block mb-1">SLIDE 03</span>
                  <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2">Technical Approach</h4>
                  <p className="font-body-sm text-body-sm text-secondary">Detailed explanation of the tech stack, algorithms, and methodologies used to build the solution.</p>
                </div>
                <div className="pt-4 mt-4 border-t border-surface-container text-[11px]  text-secondary">
                  Tech Stack &amp; Implementation
                </div>
              </div>
              {/* Slide 04 */}
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border-t-2 border-emerald-600 flex flex-col justify-between">
                <div>
                  <span className=" text-emerald-700 font-bold text-label-sm block mb-1">SLIDE 04</span>
                  <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2">Impact and Outcome</h4>
                  <p className="font-body-sm text-body-sm text-secondary">Core engineering innovation factor, expected deliverables, and prospective future implementation scope.</p>
                </div>
                <div className="pt-4 mt-4 border-t border-surface-container text-[11px]  text-secondary">
                  Value &amp; Roadmap
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 5. ROUND 02 DEEP DIVE (BLUE ACCENT #3578E5) */}
      <section className="w-full bg-blue-950/[0.02] py-space-3xl border-t border-blue-600/10" id="round2">
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-gutter">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md mb-space-2xl">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-label-eyebrow text-label-eyebrow uppercase tracking-widest mb-space-xs">
                ROUND 02 • PROTOTYPE + INNOVATION
              </div>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-on-surface tracking-tight">
                Stop Explaining. Start Building.
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2  font-label-sm text-label-sm text-secondary bg-surface-container-lowest px-4 py-2 rounded-lg shadow-sm">
              <span>25 SHORTLISTED TEAMS</span>
              <span>•</span>
              <span>OFFLINE</span>
              <span>•</span>
              <span>1.5 HOURS BUILD</span>
              <span>•</span>
              <span className="text-blue-700 font-bold">1 HOUR JURY</span>
            </div>
          </div>
          {/* Supported Formats Matrix */}
          <div className="mb-space-2xl">
            <span className="font-label-eyebrow text-label-eyebrow uppercase text-blue-600 font-bold tracking-widest block mb-space-md">SUPPORTED PROTOTYPING DOMAINS</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-gutter-sm">
              <div className="bg-surface-container-lowest p-4 rounded-xl text-center shadow-sm">
                <span className="material-symbols-outlined text-blue-600 mb-2">web</span>
                <span className="font-label-md text-label-md font-bold text-on-surface block">Web App</span>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-xl text-center shadow-sm">
                <span className="material-symbols-outlined text-blue-600 mb-2">smartphone</span>
                <span className="font-label-md text-label-md font-bold text-on-surface block">Mobile App</span>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-xl text-center shadow-sm">
                <span className="material-symbols-outlined text-blue-600 mb-2">dns</span>
                <span className="font-label-md text-label-md font-bold text-on-surface block">Software Sys</span>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-xl text-center shadow-sm">
                <span className="material-symbols-outlined text-blue-600 mb-2">analytics</span>
                <span className="font-label-md text-label-md font-bold text-on-surface block">Dashboard</span>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-xl text-center shadow-sm">
                <span className="material-symbols-outlined text-blue-600 mb-2">api</span>
                <span className="font-label-md text-label-md font-bold text-on-surface block">API Integration</span>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-xl text-center shadow-sm">
                <span className="material-symbols-outlined text-blue-600 mb-2">cloud</span>
                <span className="font-label-md text-label-md font-bold text-on-surface block">Cloud Native</span>
              </div>
            </div>
          </div>
          {/* Feature: The Innovation Pitch (The Key Differentiator) */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm mb-space-2xl border-l-4 border-blue-600">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
              <div className="lg:col-span-7">
                <span className="font-label-eyebrow text-label-eyebrow uppercase text-blue-600 font-bold tracking-widest block mb-1">INNOVATION PITCH MANDATE</span>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-space-sm">Go Beyond the Requirement.</h3>
                <p className="font-body-md text-body-md text-secondary mb-space-md">
                  Along with the prototype, each team must identify and implement an additional innovative idea that adds unmistakable value beyond the baseline requirements.
                </p>
              </div>
              <div className="lg:col-span-5 bg-surface-container-low rounded-xl p-space-md space-y-3">
                <div className=" text-[11px] text-secondary">CONCEPTUAL SHOWCASE</div>
                <div className="p-3 bg-surface-container-lowest rounded-lg">
                  <span className="text-[10px]  text-secondary uppercase block">Given Baseline</span>
                  <span className="font-label-md text-label-md font-bold text-on-surface">Student Notification Feed</span>
                </div>
                <div className="text-center text-blue-600 font-bold">↓ ↓</div>
                <div className="p-3 bg-blue-50 text-blue-900 rounded-lg">
                  <span className="text-[10px]  text-blue-700 uppercase block font-bold">Team Innovation</span>
                  <span className="font-label-md text-label-md font-bold">Personalized Alerts • Priority Queuing • Predictive Schedule Anomaly Triage</span>
                </div>
              </div>
            </div>
          </div>
          {/* Round 02 Official Schedule Table */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm">
            <span className="font-label-eyebrow text-label-eyebrow uppercase text-secondary  tracking-widest block mb-space-md">OFFLINE TIME MATRIX</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-4 rounded-xl bg-surface-container-low">
                <div className=" font-bold text-blue-600 text-headline-sm">2:00 PM – 3:30 PM</div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-bold text-on-surface">Prototype Development</span>
                  <span className="font-body-sm text-body-sm text-secondary">Rapid coding, system integration, and pitch deck finalization</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-4 rounded-xl bg-surface-container-low">
                <div className=" font-bold text-blue-600 text-headline-sm">3:30 PM – 4:30 PM</div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-bold text-on-surface">Jury Evaluation &amp; Shortlist</span>
                  <span className="font-body-sm text-body-sm text-secondary">25 Teams evaluated → 14–15 Finalists selected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 6. ROUND 03 DEEP DIVE (RED ACCENT #D64545) */}
      <section className="w-full bg-rose-950/[0.02] py-space-3xl border-t border-rose-600/10" id="round3">
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-gutter">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md mb-space-2xl">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 font-label-eyebrow text-label-eyebrow uppercase tracking-widest mb-space-xs">
                ROUND 03 • COMPLETE BUILD
              </div>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-on-surface tracking-tight">
                Now Make It Real.
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2  font-label-sm text-label-sm text-secondary bg-surface-container-lowest px-4 py-2 rounded-lg shadow-sm">
              <span>14–15 FINALISTS</span>
              <span>•</span>
              <span className="text-rose-700 font-bold">DEPARTMENT LIBRARY</span>
              <span>•</span>
              <span>THURSDAY MORNING</span>
              <span>•</span>
              <span>3–4 HOURS</span>
            </div>
          </div>
          {/* Narrative */}
          <div className="max-w-3xl mb-space-xl">
            <p className="font-body-lead text-body-lead text-secondary">
              Finalists take their original problem statement, requirements, prototype and innovation and turn them into a complete working product. No shortcuts, mock data, or stubbed endpoints.
            </p>
          </div>
          {/* Product Building Architecture Diagram (Typographic Block Pipeline) */}
          <div className="w-full bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm mb-space-2xl">
            <span className="font-label-eyebrow text-label-eyebrow uppercase text-rose-600 font-bold tracking-widest block mb-space-md">SYSTEM INTEGRATION PIPELINE</span>
            <div className="flex flex-wrap items-center justify-between gap-2  font-label-sm text-label-sm">
              <span className="px-3 py-2 rounded bg-surface-container-low font-bold">FRONTEND</span>
              <span className="text-secondary">+</span>
              <span className="px-3 py-2 rounded bg-surface-container-low font-bold">BACKEND</span>
              <span className="text-secondary">+</span>
              <span className="px-3 py-2 rounded bg-surface-container-low font-bold">DATABASE</span>
              <span className="text-secondary">+</span>
              <span className="px-3 py-2 rounded bg-surface-container-low font-bold">API</span>
              <span className="text-secondary">+</span>
              <span className="px-3 py-2 rounded bg-surface-container-low font-bold">CORE FEAT.</span>
              <span className="text-secondary">+</span>
              <span className="px-3 py-2 rounded bg-rose-50 text-rose-700 font-bold">INNOVATION</span>
              <span className="text-secondary">+</span>
              <span className="px-3 py-2 rounded bg-surface-container-low font-bold">TESTING</span>
              <span className="text-secondary">→</span>
              <span className="px-4 py-2 rounded bg-rose-600 text-on-primary font-bold shadow-sm">FINAL PRODUCT</span>
            </div>
          </div>
          {/* Grid: Schedule & What You Present */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            {/* Schedule Column */}
            <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-label-eyebrow text-label-eyebrow uppercase text-secondary  tracking-widest block mb-space-md">THURSDAY RUN OF SHOW</span>
                <div className="space-y-4">
                  <div className="border-l-2 border-rose-600 pl-4">
                    <span className=" text-label-sm text-rose-700 font-bold block">9:00 AM – 12:30 PM</span>
                    <span className="font-label-md text-label-md font-bold text-on-surface">Complete Product Development</span>
                    <p className="font-body-sm text-body-sm text-secondary">Intensive full-stack development, database schema lock, and component synthesis.</p>
                  </div>
                  <div className="border-l-2 border-rose-600/40 pl-4">
                    <span className=" text-label-sm text-secondary font-bold block">12:30 PM – 1:00 PM</span>
                    <span className="font-label-md text-label-md font-bold text-on-surface">Final Testing &amp; Submission</span>
                    <p className="font-body-sm text-body-sm text-secondary">Local deployment verification, codebase freeze, and environment prep.</p>
                  </div>
                  <div className="border-l-2 border-rose-600 pl-4">
                    <span className=" text-label-sm text-rose-700 font-bold block">1:00 PM ONWARDS</span>
                    <span className="font-label-md text-label-md font-bold text-on-surface">Final Demo &amp; Jury Evaluation</span>
                    <p className="font-body-sm text-body-sm text-secondary">Interactive defense before the external and faculty evaluation board.</p>
                  </div>
                </div>
              </div>
              <div className="mt-space-md p-3 bg-surface-container-low rounded-lg  text-[11px] text-secondary">
                VENUE: MCET Department Library
              </div>
            </div>
            {/* Final Demo Checklist */}
            <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm">
              <span className="font-label-eyebrow text-label-eyebrow uppercase text-rose-600 font-bold tracking-widest block mb-space-sm">WHAT YOU PRESENT</span>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-space-md">The 7-Point Final Evaluation Rubric</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-body-sm text-body-sm">
                <div className="p-3 bg-surface-container-low rounded-lg flex items-center gap-3">
                  <span className=" font-bold text-rose-700">01</span>
                  <span className="font-medium text-on-surface">The Identified Scenario Problem</span>
                </div>
                <div className="p-3 bg-surface-container-low rounded-lg flex items-center gap-3">
                  <span className=" font-bold text-rose-700">02</span>
                  <span className="font-medium text-on-surface">The Architectural Solution</span>
                </div>
                <div className="p-3 bg-surface-container-low rounded-lg flex items-center gap-3">
                  <span className=" font-bold text-rose-700">03</span>
                  <span className="font-medium text-on-surface">Added Value Innovation</span>
                </div>
                <div className="p-3 bg-surface-container-low rounded-lg flex items-center gap-3">
                  <span className=" font-bold text-rose-700">04</span>
                  <span className="font-medium text-on-surface">Technology Stack Rigor</span>
                </div>
                <div className="p-3 bg-surface-container-low rounded-lg flex items-center gap-3">
                  <span className=" font-bold text-rose-700">05</span>
                  <span className="font-medium text-on-surface">All Functional Specs Fulfilled</span>
                </div>
                <div className="p-3 bg-surface-container-low rounded-lg flex items-center gap-3">
                  <span className=" font-bold text-rose-700">06</span>
                  <span className="font-medium text-rose-700 font-bold">Unbroken Live System Demo</span>
                </div>
                <div className="p-3 bg-surface-container-low rounded-lg flex items-center gap-3 sm:col-span-2">
                  <span className=" font-bold text-rose-700">07</span>
                  <span className="font-medium text-on-surface">Future Implementation Scope &amp; Scalability Potential</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 7. COMPLETE JOURNEY SUMMARY & BUILD IT YOUR WAY */}
      <section className="w-full bg-surface py-space-3xl border-t border-surface-container">
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-gutter">
          <div className="text-center max-w-2xl mx-auto mb-space-2xl">
            <span className="font-label-eyebrow text-label-eyebrow uppercase text-primary-container tracking-widest mb-space-xs block">SUMMARY</span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-on-surface tracking-tight mb-space-sm">
              One Journey. Three Rounds. A Complete Product.
            </h2>
            <p className="font-body-lead text-body-lead text-secondary">
              The rigorous competitive funnel engineered to surface the highest caliber builders.
            </p>
          </div>
          {/* Funnel Stats Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-space-3xl">
            <div className="bg-surface-container-low p-4 rounded-xl text-center">
              <span className="font-display-hero text-[32px] leading-tight font-bold text-on-surface block">50</span>
              <span className="font-label-sm text-label-sm  text-secondary uppercase">Teams In</span>
            </div>
            <div className="bg-surface-container-low p-4 rounded-xl text-center">
              <span className="font-display-hero text-[32px] leading-tight font-bold text-on-surface block">05</span>
              <span className="font-label-sm text-label-sm  text-secondary uppercase">Scenarios</span>
            </div>
            <div className="bg-surface-container-low p-4 rounded-xl text-center">
              <span className="font-display-hero text-[32px] leading-tight font-bold text-emerald-600 block">25</span>
              <span className="font-label-sm text-label-sm  text-secondary uppercase">Shortlisted</span>
            </div>
            <div className="bg-surface-container-low p-4 rounded-xl text-center">
              <span className="font-display-hero text-[32px] leading-tight font-bold text-blue-600 block">14–15</span>
              <span className="font-label-sm text-label-sm  text-secondary uppercase">Finalists</span>
            </div>
            <div className="bg-surface-container-low p-4 rounded-xl text-center">
              <span className="font-display-hero text-[32px] leading-tight font-bold text-rose-600 block">01</span>
              <span className="font-label-sm text-label-sm  text-secondary uppercase">Product Build</span>
            </div>
            <div className="bg-surface-container-low p-4 rounded-xl text-center">
              <span className="font-display-hero text-[32px] leading-tight font-bold text-primary-container block">LIVE</span>
              <span className="font-label-sm text-label-sm  text-secondary uppercase">Jury Demo</span>
            </div>
          </div>
          {/* 'Build It Your Way' Section */}
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
              <div>
                <span className="font-label-eyebrow text-label-eyebrow uppercase text-primary font-bold tracking-widest block">STACK AGNOSTIC</span>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Build It Your Way.</h3>
              </div>
              <p className="font-body-sm text-body-sm text-secondary max-w-md mt-2 md:mt-0">
                No mandatory framework lock-in. Choose the architectural tools best suited for your team's solution.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              <div className="bg-surface-container-lowest p-4 rounded-xl text-center shadow-sm hover:border-primary transition-all">
                <span className=" font-bold text-label-md text-on-surface block">WEB</span>
                <span className="text-[10px] text-secondary ">React / Vue / Next</span>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-xl text-center shadow-sm hover:border-primary transition-all">
                <span className=" font-bold text-label-md text-on-surface block">MOBILE</span>
                <span className="text-[10px] text-secondary ">Flutter / Native</span>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-xl text-center shadow-sm hover:border-primary transition-all">
                <span className=" font-bold text-label-md text-on-surface block">SOFTWARE</span>
                <span className="text-[10px] text-secondary ">Python / Go / C++</span>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-xl text-center shadow-sm hover:border-primary transition-all">
                <span className=" font-bold text-label-md text-on-surface block">DASHBOARD</span>
                <span className="text-[10px] text-secondary ">Telemetry / BI</span>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-xl text-center shadow-sm hover:border-primary transition-all">
                <span className=" font-bold text-label-md text-on-surface block">CLOUD</span>
                <span className="text-[10px] text-secondary ">AWS / GCP / Azure</span>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-xl text-center shadow-sm hover:border-primary transition-all">
                <span className=" font-bold text-label-md text-on-surface block">AI / ML</span>
                <span className="text-[10px] text-secondary ">PyTorch / TF</span>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-xl text-center shadow-sm hover:border-primary transition-all">
                <span className=" font-bold text-label-md text-on-surface block">IOT</span>
                <span className="text-[10px] text-secondary ">MQTT / Protocols</span>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-xl text-center shadow-sm hover:border-primary transition-all">
                <span className=" font-bold text-label-md text-on-surface block">FULL-STACK</span>
                <span className="text-[10px] text-secondary ">End-to-End</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 7.5 DOWNLOADS SECTION */}
      <section className="w-full bg-surface-container-low/20 py-space-2xl border-t border-surface-container" id="downloads">
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-gutter">
          <div className="flex flex-col md:flex-row items-center justify-between gap-space-lg bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm border border-surface-container">
            <div className="flex-1">
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-2">Hackathon Resources</h3>
              <p className="font-body-md text-body-md text-secondary">
                Download the detailed problem statements and the official PowerPoint template for your presentation.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="/Problem_Statements.docx" download className="inline-flex items-center justify-center gap-2 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-bold px-6 py-3.5 rounded-lg shadow-sm transition-all duration-200 hover:-translate-y-0.5">
                <span>Scenarios (.docx)</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
              </a>
              <a href="/InfoBee_Hackathon.pptx" download className="inline-flex items-center justify-center gap-2 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-bold px-6 py-3.5 rounded-lg shadow-sm transition-all duration-200 hover:-translate-y-0.5">
                <span>PPTX Template</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* 8. FAQ ACCORDIONS */}
      <section className="w-full bg-surface-container-low/40 py-space-3xl" id="faq">
        <div className="max-w-[960px] mx-auto px-margin-mobile md:px-margin-tablet">
          <div className="text-center max-w-xl mx-auto mb-space-2xl">
            <span className="font-label-eyebrow text-label-eyebrow uppercase text-primary-container tracking-widest mb-space-xs block">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-on-surface tracking-tight mb-space-sm">
              Everything You Need to Know.
            </h2>
            <p className="font-body-md text-body-md text-secondary">
              Clear answers according strictly to the official Infobee Hackathon 2026 regulations.
            </p>
          </div>
          <div className="space-y-3" id="faq-container">
            {/* Q1 */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden faq-item">
              <button className="w-full p-space-md text-left flex items-center justify-between font-label-md text-label-md font-bold text-on-surface focus:outline-none" onClick={() => toggleFaq(0)}>
                <span>How many members can be in a team?</span>
                <span className={`material-symbols-outlined text-secondary transition-transform ${openFaqIndex === 0 ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              <div className={`px-space-md pb-space-md text-secondary font-body-sm text-body-sm ${openFaqIndex === 0 ? 'block' : 'hidden'}`}>
                Teams can consist of 2 to 4 eligible students currently enrolled in Dr. Mahalingam College of Engineering and Technology (MCET). Inter-year collaboration within engineering cohorts is allowed.
              </div>
            </div>
            {/* Q2 */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden faq-item">
              <button className="w-full p-space-md text-left flex items-center justify-between font-label-md text-label-md font-bold text-on-surface focus:outline-none" onClick={() => toggleFaq(1)}>
                <span>What happens after registration?</span>
                <span className={`material-symbols-outlined text-secondary transition-transform ${openFaqIndex === 1 ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              <div className={`px-space-md pb-space-md text-secondary font-body-sm text-body-sm ${openFaqIndex === 1 ? 'block' : 'hidden'}`}>
                Upon confirmed registration, your team lead gains access to the allocation system. You will trigger the digital spin-wheel to be assigned one of the five official challenge scenarios.
              </div>
            </div>
            {/* Q3 */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden faq-item">
              <button className="w-full p-space-md text-left flex items-center justify-between font-label-md text-label-md font-bold text-on-surface focus:outline-none" onClick={() => toggleFaq(2)}>
                <span>How is the scenario allocated?</span>
                <span className={`material-symbols-outlined text-secondary transition-transform ${openFaqIndex === 2 ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              <div className={`px-space-md pb-space-md text-secondary font-body-sm text-body-sm ${openFaqIndex === 2 ? 'block' : 'hidden'}`}>
                Scenarios are allocated through a randomized digital spin-wheel mechanism. Exactly ~10 teams are assigned per scenario across the 50 participating teams to ensure balanced evaluation cohorts.
              </div>
            </div>
            {/* Q4 */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden faq-item">
              <button className="w-full p-space-md text-left flex items-center justify-between font-label-md text-label-md font-bold text-on-surface focus:outline-none" onClick={() => toggleFaq(3)}>
                <span>How many scenarios are available?</span>
                <span className={`material-symbols-outlined text-secondary transition-transform ${openFaqIndex === 3 ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              <div className={`px-space-md pb-space-md text-secondary font-body-sm text-body-sm ${openFaqIndex === 3 ? 'block' : 'hidden'}`}>
                There are exactly 5 standardized scenario-based problem statements published on the official Infobee portal.
              </div>
            </div>
            {/* Q5 */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden faq-item">
              <button className="w-full p-space-md text-left flex items-center justify-between font-label-md text-label-md font-bold text-on-surface focus:outline-none" onClick={() => toggleFaq(4)}>
                <span>What is required for Round 1?</span>
                <span className={`material-symbols-outlined text-secondary transition-transform ${openFaqIndex === 4 ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              <div className={`px-space-md pb-space-md text-secondary font-body-sm text-body-sm ${openFaqIndex === 4 ? 'block' : 'hidden'}`}>
                Teams have a ~24-hour online window starting Monday at 6:00 PM to conceptualize their solution and upload a strictly standardized 4-slide presentation before Tuesday 1:00 PM.
              </div>
            </div>
            {/* Q6 */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden faq-item">
              <button className="w-full p-space-md text-left flex items-center justify-between font-label-md text-label-md font-bold text-on-surface focus:outline-none" onClick={() => toggleFaq(5)}>
                <span>How many slides should the PPT contain?</span>
                <span className={`material-symbols-outlined text-secondary transition-transform ${openFaqIndex === 5 ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              <div className={`px-space-md pb-space-md text-secondary font-body-sm text-body-sm ${openFaqIndex === 5 ? 'block' : 'hidden'}`}>
                Exactly 4 slides: Slide 1 (Title & Team Details), Slide 2 (Abstract & Problem Analysis), Slide 3 (System Architecture & Workflow), and Slide 4 (Innovation, Outcome & Future Scope). Extra slides are automatically penalized.
              </div>
            </div>
            {/* Q7 */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden faq-item">
              <button className="w-full p-space-md text-left flex items-center justify-between font-label-md text-label-md font-bold text-on-surface focus:outline-none" onClick={() => toggleFaq(6)}>
                <span>Are there restrictions on the tech stack?</span>
                <span className={`material-symbols-outlined text-secondary transition-transform ${openFaqIndex === 6 ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              <div className={`px-space-md pb-space-md text-secondary font-body-sm text-body-sm ${openFaqIndex === 6 ? 'block' : 'hidden'}`}>
                No. You are free to use any modern software technology stack—be it web frameworks, mobile SDKs, cloud services, APIs, or AI models—as long as it solves the problem statement effectively.
              </div>
            </div>
            {/* Q8 */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden faq-item">
              <button className="w-full p-space-md text-left flex items-center justify-between font-label-md text-label-md font-bold text-on-surface focus:outline-none" onClick={() => toggleFaq(7)}>
                <span>What happens in Round 2?</span>
                <span className={`material-symbols-outlined text-secondary transition-transform ${openFaqIndex === 7 ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              <div className={`px-space-md pb-space-md text-secondary font-body-sm text-body-sm ${openFaqIndex === 7 ? 'block' : 'hidden'}`}>
                25 shortlisted teams gather offline for a 1.5-hour prototyping sprint (2:00 PM – 3:30 PM), followed by a 1-hour jury evaluation where they present their working prototype along with their distinct added-value innovation.
              </div>
            </div>
            {/* Q9 */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden faq-item">
              <button className="w-full p-space-md text-left flex items-center justify-between font-label-md text-label-md font-bold text-on-surface focus:outline-none" onClick={() => toggleFaq(8)}>
                <span>What happens in Round 3?</span>
                <span className={`material-symbols-outlined text-secondary transition-transform ${openFaqIndex === 8 ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              <div className={`px-space-md pb-space-md text-secondary font-body-sm text-body-sm ${openFaqIndex === 8 ? 'block' : 'hidden'}`}>
                14 to 15 finalist teams spend 3.5 hours on Thursday morning building a complete, production-ready product with live functional data, followed by code freeze and live jury demonstrations.
              </div>
            </div>
            {/* Q10 */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden faq-item">
              <button className="w-full p-space-md text-left flex items-center justify-between font-label-md text-label-md font-bold text-on-surface focus:outline-none" onClick={() => toggleFaq(9)}>
                <span>Where will the final round take place?</span>
                <span className={`material-symbols-outlined text-secondary transition-transform ${openFaqIndex === 9 ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              <div className={`px-space-md pb-space-md text-secondary font-body-sm text-body-sm ${openFaqIndex === 9 ? 'block' : 'hidden'}`}>
                The final round will take place offline inside the Dr. MCET Department Library, equipped with power rails, high-throughput network access, and demo presentation setups.
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 9. FINAL CALL TO ACTION */}
      <section className="w-full bg-surface py-space-3xl border-t border-surface-container relative" id="register">
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-gutter text-center">
          <div className="max-w-2xl mx-auto space-y-space-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-primary font-label-eyebrow text-label-eyebrow uppercase tracking-widest">
              Infobee • Dr. MCET
            </div>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-on-surface tracking-tight">
              Ready to Build?
            </h2>
            <p className="font-body-lead text-body-lead text-secondary">
              Register your team. Get your scenario. Build something real.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-space-sm w-full">
              {isRegistrationOpen ? (
                <Link className="w-full sm:w-auto inline-flex items-center justify-center bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-bold px-8 py-4 rounded-lg shadow-sm transition-all duration-200 hover:-translate-y-0.5" to="/hackathon/register">
                  REGISTER YOUR TEAM →
                </Link>
              ) : (
                <div className="w-full sm:w-auto inline-flex items-center justify-center bg-gray-300 text-gray-700 font-label-md text-label-md font-bold px-8 py-4 rounded-lg shadow-sm cursor-not-allowed">
                  REGISTRATION CLOSED
                </div>
              )}
              <a className="w-full sm:w-auto inline-flex items-center justify-center bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold px-8 py-4 rounded-lg shadow-sm transition-colors" href="#challenge">
                VIEW THE 3 ROUNDS →
              </a>
            </div>
            <div className="pt-space-md flex items-center justify-center gap-6  text-[11px] text-secondary uppercase">
              <span>50 TEAMS</span>
              <span>•</span>
              <span>3 ROUNDS</span>
              <span>•</span>
              <span>1 COMPLETE PRODUCT</span>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
}
