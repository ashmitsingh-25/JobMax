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
    <div className="space-y-8 animate-in fade-in">
      
      {/* Top Header Card */}
      <div className="bg-dark-800 border border-dark-700 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-card-dark">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-dark-700 border border-brand-purple/40 flex items-center justify-center text-brand-purple">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Experienced Track · Career Growth Advisor</h2>
            <p className="text-xs text-slate-400 font-mono">
              AI Bot #2: Promotion velocity, compensation benchmarks & tier-unlocking skills
            </p>
          </div>
        </div>

        <button onClick={onOpenResumeModal} className="btn-primary text-xs">
          <Upload className="w-3.5 h-3.5" />
          Re-Upload Senior Resume (PDF)
        </button>
      </div>

      {/* Main Career Growth Overview Banner */}
      {growthReport && (
        <div className="bg-gradient-to-r from-dark-800 via-dark-850 to-dark-800 border-2 border-brand-purple/40 rounded-2xl p-6 shadow-glow-blue relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-brand-purple/10 text-brand-purple border border-brand-purple/30 text-[11px] font-mono px-2.5 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3" />
                AI Bot #2 · Senior Career Trajectory Engine
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-dark-900 border border-dark-700 px-3.5 py-2 rounded-xl">
                  <p className="text-[10px] font-mono text-slate-500 uppercase">Current Level</p>
                  <p className="font-bold text-slate-200 text-sm">{growthReport.currentLevel}</p>
                </div>
                
                <span className="text-brand-purple font-mono font-bold text-lg">➔</span>

                <div className="bg-dark-900 border border-brand-purple/40 px-3.5 py-2 rounded-xl shadow-glow-blue">
                  <p className="text-[10px] font-mono text-brand-purple uppercase">Target Next Level</p>
                  <p className="font-bold text-white text-sm">{growthReport.targetNextRole}</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                {growthReport.strategicAdvice}
              </p>
            </div>

            {/* Compensation Uplift Metrics */}
            <div className="bg-dark-900/90 border border-dark-700 p-5 rounded-xl text-center min-w-[240px]">
              <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                Projected Compensation Jump
              </p>
              <span className="text-3xl font-extrabold font-mono text-brand-green leading-none block my-1">
                {growthReport.targetCompBand}
              </span>
              <span className="text-xs font-mono text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/30 px-2.5 py-0.5 rounded-full inline-block mt-1">
                {growthReport.targetUpliftPercent} Pay Uplift
              </span>
            </div>

          </div>
        </div>
      )}

      {/* Grid: High-Leverage Skills to Acquire & Target Unicorns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Col: High-Leverage Tier-Unlocking Skills */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-brand-green" />
            <h3 className="text-lg font-bold text-white">
              High-Leverage Tier-Unlocking Skills
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Adding these high-leverage proficiencies unlocks Senior & Staff level interviews
          </p>

          <div className="space-y-3">
            {(growthReport?.skillsToAcquire || growthReport?.tierUnlockingSkills || []).map((skill, sIdx) => {
              const sName = typeof skill === 'string' ? skill : (skill?.name || `Skill ${sIdx + 1}`);
              return (
                <div key={sIdx} className="card-hr space-y-2 border-l-4 border-l-brand-green">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-sm flex items-center gap-2">
                      <Rocket className="w-4 h-4 text-brand-green" />
                      {sName}
                    </h4>
                    <span className="badge-matched text-[11px]">
                      {skill?.salaryImpact || skill?.tierImpact || '+₹8 LPA'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {skill?.description || 'High-leverage competency unlocking senior-level compensation.'}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 pt-1">
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
              <Building2 className="w-5 h-5 text-brand-cyan" />
              <h3 className="text-lg font-bold text-white">
                Realistic Next-Tier Company Switches
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {growthReport?.targetCompanies?.map(target => (
                <div key={target.company} className="card-hr p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={target.logo} alt={target.company} className="w-7 h-7 rounded-md object-cover border border-dark-600" />
                      <h4 className="font-bold text-white text-sm">{target.company}</h4>
                    </div>
                    <span className="text-xs font-mono text-brand-green font-semibold">{target.fitScore}% Fit</span>
                  </div>

                  <div className="bg-dark-850 p-2 rounded text-[11px] font-mono text-slate-300">
                    <span className="text-slate-500">Tier:</span> {target.tier} <br />
                    <span className="text-slate-500">Expected CTC:</span> <strong className="text-white">{target.expectedCtc}</strong>
                  </div>

                  <p className="text-[11px] text-slate-400">
                    <strong className="text-slate-300">Focus:</strong> {target.hiringFocus}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Proof of Work Blueprints */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-brand-purple" />
              <h3 className="text-lg font-bold text-white">
                Senior Proof-of-Work System Blueprints
              </h3>
            </div>

            <div className="space-y-3">
              {growthReport?.proofOfWorkProjects?.map(project => (
                <div key={project.title} className="card-hr p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-sm">{project.title}</h4>
                    <span className="text-[10px] font-mono text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded border border-brand-cyan/30">
                      {project.timeToBuild}
                    </span>
                  </div>
                  <div className="code-block text-[11px]">
                    {project.architecture}
                  </div>
                  <p className="text-xs text-slate-300">
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
