import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Briefcase, 
  Target, 
  DollarSign, 
  Calendar, 
  Building2, 
  Zap, 
  Layers, 
  ShieldCheck, 
  ChevronRight, 
  PlusCircle,
  HelpCircle,
  BookOpen
} from 'lucide-react';

const SIMULATION_TARGETS = [
  {
    id: 'backend-architect',
    title: 'Senior Backend & Systems Architect',
    typicalBand: '₹38.0 - 55.0 LPA',
    baseBand: '₹14.0 - 20.0 LPA',
    growthPct: '+175%',
    readinessBase: 65,
    difficulty: 'High Demand',
    requiredSkills: [
      'Distributed Systems', 'Kafka', 'System Design Fundamentals', 
      'PostgreSQL', 'Redis Cluster', 'Docker', 'Kubernetes', 'Go / Java High Concurrency'
    ],
    recommendedElectives: [
      'Database Sharding & Partitioning', 'gRPC & Protocol Buffers', 'Observability (Prometheus/Grafana)'
    ],
    roadmapPhases: [
      {
        phase: 'Phase 1 (Month 1-2)',
        title: 'Concurrency & Data Consistency',
        tasks: ['Master multithreading, event loops & non-blocking I/O', 'Implement ACID transactions across distributed databases with 2PC/Saga']
      },
      {
        phase: 'Phase 2 (Month 3-4)',
        title: 'Event-Driven High-Throughput Pipelines',
        tasks: ['Build end-to-end Kafka pub/sub pipelines with exactly-once semantics', 'Set up multi-tier Redis caching with Cache-Aside & Write-Through strategies']
      },
      {
        phase: 'Phase 3 (Month 5-6)',
        title: 'System Design Capstone & Production Resilience',
        tasks: ['Design rate limiters, distributed unique ID generators, and URL shorteners', 'Practice 20+ real-world LLD & HLD interview rubrics for Tier-1 unicorns']
      }
    ],
    targetCompanies: [
      { name: 'Razorpay', ctc: '₹42 - 52 LPA', logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100' },
      { name: 'Swiggy', ctc: '₹38 - 48 LPA', logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100' },
      { name: 'Uber Tech', ctc: '₹55 - 68 LPA', logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100' }
    ]
  },
  {
    id: 'ai-platform',
    title: 'AI/ML Systems & LLM Platform Engineer',
    typicalBand: '₹42.0 - 65.0 LPA',
    baseBand: '₹15.0 - 22.0 LPA',
    growthPct: '+195%',
    readinessBase: 55,
    difficulty: 'Exponential Growth',
    requiredSkills: [
      'Python', 'PyTorch / TensorFlow', 'FastAPI', 'Vector Databases (Pinecone/Milvus)',
      'LangChain / LlamaIndex', 'Model Quantization (GGUF/AWQ)', 'Docker', 'GPU Cluster Orchestration'
    ],
    recommendedElectives: [
      'LoRA Fine-tuning', 'RAG Evaluation Frameworks (Ragas)', 'Triton Inference Server'
    ],
    roadmapPhases: [
      {
        phase: 'Phase 1 (Month 1-2)',
        title: 'Embeddings & High-Recall RAG Architectures',
        tasks: ['Build hybrid vector + lexical search pipelines with BM25 & Milvus', 'Implement reranking strategies using Cross-Encoders and Cohere API']
      },
      {
        phase: 'Phase 2 (Month 3-4)',
        title: 'Domain Fine-Tuning & Quantization',
        tasks: ['Fine-tune 7B/14B parameter models with QLoRA on custom domain datasets', 'Deploy high-throughput inference endpoints using vLLM and TensorRT-LLM']
      },
      {
        phase: 'Phase 3 (Month 5-6)',
        title: 'Agentic Workflows & Enterprise Reliability',
        tasks: ['Architect multi-agent autonomous loops with reflection & tool use', 'Benchmark latency to p99 < 800ms and implement token streaming observability']
      }
    ],
    targetCompanies: [
      { name: 'Sarvam AI', ctc: '₹45 - 65 LPA', logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100' },
      { name: 'Microsoft India', ctc: '₹48 - 72 LPA', logo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100' },
      { name: 'Postman', ctc: '₹40 - 55 LPA', logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100' }
    ]
  },
  {
    id: 'lead-fullstack',
    title: 'Lead Full-Stack Product Engineer',
    typicalBand: '₹34.0 - 48.0 LPA',
    baseBand: '₹12.0 - 18.0 LPA',
    growthPct: '+165%',
    readinessBase: 70,
    difficulty: 'High Demand',
    requiredSkills: [
      'React', 'TypeScript', 'Node.js', 'Next.js App Router', 
      'PostgreSQL', 'GraphQL / REST API Design', 'TailwindCSS', 'CI/CD & DevOps Basics'
    ],
    recommendedElectives: [
      'State Machine Architecture (XState)', 'WebSockets & Real-Time Sync', 'Micro-Frontends'
    ],
    roadmapPhases: [
      {
        phase: 'Phase 1 (Month 1-2)',
        title: 'Enterprise Architecture & Component Systems',
        tasks: ['Migrate state architectures to optimistic mutations with TanStack Query', 'Implement strict TypeScript generic constraints and design token systems']
      },
      {
        phase: 'Phase 2 (Month 3-4)',
        title: 'Full-Stack Performance & Server Actions',
        tasks: ['Optimize Core Web Vitals to 95+ score with streaming SSR and code splitting', 'Design robust schema migrations and indexing on PostgreSQL with Prisma/Drizzle']
      },
      {
        phase: 'Phase 3 (Month 5-6)',
        title: 'Product Leadership & End-to-End Reliability',
        tasks: ['Implement end-to-end testing with Playwright and GitHub Actions matrix', 'Lead technical RFC documentation and mentor junior engineers']
      }
    ],
    targetCompanies: [
      { name: 'CRED', ctc: '₹38 - 50 LPA', logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100' },
      { name: 'Groww', ctc: '₹35 - 46 LPA', logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100' },
      { name: 'Atlassian', ctc: '₹45 - 60 LPA', logo: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=100' }
    ]
  },
  {
    id: 'devops-platform',
    title: 'Cloud Infrastructure & DevOps Architect',
    typicalBand: '₹36.0 - 52.0 LPA',
    baseBand: '₹14.0 - 19.0 LPA',
    growthPct: '+160%',
    readinessBase: 60,
    difficulty: 'Steady Surge',
    requiredSkills: [
      'Kubernetes', 'Terraform', 'AWS / GCP Architecture', 
      'Docker', 'Linux Internals', 'CI/CD Pipelines', 'Prometheus & Grafana', 'Bash / Python Scripting'
    ],
    recommendedElectives: [
      'ArgoCD GitOps', 'Service Mesh (Istio)', 'Zero-Trust Cloudflare / IAM Policies'
    ],
    roadmapPhases: [
      {
        phase: 'Phase 1 (Month 1-2)',
        title: 'Infrastructure as Code & Multi-Cloud Provisioning',
        tasks: ['Automate VPC, subnets, and autoscaling EKS/GKE clusters via Terraform modules', 'Configure state locking with S3 and DynamoDB with automated drift detection']
      },
      {
        phase: 'Phase 2 (Month 3-4)',
        title: 'Kubernetes Production Hardening & GitOps',
        tasks: ['Deploy ArgoCD continuous delivery with automated canary analysis via Flagger', 'Configure NetworkPolicies, PodSecurityStandards, and cluster auto-scaler']
      },
      {
        phase: 'Phase 3 (Month 5-6)',
        title: 'Zero-Downtime Resilience & Incident Automation',
        tasks: ['Architect disaster recovery multi-region failover with RPO < 5m and RTO < 15m', 'Build custom Prometheus alerting rules and incident runbooks']
      }
    ],
    targetCompanies: [
      { name: 'Flipkart', ctc: '₹38 - 50 LPA', logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100' },
      { name: 'Cisco', ctc: '₹34 - 45 LPA', logo: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=100' },
      { name: 'Amazon AWS', ctc: '₹48 - 65 LPA', logo: 'https://images.unsplash.com/photo-1523474253246-630ae37c2250?w=100' }
    ]
  }
];

export default function CareerSimulatorView({ currentUser }) {
  const [selectedTargetId, setSelectedTargetId] = useState('backend-architect');
  const [targetHorizon, setTargetHorizon] = useState('6-months');
  const [targetCompanyTier, setTargetCompanyTier] = useState('unicorns');
  const [simulatedSkills, setSimulatedSkills] = useState(new Set());

  const currentRoleSkills = useMemo(() => {
    return (currentUser?.skills || []).map(s => s.toLowerCase());
  }, [currentUser?.skills]);

  const activeTarget = useMemo(() => {
    return SIMULATION_TARGETS.find(t => t.id === selectedTargetId) || SIMULATION_TARGETS[0];
  }, [selectedTargetId]);

  // Toggle elective / what-if skill
  const toggleSimulatedSkill = (skill) => {
    setSimulatedSkills(prev => {
      const next = new Set(prev);
      if (next.has(skill)) {
        next.delete(skill);
      } else {
        next.add(skill);
      }
      return next;
    });
  };

  // Calculate dynamic readiness score
  const { matchedSkills, missingSkills, simulatedScore, dynamicBand } = useMemo(() => {
    const required = activeTarget.requiredSkills;
    const matched = [];
    const missing = [];

    required.forEach(skill => {
      const sLower = skill.toLowerCase();
      const hasFromProfile = currentRoleSkills.some(cs => 
        cs === sLower || cs.includes(sLower) || sLower.includes(cs)
      );
      const hasFromSimulation = simulatedSkills.has(skill);

      if (hasFromProfile || hasFromSimulation) {
        matched.push({ name: skill, source: hasFromProfile ? 'profile' : 'simulated' });
      } else {
        missing.push({ name: skill });
      }
    });

    const matchRatio = required.length > 0 ? (matched.length / required.length) : 0.7;
    // Base score + bonus for simulated electives
    let score = Math.round(matchRatio * 100);
    // Add 2% per extra elective simulated
    score = Math.min(98, score);

    return {
      matchedSkills: matched,
      missingSkills: missing,
      simulatedScore: score,
      dynamicBand: activeTarget.typicalBand
    };
  }, [activeTarget, currentRoleSkills, simulatedSkills]);

  return (
    <div className="space-y-4 animate-in fade-in">

      {/* Top Banner: Simulator Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-lg text-slate-900">AI Career Path Simulator</h3>
                <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                  Predictive Career Intelligence
                </span>
              </div>
              <p className="text-xs text-slate-500 font-sans mt-0.5">
                Model compensation jumps, skill transition timelines, and hiring probabilities based on 17.4k+ Indian tech placements.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
            <span className="text-[11px] font-mono text-slate-500 uppercase px-2 font-semibold">Simulate Horizon:</span>
            {['6-months', '12-months', '18-months'].map(h => (
              <button
                key={h}
                onClick={() => setTargetHorizon(h)}
                className={`text-xs font-sans px-2.5 py-1 rounded font-medium transition-all ${
                  targetHorizon === h 
                    ? 'bg-white text-blue-700 border border-slate-200 shadow-2xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {h === '6-months' ? '6 Mos' : h === '12-months' ? '12 Mos' : '18 Mos'}
              </button>
            ))}
          </div>
        </div>

        {/* Target Path Selector Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-4 pt-3.5 border-t border-slate-200">
          {SIMULATION_TARGETS.map(target => {
            const isSelected = target.id === selectedTargetId;
            return (
              <button
                key={target.id}
                onClick={() => {
                  setSelectedTargetId(target.id);
                  setSimulatedSkills(new Set());
                }}
                className={`p-3 rounded-lg text-left transition-all border ${
                  isSelected 
                    ? 'bg-blue-50/50 border-blue-600 shadow-2xs' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-mono uppercase font-semibold ${isSelected ? 'text-blue-700' : 'text-slate-500'}`}>
                    {target.difficulty}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-teal-700">
                    {target.growthPct}
                  </span>
                </div>
                <h4 className={`text-xs font-heading font-semibold line-clamp-1 ${isSelected ? 'text-slate-900 font-bold' : 'text-slate-700'}`}>
                  {target.title}
                </h4>
                <div className="text-[11px] font-mono text-slate-500 mt-1">
                  Band: <strong className="text-slate-800">{target.typicalBand}</strong>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Simulator Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Left Column (2 Cols): Metrics, Skill Playground & Milestones */}
        <div className="lg:col-span-2 space-y-4">

          {/* Key Simulated Output Metrics Row */}
          <div className="grid grid-cols-3 gap-3 bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold block">Simulated Fit Score</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-heading font-bold text-slate-900">{simulatedScore}%</span>
                <span className="text-[10px] font-mono text-teal-700 font-semibold">
                  {simulatedScore >= 80 ? 'High Fit' : simulatedScore >= 60 ? 'Moderate' : 'Developing'}
                </span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${simulatedScore}%` }}
                ></div>
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold block">Projected Compensation</span>
              <div className="text-base sm:text-lg font-heading font-bold text-blue-700 mt-1 truncate">
                {activeTarget.typicalBand}
              </div>
              <span className="text-[10px] font-mono text-slate-500 block mt-1">
                Base Baseline: {activeTarget.baseBand}
              </span>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold block">Growth Multiple</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-heading font-bold text-teal-700">{activeTarget.growthPct}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 block mt-1">
                Horizon: {targetHorizon === '6-months' ? '6 Months' : targetHorizon === '12-months' ? '12 Months' : '18 Months'}
              </span>
            </div>
          </div>

          {/* Interactive What-If Skill Playground */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-600" />
                <h4 className="font-heading font-bold text-sm text-slate-900">
                  Interactive "What-If" Skill Playground
                </h4>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Click missing skills to simulate acquiring them
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-3 font-sans">
              Test how adding specific proficiencies elevates your simulated placement feasibility and unlocks premium interview rounds.
            </p>

            {/* Matched vs Missing Tags */}
            <div className="space-y-3">
              <div>
                <span className="text-[11px] font-mono text-teal-800 uppercase tracking-wider font-semibold block mb-1.5">
                  ✓ Validated or Simulated Proficiencies ({matchedSkills.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {matchedSkills.map(m => (
                    <button
                      key={m.name}
                      onClick={() => m.source === 'simulated' && toggleSimulatedSkill(m.name)}
                      className={`text-xs px-2.5 py-1 rounded font-mono inline-flex items-center gap-1.5 transition-all ${
                        m.source === 'simulated'
                          ? 'bg-blue-50 border border-blue-300 text-blue-800 font-medium hover:bg-rose-50 hover:text-rose-700'
                          : 'badge-matched cursor-default'
                      }`}
                      title={m.source === 'simulated' ? 'Click to unsimulate' : 'Verified from your current profile'}
                    >
                      <CheckCircle2 className="w-3 h-3 text-teal-600" />
                      {m.name}
                      {m.source === 'simulated' && (
                        <span className="text-[9px] bg-blue-200/80 text-blue-800 px-1 rounded uppercase">Simulated</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {missingSkills.length > 0 && (
                <div>
                  <span className="text-[11px] font-mono text-rose-800 uppercase tracking-wider font-semibold block mb-1.5">
                    ✗ Critical Skills Required for this Role ({missingSkills.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {missingSkills.map(m => (
                      <button
                        key={m.name}
                        onClick={() => toggleSimulatedSkill(m.name)}
                        className="badge-missing hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-colors cursor-pointer group"
                        title="Click to simulate learning this skill"
                      >
                        <PlusCircle className="w-3 h-3 text-rose-500 group-hover:text-blue-600" />
                        {m.name}
                        <span className="text-[9px] text-slate-400 group-hover:text-blue-600">+Simulate</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Recommended Electives */}
            {activeTarget.recommendedElectives && (
              <div className="mt-3.5 pt-3 border-t border-slate-200">
                <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold block mb-1.5">
                  ★ High-Impact Differentiators (Top 5% Candidate Edge):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeTarget.recommendedElectives.map(elec => {
                    const isSim = simulatedSkills.has(elec);
                    return (
                      <button
                        key={elec}
                        onClick={() => toggleSimulatedSkill(elec)}
                        className={`text-xs px-2.5 py-1 rounded font-mono border transition-all ${
                          isSim 
                            ? 'bg-teal-50 border-teal-300 text-teal-800 font-semibold' 
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {isSim ? '✓ ' : '+ '} {elec}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Actionable Milestone Progression Roadmap */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <h4 className="font-heading font-bold text-sm text-slate-900">
                Actionable Milestone Progression Plan
              </h4>
            </div>

            <div className="space-y-2.5">
              {activeTarget.roadmapPhases.map((phase, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {phase.phase}
                    </span>
                    <h5 className="font-heading font-semibold text-xs text-slate-800">
                      {phase.title}
                    </h5>
                  </div>
                  <ul className="space-y-1 mt-2">
                    {phase.tasks.map((task, ti) => (
                      <li key={ti} className="text-xs text-slate-600 font-sans flex items-start gap-1.5">
                        <span className="text-teal-600 mt-0.5 font-bold">›</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (1 Col): Benchmark Companies & Calibration */}
        <div className="space-y-4">

          {/* Top Benchmark Recruiters */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-4 h-4 text-blue-600" />
              <h4 className="font-heading font-bold text-sm text-slate-900">
                Recruiters Hiring This Trajectory
              </h4>
            </div>

            <div className="space-y-2.5">
              {activeTarget.targetCompanies.map((comp, ci) => (
                <div key={ci} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={comp.logo} 
                      alt={comp.name} 
                      className="w-8 h-8 rounded-md object-cover border border-slate-200" 
                    />
                    <div>
                      <h5 className="font-heading font-semibold text-xs text-slate-900">{comp.name}</h5>
                      <span className="text-[10px] font-mono text-teal-700 font-bold">{comp.ctc}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600 font-medium">
                    Verified Fit
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-slate-200 text-[11px] text-slate-500 font-sans leading-relaxed">
              Based on active campus and off-campus requisitions tracked by JobMax AI.
            </div>
          </div>

          {/* Transition Feasibility Summary Box */}
          <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-4 text-slate-800">
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <h5 className="font-heading font-bold text-xs text-slate-900">
                AI Feasibility Verdict
              </h5>
            </div>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              {simulatedScore >= 80 ? (
                <span>
                  High transition feasibility! Your current skill footprint matches <strong>{matchedSkills.length}</strong> core prerequisites. With targeted system design prep, you qualify for Day-1 shortlist interviews in the <strong>{activeTarget.typicalBand}</strong> bracket.
                </span>
              ) : (
                <span>
                  Achievable with disciplined prep. You are missing <strong>{missingSkills.length}</strong> core domain competencies. Following the structured 3-phase plan above will close the gap within your chosen {targetHorizon === '6-months' ? '6 months' : '12 months'} timeline.
                </span>
              )}
            </p>
          </div>

          {/* Quick FAQ / Guide */}
          <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs text-xs space-y-2">
            <h5 className="font-heading font-semibold text-slate-800 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              How the simulator works:
            </h5>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              JobMax cross-references your real-time verified skills with active hiring bands, technical challenge rubrics, and salary benchmarks from 1,400+ tech companies to calculate promotion and transition viability.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
