import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  X, 
  AlertCircle, 
  RefreshCw,
  GraduationCap,
  Building,
  Briefcase,
  Layers
} from 'lucide-react';
import { api } from '../../services/api';

const LOADING_STEPS = [
  "Analyzing your resume document...",
  "Extracting candidate profile & education...",
  "Mapping technical skills against taxonomy...",
  "Ready to build personalized roadmap!"
];

export default function ResumeUploadModal({ isOpen, onClose, onSkillsExtracted }) {
  const [activeMode, setActiveMode] = useState('upload'); // 'upload' | 'paste'
  const [file, setFile] = useState(null);
  const [pasteText, setPasteText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [extractedData, setExtractedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Animated loading step progression
  useEffect(() => {
    let interval;
    if (isLoading) {
      setLoadingStepIndex(0);
      interval = setInterval(() => {
        setLoadingStepIndex(prev => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
      }, 700);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setErrorMessage('');
    }
  };

  const handleRunExtraction = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      let res;
      if (activeMode === 'upload' && file) {
        const formData = new FormData();
        formData.append('resumeFile', file);
        res = await api.uploadResume(formData);
      } else if (activeMode === 'paste' && pasteText.trim()) {
        const formData = new FormData();
        formData.append('resumeText', pasteText);
        res = await api.uploadResume(formData);
      } else {
        setErrorMessage('Please provide a resume file or paste your resume text.');
        setIsLoading(false);
        return;
      }

      if (res && res.success && res.extractedSkills && res.extractedSkills.length > 0) {
        setExtractedData(res);
      } else if (res && res.success && (!res.extractedSkills || res.extractedSkills.length === 0)) {
        setErrorMessage("We couldn't analyze this resume. No recognized skills found. Try uploading a more detailed technical resume or paste your skills list.");
      } else {
        setErrorMessage(res?.message || "We couldn't analyze this resume. Try uploading again.");
      }
    } catch (err) {
      console.error("Resume parse error:", err);
      setErrorMessage("We couldn't analyze this resume. Try uploading again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyToProfile = (replace = true) => {
    if (extractedData && extractedData.extractedSkills) {
      onSkillsExtracted(extractedData.extractedSkills, extractedData.metadata, { replace });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-dark-800 border border-dark-600 w-full max-w-2xl rounded-2xl p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-dark-700">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-green/10 text-brand-green border border-brand-green/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">AI Resume Skill Parser</h3>
              <p className="text-xs text-slate-400 font-sans tracking-wide">NLP semantic entity extraction & dynamic profile calibrator</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector */}
        {!extractedData && !isLoading && (
          <div className="flex items-center bg-dark-850 p-1 rounded-lg border border-dark-700 mb-5">
            <button
              onClick={() => setActiveMode('upload')}
              className={`flex-1 py-1.5 rounded-md text-xs font-sans tracking-wide font-medium transition-all flex items-center justify-center gap-2 ${
                activeMode === 'upload' ? 'bg-dark-700 text-brand-green border border-brand-green/30' : 'text-slate-400'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              Upload PDF / Document
            </button>
            <button
              onClick={() => setActiveMode('paste')}
              className={`flex-1 py-1.5 rounded-md text-xs font-sans tracking-wide font-medium transition-all flex items-center justify-center gap-2 ${
                activeMode === 'paste' ? 'bg-dark-700 text-brand-green border border-brand-green/30' : 'text-slate-400'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Paste Text / Markdown
            </button>
          </div>
        )}

        {/* Loading State Banner */}
        {isLoading && (
          <div className="py-12 px-4 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/30 flex items-center justify-center mx-auto animate-pulse">
              <RefreshCw className="w-6 h-6 animate-spin" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-1">
                {LOADING_STEPS[loadingStepIndex]}
              </h4>
              <p className="text-xs text-slate-400 font-sans tracking-wide">
                Calibrating your skill match, critical gaps, and 6-week preparation sprint
              </p>
            </div>
            <div className="w-full max-w-xs mx-auto bg-dark-700 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-brand-green h-full transition-all duration-500 ease-out" 
                style={{ width: `${((loadingStepIndex + 1) / LOADING_STEPS.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Input Form (When not loading and no result yet) */}
        {!extractedData && !isLoading && (
          <div className="space-y-4">
            {activeMode === 'upload' ? (
              <div className="border-2 border-dashed border-dark-600 hover:border-brand-green/60 rounded-xl p-8 text-center bg-dark-850/50 transition-colors">
                <input
                  type="file"
                  id="resume-file-input"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="resume-file-input" className="cursor-pointer flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-dark-750 flex items-center justify-center text-brand-green mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-slate-200 mb-1">
                    {file ? file.name : "Click to browse or drop your Resume (PDF/DOCX/TXT)"}
                  </p>
                  <p className="text-xs text-slate-500 font-sans tracking-wide">
                    {file ? `${(file.size / 1024).toFixed(1)} KB` : "Supports PDF, DOCX, TXT up to 10MB"}
                  </p>
                </label>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-sans tracking-wide text-slate-400 mb-1.5">
                  Paste Resume or Technical Profile Summary
                </label>
                <textarea
                  rows={7}
                  placeholder="Paste your resume contents: Candidate Name, Education (IIT Delhi, B.Tech CS, CGPA: 8.8), Skills (C++, Java, React, SQL, LeetCode 300+), Projects (Distributed Key-Value Store)..."
                  value={pasteText}
                  onChange={(e) => setPasteText(e.target.value)}
                  className="input-hr w-full font-sans text-xs"
                />
              </div>
            )}

            {errorMessage && (
              <div className="p-3 bg-rose-950/40 border border-rose-500/40 rounded-lg text-rose-400 text-xs flex items-center justify-between gap-2 font-sans tracking-wide">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
                <button 
                  onClick={() => setErrorMessage('')}
                  className="text-xs underline hover:text-white"
                >
                  Try again
                </button>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={handleRunExtraction}
                disabled={isLoading || (activeMode === 'upload' && !file) || (activeMode === 'paste' && !pasteText.trim())}
                className="btn-primary disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                Analyze Resume & Extract Profile
              </button>
            </div>
          </div>
        )}

        {/* Extracted Result View */}
        {extractedData && (
          <div className="space-y-5 animate-in fade-in">
            {/* Success summary pill */}
            <div className="p-4 bg-emerald-950/30 border border-emerald-500/40 rounded-xl flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-emerald-400 font-sans tracking-wide text-xs">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>
                  Extracted <strong>{extractedData.totalSkillsCount} structured skills</strong> from {extractedData.metadata?.detectedName || "your resume"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {extractedData.metadata?.detectedCgpa && (
                  <span className="text-xs font-sans tracking-wide bg-dark-750 px-2 py-0.5 rounded text-slate-300 border border-dark-600">
                    CGPA: <strong className="text-brand-green">{extractedData.metadata.detectedCgpa}</strong>
                  </span>
                )}
                {extractedData.metadata?.detectedCollege && (
                  <span className="text-xs font-sans tracking-wide bg-dark-750 px-2 py-0.5 rounded text-slate-300 border border-dark-600">
                    {extractedData.metadata.detectedCollege}
                  </span>
                )}
              </div>
            </div>

            {/* Extracted Metadata Grid */}
            {(extractedData.metadata?.detectedDegree || extractedData.metadata?.detectedExperienceLevel || extractedData.metadata?.detectedProjectsCount > 0) && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 bg-dark-850 p-3 rounded-xl border border-dark-700/80 text-xs font-sans tracking-wide text-slate-300">
                {extractedData.metadata?.detectedDegree && (
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-brand-cyan" />
                    <span>Degree: <strong className="text-white">{extractedData.metadata.detectedDegree}</strong></span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-brand-green" />
                  <span>Level: <strong className="text-white">{extractedData.metadata?.detectedExperienceLevel || "Fresher"}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-brand-amber" />
                  <span>Projects: <strong className="text-white">{extractedData.metadata?.detectedProjectsCount || 2}</strong></span>
                </div>
              </div>
            )}

            {/* Skills chips */}
            <div>
              <p className="text-xs font-sans tracking-wide text-slate-400 uppercase tracking-wider mb-2.5">
                Verified Technical Skills Detected ({extractedData.extractedSkills.length}):
              </p>
              <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-3 bg-dark-850 rounded-xl border border-dark-700">
                {extractedData.extractedSkills.map(skill => (
                  <span key={skill} className="badge-matched text-xs">
                    <CheckCircle2 className="w-3 h-3 text-brand-green" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-dark-700">
              <button
                type="button"
                onClick={() => {
                  setExtractedData(null);
                  setFile(null);
                  setPasteText('');
                }}
                className="text-xs font-sans tracking-wide text-slate-400 hover:text-white"
              >
                ← Scan Another File
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => handleApplyToProfile(false)}
                  className="btn-secondary text-xs"
                  title="Keep existing skills and add new ones"
                >
                  Merge Skills
                </button>

                <button
                  type="button"
                  onClick={() => handleApplyToProfile(true)}
                  className="btn-primary text-xs"
                  title="Synchronize profile completely with this resume"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Sync Resume Profile & Recalibrate Roadmap
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

