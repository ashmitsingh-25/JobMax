import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Upload, 
  Plus, 
  Search, 
  Filter, 
  BookOpen, 
  ExternalLink, 
  Clock, 
  Award, 
  Target, 
  TrendingUp, 
  Layers, 
  ChevronRight,
  Code2,
  Calendar,
  CheckSquare,
  Square
} from 'lucide-react';
import { api } from '../../services/api';
import confetti from 'canvas-confetti';
import CompanyDetailModal from './CompanyDetailModal';

const DEFAULT_COLLEGES = [
  { id: "iit-delhi", name: "Indian Institute of Technology (IIT) Delhi", location: "New Delhi", tier: "Tier 1" },
  { id: "bits-pilani", name: "BITS Pilani (Main Campus)", location: "Pilani, Rajasthan", tier: "Tier 1" },
  { id: "nit-trichy", name: "National Institute of Technology (NIT) Trichy", location: "Tiruchirappalli, Tamil Nadu", tier: "Tier 1" },
  { id: "dtu", name: "Delhi Technological University (DTU)", location: "New Delhi", tier: "Tier 1.5" },
  { id: "vit-vellore", name: "Vellore Institute of Technology (VIT)", location: "Vellore, Tamil Nadu", tier: "Tier 2" },
  { id: "iiit-hyderabad", name: "International Institute of Information Technology (IIIT-H)", location: "Hyderabad", tier: "Tier 1" },
  { id: "rvce-bangalore", name: "RV College of Engineering (RVCE)", location: "Bengaluru, Karnataka", tier: "Tier 2" },
  { id: "other", name: "All India / Custom College Pool", location: "National", tier: "General" }
];

