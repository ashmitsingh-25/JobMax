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
        res = await api.uploadResume(formData, { file });
      } else if (activeMode === 'paste' && pasteText.trim()) {
        const formData = new FormData();
        formData.append('resumeText', pasteText);
        res = await api.uploadResume(formData, { pasteText });
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-xl p-6 sm:p-7 shadow-xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 border border-teal-200 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-slate-900">AI Resume Skill Parser</h3>
              <p className="text-xs text-slate-500 font-sans tracking-wide">NLP & semantic entity extraction engine</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-1 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector */}
        {!extractedData && (
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 mb-5">
            <button
              onClick={() => setActiveMode('upload')}
              className={`flex-1 py-1.5 rounded-md text-xs font-sans tracking-wide font-medium transition-all flex items-center justify-center gap-2 ${
                activeMode === 'upload' ? 'bg-white text-blue-600 shadow-xs border border-slate-200 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              Upload PDF / Document
            </button>
            <button
              onClick={() => setActiveMode('paste')}
              className={`flex-1 py-1.5 rounded-md text-xs font-sans tracking-wide font-medium transition-all flex items-center justify-center gap-2 ${
                activeMode === 'paste' ? 'bg-white text-blue-600 shadow-xs border border-slate-200 font-semibold' : 'text-slate-600 hover:text-slate-900'
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
              <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-8 text-center bg-slate-50/70 hover:bg-blue-50/20 transition-colors">
                <input
                  type="file"
                  id="resume-file-input"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="resume-file-input" className="cursor-pointer flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-3 shadow-xs">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-slate-800 mb-1">
                    {file ? file.name : "Click to browse or drop your Resume (PDF/DOCX)"}
                  </p>
                  <p className="text-xs text-slate-500 font-sans tracking-wide">
                    {file ? `${(file.size / 1024).toFixed(1)} KB` : "Supports PDF, DOCX, TXT up to 10MB"}
                  </p>
                </label>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-sans tracking-wide text-slate-700 font-medium mb-1.5">Paste Resume or Project Summary Text</label>
                <textarea
                  rows={7}
                  placeholder="Paste your resume contents, project descriptions, skills list (e.g. Java, React, SQL, LeetCode 350+ solved, Docker, IIT Delhi B.Tech CS CGPA: 8.8)..."
                  value={pasteText}
                  onChange={(e) => setPasteText(e.target.value)}
                  className="input-hr w-full font-sans text-xs bg-white text-slate-800"
                />
              </div>
            )}

            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs flex items-center gap-2 font-sans tracking-wide">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
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
            <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2 text-teal-800 font-sans tracking-wide text-xs font-medium">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Successfully extracted {extractedData.totalSkillsCount} structured skills</span>
              </div>
              {extractedData.metadata?.detectedCgpa && (
                <span className="text-xs font-sans tracking-wide bg-white border border-teal-200 px-2 py-0.5 rounded text-slate-700">
                  Detected CGPA: <strong className="text-teal-700">{extractedData.metadata.detectedCgpa}</strong>
                </span>
              )}
            </div>

            <div>
              <p className="text-xs font-sans tracking-wide text-slate-500 uppercase tracking-wider mb-2.5 font-semibold">
                Extracted Skills & Competencies:
              </p>
              <div className="flex flex-wrap gap-2 max-h-56 overflow-y-auto p-3 bg-slate-50 rounded-xl border border-slate-200">
                {extractedData.extractedSkills.map(skill => (
                  <span key={skill} className="badge-matched text-xs">
                    <CheckCircle2 className="w-3 h-3 text-teal-600" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setExtractedData(null);
                  setFile(null);
                  setPasteText('');
                }}
                className="text-xs font-sans tracking-wide text-slate-500 hover:text-slate-800 font-medium"
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
