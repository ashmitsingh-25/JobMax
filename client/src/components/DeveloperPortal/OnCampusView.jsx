import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Layers, 
  TrendingUp, 
  DollarSign, 
  Award, 
  Clock, 
  ChevronRight, 
  BookOpen, 
  ExternalLink,
  Target,
  Upload,
  Plus,
  Code2,
  Calendar,
  CheckSquare,
  Square,
  Info,
  FileText,
  ArrowRight,
  Check,
  RefreshCw
} from 'lucide-react';
import { api } from '../../services/api';
import confetti from 'canvas-confetti';
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from '../core/accordion';
import CompanyDetailModal from './CompanyDetailModal';

const DEFAULT_COLLEGES = [
  { id: "iit-delhi", name: "Indian Institute of Technology (IIT) Delhi", location: "New Delhi", tier: "Tier 1" },
  { id: "bits-pilani", name: "Birla Institute of Technology and Science (BITS) Pilani", location: "Pilani", tier: "Tier 1" },
  { id: "dtu-delhi", name: "Delhi Technological University (DTU)", location: "New Delhi", tier: "Tier 1.5" },
  { id: "vit-vellore", name: "Vellore Institute of Technology (VIT)", location: "Vellore", tier: "Tier 2" },
  { id: "other", name: "All India / Custom College Pool", location: "National", tier: "General" }
];

const TARGET_ROLE_OPTIONS = [
  "Software Development Engineer (SDE-1)",
  "Full Stack / Product Engineer",
  "Backend Systems Engineer",
  "AI / Machine Learning Engineer"
];

const ANALYSIS_STEPS = [
  "Analyzing your resume & technical profile...",
  "Mapping technical skills & academic parameters...",
  "Benchmarking against target role requirements...",
  "Identifying critical priority skill gaps...",
  "Synthesizing personalized 6-week closing roadmap..."
];

