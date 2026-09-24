import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Sparkles, 
  Users, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Upload, 
  ChevronRight, 
  Award, 
  Layers, 
  Flame, 
  Target, 
  Code, 
  Eye, 
  Star, 
  Briefcase 
} from 'lucide-react';
import { api } from '../../services/api';
import CandidateDetailModal from './CandidateDetailModal';
import CreateRoleModal from './CreateRoleModal';
import BatchResumeUploadModal from './BatchResumeUploadModal';

export default function CompanyDashboard({ currentUser }) {
  const [roles, setRoles] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState('');
  const [talentPoolAnalytics, setTalentPoolAnalytics] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Modals
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
  const [isBatchUploadOpen, setIsBatchUploadOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // 1. Fetch company roles
  useEffect(() => {
    setIsLoading(true);
    api.getCompanyRoles().then(res => {
      if (res && res.roles && res.roles.length > 0) {
        setRoles(res.roles);
        setSelectedRoleId(res.roles[0].id);
      }
    }).finally(() => setIsLoading(false));
  }, []);

  // 2. Load gap analysis & candidate ranking for selected role
  useEffect(() => {
    if (selectedRoleId) {
      setIsLoading(true);
      api.sourceCandidates({
        roleId: selectedRoleId,
        filterCollegeTier: tierFilter
      }).then(res => {
        if (res && res.success) {
          setCandidates(res.candidates);
          setTalentPoolAnalytics(res.talentPoolAnalytics);
        }
      }).finally(() => setIsLoading(false));
    }
  }, [selectedRoleId, tierFilter]);

  const selectedRole = roles.find(r => r.id === selectedRoleId) || roles[0];

  const filteredCandidates = candidates.filter(c => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return c.name.toLowerCase().includes(q) ||
      c.college.toLowerCase().includes(q) ||
      (c.skills || []).some(s => s.toLowerCase().includes(q));
  });

  const handleRoleCreated = (newRole) => {
    setRoles([newRole, ...roles]);
    setSelectedRoleId(newRole.id);
  };

  const handleBatchRanked = (ranked) => {
    setCandidates(ranked);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Top Company Header & Role Selector */}
      <div className="bg-dark-800 border border-dark-700 rounded-xl p-5 shadow-card-dark flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 rounded-lg bg-dark-700 border border-brand-cyan/40 flex items-center justify-center text-brand-cyan flex-shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                {currentUser?.companyName || "Microsoft"} Recruiting Console
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
            </div>
            
            <div className="flex items-center gap-2 mt-0.5">
              <select
                value={selectedRoleId}
                onChange={(e) => setSelectedRoleId(e.target.value)}
                className="bg-transparent font-bold text-white text-base sm:text-lg focus:outline-none cursor-pointer hover:text-brand-cyan transition-colors"
              >
                {roles.map(r => (
                  <option key={r.id} value={r.id} className="bg-dark-850 text-slate-100 font-sans">
                    {r.title} ({r.ctcBand})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          <button
            onClick={() => setIsBatchUploadOpen(true)}
            className="btn-secondary text-xs font-mono flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5 text-brand-cyan" />
            Batch Upload Resumes
          </button>

          <button
            onClick={() => setIsCreateRoleOpen(true)}
            className="btn-primary text-xs flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            New Role
          </button>
        </div>

      </div>

      {/* Role Calibration & Talent Pool Gap Overview Banner */}
      {selectedRole && talentPoolAnalytics && (
        <div className="bg-gradient-to-r from-dark-800 via-dark-850 to-dark-800 border-2 border-brand-cyan/40 rounded-2xl p-6 shadow-glow-blue relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30 text-[11px] font-mono px-2.5 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3" />
                AI Skill Gap Analyzer · Candidate Pool Calibration
              </div>
              <h3 className="text-xl font-bold text-white">
                Talent Pool Readiness vs "{selectedRole.title}"
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 font-mono pt-1">
                <span>Location: <strong className="text-white">{selectedRole.location}</strong></span>
                <span>•</span>
                <span>CTC: <strong className="text-brand-green">{selectedRole.ctcBand}</strong></span>
                <span>•</span>
                <span>Experience: <strong className="text-white">{selectedRole.experienceLevel}</strong></span>
              </div>
            </div>

            {/* Metrics */}
            <div className="flex items-center gap-4 bg-dark-900/90 border border-dark-700 p-4 rounded-xl">
              <div className="text-center px-2">
                <p className="text-[10px] font-mono text-slate-400 uppercase">Avg Pool Fit</p>
                <p className="text-2xl font-bold font-mono text-brand-cyan">{talentPoolAnalytics.averageCandidateFitScore}%</p>
              </div>
              <div className="h-8 w-px bg-dark-700"></div>
              <div className="text-center px-2">
                <p className="text-[10px] font-mono text-slate-400 uppercase">Day-1 Ready</p>
                <p className="text-2xl font-bold font-mono text-brand-green">{talentPoolAnalytics.readyCandidatesCount}</p>
              </div>
              <div className="h-8 w-px bg-dark-700"></div>
              <div className="text-center px-2">
                <p className="text-[10px] font-mono text-slate-400 uppercase">Upskill Needed</p>
                <p className="text-2xl font-bold font-mono text-amber-400">{talentPoolAnalytics.upskillingNeededCount}</p>
              </div>
            </div>

          </div>

          {/* Skill Distribution Across Candidate Talent Pool */}
          <div className="mt-6 pt-4 border-t border-dark-700/80">
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
              Candidate Pool Skill Availability Matrix:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {talentPoolAnalytics.skillDistribution?.map(sd => (
                <div key={sd.skillName} className="bg-dark-900/80 p-3 rounded-lg border border-dark-700 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-200 truncate max-w-[140px]">{sd.skillName}</span>
                    <strong className={sd.percentageCoverage >= 70 ? "text-brand-green" : (sd.percentageCoverage >= 40 ? "text-amber-400" : "text-rose-400")}>
                      {sd.percentageCoverage}%
                    </strong>
                  </div>
                  <div className="w-full h-1 bg-dark-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${sd.percentageCoverage >= 70 ? "bg-brand-green" : (sd.percentageCoverage >= 40 ? "bg-amber-400" : "bg-rose-400")}`}
                      style={{ width: `${sd.percentageCoverage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>{sd.candidatesWithSkill} Candidates</span>
                    <span className={sd.isMandatory ? "text-brand-green font-semibold" : "text-slate-500"}>
                      {sd.isMandatory ? "Mandatory" : "Optional"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AI Candidate Sourcing Leaderboard */}
      <div className="space-y-4">
        
        {/* Table Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-brand-green" />
              AI-Ranked Candidates for Shortlisting ({filteredCandidates.length})
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Ranked by multi-attribute fit score, core matching skills and gap breakdown
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="input-hr py-1.5 text-xs"
            >
              <option value="all">All College Tiers</option>
              <option value="Tier 1">Tier 1 (IIT, BITS, NIT)</option>
              <option value="Tier 1.5">Tier 1.5 (DTU, NSUT)</option>
              <option value="Tier 2">Tier 2 (VIT, RVCE)</option>
            </select>

            <div className="relative w-full sm:w-56">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search candidate, skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-hr w-full pl-9 py-1.5 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Candidate Leaderboard Table */}
        <div className="card-hr p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-dark-850 border-b border-dark-700 text-[11px] font-mono uppercase text-slate-400">
                  <th className="py-3 px-4">Rank & Candidate</th>
                  <th className="py-3 px-4">Fit Score</th>
                  <th className="py-3 px-4">College / Experience</th>
                  <th className="py-3 px-4">Matching Skills</th>
                  <th className="py-3 px-4">Identified Skill Gaps</th>
                  <th className="py-3 px-4 text-right">Evaluation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-700/60 text-xs">
                {filteredCandidates.map((cand, idx) => (
                  <tr key={cand.id} className="hover:bg-dark-750/50 transition-colors">
                    
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-slate-500 w-5">
                          #{idx + 1}
                        </span>
                        <img src={cand.avatar} alt={cand.name} className="w-8 h-8 rounded-full object-cover border border-dark-600" />
                        <div>
                          <p className="font-bold text-white text-sm">{cand.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono truncate max-w-[160px]">{cand.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base font-bold text-brand-green">
                          {cand.fitScore}%
                        </span>
                        <div className="w-12 h-1.5 bg-dark-700 rounded-full overflow-hidden hidden sm:block">
                          <div 
                            className="h-full bg-brand-green rounded-full"
                            style={{ width: `${cand.fitScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono text-slate-300">
                      <p className="font-medium text-white">{cand.college}</p>
                      <p className="text-[10px] text-slate-400">
                        {cand.cgpa ? `${cand.cgpa} CGPA` : `${cand.yearsOfExperience} YoE`} • {cand.collegeTier}
                      </p>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {cand.matchedSkills?.slice(0, 3).map(s => (
                          <span key={s} className="badge-matched text-[10px]">
                            ✓ {s}
                          </span>
                        ))}
                        {cand.matchedSkills?.length > 3 && (
                          <span className="text-[10px] text-slate-500 font-mono self-center">
                            +{cand.matchedSkills.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {cand.missingSkills && cand.missingSkills.length > 0 ? (
                          cand.missingSkills.map(s => (
                            <span key={s} className="badge-missing text-[10px]">
                              ✗ {s}
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] font-mono text-emerald-400">No Gaps</span>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedCandidate(cand)}
                        className="btn-outline-green text-[11px] py-1 px-3 ml-auto flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Deep Dive
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Candidate Deep-Dive Modal */}
      {selectedCandidate && (
        <CandidateDetailModal
          isOpen={!!selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          candidate={selectedCandidate}
          roleTitle={selectedRole?.title}
        />
      )}

      {/* Create Role Modal */}
      {isCreateRoleOpen && (
        <CreateRoleModal
          isOpen={isCreateRoleOpen}
          onClose={() => setIsCreateRoleOpen(false)}
          onRoleCreated={handleRoleCreated}
          currentCompany={currentUser?.companyName || "Microsoft"}
        />
      )}

      {/* Batch Resume Upload Modal */}
      {isBatchUploadOpen && (
        <BatchResumeUploadModal
          isOpen={isBatchUploadOpen}
          onClose={() => setIsBatchUploadOpen(false)}
          selectedRole={selectedRole}
          onBatchRanked={handleBatchRanked}
        />
      )}

    </div>
  );
}
