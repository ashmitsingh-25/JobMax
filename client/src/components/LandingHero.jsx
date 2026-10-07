import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Building2, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Lock, 
  Mail,
  ArrowLeft
} from 'lucide-react';
import { InView } from './core/in-view';
import { InfiniteSlider } from './core/infinite-slider';
import { FALLBACK_DEMO_USERS } from '../services/api';
import { auth, googleProvider, githubProvider } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { 
  CareerImpactBanner, 
  WhyDevelopersChoose, 
  EverythingYouNeed, 
  HowJobMaxHelps, 
  FaqSection, 
  FooterSection,
  InfoModals
} from './LandingSections';

export default function LandingHero({ onSelectRole }) {
  const [activeTab, setActiveTab] = useState('developer'); // 'developer' or 'company'
  const [authMode, setAuthMode] = useState('select'); // 'select', 'login', 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRoleForAuth, setSelectedRoleForAuth] = useState('developer');
  const [activeModal, setActiveModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const handlePopState = () => {
      if (authMode !== 'select') {
        setAuthMode('select');
      }
    };
    window.addEventListener('popstate', handlePopState);
    
    const handleTriggerAuth = (e) => {
      handleStartAuth(e.detail?.role || 'developer');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('trigger-auth', handleTriggerAuth);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('trigger-auth', handleTriggerAuth);
    };
  }, [authMode]);

  const handleStartAuth = (role) => {
    setSelectedRoleForAuth(role);
    setAuthMode('login');
    setAuthError('');
    window.history.pushState({ auth: true }, '');
  };

  const handleDemoSelect = (userId) => {
    const user = FALLBACK_DEMO_USERS.find(u => u.id === userId) || FALLBACK_DEMO_USERS[0];
    if (user && onSelectRole) {
      onSelectRole(user.role, user);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setAuthError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    setAuthError('');

    try {
      let userCredential;
      if (authMode === 'signup') {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      const user = userCredential.user;
      onSelectRole(selectedRoleForAuth, {
        email: user.email,
        name: user.displayName || email.split('@')[0],
        uid: user.uid,
        role: selectedRoleForAuth
      });
    } catch (error) {
      console.error("Firebase Auth Error:", error);
      if (error.code === 'auth/api-key-not-valid' || error.message?.includes('api-key')) {
        if (selectedRoleForAuth === 'developer') {
          handleDemoSelect('user-fresher-1');
        } else {
          handleDemoSelect('user-company-1');
        }
      } else {
        setAuthError(error.message || "Authentication failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (providerName) => {
    setLoading(true);
    setAuthError('');
    try {
      const provider = providerName === 'GitHub' ? githubProvider : googleProvider;
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      onSelectRole(selectedRoleForAuth, {
        email: user.email,
        name: user.displayName || user.email.split('@')[0],
        uid: user.uid,
        role: selectedRoleForAuth
      });
    } catch (error) {
      console.error("Firebase Social Login Error:", error);
      if (error.code === 'auth/api-key-not-valid' || error.message?.includes('api-key')) {
        if (selectedRoleForAuth === 'developer') {
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
    <>
    <div className="relative overflow-hidden py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/90 px-3.5 py-1 rounded-md mb-5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-mono text-xs text-blue-800 font-semibold tracking-wide">
              INTELLIGENT SKILL-GAP & VERIFIED TALENT ENGINE
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4 max-w-3xl mx-auto leading-tight text-center font-heading">
            Don't Just Hire Resumes. <br className="hidden sm:block" />
            Hire <span className="text-blue-600">Verified Skills</span>.
          </h1>

          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6 font-normal">
            JobMax connects high-growth companies with pre-verified developers through automated skill gap radar, real performance metrics, and multi-model machine learning analytics.
          </p>

          {/* Quick Stats Row */}
          <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-2 px-4 rounded-lg bg-white border border-slate-200 shadow-xs text-xs font-mono text-slate-600">
            <span className="flex items-center gap-1.5"><strong className="text-slate-900 font-bold">26,000+</strong> Developers</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5"><strong className="text-teal-700 font-bold">94.2%</strong> Skill Accuracy</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5"><strong className="text-blue-700 font-bold">500+</strong> Tech Recruiters</span>
          </div>
        </div>

        {/* 1-Click Fast Demo Profile Selector */}
        <div className="text-center mb-8">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-xs text-xs font-mono text-slate-600">
            <span className="flex items-center gap-1.5 text-slate-800 font-semibold mr-1">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              1-Click Demo Profiles:
            </span>
            <button
              type="button"
              onClick={() => handleDemoSelect('user-fresher-1')}
              className="hover:text-blue-600 hover:bg-slate-50 px-2 py-0.5 rounded transition-colors text-slate-600"
            >
              🎓 Fresher (IIT Delhi)
            </button>
            <span className="text-slate-300">·</span>
            <button
              type="button"
              onClick={() => handleDemoSelect('user-fresher-2')}
              className="hover:text-blue-600 hover:bg-slate-50 px-2 py-0.5 rounded transition-colors text-slate-600"
            >
              💼 Fresher (BITS Off-Campus)
            </button>
            <span className="text-slate-300">·</span>
            <button
              type="button"
              onClick={() => handleDemoSelect('user-exp-1')}
              className="hover:text-blue-600 hover:bg-slate-50 px-2 py-0.5 rounded transition-colors text-slate-600"
            >
              🚀 SDE II (Swiggy 4 YoE)
            </button>
            <span className="text-slate-300">·</span>
            <button
              type="button"
              onClick={() => handleDemoSelect('user-company-1')}
              className="hover:text-blue-700 hover:bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded transition-colors"
            >
              🏢 Recruiter (Microsoft)
            </button>
          </div>
        </div>

        {/* Auth Modal / Direct Role Selection View */}
        {authMode === 'select' ? (
          <div>
            {/* Interactive Bento Role Card */}
            <InView
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-sm text-center relative z-10 mb-12">
                <p className="text-xs text-slate-500 font-mono mb-5 uppercase tracking-wider font-semibold">
                  SELECT YOUR WORKSPACE TO BEGIN
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-3 justify-center mb-6">
                  <button 
                    type="button"
                    onClick={() => setActiveTab('developer')}
                    className={`flex-1 flex items-center justify-center gap-2.5 px-5 py-3 rounded-md text-sm font-semibold transition-all w-full sm:w-auto ${
                      activeTab === 'developer' 
                        ? 'bg-teal-50 text-teal-800 border-2 border-teal-600 shadow-xs' 
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-lg">👨‍💻</span> Developer & Candidate
                  </button>
                  
                  <button 
                    type="button"
                    onClick={() => setActiveTab('company')}
                    className={`flex-1 flex items-center justify-center gap-2.5 px-5 py-3 rounded-md text-sm font-semibold transition-all w-full sm:w-auto ${
                      activeTab === 'company' 
                        ? 'bg-blue-50 text-blue-800 border-2 border-blue-600 shadow-xs' 
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-lg">🏢</span> Company & Recruiter
                  </button>
                </div>

                {activeTab === 'developer' ? (
                  <div>
                    <p className="text-slate-600 text-sm mb-5 leading-relaxed">
                      Benchmark your technical stack against real FAANG & Tier-1 bars, run automated gap analysis, and receive direct company proposals.
                    </p>
                    <button 
                      type="button"
                      onClick={() => handleStartAuth('developer')}
                      className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium px-5 py-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 shadow-xs group"
                    >
                      <span>Access Developer Portal</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-slate-600 text-sm mb-5 leading-relaxed">
                      Screen candidate skill gaps with ML models, compare on/off-campus batches, forecast salary expectations, and hire with confidence.
                    </p>
                    <button 
                      type="button"
                      onClick={() => handleStartAuth('company')}
                      className="w-full btn-primary px-5 py-3 text-sm flex items-center justify-center gap-2 group"
                    >
                      <span>Access Recruiter Workspace</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                )}
              </div>
            </InView>

            {/* Hiring Partners Carousel */}
            <div className="mt-10 text-center">
              <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-5">
                Engineers & Recruiters From Top Tech Companies
              </p>
              <InView
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <div className="py-4 px-6 rounded-lg bg-white border border-slate-200 shadow-xs max-w-4xl mx-auto">
                  <InfiniteSlider gap={56} speed={30}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-[24px] w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" className="h-[22px] w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-[22px] w-auto object-contain mt-1 opacity-70 hover:opacity-100 transition-opacity" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="h-[20px] w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" alt="Meta" className="h-[20px] w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
                    <img src="https://cdn.simpleicons.org/atlassian/0052CC" alt="Atlassian" className="h-[20px] w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-[24px] w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
                  </InfiniteSlider>
                </div>
              </InView>
            </div>
          </div>
        ) : (
          /* Authentication Screen - Clean Light B2B */
          <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-lg p-6 sm:p-7 shadow-sm animate-in fade-in relative">
            <button
              type="button"
              onClick={() => setAuthMode('select')}
              className="absolute top-4 left-4 p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            
            <div className="text-center mb-5 mt-2">
              <div className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-mono font-semibold mb-2 ${
                selectedRoleForAuth === 'developer'
                  ? 'bg-teal-50 border border-teal-200 text-teal-800'
                  : 'bg-blue-50 border border-blue-200 text-blue-800'
              }`}>
                {selectedRoleForAuth === 'developer' ? (
                  <>
                    <Code className="w-3.5 h-3.5" />
                    Developer Portal Access
                  </>
                ) : (
                  <>
                    <Building2 className="w-3.5 h-3.5" />
                    Company Workspace Access
                  </>
                )}
              </div>
              <h2 className="text-xl font-bold text-slate-900 font-heading">
                {authMode === 'login' ? 'Welcome Back' : 'Create an Account'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 font-mono">
                Single secure login with role-based dashboard access
              </p>
            </div>

            {/* Error Banner */}
            {authError && (
              <div className="mb-4 p-2.5 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                ⚠️ {authError}
              </div>
            )}

            {/* OAuth Quick Actions */}
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              <button
                onClick={() => handleOAuthLogin('GitHub')}
                type="button"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-xs"
              >
                <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub
              </button>
              <button
                onClick={() => handleOAuthLogin('Google')}
                type="button"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors shadow-xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
            </div>

            <div className="relative flex py-1 items-center mb-4">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-3 text-[10px] text-slate-400 font-mono uppercase">or email credentials</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleFormSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-slate-700 mb-1">
                  {selectedRoleForAuth === 'company' ? 'Work Email' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder={selectedRoleForAuth === 'company' ? 'recruiter@company.com' : 'developer@domain.com'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-hr w-full pl-9"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-hr w-full pl-9"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full font-medium py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 text-white shadow-xs ${
                  selectedRoleForAuth === 'developer' 
                    ? 'bg-teal-700 hover:bg-teal-800' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <span>{loading ? 'Authenticating...' : 'Continue to Dashboard'}</span>
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 font-mono">
                <button
                  type="button"
                  onClick={() => setAuthMode('select')}
                  className="hover:text-slate-800 underline"
                >
                  ← Change Role
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                  className="hover:underline text-blue-600 font-semibold"
                >
                  {authMode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Log in'}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>

    {/* Landing Page Sections */}
    {authMode === 'select' && (
      <>
        <CareerImpactBanner />
        <WhyDevelopersChoose />
        <EverythingYouNeed />
        <HowJobMaxHelps />
        <FaqSection />
        <FooterSection 
          onStartAuth={handleStartAuth} 
          onOpenModal={setActiveModal} 
        />
        <InfoModals 
          activeModal={activeModal} 
          onClose={() => setActiveModal(null)} 
        />
      </>
    )}
    </>
  );
}
