import React, { useEffect, useState } from 'react';
import { Trophy, Plus, Users, Clock, Edit2, Play, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';

export default function CompanyContestsView({ currentUser }) {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getContests().then(res => {
      if (res.success) {
        // In a real app, we'd filter by company ID. Here we just show all or mock it.
        setContests(res.contests);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-center p-12 text-slate-400">Loading contests...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-dark-800 p-6 rounded-xl border border-dark-700 shadow-card-dark">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-brand-green" /> Skill Contests
          </h2>
          <p className="text-sm text-slate-400 mt-1">Create and manage coding challenges to evaluate real-world skills.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Create Contest
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contests.map(contest => (
          <div key={contest.id} className="bg-dark-800 border border-dark-700 rounded-xl p-6 shadow-card-dark flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-white">{contest.name}</h3>
                <span className="flex items-center gap-1 text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-1 rounded bg-brand-green/10 text-brand-green border border-brand-green/30">
                  <Play className="w-3 h-3" /> {contest.status}
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-4 line-clamp-2">{contest.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {contest.skills.slice(0, 3).map(skill => (
                  <span key={skill} className="px-2 py-1 bg-dark-900 border border-dark-700 rounded text-xs font-mono text-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-dark-700">
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                  <Users className="w-4 h-4" /> <span className="font-mono text-white">{contest.participants}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                  <Clock className="w-4 h-4" /> <span className="font-mono text-white">{contest.duration}</span>
                </div>
              </div>
              <button className="text-brand-cyan hover:text-white transition-colors flex items-center gap-1 text-sm font-medium">
                <Edit2 className="w-4 h-4" /> Manage
              </button>
            </div>
          </div>
        ))}

        {/* Empty State / Create Prompt */}
        <button className="border-2 border-dashed border-dark-600 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 hover:text-brand-green hover:border-brand-green/50 hover:bg-dark-800/50 transition-all min-h-[250px]">
          <div className="w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center mb-4 border border-dark-600">
            <Plus className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-300 mb-1">Create New Contest</h3>
          <p className="text-sm text-center max-w-xs">Publish a new technical challenge to discover top candidates automatically.</p>
        </button>
      </div>
    </div>
  );
}
