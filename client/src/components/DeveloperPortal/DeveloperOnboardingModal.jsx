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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white border border-slate-200 w-full max-w-xl rounded-xl p-6 sm:p-8 shadow-xl relative">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-700 text-xs font-sans font-bold flex items-center justify-center border border-blue-200">
              {step}
            </span>
            <span className="text-xs font-sans text-slate-500 uppercase tracking-wider font-semibold">
              {step === 1 ? "Step 1 of 2: Experience Classification" : "Step 2 of 2: Placement Strategy"}
            </span>
          </div>
          <span className="text-xs font-sans text-blue-600 font-semibold">JobMax Personalized Track</span>
        </div>

        {/* Step 1: Fresher vs Experienced */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-2">How would you classify yourself?</h2>
              <p className="text-slate-600 text-sm font-sans">
                We calibrate our AI Skill Gap Engine and benchmark datasets based on your current career stage.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Option A: Fresher */}
              <div
                onClick={() => setTrack('fresher')}
                className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                  track === 'fresher'
                    ? 'bg-blue-50/40 border-blue-600 shadow-2xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 mb-3">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-display font-semibold text-slate-900 text-base">Fresher / Student</h3>
                  {track === 'fresher' && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
                </div>
                <p className="text-xs text-slate-500 font-sans leading-relaxed">
                  Final/pre-final year college student, recent graduate, or 0-1 years of experience preparing for campus drives or early career roles.
                </p>
              </div>

              {/* Option B: Experienced */}
              <div
                onClick={() => setTrack('experienced')}
                className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                  track === 'experienced'
                    ? 'bg-blue-50/40 border-blue-600 shadow-2xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-3">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-display font-semibold text-slate-900 text-base">Experienced Pro</h3>
                  {track === 'experienced' && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
                </div>
                <p className="text-xs text-slate-500 font-sans leading-relaxed">
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
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-2">Which placement path are you targeting?</h2>
              <p className="text-slate-600 text-sm font-sans">
                Choose how you want JobMax AI to source recruiter requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Option 2A: On-Campus */}
              <div
                onClick={() => setSubTrack('on-campus')}
                className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                  subTrack === 'on-campus'
                    ? 'bg-blue-50/40 border-blue-600 shadow-2xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 mb-3">
                  <School className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-display font-semibold text-slate-900 text-base">On-Campus Path</h3>
                  {subTrack === 'on-campus' && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
                </div>
                <p className="text-xs text-slate-500 font-sans leading-relaxed">
                  Benchmarks your skill profile directly against historical placement visit data from your college (Day-1 recruiters, CGPA cutoffs, recurring patterns).
                </p>
              </div>

              {/* Option 2B: Off-Campus */}
              <div
                onClick={() => setSubTrack('off-campus')}
                className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                  subTrack === 'off-campus'
                    ? 'bg-blue-50/40 border-blue-600 shadow-2xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-3">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-display font-semibold text-slate-900 text-base">Off-Campus Path</h3>
                  {subTrack === 'off-campus' && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
                </div>
                <p className="text-xs text-slate-500 font-sans leading-relaxed">
                  Aggregates open market tech job descriptions across top startups and unicorns to calculate market skill gaps and highlight best-fit companies.
                </p>
              </div>

            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-sans tracking-wide text-slate-500 hover:text-slate-800 font-medium"
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
