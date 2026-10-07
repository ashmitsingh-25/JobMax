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
  const [selectedCompany, setSelectedCompany] = useState(null);

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
    <div className="relative overflow-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-dark-900">
      {/* Background Matrix & Circuit Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Hero Banner */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/20 text-brand-darkgreen px-4 py-1.5 rounded-full mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-brand-green" />
            <span className="text-xs font-semibold tracking-wide uppercase text-brand-green">
              Intelligent Skill-Gap Engine
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 max-w-4xl mx-auto leading-[1.15] sm:leading-[1.15] text-center">
            Don't Just Hire Resumes. <br className="hidden sm:block" />
            Hire <span className="text-brand-green">Real Skills</span>.
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12">
            JobMax connects companies with talented professionals through performance-based hiring, real-world projects, and intelligent career matching.
          </p>
        </div>

        {/* Auth Modal / Direct Role Selection View */}
        {authMode === 'select' ? (
          <div>
            {/* Interactive Role Selector */}
            <InView
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="max-w-3xl mx-auto mb-16 animate-in fade-in zoom-in-95">
                <p className="text-xs text-slate-500 mb-4 uppercase tracking-widest font-bold text-center">Get Started as a...</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Developer Card */}
                  <div 
                    onClick={() => setActiveTab('developer')}
                    className={`cursor-pointer transition-all duration-300 rounded-2xl p-5 border text-left relative overflow-hidden group ${
                      activeTab === 'developer'
                        ? 'border-brand-green bg-brand-green/5 shadow-glow-green shadow-sm'
                        : 'border-dark-700 bg-dark-850 hover:border-dark-600 hover:bg-dark-800'
                    }`}
                  >
                    {activeTab === 'developer' && (
                      <div className="absolute top-4 right-4 text-brand-green">
                        <CheckCircle2 className="w-5 h-5 animate-in zoom-in" />
                      </div>
                    )}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors ${
                      activeTab === 'developer' ? 'bg-brand-green/20 text-brand-green' : 'bg-dark-750 text-slate-400 group-hover:text-slate-300'
                    }`}>
                      <Code className="w-6 h-6" />
                    </div>
                    <h3 className={`text-xl font-bold mb-1 transition-colors ${activeTab === 'developer' ? 'text-white' : 'text-slate-300'}`}>Developer</h3>
                    <p className={`text-sm transition-colors ${activeTab === 'developer' ? 'text-slate-400' : 'text-slate-500'}`}>
                      Analyze skills and build your career path
                    </p>
                  </div>

                  {/* Company Card */}
                  <div 
                    onClick={() => setActiveTab('company')}
                    className={`cursor-pointer transition-all duration-300 rounded-2xl p-5 border text-left relative overflow-hidden group ${
                      activeTab === 'company'
                        ? 'border-brand-cyan bg-brand-cyan/5 shadow-glow-blue shadow-sm'
                        : 'border-dark-700 bg-dark-850 hover:border-dark-600 hover:bg-dark-800'
                    }`}
                  >
                    {activeTab === 'company' && (
                      <div className="absolute top-4 right-4 text-brand-cyan">
                        <CheckCircle2 className="w-5 h-5 animate-in zoom-in" />
                      </div>
                    )}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors ${
                      activeTab === 'company' ? 'bg-brand-cyan/20 text-brand-cyan' : 'bg-dark-750 text-slate-400 group-hover:text-slate-300'
                    }`}>
                      <Building2 className="w-6 h-6" />
                    </div>
                    <h3 className={`text-xl font-bold mb-1 transition-colors ${activeTab === 'company' ? 'text-white' : 'text-slate-300'}`}>Company</h3>
                    <p className={`text-sm transition-colors ${activeTab === 'company' ? 'text-slate-400' : 'text-slate-500'}`}>
                      Discover and evaluate top talent
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-dark-850 border border-dark-700 rounded-2xl p-5 px-6">
                  <p className="text-slate-400 text-sm max-w-sm">
                    {activeTab === 'developer' 
                      ? "Analyze your skills, identify gaps, and build a focused career roadmap."
                      : "Discover, compare, and evaluate talent using hiring intelligence."}
                  </p>
                  
                  <button 
                    onClick={() => handleStartAuth(activeTab)}
                    className={`flex-shrink-0 font-bold px-6 py-3 rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 group ${
                      activeTab === 'developer'
                        ? 'btn-primary'
                        : 'bg-brand-cyan hover:bg-blue-600 text-dark-900 shadow-glow-blue'
                    }`}
                  >
                    {activeTab === 'developer' ? 'Analyze My Skills' : 'Find Top Talent'} 
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </InView>

            <div className="mt-12 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-8">
                Recruiters from top tech companies hire through our engine
              </p>
              <InView
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <div className="relative group cursor-pointer" onMouseLeave={() => setSelectedCompany(null)}>
                  <InfiniteSlider gap={48} speed={30}>
                    {[
                      { name: 'Google', src: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg', className: 'h-[30px]' },
                      { name: 'Microsoft', src: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg', className: 'h-[28px]' },
                      { name: 'Amazon', src: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', className: 'h-[28px] mt-2' },
                      { name: 'Netflix', src: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg', className: 'h-[26px]' },
                      { name: 'Meta', src: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg', className: 'h-[24px]' },
                      { name: 'Atlassian', src: 'https://cdn.simpleicons.org/atlassian/0052CC', className: 'h-[26px]' },
                      { name: 'Stripe', src: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg', className: 'h-[30px]' }
                    ].map((company) => (
                      <div 
                        key={company.name}
                        onClick={() => setSelectedCompany(company.name)}
                        className={`transition-all duration-500 ease-out flex items-center justify-center p-2 rounded-xl ${
                          selectedCompany === company.name 
                            ? 'scale-110 bg-white/5 shadow-sm backdrop-blur-sm' 
                            : selectedCompany 
                              ? 'opacity-50' 
                              : 'hover:scale-105'
                        }`}
                      >
                        <img 
                          src={company.src} 
                          alt={company.name} 
                          className={`w-auto object-contain transition-all duration-500 ${company.className}`} 
                        />
                      </div>
                    ))}
                  </InfiniteSlider>
                </div>
              </InView>
            </div>
          </div>
        ) : authMode === 'role-selection' ? (
          <div className="max-w-md mx-auto bg-dark-800 border border-dark-700 rounded-2xl p-8 shadow-card-dark animate-in fade-in zoom-in-95 relative mt-12 mb-20">
            <h2 className="text-2xl font-bold text-white text-center mb-2">Choose your account</h2>
            <p className="text-slate-400 text-center mb-8">Select how you want to continue.</p>

            <div className="flex flex-col gap-4">
              <button 
                onClick={() => handleStartAuth('developer')}
                className="w-full bg-dark-850 border border-dark-700 hover:border-brand-green hover:bg-brand-green/10 rounded-xl p-5 text-left transition-all group flex items-center justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 rounded-full bg-brand-green/20 flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-dark-900 transition-colors">
                      <Code className="w-5 h-5" />
                    </div>
                    <h3 className="text-white font-semibold text-lg">Developer</h3>
                  </div>
                  <p className="text-slate-400 text-sm pl-13">For students and professionals</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-brand-green group-hover:translate-x-1 transition-all" />
              </button>

              <button 
                onClick={() => handleStartAuth('company')}
                className="w-full bg-dark-850 border border-dark-700 hover:border-brand-cyan hover:bg-brand-cyan/10 rounded-xl p-5 text-left transition-all group flex items-center justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan group-hover:bg-brand-cyan group-hover:text-dark-900 transition-colors">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <h3 className="text-white font-semibold text-lg">Company</h3>
                  </div>
                  <p className="text-slate-400 text-sm pl-13">For recruiters and hiring teams</p>
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
          <div className="max-w-md mx-auto bg-dark-800 border border-dark-700 rounded-2xl p-8 shadow-card-dark animate-in fade-in zoom-in-95 relative">
            <button
              onClick={() => setAuthMode('select')}
              className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white hover:bg-dark-700 rounded-lg transition-colors flex items-center gap-1 text-sm font-medium"
            >
              ← Back
            </button>
            <div className="text-center mb-8 mt-4">
              <div className="inline-flex items-center gap-2 bg-dark-850 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 mb-4 border border-dark-700">
                {selectedRoleForAuth === 'developer' ? (
                  <>
                    <Code className="w-3.5 h-3.5 text-brand-green" />
                    Developer Portal
                  </>
                ) : (
                  <>
                    <Building2 className="w-3.5 h-3.5 text-brand-cyan" />
                    Company Portal
                  </>
                )}
              </div>
              <h2 className="text-2xl font-bold text-white">
                {authMode === 'login' ? 'Welcome Back' : 'Create an Account'}
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                Single secure login with role-based access
              </p>
            </div>

            {/* OAuth Quick Actions */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => handleOAuthLogin('GitHub')}
                type="button"
                className="flex items-center justify-center gap-2 border border-dark-600 rounded-xl py-2.5 text-sm font-semibold text-slate-300 hover:bg-dark-850 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub
              </button>
              <button
                onClick={() => handleOAuthLogin('Google')}
                type="button"
                className="flex items-center justify-center gap-2 border border-dark-600 rounded-xl py-2.5 text-sm font-semibold text-slate-300 hover:bg-dark-850 transition-colors"
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
              <div className="flex-grow border-t border-dark-600"></div>
              <span className="flex-shrink mx-4 text-xs text-slate-500 font-semibold uppercase tracking-wider">or continue with email</span>
              <div className="flex-grow border-t border-dark-600"></div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-1.5">Work / College Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-dark-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-dark-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`w-full font-bold py-3 rounded-xl text-base transition-all flex items-center justify-center gap-2 mt-2 shadow-sm ${
                  selectedRoleForAuth === 'developer' 
                    ? 'btn-primary' 
                    : 'bg-brand-cyan hover:bg-blue-600 text-dark-900 shadow-glow-blue'
                }`}
              >
                Continue to Dashboard
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center text-sm text-slate-400 pt-4">
                <button
                  type="button"
                  onClick={() => setAuthMode('select')}
                  className="hover:text-white font-medium transition-colors"
                >
                  Change Role Selection
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
