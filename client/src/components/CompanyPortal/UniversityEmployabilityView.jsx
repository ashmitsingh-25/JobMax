import React, { useState } from 'react';
import { 
  GraduationCap, 
  TrendingUp, 
  Users, 
  Search, 
  Filter, 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  Eye, 
  Building2, 
  Send, 
  Star, 
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  ExternalLink,
  MapPin,
  Briefcase,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Comprehensive dataset of top universities with employability probabilities & candidates
const UNIVERSITIES_DATA = [
  {
    id: 'iit-delhi',
    name: 'Indian Institute of Technology (IIT) Delhi',
    shortName: 'IIT Delhi',
    location: 'New Delhi, Delhi',
    tier: 'Tier 1',
    employabilityRate: 97.2,
    hiringSuccessRate: 98.4,
    medianPackage: '₹45.0 LPA',
    totalGraduates: 850,
    activeCandidatesCount: 142,
    topDomains: ['Distributed Systems', 'Algorithms & DS', 'AI & Machine Learning', 'Systems Programming'],
    verifiedSkills: ['Data Structures & Algorithms', 'C++', 'Go', 'Distributed Systems', 'PostgreSQL', 'Docker'],
    topRecruiters: ['Google', 'Microsoft', 'Uber', 'Goldman Sachs', 'Tower Research'],
    accreditation: 'NIRF Rank #2 · Institute of Eminence',
    candidates: [
      {
        id: 'iitd-cand-1',
        name: 'Aarav Sharma',
        headline: 'Final Year CS Student · Algorithmic Specialist',
        email: 'aarav.sharma@iitd.ac.in',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        college: 'IIT Delhi',
        collegeTier: 'Tier 1',
        cgpa: 9.2,
        fitScore: 96,
        matchedCount: 5,
        missingCount: 0,
        matchedSkills: ['Data Structures & Algorithms', 'C++', 'Go', 'Distributed Systems', 'PostgreSQL'],
        missingSkills: [],
        highlight: 'Rank #4 in National Algorithmic Hackathon',
        day1Ready: true
      },
      {
        id: 'iitd-cand-2',
        name: 'Ishaan Verma',
        headline: 'Systems & Backend Engineer · Open Source Contributor',
        email: 'ishaan.v@iitd.ac.in',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        college: 'IIT Delhi',
        collegeTier: 'Tier 1',
        cgpa: 8.9,
        fitScore: 92,
        matchedCount: 4,
        missingCount: 1,
        matchedSkills: ['Distributed Systems', 'Go', 'Kubernetes', 'Linux Internals'],
        missingSkills: ['Kafka'],
        highlight: 'Published Raft-consensus simulator in Go',
        day1Ready: true
      }
    ]
  },
  {
    id: 'iiit-hyderabad',
    name: 'International Institute of Information Technology (IIIT) Hyderabad',
    shortName: 'IIIT Hyderabad',
    location: 'Hyderabad, Telangana',
    tier: 'Tier 1',
    employabilityRate: 95.8,
    hiringSuccessRate: 96.9,
    medianPackage: '₹42.0 LPA',
    totalGraduates: 420,
    activeCandidatesCount: 96,
    topDomains: ['Competitive Programming', 'Machine Learning', 'Computer Vision', 'Fullstack Architecture'],
    verifiedSkills: ['Data Structures & Algorithms', 'Python', 'PyTorch', 'C++', 'React.js', 'System Design'],
    topRecruiters: ['Microsoft', 'Adobe', 'Apple', 'Meta', 'Amazon'],
    accreditation: 'World-renowned Coding Culture · ICPC World Finalists',
    candidates: [
      {
        id: 'iiith-cand-1',
        name: 'Kavya Sen',
        headline: 'AI/ML Researcher & Backend Engineer',
        email: 'kavya.sen@iiit.ac.in',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        college: 'IIIT Hyderabad',
        collegeTier: 'Tier 1',
        cgpa: 9.4,
        fitScore: 95,
        matchedCount: 5,
        missingCount: 0,
        matchedSkills: ['Python', 'PyTorch', 'Distributed Systems', 'SQL', 'FastAPI'],
        missingSkills: [],
        highlight: 'ICPC Regional Top 10 · 2 Top-Tier Publications',
        day1Ready: true
      },
      {
        id: 'iiith-cand-2',
        name: 'Tanmay Joshi',
        headline: 'High-Concurrency Software Architect',
        email: 'tanmay.j@iiit.ac.in',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        college: 'IIIT Hyderabad',
        collegeTier: 'Tier 1',
        cgpa: 8.7,
        fitScore: 90,
        matchedCount: 4,
        missingCount: 1,
        matchedSkills: ['C++', 'Data Structures & Algorithms', 'PostgreSQL', 'Redis'],
        missingSkills: ['Docker'],
        highlight: 'Codeforces Master (2150+)',
        day1Ready: true
      }
    ]
  },
  {
    id: 'bits-pilani',
    name: 'Birla Institute of Technology and Science (BITS) Pilani',
    shortName: 'BITS Pilani',
    location: 'Pilani, Rajasthan',
    tier: 'Tier 1',
    employabilityRate: 94.6,
    hiringSuccessRate: 95.2,
    medianPackage: '₹38.5 LPA',
    totalGraduates: 920,
    activeCandidatesCount: 118,
    topDomains: ['Fullstack Web', 'Cloud Infrastructure', 'Fintech Systems', 'Product Engineering'],
    verifiedSkills: ['React.js', 'TypeScript', 'Node.js', 'Go', 'AWS', 'PostgreSQL'],
    topRecruiters: ['Google', 'De Shaw', 'Morgan Stanley', 'Swiggy', 'Zomato'],
    accreditation: 'Institute of Eminence · Practice School Industry Network',
    candidates: [
      {
        id: 'bits-cand-1',
        name: 'Ananya Singh',
        headline: 'Full-Stack Engineer & Product Builder',
        email: 'ananya.s@bits-pilani.ac.in',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        college: 'BITS Pilani',
        collegeTier: 'Tier 1',
        cgpa: 9.1,
        fitScore: 94,
        matchedCount: 5,
        missingCount: 0,
        matchedSkills: ['React.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
        missingSkills: [],
        highlight: 'Completed 6-Month Practice School at Tier-1 Unicorn',
        day1Ready: true
      },
      {
        id: 'bits-cand-2',
        name: 'Devansh Roy',
        headline: 'Cloud Backend & DevOps Engineer',
        email: 'devansh.r@bits-pilani.ac.in',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
        college: 'BITS Pilani',
        collegeTier: 'Tier 1',
        cgpa: 8.6,
        fitScore: 88,
        matchedCount: 4,
        missingCount: 1,
        matchedSkills: ['Go', 'Docker', 'Kubernetes', 'PostgreSQL'],
        missingSkills: ['Kafka'],
        highlight: 'Certified Kubernetes Application Developer (CKAD)',
        day1Ready: true
      }
    ]
  },
  {
    id: 'nit-trichy',
    name: 'National Institute of Technology (NIT) Trichy',
    shortName: 'NIT Trichy',
    location: 'Tiruchirappalli, Tamil Nadu',
    tier: 'Tier 1',
    employabilityRate: 92.4,
    hiringSuccessRate: 93.8,
    medianPackage: '₹32.0 LPA',
    totalGraduates: 780,
    activeCandidatesCount: 134,
    topDomains: ['Core Software Engineering', 'Embedded Systems', 'Database Engineering', 'Enterprise Java'],
    verifiedSkills: ['Java', 'Spring Boot', 'Data Structures & Algorithms', 'SQL', 'Microservices'],
    topRecruiters: ['Amazon', 'Oracle', 'Cisco', 'Qualcomm', 'Texas Instruments'],
    accreditation: 'NIRF #1 among all NITs',
    candidates: [
      {
        id: 'nitt-cand-1',
        name: 'Rahul Verma',
        headline: 'Enterprise Backend & Microservices Engineer',
        email: 'rahul.v@nitt.edu',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
        college: 'NIT Trichy',
        collegeTier: 'Tier 1',
        cgpa: 8.8,
        fitScore: 91,
        matchedCount: 4,
        missingCount: 1,
        matchedSkills: ['Java', 'Spring Boot', 'SQL', 'Docker'],
        missingSkills: ['Distributed Systems'],
        highlight: 'Built fault-tolerant payment gateway pipeline',
        day1Ready: true
      }
    ]
  },
  {
    id: 'dtu',
    name: 'Delhi Technological University (DTU)',
    shortName: 'DTU Delhi',
    location: 'New Delhi, Delhi',
    tier: 'Tier 1.5',
    employabilityRate: 89.8,
    hiringSuccessRate: 91.2,
    medianPackage: '₹26.5 LPA',
    totalGraduates: 1100,
    activeCandidatesCount: 160,
    topDomains: ['Web Engineering', 'Android Development', 'Data Analytics', 'DevOps'],
    verifiedSkills: ['React.js', 'Node.js', 'Python', 'SQL', 'Docker', 'Git'],
    topRecruiters: ['Paytm', 'Samsung R&D', 'Adobe', 'Flipkart', 'MakeMyTrip'],
    accreditation: 'Prestigious 80+ Year Engineering Legacy in NCR',
    candidates: [
      {
        id: 'dtu-cand-1',
        name: 'Priya Gupta',
        headline: 'Full-Stack Developer · React & Node.js Specialist',
        email: 'priya.g@dtu.ac.in',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        college: 'DTU Delhi',
        collegeTier: 'Tier 1.5',
        cgpa: 8.7,
        fitScore: 89,
        matchedCount: 4,
        missingCount: 1,
        matchedSkills: ['React.js', 'TypeScript', 'Node.js', 'SQL'],
        missingSkills: ['Go'],
        highlight: 'Lead Organizer at DTU Major League Hacking',
        day1Ready: true
      }
    ]
  },
  {
    id: 'rvce-bangalore',
    name: 'RV College of Engineering (RVCE)',
    shortName: 'RVCE Bengaluru',
    location: 'Bengaluru, Karnataka',
    tier: 'Tier 2',
    employabilityRate: 87.5,
    hiringSuccessRate: 89.0,
    medianPackage: '₹22.5 LPA',
    totalGraduates: 680,
    activeCandidatesCount: 125,
    topDomains: ['Bengaluru Startup Ecosystem', 'Cloud Engineering', 'Fullstack', 'QA Automation'],
    verifiedSkills: ['Java', 'React.js', 'AWS', 'Python', 'PostgreSQL', 'Docker'],
    topRecruiters: ['PhonePe', 'Cisco', 'Razorpay', 'JPMorgan', 'Intuit'],
    accreditation: 'Direct Silicon Valley of India Startup Pipeline',
    candidates: [
      {
        id: 'rvce-cand-1',
        name: 'Siddharth Rao',
        headline: 'Fullstack & Cloud Associate',
        email: 'siddharth.r@rvce.edu.in',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        college: 'RVCE Bengaluru',
        collegeTier: 'Tier 2',
        cgpa: 8.5,
        fitScore: 87,
        matchedCount: 4,
        missingCount: 1,
        matchedSkills: ['React.js', 'Node.js', 'AWS', 'PostgreSQL'],
        missingSkills: ['Distributed Systems'],
        highlight: 'Interned at early-stage Bengaluru Y-Combinator startup',
        day1Ready: true
      }
    ]
  },
  {
    id: 'vit-vellore',
    name: 'Vellore Institute of Technology (VIT)',
    shortName: 'VIT Vellore',
    location: 'Vellore, Tamil Nadu',
    tier: 'Tier 2',
    employabilityRate: 85.2,
    hiringSuccessRate: 86.8,
    medianPackage: '₹19.5 LPA',
    totalGraduates: 2400,
    activeCandidatesCount: 210,
    topDomains: ['Fullstack Web', 'Mobile App Development', 'Cybersecurity', 'Cloud Platforms'],
    verifiedSkills: ['React.js', 'Java', 'Python', 'MongoDB', 'Docker', 'REST APIs'],
    topRecruiters: ['Microsoft', 'Infosys Turbo', 'TCS Digital', 'Cognizant GenC Next', 'Dell'],
    accreditation: 'High-Volume Pre-Screened Talent Engine',
    candidates: [
      {
        id: 'vit-cand-1',
        name: 'Meera Nair',
        headline: 'Frontend Engineer & UI/UX Developer',
        email: 'meera.n@vit.ac.in',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
        college: 'VIT Vellore',
        collegeTier: 'Tier 2',
        cgpa: 8.6,
        fitScore: 84,
        matchedCount: 3,
        missingCount: 2,
        matchedSkills: ['React.js', 'TypeScript', 'Node.js'],
        missingSkills: ['Go', 'Distributed Systems'],
        highlight: 'Ranked in top 2% of VIT Hackathon 2025',
        day1Ready: false
      }
    ]
  }
];

export default function UniversityEmployabilityView({ currentUser, onSelectCandidate, selectedRole }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState('all');
  const [minRateFilter, setMinRateFilter] = useState(0);
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [sortBy, setSortBy] = useState('rate-desc');
  const [selectedUniversityModal, setSelectedUniversityModal] = useState(null);
  const [invitedCandidateIds, setInvitedCandidateIds] = useState([]);
  const [batchDriveScheduled, setBatchDriveScheduled] = useState([]);

  // Filter & sort logic
  const filteredUniversities = UNIVERSITIES_DATA.filter(uni => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = uni.name.toLowerCase().includes(q) || uni.shortName.toLowerCase().includes(q);
      const matchLoc = uni.location.toLowerCase().includes(q);
      const matchSkills = uni.verifiedSkills.some(s => s.toLowerCase().includes(q));
      if (!matchName && !matchLoc && !matchSkills) return false;
    }
    // Tier filter
    if (selectedTier !== 'all' && uni.tier !== selectedTier) {
      return false;
    }
    // Min employability rate
    if (uni.employabilityRate < minRateFilter) {
      return false;
    }
    // Domain filter
    if (selectedDomain !== 'all') {
      const hasDomain = uni.topDomains.some(d => d.toLowerCase().includes(selectedDomain.toLowerCase()));
      if (!hasDomain) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'rate-desc') return b.employabilityRate - a.employabilityRate;
    if (sortBy === 'rate-asc') return a.employabilityRate - b.employabilityRate;
    if (sortBy === 'candidates-desc') return b.activeCandidatesCount - a.activeCandidatesCount;
    if (sortBy === 'package-desc') {
      const parseLpa = str => parseFloat(str.replace(/[^\d.]/g, '')) || 0;
      return parseLpa(b.medianPackage) - parseLpa(a.medianPackage);
    }
    return 0;
  });

  const handleSendInterviewInvite = (cand, e) => {
    e.stopPropagation();
    setInvitedCandidateIds(prev => [...prev, cand.id]);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  const handleScheduleDrive = (uniId, e) => {
    e.stopPropagation();
    setBatchDriveScheduled(prev => [...prev, uniId]);
  };

  // Top high-level network stats
  const totalUniversitiesCount = UNIVERSITIES_DATA.length;
  const avgEmployabilityRate = (
    UNIVERSITIES_DATA.reduce((acc, u) => acc + u.employabilityRate, 0) / totalUniversitiesCount
  ).toFixed(1);
  const totalCampusCandidates = UNIVERSITIES_DATA.reduce((acc, u) => acc + u.activeCandidatesCount, 0);
  const topUni = UNIVERSITIES_DATA.reduce((prev, curr) => 
    curr.employabilityRate > prev.employabilityRate ? curr : prev, UNIVERSITIES_DATA[0]
  );

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-dark-800 via-dark-850 to-dark-800 border-2 border-brand-green/40 rounded-2xl p-6 shadow-glow-green">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-brand-green/10 text-brand-green border border-brand-green/30 text-[11px] px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-brand-green" />
              University Talent Intelligence & Employability Probability
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Campus Employability & Better Candidates Dashboard
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Target engineering campuses with proven employability rates, benchmarked technical skill bars, and direct access to pre-vetted campus candidates matched to your roles.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-dark-900/90 border border-dark-700 p-3.5 rounded-xl w-full lg:w-auto">
            <div className="text-center px-2">
              <p className="text-[10px] font-sans tracking-wide text-slate-400 uppercase">Avg Employability</p>
              <p className="text-2xl font-bold font-sans tracking-wide text-brand-green">{avgEmployabilityRate}%</p>
            </div>
            <div className="text-center px-2 border-l border-dark-700">
              <p className="text-[10px] font-sans tracking-wide text-slate-400 uppercase">Top Campus</p>
              <p className="text-base font-bold font-sans tracking-wide text-white truncate max-w-[100px]">{topUni.shortName}</p>
            </div>
            <div className="text-center px-2 border-l border-dark-700">
              <p className="text-[10px] font-sans tracking-wide text-slate-400 uppercase">Vetted Talent</p>
              <p className="text-2xl font-bold font-sans tracking-wide text-brand-cyan">{totalCampusCandidates}+</p>
            </div>
            <div className="text-center px-2 border-l border-dark-700">
              <p className="text-[10px] font-sans tracking-wide text-slate-400 uppercase">Campuses</p>
              <p className="text-2xl font-bold font-sans tracking-wide text-white">{totalUniversitiesCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls & Filters Bar */}
      <div className="card-hr p-4 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Bar */}
          <div className="relative flex-grow">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search university name, city, or tech skills (e.g., IIT Delhi, Bengaluru, Go)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-dark-850 border border-dark-700 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:border-brand-green transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Tier Filter */}
            <div className="flex items-center gap-1.5 bg-dark-850 border border-dark-700 rounded-lg px-2.5 py-1.5">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-dark-850 text-white">All Tiers</option>
                <option value="Tier 1" className="bg-dark-850 text-white">Tier 1 Campuses</option>
                <option value="Tier 1.5" className="bg-dark-850 text-white">Tier 1.5 Campuses</option>
                <option value="Tier 2" className="bg-dark-850 text-white">Tier 2 Campuses</option>
              </select>
            </div>

            {/* Employability Threshold Filter */}
            <div className="flex items-center gap-1.5 bg-dark-850 border border-dark-700 rounded-lg px-2.5 py-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-brand-green" />
              <select
                value={minRateFilter}
                onChange={(e) => setMinRateFilter(Number(e.target.value))}
                className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
              >
                <option value={0} className="bg-dark-850 text-white">All Rates</option>
                <option value={85} className="bg-dark-850 text-white">&gt; 85% Employability</option>
                <option value={90} className="bg-dark-850 text-white">&gt; 90% Employability</option>
                <option value={95} className="bg-dark-850 text-white">&gt; 95% Top Tier</option>
              </select>
            </div>

            {/* Sort Order */}
            <div className="flex items-center gap-1.5 bg-dark-850 border border-dark-700 rounded-lg px-2.5 py-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
              >
                <option value="rate-desc" className="bg-dark-850 text-white">Sort: Highest Employability</option>
                <option value="package-desc" className="bg-dark-850 text-white">Sort: Highest Median Package</option>
                <option value="candidates-desc" className="bg-dark-850 text-white">Sort: Most Vetted Candidates</option>
              </select>
            </div>

          </div>
        </div>

        {/* Quick Domain Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-dark-700/60 text-xs">
          <span className="text-slate-400 font-medium">Domain Focus:</span>
          {[
            { id: 'all', label: 'All Specializations' },
            { id: 'Distributed Systems', label: 'Distributed Systems' },
            { id: 'AI & Machine Learning', label: 'AI & ML' },
            { id: 'Fullstack', label: 'Fullstack Web' },
            { id: 'Cloud', label: 'Cloud Infrastructure' }
          ].map(d => (
            <button
              key={d.id}
              onClick={() => setSelectedDomain(d.id)}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                selectedDomain === d.id
                  ? 'bg-brand-green text-dark-900 font-bold shadow-sm'
                  : 'bg-dark-850 hover:bg-dark-700 text-slate-300 border border-dark-700'
              }`}
            >
              {d.label}
            </button>
          ))}
          <span className="text-slate-500 ml-auto">
            Showing <strong className="text-white">{filteredUniversities.length}</strong> of {UNIVERSITIES_DATA.length} universities
          </span>
        </div>
      </div>

      {/* Universities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredUniversities.map((uni) => {
          const isDriveScheduled = batchDriveScheduled.includes(uni.id);

          return (
            <div 
              key={uni.id}
              className="card-hr hover:border-brand-green/60 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Card Section */}
              <div className="space-y-4">
                
                {/* University Header & Employability Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-dark-750 border border-brand-green/40 flex items-center justify-center text-brand-green shadow-sm flex-shrink-0 mt-0.5">
                      <GraduationCap className="w-6 h-6 text-brand-green" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-lg text-white group-hover:text-brand-green transition-colors leading-snug">
                          {uni.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {uni.location}
                        </span>
                        <span>•</span>
                        <span className="px-2 py-0.5 rounded bg-dark-700 border border-dark-600 text-brand-cyan text-[11px] font-semibold">
                          {uni.tier}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Employability Probability Gauge */}
                  <div className="text-right flex-shrink-0 bg-dark-850 border border-dark-700 rounded-xl px-3.5 py-2">
                    <div className="flex items-center justify-end gap-1.5 text-brand-green">
                      <TrendingUp className="w-4 h-4 text-brand-green" />
                      <span className="text-xl font-bold font-sans tracking-wide text-brand-green">
                        {uni.employabilityRate}%
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                      Employability Rate
                    </p>
                  </div>
                </div>

                {/* Progress bar visual for employability rate */}
                <div className="w-full bg-dark-700 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-cyan to-brand-green rounded-full transition-all duration-500"
                    style={{ width: `${uni.employabilityRate}%` }}
                  ></div>
                </div>

                {/* University Metrics Badges */}
                <div className="grid grid-cols-3 gap-2 bg-dark-850 p-2.5 rounded-lg border border-dark-700 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Median CTC</span>
                    <span className="font-bold text-white font-sans">{uni.medianPackage}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Placement Fit</span>
                    <span className="font-bold text-emerald-400 font-sans">{uni.hiringSuccessRate}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Vetted Talent Pool</span>
                    <span className="font-bold text-brand-cyan font-sans">{uni.activeCandidatesCount} Available</span>
                  </div>
                </div>

                {/* Verified Skills */}
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                    Core Technical Strengths & Verified Skills:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {uni.verifiedSkills.map(skill => (
                      <span key={skill} className="badge-matched text-[10px]">
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* "Better Candidates for Company" Spotlight */}
                <div className="border-t border-dark-700/80 pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      Top Matched Candidates from {uni.shortName}:
                    </span>
                    <span className="text-[10px] text-brand-green font-semibold">
                      {uni.candidates.length} Recommended
                    </span>
                  </div>

                  <div className="space-y-2">
                    {uni.candidates.map(cand => {
                      const isInvited = invitedCandidateIds.includes(cand.id);

                      return (
                        <div 
                          key={cand.id}
                          className="bg-dark-850 border border-dark-700 hover:border-dark-600 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <img 
                              src={cand.avatar} 
                              alt={cand.name} 
                              className="w-9 h-9 rounded-full object-cover border border-brand-green/40"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white text-xs">{cand.name}</span>
                                <span className="bg-brand-green/10 text-brand-green text-[10px] font-bold px-1.5 py-0.5 rounded border border-brand-green/30">
                                  {cand.fitScore}% Fit
                                </span>
                                {cand.day1Ready && (
                                  <span className="bg-emerald-950/60 text-emerald-400 text-[9px] font-bold px-1 py-0.5 rounded">
                                    Day-1 Ready
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                                {cand.cgpa} CGPA • {cand.highlight}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                            <button
                              onClick={() => onSelectCandidate && onSelectCandidate(cand)}
                              className="btn-outline-green text-[10px] py-1 px-2.5 flex items-center gap-1"
                            >
                              <Eye className="w-3 h-3" />
                              View Profile
                            </button>

                            <button
                              onClick={(e) => handleSendInterviewInvite(cand, e)}
                              disabled={isInvited}
                              className={`text-[10px] font-semibold py-1 px-2.5 rounded-lg flex items-center gap-1 transition-all ${
                                isInvited
                                  ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 cursor-default'
                                  : 'bg-brand-green hover:bg-brand-darkgreen text-dark-900 shadow-sm'
                              }`}
                            >
                              {isInvited ? (
                                <>
                                  <CheckCircle2 className="w-3 h-3" /> Invited
                                </>
                              ) : (
                                <>
                                  <Send className="w-3 h-3" /> Invite
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Bottom Card Actions */}
              <div className="pt-4 mt-4 border-t border-dark-700/70 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedUniversityModal(uni)}
                  className="text-xs text-brand-green hover:text-white font-semibold flex items-center gap-1.5 transition-colors"
                >
                  Inspect Campus Talent Pipeline <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={(e) => handleScheduleDrive(uni.id, e)}
                  disabled={isDriveScheduled}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                    isDriveScheduled
                      ? 'bg-dark-700 text-slate-400 border border-dark-600 cursor-default'
                      : 'btn-secondary text-xs'
                  }`}
                >
                  {isDriveScheduled ? '✓ Campus Drive Requested' : 'Schedule Campus Hiring'}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {filteredUniversities.length === 0 && (
        <div className="card-hr p-12 text-center text-slate-400 space-y-3">
          <GraduationCap className="w-10 h-10 mx-auto text-slate-500" />
          <h3 className="text-base font-bold text-white">No Universities Match Your Filters</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search keyword, lowering the minimum employability rate threshold, or selecting "All Tiers".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTier('all');
              setMinRateFilter(0);
              setSelectedDomain('all');
            }}
            className="btn-primary text-xs mx-auto mt-2"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* University Drill-Down Modal */}
      {selectedUniversityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-dark-800 border border-dark-600 w-full max-w-3xl rounded-2xl p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button 
              onClick={() => setSelectedUniversityModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-dark-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4 pb-4 border-b border-dark-700">
              <div className="w-14 h-14 rounded-xl bg-dark-750 border border-brand-green/40 flex items-center justify-center text-brand-green">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[11px] font-sans tracking-wide text-brand-cyan uppercase font-bold">
                  {selectedUniversityModal.tier} • {selectedUniversityModal.accreditation}
                </span>
                <h3 className="text-2xl font-bold text-white mt-0.5">{selectedUniversityModal.name}</h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {selectedUniversityModal.location} • {selectedUniversityModal.totalGraduates} Annual Tech Graduates
                </p>
              </div>
            </div>

            {/* In-Depth Analytics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
              <div className="bg-dark-850 border border-dark-700 p-3 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 uppercase block font-semibold">Employability Rate</span>
                <span className="text-2xl font-bold font-sans text-brand-green">{selectedUniversityModal.employabilityRate}%</span>
              </div>
              <div className="bg-dark-850 border border-dark-700 p-3 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 uppercase block font-semibold">Median Placement</span>
                <span className="text-2xl font-bold font-sans text-white">{selectedUniversityModal.medianPackage}</span>
              </div>
              <div className="bg-dark-850 border border-dark-700 p-3 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 uppercase block font-semibold">Interview Clearance</span>
                <span className="text-2xl font-bold font-sans text-emerald-400">{selectedUniversityModal.hiringSuccessRate}%</span>
              </div>
              <div className="bg-dark-850 border border-dark-700 p-3 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 uppercase block font-semibold">Day-1 Candidates</span>
                <span className="text-2xl font-bold font-sans text-brand-cyan">{selectedUniversityModal.activeCandidatesCount}</span>
              </div>
            </div>

            {/* Top Recruiters Already Hiring Here */}
            <div className="mb-5">
              <p className="text-xs font-bold text-slate-300 uppercase mb-2">Top Day-1 Recruiters at {selectedUniversityModal.shortName}:</p>
              <div className="flex flex-wrap gap-2">
                {selectedUniversityModal.topRecruiters.map(rec => (
                  <span key={rec} className="px-3 py-1 rounded-lg bg-dark-850 border border-dark-700 text-xs font-semibold text-white">
                    🏢 {rec}
                  </span>
                ))}
              </div>
            </div>

            {/* Candidate Roster from this University */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-white text-sm">
                  Available Pre-Screened Candidates ({selectedUniversityModal.candidates.length})
                </h4>
                <span className="text-xs text-slate-400">Directly matched to your company criteria</span>
              </div>

              <div className="space-y-3">
                {selectedUniversityModal.candidates.map(cand => {
                  const isInvited = invitedCandidateIds.includes(cand.id);

                  return (
                    <div 
                      key={cand.id}
                      className="bg-dark-850 border border-dark-700 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={cand.avatar} 
                          alt={cand.name} 
                          className="w-12 h-12 rounded-full object-cover border border-brand-green"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{cand.name}</span>
                            <span className="bg-brand-green/10 text-brand-green text-xs font-bold px-2 py-0.5 rounded border border-brand-green/30">
                              {cand.fitScore}% Fit
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 mt-0.5">{cand.headline}</p>
                          <p className="text-[11px] text-slate-400 mt-1 font-mono">{cand.email} • {cand.cgpa} CGPA</p>
                          
                          <div className="flex flex-wrap gap-1 mt-2">
                            {cand.matchedSkills.map(s => (
                              <span key={s} className="badge-matched text-[9px]">✓ {s}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => {
                            setSelectedUniversityModal(null);
                            if (onSelectCandidate) onSelectCandidate(cand);
                          }}
                          className="btn-outline-green text-xs py-1.5 px-3 flex-1 sm:flex-none justify-center"
                        >
                          Deep Dive
                        </button>
                        <button
                          onClick={(e) => handleSendInterviewInvite(cand, e)}
                          disabled={isInvited}
                          className={`text-xs font-bold py-1.5 px-3 rounded-lg flex-1 sm:flex-none flex items-center justify-center gap-1.5 ${
                            isInvited
                              ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 cursor-default'
                              : 'btn-primary'
                          }`}
                        >
                          {isInvited ? '✓ Invited' : 'Send Invite'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-dark-700 flex justify-end gap-3">
              <button
                onClick={() => setSelectedUniversityModal(null)}
                className="btn-secondary text-xs"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
