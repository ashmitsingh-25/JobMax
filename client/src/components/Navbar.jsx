import React, { useState, useEffect } from 'react';
import { Terminal, Users, Building2, ChevronDown, Sparkles, LogOut, CheckCircle, Code, Briefcase, GraduationCap } from 'lucide-react';
import { api, FALLBACK_DEMO_USERS } from '../services/api';

export default function Navbar({
  currentUser,
  currentPortal,
  setCurrentPortal,
  onSwitchUser,
  onLogout,
  onOpenOnboarding
}) {
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
    <header className="sticky top-0 z-40 bg-slate-50/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Tag */}
          <div className="flex items-center gap-6">
            <div 
              onClick={() => onLogout && onLogout()}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-lg bg-white border border-black/40 flex items-center justify-center text-black shadow-sm group-hover:scale-105 transition-transform">
                <Terminal className="w-5 h-5 text-black" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xl font-bold tracking-tight text-white group-hover:text-black transition-colors">
                    Job<span className="text-black">Max</span>
                  </span>
                  <span className="font-mono text-[10px] bg-black/10 text-black border border-black/30 px-1.5 py-0.5 rounded">
                    v1.0
                  </span>
                </div>
                <span className="text-[10px] text-slate-600 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></span>
                  AI Skill-Gap Engine
                </span>
              </div>
            </div>

            {/* Portal Switcher Tabs (If logged in) */}
            {currentUser && (
              <div className="hidden md:flex items-center bg-white p-1 rounded-lg border border-slate-200">
                <button
                  onClick={() => setCurrentPortal('developer')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
                    currentPortal === 'developer'
                      ? 'bg-slate-100 text-black border border-black/30 shadow-sm'
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  Developer Portal
                  {currentUser.role === 'developer' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                  )}
                </button>

                <button
                  onClick={() => setCurrentPortal('company')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
                    currentPortal === 'company'
                      ? 'bg-slate-100 text-blue-600 border border-blue-600/30 shadow-sm'
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  Company Portal
                  {currentUser.role === 'company' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
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
                    className="hidden lg:flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs cursor-pointer text-slate-700 transition-colors"
                    title="Click to re-classify your track"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-black" />
                    <span className="font-mono">
                      Track: <span className="text-black font-semibold capitalize">{currentUser.track || 'Fresher'}</span> 
                      {currentUser.track === 'fresher' && ` (${currentUser.subTrack || 'On-Campus'})`}
                    </span>
                    <span className="text-[10px] text-slate-500 underline ml-1">Change</span>
                  </div>
                )}

                {/* Quick Demo Switcher Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 px-3 py-1.5 rounded-lg text-xs transition-all"
                  >
                    <img
                      src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
                      alt={currentUser?.name || "User"}
                      className="w-6 h-6 rounded-full object-cover border border-black/40"
                    />
                    <div className="text-left hidden sm:block">
                      <p className="font-medium text-slate-800 leading-none">{currentUser?.name || "User"}</p>
                      <p className="text-[10px] text-slate-600 font-mono mt-0.5 capitalize">
                        {currentUser?.role === 'company' ? (currentUser?.companyName || 'Recruiter') : (currentUser?.role || 'Developer')}
                      </p>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
                  </button>

                  {/* Dropdown Menu */}
                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="px-3 py-2 border-b border-slate-200/80 mb-1">
                        <p className="text-[11px] font-mono text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-black" />
                          Quick Switch Demo Profile
                        </p>
                      </div>

                      <div className="space-y-1 max-h-60 overflow-y-auto">
                        {(demoUsers || []).map(user => {
                          if (!user) return null;
                          return (
                            <button
                              key={user.id || Math.random()}
                              onClick={() => {
                                onSwitchUser(user);
                                setShowUserDropdown(false);
                              }}
                              className={`w-full flex items-center justify-between p-2 rounded-lg text-xs text-left transition-colors ${
                                currentUser?.id === user.id
                                  ? 'bg-slate-100 text-black border border-black/20'
                                  : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <img src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"} alt={user.name || "User"} className="w-6 h-6 rounded-full object-cover" />
                                <div>
                                  <p className="font-medium text-slate-900">{user.name || "User"}</p>
                                  <p className="text-[10px] text-slate-600 font-mono">
                                    {user.role === 'company' ? `${user.companyName || 'Company'} Recruiter` : `${user.track || 'Fresher'} (${user.subTrack || user.currentRole || 'Dev'})`}
                                  </p>
                                </div>
                              </div>
                              {currentUser?.id === user.id && (
                                <CheckCircle className="w-4 h-4 text-black" />
                              )}
                            </button>
                          );
                        })}
                      </div>


                      <div className="border-t border-slate-200/80 mt-2 pt-1">
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
                <span className="text-xs font-mono text-slate-600 hidden sm:inline">Choose a portal below</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