export default function OnCampusView({
  currentUser,
  onOpenResumeModal,
  onOpenContributeModal
}) {
  const [colleges, setColleges] = useState(DEFAULT_COLLEGES);
  const [selectedCollegeId, setSelectedCollegeId] = useState(currentUser?.collegeId || 'iit-delhi');
  const [selectedTargetRole, setSelectedTargetRole] = useState(
    currentUser?.targetRole || "Software Development Engineer (SDE-1)"
  );
  const [records, setRecords] = useState([]);
  const [isLoadingRecords, setIsLoadingRecords] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [analysisReport, setAnalysisReport] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStepIndex, setAnalysisStepIndex] = useState(0);
  const [selectedCompanyDetail, setSelectedCompanyDetail] = useState(null);
  
  // Interactive roadmap checkbox state
  const [completedTasks, setCompletedTasks] = useState({});

  // Cycle through loading steps during analysis
  useEffect(() => {
    if (!isAnalyzing) {
      setAnalysisStepIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setAnalysisStepIndex(prev => (prev < ANALYSIS_STEPS.length - 1 ? prev + 1 : prev));
    }, 450);
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  // 1. Fetch colleges
  useEffect(() => {
    let isMounted = true;
    api.getColleges()
      .then(res => {
        if (isMounted && res && res.colleges && Array.isArray(res.colleges) && res.colleges.length > 0) {
          setColleges(res.colleges);
        }
      })
      .catch(err => console.warn("Using fallback colleges:", err));
    return () => { isMounted = false; };
  }, []);

  // 2. Fetch placement records
  useEffect(() => {
    let isMounted = true;
    setIsLoadingRecords(true);
    api.getPlacementRecords({
      collegeId: selectedCollegeId,
      search: searchQuery
    })
      .then(res => {
        if (isMounted && res && res.records) {
          setRecords(res.records);
        }
      })
      .catch(err => console.error("Error loading records:", err))
      .finally(() => {
        if (isMounted) setIsLoadingRecords(false);
      });
    return () => { isMounted = false; };
  }, [selectedCollegeId, searchQuery]);

  // 3. Trigger dynamic Placement Readiness Analyzer
  const runPlacementAnalysis = async (roleOverride = null) => {
    if (!currentUser || !currentUser.skills || currentUser.skills.length === 0) {
      setAnalysisReport(null);
      return;
    }
    const roleToUse = roleOverride || selectedTargetRole;
    setIsAnalyzing(true);
    try {
      const res = await api.analyzeOnCampus(currentUser, selectedCollegeId, roleToUse);
      if (res && res.success) {
        setAnalysisReport(res.report);
      }
    } catch (err) {
      console.error("Placement analysis error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Re-run analysis dynamically when college, target role, or user profile updates
  useEffect(() => {
    runPlacementAnalysis();
  }, [
    selectedCollegeId, 
    selectedTargetRole, 
    currentUser?.skills, 
    currentUser?.cgpa, 
    currentUser?.projects,
    currentUser?.lastResumeParsedAt
  ]);

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setSelectedTargetRole(newRole);
    runPlacementAnalysis(newRole);
  };

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
      
      {/* College Selection & Target Role Control Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full lg:w-auto">
          {/* College Selector */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <label className="text-[11px] font-sans tracking-wide text-slate-500 uppercase tracking-wider block font-semibold">
                Active Placement Cell
              </label>
              <select
                value={selectedCollegeId}
                onChange={(e) => setSelectedCollegeId(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-900 text-sm focus:outline-none focus:border-blue-500 cursor-pointer shadow-xs mt-0.5"
              >
                {(colleges || []).map(col => (
                  <option key={col?.id || Math.random()} value={col?.id} className="bg-white text-slate-800 font-sans">
                    {col?.name || col?.id} ({col?.tier || 'General'})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="hidden sm:block h-8 w-px bg-slate-200"></div>

          {/* Target Role Benchmark Selector */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <label className="text-[11px] font-sans tracking-wide text-slate-500 uppercase tracking-wider block font-semibold">
                Target Role Benchmark
              </label>
              <select
                value={selectedTargetRole}
                onChange={handleRoleChange}
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-900 text-sm focus:outline-none focus:border-blue-500 cursor-pointer shadow-xs mt-0.5"
              >
                {TARGET_ROLE_OPTIONS.map(role => (
                  <option key={role} value={role} className="bg-white text-slate-800 font-sans">
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full lg:w-auto justify-end">
          <button
            onClick={onOpenResumeModal}
            className="btn-primary flex items-center gap-1.5 text-xs py-2 px-3.5"
            title="Upload new resume to re-calibrate readiness score and roadmap"
          >
            <Upload className="w-3.5 h-3.5" />
            Upload / Scan Resume
          </button>

          <button
            onClick={onOpenContributeModal}
            className="btn-secondary text-xs font-sans tracking-wide flex items-center gap-1.5 py-2 px-3"
          >
            <Plus className="w-3.5 h-3.5 text-blue-600" />
            Contribute Drive
          </button>
        </div>
      </div>

      {/* Loading State Banner */}
      {isAnalyzing && (
        <div className="bg-white border border-blue-200 rounded-xl p-8 shadow-sm text-center animate-in fade-in">
          <div className="max-w-md mx-auto space-y-4">
            <div className="relative w-14 h-14 mx-auto">
              <div className="w-14 h-14 rounded-full border-4 border-slate-100 border-t-blue-600 animate-spin"></div>
              <Sparkles className="w-6 h-6 text-blue-600 absolute inset-0 m-auto animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                {ANALYSIS_STEPS[analysisStepIndex]}
              </h3>
              <p className="text-xs text-slate-500">
                Benchmarking against {selectedTargetRole} recruitment standards
              </p>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 h-full transition-all duration-300"
                style={{ width: `${((analysisStepIndex + 1) / ANALYSIS_STEPS.length) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>Step {analysisStepIndex + 1} of {ANALYSIS_STEPS.length}</span>
              <span>Deterministic Rule-Engine</span>
            </div>
          </div>
        </div>
      )}

      {/* Empty Profile Call-To-Action if no skills */}
      {!isAnalyzing && (!currentUser?.skills || currentUser.skills.length === 0) && (
        <div className="bg-white border border-dashed border-slate-300 rounded-xl p-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mx-auto">
            <FileText className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Upload Your Resume to Calibrate Predictions</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We need your technical profile to calculate your actual Job Readiness Score, identify verified strengths, detect critical priority skill gaps, and generate your personalized 6-week roadmap.
            </p>
          </div>
          <button onClick={onOpenResumeModal} className="btn-primary mx-auto text-xs">
            <Upload className="w-3.5 h-3.5" />
            Upload & Parse Resume Now
          </button>
        </div>
      )}

      {/* Dynamic Job Readiness Score Analyzer Banner */}
      {!isAnalyzing && analysisReport && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* Visual Circular Gauge & Main Title */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              
              {/* Circular Progress Gauge */}
              <div className="relative flex items-center justify-center flex-shrink-0">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="text-slate-100 stroke-current"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="text-blue-600 stroke-current transition-all duration-1000 ease-out"
                    strokeWidth="8"
                    strokeDasharray="251.32"
                    strokeDashoffset={251.32 - (251.32 * Math.min(100, Math.max(0, analysisReport.overallReadinessScore))) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-extrabold font-sans text-blue-600 leading-none">
                    {analysisReport.overallReadinessScore}%
                  </span>
                  <span className="text-[9px] font-sans text-slate-500 uppercase tracking-wider mt-1 font-semibold">
                    Readiness
                  </span>
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-sans tracking-wide px-2.5 py-0.5 rounded-full mb-1.5 font-semibold">
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  Job Readiness Analyzer · {analysisReport.targetRole || selectedTargetRole}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1 flex flex-wrap items-center gap-2">
                  <span>Job Readiness Score: {analysisReport.overallReadinessScore}%</span>
                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {analysisReport.readinessTier}
                  </span>
                </h3>
                <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
                  {analysisReport.summaryReport}
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 p-3.5 rounded-xl w-full lg:w-auto justify-around lg:justify-start">
              <div className="text-center px-2">
                <p className="text-[10px] font-sans tracking-wide text-slate-500 uppercase font-semibold">Campus Recruiters</p>
                <p className="text-xl font-bold font-sans tracking-wide text-slate-900">{analysisReport.totalRecruitersAnalyzed || records.length || 5}</p>
              </div>
              <div className="h-8 w-px bg-slate-200"></div>
              <div className="text-center px-2">
                <p className="text-[10px] font-sans tracking-wide text-slate-500 uppercase font-semibold">Matched Skills</p>
                <p className="text-xl font-bold font-sans tracking-wide text-blue-600">{analysisReport.matchedSkills?.length || 0}</p>
              </div>
              <div className="h-8 w-px bg-slate-200"></div>
              <div className="text-center px-2">
                <p className="text-[10px] font-sans tracking-wide text-slate-500 uppercase font-semibold">Gaps to Close</p>
                <p className="text-xl font-bold font-sans tracking-wide text-amber-600">{analysisReport.missingSkills?.length || 0}</p>
              </div>
            </div>

          </div>

          {/* Explainability Panel: Why You Received This Score */}
          {analysisReport.explainabilityFactors && analysisReport.explainabilityFactors.length > 0 && (
            <div className="mt-5 pt-4 border-t border-slate-200 space-y-2">
              <p className="text-[11px] font-sans text-slate-600 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                <Info className="w-3.5 h-3.5 text-blue-600" />
                Score Explainability Breakdown (Derived from Your Profile):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {analysisReport.explainabilityFactors.map((factor, fIdx) => (
                  <div
                    key={fIdx}
                    className={`p-2.5 rounded-lg border text-xs flex items-start gap-2 ${
                      factor.type === 'strength'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : factor.type === 'gap'
                        ? 'bg-amber-50 border-amber-200 text-amber-900'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    {factor.type === 'strength' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    ) : factor.type === 'gap' ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Info className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                    )}
                    <span className="leading-snug">{factor.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skill Gap Breakdown: Strengths vs Critical Gaps vs Secondary Gaps */}
          <div className="mt-4 pt-4 border-t border-slate-200 space-y-3">
            
            {/* Verified Strengths */}
            {analysisReport.matchedSkills && analysisReport.matchedSkills.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-sans text-blue-700 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  Verified Strengths:
                </span>
                {analysisReport.matchedSkills.map((sk, sIdx) => {
                  const skName = typeof sk === 'string' ? sk : (sk?.name || '');
                  return (
                    <span key={sIdx} className="badge-matched text-xs">
                      ✓ {skName}
                    </span>
                  );
                })}
              </div>
            )}

            {/* Critical Priority Gaps */}
            {analysisReport.criticalPriorityGaps && analysisReport.criticalPriorityGaps.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-sans text-amber-800 flex items-center gap-1 font-semibold">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Critical Priority Gaps to Close:
                </span>
                {analysisReport.criticalPriorityGaps.map((gap, gIdx) => {
                  const gapName = typeof gap === 'string' ? gap : (gap?.name || '');
                  return (
                    <span key={gIdx} className="badge-warning text-xs" title={gap?.whyCritical || ''}>
                      <XCircle className="w-3 h-3 text-amber-700" />
                      {gapName}
                    </span>
                  );
                })}
              </div>
            )}

            {/* Secondary Gaps */}
            {analysisReport.secondaryGaps && analysisReport.secondaryGaps.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-sans text-slate-600 flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Secondary Role Competencies:
                </span>
                {analysisReport.secondaryGaps.map((gap, gIdx) => {
                  const gapName = typeof gap === 'string' ? gap : (gap?.name || '');
                  return (
                    <span key={gIdx} className="badge-code text-xs">
                      {gapName}
                    </span>
                  );
                })}
              </div>
            )}

          </div>

        </div>
      )}

      {/* Grid: 6-Week Action Plan & Company Fit Matrix */}
      {!isAnalyzing && analysisReport && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Cols: Personalized 6-Week Actionable Roadmap */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Personalized 6-Week Placement Closing Roadmap
                  </h3>
                  <p className="text-xs text-slate-500 font-sans tracking-wide">
                    Sequenced based on your detected gaps in {analysisReport.targetRole || selectedTargetRole}
                  </p>
                </div>
              </div>
              <span className="text-xs font-sans tracking-wide text-slate-600 bg-white px-2.5 py-1 rounded border border-slate-200 shadow-xs">
                Interactive Checklist
              </span>
            </div>

            {/* Visual Timeline Connector Header */}
            {analysisReport.actionPlan && analysisReport.actionPlan.length > 0 && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="grid grid-cols-3 gap-2 relative">
                  {/* Visual connecting line */}
                  <div className="hidden sm:block absolute top-4 left-[15%] right-[15%] h-0.5 bg-blue-200 z-0" />
                  
                  {analysisReport.actionPlan.map((plan, idx) => (
                    <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                      <div className="w-8 h-8 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center text-blue-600 font-mono text-xs font-bold mb-1 shadow-xs">
                        0{idx + 1}
                      </div>
                      <span className="text-[11px] font-bold text-slate-900 font-sans">{plan.week}</span>
                      <span className="text-[10px] text-slate-500 truncate max-w-[120px] sm:max-w-none">
                        {plan.targetSkill || plan.theme}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Accordion Sprints - Zero overlap, crystal clear typography */}
            <Accordion
              className="flex w-full flex-col gap-3"
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              variants={{
                expanded: { opacity: 1, scale: 1 },
                collapsed: { opacity: 0, scale: 0.98 },
              }}
            >
              {analysisReport.actionPlan?.map((planBlock, idx) => (
                <AccordionItem key={planBlock.week} value={planBlock.week} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                  <AccordionTrigger className="w-full p-4 flex items-center justify-between border-b border-slate-100 bg-white hover:bg-slate-50/80 transition-colors group text-left">
                    <div className="flex items-center gap-3 flex-1 min-w-0 pr-4">
                      <span className="font-sans tracking-wide text-xs font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded border border-blue-200 flex-shrink-0">
                        {planBlock.week}
                      </span>
                      <div className="text-left flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-900 text-sm leading-snug">
                          {planBlock.theme}
                        </h4>
                        {planBlock.targetSkill && (
                          <span className="text-[11px] text-blue-600 font-medium block mt-0.5">
                            Target Competency: {planBlock.targetSkill}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-[11px] font-sans tracking-wide text-slate-500 flex items-center gap-1 hidden sm:flex">
                        <Clock className="w-3 h-3 text-slate-400" />
                        Sprint Phase 0{idx + 1}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 transition-transform duration-200 group-data-[expanded]:rotate-90" />
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="origin-top bg-white border-t border-slate-100">
                    <div className="p-4 space-y-4">
                      
                      {/* Why it Matters */}
                      {planBlock.whyItMatters && (
                        <div className="bg-blue-50/70 p-3.5 rounded-lg border border-blue-100 text-xs">
                          <p className="text-[10px] font-sans text-blue-700 uppercase tracking-wider font-semibold mb-1">
                            Why This Matters for {selectedTargetRole}:
                          </p>
                          <p className="text-slate-700 leading-relaxed">{planBlock.whyItMatters}</p>
                        </div>
                      )}

                      {/* Focus Areas */}
                      <div className="space-y-1.5">
                        <p className="text-[11px] font-sans tracking-wide text-slate-500 uppercase tracking-wider font-semibold">What to Focus On:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {(planBlock.whatToFocusOn || planBlock.focusAreas || []).map((area, i) => (
                            <div key={i} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs text-slate-700 font-sans tracking-wide flex items-start gap-2">
                              <Code2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                              <span>{typeof area === 'string' ? area : (area?.name || area?.title || '')}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Expected Outcome */}
                      {planBlock.expectedOutcome && (
                        <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-xs">
                          <p className="text-[10px] font-sans text-emerald-800 uppercase tracking-wider font-semibold mb-1">
                            Expected Outcome:
                          </p>
                          <p className="text-emerald-900 leading-relaxed">{planBlock.expectedOutcome}</p>
                        </div>
                      )}

                      {/* Actionable Deliverables with Checkbox */}
                      <div className="space-y-2 pt-1">
                        <p className="text-[11px] font-sans tracking-wide text-slate-500 uppercase tracking-wider font-semibold">Actionable Deliverables:</p>
                        <div className="space-y-1.5">
                          {(planBlock.deliverables || []).map((item, dIdx) => {
                            const taskId = `task-${idx}-${dIdx}`;
                            const isDone = completedTasks[taskId];
                            const itemText = typeof item === 'string' ? item : (item?.name || item?.title || '');
                            return (
                              <div
                                key={dIdx}
                                onClick={() => toggleTask(taskId)}
                                className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                                  isDone 
                                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800 line-through' 
                                    : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                                }`}
                              >
                                {isDone ? (
                                  <CheckSquare className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                ) : (
                                  <Square className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                                )}
                                <span className="font-sans">{itemText}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Curated Resources */}
                      {planBlock?.suggestedResources && Array.isArray(planBlock.suggestedResources) && (
                        <div className="pt-2 flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-sans tracking-wide text-slate-500">Curated Prep Sheets:</span>
                          {planBlock.suggestedResources.map((res, rIdx) => {
                            const rName = typeof res === 'string' ? res : (res?.name || `Resource ${rIdx + 1}`);
                            const rUrl = typeof res === 'object' && res?.url ? res.url : 'https://takeuforward.org';
                            return (
                              <a
                                key={rIdx}
                                href={rUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs font-sans tracking-wide bg-slate-50 hover:bg-slate-100 border border-slate-200 text-blue-600 hover:text-blue-700 px-2.5 py-1 rounded inline-flex items-center gap-1 transition-colors font-medium"
                              >
                                <BookOpen className="w-3 h-3 text-blue-600" />
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

          {/* Right 1 Col: Dynamic Company Fit Matrix */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  Company Fit Matrix
                </h3>
              </div>
              <span className="text-xs font-sans tracking-wide text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-xs">
                Ranked by Fit
              </span>
            </div>

            <div className="space-y-3">
              {analysisReport?.companyFitBreakdown?.map(comp => (
                <div
                  key={comp.companyId || Math.random()}
                  onClick={() => setSelectedCompanyDetail(comp)}
                  className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-xs hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <img src={comp.companyLogo} alt={comp.company || 'Company'} className="w-8 h-8 rounded-md object-cover border border-slate-200" />
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{comp.company}</h4>
                          <p className="text-[11px] text-slate-500 font-sans tracking-wide">{comp.role}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <span className="text-sm font-bold font-sans tracking-wide text-blue-600">
                          {comp.fitPercentage}%
                        </span>
                        <span className="block text-[10px] font-sans tracking-wide font-medium text-slate-500">
                          {comp.tierLabel}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-2.5">
                      <div 
                        className="bg-blue-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${comp.fitPercentage}%` }}
                      />
                    </div>

                    {/* CTC & Criteria from real records */}
                    <div className="flex items-center justify-between text-[11px] font-sans tracking-wide text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded border border-slate-200 mb-2.5">
                      <span>CTC: <strong className="text-slate-900">{comp.ctcBand}</strong></span>
                      <span>Min CGPA: <strong className="text-slate-900">{comp.cgpaCutoff}</strong></span>
                    </div>

                    {/* Matched & Missing tags preview */}
                    <div className="space-y-1">
                      {comp.matchedSkills && comp.matchedSkills.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {comp.matchedSkills.slice(0, 2).map((ms, msIdx) => {
                            const msName = typeof ms === 'string' ? ms : (ms?.name || '');
                            return (
                              <span key={msIdx} className="badge-matched text-[9px]">
                                ✓ {msName}
                              </span>
                            );
                          })}
                        </div>
                      )}

                      {comp.missingSkills && comp.missingSkills.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {comp.missingSkills.slice(0, 2).map((ms, msIdx) => {
                            const msName = typeof ms === 'string' ? ms : (ms?.name || '');
                            return (
                              <span key={msIdx} className="badge-warning text-[9px]">
                                - {msName}
                              </span>
                            );
                          })}
                          {comp.missingSkills.length > 2 && (
                            <span className="text-[9px] text-slate-500 font-sans tracking-wide self-center">
                              +{comp.missingSkills.length - 2} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Recruiter Placement History Leaderboard Table */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              {selectedCollegeObj?.name || 'Campus'} · Historical Placement Records
            </h3>
            <p className="text-xs text-slate-500 font-sans tracking-wide mt-0.5">
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
        <div className="card-hr p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-sans tracking-wide uppercase text-slate-500 font-semibold">
                  <th className="py-3 px-4">Recruiter & Role</th>
                  <th className="py-3 px-4">CTC Band</th>
                  <th className="py-3 px-4">CGPA Cutoff</th>
                  <th className="py-3 px-4">Frequently Demanded Skills</th>
                  <th className="py-3 px-4">Selection Rounds</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {records.map(rec => (
                  <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={rec.companyLogo} alt={rec.company} className="w-8 h-8 rounded-lg object-cover border border-slate-200" />
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{rec.company}</p>
                          <p className="text-[11px] text-slate-500 font-sans tracking-wide">{rec.role}</p>
                          <span className="text-[10px] text-blue-600 font-sans tracking-wide font-medium">{rec.visitFrequency}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-sans tracking-wide font-semibold text-blue-700">
                      {rec.ctcBand}
                    </td>

                    <td className="py-3 px-4 font-sans tracking-wide text-slate-600">
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
                          <div key={ri} className="text-[11px] text-slate-600 font-sans tracking-wide">
                            <span className="text-blue-600 font-semibold">R{ri+1}:</span> {typeof r === 'string' ? r : (r?.name || '')}
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedCompanyDetail(rec)}
                        className="btn-outline-blue text-[11px] py-1 px-2.5 ml-auto"
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
