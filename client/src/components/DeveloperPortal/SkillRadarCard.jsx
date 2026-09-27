import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';
import { Sparkles, PieChart } from 'lucide-react';
import { SKILLS_TAXONOMY } from '../../data/skillsTaxonomy.js';

export default function SkillRadarCard({ userSkills = [] }) {
  const normSkills = userSkills.map(s => s.toLowerCase());

  // Category mapping
  const categories = [
    { name: 'Core CS / DSA', category: 'Core CS & Algorithms' },
    { name: 'Languages', category: 'Programming Languages' },
    { name: 'Backend & APIs', category: 'Backend & APIs' },
    { name: 'Frontend', category: 'Frontend Engineering' },
    { name: 'Databases', category: 'Databases & Caching' },
    { name: 'System Design', category: 'System Design & Distributed Systems' },
    { name: 'Cloud/DevOps', category: 'Cloud & DevOps' }
  ];

  const radarData = categories.map(cat => {
    const totalInCategory = (SKILLS_TAXONOMY[cat.category] || []).length;
    const userCount = (SKILLS_TAXONOMY[cat.category] || []).filter(item => {
      const match = normSkills.some(us => 
        us === item.name.toLowerCase() || 
        item.aliases?.some(a => us === a.toLowerCase())
      );
      return match;
    }).length;

    const score = totalInCategory > 0 
      ? Math.min(100, Math.round((userCount / (totalInCategory * 0.6)) * 100)) 
      : 20;

    return {
      subject: cat.name,
      Score: Math.max(15, score),
      fullMark: 100
    };
  });

  return (
    <div className="card-hr p-4 space-y-3">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
        <div className="flex items-center gap-2">
          <PieChart className="w-4 h-4 text-black" />
          <h4 className="font-bold text-sm text-white">Skill Proficiency Radar</h4>
        </div>
        <span className="text-[10px] font-mono text-black bg-black/10 px-2 py-0.5 rounded border border-black/30">
          Domain Balance
        </span>
      </div>

      <div className="h-56 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
            <PolarGrid stroke="#E2E8F0" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#475569', fontSize: 10, fontFamily: 'monospace' }} 
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={{ fill: '#94A3B8', fontSize: 8 }} 
            />
            <Radar
              name="My Profile"
              dataKey="Score"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.25}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono text-slate-600 pt-1 border-t border-slate-200/80">
        <span>Active Matrix: 7 Domains</span>
        <span className="text-slate-700">Target: High-Density Pentagon</span>
      </div>
    </div>
  );
}
