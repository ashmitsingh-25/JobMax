import React, { useState, useEffect } from 'react';
import { Terminal, Users, Building2, ChevronDown, Sparkles, LogOut, CheckCircle, Code, Briefcase, GraduationCap } from 'lucide-react';
import { api } from '../services/api';

export default function Navbar({
  currentUser,
  currentPortal,
  setCurrentPortal,
  onSwitchUser,
  onLogout,
  onOpenOnboarding
}) {
  const [demoUsers, setDemoUsers] = useState([]);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  useEffect(() => {
    api.getDemoUsers().then(res => {
      if (res && res.users) {
        setDemoUsers(res.users);
      }
    }).catch(err => console.error("Error loading demo users:", err));
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-dark-900/90 backdrop-blur-md border-b border-dark-700/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Tag */}
          <div className="flex items-center gap-6">
            <div 
              onClick={() => onLogout && onLogout()}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-lg bg-dark-800 border border-brand-green/40 flex items-center justify-center text-brand-green shadow-glow-green group-hover:scale-105 transition-transform">
                <Terminal className="w-5 h-5 text-brand-green" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xl font-bold tracking-tight text-white group-hover:text-brand-green transition-colors">
                    Job<span className="text-brand-green">Max</span>
                  </span>
                  <span className="font-mono text-[10px] bg-brand-green/10 text-brand-green border border-brand-green/30 px-1.5 py-0.5 rounded">
                    v1.0
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></span>
                  AI Skill-Gap Engine
                </span>
              </div>
            </div>

            {/* Portal Switcher Tabs (If logged in) */}
            {currentUser && (
              <div className="hidden md:flex items-center bg-dark-850 p-1 rounded-lg border border-dark-700">
                <button
                  onClick={() => setCurrentPortal('developer')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
                    currentPortal === 'developer'
                      ? 'bg-dark-700 text-brand-green border border-brand-green/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  Developer Portal
                  {currentUser.role === 'developer' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
                  )}
                </button>

                <button
                  onClick={() => setCurrentPortal('company')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
                    currentPortal === 'company'
                      ? 'bg-dark-700 text-brand-cyan border border-brand-cyan/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  Company Portal
                  {currentUser.role === 'company' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan"></span>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <>
                {/* Active Track Badge */}
                {currentUser.role === 'developer' && (
                  <div 
                    onClick={onOpenOnboarding}
                    className="hidden lg:flex items-center gap-2 bg-dark-800 hover:bg-dark-750 border border-dark-700 px-3 py-1.5 rounded-lg text-xs cursor-pointer text-slate-300 transition-colors"
                    title="Click to re-classify your track"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-brand-green" />
                    <span className="font-mono">
                      Track: <span className="text-brand-green font-semibold capitalize">{currentUser.track || 'Fresher'}</span> 
                      {currentUser.track === 'fresher' && ` (${currentUser.subTrack || 'On-Campus'})`}
                    </span>
                    <span className="text-[10px] text-slate-500 underline ml-1">Change</span>
                  </div>
                )}

                {/* Quick Demo Switcher Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center gap-2 bg-dark-800 hover:bg-dark-750 border border-dark-700 hover:border-dark-600 px-3 py-1.5 rounded-lg text-xs transition-all"
                  >
                    <img
                      src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
                      alt={currentUser.name}
                      className="w-6 h-6 rounded-full object-cover border border-brand-green/40"
                    />
                    <div className="text-left hidden sm:block">
                      <p className="font-medium text-slate-200 leading-none">{currentUser.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5 capitalize">
                        {currentUser.role === 'company' ? (currentUser.companyName || 'Recruiter') : currentUser.role}
                      </p>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-72 bg-dark-800 border border-dark-700 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="px-3 py-2 border-b border-dark-700/80 mb-1">
                        <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-brand-green" />
                          Quick Switch Demo Profile
                        </p>
                      </div>

                      <div className="space-y-1 max-h-60 overflow-y-auto">
                        {demoUsers.map(user => (
                          <button
                            key={user.id}
                            onClick={() => {
                              onSwitchUser(user);
                              setShowUserDropdown(false);
                            }}
                            className={`w-full flex items-center justify-between p-2 rounded-lg text-xs text-left transition-colors ${
                              currentUser.id === user.id
                                ? 'bg-dark-700 text-brand-green border border-brand-green/20'
                                : 'text-slate-300 hover:bg-dark-750'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full object-cover" />
                              <div>
                                <p className="font-medium text-slate-100">{user.name}</p>
                                <p className="text-[10px] text-slate-400 font-mono">
                                  {user.role === 'company' ? `${user.companyName} Recruiter` : `${user.track} (${user.subTrack || user.currentRole || 'Dev'})`}
                                </p>
                              </div>
                            </div>
                            {currentUser.id === user.id && (
                              <CheckCircle className="w-4 h-4 text-brand-green" />
                            )}
                          </button>
                        ))}
                      </div>

                      <div className="border-t border-dark-700/80 mt-2 pt-1">
                        <button
                          onClick={() => {
                            setShowUserDropdown(false);
                            onLogout();
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors font-mono"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          Exit to Role Selector
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400 hidden sm:inline">Choose a portal below</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
