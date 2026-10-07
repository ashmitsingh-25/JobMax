import React, { useState } from 'react';
import { InView } from './core/in-view';
import { 
  Target, Zap, Compass, ChevronDown, Map, Globe, 
  BarChart, Building2, UserCircle, Users,
  X, Mail, Send, Cpu, Crosshair, ArrowUpRight, FileEdit,
  Search, Briefcase, CheckCircle2, FileText, Award, Code, Sparkles
} from 'lucide-react';

export function CareerImpactBanner() {
  return (
    <div className="w-full max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10">
      <InView
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="bg-gradient-to-r from-dark-800 via-dark-850 to-dark-800 border-2 border-brand-green/30 rounded-3xl p-8 md:p-12 shadow-glow-green overflow-hidden relative flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green border border-brand-green/30 px-3 py-1 rounded-full mb-6 text-xs font-mono font-semibold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" /> Career Readiness
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Turn Skill Gaps Into Career Readiness
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              JobMax helps you understand where you stand, identify the skills you need, and build a focused path toward your target role.
            </p>
            <button 
              onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="btn-primary"
            >
              Explore JobMax &rarr;
            </button>
          </div>

          <div className="relative z-10 w-full md:w-auto flex-shrink-0 flex items-center justify-center">
            {/* Conceptual Visual for Skill Readiness */}
            <div className="relative w-64 h-64 bg-dark-900 border border-dark-700 rounded-full flex items-center justify-center shadow-card-dark">
              <div className="absolute inset-2 border border-brand-green/20 rounded-full border-dashed animate-spin-slow"></div>
              <div className="absolute inset-8 border border-brand-cyan/20 rounded-full border-dashed animate-reverse-spin"></div>
              
              <div className="w-32 h-32 bg-dark-800 rounded-full flex flex-col items-center justify-center z-10 border border-brand-green/40 shadow-glow-green">
                <Target className="w-8 h-8 text-brand-green mb-2" />
                <div className="text-2xl font-bold text-white">92%</div>
                <div className="text-[10px] text-slate-400 font-mono uppercase">Readiness</div>
              </div>

              {/* Orbiting Elements */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-700 p-2 rounded-full border border-dark-600 shadow-md text-brand-cyan">
                <Code className="w-5 h-5" />
              </div>
              <div className="absolute bottom-4 right-4 bg-dark-700 p-2 rounded-full border border-dark-600 shadow-md text-brand-purple">
                <Globe className="w-5 h-5" />
              </div>
            </div>
          </div>

        </div>
      </InView>
    </div>
  );
}

export function WhyDevelopersChoose() {
  const features = [
    {
      title: "Know Your Skill Gaps",
      desc: "See which skills you already have and which ones you need to strengthen for your target role.",
      icon: <Target className="w-5 h-5" />
    },
    {
      title: "Build With Direction",
      desc: "Get a focused career path instead of randomly collecting courses, technologies, and certifications.",
      icon: <Compass className="w-5 h-5" />
    },
    {
      title: "Prepare for Real Roles",
      desc: "Understand the skills and technologies expected for the roles you want.",
      icon: <Building2 className="w-5 h-5" />
    },
    {
      title: "Make Better Career Decisions",
      desc: "Use AI-powered insights to understand where you stand and what to work on next.",
      icon: <BarChart className="w-5 h-5" />
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-16">
        <InView variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why developers choose JobMax</h2>
        </InView>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, idx) => (
          <InView
            key={idx}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 h-full hover:-translate-y-1 hover:border-brand-green/50 hover:shadow-glow-green transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-dark-700 text-brand-green flex items-center justify-center mb-5">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          </InView>
        ))}
      </div>
    </div>
  );
}

