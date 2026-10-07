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
  TrendingUp,
  Layers,
  Code,
  Trophy,
  FileText
} from 'lucide-react';
import { TransitionPanel } from '../core/transition-panel';
import OnCampusView from './OnCampusView';
import OffCampusView from './OffCampusView';
import ExperiencedView from './ExperiencedView';
import ResumeUploadModal from './ResumeUploadModal';
import ContributePlacementModal from './ContributePlacementModal';
import SkillRadarCard from './SkillRadarCard';
import ExploreContestsView from './ExploreContestsView';
import CompanyProjectsView from './CompanyProjectsView';
import HiringProposalsView from './HiringProposalsView';
import MLModelsHubView from './MLModelsHubView';

export default function DeveloperDashboard({
  currentUser,
  onUpdateUserSkills,
  onOpenOnboarding
}) {
  const [activeSubTrack, setActiveSubTrack] = useState(currentUser?.subTrack || 'on-campus');
  const [activeTab, setActiveTab] = useState('profile');
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
                <span className="font-sans tracking-wide text-xs bg-dark-700 text-brand-green border border-brand-green/30 px-2 py-0.5 rounded">
                  {currentUser?.track === 'fresher' ? 'Fresher Candidate' : 'Experienced Engineer'}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans tracking-wide mt-0.5">
                {currentUser?.college || currentUser?.currentCompany || "Developer Profile"} 
                {currentUser?.cgpa ? ` • ${currentUser.cgpa} CGPA` : (currentUser?.yearsOfExperience ? ` • ${currentUser.yearsOfExperience} YoE` : "")}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 mt-4 lg:mt-0">
            {currentUser?.githubUsername && (
              <a href={`https://github.com/${currentUser.githubUsername}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                <span className="text-sm font-sans tracking-wide">{currentUser.githubUsername}</span>
              </a>
            )}
            {currentUser?.contestRating && (
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <div>
                  <div className="text-sm font-bold text-white">{currentUser.contestRating}</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-sans tracking-wide">Rating</div>
                </div>
              </div>
            )}
            {currentUser?.projectsCompleted !== undefined && (
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-brand-green" />
                <div>
                  <div className="text-sm font-bold text-white">{currentUser.projectsCompleted}</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-sans tracking-wide">Projects</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Live Interactive Skills Tag Cloud & Radar Grid */}
        <div className="mt-5 pt-4 border-t border-dark-700/80 grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Left 2 Cols: Interactive Skills Cloud */}
          <div className="lg:col-span-2 space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-1">
              <p className="text-xs font-sans tracking-wide text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
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
            
            <p className="text-[11px] text-slate-500 font-sans tracking-wide">
              💡 Tip: Adding or removing skills updates your placement readiness scores and company fit matrices in real time.
            </p>
          </div>

          {/* Right 1 Col: Skill Domain Balance Radar */}
          <div className="lg:col-span-1">
            <SkillRadarCard userSkills={currentUser?.skills || []} />
          </div>

        </div>

      </div>

      {/* Top Navigation Tabs */}
      <div className="flex overflow-x-auto gap-2 bg-dark-800 p-1.5 rounded-xl border border-dark-700 scrollbar-hide">
        {[
          { id: 'profile', icon: <Code className="w-4 h-4" />, label: 'Skill Profile' },
          { id: 'contests', icon: <Trophy className="w-4 h-4" />, label: 'Explore Contests' },
          { id: 'projects', icon: <Briefcase className="w-4 h-4" />, label: 'Company Projects' },
          { id: 'proposals', icon: <FileText className="w-4 h-4" />, label: 'Hiring Proposals' },
          { id: 'ml-hub', icon: <Sparkles className="w-4 h-4 text-brand-green" />, label: 'AI Models Hub' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-sans tracking-wide font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-dark-700 text-brand-green border border-brand-green/30 shadow-glow-green'
                : 'text-slate-400 hover:text-slate-200 hover:bg-dark-750'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      {activeTab === 'profile' && (
        <TransitionPanel
          activeIndex={!isFresher ? 2 : activeSubTrack === 'on-campus' ? 0 : 1}
          variants={{
            enter: (direction) => ({ opacity: 0, x: direction > 0 ? 50 : -50, position: 'absolute', width: '100%' }),
            center: { opacity: 1, x: 0, position: 'relative' },
            exit: (direction) => ({ opacity: 0, x: direction < 0 ? 50 : -50, position: 'absolute', width: '100%' }),
          }}
          transition={{ duration: 0.3 }}
          custom={activeSubTrack === 'on-campus' ? -1 : 1}
        >
          <div key="on-campus">
            <OnCampusView
              currentUser={currentUser}
              onOpenResumeModal={() => setIsResumeModalOpen(true)}
              onOpenContributeModal={() => setIsContributeModalOpen(true)}
            />
          </div>
          <div key="off-campus">
            <OffCampusView
              currentUser={currentUser}
              onOpenResumeModal={() => setIsResumeModalOpen(true)}
            />
          </div>
          <div key="experienced">
            <ExperiencedView
              currentUser={currentUser}
              onOpenResumeModal={() => setIsResumeModalOpen(true)}
            />
          </div>
        </TransitionPanel>
      )}

      {activeTab === 'contests' && <ExploreContestsView currentUser={currentUser} />}
      {activeTab === 'projects' && <CompanyProjectsView currentUser={currentUser} />}
      {activeTab === 'proposals' && <HiringProposalsView currentUser={currentUser} />}
      {activeTab === 'ml-hub' && <MLModelsHubView currentUser={currentUser} />}

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
