import React, { useEffect, useState } from 'react';
import { FileText, Building2, MapPin, DollarSign, CheckCircle2, XCircle } from 'lucide-react';
import { api } from '../../services/api';

export default function HiringProposalsView({ currentUser }) {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProposals(currentUser.id).then(res => {
      if (res.success) setProposals(res.proposals);
      setLoading(false);
    });
  }, [currentUser.id]);

  if (loading) return <div className="text-center p-12 text-slate-400">Loading proposals...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-green" /> Hiring Proposals
          </h2>
          <p className="text-sm text-slate-400">Direct offers from companies based on your performance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {proposals.map(proposal => (
          <div key={proposal.id} className="bg-dark-800 border border-dark-700 rounded-xl p-6 shadow-card-dark transition-colors">
            <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{proposal.jobRole}</h3>
                <div className="flex items-center gap-4 text-sm text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5 text-brand-cyan">
                    <Building2 className="w-4 h-4" /> {proposal.companyName}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" /> {proposal.location} ({proposal.workMode})
                  </span>
                  <span className="flex items-center gap-1.5 text-brand-green">
                    <DollarSign className="w-4 h-4" /> {proposal.ctc}
                  </span>
                </div>
              </div>
              <div className="flex items-start">
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                  proposal.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30' :
                  proposal.status === 'accepted' ? 'bg-brand-green/10 text-brand-green border-brand-green/30' :
                  'bg-red-500/10 text-red-500 border-red-500/30'
                }`}>
                  {proposal.status.toUpperCase()}
                </span>
              </div>
            </div>
            
            <div className="bg-dark-900 rounded-lg p-5 border border-dark-700 mb-6">
              <p className="text-slate-300 leading-relaxed text-sm italic">"{proposal.jobDescription}"</p>
            </div>
            
            {proposal.status === 'pending' && (
              <div className="flex gap-4">
                <button className="btn-primary flex-1 flex justify-center items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Accept Proposal
                </button>
                <button className="px-6 py-2 rounded-lg bg-dark-700 text-white font-medium hover:bg-rose-500/20 hover:text-rose-400 transition-colors flex justify-center items-center gap-2">
                  <XCircle className="w-4 h-4" /> Decline
                </button>
              </div>
            )}
          </div>
        ))}
        {proposals.length === 0 && (
          <div className="text-center p-12 bg-dark-800 rounded-xl border border-dark-700">
            <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white">No active proposals</h3>
            <p className="text-slate-400 mt-2">Participate in contests and projects to receive offers.</p>
          </div>
        )}
      </div>
    </div>
  );
}
