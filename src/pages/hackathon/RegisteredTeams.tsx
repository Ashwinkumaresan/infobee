import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Layout, Shield } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { API_URL } from '../../api';

interface Team {
  team_name: string;
  leader_name: string;
  scenario_allocated: string;
}

export default function RegisteredTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const round = searchParams.get('round');

  useEffect(() => {
    setLoading(true);
    let url = `${API_URL}/hackathon/registered-teams/`;
    if (round) {
      url += `?round=${round}`;
    }
    
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch teams');
        return res.json();
      })
      .then(data => {
        setTeams(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Unable to load registered teams at this time.');
        setLoading(false);
      });
  }, [round]);

  return (
    <div className="flex flex-col w-full text-on-surface bg-white min-h-screen pt-4 pb-6 relative overflow-hidden">
      {/* Tubelight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#F46B24] to-transparent opacity-60">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-3/4 h-[2px] bg-[#F46B24] blur-[1px]" />
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-1/2 h-[3px] bg-orange-300 blur-[2px]" />
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[120%] max-w-6xl h-[300px] bg-[#F46B24]/10 blur-[100px] rounded-full pointer-events-none -z-0" />
      </div>

      <section className="w-full py-space-3xl relative z-10">
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-gutter">
          <div className="flex flex-col items-start max-w-2xl mb-space-xl">
            <span className="font-label-eyebrow text-label-eyebrow uppercase text-[#F46B24] tracking-widest mb-space-xs">
              {round ? `ROUND ${round} TEAMS` : 'HACKATHON TEAMS'}
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-gray-900 tracking-tight mb-space-sm">
              {round === '2' ? 'Round 2 Shortlisted Teams' : round === '3' ? 'Round 3 Finalists' : 'Registered Teams'}
            </h2>
            <p className="font-body-lead text-body-lead text-gray-700">
              {round ? `Meet the brilliant minds advancing to Round ${round} of the Nexora'26 challenge.` : "Meet the brilliant minds taking on the Nexora'26 challenge."}
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] flex flex-col overflow-hidden animate-pulse">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 shrink-0" />
                    <div className="flex-1 space-y-3 py-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-100 rounded w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100 flex items-center justify-center">
              {error}
            </div>
          ) : teams.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 mb-8 rounded-full bg-gradient-to-br from-orange-50 via-orange-100/30 to-white flex items-center justify-center shadow-inner border border-orange-100/50 relative">
                <div className="absolute inset-0 bg-[#F46B24]/5 rounded-full animate-ping opacity-75 duration-1000" />
                <Users className="w-10 h-10 text-[#F46B24]/60 drop-shadow-sm" />
              </div>
              
              <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                {round ? 'Results Not Yet Released' : 'No Teams Registered Yet'}
              </h3>
              <p className="text-gray-500 max-w-md mx-auto text-lg leading-relaxed">
                {round ? `The shortlisted teams for Round ${round} will be announced soon. Stay tuned!` : 'Be the first to step up! Registration is currently open and teams will appear here once they secure their spot.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {teams.map((team, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={index}
                  className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:border-[#F46B24]/30 hover:shadow-[0_8px_30px_-4px_rgba(244,107,36,0.15)] transition-all duration-300 flex flex-col overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-100 via-[#F46B24]/40 to-orange-100 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-50 via-orange-100/50 to-orange-50 flex items-center justify-center text-[#F46B24] shrink-0 border border-orange-100/80 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <Users className="w-6 h-6 drop-shadow-sm" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-lg leading-tight truncate tracking-tight group-hover:text-[#F46B24] transition-colors" title={team.team_name}>
                        {team.team_name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <Shield className="w-3.5 h-3.5 text-gray-400" />
                        <p className="text-sm font-medium text-gray-600 truncate">
                          {team.leader_name}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
