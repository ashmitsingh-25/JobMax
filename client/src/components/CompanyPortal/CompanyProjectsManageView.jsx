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

  if (loading) return <div className="text-center p-12 text-slate-500 font-sans text-sm">Loading projects...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs">
        <div>
          <h2 className="text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-blue-600" /> Real-World Projects
          </h2>
          <p className="text-xs text-slate-500 font-sans mt-0.5">Assign projects to candidates to evaluate their hands-on skills.</p>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="btn-primary flex items-center gap-1.5 text-xs py-2 px-3">
          <Plus className="w-3.5 h-3.5" /> Create Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map(project => (
          <div key={project.id} className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-blue-300 transition-all">
            <div>
              <div className="flex justify-between items-start mb-2.5">
                <h3 className="text-base font-heading font-bold text-slate-900">{project.name}</h3>
                <span className="flex items-center gap-1 text-[10px] uppercase font-sans font-semibold tracking-wider px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                  <Play className="w-3 h-3" /> {project.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-sans mb-4 line-clamp-2">{project.description}</p>
              
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.skills.slice(0, 3).map(skill => (
                  <span key={skill} className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-xs font-sans text-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3.5 border-t border-slate-100">
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-sans">
                  <Users className="w-3.5 h-3.5" /> <span className="font-mono font-semibold text-slate-800">{project.participants || 0}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-sans">
                  <Clock className="w-3.5 h-3.5" /> <span className="font-sans text-slate-700">{project.duration}</span>
                </div>
              </div>
              <button onClick={() => setManagingProject(project)} className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 text-xs font-medium font-sans">
                <Edit2 className="w-3.5 h-3.5" /> Manage
              </button>
            </div>
          </div>
        ))}

        <button onClick={() => setShowCreateModal(true)} className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-400 hover:bg-slate-50/50 transition-all min-h-[200px]">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-3 border border-slate-200 text-slate-600">
            <Plus className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-bold text-base text-slate-800 mb-1">Create New Project</h3>
          <p className="text-xs font-sans text-slate-500 text-center max-w-xs">Define a project for candidates to build and demonstrate their capabilities.</p>
        </button>
      </div>

      {/* CREATE PROJECT MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto shadow-xl">
            <button onClick={() => setShowCreateModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            <h2 className="text-xl font-heading font-bold text-slate-900 mb-5">Create Project</h2>
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-sans font-medium text-slate-600 mb-1">Project Name</label>
                <input required name="name" className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none" placeholder="e.g. Build an AI Resume Screener" />
              </div>
              <div>
                <label className="block text-xs font-sans font-medium text-slate-600 mb-1">Description</label>
                <textarea required name="description" className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none h-20" placeholder="Describe the project requirements..."></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans font-medium text-slate-600 mb-1">Difficulty</label>
                  <select name="difficulty" className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none">
                    <option>Intermediate</option><option>Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-sans font-medium text-slate-600 mb-1">Duration (Days)</label>
                  <input required type="number" name="duration" className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none" min="1" defaultValue="7" />
                </div>
                <div>
                  <label className="block text-xs font-sans font-medium text-slate-600 mb-1">Max Participants</label>
                  <input required type="number" name="maxParticipants" className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none" min="1" defaultValue="100" />
                </div>
                <div>
                  <label className="block text-xs font-sans font-medium text-slate-600 mb-1">Reward</label>
                  <input required name="reward" className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none" placeholder="e.g. Interview Opportunity" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-sans font-medium text-slate-600 mb-1">Required Skills (comma separated)</label>
                <input required name="skills" className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none" placeholder="React, Python, Machine Learning" />
              </div>
              <div>
                <label className="block text-xs font-sans font-medium text-slate-600 mb-1">Deadline</label>
                <input required type="datetime-local" name="deadline" className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none" />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowCreateModal(false)} className="px-4 py-2 text-xs font-sans text-slate-600 hover:text-slate-900 transition-colors">Cancel</button>
                <button type="submit" className="btn-primary text-xs py-2 px-4">Publish Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MANAGE PROJECT MODAL */}
      {managingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-4xl w-full relative max-h-[90vh] overflow-y-auto shadow-xl">
            <button onClick={() => setManagingProject(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            <h2 className="text-xl font-heading font-bold text-slate-900 mb-1">{managingProject.name}</h2>
            <p className="text-xs font-sans text-slate-500 mb-5">Manage submissions and evaluate candidates.</p>
            
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-6">
              <h3 className="text-slate-900 font-heading font-bold text-sm mb-3 flex items-center gap-2"><CheckSquare className="w-4 h-4 text-teal-600"/> Project Submissions</h3>
              
              {applications.filter(a => a.projectId === managingProject.id).length === 0 ? (
                <p className="text-slate-500 font-sans text-xs">No submissions yet.</p>
              ) : (
                <div className="space-y-3">
                  {applications.filter(a => a.projectId === managingProject.id).map(app => (
                    <div key={app.candidateId} className="bg-white border border-slate-200 rounded-lg p-4 flex justify-between items-center shadow-xs">
                      <div>
                        <h4 className="text-slate-900 font-semibold font-sans text-sm">{app.candidateDetails?.name || 'Unknown Candidate'}</h4>
                        <p className="text-xs text-slate-500 font-sans mt-0.5">Status: <span className="uppercase font-semibold text-blue-600">{app.status}</span></p>
                        {app.status === 'submitted' && app.submissionData && (
                          <div className="mt-2 text-xs space-y-1">
                            <a href={app.submissionData.github} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline block font-mono">GitHub Repository</a>
                            <a href={app.submissionData.demo} target="_blank" rel="noreferrer" className="text-teal-700 hover:underline block font-mono">Live Demo</a>
                          </div>
                        )}
                        {app.status === 'evaluated' && app.evaluationData && (
                          <div className="mt-2 text-xs text-teal-700 font-mono font-bold">
                            Overall Score: {app.evaluationData.overall}/100
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        {app.status === 'submitted' && (
                          <button onClick={() => setEvaluatingApp(app)} className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors">
                            Evaluate
                          </button>
                        )}
                        {app.status === 'evaluated' && (
                          <button onClick={() => handleSendProposal(app)} className="bg-teal-600 text-white font-medium px-3.5 py-1.5 rounded-lg text-xs hover:bg-teal-700 transition-colors shadow-xs">
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
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-lg w-full relative shadow-xl">
            <button onClick={() => setEvaluatingApp(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            <h2 className="text-xl font-heading font-bold text-slate-900 mb-4">Evaluate Submission</h2>
            <form onSubmit={handleEvaluateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-sans font-medium text-slate-600 mb-1">Technical Skills Score (0-100)</label>
                <input required type="number" name="techScore" className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none" min="0" max="100" />
              </div>
              <div>
                <label className="block text-xs font-sans font-medium text-slate-600 mb-1">Problem Solving Score (0-100)</label>
                <input required type="number" name="probScore" className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none" min="0" max="100" />
              </div>
              <div>
                <label className="block text-xs font-sans font-medium text-slate-600 mb-1">Code Quality Score (0-100)</label>
                <input required type="number" name="codeScore" className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none" min="0" max="100" />
              </div>
              <div>
                <label className="block text-xs font-sans font-medium text-slate-600 mb-1">Feedback Comments</label>
                <textarea name="comments" className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none h-20" placeholder="Great work on..."></textarea>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setEvaluatingApp(null)} className="px-4 py-2 text-xs font-sans text-slate-600 hover:text-slate-900 transition-colors">Cancel</button>
                <button type="submit" className="btn-primary flex items-center gap-1.5 text-xs py-2 px-4"><Star className="w-3.5 h-3.5"/> Save Evaluation</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
