import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Users, Building2, ChevronDown, Sparkles, LogOut, CheckCircle, Code, Briefcase, GraduationCap, ArrowRight } from 'lucide-react';
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
    <header className="sticky top-0 z-40 bg-dark-900/90 backdrop-blur-md border-b border-dark-700/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Tag */}
          <div className="flex items-center gap-6">
            <div 
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-lg bg-dark-800 border border-brand-green/40 flex items-center justify-center text-brand-green shadow-glow-green group-hover:scale-105 transition-transform">
                <Terminal className="w-5 h-5 text-brand-green" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold tracking-tight text-white group-hover:text-brand-green transition-colors">
                    Job<span className="text-brand-green">Max</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Active Portal Indicator */}
            {currentUser && (
              <div className="hidden md:flex items-center bg-dark-850 px-3.5 py-1.5 rounded-lg border border-dark-700">
                {currentUser.role === 'developer' ? (
                  <div className="flex items-center gap-2 text-xs font-medium text-brand-green">
                    <Code className="w-3.5 h-3.5" />
                    Developer Portal
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs font-medium text-brand-cyan">
                    <Building2 className="w-3.5 h-3.5" />
                    Company Portal
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan"></span>
                  </div>
                )}
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
                    <span>
                      Track: <span className="text-brand-green font-semibold capitalize">{currentUser.track || 'Fresher'}</span> 
                      {currentUser.track === 'fresher' && ` (${currentUser.subTrack || 'On-Campus'})`}
                    </span>
                    <span className="text-[10px] text-slate-500 underline ml-1">Change</span>
                  </div>
                )}

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center gap-2 bg-dark-800 hover:bg-dark-750 border border-dark-700 hover:border-dark-600 px-3 py-1.5 rounded-lg text-xs transition-all"
                  >
                    <img
                      src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
                      alt={currentUser?.name || "User"}
                      className="w-6 h-6 rounded-full object-cover border border-brand-green/40"
                    />
                    <div className="text-left hidden sm:block">
                      <p className="font-medium text-slate-200 leading-none">{currentUser?.name || "User"}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5 capitalize">
                        {currentUser?.role === 'company' ? (currentUser?.companyName || 'Recruiter') : (currentUser?.role || 'Developer')}
                      </p>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-dark-800 border border-dark-700 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="border-t border-dark-700/80 pt-1">
                        <button
                          onClick={() => {
                            setShowUserDropdown(false);
                            onLogout();
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Standalone Logout Button */}
                <button
                  onClick={onLogout}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-rose-500/10 hover:text-rose-400 transition-colors border border-transparent hover:border-rose-500/20 ml-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('trigger-auth', { detail: { role: 'role-selection' } }))}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white bg-dark-800 hover:bg-dark-700 transition-colors border border-dark-600 hover:border-brand-green/30"
                >
                  Login <ArrowRight className="w-4 h-4 ml-1 text-slate-400" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
