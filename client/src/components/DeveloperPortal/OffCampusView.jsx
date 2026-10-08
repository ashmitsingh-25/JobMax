import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Search, 
  Filter, 
  TrendingUp, 
  Briefcase, 
  Building2, 
  ExternalLink, 
  ArrowRight, 
  Flame, 
  Layers, 
  DollarSign, 
  Clock, 
  Target 
} from 'lucide-react';
import { api } from '../../services/api';
import JobDetailModal from './JobDetailModal';

export default function OffCampusView({ currentUser, onOpenResumeModal }) {
  const [jobs, setJobs] = useState([]);
  const [marketDemand, setMarketDemand] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [analysisReport, setAnalysisReport] = useState(null);
  const [selectedJobDetail, setSelectedJobDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load jobs and market demand
  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      api.getJobs({ search: searchQuery }),
      api.getMarketDemand()
    ]).then(([jobsRes, demandRes]) => {
      if (jobsRes && jobsRes.jobs) setJobs(jobsRes.jobs);
      if (demandRes && demandRes.demandStats) setMarketDemand(demandRes.demandStats);
    }).finally(() => setIsLoading(false));
  }, [searchQuery]);

  // Run AI Off-Campus Analysis
  useEffect(() => {
    if (currentUser && currentUser.skills && currentUser.skills.length > 0) {
      api.analyzeOffCampus(currentUser, currentUser?.targetRole || "Full Stack / Product Engineer").then(res => {
        if (res && res.success) {
          setAnalysisReport(res.report);
        }
      });
    }
  }, [currentUser?.skills, currentUser?.targetRole, currentUser?.cgpa, currentUser?.projects, currentUser?.lastResumeParsedAt]);

  const filteredJobs = jobs.filter(j => 
    selectedDomain === 'all' || (j?.domain && j.domain.toLowerCase().includes(selectedDomain.toLowerCase()))
  );

  return (
    <div className="space-y-4 animate-in fade-in">
      
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200 p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 flex-shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-heading">Off-Campus Market Intelligence Hub</h2>
            <p className="text-xs text-slate-500">
              Live aggregation across tech unicorns, tier-1 companies & startups
            </p>
          </div>
        </div>

        <button onClick={onOpenResumeModal} className="btn-secondary text-xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          Scan Resume vs Open Market
        </button>
      </div>

      {/* AI Bot Off-Campus Gap Report */}
      {analysisReport && (
        <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            <div className="flex items-center gap-5">
              <div className="relative flex items-center justify-center flex-shrink-0">
                <div className="w-20 h-20 rounded-full bg-slate-50 border-4 border-blue-200 flex items-center justify-center shadow-xs">
                  <div className="text-center">
                    <span className="text-2xl font-bold font-mono text-blue-800 leading-none">
                      {analysisReport.overallReadinessScore}%
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 block mt-0.5">Market Fit</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-800 border border-blue-200 text-xs font-semibold px-2.5 py-0.5 rounded mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  Market Demand Analyzer
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Open Market Tech Compatibility Verdict
                </h3>
                <p className="text-xs text-slate-600 max-w-xl leading-relaxed mt-0.5">
                  {analysisReport.summaryReport}
                </p>
              </div>
            </div>

            {/* Top Market Gaps */}
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg max-w-md w-full">
              <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1 font-medium">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                Highest ROI Skills in 2026 Tech Market:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {(analysisReport?.topGapsToClose || analysisReport?.criticalMarketGaps || []).map((gap, gIdx) => {
                  const gName = typeof gap === 'string' ? gap : (gap?.name || `Gap ${gIdx + 1}`);
                  const gFreq = typeof gap === 'object' && gap?.marketDemandFrequency ? gap.marketDemandFrequency : 80;
                  return (
                    <span key={gIdx} className="badge-missing text-[11px]">
                      <XCircle className="w-3 h-3 text-rose-600" />
                      {gName} ({gFreq}% demand)
                    </span>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Suggested Companies to Target First */}
      {analysisReport?.companyFitBreakdown && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-teal-700" />
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Companies to Target First (Ranked by Highest Immediate Fit)
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Apply with highest conversion probability
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {analysisReport.companyFitBreakdown.slice(0, 4).map((comp, idx) => (
              <div key={comp.companyId} className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all relative flex flex-col justify-between">
                <div className="absolute top-3 right-3 bg-teal-50 text-teal-800 text-[10px] px-2 py-0.5 rounded font-mono border border-teal-200 font-semibold">
                  #{idx + 1} Best Fit
                </div>

                <div>
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <img src={comp.companyLogo} alt={comp.company} className="w-8 h-8 rounded object-cover border border-slate-200" />
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">{comp.company}</h4>
                      <p className="text-[11px] text-slate-500 truncate max-w-[130px]">{comp.role}</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-2 rounded border border-slate-200 text-[11px] font-mono text-slate-600 mb-2.5 space-y-0.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Fit Score:</span>
                      <strong className="text-teal-700">{comp.fitPercentage}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">CTC:</span>
                      <strong className="text-slate-900">{comp.ctcBand}</strong>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] font-mono text-slate-400 uppercase">Matched Core:</p>
                    <div className="flex flex-wrap gap-1">
                      {comp.matchedSkills.slice(0, 2).map((ms, msIdx) => {
                        const msName = typeof ms === 'string' ? ms : (ms?.name || '');
                        return (
                          <span key={msIdx} className="badge-matched text-[10px]">
                            ✓ {msName}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100">
                  <button className="w-full btn-outline-green justify-center text-xs">
                    Apply on Careers Page
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Market Tech Demand Distribution & Active Job Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Aggregated Market Tech Demand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-700" />
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Aggregate Skill Demand Curve
            </h3>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3">
            <p className="text-xs text-slate-500">
              Frequency of technical skill requirements across analyzed listings
            </p>

            <div className="space-y-2.5 pt-1">
              {(marketDemand || []).slice(0, 8).map((item, idx) => {
                const itemName = typeof item === 'string' ? item : (item?.name || `Skill ${idx + 1}`);
                const itemFreq = typeof item === 'object' ? (item?.demandFrequency || item?.frequency || 75) : 75;
                const isStudentHave = currentUser?.skills?.some(s => 
                  s && s.toLowerCase() === itemName.toLowerCase()
                );
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className={isStudentHave ? "text-teal-800 font-semibold flex items-center gap-1 font-mono" : "text-slate-700 font-mono"}>
                        {isStudentHave && "✓ "}
                        {itemName}
                      </span>
                      <span className="text-slate-500 font-mono text-[11px]">{itemFreq}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${isStudentHave ? 'bg-teal-600' : 'bg-blue-600'}`}
                        style={{ width: `${itemFreq}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 2 Cols: Live Job Postings */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Active Off-Campus Job Openings ({filteredJobs.length})
              </h3>
            </div>

            <div className="relative w-full sm:w-56">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Filter by title, skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-hr w-full pl-9 py-1.5 text-xs"
              />
            </div>
          </div>

          <div className="space-y-2.5">
            {filteredJobs.map(job => (
              <div key={job.id} className="bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors p-4 space-y-2.5 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-3">
                    <img src={job.companyLogo} alt={job.company} className="w-9 h-9 rounded object-cover border border-slate-200" />
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">{job.role}</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="text-blue-700 font-medium">{job.company}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                        <span>•</span>
                        <span className="text-slate-400 font-mono text-[11px]">{job.postedDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex sm:flex-col items-center sm:items-end justify-between">
                    <span className="text-sm font-bold font-mono text-teal-800">{job.ctcBand}</span>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                      {job.experienceRequired}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                  <div className="flex flex-wrap gap-1.5">
                    {(job?.requiredSkills || []).map((sk, skIdx) => {
                      const skName = typeof sk === 'string' ? sk : (sk?.name || `Skill ${skIdx + 1}`);
                      const isMatched = currentUser?.skills?.some(s => s && s.toLowerCase() === skName.toLowerCase());
                      return (
                        <span key={skIdx} className={isMatched ? "badge-matched text-[10px]" : "badge-code text-[10px]"}>
                          {skName}
                        </span>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setSelectedJobDetail(job)}
                    className="btn-outline-green text-xs py-1 px-2.5 ml-auto"
                  >
                    Inspect Fit & Apply
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Job Detail & Fit Modal */}
      {selectedJobDetail && (
        <JobDetailModal
          isOpen={!!selectedJobDetail}
          onClose={() => setSelectedJobDetail(null)}
          job={selectedJobDetail}
          currentUser={currentUser}
        />
      )}

    </div>
  );
}
