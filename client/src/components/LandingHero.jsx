import React, { useState, useEffect } from 'react';
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
import { TextEffect } from './core/text-effect';
import { InView } from './core/in-view';
import { InfiniteSlider } from './core/infinite-slider';
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

  useEffect(() => {
    const handlePopState = () => {
      if (authMode !== 'select') {
        setAuthMode('select');
      }
    };
    window.addEventListener('popstate', handlePopState);
    
    const handleTriggerAuth = (e) => {
      const targetRole = e.detail?.role;
      if (targetRole === 'role-selection') {
        setAuthMode('role-selection');
        window.history.pushState({ auth: true }, '');
      } else {
        handleStartAuth(targetRole || 'developer');
      }
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
    window.history.pushState({ auth: true }, '');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
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
      alert(error.message);
    }
  };

  const handleOAuthLogin = async (providerName) => {
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
      alert(error.message);
    }
  };

  return (
    <>
    <div className="relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Matrix & Circuit Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-dark-800 border border-brand-green/30 px-3.5 py-1.5 rounded-full mb-6 shadow-glow-green">
            <Sparkles className="w-4 h-4 text-brand-green" />
            <span className="font-mono text-xs text-brand-green font-semibold tracking-wide">
              INTELLIGENT SKILL-GAP ENGINE
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-8 max-w-4xl mx-auto leading-[1.1] sm:leading-tight text-center">
            Don't Just Hire Resumes. <br className="hidden sm:block" />
            Hire <span className="text-brand-green">Real Skills</span>.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            JobMax connects companies with talented students and professionals through real coding challenges, projects, GitHub work, and performance-based hiring.
          </p>
        </div>

        {/* Auth Modal / Direct Role Selection View */}
        {authMode === 'select' ? (
          <div>
            {/* Small Interactive Role Selector */}
            <InView
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="max-w-xl mx-auto bg-dark-800 border border-dark-700 rounded-3xl p-8 sm:p-10 shadow-card-dark text-center relative z-10 mb-12">
                <p className="text-base text-slate-400 font-mono mb-6 uppercase tracking-widest font-semibold">I am a...</p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-8">
                  <button 
                    onClick={() => setActiveTab('developer')}
                    className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-base font-bold transition-all w-full sm:w-auto ${
                      activeTab === 'developer' 
                        ? 'bg-brand-green/10 text-brand-green border-2 border-brand-green shadow-glow-green' 
                        : 'bg-dark-900 border-2 border-dark-700 text-slate-400 hover:text-slate-200 hover:border-dark-600 hover:-translate-y-1'
                    }`}
                  >
                    <span className="text-xl">👨‍💻</span> Developer
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('company')}
                    className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-base font-bold transition-all w-full sm:w-auto ${
                      activeTab === 'company' 
                        ? 'bg-brand-cyan/10 text-brand-cyan border-2 border-brand-cyan shadow-glow-blue' 
                        : 'bg-dark-900 border-2 border-dark-700 text-slate-400 hover:text-slate-200 hover:border-dark-600 hover:-translate-y-1'
                    }`}
                  >
                    <span className="text-xl">🏢</span> Company
                  </button>
                </div>

                {activeTab === 'developer' ? (
                  <div className="animate-in fade-in slide-in-from-bottom-2">
                    <p className="text-slate-300 text-base mb-8 leading-relaxed min-h-[48px]">
                      Analyze your skills, identify your gaps, and build your career roadmap.
                    </p>
                    <button 
                      onClick={() => handleStartAuth('developer')}
                      className="w-full bg-brand-green hover:bg-[#00D659] text-dark-900 font-bold px-6 py-4 rounded-xl text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-glow-green group"
                    >
                      Analyze My Skills <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-bottom-2">
                    <p className="text-slate-300 text-base mb-8 leading-relaxed min-h-[48px]">
                      Find, compare, and evaluate candidates using AI-powered hiring intelligence.
                    </p>
                    <button 
                      onClick={() => handleStartAuth('company')}
                      className="w-full bg-brand-cyan hover:bg-[#00c0e4] text-dark-900 font-bold px-6 py-4 rounded-xl text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-glow-blue group"
                    >
                      Find Top Talent <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}
              </div>
            </InView>


            <div className="mt-16 text-center">
              <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-8">
                Recruiters from top tech companies hire through our engine
              </p>
              <InView
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <InfiniteSlider gap={48} speed={30}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-[30px] w-auto object-contain" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" className="h-[28px] w-auto object-contain" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-[28px] w-auto object-contain mt-2" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="h-[26px] w-auto object-contain" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" alt="Meta" className="h-[24px] w-auto object-contain" />
                  <img src="https://cdn.simpleicons.org/atlassian/0052CC" alt="Atlassian" className="h-[26px] w-auto object-contain" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-[30px] w-auto object-contain" />
                </InfiniteSlider>
              </InView>
            </div>
          </div>
        ) : authMode === 'role-selection' ? (
          <div className="max-w-md mx-auto bg-dark-800 border border-dark-700 rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in-95 relative mt-12 mb-20">
            <h2 className="text-2xl font-bold text-white text-center mb-2">Choose your account</h2>
            <p className="text-slate-400 text-center mb-8">Select how you want to continue.</p>

            <div className="flex flex-col gap-4">
              <button 
                onClick={() => handleStartAuth('developer')}
                className="w-full bg-dark-900 border border-dark-700 hover:border-brand-green/50 hover:bg-dark-700/50 rounded-xl p-5 text-left transition-all group flex items-center justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">👨‍💻</span>
                    <h3 className="text-white font-semibold text-lg group-hover:text-brand-green transition-colors">Developer</h3>
                  </div>
                  <p className="text-slate-400 text-sm pl-8">For students and professionals</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-brand-green group-hover:translate-x-1 transition-all" />
              </button>

              <button 
                onClick={() => handleStartAuth('company')}
                className="w-full bg-dark-900 border border-dark-700 hover:border-brand-cyan/50 hover:bg-dark-700/50 rounded-xl p-5 text-left transition-all group flex items-center justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">🏢</span>
                    <h3 className="text-white font-semibold text-lg group-hover:text-brand-cyan transition-colors">Company</h3>
                  </div>
                  <p className="text-slate-400 text-sm pl-8">For recruiters and hiring teams</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-brand-cyan group-hover:translate-x-1 transition-all" />
              </button>
            </div>

            <button
              onClick={() => setAuthMode('select')}
              className="mt-6 w-full py-3 text-slate-400 hover:text-white transition-colors text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        ) : (
          /* Authentication Screen */
          <div className="max-w-md mx-auto bg-dark-800 border border-dark-700 rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in-95 relative">
            <button
              onClick={() => setAuthMode('select')}
              className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white hover:bg-dark-700 rounded-lg transition-colors flex items-center gap-1 text-xs font-medium"
            >
              ← Back
            </button>
            <div className="text-center mb-6 mt-4">
              <div className="inline-flex items-center gap-2 bg-dark-700/60 px-3 py-1 rounded-full text-xs font-mono text-slate-300 mb-3">
                {selectedRoleForAuth === 'developer' ? (
                  <>
                    <Code className="w-3.5 h-3.5 text-brand-green" />
                    Developer Portal Access
                  </>
                ) : (
                  <>
                    <Building2 className="w-3.5 h-3.5 text-brand-cyan" />
                    Company Portal Access
                  </>
                )}
              </div>
              <h2 className="text-2xl font-bold text-white">
                {authMode === 'login' ? 'Welcome Back' : 'Create an Account'}
              </h2>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Single secure login with role-based dashboard access
              </p>
            </div>

            {/* OAuth Quick Actions */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => handleOAuthLogin('GitHub')}
                type="button"
                className="btn-secondary text-xs flex items-center justify-center gap-2 border-dark-600 hover:border-slate-400"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub
              </button>
              <button
                onClick={() => handleOAuthLogin('Google')}
                type="button"
                className="btn-secondary text-xs flex items-center justify-center gap-2 border-dark-600 hover:border-blue-400 text-slate-200"
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

            <div className="relative flex py-2 items-center mb-6">
              <div className="flex-grow border-t border-dark-700"></div>
              <span className="flex-shrink mx-3 text-[11px] text-slate-500 font-mono uppercase">or with email</span>
              <div className="flex-grow border-t border-dark-700"></div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">Work / College Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-hr w-full pl-9"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">Password</label>
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
                  selectedRoleForAuth === 'developer' ? 'btn-primary' : 'bg-brand-cyan hover:bg-[#00c0e4] text-dark-900 shadow-glow-blue'
                }`}
              >
                Continue to Dashboard
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 font-mono">
                <button
                  type="button"
                  onClick={() => setAuthMode('select')}
                  className="hover:text-slate-200 underline"
                >
                  ← Change Role
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
    {/* New Landing Page Sections */}
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
