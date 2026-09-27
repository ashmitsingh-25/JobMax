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
    if (currentUser && currentUser.skills) {
      api.analyzeOffCampus(currentUser).then(res => {
        if (res && res.success) {
          setAnalysisReport(res.report);
        }
      });
    }
  }, [currentUser?.skills]);

  const filteredJobs = jobs.filter(j => 
    selectedDomain === 'all' || (j?.domain && j.domain.toLowerCase().includes(selectedDomain.toLowerCase()))
  );


  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-dark-800 border border-dark-700 p-5 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-dark-700 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Off-Campus Market Intelligence Hub</h2>
            <p className="text-xs text-slate-400 font-mono">
              Live aggregation across tech unicorns, tier-1 companies & startups
            </p>
          </div>
        </div>

        <button onClick={onOpenResumeModal} className="btn-primary text-xs">
          <Sparkles className="w-3.5 h-3.5" />
          Scan Resume vs Open Market
        </button>
      </div>

      {/* AI Bot Off-Campus Gap Report */}
      {analysisReport && (
        <div className="bg-gradient-to-r from-dark-800 via-dark-850 to-dark-800 border-2 border-brand-cyan/40 rounded-2xl p-6 shadow-glow-blue relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            <div className="flex items-center gap-6">
              <div className="relative flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-dark-900 border-4 border-dark-700 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-3xl font-extrabold font-mono text-brand-cyan leading-none">
                      {analysisReport.overallReadinessScore}%
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 block mt-1">Market Fit</span>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-brand-cyan animate-ping opacity-20"></div>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30 text-[11px] font-mono px-2 py-0.5 rounded-full mb-1.5">
                  <Sparkles className="w-3 h-3" />
                  AI Bot #1 · Market Demand Analyzer
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  Open Market Tech Compatibility Verdict
                </h3>
                <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                  {analysisReport.summaryReport}
                </p>
              </div>
            </div>

            {/* Top Market Gaps */}
            <div className="bg-dark-900/80 border border-dark-700 p-4 rounded-xl max-w-md w-full">
              <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-brand-amber" />
                Highest ROI Skills in 2026 Tech Market:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {(analysisReport?.topGapsToClose || analysisReport?.criticalMarketGaps || []).map((gap, gIdx) => {
                  const gName = typeof gap === 'string' ? gap : (gap?.name || `Gap ${gIdx + 1}`);
                  const gFreq = typeof gap === 'object' && gap?.marketDemandFrequency ? gap.marketDemandFrequency : 80;
                  return (
                    <span key={gIdx} className="badge-missing text-[11px]">
                      <XCircle className="w-3 h-3" />
                      {gName} ({gFreq}% demand)
                    </span>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Suggested Companies to Target First (Ranked by Best Current Fit) */}
      {analysisReport?.companyFitBreakdown && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-brand-green" />
              <h3 className="text-lg font-bold text-white">
                Companies to Target First (Ranked by Highest Immediate Fit)
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Apply with highest conversion probability
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {analysisReport.companyFitBreakdown.slice(0, 4).map((comp, idx) => (
              <div key={comp.companyId} className="card-hr-interactive p-4 relative flex flex-col justify-between">
                <div className="absolute top-3 right-3 bg-brand-green/10 text-brand-green font-mono text-[10px] px-2 py-0.5 rounded-full border border-brand-green/30">
                  #{idx + 1} Best Fit
                </div>

                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <img src={comp.companyLogo} alt={comp.company} className="w-9 h-9 rounded-lg object-cover border border-dark-600" />
                    <div>
                      <h4 className="font-bold text-white text-sm">{comp.company}</h4>
                      <p className="text-[11px] text-slate-400 font-mono truncate max-w-[140px]">{comp.role}</p>
                    </div>
                  </div>

                  <div className="bg-dark-850 p-2 rounded-lg border border-dark-700 text-[11px] font-mono text-slate-300 mb-3 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Fit Score:</span>
                      <strong className="text-brand-green">{comp.fitPercentage}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">CTC:</span>
                      <strong className="text-white">{comp.ctcBand}</strong>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] font-mono text-slate-500 uppercase">Matched Core:</p>
                    <div className="flex flex-wrap gap-1">
                      {comp.matchedSkills.slice(0, 2).map(ms => (
                        <span key={ms} className="badge-matched text-[10px]">
                          ✓ {ms}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-dark-700">
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Aggregated Market Tech Demand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand-purple" />
            <h3 className="text-lg font-bold text-white">
              Aggregate Skill Demand Curve
            </h3>
          </div>

          <div className="card-hr space-y-3">
            <p className="text-xs text-slate-400 font-mono">
              Frequency of technical skill requirements across all analyzed off-campus listings
            </p>

            <div className="space-y-3 pt-2">
              {(marketDemand || []).slice(0, 8).map((item, idx) => {
                const itemName = typeof item === 'string' ? item : (item?.name || `Skill ${idx + 1}`);
                const itemFreq = typeof item === 'object' ? (item?.demandFrequency || item?.frequency || 75) : 75;
                const isStudentHave = currentUser?.skills?.some(s => 
                  s && s.toLowerCase() === itemName.toLowerCase()
                );
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className={isStudentHave ? "text-brand-green font-semibold flex items-center gap-1" : "text-slate-300"}>
                        {isStudentHave && "✓ "}
                        {itemName}
                      </span>
                      <span className="text-slate-400">{itemFreq}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-dark-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${isStudentHave ? 'bg-brand-green' : 'bg-brand-purple'}`}
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
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-brand-cyan" />
              <h3 className="text-lg font-bold text-white">
                Active Off-Campus Job Openings ({filteredJobs.length})
              </h3>
            </div>

            <div className="relative w-full sm:w-56">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Filter by title, skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-hr w-full pl-9 py-1.5 text-xs"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredJobs.map(job => (
              <div key={job.id} className="card-hr hover:border-dark-600 transition-all p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={job.companyLogo} alt={job.company} className="w-10 h-10 rounded-lg object-cover border border-dark-600" />
                    <div>
                      <h4 className="font-bold text-white text-base">{job.role}</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                        <span className="text-brand-cyan font-semibold">{job.company}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                        <span>•</span>
                        <span className="text-slate-500">{job.postedDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex sm:flex-col items-center sm:items-end justify-between">
                    <span className="font-mono text-sm font-bold text-brand-green">{job.ctcBand}</span>
                    <span className="text-[10px] font-mono text-slate-400 bg-dark-750 px-2 py-0.5 rounded border border-dark-700">
                      {job.experienceRequired}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-dark-700/80">
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
                    className="btn-outline-green text-xs py-1 px-3"
                  >
                    Quick Apply / Inspect Fit
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
