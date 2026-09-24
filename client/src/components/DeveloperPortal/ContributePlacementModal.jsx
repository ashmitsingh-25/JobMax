import React, { useState } from 'react';
import { Plus, X, Building2, DollarSign, Award, BookOpen, CheckCircle } from 'lucide-react';
import { api } from '../../services/api';

export default function ContributePlacementModal({ isOpen, onClose, colleges, onRecordAdded, defaultCollegeId }) {
  const [collegeId, setCollegeId] = useState(defaultCollegeId || 'iit-delhi');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('Software Development Engineer');
  const [ctcBand, setCtcBand] = useState('₹24.0 - 36.0 LPA');
  const [cgpaCutoff, setCgpaCutoff] = useState('7.5');
  const [demandedSkillsText, setDemandedSkillsText] = useState('Data Structures & Algorithms, Java, System Design Fundamentals, SQL Query Optimization');
  const [offersCount, setOffersCount] = useState('15');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const skillsArray = demandedSkillsText.split(',').map(s => s.trim()).filter(Boolean);
      const res = await api.addPlacementRecord({
        collegeId,
        company,
        role,
        ctcBand,
        cgpaCutoff: parseFloat(cgpaCutoff) || 7.0,
        demandedSkills: skillsArray,
        offersLastYear: parseInt(offersCount) || 10
      });

      if (res && res.success) {
        onRecordAdded(res.record);
        onClose();
      }
    } catch (err) {
      console.error("Error adding placement record:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-dark-800 border border-dark-600 w-full max-w-xl rounded-2xl p-6 sm:p-7 shadow-2xl relative">
        
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-dark-700">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-green/10 text-brand-green border border-brand-green/30 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Contribute Campus Placement Record</h3>
              <p className="text-xs text-slate-400 font-mono">Crowdsourced & Placement Cell verified data</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5">Target College / Campus</label>
            <select
              value={collegeId}
              onChange={(e) => setCollegeId(e.target.value)}
              className="input-hr w-full font-sans"
            >
              {colleges.map(c => (
                <option key={c.id} value={c.id} className="bg-dark-800">{c.name} ({c.tier})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">Recruiter / Company Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Adobe, Oracle, Goldman Sachs"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="input-hr w-full"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">Role Offered</label>
              <input
                type="text"
                required
                placeholder="e.g. SDE-1 / MTS"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="input-hr w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">CTC Band</label>
              <input
                type="text"
                placeholder="e.g. ₹28 - 42 LPA"
                value={ctcBand}
                onChange={(e) => setCtcBand(e.target.value)}
                className="input-hr w-full"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">CGPA Cutoff</label>
              <input
                type="number"
                step="0.1"
                placeholder="7.5"
                value={cgpaCutoff}
                onChange={(e) => setCgpaCutoff(e.target.value)}
                className="input-hr w-full"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">Offers Made</label>
              <input
                type="number"
                placeholder="15"
                value={offersCount}
                onChange={(e) => setOffersCount(e.target.value)}
                className="input-hr w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5">Skills Demanded (Comma separated)</label>
            <textarea
              rows={3}
              placeholder="e.g. Data Structures & Algorithms, Java, System Design Fundamentals, Dynamic Programming, SQL Query Optimization"
              value={demandedSkillsText}
              onChange={(e) => setDemandedSkillsText(e.target.value)}
              className="input-hr w-full font-sans text-xs"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-dark-700">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary text-xs"
            >
              <CheckCircle className="w-4 h-4" />
              Save Placement Record
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
