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
  ShieldCheck,
  Eye,
  EyeOff
} from 'lucide-react';
import { FALLBACK_DEMO_USERS } from '../services/api';
import { auth, googleProvider, githubProvider } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export default function LoginPage({ onSelectRole }) {
  // Modal state: { role: 'company' | 'developer', mode: 'login' | 'signup' | 'trial' | 'contact' } | null
  const [modalConfig, setModalConfig] = useState(null);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [developerTrack, setDeveloperTrack] = useState('fresher'); // 'fresher' | 'experienced'
  const [fresherSubTrack, setFresherSubTrack] = useState('on-campus'); // 'on-campus' | 'off-campus'
  const [collegeName, setCollegeName] = useState('Indian Institute of Technology (IIT) Delhi');
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Open modal
  const openModal = (role, mode = 'login') => {
    setModalConfig({ role, mode });
    setEmail('');
    setPassword('');
    setName('');
    setAuthError('');
    setCompanyName(role === 'company' ? 'Microsoft' : '');
  };

  const closeModal = () => {
    setModalConfig(null);
    setAuthError('');
  };

  // Instant 1-Click Demo Profiles selector
  const handleDemoSelect = (userId) => {
    const user = FALLBACK_DEMO_USERS.find(u => u.id === userId) || FALLBACK_DEMO_USERS[0];
    if (user && onSelectRole) {
      onSelectRole(user.role, user);
    }
  };

  // Form submission handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!modalConfig) return;

    const { role, mode } = modalConfig;
    if (!email || !password) {
      setAuthError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setAuthError('');

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
          avatar: user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          skills: ['Data Structures & Algorithms', 'React', 'JavaScript', 'Node.js']
        });
      } else {
        onSelectRole('company', {
          email: user.email,
          name: name || user.displayName || email.split('@')[0],
          uid: user.uid,
          role: 'company',
          companyName: companyName || 'Enterprise Partner',
          avatar: user.photoURL || 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150'
        });
      }
    } catch (error) {
      console.error("Firebase Auth Error:", error);
      if (error.code === 'auth/api-key-not-valid' || error.message?.includes('api-key')) {
        if (role === 'developer') {
          onSelectRole('developer', {
            email: email,
            name: name || email.split('@')[0],
            uid: `dev_${Date.now()}`,
            role: 'developer',
            track: developerTrack,
            subTrack: fresherSubTrack,
            college: collegeName,
            skills: ['Data Structures & Algorithms', 'React', 'JavaScript']
          });
        } else {
          onSelectRole('company', {
            email: email,
            name: name || email.split('@')[0],
            uid: `comp_${Date.now()}`,
            role: 'company',
            companyName: companyName || 'Company'
          });
        }
      } else {
        setAuthError(error.message || "Authentication failed. Please check credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    if (!modalConfig) return;
    setLoading(true);
    setAuthError('');
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
          avatar: user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          skills: ['Data Structures & Algorithms', 'React', 'JavaScript', 'Node.js']
        });
      } else {
        onSelectRole('company', {
          email: user.email,
          name: user.displayName || user.email.split('@')[0],
          uid: user.uid,
          role: 'company',
          companyName: companyName || 'Enterprise Partner',
          avatar: user.photoURL || 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150'
        });
      }
    } catch (error) {
      console.error("Firebase Social Login Error:", error);
      if (error.code === 'auth/api-key-not-valid' || error.message?.includes('api-key')) {
        const { role } = modalConfig;
        if (role === 'developer') {
          handleDemoSelect('user-fresher-1');
        } else {
          handleDemoSelect('user-company-1');
        }
      } else {
        setAuthError(error.message || "Social login cancelled.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between relative overflow-hidden font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Top Header Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pt-6 pb-4 flex items-center justify-between border-b border-slate-200/80 bg-white shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-mono font-bold shadow-xs">
            <Terminal className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-heading text-lg font-bold text-slate-900 tracking-tight">
              Job<span className="text-blue-600">Max</span>
            </span>
            <span className="text-[10px] font-mono font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
              B2B PLATFORM
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span className="hidden sm:inline">256-bit Encrypted • SOC2 Type II Certified</span>
        </div>
      </header>

      {/* Main Symmetrical Split-Screen */}
      <main className="relative z-10 flex-grow flex items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="w-full">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-heading">
              Select Your Workspace
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Choose your profile type to access benchmark intelligence, recruitment consoles, and skill analytics.
            </p>
          </div>

          {/* Symmetrical Two-Column Bento Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">

            {/* LEFT COLUMN: For Companies */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-md">
                    <Building2 className="w-3.5 h-3.5" />
                    ENTERPRISE RECRUITMENT
                  </span>
                  <span className="text-xs text-slate-500 font-mono">500+ Companies</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2 font-heading">
                  For <span className="text-blue-600">Companies</span> & HR Teams
                </h2>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Evaluate candidates with automated skill-gap benchmarks, multi-college batch calibration, salary predictions, and code verifications.
                </p>

                <div className="space-y-2 mb-8">
                  <div className="flex items-center gap-2.5 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>Candidate Skill Radar & Code Verification</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>ML Salary Hike & SDE Success Predictor</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>On-Campus & Off-Campus Multi-Tier Talent Pool</span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => openModal('company', 'login')}
                  className="w-full btn-primary py-2.5 text-sm"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Sign In as Recruiter</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <div className="mt-3.5 flex items-center justify-center gap-3 text-xs text-slate-500">
                  <button 
                    type="button"
                    onClick={() => openModal('company', 'trial')}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Start Free Trial
                  </button>
                  <span>•</span>
                  <button 
                    type="button"
                    onClick={() => openModal('company', 'contact')}
                    className="text-slate-600 hover:text-slate-900 hover:underline"
                  >
                    Contact Enterprise Sales
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: For Developers */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-flex items-center gap-1.5 bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold px-2.5 py-1 rounded-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    DEVELOPER PORTAL
                  </span>
                  <span className="text-xs text-slate-500 font-mono">26,000+ Engineers</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2 font-heading">
                  For <span className="text-teal-700">Developers</span> & Students
                </h2>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Benchmark your technical skills against actual hiring bars, close identified gaps, practice targeted contests, and receive direct company proposals.
                </p>

                <div className="space-y-2 mb-8">
                  <div className="flex items-center gap-2.5 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <span>Personalized Skill Radar vs Company Bar</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <span>Campus Placement Insights (IIT, BITS, NITs)</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <span>Direct Company Proposals & Real-World Projects</span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => openModal('developer', 'login')}
                  className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 shadow-xs active:scale-[0.99]"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Sign In as Developer</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <div className="mt-3.5 flex items-center justify-center gap-2 text-xs text-slate-500">
                  <span>Don't have an account?</span>
                  <button 
                    type="button"
                    onClick={() => openModal('developer', 'signup')}
                    className="text-teal-700 hover:underline font-semibold"
                  >
                    Create Free Profile
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* 1-Click Demo Profiles Bar */}
      <div className="relative z-10 pb-8 text-center px-4">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-xs text-xs font-mono text-slate-600">
          <span className="flex items-center gap-1.5 text-slate-800 font-semibold mr-1">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            1-Click Demo Profiles:
          </span>
          <button
            type="button"
            onClick={() => handleDemoSelect('user-fresher-1')}
            className="hover:text-blue-600 hover:bg-slate-50 px-2 py-1 rounded transition-colors"
          >
            🎓 Fresher (IIT Delhi)
          </button>
          <span className="text-slate-300">·</span>
          <button
            type="button"
            onClick={() => handleDemoSelect('user-fresher-2')}
            className="hover:text-blue-600 hover:bg-slate-50 px-2 py-1 rounded transition-colors"
          >
            💼 Fresher (BITS Off-Campus)
          </button>
          <span className="text-slate-300">·</span>
          <button
            type="button"
            onClick={() => handleDemoSelect('user-exp-1')}
            className="hover:text-blue-600 hover:bg-slate-50 px-2 py-1 rounded transition-colors"
          >
            🚀 SDE II (Swiggy 4 YoE)
          </button>
          <span className="text-slate-300">·</span>
          <button
            type="button"
            onClick={() => handleDemoSelect('user-company-1')}
            className="hover:text-blue-700 hover:bg-blue-50 text-blue-600 font-semibold px-2 py-1 rounded transition-colors"
          >
            🏢 Recruiter (Microsoft)
          </button>
        </div>
      </div>

      {/* Light Clean Modal Overlay */}
      {modalConfig && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div 
            className="relative w-full max-w-md bg-white border border-slate-200 rounded-lg p-6 sm:p-7 shadow-lg animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-md transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-5">
              <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded mb-2 ${
                modalConfig.role === 'company' 
                  ? 'bg-blue-50 border border-blue-200 text-blue-800' 
                  : 'bg-teal-50 border border-teal-200 text-teal-800'
              }`}>
                {modalConfig.role === 'company' ? 'ENTERPRISE HIRING' : 'DEVELOPER PORTAL'}
              </span>
              
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                {modalConfig.mode === 'signup' 
                  ? 'Create Developer Account'
                  : modalConfig.mode === 'trial' 
                  ? 'Start Company Free Trial'
                  : modalConfig.mode === 'contact'
                  ? 'Contact Enterprise Sales'
                  : modalConfig.role === 'company' 
                  ? 'Log in to Recruiter Portal' 
                  : 'Log in to Developer Hub'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {modalConfig.role === 'company' 
                  ? 'Access candidate skill gap analytics & recruitment engine'
                  : 'Benchmark your skills against real company job bars'}
              </p>
            </div>

            {/* Error Banner */}
            {authError && (
              <div className="mb-4 p-2.5 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                ⚠️ {authError}
              </div>
            )}

            {/* Social Login Options */}
            <div className="mb-4 space-y-2">
              <button
                type="button"
                disabled={loading}
                onClick={() => handleSocialLogin(googleProvider)}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors shadow-xs"
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
                disabled={loading}
                onClick={() => handleSocialLogin(githubProvider)}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                Continue with GitHub
              </button>
            </div>

            <div className="relative flex py-1 items-center mb-4">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-3 text-[10px] text-slate-400 font-mono uppercase">or email credentials</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Custom Input Form */}
            <form onSubmit={handleFormSubmit} className="space-y-3">
              {(modalConfig.mode === 'signup' || modalConfig.mode === 'trial' || modalConfig.mode === 'contact') && (
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="e.g. Alex Johnson"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-hr w-full pl-9"
                    />
                  </div>
                </div>
              )}

              {modalConfig.role === 'company' && (
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Company / Organization</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="e.g. Microsoft, Amazon, Google"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="input-hr w-full pl-9"
                    />
                  </div>
                </div>
              )}

              {modalConfig.role === 'developer' && modalConfig.mode === 'signup' && (
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-700">Select Track</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeveloperTrack('fresher')}
                      className={`py-1.5 px-3 rounded-md text-xs font-medium border text-center transition-all ${
                        developerTrack === 'fresher' 
                          ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold' 
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      🎓 College Fresher
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeveloperTrack('experienced')}
                      className={`py-1.5 px-3 rounded-md text-xs font-medium border text-center transition-all ${
                        developerTrack === 'experienced' 
                          ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold' 
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      🚀 Experienced (1-5+ YoE)
                    </button>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {modalConfig.role === 'company' ? 'Work Email' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder={modalConfig.role === 'company' ? 'recruiter@microsoft.com' : 'engineer@talent.io'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-hr w-full pl-9"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-hr w-full pl-9 pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-2.5 mt-3"
              >
                <span>
                  {loading ? 'Processing...' : modalConfig.mode === 'signup' 
                    ? 'Create Account & Enter'
                    : modalConfig.mode === 'trial'
                    ? 'Start Free Trial'
                    : 'Log In'}
                </span>
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            {/* Modal Footer Mode Switch */}
            <div className="mt-3.5 pt-3 border-t border-slate-100 text-center text-xs text-slate-500">
              {modalConfig.mode === 'login' ? (
                modalConfig.role === 'developer' ? (
                  <p>
                    Don't have an account?{' '}
                    <button 
                      type="button"
                      onClick={() => openModal('developer', 'signup')}
                      className="text-teal-700 font-semibold hover:underline"
                    >
                      Sign up free
                    </button>
                  </p>
                ) : (
                  <p>
                    New enterprise partner?{' '}
                    <button 
                      type="button"
                      onClick={() => openModal('company', 'trial')}
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      Get trial access
                    </button>
                  </p>
                )
              ) : (
                <p>
                  Already have an account?{' '}
                  <button 
                    type="button"
                    onClick={() => openModal(modalConfig.role, 'login')}
                    className="text-blue-600 font-semibold hover:underline"
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