export default function OnCampusView({
  currentUser,
  onOpenResumeModal,
  onOpenContributeModal
}) {
  const [colleges, setColleges] = useState(DEFAULT_COLLEGES);
  const [selectedCollegeId, setSelectedCollegeId] = useState(currentUser?.collegeId || 'iit-delhi');
  const [records, setRecords] = useState([]);
  const [isLoadingRecords, setIsLoadingRecords] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [analysisReport, setAnalysisReport] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedCompanyDetail, setSelectedCompanyDetail] = useState(null);
  
  // Interactive roadmap checkbox state
  const [completedTasks, setCompletedTasks] = useState({});

  // 1. Fetch colleges
  useEffect(() => {
    let isMounted = true;
    api.getColleges()
      .then(res => {
        if (isMounted && res && res.colleges && Array.isArray(res.colleges) && res.colleges.length > 0) {
          setColleges(res.colleges);
        }
      })
      .catch(err => console.warn("Failed fetching colleges, using defaults:", err));
    return () => { isMounted = false; };
  }, []);

  // 2. Fetch placement records whenever college or search changes
  useEffect(() => {
    let isMounted = true;
    setIsLoadingRecords(true);
    api.getPlacementRecords(selectedCollegeId, searchQuery)
      .then(res => {
        if (isMounted && res && res.records) {
          setRecords(res.records);
        }
      })
      .catch(err => console.warn("Failed fetching placement records:", err))
      .finally(() => {
        if (isMounted) setIsLoadingRecords(false);
      });
    return () => { isMounted = false; };
  }, [selectedCollegeId, searchQuery]);

  // 3. Trigger AI Placement Readiness Analyzer
  const runPlacementAnalysis = async () => {
    if (!currentUser || !currentUser.skills) return;
    setIsAnalyzing(true);
    try {
      const res = await api.analyzeOnCampus(currentUser, selectedCollegeId);
      if (res && res.success) {
        setAnalysisReport(res.report);
      }
    } catch (err) {
      console.error("Analysis error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Run analysis initially when profile / college changes
  useEffect(() => {
    runPlacementAnalysis();
  }, [selectedCollegeId, currentUser?.skills]);

  const toggleTask = (taskId) => {
    const updated = { ...completedTasks, [taskId]: !completedTasks[taskId] };
    setCompletedTasks(updated);
    if (updated[taskId]) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  };

  const selectedCollegeObj = (colleges && colleges.length > 0)
    ? (colleges.find(c => c && c.id === selectedCollegeId) || colleges[0])
    : DEFAULT_COLLEGES[0];


  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* College Selection Bar & Top Controls */}
      <div className="bg-dark-800 border border-dark-700 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-card-dark">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 rounded-lg bg-dark-700 border border-brand-green/30 flex items-center justify-center text-brand-green flex-shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="flex-grow">
            <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
              Active College Placement Cell
            </label>
            <select
              value={selectedCollegeId}
              onChange={(e) => setSelectedCollegeId(e.target.value)}
              className="bg-transparent font-bold text-white text-base sm:text-lg focus:outline-none cursor-pointer hover:text-brand-green transition-colors"
            >
              {colleges.map(col => (
                <option key={col.id} value={col.id} className="bg-dark-850 text-slate-100 font-sans">
                  {col.name} ({col.tier})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          <button
            onClick={onOpenResumeModal}
            className="btn-outline-green flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            Upload / Scan Resume
          </button>

          <button
            onClick={onOpenContributeModal}
            className="btn-secondary text-xs font-mono flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5 text-brand-cyan" />
            Contribute Placement Drive
          </button>
        </div>
      </div>

      {/* AI Bot #1 Placement Readiness Analyzer Banner */}
      {analysisReport && (
        <div className="bg-gradient-to-r from-dark-800 via-dark-850 to-dark-800 border-2 border-brand-green/40 rounded-2xl p-6 shadow-glow-green relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            
            {/* Gauge & Main Verdict */}
            <div className="flex items-center gap-6">
              <div className="relative flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-dark-900 border-4 border-dark-700 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-3xl font-extrabold font-mono text-brand-green leading-none">
                      {analysisReport.overallReadinessScore}%
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 block mt-1">Readiness</span>
                  </div>
                </div>
                {/* Visual pulse glow */}
                <div className="absolute inset-0 rounded-full border-2 border-brand-green animate-ping opacity-20"></div>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 bg-brand-green/10 text-brand-green border border-brand-green/30 text-[11px] font-mono px-2 py-0.5 rounded-full mb-1.5">
                  <Sparkles className="w-3 h-3" />
                  AI Bot #1 · Placement Readiness Analyzer
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  On-Campus Recruiter Benchmark Report
                </h3>
                <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                  {analysisReport.summaryReport}
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 bg-dark-900/80 border border-dark-700 p-3.5 rounded-xl">
              <div className="text-center px-2">
                <p className="text-[10px] font-mono text-slate-400 uppercase">Campus Recruiters</p>
                <p className="text-xl font-bold font-mono text-white">{analysisReport.totalRecruitersAnalyzed}</p>
              </div>
              <div className="h-8 w-px bg-dark-700"></div>
              <div className="text-center px-2">
                <p className="text-[10px] font-mono text-slate-400 uppercase">Matched Skills</p>
                <p className="text-xl font-bold font-mono text-brand-green">{analysisReport.matchedSkills.length}</p>
              </div>
              <div className="h-8 w-px bg-dark-700"></div>
              <div className="text-center px-2">
                <p className="text-[10px] font-mono text-slate-400 uppercase">Gaps to Close</p>
                <p className="text-xl font-bold font-mono text-rose-400">{analysisReport.missingSkills.length}</p>
              </div>
            </div>

          </div>

          {/* Missing Skills Warning Bar */}
          {analysisReport.topGapsToClose.length > 0 && (
            <div className="mt-5 pt-4 border-t border-dark-700/80 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-rose-400 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                Critical Priority Gaps to Close:
              </span>
              {analysisReport.topGapsToClose.map(gap => (
                <span key={gap.name} className="badge-missing text-xs">
                  <XCircle className="w-3 h-3" />
                  {gap.name} ({gap.marketDemandFrequency}% campus demand)
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Grid: 6-Week Action Plan & Company Fit Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: 6-Week Actionable Roadmap */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-brand-green" />
              <h3 className="text-lg font-bold text-white">
                Personalized 6-Week Placement Closing Roadmap
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Interactive Checklist
            </span>
          </div>

          {analysisReport?.actionPlan?.map((planBlock, idx) => (
            <div key={planBlock.week} className="card-hr space-y-4">
              <div className="flex items-center justify-between border-b border-dark-700 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold bg-dark-700 text-brand-green px-2.5 py-1 rounded border border-brand-green/30">
                    {planBlock.week}
                  </span>
                  <h4 className="font-semibold text-white text-sm">
                    {planBlock.theme}
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Sprint Phase 0{idx + 1}
                </span>
              </div>

              {/* Focus Areas */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Focus Areas:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {planBlock.focusAreas.map((area, i) => (
                    <div key={i} className="bg-dark-850 p-2.5 rounded-lg border border-dark-700/80 text-xs text-slate-300 font-mono flex items-start gap-2">
                      <Code2 className="w-3.5 h-3.5 text-brand-green flex-shrink-0 mt-0.5" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actionable Deliverables with Checkbox */}
              <div className="space-y-2 pt-1">
                <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Actionable Deliverables:</p>
                <div className="space-y-1.5">
                  {planBlock.deliverables.map((item, dIdx) => {
                    const taskId = `task-${idx}-${dIdx}`;
                    const isDone = completedTasks[taskId];
                    return (
                      <div
                        key={dIdx}
                        onClick={() => toggleTask(taskId)}
                        className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                          isDone 
                            ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300 line-through' 
                            : 'bg-dark-850 border-dark-700 text-slate-200 hover:border-dark-600'
                        }`}
                      >
                        {isDone ? (
                          <CheckSquare className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                        )}
                        <span className="font-sans">{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Curated Resources */}
              {planBlock.suggestedResources && (
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400">Curated Prep Sheets:</span>
                  {planBlock.suggestedResources.map(res => (
                    <a
                      key={res.name}
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono bg-dark-750 hover:bg-dark-700 border border-dark-600 text-brand-cyan hover:text-white px-2.5 py-1 rounded inline-flex items-center gap-1 transition-colors"
                    >
                      <BookOpen className="w-3 h-3" />
                      {res.name}
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right 1 Col: Target Company Fit Breakdown */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-brand-cyan" />
              <h3 className="text-lg font-bold text-white">
                Company Fit Matrix
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Ranked by Fit
            </span>
          </div>

          <div className="space-y-3">
            {analysisReport?.companyFitBreakdown?.map(comp => (
              <div
                key={comp.companyId}
                onClick={() => setSelectedCompanyDetail(comp)}
                className="card-hr-interactive p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <img src={comp.companyLogo} alt={comp.company} className="w-7 h-7 rounded-md object-cover border border-dark-600" />
                      <div>
                        <h4 className="font-bold text-white text-sm">{comp.company}</h4>
                        <p className="text-[11px] text-slate-400 font-mono">{comp.role}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className="text-sm font-bold font-mono text-brand-green">
                        {comp.fitPercentage}%
                      </span>
                      <span className={`block text-[10px] font-mono ${comp.tierColor}`}>
                        {comp.tierLabel}
                      </span>
                    </div>
                  </div>

                  {/* CTC & Criteria */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 bg-dark-850 px-2.5 py-1.5 rounded border border-dark-700/80 mb-2.5">
                    <span>CTC: <strong className="text-slate-200">{comp.ctcBand}</strong></span>
                    <span>Min CGPA: <strong className="text-slate-200">{comp.cgpaCutoff}</strong></span>
                  </div>

                  {/* Missing tags preview */}
                  {comp.missingSkills && comp.missingSkills.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {comp.missingSkills.slice(0, 2).map(ms => (
                        <span key={ms.name} className="badge-missing text-[10px]">
                          -{ms.name}
                        </span>
                      ))}
                      {comp.missingSkills.length > 2 && (
                        <span className="text-[10px] text-slate-500 font-mono self-center">
                          +{comp.missingSkills.length - 2} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recruiter Placement History Leaderboard Table */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-brand-green" />
              {selectedCollegeObj?.name || 'Campus'} · Historical Placement Records
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Verified campus hiring records and skill frequency demands
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search recruiter, role, skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-hr w-full pl-9 py-1.5 text-xs"
            />
          </div>
        </div>

        {/* Table */}
        <div className="card-hr p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-dark-850 border-b border-dark-700 text-[11px] font-mono uppercase text-slate-400">
                  <th className="py-3 px-4">Recruiter & Role</th>
                  <th className="py-3 px-4">CTC Band</th>
                  <th className="py-3 px-4">CGPA Cutoff</th>
                  <th className="py-3 px-4">Frequently Demanded Skills</th>
                  <th className="py-3 px-4">Selection Rounds</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-700/60 text-xs">
                {records.map(rec => (
                  <tr key={rec.id} className="hover:bg-dark-750/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={rec.companyLogo} alt={rec.company} className="w-8 h-8 rounded-lg object-cover border border-dark-600" />
                        <div>
                          <p className="font-bold text-white text-sm">{rec.company}</p>
                          <p className="text-[11px] text-slate-400 font-mono">{rec.role}</p>
                          <span className="text-[10px] text-brand-green/80 font-mono">{rec.visitFrequency}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono font-semibold text-brand-green">
                      {rec.ctcBand}
                    </td>

                    <td className="py-3 px-4 font-mono text-slate-300">
                      {rec.cgpaCutoff} CGPA
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1.5 max-w-sm">
                        {(rec.demandedSkills || []).map(sk => {
                          const skName = typeof sk === 'string' ? sk : (sk?.name || '');
                          const isStudentHave = currentUser?.skills?.some(s => 
                            s.toLowerCase() === skName.toLowerCase()
                          );
                          return (
                            <span 
                              key={skName} 
                              className={isStudentHave ? "badge-matched text-[10px]" : "badge-code text-[10px]"}
                              title={`Demanded in ${sk.frequency || 80}% of interviews`}
                            >
                              {skName}
                              <span className="text-[9px] opacity-70">({sk.frequency || 80}%)</span>
                            </span>
                          );
                        })}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        {(rec.rounds || []).slice(0, 2).map((r, ri) => (
                          <div key={ri} className="text-[11px] text-slate-300 font-mono">
                            <span className="text-brand-green">R{ri+1}:</span> {typeof r === 'string' ? r : (r?.name || '')}
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedCompanyDetail(rec)}
                        className="btn-outline-green text-[11px] py-1 px-2.5 ml-auto"
                      >
                        Inspect Gap
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Company Detail & Strategy Modal */}
      {selectedCompanyDetail && (
        <CompanyDetailModal
          isOpen={!!selectedCompanyDetail}
          onClose={() => setSelectedCompanyDetail(null)}
          companyRecord={selectedCompanyDetail}
          currentUser={currentUser}
        />
      )}

    </div>
  );
}
