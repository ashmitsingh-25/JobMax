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
import { TextLoop } from './core/text-loop';
import { InView } from './core/in-view';
import { InfiniteSlider } from './core/infinite-slider';
import { 
  CareerImpactBanner, 
  WhyDevelopersChoose, 
  EverythingYouNeed, 
  HowJobMaxHelps, 
  FaqSection, 
  FooterSection,
  InfoModals
} from './LandingSections';

export default function LandingHero({ onSelectRole, onQuickLogin }) {
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
    return () => window.removeEventListener('popstate', handlePopState);
  }, [authMode]);

  const handleStartAuth = (role) => {
    setSelectedRoleForAuth(role);
    setAuthMode('login');
    window.history.pushState({ auth: true }, '');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSelectRole(selectedRoleForAuth, {
      email: email || (selectedRoleForAuth === 'developer' ? 'dev@jobmax.io' : 'recruiter@microsoft.com'),
      name: email ? email.split('@')[0] : (selectedRoleForAuth === 'developer' ? 'Developer' : 'Talent Partner'),
      role: selectedRoleForAuth
    });
  };

  const handleOAuthLogin = (provider) => {
    onSelectRole(selectedRoleForAuth, {
      email: `${provider.toLowerCase()}_user@jobmax.io`,
      name: `${provider} Verified User`,
      role: selectedRoleForAuth
    });
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
            Close the Gap Between <br className="hidden sm:block" />
            <TextLoop
              className='overflow-y-visible text-brand-green inline-flex justify-center w-[280px] sm:w-[440px] pb-1'
              transition={{ duration: 0.4, ease: "easeOut" }}
              variants={{
                initial: { y: 20, opacity: 0, filter: 'blur(4px)' },
                animate: { y: 0, opacity: 1, filter: 'blur(0px)' },
                exit: { y: -20, opacity: 0, filter: 'blur(4px)' },
              }}
            >
              <span className="whitespace-nowrap">our Current Skills</span>
              <span className="whitespace-nowrap">our Academic Knowledge</span>
            </TextLoop>
            <br className="hidden sm:block" />
            &amp; What Tech Demands
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Real-world recruitment data from campus drives and off-campus job markets, 
            powered by AI that benchmarks your skills, generates personalized 6-week closing roadmaps, and ranks candidates for hiring teams.
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
              <div className="max-w-md mx-auto bg-dark-800 border border-dark-700 rounded-2xl p-6 shadow-card-dark text-center relative z-10 mb-12">
                <p className="text-sm text-slate-400 font-mono mb-4 uppercase tracking-wider">I am a...</p>
                
                <div className="flex flex-col sm:flex-row items-center gap-3 justify-center mb-6">
                  <button 
                    onClick={() => setActiveTab('developer')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all w-full sm:w-auto ${
                      activeTab === 'developer' 
                        ? 'bg-brand-green/10 text-brand-green border-2 border-brand-green shadow-glow-green' 
                        : 'bg-dark-900 border-2 border-dark-700 text-slate-400 hover:text-slate-200 hover:border-dark-600'
                    }`}
                  >
                    👨‍💻 Developer
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('company')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all w-full sm:w-auto ${
                      activeTab === 'company' 
                        ? 'bg-brand-cyan/10 text-brand-cyan border-2 border-brand-cyan shadow-glow-blue' 
                        : 'bg-dark-900 border-2 border-dark-700 text-slate-400 hover:text-slate-200 hover:border-dark-600'
                    }`}
                  >
                    🏢 Company
                  </button>
                </div>

                {activeTab === 'developer' ? (
                  <div className="animate-in fade-in slide-in-from-bottom-2">
                    <p className="text-slate-300 text-sm mb-6 leading-relaxed min-h-[40px]">
                      Analyze your skills, identify your gaps, and build your career roadmap.
                    </p>
                    <button 
                      onClick={() => handleStartAuth('developer')}
                      className="w-full btn-primary group hover:bg-[#00D659] flex items-center justify-center gap-2"
                    >
                      Analyze My Skills <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-bottom-2">
                    <p className="text-slate-300 text-sm mb-6 leading-relaxed min-h-[40px]">
                      Find, compare, and evaluate candidates using AI-powered hiring intelligence.
                    </p>
                    <button 
                      onClick={() => handleStartAuth('company')}
                      className="w-full bg-brand-cyan hover:bg-[#00c0e4] text-dark-900 font-semibold px-4 py-2.5 rounded-lg text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-glow-blue group"
                    >
                      Find Top Talent <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                onClick={() => handleOAuthLogin('LinkedIn')}
                type="button"
                className="btn-secondary text-xs flex items-center justify-center gap-2 border-dark-600 hover:border-blue-400 text-slate-200"
              >
                <svg className="w-4 h-4 fill-current text-blue-400" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                LinkedIn
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
                    placeholder={selectedRoleForAuth === 'developer' ? "student@iitd.ac.in (or click Demo below)" : "recruiter@microsoft.com"}
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

              {/* Dedicated 1-Click Instant Demo Login Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onQuickLogin(selectedRoleForAuth === 'developer' ? 'user-fresher-1' : 'user-company-1')}
                  className="w-full bg-dark-750 hover:bg-dark-700 border border-brand-green/60 hover:border-brand-green text-brand-green hover:text-white font-mono text-xs font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Zap className="w-4 h-4 text-brand-amber" />
                  ⚡ 1-Click Instant Demo Login ({selectedRoleForAuth === 'developer' ? "Fresher Aarav" : "Recruiter Sarah"})
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 font-mono">
                <button
                  type="button"
                  onClick={() => setAuthMode('select')}
                  className="hover:text-slate-200 underline"
                >
                  ← Change Role
                </button>
                <button
                  type="button"
                  onClick={() => onQuickLogin(selectedRoleForAuth === 'developer' ? 'user-fresher-1' : 'user-company-1')}
                  className="text-brand-green hover:underline flex items-center gap-1"
                >
                  <Zap className="w-3 h-3 text-brand-amber" />
                  Instant Demo Login
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
