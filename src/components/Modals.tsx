import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin, Clock, User, Mail, CheckCircle2, Ticket, QrCode, CreditCard, ChevronLeft, ChevronRight, Award, Shield, Sparkles, Info } from 'lucide-react';
import { EventItem, JoinRequest } from '../types';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventItem | null;
  onRegisterSuccess: (eventId: string, ticketCode: string) => void;
}

export function RegisterModal({ isOpen, onClose, event, onRegisterSuccess }: RegisterModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dept, setDept] = useState('Information Technology');
  const [year, setYear] = useState('Third Year');
  const [submitting, setSubmitting] = useState(false);
  const [ticket, setTicket] = useState<{ code: string; name: string; email: string } | null>(null);

  if (!event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setSubmitting(true);
    setTimeout(() => {
      const ticketCode = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicket({
        code: ticketCode,
        name,
        email
      });
      setSubmitting(false);
      onRegisterSuccess(event.id, ticketCode);
    }, 1200);
  };

  const handleFinish = () => {
    setTicket(null);
    setName('');
    setEmail('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={handleFinish}
            className="absolute inset-0 bg-black/70 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white text-gray-900 border border-gray-100 w-full max-w-md shadow-2xl overflow-hidden z-10"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-brand-dark text-white">
              <span className="font-display font-bold text-sm flex items-center gap-2">
                <Ticket className="w-4 h-4 text-brand-orange animate-pulse" />
                <span>Event Entry registration</span>
              </span>
              <button onClick={handleFinish} className="p-1 rounded-sm text-gray-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6">
              {!ticket ? (
                /* Registration Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="bg-gray-50 border border-gray-200 p-3.5 rounded-none mb-2">
                    <span className="block text-[9px] font-mono font-bold text-brand-orange uppercase tracking-wider">EVENT REGISTERING:</span>
                    <h4 className="font-display font-bold text-sm text-gray-900 mt-1">{event.title}</h4>
                    <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-gray-400" />{event.date}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-gray-400" />Block C, MCET</span>
                    </div>
                  </div>

                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Adithya R"
                      className="w-full px-3 py-2 border border-gray-300 rounded-none focus:border-brand-orange outline-none text-xs"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">College Email ID</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. adithya.it20@mcet.in"
                      className="w-full px-3 py-2 border border-gray-300 rounded-none focus:border-brand-orange outline-none text-xs font-mono"
                    />
                  </div>

                  {/* Department & Year selects */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">Department</label>
                      <select
                        value={dept}
                        onChange={(e) => setDept(e.target.value)}
                        className="w-full px-2.5 py-2 border border-gray-300 rounded-none focus:border-brand-orange outline-none text-xs bg-white"
                      >
                        <option>Information Technology</option>
                        <option>Computer Science</option>
                        <option>Electronics & Comm</option>
                        <option>Electrical & Electronics</option>
                        <option>Artificial Intelligence</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">Academic Year</label>
                      <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full px-2.5 py-2 border border-gray-300 rounded-none focus:border-brand-orange outline-none text-xs bg-white"
                      >
                        <option>First Year</option>
                        <option>Second Year</option>
                        <option>Third Year</option>
                        <option>Fourth Year</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold tracking-widest py-3 rounded-none uppercase transition-colors flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? 'GENERATING PASS...' : 'CONFIRM FREE REGISTRATION'}
                  </button>
                </form>
              ) : (
                /* Generated Digital Entry Ticket pass */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-5"
                >
                  <div className="text-center space-y-2">
                    <div className="inline-flex p-2 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-600 mb-1">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-gray-900 leading-none">Registration Confirmed!</h3>
                    <p className="text-xs text-gray-500">Present this digital ticket at the Block C venue entrance.</p>
                  </div>

                  {/* Ticket graphic layout card */}
                  <div className="border border-dashed border-gray-300 bg-orange-50/20 p-5 rounded-none relative overflow-hidden">
                    {/* Left and right notch cutouts representing paper ticket */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-white border-r border-dashed border-gray-300 rounded-r-full -ml-2" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-white border-l border-dashed border-gray-300 rounded-l-full -mr-2" />

                    <div className="flex justify-between items-start border-b border-dashed border-gray-200 pb-3 mb-3">
                      <div>
                        <span className="text-[8px] font-mono font-bold text-brand-orange uppercase">INFOBEE MCET ENTRY PASS</span>
                        <h4 className="font-display font-bold text-sm text-gray-900 mt-1 line-clamp-1">{event.title}</h4>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-gray-800 bg-white border border-gray-200 px-2 py-0.5">{ticket.code}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="block text-[8px] font-mono text-gray-400 uppercase">ATTENDEE</span>
                        <span className="font-bold text-gray-800 line-clamp-1">{ticket.name}</span>
                        <span className="block text-[9px] text-gray-500 font-mono mt-0.5 line-clamp-1">{ticket.email}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] font-mono text-gray-400 uppercase">VENUE & TIMING</span>
                        <span className="font-semibold text-gray-700 block">Block C Auditorium</span>
                        <span className="text-[9px] text-gray-500 font-mono">{event.date}</span>
                      </div>
                    </div>

                    {/* QR Code section */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between bg-white p-2 border border-gray-100">
                      <div className="space-y-1">
                        <span className="block text-[8px] font-mono text-gray-400 uppercase font-bold">GATE SCANPASS</span>
                        <div className="flex items-center space-x-1.5 text-[9px] font-semibold text-emerald-600">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                          <span>ACTIVE BARCODE</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-1.5 border border-gray-200">
                        <QrCode className="w-10 h-10 text-brand-dark" />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleFinish}
                    className="w-full bg-brand-dark hover:bg-black text-white text-xs font-bold tracking-widest py-3 rounded-none uppercase text-center transition-colors"
                  >
                    Done & Save Pass
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* Event Details Modal */
interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventItem | null;
}

export function DetailsModal({ isOpen, onClose, event }: DetailsModalProps) {
  if (!event) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden" role="dialog" aria-modal="true">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white text-gray-900 border border-gray-100 w-full max-w-lg shadow-2xl overflow-hidden z-10"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-brand-dark text-white">
              <span className="font-display font-bold text-sm flex items-center gap-1.5">
                <Info className="w-4 h-4 text-brand-orange" />
                <span>ACTIVITY LOG OVERVIEW</span>
              </span>
              <button onClick={onClose} className="p-1 rounded-sm text-gray-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div>
                <div className="inline-block bg-orange-50 text-brand-orange text-[9px] font-mono font-bold px-2.5 py-0.5 mb-2 border border-orange-100">
                  {event.category} • {event.date}
                </div>
                <h3 className="font-display font-bold text-xl text-gray-900 tracking-tight leading-tight">
                  {event.title}
                </h3>
              </div>

              <div className="space-y-4">
                <h4 className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-wider">EVENT COORDINATOR DETAILS</h4>
                
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 border border-gray-100 text-xs text-gray-600 leading-relaxed">
                  <div className="space-y-2">
                    <p className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-brand-orange" />
                      <span className="font-semibold text-gray-800">{event.coordinator || 'Prof. IT Department'}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-brand-orange" />
                      <span className="font-mono text-[10.5px]">{event.coordinatorEmail || 'infobee@drmcet.ac.in'}</span>
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                      <span>{event.venue || 'IT Labs, Block C, Dr. MCET'}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-brand-orange" />
                      <span>{event.time || '10:00 AM onwards'}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-wider">SYNOPSIS</h4>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-brand-dark hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
              >
                Close Logs
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* Event Calendar Monthly View Modal */
interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  registeredEventIds: string[];
}

export function CalendarModal({ isOpen, onClose, registeredEventIds }: CalendarModalProps) {
  const [currentMonth, setCurrentMonth] = useState('November 2026');
  
  // Custom Hardcoded Calendar Days for November 2026
  // Nov 1, 2026 is Sunday
  const calendarDays = [
    { day: 1, type: 'weekend', events: [] },
    { day: 2, type: 'weekday', events: [] },
    { day: 3, type: 'weekday', events: [] },
    { day: 4, type: 'weekday', events: [] },
    { day: 5, type: 'event', events: [{ id: 'evt-cloud101', title: 'Cloud Arch 101', color: 'orange' }] },
    { day: 6, type: 'weekday', events: [] },
    { day: 7, type: 'weekend', events: [] },
    { day: 8, type: 'weekend', events: [] },
    { day: 9, type: 'weekday', events: [] },
    { day: 10, type: 'weekday', events: [] },
    { day: 11, type: 'weekday', events: [] },
    { day: 12, type: 'event', events: [{ id: 'evt-cyberfold', title: 'Cyber Fold Sec', color: 'red' }] },
    { day: 13, type: 'weekday', events: [] },
    { day: 14, type: 'weekend', events: [] },
    { day: 15, type: 'weekend', events: [] },
    { day: 16, type: 'weekday', events: [] },
    { day: 17, type: 'weekday', events: [] },
    { day: 18, type: 'weekday', events: [] },
    { day: 19, type: 'weekday', events: [] },
    { day: 20, type: 'weekday', events: [] },
    { day: 21, type: 'weekend', events: [] },
    { day: 22, type: 'weekend', events: [] },
    { day: 23, type: 'weekday', events: [] },
    { day: 24, type: 'weekday', events: [] },
    { day: 25, type: 'weekday', events: [] },
    { day: 26, type: 'weekday', events: [] },
    { day: 27, type: 'weekday', events: [] },
    { day: 28, type: 'weekend', events: [] },
    { day: 29, type: 'weekend', events: [] },
    { day: 30, type: 'weekday', events: [] },
  ];

  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden" role="dialog" aria-modal="true">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white text-gray-900 border border-gray-100 w-full max-w-lg shadow-2xl overflow-hidden z-10"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-brand-dark text-white">
              <span className="font-display font-bold text-sm flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-orange" />
                <span>IT DEPARTMENT SCHEDULE CALENDAR</span>
              </span>
              <button onClick={onClose} className="p-1 rounded-sm text-gray-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Calendar Body */}
            <div className="p-6">
              {/* Calendar Navigator */}
              <div className="flex justify-between items-center mb-5">
                <button className="p-1 text-gray-400 hover:text-gray-900 border border-gray-200">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-display font-bold text-sm text-gray-800 tracking-tight uppercase">
                  {currentMonth}
                </span>
                <button className="p-1 text-gray-400 hover:text-gray-900 border border-gray-200">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Weekday labels */}
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {weekdays.map((wd) => (
                  <span key={wd} className="text-[10px] font-mono font-bold text-gray-400">
                    {wd}
                  </span>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((dayObj, idx) => {
                  const hasEvents = dayObj.type === 'event';
                  const isRegistered = hasEvents && registeredEventIds.includes(dayObj.events[0]?.id);
                  return (
                    <div
                      key={idx}
                      className={`aspect-square border border-gray-100 p-1 flex flex-col justify-between ${
                        dayObj.type === 'weekend' 
                          ? 'bg-gray-50/50' 
                          : 'bg-white'
                      } ${hasEvents ? 'border-brand-orange bg-orange-50/10' : ''}`}
                    >
                      <span className={`text-[10px] font-mono font-bold ${hasEvents ? 'text-brand-orange' : 'text-gray-500'}`}>
                        {dayObj.day}
                      </span>
                      
                      {/* Render scheduled event title */}
                      {hasEvents && dayObj.events.map((evt, eIdx) => (
                        <div
                          key={eIdx}
                          className={`text-[8px] p-0.5 leading-none rounded-xs font-semibold uppercase truncate ${
                            isRegistered 
                              ? 'bg-emerald-500 text-white' 
                              : 'bg-brand-orange text-white'
                          }`}
                          title={`${evt.title} ${isRegistered ? '(Registered)' : ''}`}
                        >
                          {isRegistered ? '✓ REG' : evt.title}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>

              {/* Calendar Legend */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500 font-mono">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-brand-orange rounded-full" />
                    <span>Upcoming Workshop / Seminar</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span>Registered</span>
                  </span>
                </div>
                <span>Nov 2026</span>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-brand-dark hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
              >
                Close Calendar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* Join Us Modal Form - Generates beautiful official club student membership ID card */
interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoinSuccess: (request: JoinRequest) => void;
}

export function JoinModal({ isOpen, onClose, onJoinSuccess }: JoinModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dept, setDept] = useState('Information Technology');
  const [year, setYear] = useState('Third Year');
  const [interest, setInterest] = useState('Web Stack & Frameworks');
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [memberCard, setMemberCard] = useState<JoinRequest | null>(null);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !reason) return;

    setSubmitting(true);
    setTimeout(() => {
      const membershipId = `IB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const request: JoinRequest = {
        id: `req-${Date.now()}`,
        name,
        email,
        department: dept,
        year,
        interestArea: interest,
        reason,
        membershipId,
        status: 'approved', // instant pass for fun experience
        timestamp: new Date().toISOString()
      };

      setSubmitting(false);
      setMemberCard(request);
      onJoinSuccess(request);
    }, 1500);
  };

  const handleFinish = () => {
    setMemberCard(null);
    setName('');
    setEmail('');
    setReason('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={handleFinish}
            className="absolute inset-0 bg-black/70 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white text-gray-900 border border-gray-100 w-full max-w-md shadow-2xl overflow-hidden z-10"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-brand-dark text-white">
              <span className="font-display font-bold text-sm flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-brand-orange" />
                <span>INFOBEE STUDENT ASSOCIATION APPLICATION</span>
              </span>
              <button onClick={handleFinish} className="p-1 rounded-sm text-gray-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6">
              {!memberCard ? (
                /* Registration Application Form */
                <form onSubmit={handleApply} className="space-y-4">
                  <div>
                    <h3 className="font-display font-bold text-sm text-gray-900 mb-1">Become an Infobee Member</h3>
                    <p className="text-[11px] text-gray-500 leading-normal">
                      Gain access to members-only peer-led workshops, speed-debugging bootcamps, and early event registrations.
                    </p>
                  </div>

                  {/* Name */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Swetha K"
                      className="w-full px-3 py-2 border border-gray-300 rounded-none focus:border-brand-orange outline-none text-xs"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">College Email ID</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="swetha@mcet.in"
                      className="w-full px-3 py-2 border border-gray-300 rounded-none focus:border-brand-orange outline-none text-xs font-mono"
                    />
                  </div>

                  {/* Dept & Year */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">Department</label>
                      <select
                        value={dept}
                        onChange={(e) => setDept(e.target.value)}
                        className="w-full px-2 py-1.5 border border-gray-300 rounded-none text-xs bg-white focus:border-brand-orange outline-none"
                      >
                        <option>Information Technology</option>
                        <option>Computer Science</option>
                        <option>Electronics & Comm</option>
                        <option>Electrical & Electronics</option>
                        <option>Artificial Intelligence</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">Academic Year</label>
                      <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full px-2 py-1.5 border border-gray-300 rounded-none text-xs bg-white focus:border-brand-orange outline-none"
                      >
                        <option>First Year</option>
                        <option>Second Year</option>
                        <option>Third Year</option>
                        <option>Fourth Year</option>
                      </select>
                    </div>
                  </div>

                  {/* Tech Interest area */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">Primary Core Interest</label>
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-none text-xs bg-white focus:border-brand-orange outline-none"
                    >
                      <option>Web Stack & Frameworks (React, MERN)</option>
                      <option>Cloud Architecture (AWS, Docker, CI/CD)</option>
                      <option>Cyber Security & Cryptography</option>
                      <option>Machine Learning & Data Intelligence</option>
                      <option>IoT & Embedded Programming</option>
                    </select>
                  </div>

                  {/* Reason to join */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">Why do you wish to join Infobee?</label>
                    <textarea
                      required
                      rows={2}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Tell us what you hope to contribute and learn..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-none text-xs focus:border-brand-orange outline-none resize-none"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold tracking-widest py-3 rounded-none uppercase transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    {submitting ? 'PROCESSING ID CARD...' : 'SUBMIT MEMBERSHIP REGISTRATION'}
                  </button>
                </form>
              ) : (
                /* Generated Infobee Club Student ID card */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-2">
                    <div className="inline-flex p-2 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-600 mb-1">
                      <Sparkles className="w-8 h-8 text-brand-orange animate-bounce" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-gray-900 leading-none">Club Membership Granted!</h3>
                    <p className="text-xs text-gray-500">Welcome to the Infobee family. Here is your official digital badge.</p>
                  </div>

                  {/* ID card graphic layout block */}
                  <div className="bg-[#121212] text-white p-5 rounded-sm border-2 border-brand-orange shadow-lg relative overflow-hidden">
                    {/* Glowing brand accents */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full filter blur-2xl pointer-events-none" />

                    <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-4">
                      <div className="flex items-center space-x-2">
                        {/* Logo geometric fold */}
                        <div className="w-6 h-6 bg-brand-orange rounded-md flex items-center justify-center overflow-hidden">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M12 3l9 9-9 9-9-9 9-9z" />
                          </svg>
                        </div>
                        <div>
                          <span className="block font-display font-bold text-xs leading-none">INFOBEE</span>
                          <span className="text-[7px] font-mono text-gray-400 tracking-wider">IT STUDENT ASSOC • MCET</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[7px] font-mono text-gray-500 uppercase block">MEMBERSHIP CARD</span>
                        <span className="text-[10px] font-mono font-bold text-brand-orange">{memberCard.membershipId}</span>
                      </div>
                    </div>

                    <div className="flex space-x-4 items-center">
                      {/* Avatar placeholder with modern outline */}
                      <div className="w-16 h-16 rounded-none bg-zinc-800 border-2 border-brand-orange flex items-center justify-center shrink-0">
                        <User className="w-8 h-8 text-gray-400" />
                      </div>

                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div>
                          <span className="block text-[6.5px] font-mono text-gray-500 uppercase">MEMBER NAME</span>
                          <span className="font-display font-bold text-sm tracking-tight text-white block truncate">{memberCard.name}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="block text-[6.5px] font-mono text-gray-500 uppercase">DEPARTMENT</span>
                            <span className="text-[10px] text-gray-300 font-semibold truncate block">{memberCard.department}</span>
                          </div>
                          <div>
                            <span className="block text-[6.5px] font-mono text-gray-500 uppercase">ACADEMIC YEAR</span>
                            <span className="text-[10px] text-gray-300 font-semibold truncate block">{memberCard.year}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[7px] font-mono text-gray-400">
                      <div>
                        <span className="block text-gray-600">PRIMARY ROLE / CORE INTEREST:</span>
                        <span className="text-brand-orange font-bold text-[8px] uppercase">{memberCard.interestArea}</span>
                      </div>

                      {/* Authorized badge */}
                      <div className="flex items-center space-x-1 border border-white/10 px-2 py-0.5 bg-white/5">
                        <Shield className="w-3 h-3 text-brand-orange" />
                        <span className="text-[6px] tracking-wider text-gray-300">AUTH BY HOD (IT)</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleFinish}
                    className="w-full bg-brand-dark hover:bg-black text-white text-xs font-bold tracking-widest py-3 rounded-none uppercase text-center transition-colors"
                  >
                    Done & Save ID Card
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
