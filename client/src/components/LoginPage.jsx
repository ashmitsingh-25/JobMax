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
  ChevronRight,
  Github
} from 'lucide-react';
import { FALLBACK_DEMO_USERS } from '../services/api';
import { auth, googleProvider, githubProvider } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export default function LoginPage({ onSelectRole }) {
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
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!modalConfig) return;

    const { role, mode } = modalConfig;
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      let userCredential;
      if (mode === 'signup' || mode === 'trial' || mode === 'contact') {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      
      const user = userCredential.user;
      
      if (role === 'developer') {
        const isFresher = developerTrack === 'fresher';
        onSelectRole('developer', {
          email: user.email,
          name: name || user.displayName || email.split('@')[0],
          uid: user.uid,
          role: 'developer',
          track: developerTrack,
          subTrack: isFresher ? fresherSubTrack : undefined,
          college: isFresher ? collegeName : undefined,
        });
      } else {
        onSelectRole('company', {
          email: user.email,
          name: name || user.displayName || email.split('@')[0],
          uid: user.uid,
          role: 'company',
          companyName: companyName || 'Microsoft'
        });
      }
    } catch (error) {
      console.error("Firebase Auth Error:", error);
      alert(error.message);
    }
  };

  const handleSocialLogin = async (provider) => {
    if (!modalConfig) return;
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      const { role } = modalConfig;
      
      if (role === 'developer') {
        const isFresher = developerTrack === 'fresher';
        onSelectRole('developer', {
          email: user.email,
          name: user.displayName || user.email.split('@')[0],
          uid: user.uid,
          role: 'developer',
          track: developerTrack,
          subTrack: isFresher ? fresherSubTrack : undefined,
          college: isFresher ? collegeName : undefined,
        });
      } else {
        onSelectRole('company', {
          email: user.email,
          name: user.displayName || user.email.split('@')[0],
          uid: user.uid,
          role: 'company',
          companyName: companyName || 'Company'
        });
      }
    } catch (error) {
      console.error("Firebase Social Login Error:", error);
      alert(error.message);
    }
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

            {/* Social Login Options */}
            <div className="mb-5 space-y-2">
              <button
                type="button"
                onClick={() => handleSocialLogin(googleProvider)}
                className="w-full flex items-center justify-center gap-2 p-2 rounded-lg bg-white border border-neutral-200 hover:bg-neutral-50 text-xs font-medium transition-colors text-neutral-700"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin(githubProvider)}
                className="w-full flex items-center justify-center gap-2 p-2 rounded-lg bg-[#24292e] hover:bg-[#2c3137] text-white text-xs font-medium transition-colors"
              >
                <Github className="w-4 h-4" />
                Continue with GitHub
              </button>
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
