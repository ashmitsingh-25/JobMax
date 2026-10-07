import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  Upload, 
  ArrowUpRight, 
  Briefcase, 
  DollarSign, 
  Layers, 
  ShieldCheck, 
  Award, 
  Cpu, 
  Code2, 
  Rocket, 
  Building2 
} from 'lucide-react';
import { api } from '../../services/api';

export default function ExperiencedView({ currentUser, onOpenResumeModal }) {
  const [growthReport, setGrowthReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      setIsLoading(true);
      api.analyzeCareerGrowth(currentUser)
        .then(res => {
          if (res && res.success) {
            setGrowthReport(res.growthReport);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [currentUser]);

  return (
    <div className="space-y-4 animate-in fade-in">
      
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 flex-shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-heading">Experienced Track · Career Growth Advisor</h2>
            <p className="text-xs text-slate-500">
              Promotion velocity, compensation benchmarks & tier-unlocking skills
            </p>
          </div>
        </div>

        <button onClick={onOpenResumeModal} className="btn-secondary text-xs">
          <Upload className="w-3.5 h-3.5 text-blue-600" />
          Re-Upload Senior Resume (PDF)
        </button>
      </div>

      {/* Main Career Growth Overview Banner - Bento AI Module */}
      {growthReport && (
        <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            <div className="space-y-3 flex-grow">
              <div className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-800 border border-teal-200 text-xs font-semibold px-2.5 py-0.5 rounded">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                Senior Career Trajectory Engine
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-lg">
                  <p className="text-[10px] font-mono text-slate-500 uppercase">Current Level</p>
                  <p className="font-bold text-slate-900 text-sm">{growthReport.currentLevel}</p>
                </div>
                
                <span className="text-slate-400 font-bold text-base">➔</span>

                <div className="bg-blue-50/70 border border-blue-200 px-3.5 py-2 rounded-lg">
                  <p className="text-[10px] font-mono text-blue-700 uppercase">Target Next Level</p>
                  <p className="font-bold text-blue-900 text-sm">{growthReport.targetNextRole}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                {growthReport.strategicAdvice}
              </p>
            </div>

            {/* Compensation Uplift Metrics */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg text-center min-w-[220px]">
              <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
                Projected Compensation Jump
              </p>
              <span className="text-2xl font-bold font-mono text-slate-900 leading-none block my-1">
                {growthReport.targetCompBand}
              </span>
              <span className="text-xs font-mono text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded inline-block mt-1 font-semibold">
                {growthReport.targetUpliftPercent} Pay Uplift
              </span>
            </div>

          </div>
        </div>
      )}

      {/* Grid: High-Leverage Skills to Acquire & Target Unicorns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Col: High-Leverage Tier-Unlocking Skills */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-teal-700" />
            <h3 className="text-base font-bold text-slate-900 font-heading">
              High-Leverage Tier-Unlocking Skills
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Adding these proficiencies unlocks Senior & Staff level interviews
          </p>

          <div className="space-y-2.5">
            {(growthReport?.skillsToAcquire || growthReport?.tierUnlockingSkills || []).map((skill, sIdx) => {
              const sName = typeof skill === 'string' ? skill : (skill?.name || `Skill ${sIdx + 1}`);
              return (
                <div key={sIdx} className="bg-white border border-slate-200 border-l-4 border-l-teal-600 rounded-lg p-3.5 shadow-xs space-y-1.5 hover:border-slate-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-slate-900 text-sm flex items-center gap-1.5">
                      <Rocket className="w-3.5 h-3.5 text-teal-600" />
                      {sName}
                    </h4>
                    <span className="badge-matched text-[11px]">
                      {skill?.salaryImpact || skill?.tierImpact || '+₹8 LPA'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {skill?.description || 'High-leverage competency unlocking senior-level compensation.'}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 pt-0.5">
                    <span>Domain: {skill?.category || 'Architecture'}</span>
                    <span>•</span>
                    <span>Target Mastery: {skill?.difficulty || 'Advanced'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Realistic Target Companies & Proof-of-Work Projects */}
        <div className="space-y-6">
          
          {/* Target Companies */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Realistic Next-Tier Company Switches
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {growthReport?.targetCompanies?.map(target => (
                <div key={target.company} className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-2 hover:border-slate-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={target.logo} alt={target.company} className="w-6 h-6 rounded object-cover border border-slate-200" />
                      <h4 className="font-semibold text-slate-900 text-sm">{target.company}</h4>
                    </div>
                    <span className="text-xs font-mono text-teal-700 font-semibold">{target.fitScore}% Fit</span>
                  </div>

                  <div className="bg-slate-50 p-2 rounded text-[11px] text-slate-600 font-mono">
                    <span className="text-slate-400">Tier:</span> {target.tier} <br />
                    <span className="text-slate-400">Expected CTC:</span> <strong className="text-slate-900">{target.expectedCtc}</strong>
                  </div>

                  <p className="text-[11px] text-slate-500">
                    <strong className="text-slate-700">Focus:</strong> {target.hiringFocus}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Proof of Work Blueprints */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Senior Proof-of-Work System Blueprints
              </h3>
            </div>

            <div className="space-y-2.5">
              {growthReport?.proofOfWorkProjects?.map(project => (
                <div key={project.title} className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-2 hover:border-slate-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-slate-900 text-sm">{project.title}</h4>
                    <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {project.timeToBuild}
                    </span>
                  </div>
                  <div className="code-block text-[11px]">
                    {project.architecture}
                  </div>
                  <p className="text-xs text-slate-600">
                    {project.impact}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
