import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';

export default function CandidateComparisonModal({ isOpen, onClose, candidates = [] }) {
  if (!isOpen || candidates.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-7xl max-h-[90vh] flex flex-col shadow-xl overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
              Side-by-Side Candidate Comparison
            </h2>
            <p className="text-xs font-sans text-slate-500 mt-0.5">Comparing {candidates.length} selected candidates</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="p-6 overflow-x-auto flex-1 overflow-y-auto">
          <div className="flex gap-4 min-w-max">
            {/* Labels Column */}
            <div className="w-44 flex-shrink-0 flex flex-col gap-4 py-4 pt-20 border-r border-slate-200 pr-4">
              <div className="h-10 flex items-center font-semibold text-slate-500 text-xs font-sans uppercase tracking-wider">Overall Fit Score</div>
              <div className="h-10 flex items-center font-semibold text-slate-500 text-xs font-sans uppercase tracking-wider">Tech Match</div>
              <div className="h-10 flex items-center font-semibold text-slate-500 text-xs font-sans uppercase tracking-wider">Experience</div>
              <div className="h-10 flex items-center font-semibold text-slate-500 text-xs font-sans uppercase tracking-wider">College</div>
              <div className="h-10 flex items-center font-semibold text-slate-500 text-xs font-sans uppercase tracking-wider">Projects</div>
              <div className="flex-1 min-h-[80px] font-semibold text-slate-500 text-xs font-sans uppercase tracking-wider pt-3 border-t border-slate-100 mt-2">Missing Skills</div>
            </div>

            {/* Candidate Columns */}
            {candidates.map(cand => {
              const techMatch = Math.round((cand.matchedCount / Math.max(1, (cand.matchedCount + cand.missingCount))) * 100) || 0;
              return (
                <div key={cand.id} className="w-68 flex-shrink-0 flex flex-col gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
                  {/* Candidate Header */}
                  <div className="flex items-center gap-3 h-14 mb-2">
                    <img src={cand.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"} alt={cand.name} className="w-11 h-11 rounded-full object-cover border border-slate-200" />
                    <div>
                      <h3 className="font-heading font-bold text-slate-900 text-sm truncate w-44">{cand.name}</h3>
                      <p className="text-[11px] font-sans text-slate-500">{cand.roleType === 'fresher' ? 'Fresher' : 'Experienced'}</p>
                    </div>
                  </div>

                  {/* Fit Score */}
                  <div className="h-10 flex items-center">
                    <span className="text-2xl font-heading font-bold text-teal-700">{cand.fitScore}%</span>
                  </div>

                  {/* Tech Match */}
                  <div className="h-10 flex items-center">
                    <div className="w-full">
                      <div className="flex justify-between text-xs mb-1 font-sans">
                        <span className="text-slate-700 font-medium">{techMatch}% Match</span>
                        <span className="text-slate-400 font-mono text-[11px]">{cand.matchedCount} / {cand.matchedCount + cand.missingCount}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${techMatch}%` }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="h-10 flex items-center">
                    <span className="text-xs font-sans font-medium text-slate-800">{cand.yearsOfExperience} YoE</span>
                  </div>

                  {/* College */}
                  <div className="h-10 flex items-center">
                    <div className="flex flex-col">
                      <span className="text-xs font-sans font-medium text-slate-900 truncate w-56">{cand.college}</span>
                      <span className="text-[11px] font-sans text-slate-500">{cand.collegeTier}</span>
                    </div>
                  </div>

                  {/* Projects */}
                  <div className="h-10 flex items-center">
                    <span className="text-xs font-sans text-slate-700">{cand.projects?.length || 0} Projects</span>
                  </div>

                  {/* Missing Skills */}
                  <div className="flex-1 pt-3 border-t border-slate-200 mt-2">
                    <div className="flex flex-wrap gap-1">
                      {cand.missingSkills && cand.missingSkills.length > 0 ? (
                        cand.missingSkills.map(s => (
                          <span key={s} className="text-[11px] px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-700 font-sans">
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-teal-700 font-sans font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> No Gaps
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
