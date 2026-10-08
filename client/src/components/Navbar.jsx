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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Tag */}
          <div className="flex items-center gap-5 sm:gap-6">
            <div 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 cursor-pointer group select-none"
            >
              <div className="w-8 h-8 rounded-lg bg-white border border-blue-200 text-blue-600 flex items-center justify-center font-mono font-bold text-sm shadow-xs group-hover:border-blue-300 transition-colors">
                &gt;_
              </div>
              <div className="flex items-center">
                <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors font-heading">
                  Job<span className="text-blue-600">Max</span>
                </span>
              </div>
            </div>

            {/* Active Portal Indicator */}
            {currentUser && (
              <div className="hidden md:flex items-center">
                {currentUser.role === 'developer' ? (
                  <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-teal-50 border border-teal-200/80 text-xs font-semibold text-teal-800">
                    <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                    <Code className="w-3.5 h-3.5" />
                    Developer Portal
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200/80 text-xs font-semibold text-blue-800">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <Building2 className="w-3.5 h-3.5" />
                    Company Workspace
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
                  <button 
                    type="button"
                    onClick={onOpenOnboarding}
                    className="hidden lg:flex items-center gap-2 bg-slate-100 hover:bg-slate-200/70 border border-slate-200 px-3 py-1.5 rounded-lg text-xs cursor-pointer text-slate-700 transition-colors shadow-xs"
                    title="Click to change your track"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-teal-700" />
                    <span>
                      Track: <span className="text-slate-900 font-semibold capitalize">{currentUser.track || 'Fresher'}</span> 
                      {currentUser.track === 'fresher' && ` (${currentUser.subTrack || 'On-Campus'})`}
                    </span>
                    <span className="text-[10px] text-blue-600 font-medium ml-1">Change</span>
                  </button>
                )}

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center gap-2.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 px-2.5 py-1.5 rounded-lg text-xs transition-colors shadow-xs"
                  >
                    <img
                      src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
                      alt={currentUser?.name || "User"}
                      className="w-6 h-6 rounded-full object-cover border border-slate-200"
                    />
                    <div className="text-left hidden sm:block">
                      <p className="font-semibold text-slate-900 leading-none">{currentUser?.name || "User"}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5 capitalize font-mono">
                        {currentUser?.role === 'company' ? (currentUser?.companyName || 'Recruiter') : (currentUser?.track || 'Developer')}
                      </p>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-lg p-2.5 z-50 animate-in fade-in">
                      {/* User Header */}
                      <div className="px-3 py-2 border-b border-slate-100 mb-2">
                        <p className="text-xs font-bold text-slate-900">{currentUser?.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{currentUser?.email}</p>
                        <span className={`inline-block mt-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded ${
                          currentUser?.role === 'developer' ? 'bg-teal-50 text-teal-800 border border-teal-200' : 'bg-blue-50 text-blue-800 border border-blue-200'
                        }`}>
                          {currentUser?.role === 'developer' ? 'Engineer Account' : 'Enterprise Recruiter'}
                        </span>
                      </div>

                      {/* 1-Click Persona Switcher for Evaluators */}
                      <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        Switch Demo Persona:
                      </div>
                      <div className="space-y-0.5 mb-2">
                        {demoUsers.slice(0, 4).map(demo => (
                          <button
                            key={demo.id}
                            type="button"
                            onClick={() => {
                              setShowUserDropdown(false);
                              if (onSwitchUser) onSwitchUser(demo);
                            }}
                            className={`w-full text-left px-2.5 py-1.5 rounded text-xs flex items-center justify-between transition-colors ${
                              currentUser?.id === demo.id ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span className="truncate">{demo.name} ({demo.role === 'company' ? 'HR' : demo.track})</span>
                            {currentUser?.id === demo.id && <span className="text-[10px] text-blue-600 font-bold">Active</span>}
                          </button>
                        ))}
                      </div>

                      {/* Developer Track Option */}
                      {currentUser?.role === 'developer' && (
                        <div className="border-t border-slate-100 pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              setShowUserDropdown(false);
                              if (onOpenOnboarding) onOpenOnboarding();
                            }}
                            className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded transition-colors"
                          >
                            <GraduationCap className="w-3.5 h-3.5 text-teal-700" />
                            Re-classify Track & College
                          </button>
                        </div>
                      )}

                      {/* Logout Option */}
                      <div className="border-t border-slate-100 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setShowUserDropdown(false);
                            onLogout();
                          }}
                          className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded transition-colors font-medium"
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
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors border border-slate-200 hover:border-rose-200"
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
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors border border-slate-300 hover:border-slate-400 shadow-xs"
                >
                  <span>Login</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
