import React, { useState } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  School, 
  Globe, 
  Sparkles, 
  Plus, 
  X, 
  CheckCircle2, 
  Upload, 
  Code, 
  TrendingUp,
  Layers
} from 'lucide-react';
import OnCampusView from './OnCampusView';
import OffCampusView from './OffCampusView';
import ExperiencedView from './ExperiencedView';
import ResumeUploadModal from './ResumeUploadModal';
import ContributePlacementModal from './ContributePlacementModal';
import SkillRadarCard from './SkillRadarCard';

export default function DeveloperDashboard({
  currentUser,
  onUpdateUserSkills,
  onOpenOnboarding
}) {
  const [activeSubTrack, setActiveSubTrack] = useState(currentUser?.subTrack || 'on-campus');
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isContributeModalOpen, setIsContributeModalOpen] = useState(false);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [colleges, setColleges] = useState([]);

  const isFresher = currentUser?.track === 'fresher';

  // Add custom skill to profile
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillInput.trim()) return;
    const skillToAdd = newSkillInput.trim();
    if (!currentUser.skills.some(s => s.toLowerCase() === skillToAdd.toLowerCase())) {
      onUpdateUserSkills([...currentUser.skills, skillToAdd]);
    }
    setNewSkillInput('');
  };

  // Remove skill from profile
  const handleRemoveSkill = (skillToRemove) => {
    onUpdateUserSkills(currentUser.skills.filter(s => s !== skillToRemove));
  };

  // Callback from AI Resume Extractor
  const handleSkillsExtracted = (extractedSkills, metadata) => {
    const merged = Array.from(new Set([...currentUser.skills, ...extractedSkills]));
    onUpdateUserSkills(merged, metadata);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Top Track & Profile Bar */}
      <div className="bg-dark-800 border border-dark-700 rounded-xl p-5 shadow-card-dark">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
              alt={currentUser?.name}
              className="w-12 h-12 rounded-xl object-cover border-2 border-brand-green shadow-glow-green"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{currentUser?.name}</h2>
                <span className="font-mono text-xs bg-dark-700 text-brand-green border border-brand-green/30 px-2 py-0.5 rounded">
                  {currentUser?.track === 'fresher' ? 'Fresher Candidate' : 'Experienced Engineer'}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-mono mt-0.5">
                {currentUser?.college || currentUser?.currentCompany || "Developer Profile"} 
                {currentUser?.cgpa ? ` • ${currentUser.cgpa} CGPA` : (currentUser?.yearsOfExperience ? ` • ${currentUser.yearsOfExperience} YoE` : "")}
              </p>
            </div>
          </div>

          {/* Sub-Track Switcher (for Freshers: On-Campus vs Off-Campus) */}
          {isFresher ? (
            <div className="flex items-center bg-dark-850 p-1.5 rounded-xl border border-dark-700 w-full lg:w-auto">
              <button
                onClick={() => setActiveSubTrack('on-campus')}
                className={`flex-1 lg:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeSubTrack === 'on-campus'
                    ? 'bg-dark-700 text-brand-green border border-brand-green/30 shadow-glow-green'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <School className="w-3.5 h-3.5" />
                2A. On-Campus Placement Path
              </button>

              <button
                onClick={() => setActiveSubTrack('off-campus')}
                className={`flex-1 lg:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeSubTrack === 'off-campus'
                    ? 'bg-dark-700 text-brand-cyan border border-brand-cyan/30 shadow-glow-blue'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                2B. Off-Campus Market Path
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-mono bg-dark-850 border border-brand-purple/40 px-3.5 py-2 rounded-lg text-brand-purple">
              <TrendingUp className="w-4 h-4" />
              <span>Experienced Career Growth & Promotion Engine Active</span>
            </div>
          )}

        </div>

        {/* Live Interactive Skills Tag Cloud & Radar Grid */}
        <div className="mt-5 pt-4 border-t border-dark-700/80 grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Left 2 Cols: Interactive Skills Cloud */}
          <div className="lg:col-span-2 space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-1">
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-brand-green" />
                Your Verified Skill Profile ({currentUser?.skills?.length || 0}):
              </p>

              <form onSubmit={handleAddSkill} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="+ Add skill (e.g. Docker, Kafka)"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  className="input-hr text-xs py-1 px-3 w-48 sm:w-56"
                />
                <button type="submit" className="btn-outline-green text-xs py-1 px-2.5">
                  <Plus className="w-3 h-3" /> Add
                </button>
              </form>
            </div>

            <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-3 bg-dark-850 rounded-xl border border-dark-700/80">
              {currentUser?.skills?.map(skill => (
                <span key={skill} className="badge-matched text-xs group">
                  <CheckCircle2 className="w-3 h-3 text-brand-green" />
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-rose-400 opacity-60 group-hover:opacity-100 ml-1"
                    title="Remove skill"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            
            <p className="text-[11px] text-slate-500 font-mono">
              💡 Tip: Adding or removing skills updates your placement readiness scores and company fit matrices in real time.
            </p>
          </div>

          {/* Right 1 Col: Skill Domain Balance Radar */}
          <div className="lg:col-span-1">
            <SkillRadarCard userSkills={currentUser?.skills || []} />
          </div>

        </div>

      </div>

      {/* Main Path Views */}
      {isFresher ? (
        activeSubTrack === 'on-campus' ? (
          <OnCampusView
            currentUser={currentUser}
            onOpenResumeModal={() => setIsResumeModalOpen(true)}
            onOpenContributeModal={() => setIsContributeModalOpen(true)}
          />
        ) : (
          <OffCampusView
            currentUser={currentUser}
            onOpenResumeModal={() => setIsResumeModalOpen(true)}
          />
        )
      ) : (
        <ExperiencedView
          currentUser={currentUser}
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
        />
      )}

      {/* Modals */}
      {isResumeModalOpen && (
        <ResumeUploadModal
          isOpen={isResumeModalOpen}
          onClose={() => setIsResumeModalOpen(false)}
          onSkillsExtracted={handleSkillsExtracted}
        />
      )}

      {isContributeModalOpen && (
        <ContributePlacementModal
          isOpen={isContributeModalOpen}
          onClose={() => setIsContributeModalOpen(false)}
          colleges={[
            { id: "iit-delhi", name: "IIT Delhi", tier: "Tier 1" },
            { id: "bits-pilani", name: "BITS Pilani", tier: "Tier 1" },
            { id: "nit-trichy", name: "NIT Trichy", tier: "Tier 1" },
            { id: "dtu", name: "DTU", tier: "Tier 1.5" },
            { id: "vit-vellore", name: "VIT Vellore", tier: "Tier 2" }
          ]}
          defaultCollegeId={currentUser?.collegeId || "iit-delhi"}
          onRecordAdded={() => {}}
        />
      )}

    </div>
  );
}
