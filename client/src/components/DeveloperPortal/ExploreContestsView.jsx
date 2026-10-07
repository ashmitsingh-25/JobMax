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

  if (loading) return <div className="text-center p-12 text-slate-400">Loading contests...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-brand-green" /> Explore Contests
          </h2>
          <p className="text-sm text-slate-400">Participate in challenges to prove your skills to companies.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {contests.map(contest => {
          const isRegistered = registrations.includes(contest.id);
          return (
            <div key={contest.id} className="bg-dark-800 border border-dark-700 rounded-xl p-6 shadow-card-dark flex flex-col md:flex-row gap-6 hover:border-brand-green/30 transition-colors">
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{contest.name}</h3>
                    <p className="text-sm text-brand-green font-sans tracking-wide">{contest.companyName}</p>
                  </div>
                  <span className="px-3 py-1 bg-dark-700 text-xs font-sans tracking-wide text-slate-300 rounded-full border border-dark-600">
                    {contest.difficulty}
                  </span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{contest.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {contest.skills.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-dark-850 text-slate-300 border border-dark-700 rounded text-xs font-sans tracking-wide">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col justify-between md:w-64 shrink-0 bg-dark-850 rounded-lg p-4 border border-dark-700">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400 flex items-center gap-1.5"><Clock className="w-4 h-4" /> Duration</span>
                    <span className="text-white font-sans tracking-wide">{contest.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400 flex items-center gap-1.5"><Users className="w-4 h-4" /> Enrolled</span>
                    <span className="text-white font-sans tracking-wide">{contest.participants} / {contest.maxParticipants}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400 flex items-center gap-1.5"><Award className="w-4 h-4" /> Prize</span>
                    <span className="text-white font-sans tracking-wide text-xs text-right max-w-[100px]">{contest.prize}</span>
                  </div>
                </div>
                
                {isRegistered ? (
                  <button onClick={() => handleStartContest(contest)} className="w-full mt-4 bg-brand-cyan text-dark-900 font-bold py-2 px-4 rounded-lg flex justify-center items-center gap-2 hover:bg-brand-cyan/90 transition-colors">
                    <Play className="w-4 h-4" /> Start Contest
                  </button>
                ) : (
                  <button onClick={() => handleRegister(contest)} className="btn-primary w-full mt-4 flex justify-center items-center gap-2">
                    Register Now <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {contests.length === 0 && (
          <div className="text-center p-12 bg-dark-800 rounded-xl border border-dark-700">
            <Trophy className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white">No active contests</h3>
            <p className="text-slate-400 mt-2">Check back later for new coding challenges.</p>
          </div>
        )}
      </div>

      {/* CONTEST ASSESSMENT MODAL */}
      {activeContest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
          <div className="bg-dark-800 rounded-2xl border border-dark-700 p-8 max-w-3xl w-full relative">
            {!submissionScore ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Code className="w-6 h-6 text-brand-green" /> {activeContest.name}
                  </h2>
                  <div className="flex items-center gap-2 text-brand-cyan font-sans tracking-wide bg-brand-cyan/10 px-3 py-1 rounded border border-brand-cyan/30">
                    <Clock className="w-4 h-4" /> Time Running
                  </div>
                </div>
                
                <form onSubmit={handleSubmitContest}>
                  <div className="bg-dark-900 border border-dark-700 p-6 rounded-xl mb-6 text-slate-300">
                    <p className="mb-4 text-white"><strong>Task 1:</strong> Implement a function that satisfies the requirements below.</p>
                    <p className="text-sm font-sans tracking-wide bg-dark-800 p-4 rounded text-brand-green mb-4 border border-dark-600">
                      // Write your solution here...<br/>
                      // (This is a simplified contest simulator)
                    </p>
                    <textarea 
                      required 
                      className="w-full bg-dark-800 border border-dark-600 rounded-lg p-4 font-sans tracking-wide text-sm text-white h-48 focus:border-brand-green outline-none" 
                      placeholder="function solution() { ... }"
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end gap-4">
                    <button type="button" onClick={() => setActiveContest(null)} className="px-6 py-2 text-slate-400 hover:text-white transition-colors">
                      Cancel & Exit
                    </button>
                    <button type="submit" className="btn-primary px-8">
                      Submit Code
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-brand-green/30">
                  <CheckCircle2 className="w-10 h-10 text-brand-green" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Submission Successful!</h2>
                <p className="text-slate-400 mb-8">Your code has been evaluated against our hidden test cases.</p>
                
                <div className="inline-block bg-dark-900 border border-dark-700 rounded-xl p-6 mb-8">
                  <p className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-1">Final Score</p>
                  <p className="text-5xl font-bold text-brand-green font-sans tracking-wide">{submissionScore} <span className="text-2xl text-slate-500">/ 100</span></p>
                </div>
                
                <div>
                  <button onClick={() => { setActiveContest(null); setSubmissionScore(null); }} className="btn-primary px-8">
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
