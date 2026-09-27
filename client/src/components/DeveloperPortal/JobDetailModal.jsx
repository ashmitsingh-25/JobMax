import React, { useState } from 'react';
import { 
  X, 
  Briefcase, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Send, 
  Building2, 
  MapPin, 
  DollarSign, 
  Clock, 
  Sparkles, 
  Check, 
  Layers 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function JobDetailModal({ isOpen, onClose, job, currentUser }) {
  const [applied, setApplied] = useState(false);

  if (!isOpen || !job) return null;

  const studentSkills = (currentUser?.skills || []).map(s => s.toLowerCase());
  const required = job.requiredSkills || [];

  const matched = [];
  const missing = [];

  required.forEach(sk => {
    const skName = typeof sk === 'string' ? sk : (sk?.name || '');
    const isMatched = studentSkills.some(s => 
      s === skName.toLowerCase() || s.includes(skName.toLowerCase()) || skName.toLowerCase().includes(s)
    );
    const item = typeof sk === 'object' ? sk : { name: skName };
    if (isMatched) {
      matched.push(item);
    } else {
      missing.push(item);
    }
  });

  const fitPercent = required.length > 0 
    ? Math.round((matched.length / required.length) * 100) 
    : 75;


  const handleApply = () => {
    setApplied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-dark-800 border border-dark-600 w-full max-w-2xl rounded-2xl p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 mb-5 border-b border-dark-700">
          <div className="flex items-center gap-3.5">
            <img
              src={job.companyLogo || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100"}
              alt={job.company}
              className="w-12 h-12 rounded-xl object-cover border border-dark-600"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-xl text-white">{job.role}</h3>
                <span className="font-mono text-xs text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/30 px-2 py-0.5 rounded">
                  {fitPercent}% Fit Score
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-0.5">
                <span className="text-white font-semibold">{job.company}</span>
                <span>•</span>
                <span>{job.location}</span>
                <span>•</span>
                <span className="text-slate-500">{job.workType}</span>
              </div>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Highlights */}
        <div className="grid grid-cols-3 gap-3 bg-dark-850 p-3 rounded-xl border border-dark-700 text-xs font-mono text-slate-300 mb-6">
          <div>
            <span className="text-slate-500 uppercase text-[10px] block">Compensation:</span>
            <strong className="text-brand-green text-sm">{job.ctcBand}</strong>
          </div>
          <div>
            <span className="text-slate-500 uppercase text-[10px] block">Experience:</span>
            <strong className="text-white text-sm">{job.experienceRequired}</strong>
          </div>
          <div>
            <span className="text-slate-500 uppercase text-[10px] block">Domain:</span>
            <strong className="text-brand-cyan text-sm">{job.domain}</strong>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2 mb-6">
          <h4 className="font-bold text-sm text-white">Role Overview</h4>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            {job.description}
          </p>
        </div>

        {/* Skill Match Breakdown */}
        <div className="bg-dark-850 border border-dark-700 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
              Skill Compatibility Check:
            </p>
            <span className="text-xs font-mono text-slate-300">
              {matched.length} of {required.length} required skills matched
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Matching Skills:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {matched.length > 0 ? (
                  matched.map((m, idx) => {
                    const mName = typeof m === 'string' ? m : (m?.name || '');
                    return (
                      <span key={idx} className="badge-matched text-[11px]">
                        ✓ {mName}
                      </span>
                    );
                  })
                ) : (
                  <span className="text-xs text-slate-500 font-mono">No direct matches</span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono text-rose-400 flex items-center gap-1 font-semibold">
                <XCircle className="w-3.5 h-3.5" />
                Skills You Should Learn:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {missing.length > 0 ? (
                  missing.map((m, idx) => {
                    const mName = typeof m === 'string' ? m : (m?.name || '');
                    return (
                      <span key={idx} className="badge-missing text-[11px]">
                        ✗ {mName}
                      </span>
                    );
                  })
                ) : (
                  <span className="text-xs text-emerald-400 font-mono">100% Core Skill Fit!</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Good to have */}
        {job.goodToHaveSkills && job.goodToHaveSkills.length > 0 && (
          <div className="space-y-2 mb-6">
            <h4 className="font-bold text-xs font-mono text-slate-400 uppercase tracking-wider">
              Bonus / Preferred Technologies:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {job.goodToHaveSkills.map(s => (
                <span key={s} className="badge-code text-xs">
                  + {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-dark-700">
          <span className="text-xs font-mono text-slate-500">
            Posted {job.postedDate} • {job.applicantsCount} Applicants
          </span>

          <div className="flex items-center gap-3">
            <button onClick={onClose} className="btn-secondary text-xs">
              Close
            </button>
            <button
              onClick={handleApply}
              disabled={applied}
              className={`px-4 py-2 rounded-lg text-xs font-semibold font-mono flex items-center gap-1.5 transition-all ${
                applied
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                  : 'btn-primary'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              {applied ? 'Application Tracked ✓' : 'Quick Apply Now'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
