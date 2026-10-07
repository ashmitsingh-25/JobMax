import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Terminal, 
  Users, 
  Building2, 
  ChevronDown, 
  Sparkles, 
  LogOut, 
  CheckCircle, 
  Code, 
  Briefcase, 
  GraduationCap, 
  ArrowRight,
  UserCheck,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { api, FALLBACK_DEMO_USERS } from '../services/api';

export default function Navbar({
  currentUser,
  onSwitchUser,
  onLogout,
  onOpenOnboarding
}) {
  const navigate = useNavigate();
  const [demoUsers, setDemoUsers] = useState(FALLBACK_DEMO_USERS);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  useEffect(() => {
    let isMounted = true;
    api.getDemoUsers()
      .then(res => {
        if (isMounted && res && res.users && Array.isArray(res.users) && res.users.length > 0) {
          setDemoUsers(res.users);
        }
      })
      .catch(err => console.warn("Error loading demo users:", err));
    return () => { isMounted = false; };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-dark-900/85 backdrop-blur-xl border-b border-dark-700/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Tag */}
          <div className="flex items-center gap-5 sm:gap-6">
            <div 
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-mono font-bold shadow-glow-blue border border-blue-400/30 group-hover:scale-105 transition-transform duration-200">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-blue-400 transition-colors font-heading">
                    Job<span className="text-blue-400">Max</span>
                  </span>
                  <span className="text-[10px] font-mono font-semibold text-slate-400 bg-dark-800 border border-dark-700 px-1.5 py-0.5 rounded">
                    AI
                  </span>
                </div>
              </div>
            </div>

            {/* Active Portal Indicator */}
            {currentUser && (
              <div className="hidden md:flex items-center bg-dark-850 px-3 py-1 rounded-full border border-dark-700">
                {currentUser.role === 'developer' ? (
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <Code className="w-3.5 h-3.5" />
                    Developer Hub
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-400">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                    <Building2 className="w-3.5 h-3.5" />
                    Recruiter Workspace
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {currentUser ? (
              <>
                {/* Active Track Badge */}
                {currentUser.role === 'developer' && (
                  <div 
                    onClick={onOpenOnboarding}
                    className="hidden lg:flex items-center gap-2 bg-dark-850 hover:bg-dark-800 border border-dark-700 hover:border-emerald-500/40 px-3 py-1.5 rounded-lg text-xs cursor-pointer text-slate-300 transition-all shadow-sm"
                    title="Click to re-classify your track"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                    <span>
                      Track: <span className="text-emerald-400 font-bold capitalize">{currentUser.track || 'Fresher'}</span> 
                      {currentUser.track === 'fresher' && ` (${currentUser.subTrack || 'On-Campus'})`}
                    </span>
                    <span className="text-[10px] text-slate-400 underline ml-1 hover:text-white">Change</span>
                  </div>
                )}

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center gap-2.5 bg-dark-850 hover:bg-dark-800 border border-dark-700 hover:border-dark-600 px-3 py-1.5 rounded-xl text-xs transition-all shadow-sm"
                  >
                    <img
                      src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
                      alt={currentUser?.name || "User"}
                      className="w-7 h-7 rounded-full object-cover border border-blue-500/40"
                    />
                    <div className="text-left hidden sm:block">
                      <p className="font-semibold text-white leading-none">{currentUser?.name || "User"}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5 capitalize font-mono">
                        {currentUser?.role === 'company' ? (currentUser?.companyName || 'Recruiter') : (currentUser?.track || 'Developer')}
                      </p>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {/* Enhanced Dropdown Menu */}
                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-64 bg-dark-850 border border-dark-700 rounded-2xl shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2">
                      {/* User Header */}
                      <div className="px-3 py-2 border-b border-dark-700/80 mb-2">
                        <p className="text-xs font-bold text-white">{currentUser?.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{currentUser?.email}</p>
                        <span className={`inline-block mt-1 text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          currentUser?.role === 'developer' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-blue-950 text-blue-400 border border-blue-500/30'
                        }`}>
                          {currentUser?.role === 'developer' ? 'Engineer Account' : 'Enterprise Recruiter'}
                        </span>
                      </div>

                      {/* 1-Click Persona Switcher for Evaluators */}
                      <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        ⚡ Quick Switch Profile:
                      </div>
                      <div className="space-y-1 mb-2">
                        {demoUsers.slice(0, 4).map(demo => (
                          <button
                            key={demo.id}
                            type="button"
                            onClick={() => {
                              setShowUserDropdown(false);
                              if (onSwitchUser) onSwitchUser(demo);
                            }}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                              currentUser?.id === demo.id ? 'bg-blue-600/20 text-blue-300 font-semibold' : 'text-slate-300 hover:bg-dark-800 hover:text-white'
                            }`}
                          >
                            <span className="truncate">{demo.name} ({demo.role === 'company' ? 'HR' : demo.track})</span>
                            {currentUser?.id === demo.id && <span className="text-[10px] text-blue-400">Active</span>}
                          </button>
                        ))}
                      </div>

                      {/* Developer Track Option */}
                      {currentUser?.role === 'developer' && (
                        <div className="border-t border-dark-700/80 pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              setShowUserDropdown(false);
                              if (onOpenOnboarding) onOpenOnboarding();
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:bg-dark-800 rounded-lg transition-colors"
                          >
                            <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                            Re-classify Track & College
                          </button>
                        </div>
                      )}

                      {/* Logout Option */}
                      <div className="border-t border-dark-700/80 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setShowUserDropdown(false);
                            onLogout();
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors font-medium"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Standalone Logout Button */}
                <button
                  type="button"
                  onClick={onLogout}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-rose-500/10 hover:text-rose-400 transition-all border border-transparent hover:border-rose-500/20"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('trigger-auth', { detail: { role: 'developer' } }))}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-glow-blue transition-all border border-blue-400/20 active:scale-[0.98]"
                >
                  <span>Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
