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

  if (loading) return <div className="text-center p-12 text-slate-500 font-sans text-sm">Loading contests...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs">
        <div>
          <h2 className="text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-teal-600" /> Skill Contests
          </h2>
          <p className="text-xs text-slate-500 font-sans mt-0.5">Create and manage coding challenges to evaluate real-world skills.</p>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="btn-primary flex items-center gap-1.5 text-xs py-2 px-3">
          <Plus className="w-3.5 h-3.5" /> Create Contest
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {contests.map(contest => (
          <div key={contest.id} className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-blue-300 transition-all">
            <div>
              <div className="flex justify-between items-start mb-2.5">
                <h3 className="text-base font-heading font-bold text-slate-900">{contest.name}</h3>
                <span className={`flex items-center gap-1 text-[10px] uppercase font-sans font-semibold tracking-wider px-2 py-0.5 rounded border ${
                  contest.status === 'active' ? 'bg-teal-50 text-teal-700 border-teal-200' :
                  contest.status === 'draft' ? 'bg-slate-50 text-slate-600 border-slate-200' :
                  'bg-rose-50 text-rose-700 border-rose-200'
                }`}>
                  <Play className="w-3 h-3" /> {contest.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-sans mb-4 line-clamp-2">{contest.description}</p>
              
              <div className="flex flex-wrap gap-1.5 mb-5">
                {contest.skills.slice(0, 3).map(skill => (
                  <span key={skill} className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-xs font-sans text-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3.5 border-t border-slate-100">
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-sans">
                  <Users className="w-3.5 h-3.5" /> <span className="font-mono font-semibold text-slate-800">{contest.participants || 0}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-sans">
                  <Clock className="w-3.5 h-3.5" /> <span className="font-sans text-slate-700">{contest.duration}</span>
                </div>
              </div>
              <button onClick={() => setManagingContest(contest)} className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 text-xs font-medium font-sans">
                <Edit2 className="w-3.5 h-3.5" /> Manage
              </button>
            </div>
          </div>
        ))}

        {/* Empty State / Create Prompt */}
        <button onClick={() => setShowCreateModal(true)} className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-400 hover:bg-slate-50/50 transition-all min-h-[200px]">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-3 border border-slate-200 text-slate-600">
            <Plus className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-bold text-base text-slate-800 mb-1">Create New Contest</h3>
          <p className="text-xs font-sans text-slate-500 text-center max-w-xs">Publish a new technical challenge to discover top candidates automatically.</p>
        </button>
      </div>

      {/* CREATE CONTEST MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto shadow-xl">
            <button onClick={() => setShowCreateModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            <h2 className="text-xl font-heading font-bold text-slate-900 mb-5">Create Contest</h2>
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-sans font-medium text-slate-600 mb-1">Contest Name</label>
                <input required name="name" className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none" placeholder="e.g. Frontend Architecture Challenge" />
              </div>
              <div>
                <label className="block text-xs font-sans font-medium text-slate-600 mb-1">Description</label>
                <textarea required name="description" className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none h-20" placeholder="Describe the tasks..."></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans font-medium text-slate-600 mb-1">Technology</label>
                  <input required name="technology" className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none" placeholder="e.g. React.js" />
                </div>
                <div>
                  <label className="block text-xs font-sans font-medium text-slate-600 mb-1">Difficulty</label>
                  <select name="difficulty" className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none">
                    <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-sans font-medium text-slate-600 mb-1">Duration (Hours)</label>
                  <input required type="number" name="duration" className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none" min="1" max="48" defaultValue="2" />
                </div>
                <div>
                  <label className="block text-xs font-sans font-medium text-slate-600 mb-1">Max Participants</label>
                  <input required type="number" name="maxParticipants" className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none" min="1" defaultValue="500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-sans font-medium text-slate-600 mb-1">Skills Evaluated (comma separated)</label>
                <input required name="skills" className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none" placeholder="React, State Management, CSS" />
              </div>
              <div>
                <label className="block text-xs font-sans font-medium text-slate-600 mb-1">Deadline</label>
                <input required type="datetime-local" name="deadline" className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none" />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowCreateModal(false)} className="px-4 py-2 text-xs font-sans text-slate-600 hover:text-slate-900 transition-colors">Cancel</button>
                <button type="submit" className="btn-primary text-xs py-2 px-4">Save Draft</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MANAGE CONTEST MODAL */}
      {managingContest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-4xl w-full relative max-h-[90vh] overflow-y-auto shadow-xl">
            <button onClick={() => { setManagingContest(null); setLeaderboard(null); }} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            <div className="flex justify-between items-start mb-6 pr-8">
              <div>
                <h2 className="text-xl font-heading font-bold text-slate-900 mb-1">{managingContest.name}</h2>
                <div className="flex gap-4 text-xs font-sans text-slate-500">
                  <span>Status: <strong className="text-slate-800 uppercase font-semibold">{managingContest.status}</strong></span>
                  <span>Participants: <strong className="text-slate-800 font-semibold">{managingContest.participants || 0}</strong></span>
                </div>
              </div>
              <div className="flex gap-2">
                {managingContest.status === 'draft' && (
                  <button onClick={() => handleUpdateStatus(managingContest.id, 'active')} className="bg-teal-600 text-white px-3.5 py-1.5 rounded-lg text-xs font-medium hover:bg-teal-700 transition-colors shadow-xs">
                    Activate Contest
                  </button>
                )}
                {managingContest.status === 'active' && (
                  <button onClick={() => handleUpdateStatus(managingContest.id, 'ended')} className="bg-rose-50 text-rose-700 border border-rose-200 px-3.5 py-1.5 rounded-lg text-xs font-medium hover:bg-rose-100 transition-colors">
                    End Contest
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1 space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h3 className="text-slate-900 font-heading font-bold text-sm mb-3">Contest Details</h3>
                  <p className="text-xs font-sans text-slate-600 mb-2"><strong>Duration:</strong> {managingContest.duration}</p>
                  <p className="text-xs font-sans text-slate-600 mb-2"><strong>Difficulty:</strong> {managingContest.difficulty}</p>
                  <p className="text-xs font-sans text-slate-600 mb-2"><strong>Deadline:</strong> {new Date(managingContest.deadline).toLocaleString()}</p>
                  <div className="mt-4">
                    <button onClick={() => handleViewLeaderboard(managingContest.id)} className="w-full flex items-center justify-center gap-1.5 bg-white border border-slate-200 hover:border-blue-400 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 transition-colors shadow-xs">
                      <BarChart3 className="w-4 h-4 text-blue-600" /> View Leaderboard
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                {leaderboard ? (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h3 className="text-slate-900 font-heading font-bold text-sm mb-3 flex items-center gap-2"><Trophy className="w-4 h-4 text-teal-600"/> Live Leaderboard</h3>
                    {leaderboard.length === 0 ? (
                      <p className="text-slate-500 font-sans text-xs">No submissions yet.</p>
                    ) : (
                      <div className="space-y-2">
                        {leaderboard.map(cand => (
                          <div key={cand.id} className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200">
                            <div className="flex items-center gap-3">
                              <span className="text-teal-700 font-mono font-bold w-6 text-xs">#{cand.rank}</span>
                              <div>
                                <p className="text-slate-900 text-xs font-semibold font-sans">{cand.name}</p>
                                <p className="text-[11px] text-slate-500 font-mono">Score: {cand.score} | Time: {cand.time}</p>
                              </div>
                            </div>
                            <button onClick={() => handleShortlist(cand.id)} className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded hover:bg-blue-100 transition-colors text-[11px] font-medium font-sans">
                              Shortlist
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center text-slate-500 h-full">
                    <BarChart3 className="w-10 h-10 mb-3 text-slate-400" />
                    <p className="text-xs font-sans">Click "View Leaderboard" to see candidate performance.</p>
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
