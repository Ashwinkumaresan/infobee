import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, CheckCircle, ChevronRight, Check, AlertCircle, Search, LogIn, MonitorSmartphone, X, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../api';

export default function Registration() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<1 | 2 | 3 | 4>(1);
  const [teamName, setTeamName] = useState('');
  const [leaderName, setLeaderName] = useState('');
  const [leaderRoll, setLeaderRoll] = useState('');
  const [members, setMembers] = useState([
    { name: '', roll: '' },
    { name: '', roll: '' },
    { name: '', roll: '' }
  ]);
  const [eligibleStudents, setEligibleStudents] = useState<{roll: string, name: string}[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [scenarioAllocated, setScenarioAllocated] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [availableScenarios, setAvailableScenarios] = useState<string[]>(['SCENARIO 01', 'SCENARIO 02', 'SCENARIO 03', 'SCENARIO 04', 'SCENARIO 05']);
  const [isHackathonFull, setIsHackathonFull] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState<boolean>(true);
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [isPptTimeEnd, setIsPptTimeEnd] = useState(false);
  const [isLeader, setIsLeader] = useState(false);
  const [loadingInitialStatus, setLoadingInitialStatus] = useState(true);

  // Wheel state
  const [wheelRotation, setWheelRotation] = useState(0);
  const [focusedMemberIndex, setFocusedMemberIndex] = useState<number | null>(null);

  // Derived state
  const filledMembersCount = members.filter(m => m.name.trim() && m.roll.trim()).length;

  const allRolls = [leaderRoll, ...members.map(m => m.roll)].filter(r => r.trim().length > 0).map(r => r.toUpperCase());
  const uniqueRolls = new Set(allRolls);
  const hasDuplicates = allRolls.length !== uniqueRolls.size;

  const isRollInvalid = (roll: string) => {
    const r = roll.trim().toUpperCase();
    if (r.length === 0) return false;
    return !eligibleStudents.some(s => s.roll === r);
  };

  const anyInvalidRoll = allRolls.some(r => isRollInvalid(r));

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  useEffect(() => {
    const token = getCookie('access_token');
    fetch(`${API_URL}/hackathon/eligible-students/`, {
      headers: { ...(token ? { 'Authorization': `Bearer ${token}` } : {}) }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setEligibleStudents(data);
      })
      .catch(err => console.error("Failed to fetch students", err));
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getCookie('access_token');
      if (!token) return;
      try {
        const response = await fetch(`${API_URL}/student/profile/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          const roll = data.register_number || '';
          setLeaderRoll(roll);
          
          if (roll) {
            const storedScenario = localStorage.getItem(`hackathon_draft_scenario_${roll}`);
            if (storedScenario) {
              setScenarioAllocated(storedScenario);
            }
            
            const formDraft = localStorage.getItem(`hackathon_form_draft_${roll}`);
            if (formDraft) {
              try {
                const parsed = JSON.parse(formDraft);
                if (parsed.teamName) setTeamName(parsed.teamName);
                if (parsed.leaderName) setLeaderName(parsed.leaderName);
                if (parsed.members) setMembers(parsed.members);
                if (parsed.phase && parsed.phase < 4) setPhase(parsed.phase);
              } catch (e) {}
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch user profile", err);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchStatus = async () => {
      const token = getCookie('access_token');
      if (!token) {
        setLoadingInitialStatus(false);
        return;
      }
      try {
        const response = await fetch(`${API_URL}/hackathon/my-team/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          if (data.registered) {
            setAlreadyRegistered(true);
            setIsPptTimeEnd(data.is_ppt_time_end || false);
            setIsLeader(data.is_leader || false);
          }
        }
      } catch (err) {
        console.error("Failed to fetch hackathon status", err);
      } finally {
        setLoadingInitialStatus(false);
      }
    };
    fetchStatus();
  }, []);

  useEffect(() => {
    if (phase === 2) {
      const token = getCookie('access_token');
      fetch(`${API_URL}/hackathon/available-scenarios/`, {
        headers: { ...(token ? { 'Authorization': `Bearer ${token}` } : {}) }
      })
        .then(res => res.json())
        .then(data => {
          if (data.is_registration_open === false) {
             setIsRegistrationOpen(false);
             // Optionally redirect after a brief moment or immediately
             navigate('/hackathon');
             return;
          }
          if (data.is_full) {
            setIsHackathonFull(true);
            setAvailableScenarios([]);
          } else if (Array.isArray(data.available_scenarios)) {
            setAvailableScenarios(data.available_scenarios);
            
            // Validate if the stored draft scenario is still available
            const token = getCookie('access_token');
            // leaderRoll might be slightly stale in this effect closure if it wasn't added to deps, 
            // but we can just parse the active item from local storage by checking all keys, 
            // or we can safely use leaderRoll since it's set on mount before we ever reach phase 2.
            if (leaderRoll) {
              const draft = localStorage.getItem(`hackathon_draft_scenario_${leaderRoll}`);
              if (draft && !data.available_scenarios.includes(draft)) {
                setScenarioAllocated(null);
                localStorage.removeItem(`hackathon_draft_scenario_${leaderRoll}`);
                alert(`Your previously allocated scenario (${draft}) is now full. Please spin again to get a new scenario.`);
              }
            }
          }
        })
        .catch(err => console.error("Failed to fetch available scenarios", err));
    }
  }, [phase, leaderRoll]);

  // Save form draft to localStorage whenever relevant state changes
  useEffect(() => {
    if (!alreadyRegistered && !loadingInitialStatus && leaderRoll) {
      const draft = {
        teamName,
        leaderName,
        members,
        phase: phase < 4 ? phase : 1
      };
      localStorage.setItem(`hackathon_form_draft_${leaderRoll}`, JSON.stringify(draft));
    }
  }, [teamName, leaderName, members, phase, alreadyRegistered, loadingInitialStatus, leaderRoll]);

  const isPhase1Valid =
    teamName.trim() !== '' &&
    leaderName.trim() !== '' &&
    leaderRoll.trim() !== '' &&
    filledMembersCount >= 2 &&
    !hasDuplicates &&
    !anyInvalidRoll;

  const onLeaderRollChange = (val: string) => {
    setLeaderRoll(val.toUpperCase());
  };

  const handleMemberChange = (index: number, field: 'name' | 'roll', value: string) => {
    const newMembers = [...members];
    if (field === 'roll') {
      newMembers[index].roll = value.toUpperCase();
    } else {
      newMembers[index].name = value.replace(/[^a-zA-Z\s]/g, '');
    }
    setMembers(newMembers);
  };


  const handleSpin = () => {
    if (isSpinning) return;
    if (isHackathonFull) {
      alert("Registration is Full. No scenarios are available.");
      return;
    }
    if (availableScenarios.length === 0) {
      alert("No scenarios available. All scenarios are full.");
      return;
    }
    setIsSpinning(true);

    const randomIndex = Math.floor(Math.random() * availableScenarios.length);
    const chosenScenario = availableScenarios[randomIndex];

    const targetAngles: Record<string, number> = {
      'SCENARIO 01': 324,
      'SCENARIO 02': 252,
      'SCENARIO 03': 180,
      'SCENARIO 04': 108,
      'SCENARIO 05': 36
    };

    const targetAngle = targetAngles[chosenScenario] || 0;
    // Base 5 full rotations (1800 degrees) + target angle
    const totalDegrees = 1800 + targetAngle;
    setWheelRotation(totalDegrees);

    setTimeout(() => {
      setScenarioAllocated(chosenScenario);
      if (leaderRoll) {
        localStorage.setItem(`hackathon_draft_scenario_${leaderRoll}`, chosenScenario);
      }
    }, 4300);
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const token = getCookie('access_token');
      const response = await fetch(`${API_URL}/hackathon/register/`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          team_name: teamName,
          leader_roll: leaderRoll,
          leader_name: leaderName,
          members: members.filter(m => m.roll.trim() !== '' && m.name.trim() !== ''),
          scenario_allocated: scenarioAllocated,
          is_confirmed: agreementChecked
        })
      });
      const data = await response.json();
      if (response.ok) {
        if (leaderRoll) {
          localStorage.removeItem(`hackathon_draft_scenario_${leaderRoll}`);
          localStorage.removeItem(`hackathon_form_draft_${leaderRoll}`);
        }
        setRegistrationId(data.id);
        setPhase(4);
      } else {
        const errorMsg = data.error || 'Registration failed';
        setSubmitError(errorMsg);
        
        if (errorMsg.toLowerCase().includes('maximum capacity') || errorMsg.toLowerCase().includes('spin again')) {
          if (leaderRoll) {
            localStorage.removeItem(`hackathon_draft_scenario_${leaderRoll}`);
          }
          setScenarioAllocated(null);
          setPhase(2);
        }
      }
    } catch (err) {
      setSubmitError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingInitialStatus) {
    return <div className="flex h-screen items-center justify-center font-poppins text-brand-navy">Loading...</div>;
  }

  if (alreadyRegistered) {
    return (
      <div className="flex flex-col h-[100dvh] w-full bg-white pt-[88px] text-brand-navy font-sans overflow-hidden items-center justify-center p-8 text-center">
         <div className="max-w-md w-full border border-brand-border rounded-xl p-8 shadow-sm flex flex-col items-center">
           <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6 text-green-600">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
             </svg>
           </div>
           <h1 className="font-headline-sm text-headline-sm-mobile md:text-headline-sm font-bold tracking-tight mb-3 text-brand-navy">Already Registered</h1>
           <p className="text-secondary mb-8 font-poppins text-sm leading-relaxed">
             You have already registered for the hackathon. You can manage your team {isLeader ? 'and submit your PPT ' : ''}from your profile.
           </p>
           {(!isPptTimeEnd && isLeader) ? (
             <button onClick={() => navigate('/student/profile')} className="w-full px-6 py-3.5 bg-brand-orange text-white rounded-lg font-poppins font-semibold hover:opacity-90 transition-opacity shadow-sm">
               Submit PPT
             </button>
           ) : (
             <button onClick={() => navigate('/student/profile')} className="w-full px-6 py-3.5 bg-brand-bgWarm border border-brand-border text-brand-navy rounded-lg font-poppins font-semibold hover:bg-gray-100 transition-colors">
               View Profile
             </button>
           )}
         </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-[100dvh] pt-[88px] w-full bg-white text-brand-navy font-sans selection:bg-brand-orange selection:text-white overflow-hidden">

      {/* ============================================== */}
      {/* LEFT SIDE: MAIN WORKSPACE (SCROLLABLE) */}
      {/* ============================================== */}
      <div className="w-full lg:w-[60%] h-full overflow-y-auto px-4 py-2 md:px-8 md:py-4 lg:px-12 hide-scrollbar">

        {/* Universal Header (Only in Phase 1, 2, 3) */}
        {phase < 4 && (
          <div className="flex flex-col items-start max-w-2xl mb-4">
            <span className="font-label-eyebrow text-label-eyebrow text-primary-container tracking-widest mb-2">Infobee Registration</span>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-on-surface tracking-tight mb-2">
              {phase === 1 && <>Build Your Team.</>}
              {phase === 2 && <>Your Challenge Awaits.</>}
              {phase === 3 && <>Final Review.</>}
            </h1>
            <p className="font-body-lead text-body-lead text-secondary">
              {phase === 1 && "Register your student team (3-4 members total) to proceed."}
              {phase === 2 && "Five scenarios. One spin. Your challenge is assigned randomly."}
              {phase === 3 && "Make sure your team details are correct before submitting."}
            </p>
          </div>
        )}


        {/* --- PHASE 1: TEAM DETAILS --- */}
        {phase === 1 && (
          <div className="step-view max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setPhase(2); }}>
              {/* Team Name Field */}
              <div className="space-y-1">
                <label className="text-[10px] font-poppins font-bold tracking-wider text-brand-navy" htmlFor="input-team-name">
                  Team Name <span className="text-brand-orange">*</span>
                </label>
                <input
                  className="w-full h-10 px-3 rounded-lg border border-brand-border bg-brand-bgWarm text-brand-navy text-sm font-medium focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy transition-all"
                  id="input-team-name"
                  placeholder="e.g., CodeCrafters"
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </div>

              {/* Team Leader Block */}
              <div className="relative mt-4">
                <div className="border border-brand-border rounded-lg p-3 sm:p-4 pt-5">
                  <span className="absolute -top-2.5 left-3 px-1.5 bg-white flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-poppins font-bold bg-brand-navy text-white tracking-widest">Lead</span>
                    <span className="text-[10px] font-poppins font-bold tracking-wider text-brand-navy">Team Leader</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-poppins text-brand-grayMuted mb-1 font-medium" htmlFor="input-leader-roll">Roll Number *</label>
                      <input
                        className={`w-full h-10 px-3 rounded-lg border text-sm font-poppins font-semibold focus:outline-none focus:ring-1 transition-colors ${
                          isRollInvalid(leaderRoll) && leaderRoll !== ''
                            ? 'border-red-500 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-500'
                            : 'border-brand-border bg-gray-50 text-gray-500 cursor-not-allowed'
                        }`}
                        id="input-leader-roll"
                        placeholder="7276********"
                        type="text"
                        value={leaderRoll}
                        readOnly
                        disabled
                      />
                      {isRollInvalid(leaderRoll) && leaderRoll !== '' && (
                        <div className="flex items-center gap-1 mt-1.5 text-red-600">
                          <AlertCircle size={12} />
                          <p className="text-[10px] font-poppins font-medium">Invalid or already registered roll no.</p>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-[10px] text-brand-grayMuted mb-1 font-medium" htmlFor="input-leader-name">Full Name *</label>
                      <input
                        className="w-full h-10 px-3 rounded-lg border border-brand-border bg-brand-bgWarm text-brand-navy text-sm font-medium focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy"
                        id="input-leader-name"
                        placeholder="Full Name"
                        type="text"
                        value={leaderName}
                        onChange={(e) => setLeaderName(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Members Roster */}
              <div className="space-y-4 pt-2">
                {[0, 1, 2].map((idx) => (
                  <div key={idx} className="relative mt-2">
                    <div className="border border-brand-border rounded-lg p-3 sm:p-4 pt-5">
                      <span className="absolute -top-2.5 left-3 px-1.5 bg-white text-[10px] font-poppins font-bold tracking-wider text-brand-navy">
                        Team Member {idx + 1} {idx === 2 ? '(Optional)' : ''}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="relative flex flex-col">
                          <label className="block text-[10px] text-brand-grayMuted mb-1 font-medium">Roll Number</label>
                          <input
                            className={`w-full h-10 px-3 rounded-lg border text-sm font-poppins focus:outline-none focus:ring-1 transition-colors ${
                              isRollInvalid(members[idx].roll)
                                ? 'border-red-500 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-500'
                                : 'border-brand-border bg-white text-brand-navy focus:border-brand-navy focus:ring-brand-navy'
                            }`}
                            placeholder="7276********"
                            type="text"
                            value={members[idx].roll}
                            onChange={(e) => handleMemberChange(idx, 'roll', e.target.value)}
                            onFocus={() => setFocusedMemberIndex(idx)}
                            onBlur={() => setTimeout(() => setFocusedMemberIndex(null), 200)}
                          />
                          {focusedMemberIndex === idx && members[idx].roll.length > 0 && (
                            <ul className="absolute top-[4.5rem] left-0 w-full mt-1 bg-white border border-gray-200 shadow-xl rounded-md max-h-48 overflow-y-auto z-[100]">
                              {eligibleStudents
                                .filter(s => s.roll.includes(members[idx].roll.toUpperCase()))
                                .slice(0, 10)
                                .map(s => (
                                  <li
                                    key={s.roll}
                                    className="px-3 py-2 cursor-pointer hover:bg-gray-50 text-xs font-poppins text-brand-navy border-b border-gray-100 last:border-0"
                                    onMouseDown={(e) => {
                                      e.preventDefault(); // Prevent onBlur from firing before click
                                      handleMemberChange(idx, 'roll', s.roll);
                                      if (s.name) handleMemberChange(idx, 'name', s.name);
                                      setFocusedMemberIndex(null);
                                    }}
                                  >
                                    <span className="font-bold">{s.roll}</span> - {s.name}
                                  </li>
                                ))}
                            </ul>
                          )}
                          {isRollInvalid(members[idx].roll) && (
                            <div className="flex items-center gap-1 mt-1.5 text-red-600">
                              <AlertCircle size={12} />
                              <p className="text-[10px] font-poppins font-medium">Invalid or already registered roll no.</p>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <label className="block text-[10px] text-brand-grayMuted mb-1 font-medium">Full Name</label>
                          <input
                            className="w-full h-10 px-3 rounded-lg border border-brand-border bg-white text-sm font-medium focus:outline-none focus:border-brand-navy"
                            placeholder="Full Name"
                            type="text"
                            value={members[idx].name}
                            onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Inline validation summary */}
              {hasDuplicates && (
                <div className="flex items-center gap-2 p-3 mt-4 rounded-lg bg-red-50 border border-red-200 text-red-600">
                  <AlertCircle size={16} className="shrink-0" />
                  <p className="text-xs font-poppins font-medium">Duplicate roll numbers detected. Each member must have a unique roll number.</p>
                </div>
              )}



              {/* CTA Row */}
              <div className="pt-4 border-t border-brand-border">
                <button
                  disabled={!isPhase1Valid}
                  className={`w-full inline-flex items-center justify-center font-label-md text-label-md font-bold px-7 py-3.5 rounded-lg shadow-sm transition-all duration-200 gap-2 ${isPhase1Valid
                      ? 'bg-primary-container hover:bg-primary text-on-primary hover:-translate-y-0.5 cursor-pointer'
                      : 'bg-surface-container text-secondary cursor-not-allowed'
                    }`}
                  type="submit"
                >
                  <span>Continue To Scenario</span>
                  <span>→</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* --- PHASE 2: WHEEL --- */}
        {phase === 2 && (
          <div className="step-view max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
            {isHackathonFull && (
              <div className="mb-4 p-4 rounded-xl border border-brand-red bg-brand-red/5 flex flex-col items-center justify-center text-center">
                <svg className="w-8 h-8 text-brand-red mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                <h3 className="font-headline-sm text-brand-red font-bold">Registration is Full</h3>
                <p className="text-sm font-poppins text-brand-navy mt-1">The maximum total capacity for the hackathon has been reached. No further registrations can be accepted at this time.</p>
              </div>
            )}
            
            <div className={`flex flex-col items-center justify-center relative overflow-hidden pt-2 ${isHackathonFull ? 'opacity-50 pointer-events-none' : ''}`}>

              {!scenarioAllocated ? (
                <>
                  <div className="wheel-wrapper my-2 relative flex items-center justify-center w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[440px] md:h-[440px] transition-all duration-300 mx-auto">
                    <div
                      className="wheel-disc relative cursor-pointer hover:scale-[1.02] transition-transform duration-300 w-full h-full"
                      style={{ transform: `rotate(${wheelRotation}deg)` }}
                      onClick={!isSpinning ? handleSpin : undefined}
                    >
                      <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 440 440">
                        <path d="M220,220 L220,10 A210,210 0 0,1 419.7,155.1 Z" fill={availableScenarios.includes('SCENARIO 01') ? "#EAF4F0" : "#F3F4F6"} stroke="#FFFFFF" strokeWidth="6"></path>
                        <path d="M220,220 L419.7,155.1 A210,210 0 0,1 343.4,389.9 Z" fill={availableScenarios.includes('SCENARIO 02') ? "#EAF4F0" : "#F3F4F6"} stroke="#FFFFFF" strokeWidth="6"></path>
                        <path d="M220,220 L343.4,389.9 A210,210 0 0,1 96.6,389.9 Z" fill={availableScenarios.includes('SCENARIO 03') ? "#EAF4F0" : "#F3F4F6"} stroke="#FFFFFF" strokeWidth="6"></path>
                        <path d="M220,220 L96.6,389.9 A210,210 0 0,1 20.3,155.1 Z" fill={availableScenarios.includes('SCENARIO 04') ? "#EAF4F0" : "#F3F4F6"} stroke="#FFFFFF" strokeWidth="6"></path>
                        <path d="M220,220 L20.3,155.1 A210,210 0 0,1 220,10 Z" fill={availableScenarios.includes('SCENARIO 05') ? "#EAF4F0" : "#F3F4F6"} stroke="#FFFFFF" strokeWidth="6"></path>
                        
                        <g transform="rotate(36 220 220)"><text fill={availableScenarios.includes('SCENARIO 01') ? "#16845B" : "#9CA3AF"} fontFamily="Poppins, sans-serif" fontSize="32" fontWeight="800" textAnchor="middle" x="220" y="75" opacity={availableScenarios.includes('SCENARIO 01') ? "0.4" : "0.2"}>01</text></g>
                        <g transform="rotate(108 220 220)"><text fill={availableScenarios.includes('SCENARIO 02') ? "#16845B" : "#9CA3AF"} fontFamily="Poppins, sans-serif" fontSize="32" fontWeight="800" textAnchor="middle" x="220" y="75" opacity={availableScenarios.includes('SCENARIO 02') ? "0.4" : "0.2"}>02</text></g>
                        <g transform="rotate(180 220 220)"><text fill={availableScenarios.includes('SCENARIO 03') ? "#16845B" : "#9CA3AF"} fontFamily="Poppins, sans-serif" fontSize="32" fontWeight="800" textAnchor="middle" x="220" y="75" opacity={availableScenarios.includes('SCENARIO 03') ? "0.4" : "0.2"}>03</text></g>
                        <g transform="rotate(252 220 220)"><text fill={availableScenarios.includes('SCENARIO 04') ? "#16845B" : "#9CA3AF"} fontFamily="Poppins, sans-serif" fontSize="32" fontWeight="800" textAnchor="middle" x="220" y="75" opacity={availableScenarios.includes('SCENARIO 04') ? "0.4" : "0.2"}>04</text></g>
                        <g transform="rotate(324 220 220)"><text fill={availableScenarios.includes('SCENARIO 05') ? "#16845B" : "#9CA3AF"} fontFamily="Poppins, sans-serif" fontSize="32" fontWeight="800" textAnchor="middle" x="220" y="75" opacity={availableScenarios.includes('SCENARIO 05') ? "0.4" : "0.2"}>05</text></g>

                        <circle cx="220" cy="220" fill="none" stroke="#FFFFFF" strokeWidth="8" r="210"></circle>
                      </svg>
                    </div>

                    {/* Inner Static Circle Overlay */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px] bg-[#F9F9FF] rounded-full shadow-lg drop-shadow-md z-20 flex flex-col items-center justify-center pointer-events-none transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#16845B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mb-1 sm:mb-2 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
                        <path d="M21 2v6h-6"></path>
                        <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                        <path d="M3 22v-6h6"></path>
                        <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                      </svg>
                      <span className="font-poppins font-bold text-brand-navy text-[12px] sm:text-[16px] md:text-[20px] tracking-tight leading-tight mt-1">5 SCENARIOS</span>
                      <span className="font-poppins text-brand-grayMuted text-[10px] sm:text-[12px] md:text-[14px] mt-0.5 sm:mt-1">Scenario Draw</span>
                    </div>
                  </div>

                  <div className="text-center mt-2 w-full max-w-xs animate-pulse">
                    <p className="font-poppins text-brand-navy font-semibold text-sm">
                      {isSpinning ? "Allocating..." : "Tap or rotate the wheel to spin"}
                    </p>
                  </div>
                </>
              ) : (
                <div className="mt-8 w-full max-w-sm flex flex-col items-center animate-in zoom-in-95 duration-500">
                  <div className="mb-8 text-center p-8 border border-brand-border rounded-xl bg-slate-50 w-full shadow-sm relative overflow-hidden">
                    {/* Decorative accent */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#16845B]"></div>
                    
                    <p className="text-[#16845B] font-bold text-xs tracking-widest uppercase mb-3 font-poppins">Allocated Scenario</p>
                    <h3 className="text-3xl font-bold text-brand-navy tracking-tight">{scenarioAllocated}</h3>
                  </div>
                  
                  <div className="w-full pt-4 border-t border-brand-border flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setPhase(1)}
                      className="w-full sm:w-1/3 inline-flex items-center justify-center bg-surface-container hover:bg-gray-200 text-secondary font-label-md text-label-md font-bold px-7 py-3.5 rounded-lg shadow-sm transition-all duration-200"
                    >
                      Edit Team
                    </button>
                    <button
                      onClick={() => setPhase(3)}
                      className="w-full sm:w-2/3 inline-flex items-center justify-center bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-bold px-7 py-3.5 rounded-lg shadow-sm transition-all duration-200 hover:-translate-y-0.5 gap-2"
                    >
                      <span>Continue To Review</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- PHASE 3: CONFIRMATION --- */}
        {phase === 3 && (
          <div className="step-view max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="space-y-4">

              {/* Checkbox */}
              <div className="p-4 border border-brand-border rounded-xl bg-brand-bgWarm">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    className="w-4 h-4 mt-0.5 accent-brand-orange rounded border-brand-border text-brand-orange focus:ring-0"
                    type="checkbox"
                    checked={agreementChecked}
                    onChange={(e) => setAgreementChecked(e.target.checked)}
                  />
                  <span className="text-[11px] sm:text-xs text-brand-navy font-normal leading-relaxed">
                    I confirm that the team information provided on the right is correct, and I understand that the allocated scenario ({scenarioAllocated}) is final.
                  </span>
                </label>
              </div>

              {/* Review Actions */}
              <div className="pt-4 border-t border-brand-border flex flex-col items-end gap-3">
                {submitError && <p className="text-brand-red text-xs font-poppins font-semibold">{submitError}</p>}
                
                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
                  <button
                    onClick={() => setPhase(1)}
                    className="w-full sm:w-auto inline-flex items-center justify-center font-label-md text-label-md font-bold px-7 py-3.5 rounded-lg shadow-sm transition-all duration-200 bg-surface-container hover:bg-gray-200 text-secondary"
                  >
                    Edit Team
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={!agreementChecked || isSubmitting}
                    className={`w-full sm:w-auto inline-flex items-center justify-center font-label-md text-label-md font-bold px-7 py-3.5 rounded-lg shadow-sm transition-all duration-200 gap-2 ${agreementChecked && !isSubmitting ? 'bg-primary-container hover:bg-primary text-on-primary hover:-translate-y-0.5 cursor-pointer' : 'bg-surface-container text-secondary cursor-not-allowed'
                      }`}
                  >
                  <span>{isSubmitting ? 'Submitting...' : 'Confirm & Submit Registration'}</span>
                  {!isSubmitting && <span>✓</span>}
                </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- PHASE 4: SUCCESS --- */}
        {phase === 4 && (
          <div className="step-view max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="text-left">
              <div className="w-10 h-10 rounded-full bg-brand-greenLight text-brand-green border border-brand-green/30 flex items-center justify-center mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path></svg>
              </div>
              <span className="text-[10px] font-poppins tracking-widest text-brand-green font-bold block mb-1.5">
                Registration Complete
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy leading-none">
                You're in.
              </h2>
              <p className="text-xs text-brand-grayMuted mt-2 max-w-md">
                Your team is registered and enrolled in the Infobee Hackathon 2026 cohort database. Check the right panel for your permanent Registration ID.
              </p>

              {/* Next Steps */}
              <div className="mt-6">
                <h4 className="text-[10px] font-poppins tracking-widest font-bold text-brand-navy mb-2.5">
                  What Happens Next?
                </h4>
                <div className="space-y-2">
                  <div className="p-3 rounded-xl border border-brand-border bg-brand-bgWarm/40">
                    <span className="font-poppins text-[11px] font-bold text-brand-navy block mb-0.5">01. Review Scenario</span>
                    <p className="text-[11px] text-brand-grayMuted">Access full problem statement, user personas, and constraints.</p>
                  </div>
                  <div className="p-3 rounded-xl border border-brand-border bg-brand-bgWarm/40">
                    <span className="font-poppins text-[11px] font-bold text-brand-navy block mb-0.5">02. Prepare 4-Slide PPT</span>
                    <p className="text-[11px] text-brand-grayMuted">Draft Title, Abstract, Architecture, and Roadmap slides.</p>
                  </div>
                  <div className="p-3 rounded-xl border border-brand-border bg-brand-bgWarm/40">
                    <span className="font-poppins text-[11px] font-bold text-brand-navy block mb-0.5">03. Submit Before Deadline</span>
                    <p className="text-[11px] text-brand-grayMuted">Submit portal upload before Tuesday 1:00 PM cutoff.</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a href="/Problem_Statements.docx" download className="inline-flex items-center justify-center gap-2 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-bold px-7 py-3.5 rounded-lg shadow-sm transition-all duration-200 hover:-translate-y-0.5">
                    <span>Download Scenarios (.docx)</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                  </a>
                  <a href="/InfoBee_Hackathon.pptx" download className="inline-flex items-center justify-center gap-2 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-bold px-7 py-3.5 rounded-lg shadow-sm transition-all duration-200 hover:-translate-y-0.5">
                    <span>Download PPTX Template</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                  </a>
                  <Link to="/hackathon" className="inline-flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-bold px-7 py-3.5 rounded-lg shadow-sm transition-all duration-200 hover:-translate-y-0.5">
                    <span>Back to Hackathon</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ============================================== */}
      {/* RIGHT SIDE: STATUS/INFO PANEL (FIXED/STATIC) */}
      {/* ============================================== */}
      <div className="hidden lg:block w-full lg:w-[40%] h-full bg-white border-t lg:border-t-0 lg:border-l border-brand-border p-6 md:p-10 overflow-y-auto">

        <div className="w-full h-full flex flex-col">
          {phase === 4 && (
            <div className="mb-4 p-3 rounded-xl bg-brand-bgWarm border border-brand-border flex items-center justify-between shadow-sm">
              <div>
                <span className="text-[9px] font-poppins tracking-widest text-brand-grayMuted">Registration ID</span>
                <p className="font-poppins text-sm font-bold text-brand-navy mt-0.5">{registrationId || 'INF-2026-9482'}</p>
              </div>
              <span className="text-[10px] font-poppins px-2 py-1 rounded bg-brand-greenLight text-brand-green border border-brand-green/20 font-bold">
                VERIFIED
              </span>
            </div>
          )}

          {scenarioAllocated && (
            <div className="mb-4 p-4 rounded-xl bg-brand-navy text-white shadow-md relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-orange"></div>
              <span className="text-[9px] font-poppins tracking-widest text-brand-grayMuted block">Your Challenge</span>
              <h4 className="text-lg font-bold mt-1 tracking-tight text-white">{scenarioAllocated}</h4>
            </div>
          )}

          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-brand-border">
              <h3 className="text-xs md:text-sm font-poppins tracking-widest font-bold text-brand-navy uppercase">Team Summary</h3>
              {isPhase1Valid ? (
                <span className="text-[10px] font-poppins px-2 py-1 rounded bg-brand-greenLight text-brand-green border border-brand-green/20 font-bold">Ready</span>
              ) : (
                <span className="text-[10px] font-poppins px-2 py-1 rounded bg-slate-100 text-brand-grayMuted border border-brand-border font-semibold">Incomplete</span>
              )}
            </div>

            <div className="py-6 space-y-6">
              <div>
                <span className="text-[10px] md:text-xs font-poppins tracking-wider text-brand-grayMuted block mb-1 uppercase">Team</span>
                <p className="text-sm font-bold text-brand-navy break-words min-h-[1.5rem]">{teamName || 'Not added'}</p>
              </div>

              <div>
                <span className="text-[10px] md:text-xs font-poppins tracking-wider text-brand-grayMuted block mb-1 uppercase">Leader</span>
                <p className="text-sm font-semibold text-brand-navy break-words min-h-[1.5rem]">{leaderName || 'Not added'}</p>
                {leaderRoll && <p className="font-poppins text-xs text-brand-grayMuted mt-0.5">{leaderRoll}</p>}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] md:text-xs font-poppins tracking-wider text-brand-grayMuted uppercase">Members</span>
                  <span className="font-poppins text-xs font-bold text-brand-navy">{filledMembersCount} / 3</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden mb-4">
                  <div className="h-full bg-brand-navy transition-all duration-300" style={{ width: `${(filledMembersCount / 3) * 100}%` }}></div>
                </div>

                <div className="pt-4 border-t border-brand-border/60 text-xs md:text-sm space-y-2 text-brand-grayMuted">
                  {filledMembersCount === 0 ? (
                    <span className="italic">No additional members added yet.</span>
                  ) : (
                    members.filter(m => m.name && m.roll).map((m, i) => (
                      <div key={i} className="flex items-center justify-between py-1 border-b border-brand-border/40 last:border-0">
                        <span className="font-medium text-brand-navy break-words max-w-[150px]">{m.name}</span>
                        <span className="font-poppins text-brand-grayMuted">{m.roll}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {phase < 4 && (
              <div className="mt-auto pt-6 border-t border-brand-border text-xs text-brand-grayMuted space-y-2 font-poppins">
                <span className="font-bold text-brand-navy tracking-wider block uppercase">Rules</span>
                <p>• Min 3 and Max 4 members per team.</p>
                <p>• Only IT department 2nd year students can register.</p>
                <p>• Scenario allocation is final.</p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
