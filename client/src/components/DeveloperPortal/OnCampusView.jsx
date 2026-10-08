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
import { calculateOnCampusReport } from '../../services/placementEngine';
import confetti from 'canvas-confetti';
import CompanyDetailModal from './CompanyDetailModal';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../core/accordion';

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
  const [analysisReport, setAnalysisReport] = useState(() => calculateOnCampusReport(currentUser, selectedCollegeId));
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
      if (res && res.success && res.report) {
        setAnalysisReport(res.report);
      } else {
        setAnalysisReport(calculateOnCampusReport(currentUser, selectedCollegeId));
      }
    } catch (err) {
      console.error("Analysis error:", err);
      setAnalysisReport(calculateOnCampusReport(currentUser, selectedCollegeId));
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
        particleCount: 30,
        spread: 50,
        origin: { y: 0.8 }
      });
    }
  };

  const selectedCollegeObj = (colleges && colleges.length > 0)
    ? (colleges.find(c => c && c.id === selectedCollegeId) || colleges[0])
    : DEFAULT_COLLEGES[0];

  return (
    <div className="space-y-4 animate-in fade-in">
      
      {/* College Selection Bar & Top Controls */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 flex-shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="flex-grow">
            <label className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block font-medium">
              Active College Placement Cell
            </label>
            <select
              value={selectedCollegeId}
              onChange={(e) => setSelectedCollegeId(e.target.value)}
              className="bg-transparent font-bold text-slate-900 text-base sm:text-lg focus:outline-none cursor-pointer hover:text-blue-600 transition-colors font-heading"
            >
              {(colleges || []).map(col => (
                <option key={col?.id || Math.random()} value={col?.id} className="bg-white text-slate-800 font-sans">
                  {col?.name || col?.id} ({col?.tier || 'General'})
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
            className="btn-secondary text-xs flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5 text-blue-600" />
            Contribute Placement Drive
          </button>
        </div>
      </div>

      {/* AI Bot #1 Placement Readiness Analyzer Banner */}
      {analysisReport && (
        <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* Gauge & Main Verdict */}
            <div className="flex items-center gap-5">
              <div className="relative flex items-center justify-center flex-shrink-0">
                <div className="w-20 h-20 rounded-full bg-slate-50 border-4 border-teal-200 flex items-center justify-center shadow-xs">
                  <div className="text-center">
                    <span className="text-2xl font-bold font-mono text-teal-800 leading-none">
                      {analysisReport.overallReadinessScore}%
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 block mt-0.5">Readiness</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-800 border border-teal-200 text-xs font-semibold px-2.5 py-0.5 rounded mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  Placement Readiness Analyzer
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  On-Campus Recruiter Benchmark Report
                </h3>
                <p className="text-xs text-slate-600 max-w-xl leading-relaxed mt-0.5">
                  {analysisReport.summaryReport}
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 p-3.5 rounded-lg">
              <div className="text-center px-2">
                <p className="text-[10px] font-mono text-slate-500 uppercase">Campus Recruiters</p>
                <p className="text-lg font-bold font-mono text-slate-900">{analysisReport.totalRecruitersAnalyzed}</p>
              </div>
              <div className="h-7 w-px bg-slate-200"></div>
              <div className="text-center px-2">
                <p className="text-[10px] font-mono text-slate-500 uppercase">Matched Skills</p>
                <p className="text-lg font-bold font-mono text-teal-700">{analysisReport.matchedSkills.length}</p>
              </div>
              <div className="h-7 w-px bg-slate-200"></div>
              <div className="text-center px-2">
                <p className="text-[10px] font-mono text-slate-500 uppercase">Gaps to Close</p>
                <p className="text-lg font-bold font-mono text-rose-700">{analysisReport.missingSkills.length}</p>
              </div>
            </div>

          </div>

          {/* Missing Skills Warning Bar */}
          {analysisReport?.topGapsToClose && analysisReport.topGapsToClose.length > 0 && (
            <div className="mt-4 pt-3.5 border-t border-slate-200 flex flex-wrap items-center gap-2">
              <span className="text-xs text-rose-700 font-semibold flex items-center gap-1 font-mono">
                <AlertTriangle className="w-3.5 h-3.5" />
                Critical Priority Gaps to Close:
              </span>
              {analysisReport.topGapsToClose.map((gap, gIdx) => {
                const gName = typeof gap === 'string' ? gap : (gap?.name || `Gap ${gIdx + 1}`);
                const gFreq = typeof gap === 'object' && gap?.marketDemandFrequency ? gap.marketDemandFrequency : 85;
                return (
                  <span key={gIdx} className="badge-missing text-xs">
                    <XCircle className="w-3 h-3 text-rose-600" />
                    {gName} ({gFreq}% campus demand)
                  </span>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Grid: 6-Week Action Plan & Company Fit Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: 6-Week Actionable Roadmap */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-teal-700" />
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Personalized 6-Week Placement Closing Roadmap
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Interactive Checklist
            </span>
          </div>

          <Accordion
            className="flex w-full flex-col gap-3"
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            variants={{
              expanded: { opacity: 1, scale: 1 },
              collapsed: { opacity: 0, scale: 0.98 },
            }}
          >
            {analysisReport?.actionPlan?.map((planBlock, idx) => (
              <AccordionItem key={planBlock.week} value={planBlock.week} className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
                <AccordionTrigger className="w-full p-3.5 flex items-center justify-between border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-0.5 rounded font-mono">
                      {planBlock.week}
                    </span>
                    <h4 className="font-semibold text-slate-900 text-sm">
                      {planBlock.theme}
                    </h4>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Phase 0{idx + 1}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400 transition-transform duration-200 group-data-[expanded]:rotate-90" />
                  </div>
                </AccordionTrigger>

                <AccordionContent className="origin-top bg-white">
                  <div className="p-4 space-y-3.5">
                    {/* Focus Areas */}
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-medium">Focus Areas:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {planBlock.focusAreas.map((area, i) => (
                          <div key={i} className="bg-slate-50 p-2 rounded border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                            <Code2 className="w-3.5 h-3.5 text-teal-700 flex-shrink-0 mt-0.5" />
                            <span>{area}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actionable Deliverables with Checkbox */}
                    <div className="space-y-1.5 pt-1">
                      <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-medium">Actionable Deliverables:</p>
                      <div className="space-y-1.5">
                        {planBlock.deliverables.map((item, dIdx) => {
                          const taskId = `task-${idx}-${dIdx}`;
                          const isDone = completedTasks[taskId];
                          return (
                            <div
                              key={dIdx}
                              onClick={() => toggleTask(taskId)}
                              className={`flex items-start gap-2.5 p-2 rounded border text-xs cursor-pointer transition-colors ${
                                isDone 
                                  ? 'bg-teal-50 border-teal-200 text-teal-900 line-through' 
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              {isDone ? (
                                <CheckSquare className="w-4 h-4 text-teal-700 flex-shrink-0 mt-0.5" />
                              ) : (
                                <Square className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                              )}
                              <span>{item}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Curated Resources */}
                    {planBlock?.suggestedResources && Array.isArray(planBlock.suggestedResources) && (
                      <div className="pt-1 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-mono text-slate-500">Prep Resources:</span>
                        {planBlock.suggestedResources.map((res, rIdx) => {
                          const rName = typeof res === 'string' ? res : (res?.name || `Resource ${rIdx + 1}`);
                          const rUrl = typeof res === 'object' && res?.url ? res.url : 'https://takeuforward.org';
                          return (
                            <a
                              key={rIdx}
                              href={rUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 text-blue-700 px-2.5 py-1 rounded inline-flex items-center gap-1 transition-colors font-medium"
                            >
                              <BookOpen className="w-3 h-3" />
                              {rName}
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Right 1 Col: Target Company Fit Breakdown */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" />
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Company Fit Matrix
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Ranked by Fit
            </span>
          </div>

          <div className="space-y-2.5">
            {analysisReport?.companyFitBreakdown?.map(comp => (
              <div
                key={comp.companyId || Math.random()}
                onClick={() => setSelectedCompanyDetail(comp)}
                className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs hover:border-blue-300 hover:shadow-sm cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <img src={comp.companyLogo} alt={comp.company || 'Company'} className="w-7 h-7 rounded object-cover border border-slate-200" />
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm">{comp.company}</h4>
                        <p className="text-[11px] text-slate-500">{comp.role}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className="text-sm font-bold font-mono text-teal-700">
                        {comp.fitPercentage}%
                      </span>
                      <span className="block text-[10px] text-slate-500">
                        {comp.tierLabel}
                      </span>
                    </div>
                  </div>

                  {/* CTC & Criteria */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-600 bg-slate-50 px-2.5 py-1 rounded border border-slate-200 mb-2">
                    <span>CTC: <strong className="text-slate-900">{comp.ctcBand}</strong></span>
                    <span>Min CGPA: <strong className="text-slate-900">{comp.cgpaCutoff}</strong></span>
                  </div>

                  {/* Missing tags preview */}
                  {comp.missingSkills && comp.missingSkills.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {comp.missingSkills.slice(0, 2).map((ms, msIdx) => {
                        const msName = typeof ms === 'string' ? ms : (ms?.name || '');
                        return (
                          <span key={msIdx} className="badge-missing text-[10px]">
                            -{msName}
                          </span>
                        );
                      })}
                      {comp.missingSkills.length > 2 && (
                        <span className="text-[10px] text-slate-400 self-center">
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
      <div className="space-y-3 pt-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 font-heading">
              <Layers className="w-4 h-4 text-blue-600" />
              {selectedCollegeObj?.name || 'Campus'} · Historical Placement Records
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified campus hiring records and skill frequency demands
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
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
        <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono uppercase text-slate-600">
                  <th className="py-2.5 px-4">Recruiter & Role</th>
                  <th className="py-2.5 px-4">CTC Band</th>
                  <th className="py-2.5 px-4">CGPA Cutoff</th>
                  <th className="py-2.5 px-4">Demanded Skills</th>
                  <th className="py-2.5 px-4">Selection Rounds</th>
                  <th className="py-2.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {records.map(rec => (
                  <tr key={rec.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={rec.companyLogo} alt={rec.company} className="w-8 h-8 rounded object-cover border border-slate-200" />
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">{rec.company}</p>
                          <p className="text-[11px] text-slate-500">{rec.role}</p>
                          <span className="text-[10px] text-teal-700 font-mono">{rec.visitFrequency}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono font-semibold text-teal-800">
                      {rec.ctcBand}
                    </td>

                    <td className="py-3 px-4 font-mono text-slate-700">
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
                          <div key={ri} className="text-[11px] text-slate-600">
                            <span className="text-blue-600 font-medium">R{ri+1}:</span> {typeof r === 'string' ? r : (r?.name || '')}
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
