import React, { useEffect, useState } from 'react';
import { FileText, Building2, MapPin, DollarSign, CheckCircle2, XCircle } from 'lucide-react';
import { api } from '../../services/api';

export default function HiringProposalsView({ currentUser }) {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProposals = async () => {
    setLoading(true);
    const userId = currentUser?.uid || 'user-fresher-1';
    const res = await api.getProposalsForCandidate(userId);
    if (res.success) {
      setProposals(res.proposals);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProposals();
  }, [currentUser]);

  const handleUpdateStatus = async (proposalId, status) => {
    const res = await api.updateProposalStatus(proposalId, status);
    if (res.success) {
      loadProposals();
    } else {
      alert(res.message);
    }
  };

  if (loading) return <div className="text-center p-12 text-slate-500 font-sans text-sm">Loading proposals...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs">
        <div>
          <h2 className="text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" /> Hiring Proposals
          </h2>
          <p className="text-xs text-slate-500 font-sans mt-0.5">Direct offers from companies based on your performance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {proposals.map(proposal => (
          <div key={proposal.id} className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs transition-all hover:border-blue-300">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-heading font-bold text-slate-900 mb-1.5">{proposal.jobRole}</h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-sans">
                  <span className="flex items-center gap-1.5 text-blue-700 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" /> {proposal.companyName}
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {proposal.location} ({proposal.workMode})
                  </span>
                  <span className="flex items-center gap-1.5 text-teal-700 font-mono font-bold">
                    <DollarSign className="w-3.5 h-3.5 text-teal-600" /> {proposal.ctc}
                  </span>
                </div>
              </div>
              <div className="flex items-start">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold border ${
                  proposal.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                  proposal.status === 'accepted' ? 'bg-teal-50 text-teal-700 border-teal-200' :
                  'bg-rose-50 text-rose-700 border-rose-200'
                }`}>
                  {proposal.status.toUpperCase()}
                </span>
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 mb-5">
              <p className="text-slate-600 leading-relaxed text-xs font-sans italic">"{proposal.jobDescription}"</p>
            </div>
            
            {proposal.status === 'pending' && (
              <div className="flex gap-3">
                <button onClick={() => handleUpdateStatus(proposal.id, 'accepted')} className="btn-primary flex-1 flex justify-center items-center gap-1.5 text-xs py-2">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Accept Proposal
                </button>
                <button onClick={() => handleUpdateStatus(proposal.id, 'declined')} className="px-5 py-2 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 border border-transparent transition-colors flex justify-center items-center gap-1.5 text-xs font-sans">
                  <XCircle className="w-3.5 h-3.5" /> Decline
                </button>
              </div>
            )}
          </div>
        ))}
        {proposals.length === 0 && (
          <div className="text-center p-12 bg-white rounded-xl border border-slate-200 shadow-xs">
            <FileText className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-heading font-bold text-slate-800">No active proposals</h3>
            <p className="text-xs font-sans text-slate-500 mt-1">Participate in contests and projects to receive offers.</p>
          </div>
        )}
      </div>
    </div>
  );
}
