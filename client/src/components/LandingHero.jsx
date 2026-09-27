import React, { useState } from 'react';
import { 
  Code, 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  GraduationCap, 
  Briefcase, 
  FileText, 
  TrendingUp, 
  Lock,
  Mail
} from 'lucide-react';


export default function LandingHero({ onSelectRole, onQuickLogin }) {
  const [activeTab, setActiveTab] = useState('developer'); // 'developer' or 'company'
  const [authMode, setAuthMode] = useState('select'); // 'select', 'login', 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRoleForAuth, setSelectedRoleForAuth] = useState('developer');

  const handleStartAuth = (role) => {
    setSelectedRoleForAuth(role);
    setAuthMode('login');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSelectRole(selectedRoleForAuth, {
      email: email || (selectedRoleForAuth === 'developer' ? 'dev@jobmax.io' : 'recruiter@microsoft.com'),
      name: email ? email.split('@')[0] : (selectedRoleForAuth === 'developer' ? 'Developer' : 'Talent Partner'),
      role: selectedRoleForAuth
    });
  };

  const handleOAuthLogin = (provider) => {
    onSelectRole(selectedRoleForAuth, {
      email: `${provider.toLowerCase()}_user@jobmax.io`,
      name: `${provider} Verified User`,
      role: selectedRoleForAuth
    });
  };

  return (
    <div className="relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Matrix & Circuit Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-black/30 px-3.5 py-1.5 rounded-full mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-black" />
            <span className="font-mono text-xs text-black font-semibold tracking-wide">
              INTELLIGENT SKILL-GAP ENGINE
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            Close the Gap Between <br className="hidden sm:inline" />
            <span className="text-blue-600">
              What You Know
            </span> & <span className="text-slate-900">What Tech Demands</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Real-world recruitment data from campus drives and off-campus job markets, 
            powered by AI that benchmarks your skills, generates personalized 6-week closing roadmaps, and ranks candidates for hiring teams.
          </p>
        </div>

        {/* Auth Modal / Direct Role Selection View */}
        {authMode === 'select' ? (
          <div>
            {/* 2 Large Role Selector Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              
              {/* Card 1: Developer Portal Card */}
              <div 
                onClick={() => handleStartAuth('developer')}
                className="group relative bg-white/90 hover:bg-slate-50 border-2 border-slate-200 hover:border-black rounded-2xl p-8 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-sm flex flex-col justify-between"
              >
                <div className="absolute top-4 right-4 bg-black/10 text-black border border-black/30 text-[11px] font-mono px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Cpu className="w-3 h-3" />
                  Students & Engineers
                </div>

                <div>
                  <div className="w-14 h-14 rounded-xl bg-slate-100/80 border border-black/40 flex items-center justify-center text-black mb-6 group-hover:scale-110 transition-transform">
                    <Code className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2 group-hover:text-black transition-colors">
                    I'm a Developer
                    <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-black group-hover:translate-x-1 transition-all" />
                  </h3>

                  <p className="text-slate-700 text-sm leading-relaxed mb-6">
                    Assess your placement readiness and get AI gap reports, customized roadmaps, and career insights.
                  </p>
                </div>

                <div className="pt-2">
                  <button className="w-full btn-primary group-hover:bg-[#00D659]">
                    Enter Developer Portal
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card 2: Company Portal Card */}
              <div 
                onClick={() => handleStartAuth('company')}
                className="group relative bg-white/90 hover:bg-slate-50 border-2 border-slate-200 hover:border-blue-600 rounded-2xl p-8 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div className="absolute top-4 right-4 bg-blue-600/10 text-blue-600 border border-blue-600/30 text-[11px] font-mono px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  Recruiters & Tech Leads
                </div>

                <div>
                  <div className="w-14 h-14 rounded-xl bg-slate-100/80 border border-blue-600/40 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                    <Building2 className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                    I'm a Company
                    <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </h3>

                  <p className="text-slate-700 text-sm leading-relaxed mb-6">
                    Input role requirements to analyze candidate skill gaps and let AI rank applicants with instant breakdowns.
                  </p>
                </div>

                <div className="pt-2">
                  <button className="w-full bg-blue-600 hover:bg-[#00c0e4] text-dark-900 font-semibold px-4 py-2.5 rounded-lg text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md">
                    Enter Company Portal
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Quick Demo Evaluation Section */}
            <div className="bg-white/80 border border-slate-200 rounded-2xl p-6 text-center">
              <p className="text-xs font-mono uppercase tracking-wider text-slate-600 mb-4 flex items-center justify-center gap-2">
                <Zap className="w-4 h-4 text-brand-amber" />
                Quick 1-Click Demo Evaluation Profiles
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => onQuickLogin('user-fresher-1')}
                  className="bg-white hover:bg-slate-50 border border-black/30 hover:border-black text-slate-800 px-3.5 py-2 rounded-lg text-xs font-mono flex items-center gap-2 transition-all hover:scale-105"
                >
                  <GraduationCap className="w-4 h-4 text-black" />
                  <span>Fresher (On-Campus · IIT Delhi)</span>
                </button>

                <button
                  onClick={() => onQuickLogin('user-fresher-2')}
                  className="bg-white hover:bg-slate-50 border border-black/30 hover:border-black text-slate-800 px-3.5 py-2 rounded-lg text-xs font-mono flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Briefcase className="w-4 h-4 text-black" />
                  <span>Fresher (Off-Campus · BITS)</span>
                </button>

                <button
                  onClick={() => onQuickLogin('user-exp-1')}
                  className="bg-white hover:bg-slate-50 border border-brand-purple/30 hover:border-brand-purple text-slate-800 px-3.5 py-2 rounded-lg text-xs font-mono flex items-center gap-2 transition-all hover:scale-105"
                >
                  <TrendingUp className="w-4 h-4 text-brand-purple" />
                  <span>Experienced SDE II (Swiggy · 3.5 YoE)</span>
                </button>

                <button
                  onClick={() => onQuickLogin('user-company-1')}
                  className="bg-white hover:bg-slate-50 border border-blue-600/30 hover:border-blue-600 text-slate-800 px-3.5 py-2 rounded-lg text-xs font-mono flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>Company Recruiter @ Microsoft</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Authentication Screen */
          <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-slate-100/60 px-3 py-1 rounded-full text-xs font-mono text-slate-700 mb-3">
                {selectedRoleForAuth === 'developer' ? (
                  <>
                    <Code className="w-3.5 h-3.5 text-black" />
                    Developer Portal Access
                  </>
                ) : (
                  <>
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    Company Portal Access
                  </>
                )}
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                {authMode === 'login' ? 'Welcome Back' : 'Create an Account'}
              </h2>
              <p className="text-xs text-slate-600 mt-1 font-mono">
                Single secure login with role-based dashboard access
              </p>
            </div>

            {/* OAuth Quick Actions */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => handleOAuthLogin('GitHub')}
                type="button"
                className="btn-secondary text-xs flex items-center justify-center gap-2 border-slate-300 hover:border-slate-400"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub
              </button>
              <button
                onClick={() => handleOAuthLogin('LinkedIn')}
                type="button"
                className="btn-secondary text-xs flex items-center justify-center gap-2 border-slate-300 hover:border-blue-400 text-slate-800"
              >
                <svg className="w-4 h-4 fill-current text-blue-400" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                LinkedIn
              </button>
            </div>

            <div className="relative flex py-2 items-center mb-6">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-3 text-[11px] text-slate-500 font-mono uppercase">or with email</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1.5">Work / College Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder={selectedRoleForAuth === 'developer' ? "student@iitd.ac.in (or click Demo below)" : "recruiter@microsoft.com"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-hr w-full pl-9"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-hr w-full pl-9"
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`w-full font-semibold py-2.5 rounded-lg text-sm transition-all flex items-center justify-center gap-2 ${
                  selectedRoleForAuth === 'developer' ? 'btn-primary' : 'bg-blue-600 hover:bg-[#00c0e4] text-dark-900 shadow-md'
                }`}
              >
                Continue to Dashboard
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Dedicated 1-Click Instant Demo Login Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onQuickLogin(selectedRoleForAuth === 'developer' ? 'user-fresher-1' : 'user-company-1')}
                  className="w-full bg-slate-50 hover:bg-slate-100 border border-black/60 hover:border-black text-black hover:text-slate-900 font-mono text-xs font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Zap className="w-4 h-4 text-brand-amber" />
                  ⚡ 1-Click Instant Demo Login ({selectedRoleForAuth === 'developer' ? "Fresher Aarav" : "Recruiter Sarah"})
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600 pt-2 font-mono">
                <button
                  type="button"
                  onClick={() => setAuthMode('select')}
                  className="hover:text-slate-800 underline"
                >
                  ← Change Role
                </button>
                <button
                  type="button"
                  onClick={() => onQuickLogin(selectedRoleForAuth === 'developer' ? 'user-fresher-1' : 'user-company-1')}
                  className="text-black hover:underline flex items-center gap-1"
                >
                  <Zap className="w-3 h-3 text-brand-amber" />
                  Instant Demo Login
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