export function EverythingYouNeed() {
  const features = [
    {
      title: "Skill Intelligence",
      desc: "Analyze your current technical skills and identify important gaps.",
      icon: <Zap className="w-5 h-5" />
    },
    {
      title: "Career Roadmap",
      desc: "Turn identified gaps into a structured learning and improvement path.",
      icon: <Map className="w-5 h-5" />
    },
    {
      title: "Resume Intelligence",
      desc: "Understand how your resume aligns with your target role.",
      icon: <FileText className="w-5 h-5" />
    },
    {
      title: "Market Intelligence",
      desc: "Understand relevant skills and technologies for your target career.",
      icon: <Globe className="w-5 h-5" />
    },
    {
      title: "Interview Readiness",
      desc: "Identify areas where additional preparation may be required.",
      icon: <UserCircle className="w-5 h-5" />
    },
    {
      title: "Hiring Intelligence",
      desc: "For companies, discover candidates who better match specific roles.",
      icon: <Users className="w-5 h-5" />
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-dark-800">
      <div className="text-center mb-16">
        <InView variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything You Need to Become Job-Ready</h2>
        </InView>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item, idx) => (
          <InView
            key={idx}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 h-full flex items-start gap-4 hover:bg-dark-800 hover:border-brand-cyan/40 transition-colors duration-300">
              <div className="w-10 h-10 rounded-lg bg-dark-800 text-brand-cyan flex flex-shrink-0 items-center justify-center">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          </InView>
        ))}
      </div>
    </div>
  );
}

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: "What is JobMax?",
      a: "JobMax is an AI-powered platform that helps developers analyze their technical skills, identify gaps, and build career roadmaps. It also provides hiring intelligence for companies to evaluate candidates."
    },
    {
      q: "How does JobMax analyze my skills?",
      a: "By inputting your skills, experience, and target role, JobMax evaluates your profile against market requirements to generate personalized gap reports and readiness metrics."
    },
    {
      q: "Can JobMax help me identify skill gaps?",
      a: "Yes. The platform highlights exactly which technologies or concepts you are missing for specific roles, helping you prioritize what to learn next."
    },
    {
      q: "Can I use JobMax for different career roles?",
      a: "Absolutely. You can select different target roles (e.g., Frontend, Backend, Fullstack) to see how your current skillset aligns with their respective requirements."
    },
    {
      q: "Does JobMax support companies?",
      a: "Yes. JobMax has a dedicated Company Portal that allows recruiters and tech leads to build roles, review talent pools, and rank candidates using AI."
    },
    {
      q: "Are the Developer and Company experiences separate?",
      a: "Yes, they are completely separate. A developer will only see their own dashboard and career tools, while a company user will only access recruiting and candidate matching features."
    },
    {
      q: "Does JobMax replace traditional learning platforms?",
      a: "No. JobMax is an intelligence and planning layer. It tells you WHAT to learn and WHY, but you will still use your preferred resources to actually acquire the skills."
    },
    {
      q: "Is JobMax free?",
      a: "Yes, the core developer features for skill analysis and roadmap generation are free."
    }
  ];

  return (
    <div id="faq-section" className="w-full max-w-3xl mx-auto py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-dark-800">
      <div className="text-center mb-12">
        <InView variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
        </InView>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <InView key={idx} variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.3, delay: idx * 0.05 }}>
            <div className="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden transition-colors hover:border-dark-600">
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full text-left px-6 py-4 flex items-center justify-between focus:outline-none"
              >
                <span className="font-semibold text-white">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openIdx === idx ? 'rotate-180 text-brand-green' : ''}`} />
              </button>
              
              <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIdx === idx ? 'max-h-40 pb-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          </InView>
        ))}
      </div>
    </div>
  );
}

export function FooterSection({ onStartAuth, onOpenModal }) {
  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleModal = (e, modalType) => {
    e.preventDefault();
    onOpenModal(modalType);
  };

  const handleAuth = (e, role) => {
    e.preventDefault();
    onStartAuth(role);
  };

  return (
    <footer className="w-full bg-dark-900 border-t border-dark-800 pt-16 pb-8 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-brand-green flex items-center justify-center text-dark-900">
                <Target className="w-4 h-4" />
              </div>
              JobMax
            </h3>
            <ul className="space-y-3">
              <li><a href="#" onClick={(e) => handleModal(e, 'about')} className="text-sm text-slate-400 hover:text-white transition-colors">About JobMax</a></li>
              <li><a href="#how-it-works-section" onClick={(e) => handleScrollToSection(e, 'how-it-works-section')} className="text-sm text-slate-400 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" onClick={(e) => handleAuth(e, 'developer')} className="text-sm text-slate-400 hover:text-white transition-colors">Developers</a></li>
              <li><a href="#" onClick={(e) => handleAuth(e, 'company')} className="text-sm text-slate-400 hover:text-white transition-colors">Companies</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Developers</h4>
            <ul className="space-y-3">
              <li><a href="#" onClick={(e) => handleAuth(e, 'developer')} className="text-sm text-slate-400 hover:text-white transition-colors">Skill Analysis</a></li>
              <li><a href="#" onClick={(e) => handleAuth(e, 'developer')} className="text-sm text-slate-400 hover:text-white transition-colors">Skill Gaps</a></li>
              <li><a href="#" onClick={(e) => handleAuth(e, 'developer')} className="text-sm text-slate-400 hover:text-white transition-colors">Career Roadmap</a></li>
              <li><a href="#" onClick={(e) => handleAuth(e, 'developer')} className="text-sm text-slate-400 hover:text-white transition-colors">Resume Analysis</a></li>
              <li><a href="#" onClick={(e) => handleAuth(e, 'developer')} className="text-sm text-slate-400 hover:text-brand-green transition-colors">Developer Login</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Companies</h4>
            <ul className="space-y-3">
              <li><a href="#" onClick={(e) => handleAuth(e, 'company')} className="text-sm text-slate-400 hover:text-white transition-colors">Company Portal</a></li>
              <li><a href="#" onClick={(e) => handleAuth(e, 'company')} className="text-sm text-slate-400 hover:text-white transition-colors">Role Builder</a></li>
              <li><a href="#" onClick={(e) => handleAuth(e, 'company')} className="text-sm text-slate-400 hover:text-white transition-colors">Candidate Matching</a></li>
              <li><a href="#" onClick={(e) => handleAuth(e, 'company')} className="text-sm text-slate-400 hover:text-white transition-colors">Hiring Intelligence</a></li>
              <li><a href="#" onClick={(e) => handleAuth(e, 'company')} className="text-sm text-slate-400 hover:text-brand-cyan transition-colors">Company Login</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#faq-section" onClick={(e) => handleScrollToSection(e, 'faq-section')} className="text-sm text-slate-400 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" onClick={(e) => handleModal(e, 'documentation')} className="text-sm text-slate-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" onClick={(e) => handleModal(e, 'contact')} className="text-sm text-slate-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" onClick={(e) => handleModal(e, 'privacy')} className="text-sm text-slate-400 hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" onClick={(e) => handleModal(e, 'terms')} className="text-sm text-slate-400 hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-dark-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; 2026 JobMax. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" onClick={(e) => handleModal(e, 'privacy')} className="text-xs text-slate-500 hover:text-slate-300">Privacy</a>
            <a href="#" onClick={(e) => handleModal(e, 'terms')} className="text-xs text-slate-500 hover:text-slate-300">Terms</a>
            <a href="#" onClick={(e) => handleModal(e, 'contact')} className="text-xs text-slate-500 hover:text-slate-300">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function HowJobMaxHelps() {
  const steps = [
    {
      id: 1,
      title: 'Company Creates Contest',
      desc: 'Companies publish technical challenges to evaluate real-world problem-solving skills.',
      icon: <FileEdit className="w-6 h-6" />,
      color: 'brand-cyan'
    },
    {
      id: 2,
      title: 'Candidates Participate',
      desc: 'Students and professionals write code, solve problems, and submit their solutions.',
      icon: <Code className="w-6 h-6" />,
      color: 'brand-green'
    },
    {
      id: 3,
      title: 'Global Leaderboard',
      desc: 'Performance is automatically evaluated, and top talent ranks on the leaderboard.',
      icon: <BarChart className="w-6 h-6" />,
      color: 'purple-400'
    },
    {
      id: 4,
      title: 'Company Discovers Talent',
      desc: 'Hiring managers filter and discover top candidates based on actual performance, not just resumes.',
      icon: <Search className="w-6 h-6" />,
      color: 'brand-cyan'
    },
    {
      id: 5,
      title: 'Real-World Projects',
      desc: 'Candidates can further prove themselves by contributing to real company projects.',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'brand-green'
    },
    {
      id: 6,
      title: 'Performance Evaluation',
      desc: 'Companies review code quality, creativity, and project documentation.',
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: 'purple-400'
    },
    {
      id: 7,
      title: 'Hiring Proposal',
      desc: 'Companies send direct job/internship proposals with CTC and role details to selected talent.',
      icon: <FileText className="w-6 h-6" />,
      color: 'brand-cyan'
    },
    {
      id: 8,
      title: 'Job / Internship',
      desc: 'Candidate accepts the proposal, completing the skill-based hiring process.',
      icon: <Award className="w-6 h-6" />,
      color: 'brand-green'
    }
  ];

  return (
    <div id="how-it-works-section" className="w-full max-w-5xl mx-auto py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-dark-800">
      <div className="text-center mb-16">
        <InView
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 bg-dark-800 border border-brand-green/30 px-3.5 py-1.5 rounded-full mb-4 shadow-glow-green">
            <Sparkles className="w-4 h-4 text-brand-green" />
            <span className="font-mono text-xs text-brand-green font-semibold tracking-wide">
              THE SKILL-BASED WORKFLOW
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How JobMax Connects Talent & Companies</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">From publishing a contest to signing an offer letter, everything is driven by proof of work.</p>
        </InView>
      </div>

      <div className="relative">
        {/* Vertical Connecting Line */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-dark-700 -translate-x-1/2"></div>
        
        <div className="flex flex-col gap-8 md:gap-12 relative z-10">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <InView
                key={step.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.05 }}
              >
                <div className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  
                  {/* Content Box */}
                  <div className={`flex-1 w-full md:w-auto ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`bg-dark-800 border border-dark-700 rounded-2xl p-6 shadow-card-dark transition-all duration-300 hover:border-${step.color}/50 hover:bg-dark-750 inline-block w-full max-w-md`}>
                      <div className={`flex items-center gap-3 mb-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        <div className={`text-${step.color}`}>
                          {step.icon}
                        </div>
                        <h3 className="font-bold text-slate-200 text-lg">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Center Node */}
                  <div className="hidden md:flex flex-col items-center justify-center relative shrink-0 w-12 h-12">
                    <div className={`w-10 h-10 rounded-full bg-dark-900 border-2 border-${step.color} flex items-center justify-center font-mono font-bold text-sm text-${step.color} z-10 shadow-glow-${step.color.split('-')[1] || 'green'}`}>
                      {step.id}
                    </div>
                  </div>

                  {/* Empty Spacer for alternating layout */}
                  <div className="hidden md:block flex-1"></div>
                </div>
              </InView>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function InfoModals({ activeModal, onClose }) {
  if (!activeModal) return null;

  const renderContent = () => {
    switch (activeModal) {
      case 'about':
        return (
          <div className="space-y-6 text-slate-300">
            <p>
              JobMax is an AI-powered career and hiring intelligence platform designed to help developers understand their current skills, identify career gaps, and improve their readiness for target roles.
            </p>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Developer Experience</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Skill analysis</li>
                <li>Career direction</li>
                <li>Skill-gap understanding</li>
                <li>Career readiness</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Company Experience</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Role requirements</li>
                <li>Candidate analysis</li>
                <li>Candidate matching</li>
                <li>Hiring intelligence</li>
              </ul>
            </div>
          </div>
        );
      case 'privacy':
        return (
          <div className="space-y-6 text-slate-300">
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Information We Collect</h3>
              <p>We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us.</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">How We Use Information</h3>
              <p>We may use the information we collect about you to provide, maintain, and improve our services.</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Account Information</h3>
              <p>You may update, correct, or delete information about you at any time by logging into your online account.</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Resume and Profile Information</h3>
              <p>Your resume and profile data are used strictly to provide you with skill analysis and career readiness insights.</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">AI Analysis</h3>
              <p>We utilize AI models to process your skills and match them against market requirements. Your data is not used to train public models.</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Data Security</h3>
              <p>We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access.</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Data Sharing</h3>
              <p>We do not sell your personal information. Your resume and skills are only visible to matched companies if you explicitly allow it.</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">User Choices</h3>
              <p>You may opt out of certain data collection or request full account deletion.</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Data Retention</h3>
              <p>We retain data only as long as necessary to provide our services.</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Contact</h3>
              <p>If you have any questions about this Privacy Policy, please contact us via the Contact form.</p>
            </div>
          </div>
        );
      case 'terms':
        return (
          <div className="space-y-6 text-slate-300">
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Acceptance of Terms</h3>
              <p>By accessing or using JobMax, you agree to be bound by these Terms of Use.</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Using JobMax</h3>
              <p>You must use JobMax for its intended purpose of career development and hiring intelligence. Misuse of the platform is strictly prohibited.</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Developer Accounts</h3>
              <p>Developer accounts are for individual use. You must not share your account or use it for automated scraping.</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Company Accounts</h3>
              <p>Company accounts must only be used by authorized representatives for legitimate hiring purposes.</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">User Responsibilities</h3>
              <p>You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate.</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Resume and Profile Information</h3>
              <p>You retain all rights to your resume and profile information. By uploading it, you grant us permission to analyze it for the purpose of providing our services.</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">AI-Generated Insights</h3>
              <p>Our AI insights are provided for informational purposes only. We do not guarantee their complete accuracy or completeness.</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Career Recommendations</h3>
              <p>We do not guarantee employment or specific career outcomes based on our recommendations.</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Company/Candidate Information</h3>
              <p>Information provided by companies or candidates is their sole responsibility. We do not verify all claims made by users.</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Intellectual Property</h3>
              <p>JobMax and its original content, features, and functionality are owned by us and are protected by copyright and other intellectual property laws.</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Limitation of Liability</h3>
              <p>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the platform.</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Changes to Terms</h3>
              <p>We reserve the right to modify these terms at any time. We will provide notice of significant changes.</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Contact</h3>
              <p>For questions about these terms, please contact us.</p>
            </div>
          </div>
        );
      case 'documentation':
        return (
          <div className="space-y-6 text-slate-300">
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Getting Started</h3>
              <p>Welcome to JobMax. Choose between a Developer or Company account to get started.</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Developer Portal</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Skill Analysis:</strong> Upload your resume or input skills manually.</li>
                <li><strong>Skill Gap Analysis:</strong> Compare your current skills against target roles.</li>
                <li><strong>Career Roadmap:</strong> Get actionable steps to improve your readiness.</li>
                <li><strong>Resume Analysis:</strong> Receive feedback on your resume's effectiveness.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Company Portal</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Candidate Matching:</strong> Find candidates that match your exact requirements.</li>
                <li><strong>Hiring Intelligence:</strong> Use AI to evaluate talent pools objectively.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Account Types</h3>
              <p>Developer and Company accounts are strictly separated to ensure privacy and focus.</p>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-6 text-slate-300">
            <p>Have a question, feedback, or need help? Send us a message.</p>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Thanks for reaching out! (Demo)"); onClose(); }}>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Name</label>
                <input type="text" required className="w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-green" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                <input type="email" required className="w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-green" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Message</label>
                <textarea required rows="4" className="w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-green resize-none" placeholder="How can we help?"></textarea>
              </div>
              <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (activeModal) {
      case 'about': return 'About JobMax';
      case 'privacy': return 'Privacy Policy';
      case 'terms': return 'Terms of Use';
      case 'documentation': return 'JobMax Documentation';
      case 'contact': return 'Contact JobMax';
      default: return '';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-sm animate-in fade-in">
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      ></div>
      <div className="relative w-full max-w-2xl bg-dark-800 border border-dark-700 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95">
        <div className="flex items-center justify-between p-6 border-b border-dark-700">
          <h2 className="text-xl font-bold text-white">{getTitle()}</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-dark-700 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
