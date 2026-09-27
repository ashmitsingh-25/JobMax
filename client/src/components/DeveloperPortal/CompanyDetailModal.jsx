import React from 'react';
import { 
  X, 
  Building2, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Layers, 
  Code, 
  ExternalLink, 
  Check, 
  Clock, 
  GraduationCap, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function CompanyDetailModal({ isOpen, onClose, companyRecord, currentUser }) {
  if (!isOpen || !companyRecord) return null;

  const studentSkills = (currentUser?.skills || []).map(s => s.toLowerCase());
  const demanded = companyRecord.demandedSkills || [];

  const matchedList = [];
  const missingList = [];

  demanded.forEach(sk => {
    const skName = typeof sk === 'string' ? sk : (sk?.name || '');
    const isMatched = studentSkills.some(s => 
      s === skName.toLowerCase() || s.includes(skName.toLowerCase()) || skName.toLowerCase().includes(s)
    );
    const item = typeof sk === 'object' ? sk : { name: skName };
    if (isMatched) {
      matchedList.push(item);
    } else {
      missingList.push(item);
    }
  });

  const matchPercentage = demanded.length > 0 
    ? Math.round((matchedList.length / demanded.length) * 100) 
    : 70;


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-dark-800 border border-dark-600 w-full max-w-2xl rounded-2xl p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 mb-5 border-b border-dark-700">
          <div className="flex items-center gap-3.5">
            <img
              src={companyRecord.companyLogo || "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100"}
              alt={companyRecord.company}
              className="w-12 h-12 rounded-xl object-cover border border-dark-600"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-xl text-white">{companyRecord.company}</h3>
                <span className="font-mono text-xs text-brand-green bg-brand-green/10 border border-brand-green/30 px-2 py-0.5 rounded">
                  {matchPercentage}% Fit Match
                </span>
              </div>
              <p className="text-xs text-slate-300 font-mono mt-0.5">{companyRecord.role}</p>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono mt-1">
                <span>CTC: <strong className="text-white">{companyRecord.ctcBand}</strong></span>
                <span>•</span>
                <span>Cutoff: <strong className="text-white">{companyRecord.cgpaCutoff} CGPA</strong></span>
                <span>•</span>
                <span className="text-brand-green">{companyRecord.visitFrequency}</span>
              </div>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Overview */}
        <div className="bg-dark-850 border border-dark-700 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-green" />
              Skill Compatibility Breakdown:
            </p>
            <span className="text-xs font-mono text-slate-300">
              {matchedList.length} of {demanded.length} required competencies matched
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Matched */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Your Verified Matches:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {matchedList.length > 0 ? (
                  matchedList.map((m, idx) => (
                    <span key={idx} className="badge-matched text-[11px]">
                      ✓ {m?.name || m}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500 font-mono">No direct matches yet</span>
                )}
              </div>
            </div>

            {/* Missing */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-rose-400 flex items-center gap-1 font-semibold">
                <XCircle className="w-3.5 h-3.5" />
                Missing Demanded Gaps:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {missingList.length > 0 ? (
                  missingList.map((m, idx) => (
                    <span key={idx} className="badge-missing text-[11px]">
                      ✗ {m?.name || m} ({m?.frequency || 80}%)
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-emerald-400 font-mono">Ready to clear all rounds!</span>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Selection Rounds Breakdown */}
        {companyRecord.rounds && companyRecord.rounds.length > 0 && (
          <div className="space-y-3 mb-6">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-cyan" />
              Campus Recruitment Rounds & Evaluation Rubric
            </h4>

            <div className="space-y-2.5">
              {companyRecord.rounds.map((round, ri) => (
                <div key={ri} className="card-hr p-3.5 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-dark-750 border border-brand-cyan/30 flex items-center justify-center font-mono font-bold text-brand-cyan text-xs flex-shrink-0">
                    R{ri + 1}
                  </div>
                  <div>
                    <h5 className="font-semibold text-white text-xs">{round?.name || (typeof round === 'string' ? round : `Round ${ri+1}`)}</h5>
                    <p className="text-xs text-slate-300 font-sans mt-0.5 leading-relaxed">{round?.description || ''}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Flagship Projects for this Recruiter */}
        {companyRecord.recommendedProjects && companyRecord.recommendedProjects.length > 0 && (
          <div className="space-y-3 mb-6">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <Code className="w-4 h-4 text-brand-purple" />
              Tailored Flagship Projects for {companyRecord.company}
            </h4>
            <div className="space-y-2">
              {companyRecord.recommendedProjects.map((proj, pi) => (
                <div key={pi} className="bg-dark-850 p-3 rounded-lg border border-dark-700 text-xs text-slate-200 font-mono flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-brand-green mt-0.5 flex-shrink-0" />
                  <span>{proj}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Eligible Branches & Criteria */}
        {companyRecord.eligibleBranches && (
          <div className="bg-dark-850 p-3.5 rounded-xl border border-dark-700 text-xs font-mono text-slate-300 flex items-center justify-between mb-6">
            <div>
              <span className="text-slate-500 uppercase text-[10px] block">Eligible Branches:</span>
              <span className="text-white">{companyRecord.eligibleBranches.join(", ")}</span>
            </div>
            {companyRecord.offersLastYear && (
              <div className="text-right">
                <span className="text-slate-500 uppercase text-[10px] block">Offers Last Year:</span>
                <span className="text-brand-green font-bold text-sm">{companyRecord.offersLastYear} Students</span>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-dark-700">
          <button onClick={onClose} className="btn-secondary text-xs">
            Close
          </button>
          <button onClick={onClose} className="btn-primary text-xs">
            Add to Target Placement List
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
