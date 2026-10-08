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
  Square,
  Info,
  FileText,
  ArrowRight,
  Check,
  RefreshCw
} from 'lucide-react';
import { api } from '../../services/api';
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
      <div className="bg-dark-800 border border-dark-700 rounded-xl p-4 sm:p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-card-dark">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full lg:w-auto">
          {/* College Selector */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-dark-700 border border-brand-green/30 flex items-center justify-center text-brand-green flex-shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <label className="text-[11px] font-sans tracking-wide text-slate-400 uppercase tracking-wider block">
                Active Placement Cell
              </label>
              <select
                value={selectedCollegeId}
                onChange={(e) => setSelectedCollegeId(e.target.value)}
                className="bg-transparent font-bold text-white text-sm sm:text-base focus:outline-none cursor-pointer hover:text-brand-green transition-colors"
              >
                {(colleges || []).map(col => (
                  <option key={col?.id || Math.random()} value={col?.id} className="bg-dark-850 text-slate-100 font-sans">
                    {col?.name || col?.id} ({col?.tier || 'General'})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="hidden sm:block h-8 w-px bg-dark-700"></div>

          {/* Target Role Benchmark Selector */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-dark-700 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan flex-shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <label className="text-[11px] font-sans tracking-wide text-slate-400 uppercase tracking-wider block">
                Target Role Benchmark
              </label>
              <select
                value={selectedTargetRole}
                onChange={handleRoleChange}
                className="bg-transparent font-bold text-white text-sm sm:text-base focus:outline-none cursor-pointer hover:text-brand-cyan transition-colors"
              >
                {TARGET_ROLE_OPTIONS.map(role => (
                  <option key={role} value={role} className="bg-dark-850 text-slate-100 font-sans">
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
            className="btn-outline-green flex items-center gap-1.5"
            title="Upload new resume to re-calibrate readiness score and roadmap"
          >
            <Upload className="w-3.5 h-3.5" />
            Upload / Scan Resume
          </button>

          <button
            onClick={onOpenContributeModal}
            className="btn-secondary text-xs font-sans tracking-wide flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5 text-brand-cyan" />
            Contribute Drive
          </button>
        </div>
      </div>

      {/* Loading State Banner */}
      {isAnalyzing && (
        <div className="bg-dark-850 border border-brand-green/40 rounded-2xl p-8 shadow-card-dark text-center animate-in fade-in">
          <div className="max-w-md mx-auto space-y-4">
            <div className="relative w-14 h-14 mx-auto">
              <div className="w-14 h-14 rounded-full border-4 border-dark-700 border-t-brand-green animate-spin"></div>
              <Sparkles className="w-6 h-6 text-brand-green absolute inset-0 m-auto animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                {ANALYSIS_STEPS[analysisStepIndex]}
              </h3>
              <p className="text-xs text-slate-400">
                Benchmarking against {selectedTargetRole} recruitment standards
              </p>
            </div>
            <div className="w-full bg-dark-750 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-brand-green h-full transition-all duration-300"
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
        <div className="bg-dark-850 border border-dashed border-dark-600 rounded-2xl p-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-dark-750 border border-dark-600 flex items-center justify-center text-slate-400 mx-auto">
            <FileText className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-bold text-white mb-1">Upload Your Resume to Calibrate Predictions</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
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
        <div className="bg-gradient-to-r from-dark-800 via-dark-850 to-dark-800 border-2 border-brand-green/40 rounded-2xl p-6 shadow-glow-green">
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
                    className="text-dark-750 stroke-current"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="text-brand-green stroke-current transition-all duration-1000 ease-out"
                    strokeWidth="8"
                    strokeDasharray="251.32"
                    strokeDashoffset={251.32 - (251.32 * Math.min(100, Math.max(0, analysisReport.overallReadinessScore))) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-extrabold font-sans text-brand-green leading-none">
                    {analysisReport.overallReadinessScore}%
                  </span>
                  <span className="text-[9px] font-sans text-slate-400 uppercase tracking-wider mt-1">
                    Readiness
                  </span>
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 bg-brand-green/10 text-brand-green border border-brand-green/30 text-[11px] font-sans tracking-wide px-2.5 py-0.5 rounded-full mb-1.5">
                  <Sparkles className="w-3 h-3" />
                  Job Readiness Analyzer · {analysisReport.targetRole || selectedTargetRole}
                </div>
                <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                  <span>Job Readiness Score: {analysisReport.overallReadinessScore}%</span>
                  <span className="text-xs font-normal text-brand-cyan bg-dark-750 px-2 py-0.5 rounded border border-dark-600">
                    {analysisReport.readinessTier}
                  </span>
                </h3>
                <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                  {analysisReport.summaryReport}
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 bg-dark-900/80 border border-dark-700 p-3.5 rounded-xl w-full lg:w-auto justify-around lg:justify-start">
              <div className="text-center px-2">
                <p className="text-[10px] font-sans tracking-wide text-slate-400 uppercase">Campus Recruiters</p>
                <p className="text-xl font-bold font-sans tracking-wide text-white">{analysisReport.totalRecruitersAnalyzed || records.length || 5}</p>
              </div>
              <div className="h-8 w-px bg-dark-700"></div>
              <div className="text-center px-2">
                <p className="text-[10px] font-sans tracking-wide text-slate-400 uppercase">Matched Skills</p>
                <p className="text-xl font-bold font-sans tracking-wide text-brand-green">{analysisReport.matchedSkills?.length || 0}</p>
              </div>
              <div className="h-8 w-px bg-dark-700"></div>
              <div className="text-center px-2">
                <p className="text-[10px] font-sans tracking-wide text-slate-400 uppercase">Gaps to Close</p>
                <p className="text-xl font-bold font-sans tracking-wide text-amber-400">{analysisReport.missingSkills?.length || 0}</p>
              </div>
            </div>

          </div>

          {/* Explainability Panel: Why You Received This Score */}
          {analysisReport.explainabilityFactors && analysisReport.explainabilityFactors.length > 0 && (
            <div className="mt-5 pt-4 border-t border-dark-700/80 space-y-2">
              <p className="text-[11px] font-sans text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                <Info className="w-3.5 h-3.5 text-brand-cyan" />
                Score Explainability Breakdown (Derived from Your Profile):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {analysisReport.explainabilityFactors.map((factor, fIdx) => (
                  <div
                    key={fIdx}
                    className={`p-2.5 rounded-lg border text-xs flex items-start gap-2 ${
                      factor.type === 'strength'
                        ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                        : factor.type === 'gap'
                        ? 'bg-amber-950/20 border-amber-500/30 text-amber-300'
                        : 'bg-dark-850 border-dark-700 text-slate-300'
                    }`}
                  >
                    {factor.type === 'strength' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    ) : factor.type === 'gap' ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Info className="w-3.5 h-3.5 text-brand-cyan flex-shrink-0 mt-0.5" />
                    )}
                    <span className="leading-snug">{factor.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skill Gap Breakdown: Strengths vs Critical Gaps vs Secondary Gaps */}
          <div className="mt-4 pt-4 border-t border-dark-700/80 space-y-3">
            
            {/* Verified Strengths */}
            {analysisReport.matchedSkills && analysisReport.matchedSkills.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-sans text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
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
                <span className="text-xs font-sans text-amber-400 flex items-center gap-1 font-semibold">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Critical Priority Gaps to Close:
                </span>
                {analysisReport.criticalPriorityGaps.map((gap, gIdx) => (
                  <span key={gIdx} className="badge-warning text-xs" title={gap.whyCritical}>
                    <XCircle className="w-3 h-3" />
                    {gap.name}
                  </span>
                ))}
              </div>
            )}

            {/* Secondary Gaps */}
            {analysisReport.secondaryGaps && analysisReport.secondaryGaps.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-sans text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Secondary Role Competencies:
                </span>
                {analysisReport.secondaryGaps.map((gap, gIdx) => (
                  <span key={gIdx} className="badge-code text-xs">
                    {gap.name}
                  </span>
                ))}
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
                <Target className="w-5 h-5 text-brand-green" />
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Personalized 6-Week Placement Closing Roadmap
                  </h3>
                  <p className="text-xs text-slate-400 font-sans tracking-wide">
                    Sequenced based on your detected gaps in {analysisReport.targetRole || selectedTargetRole}
                  </p>
                </div>
              </div>
              <span className="text-xs font-sans tracking-wide text-slate-400 bg-dark-800 px-2.5 py-1 rounded border border-dark-700">
                Interactive Checklist
              </span>
            </div>

            {/* Visual Timeline Connector Header */}
            {analysisReport.actionPlan && analysisReport.actionPlan.length > 0 && (
              <div className="bg-dark-850 border border-dark-700/80 rounded-xl p-4">
                <div className="grid grid-cols-3 gap-2 relative">
                  {/* Visual connecting line */}
                  <div className="hidden sm:block absolute top-4 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-brand-green via-brand-cyan to-brand-green/60 z-0" />
                  
                  {analysisReport.actionPlan.map((plan, idx) => (
                    <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                      <div className="w-8 h-8 rounded-full bg-dark-900 border-2 border-brand-green flex items-center justify-center text-brand-green font-mono text-xs font-bold mb-1 shadow-glow-green">
                        0{idx + 1}
                      </div>
                      <span className="text-[11px] font-bold text-white font-sans">{plan.week}</span>
                      <span className="text-[10px] text-slate-400 truncate max-w-[120px] sm:max-w-none">
                        {plan.targetSkill || plan.theme}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Accordion Sprints */}
            <Accordion
              className="flex w-full flex-col gap-4"
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              variants={{
                expanded: { opacity: 1, scale: 1 },
                collapsed: { opacity: 0, scale: 0.95 },
              }}
            >
              {analysisReport.actionPlan?.map((planBlock, idx) => (
                <AccordionItem key={planBlock.week} value={planBlock.week} className="card-hr !p-0 overflow-hidden">
                  <AccordionTrigger className="w-full p-4 flex items-center justify-between border-b border-dark-700 bg-dark-800/50 hover:bg-dark-800 transition-colors group">
                    <div className="flex items-center gap-2.5">
                      <span className="font-sans tracking-wide text-xs font-bold bg-dark-700 text-brand-green px-2.5 py-1 rounded border border-brand-green/30">
                        {planBlock.week}
                      </span>
                      <div className="text-left">
                        <h4 className="font-semibold text-white text-sm">
                          {planBlock.theme}
                        </h4>
                        {planBlock.targetSkill && (
                          <span className="text-[10px] text-brand-cyan font-mono">
                            Target Competency: {planBlock.targetSkill}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-sans tracking-wide text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Sprint Phase 0{idx + 1}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 transition-transform duration-200 group-data-[expanded]:rotate-90" />
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="origin-top bg-dark-800">
                    <div className="p-4 space-y-4">
                      
                      {/* Why it Matters */}
                      {planBlock.whyItMatters && (
                        <div className="bg-dark-850 p-3 rounded-lg border border-dark-700 text-xs">
                          <p className="text-[10px] font-sans text-brand-cyan uppercase tracking-wider font-semibold mb-1">
                            Why This Matters for {selectedTargetRole}:
                          </p>
                          <p className="text-slate-300 leading-relaxed">{planBlock.whyItMatters}</p>
                        </div>
                      )}

                      {/* Focus Areas */}
                      <div className="space-y-1.5">
                        <p className="text-[11px] font-sans tracking-wide text-slate-400 uppercase tracking-wider">What to Focus On:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {(planBlock.whatToFocusOn || planBlock.focusAreas || []).map((area, i) => (
                            <div key={i} className="bg-dark-850 p-2.5 rounded-lg border border-dark-700/80 text-xs text-slate-300 font-sans tracking-wide flex items-start gap-2">
                              <Code2 className="w-3.5 h-3.5 text-brand-green flex-shrink-0 mt-0.5" />
                              <span>{area}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Expected Outcome */}
                      {planBlock.expectedOutcome && (
                        <div className="bg-emerald-950/20 border border-emerald-500/30 p-3 rounded-lg text-xs">
                          <p className="text-[10px] font-sans text-emerald-400 uppercase tracking-wider font-semibold mb-1">
                            Expected Outcome:
                          </p>
                          <p className="text-emerald-200 leading-relaxed">{planBlock.expectedOutcome}</p>
                        </div>
                      )}

                      {/* Actionable Deliverables with Checkbox */}
                      <div className="space-y-2 pt-1">
                        <p className="text-[11px] font-sans tracking-wide text-slate-400 uppercase tracking-wider">Actionable Deliverables:</p>
                        <div className="space-y-1.5">
                          {(planBlock.deliverables || []).map((item, dIdx) => {
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
                      {planBlock?.suggestedResources && Array.isArray(planBlock.suggestedResources) && (
                        <div className="pt-2 flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-sans tracking-wide text-slate-400">Curated Prep Sheets:</span>
                          {planBlock.suggestedResources.map((res, rIdx) => {
                            const rName = typeof res === 'string' ? res : (res?.name || `Resource ${rIdx + 1}`);
                            const rUrl = typeof res === 'object' && res?.url ? res.url : 'https://takeuforward.org';
                            return (
                              <a
                                key={rIdx}
                                href={rUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs font-sans tracking-wide bg-dark-750 hover:bg-dark-700 border border-dark-600 text-brand-cyan hover:text-white px-2.5 py-1 rounded inline-flex items-center gap-1 transition-colors"
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

          {/* Right 1 Col: Dynamic Company Fit Matrix */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-cyan" />
                <h3 className="text-lg font-bold text-white">
                  Company Fit Matrix
                </h3>
              </div>
              <span className="text-xs font-sans tracking-wide text-slate-400 bg-dark-800 px-2 py-0.5 rounded border border-dark-700">
                Ranked by Fit
              </span>
            </div>

            <div className="space-y-3">
              {analysisReport?.companyFitBreakdown?.map(comp => (
                <div
                  key={comp.companyId || Math.random()}
                  onClick={() => setSelectedCompanyDetail(comp)}
                  className="card-hr-interactive p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <img src={comp.companyLogo} alt={comp.company || 'Company'} className="w-7 h-7 rounded-md object-cover border border-dark-600" />
                        <div>
                          <h4 className="font-bold text-white text-sm">{comp.company}</h4>
                          <p className="text-[11px] text-slate-400 font-sans tracking-wide">{comp.role}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <span className="text-sm font-bold font-sans tracking-wide text-brand-green">
                          {comp.fitPercentage}%
                        </span>
                        <span className={`block text-[10px] font-sans tracking-wide ${comp.tierColor}`}>
                          {comp.tierLabel}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-dark-900 h-1.5 rounded-full overflow-hidden mb-2.5">
                      <div 
                        className="bg-brand-green h-full rounded-full transition-all duration-500"
                        style={{ width: `${comp.fitPercentage}%` }}
                      />
                    </div>

                    {/* CTC & Criteria from real records */}
                    <div className="flex items-center justify-between text-[11px] font-sans tracking-wide text-slate-400 bg-dark-850 px-2.5 py-1.5 rounded border border-dark-700/80 mb-2.5">
                      <span>CTC: <strong className="text-slate-200">{comp.ctcBand}</strong></span>
                      <span>Min CGPA: <strong className="text-slate-200">{comp.cgpaCutoff}</strong></span>
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
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-brand-green" />
              {selectedCollegeObj?.name || 'Campus'} · Historical Placement Records
            </h3>
            <p className="text-xs text-slate-400 font-sans tracking-wide mt-0.5">
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
                <tr className="bg-dark-850 border-b border-dark-700 text-[11px] font-sans tracking-wide uppercase text-slate-400">
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
                          <p className="text-[11px] text-slate-400 font-sans tracking-wide">{rec.role}</p>
                          <span className="text-[10px] text-brand-green/80 font-sans tracking-wide">{rec.visitFrequency}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-sans tracking-wide font-semibold text-brand-green">
                      {rec.ctcBand}
                    </td>

                    <td className="py-3 px-4 font-sans tracking-wide text-slate-300">
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
                          <div key={ri} className="text-[11px] text-slate-300 font-sans tracking-wide">
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

