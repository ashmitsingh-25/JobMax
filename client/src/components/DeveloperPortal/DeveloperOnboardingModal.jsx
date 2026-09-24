import React, { useState } from 'react';
import { GraduationCap, Briefcase, School, Globe, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export default function DeveloperOnboardingModal({ isOpen, onClose, onSaveClassification, initialTrack = 'fresher', initialSubTrack = 'on-campus' }) {
  const [step, setStep] = useState(1);
  const [track, setTrack] = useState(initialTrack); // 'fresher' | 'experienced'
  const [subTrack, setSubTrack] = useState(initialSubTrack); // 'on-campus' | 'off-campus'

  if (!isOpen) return null;

  const handleFinish = () => {
    onSaveClassification({
      track,
      subTrack: track === 'fresher' ? subTrack : null
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-dark-800 border border-dark-600 w-full max-w-xl rounded-2xl p-6 sm:p-8 shadow-2xl relative">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-dark-700">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-green/20 text-brand-green text-xs font-mono font-bold flex items-center justify-center">
              {step}
            </span>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              {step === 1 ? "Step 1 of 2: Experience Classification" : "Step 2 of 2: Placement Strategy"}
            </span>
          </div>
          <span className="text-xs font-mono text-brand-green">JobMax Personalized Track</span>
        </div>

        {/* Step 1: Fresher vs Experienced */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">How would you classify yourself?</h2>
              <p className="text-slate-300 text-sm">
                We calibrate our AI Skill Gap Engine and benchmark datasets based on your current career stage.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Option A: Fresher */}
              <div
                onClick={() => setTrack('fresher')}
                className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                  track === 'fresher'
                    ? 'bg-dark-750 border-brand-green shadow-glow-green'
                    : 'bg-dark-850 border-dark-700 hover:border-dark-600'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-dark-700 flex items-center justify-center text-brand-green mb-3">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-white text-base">Fresher / Student</h3>
                  {track === 'fresher' && <CheckCircle2 className="w-5 h-5 text-brand-green" />}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Final/pre-final year college student, recent graduate, or 0-1 years of experience preparing for campus drives or early career roles.
                </p>
              </div>

              {/* Option B: Experienced */}
              <div
                onClick={() => setTrack('experienced')}
                className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                  track === 'experienced'
                    ? 'bg-dark-750 border-brand-purple shadow-glow-blue'
                    : 'bg-dark-850 border-dark-700 hover:border-dark-600'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-dark-700 flex items-center justify-center text-brand-purple mb-3">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-white text-base">Experienced Pro</h3>
                  {track === 'experienced' && <CheckCircle2 className="w-5 h-5 text-brand-purple" />}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  1 to 8+ years of industry experience looking to switch to high-growth product companies or step up to Senior/Staff SDE with higher CTC.
                </p>
              </div>

            </div>

            <div className="flex justify-end pt-4">
              {track === 'fresher' ? (
                <button
                  onClick={() => setStep(2)}
                  className="btn-primary"
                >
                  Continue to Step 2
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleFinish}
                  className="btn-primary"
                >
                  Launch Experienced Dashboard
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Step 2 (Fresher): On-Campus vs Off-Campus */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Which placement path are you targeting?</h2>
              <p className="text-slate-300 text-sm">
                Choose how you want JobMax AI to source recruiter requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Option 2A: On-Campus */}
              <div
                onClick={() => setSubTrack('on-campus')}
                className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                  subTrack === 'on-campus'
                    ? 'bg-dark-750 border-brand-green shadow-glow-green'
                    : 'bg-dark-850 border-dark-700 hover:border-dark-600'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-dark-700 flex items-center justify-center text-brand-green mb-3">
                  <School className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-white text-base">On-Campus Path</h3>
                  {subTrack === 'on-campus' && <CheckCircle2 className="w-5 h-5 text-brand-green" />}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Benchmarks your skill profile directly against historical placement visit data from your college (Day-1 recruiters, CGPA cutoffs, recurring patterns).
                </p>
              </div>

              {/* Option 2B: Off-Campus */}
              <div
                onClick={() => setSubTrack('off-campus')}
                className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                  subTrack === 'off-campus'
                    ? 'bg-dark-750 border-brand-cyan shadow-glow-blue'
                    : 'bg-dark-850 border-dark-700 hover:border-dark-600'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-dark-700 flex items-center justify-center text-brand-cyan mb-3">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-white text-base">Off-Campus Path</h3>
                  {subTrack === 'off-campus' && <CheckCircle2 className="w-5 h-5 text-brand-cyan" />}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Aggregates open market tech job descriptions across top startups and unicorns to calculate market skill gaps and highlight best-fit companies.
                </p>
              </div>

            </div>

            <div className="flex items-center justify-between pt-4 border-t border-dark-700">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-mono text-slate-400 hover:text-white"
              >
                ← Back to Step 1
              </button>
              <button
                onClick={handleFinish}
                className="btn-primary"
              >
                Enter Dashboard
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
