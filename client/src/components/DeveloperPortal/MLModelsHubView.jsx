import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Search, 
  Sliders, 
  BrainCircuit, 
  BarChart3, 
  Layers, 
  Database, 
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { api } from '../../services/api';

export default function MLModelsHubView({ currentUser }) {
  const [activeModelTab, setActiveModelTab] = useState('salary');
  const [backendStatus, setBackendStatus] = useState(null);
  const [isCheckingBackend, setIsCheckingBackend] = useState(false);
  const [customBackendUrl, setCustomBackendUrl] = useState(() => {
    return localStorage.getItem('jobmax_backend_url') || '';
  });
  const [isEditingUrl, setIsEditingUrl] = useState(false);

  // 1. Salary Hike Model State
  const [salarySkills, setSalarySkills] = useState({
    bigData: 1,
    mathsStats: 1,
    coding: 1,
    aiMl: 1,
    dashboard: 0
  });
  const [salaryResult, setSalaryResult] = useState(null);
  const [isPredictingSalary, setIsPredictingSalary] = useState(false);

  // 2. Candidate Skills Classifier State
  const [candidateSkillsState, setCandidateSkillsState] = useState({
    bigData: 1,
    mathsStats: 0,
    coding: 1,
    aiMl: 1,
    dashboard: 1
  });
  const [candSkillsResult, setCandSkillsResult] = useState(null);
  const [isPredictingCandSkills, setIsPredictingCandSkills] = useState(false);

  // 3. Personality & SDS Success Model State
  const [personalityTraits, setPersonalityTraits] = useState({
    neuroticism: 2.5,
    extraversion: 4.0,
    openness: 4.5,
    agreeableness: 4.2,
    conscientiousness: 4.6
  });
  const [personalityResult, setPersonalityResult] = useState(null);
  const [sdsResult, setSdsResult] = useState(null);
  const [isPredictingPersonality, setIsPredictingPersonality] = useState(false);

  // 4. Job Role Classifier State
  const [jobInput, setJobInput] = useState({
    title: 'Senior Data Scientist',
    description: 'Build predictive machine learning pipelines, deep neural networks, and statistical models in Python and PyTorch.',
    skills: 'Python, PyTorch, Scikit-learn, SQL, Docker',
    experience: '3-5 Yrs'
  });
  const [roleResult, setRoleResult] = useState(null);
  const [isClassifyingRole, setIsClassifyingRole] = useState(false);

  // 5. Job Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchingJobs, setIsSearchingJobs] = useState(false);

  // Check backend health on mount
  const checkStatus = async () => {
    setIsCheckingBackend(true);
    try {
      const status = await api.checkMLBackendStatus();
      setBackendStatus(status);
    } catch (e) {
      setBackendStatus({ status: 'offline', aws_required: false });
    } finally {
      setIsCheckingBackend(false);
    }
  };

  useEffect(() => {
    checkStatus();
    handleSearchJobs('');
  }, []);

  const handleSaveBackendUrl = (e) => {
    e.preventDefault();
    if (customBackendUrl.trim()) {
      localStorage.setItem('jobmax_backend_url', customBackendUrl.trim());
    } else {
      localStorage.removeItem('jobmax_backend_url');
    }
    setIsEditingUrl(false);
    checkStatus();
  };

  // 1. Run Salary Hike Model
  const handlePredictSalary = async () => {
    setIsPredictingSalary(true);
    try {
      const vec = [
        salarySkills.bigData,
        salarySkills.mathsStats,
        salarySkills.coding,
        salarySkills.aiMl,
        salarySkills.dashboard
      ];
      const res = await api.predictSalaryHike(vec);
      setSalaryResult(res);
    } finally {
      setIsPredictingSalary(false);
    }
  };

  // 2. Run Candidate Skills Classifier
  const handlePredictCandSkills = async () => {
    setIsPredictingCandSkills(true);
    try {
      const vec = [
        candidateSkillsState.bigData,
        candidateSkillsState.mathsStats,
        candidateSkillsState.coding,
        candidateSkillsState.aiMl,
        candidateSkillsState.dashboard
      ];
      const res = await api.predictCandidateSkills(vec);
      setCandSkillsResult(res);
    } finally {
      setIsPredictingCandSkills(false);
    }
  };

  // 3. Run Personality & SDS Success
  const handlePredictPersonality = async () => {
    setIsPredictingPersonality(true);
    try {
      const vec = [
        personalityTraits.neuroticism,
        personalityTraits.extraversion,
        personalityTraits.openness,
        personalityTraits.agreeableness,
        personalityTraits.conscientiousness
      ];
      const [pers, sds] = await Promise.all([
        api.predictCandidatePersonality(vec),
        api.predictCareerSuccess(vec)
      ]);
      setPersonalityResult(pers);
      setSdsResult(sds);
    } finally {
      setIsPredictingPersonality(false);
    }
  };

  // 4. Run Job Role Classifier
  const handleClassifyRole = async () => {
    setIsClassifyingRole(true);
    try {
      const res = await api.classifyJobRole({
        job_title: jobInput.title,
        job_description: jobInput.description,
        key_skills: jobInput.skills,
        experience: jobInput.experience
      });
      setRoleResult(res);
    } finally {
      setIsClassifyingRole(false);
    }
  };

  // 5. Search Jobs
  const handleSearchJobs = async (q) => {
    setIsSearchingJobs(true);
    try {
      const res = await api.searchDatasetJobs(q, 10);
      setSearchResults(res || []);
    } finally {
      setIsSearchingJobs(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* Top Banner / System Status */}
      <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 shadow-card-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs font-sans tracking-wide mb-2">
              <Zap className="w-3.5 h-3.5" />
              Machine Learning Engine · Standalone Architecture
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              AI Models Prediction & Intelligence Hub
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Interact directly with all 5 trained machine learning models in real time. Runs fully standalone with zero AWS credentials or cloud fees required.
            </p>
          </div>

          {/* Backend Connection Widget */}
          <div className="bg-dark-900 border border-dark-700 p-4 rounded-xl flex flex-col gap-2 min-w-[280px]">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-sans tracking-wide">Engine Status</span>
              <button 
                onClick={checkStatus} 
                className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1 transition-colors"
                title="Refresh Status"
              >
                <RefreshCw className={`w-3 h-3 ${isCheckingBackend ? 'animate-spin' : ''}`} />
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${backendStatus?.status === 'online' ? 'bg-brand-green shadow-glow-green animate-pulse' : 'bg-brand-cyan shadow-glow-blue'}`} />
              <span className="text-sm font-semibold text-white">
                {backendStatus?.status === 'online' ? 'Connected to ML API (:5000)' : 'Client-Side ML Active'}
              </span>
            </div>

            <div className="text-[11px] font-sans tracking-wide text-slate-400 flex items-center justify-between pt-1 border-t border-dark-800">
              <span>AWS Cloud: <span className="text-emerald-400 font-bold">Not Required</span></span>
              <button 
                onClick={() => setIsEditingUrl(!isEditingUrl)}
                className="text-brand-green hover:underline text-[11px]"
              >
                {isEditingUrl ? 'Cancel' : 'Set API URL'}
              </button>
            </div>

            {isEditingUrl && (
              <form onSubmit={handleSaveBackendUrl} className="mt-2 space-y-2 pt-2 border-t border-dark-800">
                <input
                  type="text"
                  placeholder="e.g. http://localhost:5000"
                  value={customBackendUrl}
                  onChange={(e) => setCustomBackendUrl(e.target.value)}
                  className="w-full bg-dark-950 border border-dark-700 rounded px-2 py-1 text-xs text-white font-sans tracking-wide focus:border-brand-green focus:outline-none"
                />
                <button type="submit" className="w-full btn-primary text-xs py-1">
                  Save URL
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Model Tabs */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-dark-700/80">
          {[
            { id: 'salary', label: '1. Salary Hike Model', icon: TrendingUp, badge: 'jds_salary_hike_model.pkl' },
            { id: 'skills', label: '2. Skills Classifier', icon: BrainCircuit, badge: 'candidate_skills_classifier.joblib' },
            { id: 'personality', label: '3. Behavioral & SDS Trajectory', icon: Sliders, badge: 'sds_success_model.pkl' },
            { id: 'role', label: '4. Job Role Domain', icon: Layers, badge: 'job_role_classifier.joblib' },
            { id: 'datasets', label: '5. Dataset Search (17.4k Jobs)', icon: Database, badge: 'CSV Datasets' }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeModelTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveModelTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  active 
                    ? 'bg-brand-green text-black shadow-glow-green font-bold' 
                    : 'bg-dark-900 hover:bg-dark-750 text-slate-300 border border-dark-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-black' : 'text-brand-green'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: SALARY HIKE MODEL                                 */}
      {/* ======================================================== */}
      {activeModelTab === 'salary' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-dark-800 border border-dark-700 rounded-2xl p-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-brand-green text-xs font-sans tracking-wide mb-1">
                <TrendingUp className="w-4 h-4" />
                <span>RandomForest Classifier · jds_salary_hike_model.pkl</span>
              </div>
              <h3 className="text-xl font-bold text-white">Salary Hike Prediction Model</h3>
              <p className="text-xs text-slate-400 mt-1">
                Evaluates candidate skill vector across 5 domains to project if candidate achieves high or standard salary hike.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { key: 'bigData', label: 'Big Data Skills (Spark, Hadoop, Kafka)', desc: 'Distributed pipelines and distributed storage' },
                { key: 'mathsStats', label: 'Maths & Statistics Skills', desc: 'Probability, hypothesis testing, linear algebra' },
                { key: 'coding', label: 'Coding Mastery (Python, C++, Java)', desc: 'Clean coding, DSA, algorithms, performance' },
                { key: 'aiMl', label: 'AI & Machine Learning Skills', desc: 'Deep learning, neural networks, PyTorch, model deployment' },
                { key: 'dashboard', label: 'Dashboard & Storytelling Skills', desc: 'PowerBI, Tableau, business presentations' }
              ].map(trait => (
                <div key={trait.key} className="bg-dark-900 border border-dark-700 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-white">{trait.label}</h4>
                    <p className="text-xs text-slate-500 font-sans tracking-wide mt-0.5">{trait.desc}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSalarySkills(s => ({ ...s, [trait.key]: s[trait.key] === 1 ? 0 : 1 }))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-sans tracking-wide font-bold transition-all ${
                        salarySkills[trait.key] === 1
                          ? 'bg-brand-green text-black shadow-glow-green'
                          : 'bg-dark-800 text-slate-500 border border-dark-700 hover:text-slate-300'
                      }`}
                    >
                      {salarySkills[trait.key] === 1 ? 'Skill Present (1)' : 'Not Present (0)'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handlePredictSalary}
              disabled={isPredictingSalary}
              className="w-full btn-primary text-sm py-3 justify-center gap-2 font-bold"
            >
              <Sparkles className={`w-4 h-4 ${isPredictingSalary ? 'animate-spin' : ''}`} />
              {isPredictingSalary ? 'Evaluating Vector with Model...' : 'Run Salary Hike Model'}
            </button>
          </div>

          <div className="lg:col-span-5 bg-dark-800 border border-dark-700 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-sans tracking-wide text-slate-400 uppercase tracking-wider mb-4">
                Model Evaluation Output
              </h4>

              {salaryResult ? (
                <div className="space-y-6">
                  <div className={`p-6 rounded-2xl border text-center ${
                    salaryResult.salary_hike_high_or_low === 1
                      ? 'bg-brand-green/10 border-brand-green/40 shadow-glow-green'
                      : 'bg-blue-500/10 border-blue-500/30'
                  }`}>
                    <p className="text-xs font-sans tracking-wide uppercase text-slate-400 mb-1">Prediction Classification</p>
                    <h2 className="text-2xl font-black text-white">{salaryResult.prediction_label}</h2>
                    <span className="inline-block mt-2 font-sans tracking-wide text-xs px-2.5 py-0.5 rounded-full bg-dark-900 border border-dark-700 text-slate-300">
                      Model Class Output: {salaryResult.salary_hike_high_or_low}
                    </span>
                  </div>

                  {salaryResult.probabilities && (
                    <div className="bg-dark-900 border border-dark-700 p-4 rounded-xl space-y-2">
                      <div className="flex justify-between text-xs font-sans tracking-wide text-slate-400">
                        <span>High Hike Probability:</span>
                        <span className="text-brand-green font-bold">
                          {(salaryResult.probabilities[1] * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-dark-950 h-2.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-brand-green h-full rounded-full transition-all duration-500" 
                          style={{ width: `${salaryResult.probabilities[1] * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="bg-dark-900 border border-dark-700 p-4 rounded-xl">
                    <p className="text-xs font-sans tracking-wide text-slate-400 uppercase mb-2">Projected Compensation Uplift</p>
                    <p className="text-xl font-sans tracking-wide font-extrabold text-brand-green">
                      {salaryResult.salary_hike_high_or_low === 1 ? 'INR 32.0 - 45.0 LPA (+65% to +110%)' : 'INR 22.0 - 28.0 LPA (+25% to +45%)'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-slate-500 border border-dashed border-dark-700 rounded-2xl">
                  <TrendingUp className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                  <p className="text-sm">Click "Run Salary Hike Model" to execute the prediction.</p>
                </div>
              )}
            </div>

            <div className="text-[11px] font-sans tracking-wide text-slate-500 border-t border-dark-700 pt-4 mt-6">
              Loaded from <code className="text-brand-green">jds_salary_hike_model.pkl</code> via FastAPI.
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: TECHNICAL SKILLS CLASSIFIER                       */}
      {/* ======================================================== */}
      {activeModelTab === 'skills' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-dark-800 border border-dark-700 rounded-2xl p-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-brand-cyan text-xs font-sans tracking-wide mb-1">
                <BrainCircuit className="w-4 h-4" />
                <span>Pipeline(SimpleImputer, RandomForest) · candidate_skills_classifier.joblib</span>
              </div>
              <h3 className="text-xl font-bold text-white">Candidate Technical Skills Classifier</h3>
              <p className="text-xs text-slate-400 mt-1">
                Determines whether a candidate's skill portfolio qualifies them for Tier-1 engineering benchmarks.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { key: 'bigData', label: 'Big Data Skills' },
                { key: 'mathsStats', label: 'Maths & Statistics Skills' },
                { key: 'coding', label: 'Coding Skills' },
                { key: 'aiMl', label: 'AI & Machine Learning Skills' },
                { key: 'dashboard', label: 'Dashboard & Storytelling Skills' }
              ].map(trait => (
                <div key={trait.key} className="bg-dark-900 border border-dark-700 p-4 rounded-xl flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">{trait.label}</span>
                  <button
                    type="button"
                    onClick={() => setCandidateSkillsState(s => ({ ...s, [trait.key]: s[trait.key] === 1 ? 0 : 1 }))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-sans tracking-wide font-bold transition-all ${
                      candidateSkillsState[trait.key] === 1
                        ? 'bg-brand-cyan text-black shadow-glow-blue'
                        : 'bg-dark-800 text-slate-500 border border-dark-700 hover:text-slate-300'
                    }`}
                  >
                    {candidateSkillsState[trait.key] === 1 ? 'Qualified (1)' : 'Unmet (0)'}
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={handlePredictCandSkills}
              disabled={isPredictingCandSkills}
              className="w-full btn-primary text-sm py-3 justify-center gap-2 font-bold"
            >
              <Sparkles className={`w-4 h-4 ${isPredictingCandSkills ? 'animate-spin' : ''}`} />
              {isPredictingCandSkills ? 'Evaluating...' : 'Classify Candidate Skills'}
            </button>
          </div>

          <div className="lg:col-span-5 bg-dark-800 border border-dark-700 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-sans tracking-wide text-slate-400 uppercase tracking-wider mb-4">
                Qualification Verdict
              </h4>

              {candSkillsResult ? (
                <div className="space-y-6">
                  <div className={`p-6 rounded-2xl border text-center ${
                    candSkillsResult.qualified
                      ? 'bg-emerald-500/10 border-emerald-500/40'
                      : 'bg-amber-500/10 border-amber-500/40'
                  }`}>
                    <h2 className="text-2xl font-black text-white">
                      {candSkillsResult.qualified ? 'Candidate Qualified' : 'Skill Gaps Detected'}
                    </h2>
                    <p className="text-xs font-sans tracking-wide text-slate-400 mt-2">
                      Model Score: {candSkillsResult.skill_qualification} (Confidence: {candSkillsResult.confidence ? `${(candSkillsResult.confidence * 100).toFixed(1)}%` : 'Evaluated'})
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-slate-500 border border-dashed border-dark-700 rounded-2xl">
                  <BrainCircuit className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                  <p className="text-sm">Click "Classify Candidate Skills" to inspect model decisions.</p>
                </div>
              )}
            </div>

            <div className="text-[11px] font-sans tracking-wide text-slate-500 border-t border-dark-700 pt-4 mt-6">
              Loaded from <code className="text-brand-cyan">candidate_skills_classifier.joblib</code>.
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: PERSONALITY & SDS SUCCESS TRAJECTORY              */}
      {/* ======================================================== */}
      {activeModelTab === 'personality' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-dark-800 border border-dark-700 rounded-2xl p-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-purple-400 text-xs font-sans tracking-wide mb-1">
                <Sliders className="w-4 h-4" />
                <span>Big-5 Traits Classifier · sds_success_model.pkl</span>
              </div>
              <h3 className="text-xl font-bold text-white">Behavioral & Career Trajectory Models</h3>
              <p className="text-xs text-slate-400 mt-1">
                Uses candidate psychometric Big-5 traits to predict cultural adaptability and career trajectory.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { key: 'neuroticism', label: 'Emotional Stability (Neuroticism Reverse)', min: 1, max: 5 },
                { key: 'extraversion', label: 'Extraversion & Communication', min: 1, max: 5 },
                { key: 'openness', label: 'Openness to Learning & Innovation', min: 1, max: 5 },
                { key: 'agreeableness', label: 'Agreeableness & Team Collaboration', min: 1, max: 5 },
                { key: 'conscientiousness', label: 'Conscientiousness & Execution Rigor', min: 1, max: 5 }
              ].map(trait => (
                <div key={trait.key} className="bg-dark-900 border border-dark-700 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-white">
                    <span>{trait.label}</span>
                    <span className="font-sans tracking-wide text-purple-400">{personalityTraits[trait.key]} / 5.0</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="5.0"
                    step="0.1"
                    value={personalityTraits[trait.key]}
                    onChange={(e) => setPersonalityTraits(t => ({ ...t, [trait.key]: parseFloat(e.target.value) }))}
                    className="w-full accent-purple-400 cursor-pointer"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={handlePredictPersonality}
              disabled={isPredictingPersonality}
              className="w-full btn-primary text-sm py-3 justify-center gap-2 font-bold"
            >
              <Sparkles className={`w-4 h-4 ${isPredictingPersonality ? 'animate-spin' : ''}`} />
              {isPredictingPersonality ? 'Evaluating Traits...' : 'Run Personality & SDS Trajectory Models'}
            </button>
          </div>

          <div className="lg:col-span-5 bg-dark-800 border border-dark-700 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-sans tracking-wide text-slate-400 uppercase tracking-wider mb-4">
                Behavioral Insights & SDS Verdict
              </h4>

              {sdsResult ? (
                <div className="space-y-4">
                  <div className="bg-purple-500/10 border border-purple-500/30 p-5 rounded-2xl text-center">
                    <p className="text-xs font-sans tracking-wide text-purple-400 uppercase">SDS Career Trajectory</p>
                    <h2 className="text-2xl font-black text-white mt-1">{sdsResult.verdict}</h2>
                    <p className="text-xs font-sans tracking-wide text-slate-400 mt-2">
                      High Growth Probability: {sdsResult.high_success_probability ? `${(sdsResult.high_success_probability * 100).toFixed(1)}%` : 'High'}
                    </p>
                  </div>

                  {personalityResult && (
                    <div className="bg-dark-900 border border-dark-700 p-4 rounded-xl flex items-center justify-between">
                      <span className="text-xs text-slate-300">Cultural Fit Score:</span>
                      <span className="text-xs font-sans tracking-wide font-bold text-emerald-400">
                        {personalityResult.suitable ? 'Highly Suitable (Cultural Match)' : 'Standard Fit'}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center text-slate-500 border border-dashed border-dark-700 rounded-2xl">
                  <Sliders className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                  <p className="text-sm">Adjust traits and click "Run Models" to view behavioral predictions.</p>
                </div>
              )}
            </div>

            <div className="text-[11px] font-sans tracking-wide text-slate-500 border-t border-dark-700 pt-4 mt-6">
              Powered by <code className="text-purple-400">candidate_personality_classifier.joblib</code> & <code className="text-purple-400">sds_success_model.pkl</code>.
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: JOB ROLE DOMAIN CLASSIFIER                        */}
      {/* ======================================================== */}
      {activeModelTab === 'role' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-dark-800 border border-dark-700 rounded-2xl p-6 space-y-4">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-sans tracking-wide mb-1">
                <Layers className="w-4 h-4" />
                <span>ColumnTransformer + OneHotEncoder · job_role_classifier.joblib</span>
              </div>
              <h3 className="text-xl font-bold text-white">Job Role Domain Classifier</h3>
              <p className="text-xs text-slate-400 mt-1">
                Classifies job postings automatically into either <strong>Analytics</strong> or <strong>DataScience</strong>.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 font-sans tracking-wide">Job Title</label>
                <input
                  type="text"
                  value={jobInput.title}
                  onChange={(e) => setJobInput(j => ({ ...j, title: e.target.value }))}
                  className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-sans tracking-wide">Key Skills</label>
                <input
                  type="text"
                  value={jobInput.skills}
                  onChange={(e) => setJobInput(j => ({ ...j, skills: e.target.value }))}
                  className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-sans tracking-wide">Job Description</label>
                <textarea
                  rows="3"
                  value={jobInput.description}
                  onChange={(e) => setJobInput(j => ({ ...j, description: e.target.value }))}
                  className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleClassifyRole}
              disabled={isClassifyingRole}
              className="w-full btn-primary text-sm py-3 justify-center gap-2 font-bold"
            >
              <Sparkles className={`w-4 h-4 ${isClassifyingRole ? 'animate-spin' : ''}`} />
              {isClassifyingRole ? 'Classifying Domain...' : 'Classify Job Role'}
            </button>
          </div>

          <div className="lg:col-span-5 bg-dark-800 border border-dark-700 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-sans tracking-wide text-slate-400 uppercase tracking-wider mb-4">
                Classification Result
              </h4>

              {roleResult ? (
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl border border-amber-400/40 bg-amber-400/10 text-center">
                    <p className="text-xs font-sans tracking-wide text-amber-400 uppercase">Predicted Domain</p>
                    <h2 className="text-3xl font-black text-white mt-1">{roleResult.predicted_domain}</h2>
                  </div>

                  {roleResult.confidence_breakdown && (
                    <div className="bg-dark-900 border border-dark-700 p-4 rounded-xl space-y-3">
                      <p className="text-xs font-sans tracking-wide text-slate-400 uppercase">Confidence Breakdown</p>
                      {Object.entries(roleResult.confidence_breakdown).map(([domain, prob]) => (
                        <div key={domain} className="space-y-1">
                          <div className="flex justify-between text-xs font-sans tracking-wide">
                            <span className="text-slate-300">{domain}</span>
                            <span className="text-amber-400 font-bold">{(prob * 100).toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-dark-950 h-2 rounded-full overflow-hidden">
                            <div className="bg-amber-400 h-full rounded-full" style={{ width: `${prob * 100}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center text-slate-500 border border-dashed border-dark-700 rounded-2xl">
                  <Layers className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                  <p className="text-sm">Click "Classify Job Role" to evaluate the domain.</p>
                </div>
              )}
            </div>

            <div className="text-[11px] font-sans tracking-wide text-slate-500 border-t border-dark-700 pt-4 mt-6">
              Trained on combined feature space of 17,443 real job listings.
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: DATASET SEARCH                                    */}
      {/* ======================================================== */}
      {activeModelTab === 'datasets' && (
        <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-brand-green text-xs font-sans tracking-wide mb-1">
                <Database className="w-4 h-4" />
                <span>Live Dataset Search · 17,443 Verified Job Postings</span>
              </div>
              <h3 className="text-xl font-bold text-white">Search Real Data Science & Analytics Postings</h3>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-grow sm:w-72">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Filter by title or company (e.g. Data, TCS)..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleSearchJobs(e.target.value);
                  }}
                  className="w-full bg-dark-900 border border-dark-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:border-brand-green focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((job) => (
              <div key={job.id} className="bg-dark-900 border border-dark-700 p-4 rounded-xl flex flex-col justify-between hover:border-brand-green/40 transition-colors">
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-sans tracking-wide uppercase px-2 py-0.5 rounded ${
                      job.category === 'Data Science' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' : 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30'
                    }`}>
                      {job.category || 'Engineering'}
                    </span>
                    <span className="text-xs font-sans tracking-wide font-bold text-brand-green">{job.salary}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-2">{job.title}</h4>
                  <p className="text-xs text-slate-400 font-sans tracking-wide mt-0.5">{job.company} • {job.location}</p>
                  {job.skills && (
                    <p className="text-[11px] text-slate-500 mt-2 line-clamp-2">Skills: {job.skills}</p>
                  )}
                </div>
                <div className="mt-3 pt-2 border-t border-dark-800 text-[11px] font-sans tracking-wide text-slate-500 flex justify-between">
                  <span>Exp: {job.experience}</span>
                  <span className="text-brand-green">Direct Match</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
