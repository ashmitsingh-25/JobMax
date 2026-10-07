import React, { useEffect, useState } from 'react';
import { Briefcase, Plus, Users, Clock, Edit2, Play, X, CheckSquare, Star } from 'lucide-react';
import { api } from '../../services/api';

export default function CompanyProjectsManageView({ currentUser }) {
  const [projects, setProjects] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [managingProject, setManagingProject] = useState(null);
  const [evaluatingApp, setEvaluatingApp] = useState(null);

  const loadData = async () => {
    setLoading(true);
    const companyId = currentUser?.uid || 'user-company-1';
    const [projRes, appRes] = await Promise.all([
      api.getProjectsByCompany(companyId),
      api.getProjectApplications(companyId)
    ]);
    if (projRes.success) setProjects(projRes.projects);
    if (appRes.success) setApplications(appRes.applications);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newProject = {
      name: formData.get('name'),
      description: formData.get('description'),
      difficulty: formData.get('difficulty'),
      duration: formData.get('duration') + ' Days',
      maxParticipants: parseInt(formData.get('maxParticipants')),
      skills: formData.get('skills').split(',').map(s => s.trim()),
      companyId: currentUser?.uid || 'user-company-1',
      companyName: currentUser?.displayName || 'Company',
      status: 'active',
      deadline: formData.get('deadline'),
      reward: formData.get('reward')
    };
    
    await api.createProject(newProject);
    setShowCreateModal(false);
    loadData();
  };

  const handleEvaluateSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const evaluationData = {
      technicalSkills: parseInt(formData.get('techScore')),
      problemSolving: parseInt(formData.get('probScore')),
      codeQuality: parseInt(formData.get('codeScore')),
      overall: Math.round((parseInt(formData.get('techScore')) + parseInt(formData.get('probScore')) + parseInt(formData.get('codeScore'))) / 3),
      comments: formData.get('comments')
    };
    
    await api.evaluateProject(evaluatingApp.candidateId, evaluatingApp.projectId, evaluationData);
    setEvaluatingApp(null);
    loadData();
  };

  const handleSendProposal = async (app) => {
    const proposalData = {
      companyId: currentUser?.uid || 'user-company-1',
      companyName: currentUser?.displayName || 'TechNova',
      candidateId: app.candidateId,
      jobRole: "Software Engineer",
      jobDescription: "Based on your excellent project submission, we'd like to extend a hiring proposal.",
      employmentType: "Full-Time",
      ctc: "To be discussed",
      location: "Remote",
      workMode: "Remote"
    };
    const res = await api.sendProposal(proposalData);
    if (res.success) {
      alert("Hiring proposal sent successfully!");
    } else {
      alert("Failed to send proposal.");
    }
  };

  if (loading) return <div className="text-center p-12 text-slate-400">Loading projects...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-dark-800 p-6 rounded-xl border border-dark-700 shadow-card-dark">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-brand-green" /> Real-World Projects
          </h2>
          <p className="text-sm text-slate-400 mt-1">Assign projects to candidates to evaluate their hands-on skills.</p>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Create Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-dark-800 border border-dark-700 rounded-xl p-6 shadow-card-dark flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-white">{project.name}</h3>
                <span className="flex items-center gap-1 text-[10px] uppercase font-sans tracking-wide font-bold tracking-wider px-2 py-1 rounded bg-brand-green/10 text-brand-green border border-brand-green/30">
                  <Play className="w-3 h-3" /> {project.status}
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-4 line-clamp-2">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.skills.slice(0, 3).map(skill => (
                  <span key={skill} className="px-2 py-1 bg-dark-900 border border-dark-700 rounded text-xs font-sans tracking-wide text-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-dark-700">
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                  <Users className="w-4 h-4" /> <span className="font-sans tracking-wide text-white">{project.participants || 0}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                  <Clock className="w-4 h-4" /> <span className="font-sans tracking-wide text-white">{project.duration}</span>
                </div>
              </div>
              <button onClick={() => setManagingProject(project)} className="text-brand-cyan hover:text-white transition-colors flex items-center gap-1 text-sm font-medium">
                <Edit2 className="w-4 h-4" /> Manage
              </button>
            </div>
          </div>
        ))}

        <button onClick={() => setShowCreateModal(true)} className="border-2 border-dashed border-dark-600 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 hover:text-brand-green hover:border-brand-green/50 hover:bg-dark-800/50 transition-all min-h-[250px]">
          <div className="w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center mb-4 border border-dark-600">
            <Plus className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-300 mb-1">Create New Project</h3>
          <p className="text-sm text-center max-w-xs">Define a project for candidates to build and demonstrate their capabilities.</p>
        </button>
      </div>

      {/* CREATE PROJECT MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-dark-800 rounded-2xl border border-dark-700 p-6 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowCreateModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h2 className="text-2xl font-bold text-white mb-6">Create Project</h2>
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Project Name</label>
                <input required name="name" className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white" placeholder="e.g. Build an AI Resume Screener" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Description</label>
                <textarea required name="description" className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white h-24" placeholder="Describe the project requirements..."></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Difficulty</label>
                  <select name="difficulty" className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white">
                    <option>Intermediate</option><option>Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Duration (Days)</label>
                  <input required type="number" name="duration" className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white" min="1" defaultValue="7" />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Max Participants</label>
                  <input required type="number" name="maxParticipants" className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white" min="1" defaultValue="100" />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Reward</label>
                  <input required name="reward" className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white" placeholder="e.g. Interview Opportunity" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Required Skills (comma separated)</label>
                <input required name="skills" className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white" placeholder="React, Python, Machine Learning" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Deadline</label>
                <input required type="datetime-local" name="deadline" className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white" />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowCreateModal(false)} className="px-4 py-2 text-slate-400 hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="btn-primary">Publish Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MANAGE PROJECT MODAL */}
      {managingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-dark-800 rounded-2xl border border-dark-700 p-6 max-w-4xl w-full relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setManagingProject(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h2 className="text-2xl font-bold text-white mb-2">{managingProject.name}</h2>
            <p className="text-slate-400 mb-6">Manage submissions and evaluate candidates.</p>
            
            <div className="bg-dark-900 rounded-xl p-4 border border-dark-700 mb-6">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2"><CheckSquare className="w-4 h-4 text-brand-green"/> Project Submissions</h3>
              
              {applications.filter(a => a.projectId === managingProject.id).length === 0 ? (
                <p className="text-slate-400 text-sm">No submissions yet.</p>
              ) : (
                <div className="space-y-4">
                  {applications.filter(a => a.projectId === managingProject.id).map(app => (
                    <div key={app.candidateId} className="bg-dark-800 border border-dark-700 rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <h4 className="text-white font-bold">{app.candidateDetails?.name || 'Unknown Candidate'}</h4>
                        <p className="text-xs text-slate-400 mt-1">Status: <span className="uppercase text-brand-cyan">{app.status}</span></p>
                        {app.status === 'submitted' && app.submissionData && (
                          <div className="mt-2 text-sm text-slate-300">
                            <a href={app.submissionData.github} target="_blank" rel="noreferrer" className="text-brand-green hover:underline block">GitHub Repository</a>
                            <a href={app.submissionData.demo} target="_blank" rel="noreferrer" className="text-brand-cyan hover:underline block">Live Demo</a>
                          </div>
                        )}
                        {app.status === 'evaluated' && app.evaluationData && (
                          <div className="mt-2 text-sm text-brand-green font-sans tracking-wide">
                            Overall Score: {app.evaluationData.overall}/100
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        {app.status === 'submitted' && (
                          <button onClick={() => setEvaluatingApp(app)} className="bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30 px-3 py-1 rounded text-sm hover:bg-brand-cyan/20">
                            Evaluate
                          </button>
                        )}
                        {app.status === 'evaluated' && (
                          <button onClick={() => handleSendProposal(app)} className="bg-brand-green text-dark-900 font-bold px-3 py-1 rounded text-sm hover:bg-brand-green/90">
                            Send Proposal
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* EVALUATE SUBMISSION MODAL */}
      {evaluatingApp && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90">
          <div className="bg-dark-800 rounded-2xl border border-dark-700 p-6 max-w-lg w-full relative">
            <button onClick={() => setEvaluatingApp(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h2 className="text-xl font-bold text-white mb-4">Evaluate Submission</h2>
            <form onSubmit={handleEvaluateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Technical Skills Score (0-100)</label>
                <input required type="number" name="techScore" className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white" min="0" max="100" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Problem Solving Score (0-100)</label>
                <input required type="number" name="probScore" className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white" min="0" max="100" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Code Quality Score (0-100)</label>
                <input required type="number" name="codeScore" className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white" min="0" max="100" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Feedback Comments</label>
                <textarea name="comments" className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white h-24" placeholder="Great work on..."></textarea>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setEvaluatingApp(null)} className="px-4 py-2 text-slate-400 hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="btn-primary flex items-center gap-2"><Star className="w-4 h-4"/> Save Evaluation</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
