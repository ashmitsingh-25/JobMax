import React, { useState } from 'react';
import { InView } from './core/in-view';
import { 
  Target, Zap, Compass, CheckCircle2, 
  ChevronDown, Code, Map, FileText, Globe, 
  BarChart, Building2, UserCircle, Users 
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
    <div className="w-full max-w-3xl mx-auto py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-dark-800">
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

export function FooterSection() {
  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              <li><a href="#" onClick={handleScrollToTop} className="text-sm text-slate-400 hover:text-white transition-colors">About JobMax</a></li>
              <li><a href="#" onClick={handleScrollToTop} className="text-sm text-slate-400 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" onClick={handleScrollToTop} className="text-sm text-slate-400 hover:text-white transition-colors">Developers</a></li>
              <li><a href="#" onClick={handleScrollToTop} className="text-sm text-slate-400 hover:text-white transition-colors">Companies</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Developers</h4>
            <ul className="space-y-3">
              <li><a href="#" onClick={handleScrollToTop} className="text-sm text-slate-400 hover:text-white transition-colors">Skill Analysis</a></li>
              <li><a href="#" onClick={handleScrollToTop} className="text-sm text-slate-400 hover:text-white transition-colors">Skill Gaps</a></li>
              <li><a href="#" onClick={handleScrollToTop} className="text-sm text-slate-400 hover:text-white transition-colors">Career Roadmap</a></li>
              <li><a href="#" onClick={handleScrollToTop} className="text-sm text-slate-400 hover:text-white transition-colors">Resume Analysis</a></li>
              <li><a href="#" onClick={handleScrollToTop} className="text-sm text-slate-400 hover:text-brand-green transition-colors">Developer Login</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Companies</h4>
            <ul className="space-y-3">
              <li><a href="#" onClick={handleScrollToTop} className="text-sm text-slate-400 hover:text-white transition-colors">Company Portal</a></li>
              <li><a href="#" onClick={handleScrollToTop} className="text-sm text-slate-400 hover:text-white transition-colors">Role Builder</a></li>
              <li><a href="#" onClick={handleScrollToTop} className="text-sm text-slate-400 hover:text-white transition-colors">Candidate Matching</a></li>
              <li><a href="#" onClick={handleScrollToTop} className="text-sm text-slate-400 hover:text-white transition-colors">Hiring Intelligence</a></li>
              <li><a href="#" onClick={handleScrollToTop} className="text-sm text-slate-400 hover:text-brand-cyan transition-colors">Company Login</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" onClick={handleScrollToTop} className="text-sm text-slate-400 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" onClick={handleScrollToTop} className="text-sm text-slate-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" onClick={handleScrollToTop} className="text-sm text-slate-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" onClick={handleScrollToTop} className="text-sm text-slate-400 hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" onClick={handleScrollToTop} className="text-sm text-slate-400 hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-dark-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; 2026 JobMax. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" onClick={handleScrollToTop} className="text-xs text-slate-500 hover:text-slate-300">Privacy</a>
            <a href="#" onClick={handleScrollToTop} className="text-xs text-slate-500 hover:text-slate-300">Terms</a>
            <a href="#" onClick={handleScrollToTop} className="text-xs text-slate-500 hover:text-slate-300">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function HowJobMaxHelps() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: 'Build Your Profile',
      desc: 'Add your education, skills, experience, projects, certifications, and career goals.'
    },
    {
      id: 2,
      title: 'Analyze Your Skills',
      desc: 'JobMax evaluates your profile against your target career direction.'
    },
    {
      id: 3,
      title: 'Find Your Gaps',
      desc: 'Understand which skills or areas need improvement.'
    },
    {
      id: 4,
      title: 'Take Action',
      desc: 'Follow a focused path to improve your career readiness.'
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-dark-800">
      <div className="text-center mb-16">
        <InView
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How JobMax Helps You Move Forward</h2>
        </InView>
      </div>

      <div className="flex flex-col md:flex-row gap-6 relative">
        {/* Connecting line for desktop */}
        <div className="hidden md:block absolute top-[52px] left-12 right-12 h-0.5 bg-dark-700 -z-10"></div>
        
        {steps.map((step, index) => (
          <InView
            key={step.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
            className="flex-1"
          >
            <div 
              onClick={() => setActiveStep(step.id)}
              className={`relative cursor-pointer group transition-all duration-300 h-full ${activeStep === step.id ? '-translate-y-2' : 'hover:-translate-y-1'}`}
            >
              <div className={`bg-dark-800 border-2 rounded-2xl p-6 h-full transition-colors duration-300 shadow-card-dark ${
                activeStep === step.id 
                  ? 'border-brand-green bg-dark-750 shadow-glow-green' 
                  : 'border-dark-700 hover:border-brand-cyan/50 hover:bg-dark-750 hover:shadow-glow-blue'
              }`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-lg transition-colors ${
                    activeStep === step.id ? 'bg-brand-green/20 text-brand-green' : 'bg-dark-700 text-slate-400 group-hover:bg-brand-cyan/20 group-hover:text-brand-cyan'
                  }`}>
                    0{step.id}
                  </div>
                  <h3 className={`font-bold transition-colors ${activeStep === step.id ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                    {step.title}
                  </h3>
                </div>
                
                <div className={`grid transition-all duration-300 ease-in-out ${
                  activeStep === step.id ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
                }`}>
                  <p className="text-sm text-slate-300 leading-relaxed overflow-hidden">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          </InView>
        ))}
      </div>
    </div>
  );
}
