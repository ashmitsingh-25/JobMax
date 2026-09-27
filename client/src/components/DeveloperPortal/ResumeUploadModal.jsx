import React, { useState } from 'react';
import { Upload, FileText, Sparkles, CheckCircle2, X, AlertCircle, RefreshCw } from 'lucide-react';
import { api } from '../../services/api';

export default function ResumeUploadModal({ isOpen, onClose, onSkillsExtracted }) {
  const [activeMode, setActiveMode] = useState('upload'); // 'upload' | 'paste'
  const [file, setFile] = useState(null);
  const [pasteText, setPasteText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

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

      if (res && res.success) {
        setExtractedData(res);
      } else {
        setErrorMessage(res?.message || 'Extraction failed. Please try again.');
      }
    } catch (err) {
      console.error("Resume parse error:", err);
      setErrorMessage("Failed to connect to AI NLP Skill Extractor.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyToProfile = () => {
    if (extractedData && extractedData.extractedSkills) {
      onSkillsExtracted(extractedData.extractedSkills, extractedData.metadata);
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
              <p className="text-xs text-slate-400 font-mono">NLP & Semantic entity extraction engine</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector */}
        {!extractedData && (
          <div className="flex items-center bg-dark-850 p-1 rounded-lg border border-dark-700 mb-5">
            <button
              onClick={() => setActiveMode('upload')}
              className={`flex-1 py-1.5 rounded-md text-xs font-mono font-medium transition-all flex items-center justify-center gap-2 ${
                activeMode === 'upload' ? 'bg-dark-700 text-brand-green border border-brand-green/30' : 'text-slate-400'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              Upload PDF / Document
            </button>
            <button
              onClick={() => setActiveMode('paste')}
              className={`flex-1 py-1.5 rounded-md text-xs font-mono font-medium transition-all flex items-center justify-center gap-2 ${
                activeMode === 'paste' ? 'bg-dark-700 text-brand-green border border-brand-green/30' : 'text-slate-400'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Paste Text / Markdown
            </button>
          </div>
        )}

        {/* Main Content Area */}
        {!extractedData ? (
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
                    {file ? file.name : "Click to browse or drop your Resume (PDF/DOCX)"}
                  </p>
                  <p className="text-xs text-slate-500 font-mono">
                    {file ? `${(file.size / 1024).toFixed(1)} KB` : "Supports PDF, DOCX, TXT up to 10MB"}
                  </p>
                </label>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">Paste Resume or Project Summary Text</label>
                <textarea
                  rows={7}
                  placeholder="Paste your resume contents, project descriptions, skills list (e.g. Java, React, SQL, LeetCode 350+ solved, Docker, IIT Delhi B.Tech CS CGPA: 8.8)..."
                  value={pasteText}
                  onChange={(e) => setPasteText(e.target.value)}
                  className="input-hr w-full font-sans text-xs"
                />
              </div>
            )}

            {errorMessage && (
              <div className="p-3 bg-rose-950/40 border border-rose-500/40 rounded-lg text-rose-400 text-xs flex items-center gap-2 font-mono">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={handleRunExtraction}
                disabled={isLoading || (activeMode === 'upload' && !file) || (activeMode === 'paste' && !pasteText.trim())}
                className="btn-primary disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Extracting Skills via NLP...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Run AI Skill Extraction
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Extracted Result View */
          <div className="space-y-5 animate-in fade-in">
            <div className="p-4 bg-emerald-950/30 border border-emerald-500/40 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Successfully extracted {extractedData.totalSkillsCount} structured skills</span>
              </div>
              {extractedData.metadata?.detectedCgpa && (
                <span className="text-xs font-mono bg-dark-750 px-2 py-0.5 rounded text-slate-300">
                  Detected CGPA: <strong className="text-brand-green">{extractedData.metadata.detectedCgpa}</strong>
                </span>
              )}
            </div>

            <div>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5">
                Extracted Skills & Competencies:
              </p>
              <div className="flex flex-wrap gap-2 max-h-56 overflow-y-auto p-3 bg-dark-850 rounded-xl border border-dark-700">
                {extractedData.extractedSkills.map(skill => (
                  <span key={skill} className="badge-matched text-xs">
                    <CheckCircle2 className="w-3 h-3 text-brand-green" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-dark-700">
              <button
                type="button"
                onClick={() => {
                  setExtractedData(null);
                  setFile(null);
                  setPasteText('');
                }}
                className="text-xs font-mono text-slate-400 hover:text-white"
              >
                ← Scan Another File
              </button>

              <button
                onClick={handleApplyToProfile}
                className="btn-primary"
              >
                <CheckCircle2 className="w-4 h-4" />
                Apply to My Profile & Recalibrate AI Gap
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
