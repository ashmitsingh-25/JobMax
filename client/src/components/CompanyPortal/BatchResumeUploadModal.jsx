import React, { useState } from 'react';
import { Upload, X, Sparkles, CheckCircle2, RefreshCw, Files } from 'lucide-react';
import { api } from '../../services/api';

export default function BatchResumeUploadModal({ isOpen, onClose, selectedRole, onBatchRanked }) {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUploadAndRank = async () => {
    if (files.length === 0) return;
    setIsLoading(true);
    setMessage('');
    try {
      const formData = new FormData();
      files.forEach(f => formData.append('resumes', f));
      formData.append('roleId', selectedRole?.id || '');

      const res = await api.batchResumeUpload(formData);
      if (res && res.success) {
        onBatchRanked(res.rankedCandidates);
        onClose();
      }
    } catch (err) {
      console.error("Batch upload error:", err);
      setMessage("Error uploading batch resumes.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white border border-slate-200/90 w-full max-w-lg rounded-xl p-6 sm:p-7 shadow-xl relative">
        
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center">
              <Files className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-slate-900">Batch Resume Sourcing & Ranking</h3>
              <p className="text-xs text-slate-500 font-sans">Upload multiple applicant resumes for automatic AI parsing</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs font-sans text-slate-600">
            Target Role: <strong className="text-blue-700 font-medium">{selectedRole?.title || "Open Role"}</strong>
          </div>

          <div className="border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-xl p-8 text-center bg-slate-50/50 transition-colors">
            <input
              type="file"
              multiple
              id="batch-files-input"
              accept=".pdf,.docx,.txt"
              onChange={handleFileChange}
              className="hidden"
            />
            <label htmlFor="batch-files-input" className="cursor-pointer flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-3 border border-blue-200">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-slate-800 mb-1 font-sans">
                {files.length > 0 ? `${files.length} resumes selected` : "Select batch candidate resumes (PDF/DOCX)"}
              </p>
              <p className="text-[11px] text-slate-500 font-sans">
                Supports up to 15 files at once
              </p>
            </label>
          </div>

          {files.length > 0 && (
            <div className="max-h-32 overflow-y-auto space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs font-sans text-slate-700">
              {files.map((f, i) => (
                <div key={i} className="flex items-center justify-between py-0.5">
                  <span className="truncate max-w-[300px]">{f.name}</span>
                  <span className="text-slate-400 font-mono text-[10px]">{(f.size / 1024).toFixed(0)} KB</span>
                </div>
              ))}
            </div>
          )}

          {message && (
            <p className="text-xs font-sans text-rose-600">{message}</p>
          )}

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary text-xs"
            >
              Cancel
            </button>
            <button
              onClick={handleUploadAndRank}
              disabled={isLoading || files.length === 0}
              className="btn-primary text-xs disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Parsing & Ranking Candidates...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Run AI Batch Ranking
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
