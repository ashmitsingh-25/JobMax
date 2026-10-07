import React, { useEffect, useState } from 'react';
import { Briefcase, Clock, Users, ChevronRight, Award, CheckCircle2, Code, X } from 'lucide-react';
import { api } from '../../services/api';

export default function CompanyProjectsView({ currentUser }) {
  const [projects, setProjects] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState(null);
  
  const loadData = async () => {
    setLoading(true);
    const userId = currentUser?.uid || 'user-fresher-1';
    
    // We get all projects and all applications for the mock ecosystem. 
    // In a real app we would filter by user. Since it's mock, we'll just pull the data.
    const projRes = await api.getProjects();
    if (projRes.success) setProjects(projRes.projects.filter(p => p.status === 'active'));
    
    // Since getProjectApplications in API requires companyId currently, 
    // let's directly read local storage to get candidate's applications for the demo
    const apps = JSON.parse(localStorage.getItem('jobmax_project_applications') || '[]');
    setMyApplications(apps.filter(a => a.candidateId === userId));
    
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApply = async (project) => {
    const userId = currentUser?.uid || 'user-fresher-1';
    const userDetails = {
      name: currentUser?.displayName || 'Test Candidate',
      skills: ['React', 'JavaScript', 'Node.js'],
      github: 'test-user-github'
    };
    
    const res = await api.applyForProject(userId, userDetails, project.id);
    if (res.success) {
      loadData();
    } else {
      alert(res.message);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const userId = currentUser?.uid || 'user-fresher-1';
    const formData = new FormData(e.target);
    const submissionData = {
      github: formData.get('github'),
      demo: formData.get('demo'),
      notes: formData.get('notes')
    };
    
    const res = await api.submitProjectWork(userId, activeProject.id, submissionData);
    if (res.success) {
      setActiveProject(null);
      loadData();
    } else {
      alert(res.message);
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
          <p className="text-xs text-slate-500 font-sans mt-0.5">Contribute to actual company projects and bypass traditional interviews.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map(project => {
          const application = myApplications.find(a => a.projectId === project.id);
          const hasApplied = !!application;
          
          return (
            <div key={project.id} className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs flex flex-col md:flex-row gap-6 hover:border-blue-300 transition-all">
              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-heading font-bold text-slate-900 mb-0.5">{project.name}</h3>
                    <p className="text-xs text-blue-700 font-sans font-medium">{project.companyName}</p>
                  </div>
                  <span className="px-2.5 py-0.5 bg-slate-50 text-[11px] font-sans text-slate-600 rounded-full border border-slate-200">
                    {project.difficulty}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-sans leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.skills.map(skill => (
                    <span key={skill} className="px-2 py-0.5 bg-slate-50 text-slate-700 border border-slate-200 rounded text-xs font-sans">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col justify-between md:w-64 shrink-0 bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="space-y-2.5 text-xs font-sans">
                  <div className="flex justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-400" /> Timeline</span>
                    <span className="text-slate-800 font-medium">{project.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-slate-400" /> Working</span>
                    <span className="text-slate-800 font-mono">{project.participants} / {project.maxParticipants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-slate-400" /> Reward</span>
                    <span className="text-teal-700 font-medium text-right max-w-[120px] truncate">{project.reward}</span>
                  </div>
                </div>
                
                {hasApplied ? (
                  application.status === 'applied' ? (
                    <button onClick={() => setActiveProject(project)} className="w-full mt-4 bg-teal-600 text-white font-medium py-2 px-3 rounded-lg flex justify-center items-center gap-2 hover:bg-teal-700 transition-colors text-xs shadow-xs">
                      <Code className="w-3.5 h-3.5" /> Submit Work
                    </button>
                  ) : (
                    <button disabled className="w-full mt-4 bg-slate-100 text-teal-700 border border-teal-200 font-medium py-2 px-3 rounded-lg flex justify-center items-center gap-2 cursor-not-allowed text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {application.status === 'evaluated' ? 'Evaluated' : 'Submitted'}
                    </button>
                  )
                ) : (
                  <button onClick={() => handleApply(project)} className="btn-primary w-full mt-4 flex justify-center items-center gap-1.5 text-xs py-2">
                    Join Project <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {projects.length === 0 && (
          <div className="text-center p-12 bg-white rounded-xl border border-slate-200 shadow-xs">
            <Briefcase className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-heading font-bold text-slate-800">No active projects</h3>
            <p className="text-xs font-sans text-slate-500 mt-1">Companies will post real-world projects here soon.</p>
          </div>
        )}
      </div>

      {/* SUBMIT WORK MODAL */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-2xl w-full relative shadow-xl">
            <button onClick={() => setActiveProject(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            <h2 className="text-xl font-heading font-bold text-slate-900 mb-1">Submit Project Work</h2>
            <p className="text-xs font-sans text-slate-500 mb-5">Submit your solution for <strong>{activeProject.name}</strong>.</p>
            
            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-sans font-medium text-slate-600 mb-1">GitHub Repository URL</label>
                <input required type="url" name="github" className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none" placeholder="https://github.com/username/repo" />
              </div>
              <div>
                <label className="block text-xs font-sans font-medium text-slate-600 mb-1">Live Demo URL (Optional)</label>
                <input type="url" name="demo" className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none" placeholder="https://my-demo.vercel.app" />
              </div>
              <div>
                <label className="block text-xs font-sans font-medium text-slate-600 mb-1">Submission Notes</label>
                <textarea required name="notes" className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none h-24" placeholder="Briefly describe your approach and any setup instructions..."></textarea>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setActiveProject(null)} className="px-4 py-2 text-xs font-sans text-slate-600 hover:text-slate-900 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs py-2 px-6">
                  Submit Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
