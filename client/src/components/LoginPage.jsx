import React, { useState } from 'react';
import { 
  Terminal, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  GraduationCap, 
  Briefcase, 
  TrendingUp, 
  Building2, 
  Lock, 
  Mail, 
  User, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { FALLBACK_DEMO_USERS } from '../services/api';

export default function LoginPage({ onSelectRole, onQuickLogin }) {
  // Modal state
  const [modalConfig, setModalConfig] = useState(null); 
  // modalConfig: { role: 'company' | 'developer', mode: 'login' | 'signup' | 'trial' | 'contact' } | null

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [developerTrack, setDeveloperTrack] = useState('fresher'); // 'fresher' | 'experienced'
  const [fresherSubTrack, setFresherSubTrack] = useState('on-campus'); // 'on-campus' | 'off-campus'
  const [collegeName, setCollegeName] = useState('Indian Institute of Technology (IIT) Delhi');

  // Quick helper to open modal
  const openModal = (role, mode = 'login') => {
    setModalConfig({ role, mode });
    setEmail('');
    setPassword('');
    setName('');
    setCompanyName(role === 'company' ? 'Microsoft' : '');
  };

  const closeModal = () => {
    setModalConfig(null);
  };

  // Form submission handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!modalConfig) return;

    const { role, mode } = modalConfig;

    if (role === 'developer') {
      const isFresher = developerTrack === 'fresher';
      onSelectRole('developer', {
        email: email || (isFresher ? 'student@iitd.ac.in' : 'developer@techcorp.com'),
        name: name || (email ? email.split('@')[0] : 'Aarav Sharma'),
        role: 'developer',
        track: developerTrack,
        subTrack: isFresher ? fresherSubTrack : undefined,
        college: isFresher ? collegeName : undefined,
      });
    } else {
      onSelectRole('company', {
        email: email || 'recruiter@microsoft.com',
        name: name || (email ? email.split('@')[0] : 'Sarah Jenkins'),
        role: 'company',
        companyName: companyName || 'Microsoft'
      });
    }
  };

  // 1-Click instant demo login
  const handleDemoSelect = (userId) => {
    onQuickLogin(userId);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col justify-between relative overflow-hidden font-sans selection:bg-[#00EA64]/30 selection:text-black">
      
      {/* Top Subtle Ambient Pastel Aura (Soft Pink / Purple / Cyan Blended Glow) */}
      <div className="absolute top-0 left-0 right-0 h-64 sm:h-72 pointer-events-none z-0 overflow-hidden">
        {/* Soft Pink / Violet Aura at top-left center */}
        <div 
          className="absolute -top-24 left-[38%] w-[520px] h-[340px] rounded-full blur-3xl opacity-40 transform -translate-x-1/2 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(244,114,182,0.45) 0%, rgba(216,180,254,0.3) 40%, transparent 70%)' }}
        />
        {/* Soft Cyan / Sky Aura at top-right center */}
        <div 
          className="absolute -top-24 right-[38%] w-[520px] h-[340px] rounded-full blur-3xl opacity-35 transform translate-x-1/2 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.4) 0%, rgba(147,197,253,0.25) 40%, transparent 70%)' }}
        />
      </div>

      {/* Minimal Top Brand Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pt-6 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-black text-[#00EA64] flex items-center justify-center font-mono font-bold shadow-sm">
            <Terminal className="w-4 h-4 text-[#00EA64]" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-lg font-bold text-neutral-900 tracking-tight">
              Job<span className="text-[#00875a]">Max</span>
            </span>
            <span className="text-[10px] font-mono font-medium text-neutral-500 bg-neutral-100 border border-neutral-200 px-1.5 py-0.5 rounded">
              v1.0
            </span>
          </div>
        </div>

        {/* Quick Demo Pill Shortcut */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDemoSelect('user-fresher-1')}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-neutral-600 hover:text-black bg-neutral-100/80 hover:bg-neutral-200/80 border border-neutral-200 px-3 py-1.5 rounded-full transition-colors"
            title="Instant evaluation login as IIT Delhi student"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Quick Demo: Fresher</span>
          </button>

          <button
            onClick={() => handleDemoSelect('user-company-1')}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-neutral-600 hover:text-black bg-neutral-100/80 hover:bg-neutral-200/80 border border-neutral-200 px-3 py-1.5 rounded-full transition-colors"
            title="Instant evaluation login as Microsoft recruiter"
          >
            <Building2 className="w-3.5 h-3.5 text-blue-500" />
            <span>Quick Demo: Recruiter</span>
          </button>
        </div>
      </header>

      {/* Main Split-Screen Section */}
      <main className="relative z-10 flex-grow flex items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="w-full relative">
          
          {/* Symmetrical Two-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 relative">
            
            {/* Center Vertical Divider (Desktop Only) */}
            <div 
              className="hidden md:block absolute top-4 bottom-4 left-1/2 -translate-x-1/2 w-[1px] bg-neutral-200 pointer-events-none"
              aria-hidden="true"
            />

            {/* LEFT COLUMN: For Companies */}
            <div className="flex flex-col items-center justify-between text-center px-6 sm:px-12 py-8 md:py-12 md:pr-16">
              <div className="flex flex-col items-center">
                
                {/* BUSINESS Pill Badge */}
                <div className="h-8 flex items-center justify-center mb-4">
                  <span className="inline-block bg-black text-white text-[10px] font-bold tracking-[0.16em] uppercase px-3.5 py-1 rounded-full shadow-sm">
                    BUSINESS
                  </span>
                </div>

                {/* Heading */}
                <h1 className="text-3xl sm:text-[34px] font-sans font-medium text-neutral-900 tracking-tight mb-4">
                  For <span className="font-serif italic font-normal">Companies</span>
                </h1>

                {/* Subtext */}
                <p className="text-neutral-600 text-sm sm:text-[15px] leading-relaxed max-w-[420px] mb-8 font-normal">
                  Thousands of companies have embraced the new way to hire and upskill developers across roles and throughout their careers.
                </p>

                {/* Black Action Button */}
                <button
                  type="button"
                  onClick={() => openModal('company', 'login')}
                  className="bg-black hover:bg-neutral-800 active:scale-[0.98] text-white font-medium text-sm px-8 py-2.5 rounded-[6px] transition-all duration-150 shadow-sm hover:shadow"
                >
                  Login
                </button>
              </div>

              {/* Bottom Footer Section */}
              <div className="mt-14 sm:mt-16 text-center">
                <p className="text-neutral-500 text-xs sm:text-[13px] mb-1.5 font-normal">
                  Don't have an account?
                </p>
                <div className="text-xs sm:text-[13px]">
                  <button 
                    type="button"
                    onClick={() => openModal('company', 'contact')}
                    className="text-[#00875a] hover:underline font-semibold"
                  >
                    Contact sales
                  </button>
                  <span className="text-neutral-500 font-normal"> or </span>
                  <button 
                    type="button"
                    onClick={() => openModal('company', 'trial')}
                    className="text-[#00875a] hover:underline font-semibold"
                  >
                    Get free trial
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Horizontal Divider */}
            <div className="block md:hidden w-full h-[1px] bg-neutral-200 my-4" />

            {/* RIGHT COLUMN: For Developers */}
            <div className="flex flex-col items-center justify-between text-center px-6 sm:px-12 py-8 md:py-12 md:pl-16">
              <div className="flex flex-col items-center">
                
                {/* Spacer to align baseline with left badge */}
                <div className="h-8 mb-4 hidden md:block" aria-hidden="true" />

                {/* Heading */}
                <h2 className="text-3xl sm:text-[34px] font-sans font-medium text-neutral-900 tracking-tight mb-4">
                  For <span className="font-serif italic font-normal">Developers</span>
                </h2>

                {/* Subtext */}
                <p className="text-neutral-600 text-sm sm:text-[15px] leading-relaxed max-w-[390px] mb-8 font-normal">
                  Join over 26 million developers, practice coding skills, prepare for interviews, and get hired.
                </p>

                {/* Black Action Button */}
                <button
                  type="button"
                  onClick={() => openModal('developer', 'login')}
                  className="bg-black hover:bg-neutral-800 active:scale-[0.98] text-white font-medium text-sm px-8 py-2.5 rounded-[6px] transition-all duration-150 shadow-sm hover:shadow"
                >
                  Login
                </button>
              </div>

              {/* Bottom Footer Section */}
              <div className="mt-14 sm:mt-16 text-center">
                <p className="text-neutral-500 text-xs sm:text-[13px] mb-1.5 font-normal">
                  Don't have an account?
                </p>
                <div className="text-xs sm:text-[13px]">
                  <button 
                    type="button"
                    onClick={() => openModal('developer', 'signup')}
                    className="text-[#00875a] hover:underline font-semibold"
                  >
                    Sign up.
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Floating Subtle Demo Toolbar for Evaluators */}
      <div className="relative z-10 pb-6 text-center px-4">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-neutral-50/90 backdrop-blur-sm border border-neutral-200/90 px-4 py-2 rounded-full shadow-sm text-xs font-mono text-neutral-600">
          <span className="flex items-center gap-1 text-neutral-800 font-semibold mr-1">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            1-Click Demo Profiles:
          </span>
          <button
            onClick={() => handleDemoSelect('user-fresher-1')}
            className="hover:text-black hover:bg-white px-2 py-1 rounded transition-colors"
          >
            🎓 Fresher (IIT Delhi)
          </button>
          <span className="text-neutral-300">·</span>
          <button
            onClick={() => handleDemoSelect('user-fresher-2')}
            className="hover:text-black hover:bg-white px-2 py-1 rounded transition-colors"
          >
            💼 Fresher (BITS Off-Campus)
          </button>
          <span className="text-neutral-300">·</span>
          <button
            onClick={() => handleDemoSelect('user-exp-1')}
            className="hover:text-black hover:bg-white px-2 py-1 rounded transition-colors"
          >
            🚀 SDE II (Swiggy 3.5 YoE)
          </button>
          <span className="text-neutral-300">·</span>
          <button
            onClick={() => handleDemoSelect('user-company-1')}
            className="hover:text-black hover:bg-white px-2 py-1 rounded transition-colors font-medium text-[#00875a]"
          >
            🏢 Recruiter (Microsoft)
          </button>
        </div>
      </div>

      {/* Minimalist Clean Modal Overlay */}
      {modalConfig && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-md bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-700 p-1 rounded-md transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-6">
              {modalConfig.role === 'company' && (
                <span className="inline-block bg-black text-white text-[9px] font-bold tracking-[0.16em] uppercase px-2.5 py-0.5 rounded-full mb-2">
                  BUSINESS
                </span>
              )}
              <h3 className="text-xl sm:text-2xl font-sans font-semibold text-neutral-900">
                {modalConfig.mode === 'signup' 
                  ? 'Create Developer Account'
                  : modalConfig.mode === 'trial' 
                  ? 'Start Company Free Trial'
                  : modalConfig.mode === 'contact'
                  ? 'Contact Enterprise Sales'
                  : modalConfig.role === 'company' 
                  ? 'Log in as Company' 
                  : 'Log in as Developer'}
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                {modalConfig.role === 'company' 
                  ? 'Access candidate skill gap analytics & recruitment engine'
                  : 'Benchmark your skills against real company job bars'}
              </p>
            </div>

            {/* Quick 1-Click Demo Profile Option Inside Modal */}
            <div className="mb-5 bg-neutral-50 border border-neutral-200/80 rounded-xl p-3">
              <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider mb-2 flex items-center gap-1.5 font-medium">
                <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                Instant Demo Evaluation Login
              </p>
              
              {modalConfig.role === 'company' ? (
                <button
                  type="button"
                  onClick={() => handleDemoSelect('user-company-1')}
                  className="w-full flex items-center justify-between p-2 rounded-lg bg-white border border-neutral-200 hover:border-black text-left text-xs transition-all shadow-sm group"
                >
                  <div className="flex items-center gap-2.5">
                    <img 
                      src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&auto=format&fit=crop&q=60" 
                      alt="Sarah Jenkins" 
                      className="w-8 h-8 rounded-full object-cover border border-neutral-200" 
                    />
                    <div>
                      <p className="font-medium text-neutral-900 group-hover:text-black">Sarah Jenkins</p>
                      <p className="text-[10px] text-neutral-500 font-mono">Microsoft · Principal Talent Partner</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-black transition-transform group-hover:translate-x-0.5" />
                </button>
              ) : (
                <div className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => handleDemoSelect('user-fresher-1')}
                    className="w-full flex items-center justify-between p-2 rounded-lg bg-white border border-neutral-200 hover:border-black text-left text-xs transition-all shadow-sm group"
                  >
                    <div className="flex items-center gap-2">
                      <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                        alt="Aarav Sharma" 
                        className="w-7 h-7 rounded-full object-cover border border-neutral-200" 
                      />
                      <div>
                        <p className="font-medium text-neutral-900">Aarav Sharma</p>
                        <p className="text-[10px] text-neutral-500 font-mono">IIT Delhi · Fresher (On-Campus)</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#00875a] font-medium">1-Click</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDemoSelect('user-exp-1')}
                    className="w-full flex items-center justify-between p-2 rounded-lg bg-white border border-neutral-200 hover:border-black text-left text-xs transition-all shadow-sm group"
                  >
                    <div className="flex items-center gap-2">
                      <img 
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" 
                        alt="Vikram Malhotra" 
                        className="w-7 h-7 rounded-full object-cover border border-neutral-200" 
                      />
                      <div>
                        <p className="font-medium text-neutral-900">Vikram Malhotra</p>
                        <p className="text-[10px] text-neutral-500 font-mono">Swiggy · SDE II (3.5 YoE)</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#00875a] font-medium">1-Click</span>
                  </button>
                </div>
              )}
            </div>

            <div className="relative flex py-1 items-center mb-5">
              <div className="flex-grow border-t border-neutral-200"></div>
              <span className="flex-shrink mx-3 text-[10px] text-neutral-400 font-mono uppercase">or continue with credentials</span>
              <div className="flex-grow border-t border-neutral-200"></div>
            </div>

            {/* Custom Input Form */}
            <form onSubmit={handleFormSubmit} className="space-y-3.5">
              {/* Name field for sign up / trial */}
              {(modalConfig.mode === 'signup' || modalConfig.mode === 'trial' || modalConfig.mode === 'contact') && (
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="e.g. Alex Johnson"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                    />
                  </div>
                </div>
              )}

              {/* Company field */}
              {modalConfig.role === 'company' && (
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">Company Name</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="e.g. Microsoft, Amazon, Google"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                    />
                  </div>
                </div>
              )}

              {/* Developer Track Selector for Sign Up */}
              {modalConfig.role === 'developer' && modalConfig.mode === 'signup' && (
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-neutral-700">Select Track</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeveloperTrack('fresher')}
                      className={`py-1.5 px-3 rounded-lg text-xs font-medium border text-center transition-all ${
                        developerTrack === 'fresher' 
                          ? 'border-black bg-black text-white' 
                          : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                      }`}
                    >
                      🎓 College Fresher
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeveloperTrack('experienced')}
                      className={`py-1.5 px-3 rounded-lg text-xs font-medium border text-center transition-all ${
                        developerTrack === 'experienced' 
                          ? 'border-black bg-black text-white' 
                          : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                      }`}
                    >
                      🚀 Experienced (1-5+ YoE)
                    </button>
                  </div>
                </div>
              )}

              {/* Email field */}
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  {modalConfig.role === 'company' ? 'Work Email' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    placeholder={modalConfig.role === 'company' ? 'recruiter@microsoft.com' : 'student@iitd.ac.in'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-black hover:bg-neutral-800 active:scale-[0.99] text-white font-medium text-xs sm:text-sm py-2.5 rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 mt-4"
              >
                <span>
                  {modalConfig.mode === 'signup' 
                    ? 'Create Account & Enter'
                    : modalConfig.mode === 'trial'
                    ? 'Start Free Trial'
                    : 'Log In'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Modal Footer Mode Switch */}
            <div className="mt-4 pt-3 border-t border-neutral-100 text-center text-xs text-neutral-500">
              {modalConfig.mode === 'login' ? (
                modalConfig.role === 'developer' ? (
                  <p>
                    Don't have an account?{' '}
                    <button 
                      onClick={() => openModal('developer', 'signup')}
                      className="text-[#00875a] font-semibold hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                ) : (
                  <p>
                    Don't have an account?{' '}
                    <button 
                      onClick={() => openModal('company', 'trial')}
                      className="text-[#00875a] font-semibold hover:underline"
                    >
                      Get free trial
                    </button>
                  </p>
                )
              ) : (
                <p>
                  Already have an account?{' '}
                  <button 
                    onClick={() => openModal(modalConfig.role, 'login')}
                    className="text-[#00875a] font-semibold hover:underline"
                  >
                    Log in
                  </button>
                </p>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
