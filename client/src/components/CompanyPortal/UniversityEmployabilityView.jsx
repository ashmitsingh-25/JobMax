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
        matchedSkills: ['Data Structures & Algorithms', 'C++', 'PostgreSQL', 'Docker'],
        missingSkills: ['Distributed Systems'],
        highlight: 'Core maintainer of an Apache Kafka connector library',
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
    employabilityRate: 95.8,
    hiringSuccessRate: 96.5,
    medianPackage: '₹34.5 LPA',
    totalGraduates: 920,
    activeCandidatesCount: 118,
    topDomains: ['Fullstack Web', 'Cloud Infrastructure', 'Fintech Systems', 'Machine Learning'],
    verifiedSkills: ['React', 'Node.js', 'TypeScript', 'Kubernetes', 'AWS', 'Redis'],
    topRecruiters: ['Amazon', 'D.E. Shaw', 'CRED', 'Flipkart', 'Salesforce'],
    accreditation: 'NAAC A++ · Institution of Eminence',
    candidates: [
      {
        id: 'bits-cand-1',
        name: 'Ananya Singh',
        headline: 'Full-Stack Product Engineer · 2x Internship Veteran',
        email: 'ananya.s@bits-pilani.ac.in',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        college: 'BITS Pilani',
        collegeTier: 'Tier 1',
        cgpa: 9.1,
        fitScore: 94,
        matchedCount: 5,
        missingCount: 0,
        matchedSkills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Redis'],
        missingSkills: [],
        highlight: 'Built real-time auction engine processing 10k req/s at previous internship',
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
    employabilityRate: 98.1,
    hiringSuccessRate: 99.0,
    medianPackage: '₹42.0 LPA',
    totalGraduates: 420,
    activeCandidatesCount: 96,
    topDomains: ['Computer Vision', 'Natural Language Processing', 'Advanced Algorithms', 'Robotics'],
    verifiedSkills: ['Python', 'PyTorch', 'C++', 'Vector Databases', 'CUDA', 'FastAPI'],
    topRecruiters: ['Meta', 'Apple', 'Google Research', 'Adobe', 'NVIDIA'],
    accreditation: 'Premier Research Institute in AI & ML',
    candidates: [
      {
        id: 'iiith-cand-1',
        name: 'Kavya Raman',
        headline: 'AI & LLM Research Engineer · CVPR 2025 Paper Author',
        email: 'kavya.r@research.iiit.ac.in',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
        college: 'IIIT Hyderabad',
        collegeTier: 'Tier 1',
        cgpa: 9.4,
        fitScore: 97,
        matchedCount: 5,
        missingCount: 0,
        matchedSkills: ['Python', 'PyTorch', 'Vector Databases', 'FastAPI', 'C++'],
        missingSkills: [],
        highlight: 'Created open-source quantized embedding model with 1.2M downloads',
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
    hiringSuccessRate: 94.2,
    medianPackage: '₹28.0 LPA',
    totalGraduates: 780,
    activeCandidatesCount: 88,
    topDomains: ['Backend Systems', 'Embedded Tech', 'Data Engineering', 'DevOps'],
    verifiedSkills: ['Java', 'Spring Boot', 'SQL', 'Kafka', 'Microservices', 'Linux'],
    topRecruiters: ['Morgan Stanley', 'Oracle', 'Qualcomm', 'Texas Instruments'],
    accreditation: 'NIRF Rank #1 among all NITs',
    candidates: [
      {
        id: 'nitt-cand-1',
        name: 'Rohan Mehta',
        headline: 'Java & High-Throughput Microservices Specialist',
        email: 'rohan.m@nitt.edu',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        college: 'NIT Trichy',
        collegeTier: 'Tier 1',
        cgpa: 8.7,
        fitScore: 90,
        matchedCount: 4,
        missingCount: 1,
        matchedSkills: ['Java', 'Spring Boot', 'SQL', 'Microservices'],
        missingSkills: ['Kafka'],
        highlight: 'Ranked top 1% in Inter-NIT Competitive Coding Championship',
        day1Ready: true
      }
    ]
  },
  {
    id: 'dtu-delhi',
    name: 'Delhi Technological University (DTU)',
    shortName: 'DTU',
    location: 'Delhi, NCR',
    tier: 'Tier 1.5',
    employabilityRate: 89.5,
    hiringSuccessRate: 91.0,
    medianPackage: '₹24.0 LPA',
    totalGraduates: 1100,
    activeCandidatesCount: 104,
    topDomains: ['Fullstack Web', 'Cloud Infrastructure', 'Fintech', 'Data Analytics'],
    verifiedSkills: ['JavaScript', 'Python', 'React', 'MongoDB', 'AWS', 'Docker'],
    topRecruiters: ['Paytm', 'Zomato', 'Microsoft', 'Adobe', 'American Express'],
    accreditation: 'A++ NAAC · Top Technical State University',
    candidates: [
      {
        id: 'dtu-cand-1',
        name: 'Tanvi Saxena',
        headline: 'Cloud & DevOps Enthusiast · Certified AWS Solutions Architect',
        email: 'tanvi.s@dtu.ac.in',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
        college: 'DTU',
        collegeTier: 'Tier 1.5',
        cgpa: 8.6,
        fitScore: 88,
        matchedCount: 4,
        missingCount: 1,
        matchedSkills: ['JavaScript', 'React', 'AWS', 'Docker'],
        missingSkills: ['MongoDB'],
        highlight: 'Maintains automated CI/CD infrastructure for DTU Technical Society',
        day1Ready: true
      }
    ]
  },
  {
    id: 'vit-vellore',
    name: 'Vellore Institute of Technology (VIT) Vellore',
    shortName: 'VIT Vellore',
    location: 'Vellore, Tamil Nadu',
    tier: 'Tier 2',
    employabilityRate: 86.2,
    hiringSuccessRate: 88.5,
    medianPackage: '₹18.5 LPA',
    totalGraduates: 2200,
    activeCandidatesCount: 156,
    topDomains: ['Web Development', 'Mobile Apps (Flutter/React Native)', 'Quality Assurance', 'Cybersecurity'],
    verifiedSkills: ['React', 'Python', 'MySQL', 'Flutter', 'Git', 'Linux'],
    topRecruiters: ['Cognizant', 'TCS Digital', 'Wipro Turbo', 'Optum', 'Schneider Electric'],
    accreditation: 'NIRF Rank #11 · Top Private University',
    candidates: [
      {
        id: 'vit-cand-1',
        name: 'Arjun Nambiar',
        headline: 'Mobile & Frontend Developer · 4 Production Play Store Apps',
        email: 'arjun.n@vitstudent.ac.in',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
        college: 'VIT Vellore',
        collegeTier: 'Tier 2',
        cgpa: 8.8,
        fitScore: 85,
        matchedCount: 4,
        missingCount: 1,
        matchedSkills: ['React', 'Python', 'Flutter', 'Git'],
        missingSkills: ['MySQL'],
        highlight: 'Built college shuttle tracker app with 15,000 active student users',
        day1Ready: false
      }
    ]
  }
];

export default function UniversityEmployabilityView({ currentUser, onInspectCandidate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState('all');
  const [minRateFilter, setMinRateFilter] = useState(0);
  const [sortBy, setSortBy] = useState('rate-desc');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [expandedUniversityId, setExpandedUniversityId] = useState(null);
  const [invitedCandidateIds, setInvitedCandidateIds] = useState([]);
  const [batchDriveScheduled, setBatchDriveScheduled] = useState([]);

  // Filtered dataset
  const filteredUniversities = UNIVERSITIES_DATA.filter((uni) => {
    if (selectedTier !== 'all' && uni.tier !== selectedTier) return false;
    if (uni.employabilityRate < minRateFilter) return false;
    if (selectedDomain !== 'all' && !uni.topDomains.some(d => d.toLowerCase().includes(selectedDomain.toLowerCase()))) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = uni.name.toLowerCase().includes(q) || uni.shortName.toLowerCase().includes(q);
      const matchLocation = uni.location.toLowerCase().includes(q);
      const matchSkills = uni.verifiedSkills.some(s => s.toLowerCase().includes(q));
      if (!matchName && !matchLocation && !matchSkills) return false;
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
    <div className="space-y-4 animate-in fade-in">
      
      {/* Overview Banner */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-800 border border-teal-200 text-[11px] px-2.5 py-0.5 rounded font-mono font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              Campus Talent Intelligence & Employability Probability
            </div>
            <h2 className="text-xl font-heading font-bold text-slate-900 tracking-tight">
              University Employability & Day-1 Talent Radar
            </h2>
            <p className="text-xs text-slate-600 max-w-2xl font-sans leading-relaxed">
              Target engineering campuses with proven employability rates, benchmarked technical skill bars, and direct access to pre-vetted campus candidates matched to your open roles.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 border border-slate-200 p-2.5 rounded-lg w-full lg:w-auto">
            <div className="text-center px-2">
              <p className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Avg Employability</p>
              <p className="text-xl font-heading font-bold text-teal-700">{avgEmployabilityRate}%</p>
            </div>
            <div className="text-center px-2 border-l border-slate-200">
              <p className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Top Campus</p>
              <p className="text-sm font-heading font-bold text-slate-900 truncate max-w-[90px]">{topUni.shortName}</p>
            </div>
            <div className="text-center px-2 border-l border-slate-200">
              <p className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Vetted Talent</p>
              <p className="text-xl font-heading font-bold text-blue-700">{totalCampusCandidates}+</p>
            </div>
            <div className="text-center px-2 border-l border-slate-200">
              <p className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Campuses</p>
              <p className="text-xl font-heading font-bold text-slate-900">{totalUniversitiesCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls & Filters Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-3 shadow-xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
          
          {/* Search Bar */}
          <div className="relative flex-grow">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search university name, city, or tech skills (e.g., IIT Delhi, Bengaluru, Go)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2 text-slate-400 hover:text-slate-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Tier Filter */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1">
              <Filter className="w-3 h-3 text-slate-500" />
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="bg-transparent text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="all">All Tiers</option>
                <option value="Tier 1">Tier 1 Campuses</option>
                <option value="Tier 1.5">Tier 1.5 Campuses</option>
                <option value="Tier 2">Tier 2 Campuses</option>
              </select>
            </div>

            {/* Employability Threshold Filter */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1">
              <TrendingUp className="w-3 h-3 text-teal-600" />
              <select
                value={minRateFilter}
                onChange={(e) => setMinRateFilter(Number(e.target.value))}
                className="bg-transparent text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value={0}>All Rates</option>
                <option value={85}>&gt; 85% Employability</option>
                <option value={90}>&gt; 90% Employability</option>
                <option value={95}>&gt; 95% Top Tier</option>
              </select>
            </div>

            {/* Sort Order */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1">
              <SlidersHorizontal className="w-3 h-3 text-slate-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="rate-desc">Sort: Highest Employability</option>
                <option value="package-desc">Sort: Highest Median Package</option>
                <option value="candidates-desc">Sort: Most Vetted Candidates</option>
              </select>
            </div>

          </div>
        </div>

        {/* Quick Domain Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200 text-xs">
          <span className="text-slate-500 font-medium">Domain:</span>
          {[
            { id: 'all', label: 'All Specializations' },
            { id: 'Distributed Systems', label: 'Distributed Systems' },
            { id: 'AI & Machine Learning', label: 'AI & ML' },
            { id: 'Fullstack', label: 'Fullstack Web' },
            { id: 'Cloud', label: 'Cloud' }
          ].map(d => (
            <button
              key={d.id}
              onClick={() => setSelectedDomain(d.id)}
              className={`px-2 py-0.5 rounded text-xs transition-colors ${
                selectedDomain === d.id
                  ? 'bg-blue-600 text-white font-medium shadow-2xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {d.label}
            </button>
          ))}
          <span className="text-slate-500 ml-auto font-mono text-[11px]">
            Showing <strong className="text-slate-900">{filteredUniversities.length}</strong> of {UNIVERSITIES_DATA.length} campuses
          </span>
        </div>
      </div>

      {/* Universities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredUniversities.map((uni) => {
          const isDriveScheduled = batchDriveScheduled.includes(uni.id);

          return (
            <div 
              key={uni.id}
              className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs hover:border-blue-400 transition-all duration-200 flex flex-col justify-between group"
            >
              {/* Top Card Section */}
              <div className="space-y-3">
                
                {/* University Header & Employability Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-base text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {uni.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {uni.location}
                        </span>
                        <span>•</span>
                        <span className="px-1.5 py-0.2 rounded bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-mono font-medium">
                          {uni.tier}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Employability Probability Gauge */}
                  <div className="text-right shrink-0 bg-teal-50 border border-teal-200 rounded-lg px-2.5 py-1.5">
                    <div className="flex items-center justify-end gap-1 text-teal-700 font-heading font-bold text-lg">
                      <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
                      {uni.employabilityRate}%
                    </div>
                    <p className="text-[9px] font-mono text-teal-800 uppercase font-semibold">
                      Employability
                    </p>
                  </div>
                </div>

                {/* Progress bar visual for employability rate */}
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-teal-600 rounded-full transition-all duration-300"
                    style={{ width: `${uni.employabilityRate}%` }}
                  ></div>
                </div>

                {/* University Metrics Badges */}
                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase font-medium">Median CTC</span>
                    <strong className="text-slate-900 text-xs">{uni.medianPackage}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase font-medium">Placement Rate</span>
                    <strong className="text-teal-700 text-xs">{uni.hiringSuccessRate}%</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase font-medium">Active Talent</span>
                    <strong className="text-blue-700 text-xs">{uni.activeCandidatesCount} Candidates</strong>
                  </div>
                </div>

                {/* Verified Skills Cloud */}
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1 font-semibold">
                    Core Campus Skill Strengths:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {uni.verifiedSkills.map((sk) => (
                      <span key={sk} className="badge-matched text-[11px] py-0.5 px-2">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Top Recruiters */}
                <div className="text-xs text-slate-500 font-sans">
                  <span className="font-medium text-slate-700">Frequent Day-1 Recruiters:</span>{' '}
                  {uni.topRecruiters.join(', ')}
                </div>

              </div>

              {/* Bottom Card Actions & Candidate Preview Drawer */}
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setExpandedUniversityId(expandedUniversityId === uni.id ? null : uni.id)}
                  className="text-xs font-sans text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                >
                  <Users className="w-3.5 h-3.5" />
                  {expandedUniversityId === uni.id 
                    ? 'Hide Pre-Vetted Candidates' 
                    : `View ${uni.candidates.length} Matched Candidates`}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleScheduleDrive(uni.id, e)}
                    disabled={isDriveScheduled}
                    className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                      isDriveScheduled
                        ? 'bg-teal-50 text-teal-700 border border-teal-200'
                        : 'btn-secondary py-1'
                    }`}
                  >
                    {isDriveScheduled ? 'Drive Request Sent ✓' : 'Request Campus Drive'}
                  </button>
                </div>
              </div>

              {/* Expanded Candidates Drawer */}
              {expandedUniversityId === uni.id && (
                <div className="mt-3 pt-3 border-t border-slate-200 space-y-2.5 animate-in fade-in">
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold block">
                    Pre-Vetted Day-1 Campus Candidates:
                  </span>

                  {uni.candidates.map((cand) => {
                    const isInvited = invitedCandidateIds.includes(cand.id);

                    return (
                      <div 
                        key={cand.id}
                        className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5"
                      >
                        <div className="flex items-center gap-2.5">
                          <img 
                            src={cand.avatar} 
                            alt={cand.name}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200" 
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h5 className="font-heading font-semibold text-xs text-slate-900">{cand.name}</h5>
                              <span className="text-[10px] font-mono px-1.5 rounded bg-teal-50 text-teal-700 border border-teal-200 font-semibold">
                                {cand.fitScore}% Fit
                              </span>
                              {cand.day1Ready && (
                                <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-1 rounded border border-blue-200">
                                  Day-1 Ready
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500">{cand.headline}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {cand.matchedSkills.slice(0, 3).map(s => (
                                <span key={s} className="badge-matched text-[10px] py-0 px-1">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                          <button
                            type="button"
                            onClick={(e) => handleSendInterviewInvite(cand, e)}
                            disabled={isInvited}
                            className={`text-xs px-2.5 py-1 rounded font-medium transition-all ${
                              isInvited
                                ? 'bg-teal-50 text-teal-700 border border-teal-200'
                                : 'btn-primary py-1'
                            }`}
                          >
                            <Send className="w-3 h-3" />
                            {isInvited ? 'Invite Sent ✓' : 'Send Invite'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
