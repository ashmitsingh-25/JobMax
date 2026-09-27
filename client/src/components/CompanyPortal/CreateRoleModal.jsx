import React, { useState } from 'react';
import { Plus, X, Building2, CheckCircle2, DollarSign, Layers } from 'lucide-react';
import { api } from '../../services/api';

export default function CreateRoleModal({ isOpen, onClose, onRoleCreated, currentCompany = "Microsoft" }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Bengaluru, India (Hybrid)');
  const [ctcBand, setCtcBand] = useState('₹32.0 - 45.0 LPA');
  const [experienceLevel, setExperienceLevel] = useState('0-3 Years');
  const [minCgpa, setMinCgpa] = useState('7.5');
  const [mandatorySkillsText, setMandatorySkillsText] = useState('Data Structures & Algorithms, Java, System Design Fundamentals');
  const [optionalSkillsText, setOptionalSkillsText] = useState('Docker & Containerization, Redis, Kubernetes');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const mandatorySkills = mandatorySkillsText.split(',').map(s => s.trim()).filter(Boolean);
      const optionalSkills = optionalSkillsText.split(',').map(s => s.trim()).filter(Boolean);

      const res = await api.createCompanyRole({
        companyName: currentCompany,
        title,
        location,
        ctcBand,
        experienceLevel,
        minCgpa: parseFloat(minCgpa) || 7.0,
        mandatorySkills,
        optionalSkills
      });

      if (res && res.success) {
        onRoleCreated(res.role);
        onClose();
      }
    } catch (err) {
      console.error("Error creating role:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-dark-800 border border-dark-600 w-full max-w-xl rounded-2xl p-6 sm:p-7 shadow-2xl relative">
        
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-dark-700">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Create Open Role & Calibration Profile</h3>
              <p className="text-xs text-slate-400 font-mono">Input skill requirements to analyze candidate talent pool</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">Job Title</label>
              <input
                type="text"
                required
                placeholder="e.g. SDE II - Core Platform"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-hr w-full"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input-hr w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">CTC Band</label>
              <input
                type="text"
                value={ctcBand}
                onChange={(e) => setCtcBand(e.target.value)}
                className="input-hr w-full"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">Experience</label>
              <input
                type="text"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="input-hr w-full"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">Min CGPA</label>
              <input
                type="number"
                step="0.1"
                value={minCgpa}
                onChange={(e) => setMinCgpa(e.target.value)}
                className="input-hr w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-brand-green mb-1.5">Mandatory Core Skills (Weighted 60%)</label>
            <textarea
              rows={2}
              placeholder="e.g. Data Structures & Algorithms, Java, System Design Fundamentals, SQL Query Optimization"
              value={mandatorySkillsText}
              onChange={(e) => setMandatorySkillsText(e.target.value)}
              className="input-hr w-full font-sans text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-brand-cyan mb-1.5">Good-to-Have Skills (Weighted 20%)</label>
            <textarea
              rows={2}
              placeholder="e.g. Docker & Containerization, Kubernetes, Kafka, Redis"
              value={optionalSkillsText}
              onChange={(e) => setOptionalSkillsText(e.target.value)}
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
              disabled={isLoading || !title.trim()}
              className="btn-primary text-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              Save & Analyze Talent Pool
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
