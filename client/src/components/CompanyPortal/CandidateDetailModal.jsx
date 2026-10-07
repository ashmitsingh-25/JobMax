import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ExternalLink, 
  Mail, 
  Award, 
  Code, 
  Sparkles, 
  Send, 
  Star, 
  Layers, 
  Briefcase, 
  GraduationCap 
} from 'lucide-react';

import confetti from 'canvas-confetti';

export default function CandidateDetailModal({ isOpen, onClose, candidate, roleTitle }) {
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);

  if (!isOpen || !candidate) return null;

  const handleShortlist = () => {
    setIsShortlisted(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 }
    });
  };

  const handleSendInvite = () => {
    setInviteSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white border border-slate-200/90 w-full max-w-3xl rounded-xl p-6 sm:p-7 shadow-xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 mb-5 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <img
              src={candidate?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
              alt={candidate?.name || "Candidate"}
              className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-xl text-slate-900">{candidate?.name || "Candidate"}</h3>
                <span className="text-xs font-sans font-semibold bg-teal-50 text-teal-700 px-2 py-0.5 rounded border border-teal-200">
                  {candidate?.fitScore || 85}% Fit Score
                </span>
              </div>
              <p className="text-xs text-slate-600 font-sans mt-0.5">{candidate?.headline || ""}</p>
              <div className="flex items-center gap-3 text-[11px] text-slate-500 font-sans mt-1">
                <span>{candidate?.college || "Engineering"}</span>
                <span>•</span>
                <span>{candidate?.cgpa ? `${candidate.cgpa} CGPA` : `${candidate?.yearsOfExperience || 2} YoE`}</span>
                {candidate?.githubUsername && (
                  <>
                    <span>•</span>
                    <a href={`https://github.com/${candidate.githubUsername}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                      {candidate.githubUsername}
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Evaluation Summary vs Role */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-sans text-slate-500 uppercase tracking-wider font-semibold">
              Evaluated Against: <strong className="text-slate-900">{roleTitle || "Open Role"}</strong>
            </p>
            <span className="text-xs font-sans font-semibold text-teal-700">
              {candidate.matchedSkills?.length || 0} Matched / {candidate.missingSkills?.length || 0} Gaps
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Matched Skills */}
            <div className="space-y-2">
              <span className="text-[11px] font-sans text-teal-700 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Matching Skills:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {candidate.matchedSkills?.map(s => (
                  <span key={s} className="badge-matched text-[11px]">
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="space-y-2">
              <span className="text-[11px] font-sans text-rose-700 flex items-center gap-1 font-semibold">
                <XCircle className="w-3.5 h-3.5" />
                Identified Skill Gaps:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {candidate.missingSkills && candidate.missingSkills.length > 0 ? (
                  candidate.missingSkills.map(s => (
                    <span key={s} className="badge-missing text-[11px]">
                      ✗ {s}
                    </span>
                  ))
                ) : (
                  <span className="text-xs font-sans text-teal-700 font-medium">Zero Critical Gaps Found!</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* AI-Generated Tailored Interview Questions based on Candidate Gaps */}
        {candidate.customInterviewQuestions && candidate.customInterviewQuestions.length > 0 && (
          <div className="space-y-3 mb-5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h4 className="font-heading font-bold text-sm text-slate-900">
                AI Gap-Calibrated Interview Questions
              </h4>
            </div>
            <p className="text-xs text-slate-500 font-sans">
              Auto-generated technical prompts to probe candidate's specific missing or weaker areas
            </p>

            <div className="space-y-2.5">
              {candidate.customInterviewQuestions.map((q, idx) => (
                <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-sans text-blue-700 font-semibold">
                      Target Area: {q.skill}
                    </span>
                    <span className="text-[10px] font-sans text-slate-400">Probe Question 0{idx+1}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans">
                    "{q.question}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notable Projects */}
        {candidate.projects && candidate.projects.length > 0 && (
          <div className="space-y-3 mb-5">
            <h4 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
              <Code className="w-4 h-4 text-blue-600" />
              Key Flagship Projects
            </h4>
            <div className="space-y-2.5">
              {candidate.projects.map((proj, pi) => (
                <div key={pi} className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <h5 className="font-semibold text-slate-900 text-xs font-sans">{proj.title}</h5>
                    <span className="text-[10px] font-mono font-medium text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                      {proj.tech}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-3">
            {candidate.github && (
              <a href={candidate.github} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900 flex items-center gap-1.5 text-xs font-sans">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub
              </a>
            )}
            {candidate.linkedin && (
              <a href={candidate.linkedin} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-blue-600 flex items-center gap-1.5 text-xs font-sans">
                <svg className="w-4 h-4 fill-current text-blue-600" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                LinkedIn
              </a>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleShortlist}
              disabled={isShortlisted}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-semibold font-sans flex items-center justify-center gap-1.5 transition-all ${
                isShortlisted 
                  ? 'bg-teal-50 text-teal-700 border border-teal-300' 
                  : 'btn-secondary text-slate-700 hover:text-teal-700'
              }`}
            >
              <Star className="w-3.5 h-3.5 text-amber-500" />
              {isShortlisted ? 'Shortlisted ✓' : 'Shortlist Candidate'}
            </button>

            <button
              onClick={handleSendInvite}
              disabled={inviteSent}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-semibold font-sans flex items-center justify-center gap-1.5 transition-all ${
                inviteSent
                  ? 'bg-slate-100 text-slate-500 border border-slate-200'
                  : 'btn-primary'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              {inviteSent ? 'Proposal Sent ✓' : 'Send Job Proposal'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
