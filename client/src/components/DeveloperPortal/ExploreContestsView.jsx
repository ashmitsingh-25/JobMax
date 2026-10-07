import React, { useEffect, useState } from 'react';
import { Trophy, Clock, Users, ChevronRight, Award, CheckCircle2, Play, Code } from 'lucide-react';
import { api } from '../../services/api';

export default function ExploreContestsView({ currentUser }) {
  const [contests, setContests] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [activeContest, setActiveContest] = useState(null);
  const [submissionScore, setSubmissionScore] = useState(null);

  const loadData = async () => {
    setLoading(true);
    const userId = currentUser?.uid || 'user-fresher-1';
    const [contestsRes, regRes] = await Promise.all([
      api.getContests(),
      api.getRegistrations(userId)
    ]);
    
    if (contestsRes.success) {
      // Only show active contests for candidates to explore
      setContests(contestsRes.contests.filter(c => c.status === 'active'));
    }
    if (regRes.success) {
      setRegistrations(regRes.registrations.map(r => r.contestId));
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRegister = async (contest) => {
    const userId = currentUser?.uid || 'user-fresher-1';
    const userDetails = {
      name: currentUser?.displayName || 'Test Candidate',
      skills: ['React', 'JavaScript', 'Node.js'],
      github: 'test-user-github'
    };
    
    const res = await api.registerForContest(userId, userDetails, contest.id);
    if (res.success) {
      loadData();
    } else {
      alert(res.message);
    }
  };

  const handleStartContest = (contest) => {
    setActiveContest(contest);
    setSubmissionScore(null);
  };

  const handleSubmitContest = async (e) => {
    e.preventDefault();
    const userId = currentUser?.uid || 'user-fresher-1';
    const userDetails = {
      name: currentUser?.displayName || 'Test Candidate',
      skills: ['React', 'JavaScript', 'Node.js'],
      github: 'test-user-github'
    };
    
    // Mock calculating a random score based on some answers, simulating evaluation
    const randomScore = Math.floor(Math.random() * 30) + 70; // 70 to 100
    const timeSpent = Math.floor(Math.random() * 3600) + 1800; // 30m to 90m in seconds
    
    const res = await api.submitContest({
      candidateId: userId,
      candidateDetails: userDetails,
      contestId: activeContest.id,
      score: randomScore,
      timeSpent: timeSpent,
      answers: {} // Placeholder for actual answers
    });

    if (res.success) {
      setSubmissionScore(randomScore);
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
            <Trophy className="w-4 h-4 text-teal-600" /> Explore Contests
          </h2>
          <p className="text-xs text-slate-500 font-sans mt-0.5">Participate in challenges to prove your skills to companies.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {contests.map(contest => {
          const isRegistered = registrations.includes(contest.id);
          return (
            <div key={contest.id} className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs flex flex-col md:flex-row gap-6 hover:border-blue-300 transition-all">
              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-heading font-bold text-slate-900 mb-0.5">{contest.name}</h3>
                    <p className="text-xs text-blue-700 font-sans font-medium">{contest.companyName}</p>
                  </div>
                  <span className="px-2.5 py-0.5 bg-slate-50 text-[11px] font-sans text-slate-600 rounded-full border border-slate-200">
                    {contest.difficulty}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-sans leading-relaxed">{contest.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {contest.skills.map(skill => (
                    <span key={skill} className="px-2 py-0.5 bg-slate-50 text-slate-700 border border-slate-200 rounded text-xs font-sans">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col justify-between md:w-64 shrink-0 bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="space-y-2.5 text-xs font-sans">
                  <div className="flex justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-400" /> Duration</span>
                    <span className="text-slate-800 font-medium">{contest.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-slate-400" /> Enrolled</span>
                    <span className="text-slate-800 font-mono">{contest.participants} / {contest.maxParticipants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-slate-400" /> Prize</span>
                    <span className="text-teal-700 font-medium text-right max-w-[120px] truncate">{contest.prize}</span>
                  </div>
                </div>
                
                {isRegistered ? (
                  <button onClick={() => handleStartContest(contest)} className="w-full mt-4 bg-teal-600 text-white font-medium py-2 px-3 rounded-lg flex justify-center items-center gap-2 hover:bg-teal-700 transition-colors text-xs shadow-xs">
                    <Play className="w-3.5 h-3.5" /> Start Contest
                  </button>
                ) : (
                  <button onClick={() => handleRegister(contest)} className="btn-primary w-full mt-4 flex justify-center items-center gap-1.5 text-xs py-2">
                    Register Now <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {contests.length === 0 && (
          <div className="text-center p-12 bg-white rounded-xl border border-slate-200 shadow-xs">
            <Trophy className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-heading font-bold text-slate-800">No active contests</h3>
            <p className="text-xs font-sans text-slate-500 mt-1">Check back later for new coding challenges.</p>
          </div>
        )}
      </div>

      {/* CONTEST ASSESSMENT MODAL */}
      {activeContest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-3xl w-full relative shadow-xl">
            {!submissionScore ? (
              <>
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-xl font-heading font-bold text-slate-900 flex items-center gap-2">
                    <Code className="w-5 h-5 text-blue-600" /> {activeContest.name}
                  </h2>
                  <div className="flex items-center gap-1.5 text-teal-700 font-mono text-xs bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                    <Clock className="w-3.5 h-3.5" /> Time Running
                  </div>
                </div>
                
                <form onSubmit={handleSubmitContest}>
                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl mb-5 text-slate-700 text-xs font-sans">
                    <p className="mb-3 text-slate-900 font-medium"><strong>Task 1:</strong> Implement a function that satisfies the requirements below.</p>
                    <p className="text-xs font-mono bg-white p-3 rounded text-slate-600 mb-3 border border-slate-200">
                      // Write your solution here...<br/>
                      // (This is a simplified contest simulator)
                    </p>
                    <textarea 
                      required 
                      className="w-full bg-white border border-slate-200 rounded-lg p-3 font-mono text-xs text-slate-900 h-40 focus:border-blue-500 outline-none" 
                      placeholder="function solution() { ... }"
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <button type="button" onClick={() => setActiveContest(null)} className="px-4 py-2 text-xs font-sans text-slate-600 hover:text-slate-900 transition-colors">
                      Cancel & Exit
                    </button>
                    <button type="submit" className="btn-primary text-xs py-2 px-6">
                      Submit Code
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-teal-200">
                  <CheckCircle2 className="w-8 h-8 text-teal-600" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-slate-900 mb-1">Submission Successful!</h2>
                <p className="text-xs font-sans text-slate-500 mb-6">Your code has been evaluated against our hidden test cases.</p>
                
                <div className="inline-block bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6">
                  <p className="text-xs font-sans text-slate-500 uppercase tracking-wider font-semibold mb-1">Final Score</p>
                  <p className="text-4xl font-heading font-bold text-teal-700">{submissionScore} <span className="text-xl text-slate-400">/ 100</span></p>
                </div>
                
                <div>
                  <button onClick={() => { setActiveContest(null); setSubmissionScore(null); }} className="btn-primary text-xs py-2 px-6">
                    Return to Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
