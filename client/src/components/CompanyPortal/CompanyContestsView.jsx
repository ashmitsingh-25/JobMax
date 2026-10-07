import React, { useEffect, useState } from 'react';
import { Trophy, Plus, Users, Clock, Edit2, Play, CheckCircle2, X, BarChart3 } from 'lucide-react';
import { api } from '../../services/api';

export default function CompanyContestsView({ currentUser }) {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [managingContest, setManagingContest] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);

  const loadContests = () => {
    setLoading(true);
    api.getContestsByCompany(currentUser.uid || 'user-company-1').then(res => {
      if (res.success) setContests(res.contests);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadContests();
  }, []);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContest = {
      name: formData.get('name'),
      description: formData.get('description'),
      technology: formData.get('technology'),
      difficulty: formData.get('difficulty'),
      duration: formData.get('duration') + ' Hours',
      maxParticipants: parseInt(formData.get('maxParticipants')),
      skills: formData.get('skills').split(',').map(s => s.trim()),
      companyId: currentUser.uid || 'user-company-1',
      companyName: currentUser.displayName || 'Company',
      status: 'draft',
      deadline: formData.get('deadline')
    };
    
    await api.createContest(newContest);
    setShowCreateModal(false);
    loadContests();
  };

  const handleUpdateStatus = async (id, status) => {
    await api.updateContestStatus(id, status);
    loadContests();
    setManagingContest(null);
  };

  const handleViewLeaderboard = async (id) => {
    const res = await api.getLeaderboard(id);
    if (res.success) setLeaderboard(res.leaderboard);
  };

  const handleShortlist = async (candidateId) => {
    const res = await api.shortlistCandidate(currentUser.uid || 'user-company-1', candidateId, managingContest.id);
    if (res.success) {
      alert("Candidate shortlisted successfully!");
    } else {
      alert(res.message);
    }
  };

  if (loading) return <div className="text-center p-12 text-slate-400">Loading contests...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-dark-800 p-6 rounded-xl border border-dark-700 shadow-card-dark">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-brand-green" /> Skill Contests
          </h2>
          <p className="text-sm text-slate-400 mt-1">Create and manage coding challenges to evaluate real-world skills.</p>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Create Contest
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contests.map(contest => (
          <div key={contest.id} className="bg-dark-800 border border-dark-700 rounded-xl p-6 shadow-card-dark flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-white">{contest.name}</h3>
                <span className={`flex items-center gap-1 text-[10px] uppercase font-sans tracking-wide font-bold tracking-wider px-2 py-1 rounded border ${
                  contest.status === 'active' ? 'bg-brand-green/10 text-brand-green border-brand-green/30' :
                  contest.status === 'draft' ? 'bg-slate-500/10 text-slate-400 border-slate-500/30' :
                  'bg-red-500/10 text-red-400 border-red-500/30'
                }`}>
                  <Play className="w-3 h-3" /> {contest.status}
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-4 line-clamp-2">{contest.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {contest.skills.slice(0, 3).map(skill => (
                  <span key={skill} className="px-2 py-1 bg-dark-900 border border-dark-700 rounded text-xs font-sans tracking-wide text-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-dark-700">
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                  <Users className="w-4 h-4" /> <span className="font-sans tracking-wide text-white">{contest.participants || 0}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                  <Clock className="w-4 h-4" /> <span className="font-sans tracking-wide text-white">{contest.duration}</span>
                </div>
              </div>
              <button onClick={() => setManagingContest(contest)} className="text-brand-cyan hover:text-white transition-colors flex items-center gap-1 text-sm font-medium">
                <Edit2 className="w-4 h-4" /> Manage
              </button>
            </div>
          </div>
        ))}

        {/* Empty State / Create Prompt */}
        <button onClick={() => setShowCreateModal(true)} className="border-2 border-dashed border-dark-600 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 hover:text-brand-green hover:border-brand-green/50 hover:bg-dark-800/50 transition-all min-h-[250px]">
          <div className="w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center mb-4 border border-dark-600">
            <Plus className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-300 mb-1">Create New Contest</h3>
          <p className="text-sm text-center max-w-xs">Publish a new technical challenge to discover top candidates automatically.</p>
        </button>
      </div>

      {/* CREATE CONTEST MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-dark-800 rounded-2xl border border-dark-700 p-6 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowCreateModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h2 className="text-2xl font-bold text-white mb-6">Create Contest</h2>
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Contest Name</label>
                <input required name="name" className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white" placeholder="e.g. Frontend Architecture Challenge" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Description</label>
                <textarea required name="description" className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white h-24" placeholder="Describe the tasks..."></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Technology</label>
                  <input required name="technology" className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white" placeholder="e.g. React.js" />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Difficulty</label>
                  <select name="difficulty" className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white">
                    <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Duration (Hours)</label>
                  <input required type="number" name="duration" className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white" min="1" max="48" defaultValue="2" />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Max Participants</label>
                  <input required type="number" name="maxParticipants" className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white" min="1" defaultValue="500" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Skills Evaluated (comma separated)</label>
                <input required name="skills" className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white" placeholder="React, State Management, CSS" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Deadline</label>
                <input required type="datetime-local" name="deadline" className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-white" />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowCreateModal(false)} className="px-4 py-2 text-slate-400 hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="btn-primary">Save Draft</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MANAGE CONTEST MODAL */}
      {managingContest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-dark-800 rounded-2xl border border-dark-700 p-6 max-w-4xl w-full relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => { setManagingContest(null); setLeaderboard(null); }} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <div className="flex justify-between items-start mb-6 pr-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{managingContest.name}</h2>
                <div className="flex gap-4 text-sm text-slate-400">
                  <span>Status: <strong className="text-white uppercase">{managingContest.status}</strong></span>
                  <span>Participants: <strong className="text-white">{managingContest.participants || 0}</strong></span>
                </div>
              </div>
              <div className="flex gap-2">
                {managingContest.status === 'draft' && (
                  <button onClick={() => handleUpdateStatus(managingContest.id, 'active')} className="bg-brand-green text-dark-900 px-4 py-2 rounded-lg font-bold hover:bg-brand-green/90 transition-colors">
                    Activate Contest
                  </button>
                )}
                {managingContest.status === 'active' && (
                  <button onClick={() => handleUpdateStatus(managingContest.id, 'ended')} className="bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-lg font-bold hover:bg-red-500/30 transition-colors">
                    End Contest
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1 space-y-4">
                <div className="bg-dark-900 p-4 rounded-xl border border-dark-700">
                  <h3 className="text-white font-bold mb-2">Contest Details</h3>
                  <p className="text-sm text-slate-400 mb-2"><strong>Duration:</strong> {managingContest.duration}</p>
                  <p className="text-sm text-slate-400 mb-2"><strong>Difficulty:</strong> {managingContest.difficulty}</p>
                  <p className="text-sm text-slate-400 mb-2"><strong>Deadline:</strong> {new Date(managingContest.deadline).toLocaleString()}</p>
                  <div className="mt-4">
                    <button onClick={() => handleViewLeaderboard(managingContest.id)} className="w-full flex items-center justify-center gap-2 bg-dark-800 border border-dark-600 hover:border-brand-cyan px-4 py-2 rounded-lg text-slate-300 transition-colors">
                      <BarChart3 className="w-4 h-4" /> View Leaderboard
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                {leaderboard ? (
                  <div className="bg-dark-900 p-4 rounded-xl border border-dark-700">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Trophy className="w-4 h-4 text-brand-green"/> Live Leaderboard</h3>
                    {leaderboard.length === 0 ? (
                      <p className="text-slate-400 text-sm">No submissions yet.</p>
                    ) : (
                      <div className="space-y-2">
                        {leaderboard.map(cand => (
                          <div key={cand.id} className="flex items-center justify-between bg-dark-800 p-3 rounded-lg border border-dark-700">
                            <div className="flex items-center gap-3">
                              <span className="text-brand-green font-sans tracking-wide font-bold w-6">#{cand.rank}</span>
                              <div>
                                <p className="text-white font-medium">{cand.name}</p>
                                <p className="text-xs text-slate-400">Score: {cand.score} | Time: {cand.time}</p>
                              </div>
                            </div>
                            <button onClick={() => handleShortlist(cand.id)} className="px-3 py-1 bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30 rounded hover:bg-brand-cyan/20 transition-colors text-xs font-bold uppercase">
                              Shortlist
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-dark-900 p-8 rounded-xl border border-dark-700 flex flex-col items-center justify-center text-center text-slate-500 h-full">
                    <BarChart3 className="w-12 h-12 mb-4 opacity-50" />
                    <p>Click "View Leaderboard" to see candidate performance.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
