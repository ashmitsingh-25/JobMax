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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-xl p-6 sm:p-7 shadow-xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 mb-5 border-b border-slate-200">
          <div className="flex items-center gap-3.5">
            <img
              src={job.companyLogo || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100"}
              alt={job.company}
              className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-2xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-semibold text-xl text-slate-900">{job.role}</h3>
                <span className="font-sans tracking-wide text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md">
                  {fitPercent}% Fit Score
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-sans tracking-wide mt-1">
                <span className="text-slate-800 font-semibold">{job.company}</span>
                <span>•</span>
                <span>{job.location}</span>
                <span>•</span>
                <span className="text-slate-500">{job.workType}</span>
              </div>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-1 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Highlights */}
        <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs font-sans tracking-wide text-slate-700 mb-6">
          <div>
            <span className="text-slate-400 uppercase text-[10px] font-semibold block">Compensation</span>
            <strong className="text-blue-700 font-bold text-sm">{job.ctcBand}</strong>
          </div>
          <div>
            <span className="text-slate-400 uppercase text-[10px] font-semibold block">Experience</span>
            <strong className="text-slate-900 font-bold text-sm">{job.experienceRequired}</strong>
          </div>
          <div>
            <span className="text-slate-400 uppercase text-[10px] font-semibold block">Domain</span>
            <strong className="text-teal-700 font-bold text-sm">{job.domain}</strong>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2 mb-6">
          <h4 className="font-display font-semibold text-sm text-slate-900">Role Overview</h4>
          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            {job.description}
          </p>
        </div>

        {/* Skill Match Breakdown */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-sans tracking-wide text-slate-700 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Skill Compatibility Check:
            </p>
            <span className="text-xs font-sans tracking-wide text-slate-600 font-medium">
              {matched.length} of {required.length} required skills matched
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-[11px] font-sans tracking-wide text-teal-700 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
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
                  <span className="text-xs text-slate-400 font-sans tracking-wide">No direct matches</span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-sans tracking-wide text-rose-700 flex items-center gap-1 font-semibold">
                <XCircle className="w-3.5 h-3.5 text-rose-600" />
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
                  <span className="text-xs text-teal-700 font-sans tracking-wide font-medium">100% Core Skill Fit!</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Good to have */}
        {job.goodToHaveSkills && job.goodToHaveSkills.length > 0 && (
          <div className="space-y-2 mb-6">
            <h4 className="font-display font-semibold text-xs text-slate-600 uppercase tracking-wider">
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
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <span className="text-xs font-sans tracking-wide text-slate-500">
            Posted {job.postedDate} • {job.applicantsCount} Applicants
          </span>

          <div className="flex items-center gap-3">
            <button onClick={onClose} className="btn-secondary text-xs">
              Close
            </button>
            <button
              onClick={handleApply}
              disabled={applied}
              className={`px-4 py-2 rounded-lg text-xs font-semibold font-sans tracking-wide flex items-center gap-1.5 transition-all ${
                applied
                  ? 'bg-teal-50 text-teal-700 border border-teal-300 font-medium'
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
