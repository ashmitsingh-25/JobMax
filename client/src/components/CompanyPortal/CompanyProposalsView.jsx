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

  if (loading) return <div className="text-center p-12 text-slate-500 font-sans text-sm">Loading proposals...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs">
        <div>
          <h2 className="text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" /> Sent Proposals
          </h2>
          <p className="text-xs text-slate-500 font-sans mt-0.5">Track hiring proposals sent to top candidates.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {proposals.map(proposal => (
          <div key={proposal.id} className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs hover:border-blue-300 transition-all">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
              <div>
                <h3 className="text-base font-heading font-bold text-slate-900 mb-1.5">{proposal.jobRole}</h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-sans">
                  <span className="flex items-center gap-1.5 text-blue-700 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" /> To: Candidate {proposal.candidateId}
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {proposal.location} ({proposal.workMode})
                  </span>
                  <span className="flex items-center gap-1.5 text-teal-700 font-mono font-bold">
                    <DollarSign className="w-3.5 h-3.5 text-teal-600" /> {proposal.ctc}
                  </span>
                </div>
              </div>
              <div className="flex flex-col md:items-end gap-1.5">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold border ${
                  proposal.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                  proposal.status === 'accepted' ? 'bg-teal-50 text-teal-700 border-teal-200' :
                  'bg-rose-50 text-rose-700 border-rose-200'
                }`}>
                  {proposal.status.toUpperCase()}
                </span>
                <span className="text-[11px] font-sans text-slate-400">Sent on: {new Date(proposal.date).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="flex gap-4 pt-3 border-t border-slate-100">
               <button className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1 text-xs font-medium font-sans">
                <ExternalLink className="w-3.5 h-3.5" /> View Candidate Profile
              </button>
            </div>
          </div>
        ))}
        {proposals.length === 0 && (
          <div className="text-center p-12 bg-white rounded-xl border border-slate-200 shadow-xs">
            <FileText className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-heading font-bold text-slate-800">No proposals sent</h3>
            <p className="text-xs font-sans text-slate-500 mt-1">Discover candidates and send them hiring proposals.</p>
          </div>
        )}
      </div>
    </div>
  );
}
