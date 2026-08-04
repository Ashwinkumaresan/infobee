import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Sparkles, LogIn, Users, Calendar, Mail, CheckCircle, Search, Filter, Check, Trash2, Bookmark, RefreshCw, FileText, ArrowRight, UserCheck, X } from 'lucide-react';
import { EventItem, JoinRequest, ContactSubmission } from '../types';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  registrations: Array<{ id: string; eventId: string; ticketCode: string; name: string; email: string; checkedIn?: boolean }>;
  joinRequests: JoinRequest[];
  contactSubmissions: ContactSubmission[];
  events: EventItem[];
  onToggleCheckIn: (regId: string) => void;
  onUpdateJoinStatus: (requestId: string, status: 'approved' | 'rejected') => void;
  onDeleteSubmission: (submissionId: string) => void;
}

export default function AdminPortal({
  isOpen,
  onClose,
  registrations,
  joinRequests,
  contactSubmissions,
  events,
  onToggleCheckIn,
  onUpdateJoinStatus,
  onDeleteSubmission
}: AdminPortalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'registrations' | 'applications' | 'contact'>('registrations');
  const [searchQuery, setSearchQuery] = useState('');
  const [eventFilter, setEventFilter] = useState('All Events');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'infobee2026' || password === 'admin') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid access key. Hint: use "admin" or "infobee2026"');
    }
  };

  const handleBypass = () => {
    setIsAuthenticated(true);
    setLoginError('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  // Filters & Searches
  const filteredRegistrations = registrations.filter(reg => {
    const event = events.find(e => e.id === reg.eventId);
    const eventName = event ? event.title : '';
    
    const matchesSearch = reg.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          reg.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          reg.ticketCode.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = eventFilter === 'All Events' || eventName === eventFilter;
    
    return matchesSearch && matchesFilter;
  });

  const filteredJoinRequests = joinRequests.filter(req => 
    req.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.interestArea.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSubmissions = contactSubmissions.filter(sub => 
    sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-brand-dark/95 backdrop-blur-xs transition-opacity" 
      />

      {/* Main Admin Portal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white border border-gray-100 shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col z-10 overflow-hidden"
      >
        
        {/* Top Header of Portal */}
        <div className="bg-brand-dark text-white px-6 py-4 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 bg-brand-orange rounded-md flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-sm tracking-tight block">INFOBEE CLUB BACK-OFFICE</span>
              <span className="text-[10px] font-mono text-gray-400">Dr. MCET IT ASSOCIATION ADMIN MODULE</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 border border-white/10 hover:border-white/20 text-[10px] font-mono tracking-wider font-bold rounded-sm uppercase transition-colors"
              >
                Log Out
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Guard Screen */}
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50">
            <div className="max-w-md w-full bg-white border border-gray-200 p-8 shadow-md">
              <div className="text-center space-y-2 mb-6">
                <div className="inline-flex p-3 bg-orange-50 border border-orange-100 rounded-full text-brand-orange mb-1">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-lg text-gray-900 tracking-tight leading-none">Security Access Key Required</h3>
                <p className="text-xs text-gray-500">Only authorized IT faculty and student association executive committee members can access this dashboard.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400">ADMIN KEY / PASSWORD</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter association key"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-none focus:border-brand-orange outline-none text-xs font-mono"
                  />
                  {loginError && <p className="text-[10px] text-red-500 font-medium">{loginError}</p>}
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    type="submit"
                    className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white py-3 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>AUTHENTICATE</span>
                  </button>
                  
                  {/* Bypass option for quick demonstration without reading md or typing */}
                  <button
                    type="button"
                    onClick={handleBypass}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer"
                  >
                    DEMO BYPASS LOGIN
                  </button>
                </div>
              </form>

              <div className="mt-6 pt-5 border-t border-gray-100 text-center">
                <span className="text-[10px] font-mono text-gray-400">ASSOCIATION PASSCODE: <strong className="text-gray-600">admin</strong></span>
              </div>
            </div>
          </div>
        ) : (
          /* Main Management Dashboard Panel */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-gray-50">
            
            {/* Dashboard Sidebar Tabs */}
            <div className="md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200 flex flex-row md:flex-col justify-start overflow-x-auto md:overflow-x-visible shrink-0">
              
              <div className="hidden md:block p-5 border-b border-gray-100">
                <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">MANAGEMENT MODULES</span>
              </div>

              <div className="flex md:flex-col flex-1 p-2 md:p-3 space-x-1 md:space-x-0 md:space-y-1">
                {/* Tab 1: Registrations */}
                <button
                  onClick={() => { setActiveTab('registrations'); setSearchQuery(''); }}
                  className={`flex items-center space-x-2.5 px-4 py-3 text-xs font-bold tracking-wider uppercase transition-colors shrink-0 w-full rounded-none ${
                    activeTab === 'registrations'
                      ? 'bg-orange-50 text-brand-orange border-l-2 border-brand-orange'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>REGISTRATIONS ({registrations.length})</span>
                </button>

                {/* Tab 2: Club Applications */}
                <button
                  onClick={() => { setActiveTab('applications'); setSearchQuery(''); }}
                  className={`flex items-center space-x-2.5 px-4 py-3 text-xs font-bold tracking-wider uppercase transition-colors shrink-0 w-full rounded-none ${
                    activeTab === 'applications'
                      ? 'bg-orange-50 text-brand-orange border-l-2 border-brand-orange'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>APPLICATIONS ({joinRequests.length})</span>
                </button>

                {/* Tab 3: Form messages */}
                <button
                  onClick={() => { setActiveTab('contact'); setSearchQuery(''); }}
                  className={`flex items-center space-x-2.5 px-4 py-3 text-xs font-bold tracking-wider uppercase transition-colors shrink-0 w-full rounded-none ${
                    activeTab === 'contact'
                      ? 'bg-orange-50 text-brand-orange border-l-2 border-brand-orange'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>MESSAGES ({contactSubmissions.length})</span>
                </button>
              </div>

              <div className="hidden md:block mt-auto p-4 border-t border-gray-100 bg-gray-50 text-[10px] font-mono text-gray-400">
                <span className="block">Host: PORT 3000</span>
                <span className="block">Status: SECURE MODULE</span>
              </div>
            </div>

            {/* Dashboard Content Container */}
            <div className="flex-1 flex flex-col overflow-hidden">
              
              {/* Search & Filter Bar */}
              <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row gap-3 items-center justify-between shrink-0">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search name, email, codes..."
                    className="w-full pl-9 pr-4 py-1.5 border border-gray-300 rounded-none focus:border-brand-orange outline-none text-xs"
                  />
                </div>

                {/* Event Filter (Only shown on registrations tab) */}
                {activeTab === 'registrations' && (
                  <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                    <Filter className="w-3.5 h-3.5 text-gray-400" />
                    <select
                      value={eventFilter}
                      onChange={(e) => setEventFilter(e.target.value)}
                      className="border border-gray-300 px-2.5 py-1.5 text-xs bg-white rounded-none outline-none focus:border-brand-orange"
                    >
                      <option>All Events</option>
                      {events.map((evt) => (
                        <option key={evt.id}>{evt.title}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Tab Display Panel Area */}
              <div className="flex-1 overflow-y-auto p-6">
                
                {/* 1. REGISTRATIONS TAB */}
                {activeTab === 'registrations' && (
                  <div className="space-y-4">
                    {filteredRegistrations.length === 0 ? (
                      <div className="bg-white border border-gray-200 p-8 text-center text-gray-500 text-xs font-mono">
                        No registrations matching the filter search.
                      </div>
                    ) : (
                      <div className="border border-gray-200 bg-white overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-mono">
                              <th className="p-3">ATTENDEE</th>
                              <th className="p-3">EVENT CATEGORY</th>
                              <th className="p-3">PASS CODE</th>
                              <th className="p-3 text-center">CHECK IN</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {filteredRegistrations.map((reg) => {
                              const event = events.find(e => e.id === reg.eventId);
                              return (
                                <tr key={reg.id} className="hover:bg-gray-50/50">
                                  <td className="p-3">
                                    <span className="block font-bold text-gray-800">{reg.name}</span>
                                    <span className="block text-[10px] text-gray-400 font-mono">{reg.email}</span>
                                  </td>
                                  <td className="p-3 font-semibold text-gray-700">
                                    {event ? event.title : 'N/A'}
                                  </td>
                                  <td className="p-3 font-mono text-brand-orange font-bold">
                                    {reg.ticketCode}
                                  </td>
                                  <td className="p-3 text-center">
                                    <button
                                      onClick={() => onToggleCheckIn(reg.id)}
                                      className={`inline-flex items-center space-x-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border transition-all ${
                                        reg.checkedIn
                                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                          : 'bg-white border-gray-200 text-gray-500 hover:border-gray-900'
                                      }`}
                                    >
                                      {reg.checkedIn ? (
                                        <>
                                          <UserCheck className="w-3.5 h-3.5" />
                                          <span>CHECKED IN</span>
                                        </>
                                      ) : (
                                        <span>MARK ENTRY</span>
                                      )}
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. CLUB APPLICATIONS TAB */}
                {activeTab === 'applications' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredJoinRequests.length === 0 ? (
                      <div className="col-span-2 bg-white border border-gray-200 p-8 text-center text-gray-500 text-xs font-mono">
                        No club applications recorded yet.
                      </div>
                    ) : (
                      filteredJoinRequests.map((req) => (
                        <div
                          key={req.id}
                          className="bg-white border border-gray-200 p-5 flex flex-col justify-between shadow-xs relative overflow-hidden"
                        >
                          <div className="absolute top-4 right-4 text-[9px] font-mono font-bold px-2 py-0.5 border uppercase rounded-xs">
                            {req.status === 'approved' && <span className="text-emerald-600 bg-emerald-50 border-emerald-100">Approved</span>}
                            {req.status === 'pending' && <span className="text-amber-600 bg-amber-50 border-amber-100">Pending</span>}
                            {req.status === 'rejected' && <span className="text-red-600 bg-red-50 border-red-100">Rejected</span>}
                          </div>

                          <div className="space-y-3 mb-5">
                            <div>
                              <span className="block text-[8px] font-mono text-gray-400 uppercase">APPLICANT</span>
                              <h4 className="font-display font-bold text-gray-900 text-sm">{req.name}</h4>
                              <span className="block text-[10px] text-gray-500 font-mono">{req.email}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600 font-mono bg-gray-50 p-2 border border-gray-100">
                              <div>
                                <span className="block text-[7px] text-gray-400">DEPT & YEAR:</span>
                                <span className="font-semibold">{req.department} • {req.year}</span>
                              </div>
                              <div>
                                <span className="block text-[7px] text-gray-400">INTEREST AREA:</span>
                                <span className="font-semibold text-brand-orange">{req.interestArea}</span>
                              </div>
                            </div>

                            <div>
                              <span className="block text-[8px] font-mono text-gray-400 uppercase">REASON FOR INTEREST:</span>
                              <p className="text-gray-600 text-xs italic mt-0.5">"{req.reason}"</p>
                            </div>
                          </div>

                          {/* Approval toggles */}
                          <div className="pt-3 border-t border-gray-100 flex justify-end space-x-2">
                            {req.status === 'pending' ? (
                              <>
                                <button
                                  onClick={() => onUpdateJoinStatus(req.id, 'rejected')}
                                  className="px-3 py-1 text-[10px] font-bold text-red-600 hover:bg-red-50 border border-red-200 uppercase transition-colors rounded-none"
                                >
                                  Decline
                                </button>
                                <button
                                  onClick={() => onUpdateJoinStatus(req.id, 'approved')}
                                  className="px-3 py-1 text-[10px] font-bold text-emerald-600 hover:bg-emerald-50 border border-emerald-200 uppercase transition-colors rounded-none"
                                >
                                  Approve
                                </button>
                              </>
                            ) : (
                              <span className="text-[10px] text-gray-400 font-mono">
                                Action Logged • {req.membershipId}
                              </span>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* 3. CONTACT FORM SUBMISSIONS TAB */}
                {activeTab === 'contact' && (
                  <div className="space-y-4">
                    {filteredSubmissions.length === 0 ? (
                      <div className="bg-white border border-gray-200 p-8 text-center text-gray-500 text-xs font-mono">
                        No form messages submitted yet.
                      </div>
                    ) : (
                      filteredSubmissions.map((sub) => (
                        <div
                          key={sub.id}
                          className="bg-white border border-gray-200 p-5 flex flex-col md:flex-row md:items-start justify-between gap-4"
                        >
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-display font-bold text-gray-900 text-sm">{sub.name}</h4>
                              <span className="text-[10px] text-gray-400 font-mono">•</span>
                              <a href={`mailto:${sub.email}`} className="text-xs text-brand-orange hover:underline font-mono">
                                {sub.email}
                              </a>
                            </div>

                            <p className="text-gray-600 text-xs leading-relaxed bg-gray-50/50 p-3 border border-gray-100 italic">
                              "{sub.message}"
                            </p>

                            <span className="block text-[8px] font-mono text-gray-400">
                              SUBMITTED: {new Date(sub.timestamp).toLocaleString()}
                            </span>
                          </div>

                          <div className="flex md:flex-col gap-2 shrink-0 justify-end md:items-end">
                            <button
                              onClick={() => {
                                const responseTemplate = `Dear ${sub.name},\n\nThank you for contacting the Infobee Student Association at Dr. MCET. We have received your query regarding:\n"${sub.message.slice(0, 40)}..."\n\nOne of our executive committee members will follow up with you on this email shortly.\n\nBest regards,\nInfobee Core Committee\nDr. Mahalingam College of Engineering & Technology`;
                                navigator.clipboard.writeText(responseTemplate);
                                alert('Mock email response template copied to clipboard! You can paste it to your mail client.');
                              }}
                              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-[10px] font-bold uppercase tracking-wider rounded-none flex items-center space-x-1.5"
                              title="Copy structured reply template"
                            >
                              <FileText className="w-3.5 h-3.5 text-brand-orange" />
                              <span>COPY REPLY</span>
                            </button>

                            <button
                              onClick={() => onDeleteSubmission(sub.id)}
                              className="px-3 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 text-[10px] font-bold uppercase tracking-wider rounded-none flex items-center space-x-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>DELETE</span>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

      </motion.div>
    </div>
  );
}
