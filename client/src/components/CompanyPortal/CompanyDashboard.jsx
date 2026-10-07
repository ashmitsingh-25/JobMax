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
import CandidateComparisonModal from './CandidateComparisonModal';
import CompanyContestsView from './CompanyContestsView';
import CompanyProjectsManageView from './CompanyProjectsManageView';
import CompanyProposalsView from './CompanyProposalsView';
import MLModelsHubView from '../DeveloperPortal/MLModelsHubView';
import { Trophy, FileText, Send } from 'lucide-react';

export default function CompanyDashboard({ currentUser }) {
  const [roles, setRoles] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState('');
  const [talentPoolAnalytics, setTalentPoolAnalytics] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('sourcing');

  // Modals
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
  const [isBatchUploadOpen, setIsBatchUploadOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

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

  const selectedRole = (roles && roles.find(r => r && r.id === selectedRoleId)) || (roles && roles[0]) || { title: 'Software Engineer', requiredSkills: [] };

  const filteredCandidates = (candidates || []).filter(c => {
    if (!c) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (c?.name && c.name.toLowerCase().includes(q)) ||
      (c?.college && c.college.toLowerCase().includes(q)) ||
      (c?.skills || []).some(s => s && s.toLowerCase().includes(q));
  });

  const handleRoleCreated = (newRole) => {
    setRoles([newRole, ...roles]);
    setSelectedRoleId(newRole.id);
  };

  const handleBatchRanked = (ranked) => {
    setCandidates(ranked);
  };

  const toggleCompare = (candId) => {
    setCompareList(prev => 
      prev.includes(candId) ? prev.filter(id => id !== candId) : [...prev, candId]
    );
  };

  const selectedCandidatesForCompare = candidates.filter(c => compareList.includes(c.id));

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Top Company Header & Role Selector */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 flex-shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-sans font-semibold tracking-wider text-slate-500 uppercase">
                {currentUser?.companyName || "Microsoft"} Recruiting Console
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
            </div>
            
            <div className="flex items-center gap-2 mt-0.5">
              <select
                value={selectedRoleId}
                onChange={(e) => setSelectedRoleId(e.target.value)}
                className="bg-transparent font-heading font-bold text-slate-900 text-base sm:text-lg focus:outline-none cursor-pointer hover:text-blue-600 transition-colors"
              >
                {roles.map(r => (
                  <option key={r.id} value={r.id} className="bg-white text-slate-800 font-sans">
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
            className="btn-secondary text-xs flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5 text-blue-600" />
            Upload Candidate Resumes
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

      {/* Top Navigation Tabs */}
      <div className="flex overflow-x-auto gap-2 bg-white p-1.5 rounded-xl border border-slate-200 shadow-xs scrollbar-hide">
        {[
          { id: 'sourcing', icon: <Search className="w-4 h-4" />, label: 'Talent Sourcing' },
          { id: 'contests', icon: <Trophy className="w-4 h-4" />, label: 'Skill Contests' },
          { id: 'projects', icon: <Briefcase className="w-4 h-4" />, label: 'Company Projects' },
          { id: 'proposals', icon: <Send className="w-4 h-4" />, label: 'Sent Proposals' },
          { id: 'ml-hub', icon: <Sparkles className="w-4 h-4 text-teal-600" />, label: 'AI Models Hub' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-sans tracking-wide font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-blue-50 text-blue-700 border border-blue-200/80 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      {activeTab === 'sourcing' && (
        <div className="space-y-6 animate-in fade-in">

      {/* Role Calibration & Talent Pool Gap Overview Banner */}
      {selectedRole && talentPoolAnalytics && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 text-[11px] px-2.5 py-0.5 rounded-md font-medium">
                <Sparkles className="w-3 h-3 text-teal-600" />
                AI Skill Gap Analyzer · Candidate Pool Calibration
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-900">
                Talent Pool Readiness vs "{selectedRole.title}"
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 pt-0.5">
                <span>Location: <strong className="text-slate-800 font-medium">{selectedRole.location}</strong></span>
                <span>•</span>
                <span>CTC: <strong className="text-teal-700 font-semibold">{selectedRole.ctcBand}</strong></span>
                <span>•</span>
                <span>Experience: <strong className="text-slate-800 font-medium">{selectedRole.experienceLevel}</strong></span>
              </div>
            </div>

            {/* Metrics */}
            <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 p-3.5 rounded-lg">
              <div className="text-center px-2">
                <p className="text-[10px] font-sans font-semibold tracking-wider text-slate-500 uppercase">Avg Pool Fit</p>
                <p className="text-2xl font-bold font-heading text-blue-700">{talentPoolAnalytics.averageCandidateFitScore}%</p>
              </div>
              <div className="h-8 w-px bg-slate-200"></div>
              <div className="text-center px-2">
                <p className="text-[10px] font-sans font-semibold tracking-wider text-slate-500 uppercase">Day-1 Ready</p>
                <p className="text-2xl font-bold font-heading text-teal-700">{talentPoolAnalytics.readyCandidatesCount}</p>
              </div>
              <div className="h-8 w-px bg-slate-200"></div>
              <div className="text-center px-2">
                <p className="text-[10px] font-sans font-semibold tracking-wider text-slate-500 uppercase">Upskill Needed</p>
                <p className="text-2xl font-bold font-heading text-amber-700">{talentPoolAnalytics.upskillingNeededCount}</p>
              </div>
            </div>

          </div>

          {/* Skill Distribution Across Candidate Talent Pool */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <p className="text-xs font-sans font-semibold tracking-wider text-slate-500 uppercase mb-3">
              Candidate Pool Skill Availability Matrix:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {talentPoolAnalytics.skillDistribution?.map(sd => (
                <div key={sd.skillName} className="bg-slate-50 p-3 rounded-lg border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="text-slate-800 font-medium truncate max-w-[140px]">{sd.skillName}</span>
                    <strong className={sd.percentageCoverage >= 70 ? "text-teal-700 font-semibold" : (sd.percentageCoverage >= 40 ? "text-amber-700 font-semibold" : "text-rose-700 font-semibold")}>
                      {sd.percentageCoverage}%
                    </strong>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${sd.percentageCoverage >= 70 ? "bg-teal-600" : (sd.percentageCoverage >= 40 ? "bg-amber-500" : "bg-rose-500")}`}
                      style={{ width: `${sd.percentageCoverage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] font-sans text-slate-500">
                    <span>{sd.candidatesWithSkill} Candidates</span>
                    <span className={sd.isMandatory ? "text-teal-700 font-semibold" : "text-slate-400"}>
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
            <h3 className="text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              AI-Ranked Candidates for Shortlisting ({filteredCandidates.length})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 font-sans">
              Ranked by multi-attribute fit score, core matching skills and gap breakdown
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto flex-wrap sm:flex-nowrap">
            {compareList.length > 0 && (
              <button
                onClick={() => setIsCompareModalOpen(true)}
                className="btn-primary py-1.5 px-3 text-xs"
              >
                Compare Selected ({compareList.length})
              </button>
            )}
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="input-hr py-1.5 text-xs bg-white text-slate-800"
            >
              <option value="all">All College Tiers</option>
              <option value="Tier 1">Tier 1 (IIT, BITS, NIT)</option>
              <option value="Tier 1.5">Tier 1.5 (DTU, NSUT)</option>
              <option value="Tier 2">Tier 2 (VIT, RVCE)</option>
            </select>

            <div className="relative w-full sm:w-56">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search candidate, skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-hr w-full pl-9 py-1.5 text-xs bg-white text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Candidate Leaderboard Table */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/90 border-b border-slate-200 text-xs font-semibold text-slate-600 font-sans">
                  <th className="py-3 px-4 w-8">
                    <input 
                      type="checkbox" 
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      checked={compareList.length === filteredCandidates.length && filteredCandidates.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) setCompareList(filteredCandidates.map(c => c.id));
                        else setCompareList([]);
                      }}
                    />
                  </th>
                  <th className="py-3 px-4">Rank & Candidate</th>
                  <th className="py-3 px-4">Fit Score</th>
                  <th className="py-3 px-4">Tech Match</th>
                  <th className="py-3 px-4">College / Experience</th>
                  <th className="py-3 px-4">Matching Skills</th>
                  <th className="py-3 px-4">Identified Skill Gaps</th>
                  <th className="py-3 px-4 text-right">Evaluation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-sans">
                {filteredCandidates.map((cand, idx) => {
                  const techMatch = Math.round((cand.matchedCount / Math.max(1, (cand.matchedCount + cand.missingCount))) * 100) || 0;
                  return (
                  <tr key={cand.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <input 
                        type="checkbox" 
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        checked={compareList.includes(cand.id)}
                        onChange={() => toggleCompare(cand.id)}
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-slate-400 w-5">
                          #{idx + 1}
                        </span>
                        <img src={cand.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"} alt={cand?.name || "Candidate"} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">{cand?.name || "Candidate"}</p>
                          <p className="text-[11px] text-slate-500 font-mono truncate max-w-[160px]">{cand?.email || ""}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-heading text-base font-bold text-teal-700">
                          {cand.fitScore}%
                        </span>
                        <div className="w-12 h-1.5 bg-slate-200 rounded-full overflow-hidden hidden sm:block">
                          <div 
                            className="h-full bg-teal-600 rounded-full"
                            style={{ width: `${cand.fitScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden mt-1 relative">
                        <div 
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${techMatch}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1 block font-mono">{techMatch}% Match</span>
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-medium text-slate-900">{cand.college}</p>
                      <p className="text-[11px] text-slate-500">
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
                          <span className="text-[10px] font-sans font-medium text-teal-700">No Gaps</span>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedCandidate(cand)}
                        className="btn-secondary text-[11px] py-1 px-2.5 ml-auto flex items-center gap-1 text-slate-700 hover:text-blue-600 hover:border-blue-300"
                      >
                        <Eye className="w-3.5 h-3.5 text-blue-600" />
                        Deep Dive
                      </button>
                    </td>

                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        </div>

        </div>
      </div>
      )}
      {activeTab === 'contests' && <CompanyContestsView currentUser={currentUser} />}
      {activeTab === 'projects' && <CompanyProjectsManageView currentUser={currentUser} />}
      {activeTab === 'proposals' && <CompanyProposalsView currentUser={currentUser} />}
      {activeTab === 'ml-hub' && <MLModelsHubView currentUser={currentUser} />}

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

      {/* Candidate Comparison Modal */}
      <CandidateComparisonModal 
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        candidates={selectedCandidatesForCompare}
      />

    </div>
  );
}
