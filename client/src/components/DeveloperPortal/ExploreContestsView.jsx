import React, { useEffect, useState } from 'react';
import { Trophy, Code, Clock, Users, ChevronRight, Award } from 'lucide-react';
import { api } from '../../services/api';

export default function ExploreContestsView({ currentUser }) {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getContests().then(res => {
      if (res.success) setContests(res.contests);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-center p-12 text-slate-400">Loading contests...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-brand-green" /> Explore Contests
          </h2>
          <p className="text-sm text-slate-400">Participate in challenges to prove your skills to companies.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {contests.map(contest => (
          <div key={contest.id} className="bg-dark-800 border border-dark-700 rounded-xl p-6 shadow-card-dark flex flex-col md:flex-row gap-6 hover:border-brand-green/30 transition-colors">
            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{contest.name}</h3>
                  <p className="text-sm text-brand-green font-mono">{contest.companyName}</p>
                </div>
                <span className="px-3 py-1 bg-dark-700 text-xs font-mono text-slate-300 rounded-full border border-dark-600">
                  {contest.difficulty}
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{contest.description}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {contest.skills.map(skill => (
                  <span key={skill} className="px-2 py-1 bg-dark-850 text-slate-300 border border-dark-700 rounded text-xs font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col justify-between md:w-64 shrink-0 bg-dark-850 rounded-lg p-4 border border-dark-700">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 flex items-center gap-1.5"><Clock className="w-4 h-4" /> Duration</span>
                  <span className="text-white font-mono">{contest.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 flex items-center gap-1.5"><Users className="w-4 h-4" /> Enrolled</span>
                  <span className="text-white font-mono">{contest.participants} / {contest.maxParticipants}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 flex items-center gap-1.5"><Award className="w-4 h-4" /> Prize</span>
                  <span className="text-white font-mono text-xs text-right max-w-[100px]">{contest.prize}</span>
                </div>
              </div>
              <button className="btn-primary w-full mt-4 flex justify-center items-center gap-2">
                Register Now <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {contests.length === 0 && (
          <div className="text-center p-12 bg-dark-800 rounded-xl border border-dark-700">
            <Trophy className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white">No active contests</h3>
            <p className="text-slate-400 mt-2">Check back later for new coding challenges.</p>
          </div>
        )}
      </div>
    </div>
  );
}
