import React, { useEffect, useState } from 'react';
import { FileText, MapPin, DollarSign, Building2, ExternalLink } from 'lucide-react';
import { api } from '../../services/api';

export default function CompanyProposalsView({ currentUser }) {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const companyId = currentUser?.uid || 'user-company-1';
    api.getProposalsForCompany(companyId).then(res => {
      if (res.success) setProposals(res.proposals);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-center p-12 text-slate-400">Loading proposals...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-dark-800 p-6 rounded-xl border border-dark-700 shadow-card-dark">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-green" /> Sent Proposals
          </h2>
          <p className="text-sm text-slate-400 mt-1">Track hiring proposals sent to top candidates.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {proposals.map(proposal => (
          <div key={proposal.id} className="bg-dark-800 border border-dark-700 rounded-xl p-6 shadow-card-dark">
            <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{proposal.jobRole}</h3>
                <div className="flex items-center gap-4 text-sm text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5 text-brand-cyan">
                    <Building2 className="w-4 h-4" /> To: Candidate {proposal.candidateId}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" /> {proposal.location} ({proposal.workMode})
                  </span>
                  <span className="flex items-center gap-1.5 text-brand-green">
                    <DollarSign className="w-4 h-4" /> {proposal.ctc}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                  proposal.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30' :
                  proposal.status === 'accepted' ? 'bg-brand-green/10 text-brand-green border-brand-green/30' :
                  'bg-red-500/10 text-red-500 border-red-500/30'
                }`}>
                  {proposal.status.toUpperCase()}
                </span>
                <span className="text-xs text-slate-500">Sent on: {new Date(proposal.date).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="flex gap-4">
               <button className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-sm font-medium">
                <ExternalLink className="w-4 h-4" /> View Candidate Profile
              </button>
            </div>
          </div>
        ))}
        {proposals.length === 0 && (
          <div className="text-center p-12 bg-dark-800 rounded-xl border border-dark-700">
            <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white">No proposals sent</h3>
            <p className="text-slate-400 mt-2">Discover candidates and send them hiring proposals.</p>
          </div>
        )}
      </div>
    </div>
  );
}
