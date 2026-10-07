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

  if (loading) return <div className="text-center p-12 text-slate-400">Loading projects...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-brand-green" /> Real-World Projects
          </h2>
          <p className="text-sm text-slate-400">Contribute to actual company projects and bypass traditional interviews.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {projects.map(project => {
          const application = myApplications.find(a => a.projectId === project.id);
          const hasApplied = !!application;
          
          return (
            <div key={project.id} className="bg-dark-800 border border-dark-700 rounded-xl p-6 shadow-card-dark flex flex-col md:flex-row gap-6 hover:border-brand-green/30 transition-colors">
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{project.name}</h3>
                    <p className="text-sm text-brand-green font-sans tracking-wide">{project.companyName}</p>
                  </div>
                  <span className="px-3 py-1 bg-dark-700 text-xs font-sans tracking-wide text-slate-300 rounded-full border border-dark-600">
                    {project.difficulty}
                  </span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.skills.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-dark-850 text-slate-300 border border-dark-700 rounded text-xs font-sans tracking-wide">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col justify-between md:w-64 shrink-0 bg-dark-850 rounded-lg p-4 border border-dark-700">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400 flex items-center gap-1.5"><Clock className="w-4 h-4" /> Timeline</span>
                    <span className="text-white font-sans tracking-wide">{project.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400 flex items-center gap-1.5"><Users className="w-4 h-4" /> Working</span>
                    <span className="text-white font-sans tracking-wide">{project.participants} / {project.maxParticipants}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400 flex items-center gap-1.5"><Award className="w-4 h-4" /> Reward</span>
                    <span className="text-white font-sans tracking-wide text-xs text-right max-w-[100px]">{project.reward}</span>
                  </div>
                </div>
                
                {hasApplied ? (
                  application.status === 'applied' ? (
                    <button onClick={() => setActiveProject(project)} className="w-full mt-4 bg-brand-cyan text-dark-900 font-bold py-2 px-4 rounded-lg flex justify-center items-center gap-2 hover:bg-brand-cyan/90 transition-colors">
                      <Code className="w-4 h-4" /> Submit Work
                    </button>
                  ) : (
                    <button disabled className="w-full mt-4 bg-dark-700 text-brand-green border border-brand-green/30 font-bold py-2 px-4 rounded-lg flex justify-center items-center gap-2 cursor-not-allowed">
                      <CheckCircle2 className="w-4 h-4" /> {application.status === 'evaluated' ? 'Evaluated' : 'Submitted'}
                    </button>
                  )
                ) : (
                  <button onClick={() => handleApply(project)} className="btn-primary w-full mt-4 flex justify-center items-center gap-2">
                    Join Project <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {projects.length === 0 && (
          <div className="text-center p-12 bg-dark-800 rounded-xl border border-dark-700">
            <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white">No active projects</h3>
            <p className="text-slate-400 mt-2">Companies will post real-world projects here soon.</p>
          </div>
        )}
      </div>

      {/* SUBMIT WORK MODAL */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
          <div className="bg-dark-800 rounded-2xl border border-dark-700 p-8 max-w-2xl w-full relative">
            <button onClick={() => setActiveProject(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h2 className="text-2xl font-bold text-white mb-2">Submit Project Work</h2>
            <p className="text-slate-400 mb-6">Submit your solution for <strong>{activeProject.name}</strong>.</p>
            
            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">GitHub Repository URL</label>
                <input required type="url" name="github" className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white" placeholder="https://github.com/username/repo" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Live Demo URL (Optional)</label>
                <input type="url" name="demo" className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white" placeholder="https://my-demo.vercel.app" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Submission Notes</label>
                <textarea required name="notes" className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white h-32" placeholder="Briefly describe your approach and any setup instructions..."></textarea>
              </div>
              
              <div className="flex justify-end gap-4 mt-8">
                <button type="button" onClick={() => setActiveProject(null)} className="px-6 py-2 text-slate-400 hover:text-white transition-colors">
                  Cancel
                </button>
                <button type="submit" className="btn-primary px-8">
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
