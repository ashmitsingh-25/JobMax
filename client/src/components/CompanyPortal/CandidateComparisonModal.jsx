import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';

export default function CandidateComparisonModal({ isOpen, onClose, candidates = [] }) {
  if (!isOpen || candidates.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-dark-800 border border-dark-700 rounded-2xl w-full max-w-7xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-700">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Side-by-Side Candidate Comparison
            </h2>
            <p className="text-sm text-slate-400 mt-1">Comparing {candidates.length} selected candidates</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-dark-700 rounded-lg text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="p-6 overflow-x-auto flex-1 overflow-y-auto custom-scrollbar">
          <div className="flex gap-4 min-w-max">
            {/* Labels Column */}
            <div className="w-48 flex-shrink-0 flex flex-col gap-4 py-4 pt-20 border-r border-dark-700 pr-4">
              <div className="h-12 flex items-center font-semibold text-slate-400 text-sm">Overall Fit Score</div>
              <div className="h-12 flex items-center font-semibold text-slate-400 text-sm">Tech Match</div>
              <div className="h-12 flex items-center font-semibold text-slate-400 text-sm">Experience</div>
              <div className="h-12 flex items-center font-semibold text-slate-400 text-sm">College</div>
              <div className="h-12 flex items-center font-semibold text-slate-400 text-sm">Projects</div>
              <div className="flex-1 min-h-[100px] font-semibold text-slate-400 text-sm pt-4 border-t border-dark-700/50 mt-2">Missing Skills</div>
            </div>

            {/* Candidate Columns */}
            {candidates.map(cand => {
              const techMatch = Math.round((cand.matchedCount / Math.max(1, (cand.matchedCount + cand.missingCount))) * 100) || 0;
              return (
                <div key={cand.id} className="w-72 flex-shrink-0 flex flex-col gap-4 bg-dark-900/50 rounded-xl p-4 border border-dark-700/50">
                  {/* Candidate Header */}
                  <div className="flex items-center gap-3 h-16 mb-4">
                    <img src={cand.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"} alt={cand.name} className="w-12 h-12 rounded-full object-cover border border-dark-600" />
                    <div>
                      <h3 className="font-bold text-white text-base truncate w-48">{cand.name}</h3>
                      <p className="text-xs text-slate-400">{cand.roleType === 'fresher' ? 'Fresher' : 'Experienced'}</p>
                    </div>
                  </div>

                  {/* Fit Score */}
                  <div className="h-12 flex items-center">
                    <span className="text-2xl font-bold text-brand-green">{cand.fitScore}%</span>
                  </div>

                  {/* Tech Match */}
                  <div className="h-12 flex items-center">
                    <div className="w-full">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">{techMatch}% Match</span>
                        <span className="text-slate-500">{cand.matchedCount} / {cand.matchedCount + cand.missingCount}</span>
                      </div>
                      <div className="w-full h-1.5 bg-dark-700 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-cyan rounded-full" style={{ width: `${techMatch}%` }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="h-12 flex items-center">
                    <span className="text-sm text-slate-300">{cand.yearsOfExperience} YoE</span>
                  </div>

                  {/* College */}
                  <div className="h-12 flex items-center">
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-300 truncate w-60">{cand.college}</span>
                      <span className="text-xs text-slate-500">{cand.collegeTier}</span>
                    </div>
                  </div>

                  {/* Projects */}
                  <div className="h-12 flex items-center">
                    <span className="text-sm text-slate-300">{cand.projects?.length || 0} Projects</span>
                  </div>

                  {/* Missing Skills */}
                  <div className="flex-1 pt-4 border-t border-dark-700/50 mt-2">
                    <div className="flex flex-wrap gap-1">
                      {cand.missingSkills && cand.missingSkills.length > 0 ? (
                        cand.missingSkills.map(s => (
                          <span key={s} className="text-xs px-2 py-1 rounded bg-rose-950/40 border border-rose-500/20 text-rose-400">
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> No Gaps
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
    </div>
  );
}
