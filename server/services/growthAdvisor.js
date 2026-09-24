import { OFF_CAMPUS_JOB_POSTINGS } from "../data/jobPostings.js";
import { ALL_SKILLS_FLAT } from "../data/skillsTaxonomy.js";

/**
 * AI Bot #2: Career Growth & Promotion Advisor for Experienced Engineers
 */
export function analyzeCareerGrowth(devProfile) {
  const yearsExp = parseFloat(devProfile.yearsOfExperience) || 2.5;
  const currentSkills = new Set((devProfile.skills || []).map(s => s.toLowerCase().trim()));
  const currentCtc = devProfile.currentCtc || "₹18 LPA";
  const domain = devProfile.domain || "Backend & Distributed Systems";

  // Determine current tier & next career ladder step
  let currentLevel = "Mid-Level Software Engineer (SDE II)";
  let targetNextRole = "Senior Software Engineer / Tech Lead (SDE III)";
  let targetCompBand = "₹38.0 - 52.0 LPA";
  let targetUpliftPercent = "+75% to +120%";

  if (yearsExp >= 5) {
    currentLevel = "Senior Software Engineer (SDE III)";
    targetNextRole = "Staff Engineer / Platform Architect";
    targetCompBand = "₹65.0 - 95.0 LPA";
    targetUpliftPercent = "+50% to +90%";
  } else if (yearsExp < 2) {
    currentLevel = "Junior / Associate Software Engineer";
    targetNextRole = "Mid-Level Software Engineer (SDE II)";
    targetCompBand = "₹24.0 - 32.0 LPA";
    targetUpliftPercent = "+80% to +140%";
  }

  // Tier-unlocking high-leverage skill recommendations
  const highLeverageSkills = [
    {
      name: "Distributed Systems & Scalability",
      description: "CAP theorem trade-offs, consensus algorithms (Raft/Paxos), multi-region active-active replication",
      salaryImpact: "+₹8 - 12 LPA potential unlock",
      difficulty: "Advanced",
      category: "System Design"
    },
    {
      name: "Kafka & Event-Driven Architecture",
      description: "High-throughput log streaming, exactly-once semantics, schema registry, dead-letter pipelines",
      salaryImpact: "+₹6 - 10 LPA potential unlock",
      difficulty: "Advanced",
      category: "Backend & Streaming"
    },
    {
      name: "Kubernetes & Cloud Infrastructure",
      description: "Custom resource definitions, autoscaling, service mesh (Istio/Envoy), zero-downtime canary deployments",
      salaryImpact: "+₹5 - 8 LPA potential unlock",
      difficulty: "Intermediate to Advanced",
      category: "Cloud & DevOps"
    },
    {
      name: "Generative AI & LLM Systems",
      description: "Building production RAG pipelines, vector embedding indexing, agentic workflows, model inference caching",
      salaryImpact: "+₹10 - 15 LPA emerging premium",
      difficulty: "Advanced",
      category: "AI / ML"
    }
  ];

  // Evaluate which high-leverage skills are missing from current profile
  const skillsToAcquire = highLeverageSkills.filter(h => 
    !Array.from(currentSkills).some(s => s.includes(h.name.toLowerCase()) || h.name.toLowerCase().includes(s))
  );

  // Target Companies realistically reachable with target skills
  const targetCompanies = [
    {
      company: "Stripe",
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=60",
      tier: "Tier-1 Global Fintech",
      targetRole: targetNextRole,
      expectedCtc: "₹45.0 - 65.0 LPA",
      hiringFocus: "Idempotency, distributed transactions, zero-data-loss consistency",
      fitScore: 82
    },
    {
      company: "Uber",
      logo: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=100&auto=format&fit=crop&q=60",
      tier: "Tier-1 Mobility & Platform",
      targetRole: targetNextRole,
      expectedCtc: "₹50.0 - 75.0 LPA",
      hiringFocus: "Real-time geospatial state machines, low-latency gRPC services",
      fitScore: 78
    },
    {
      company: "Razorpay",
      logo: "https://images.unsplash.com/photo-1556742049-0a67e5572290?w=100&auto=format&fit=crop&q=60",
      tier: "High-Growth Unicorn",
      targetRole: targetNextRole,
      expectedCtc: "₹36.0 - 48.0 LPA",
      hiringFocus: "High concurrency payment microservices & fault tolerance",
      fitScore: 88
    },
    {
      company: "Postman",
      logo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&auto=format&fit=crop&q=60",
      tier: "Developer Tools Unicorn",
      targetRole: targetNextRole,
      expectedCtc: "₹38.0 - 50.0 LPA",
      hiringFocus: "Cloud scalability, distributed sync, developer experience",
      fitScore: 85
    }
  ];

  // Senior Proof-of-Work Project Blueprints
  const proofOfWorkProjects = [
    {
      title: "Distributed Rate Limiter & Token Bucket Gateway",
      architecture: "Go / Java + Redis Cluster + Envoy Proxy + Prometheus Metrics",
      impact: "Demonstrates understanding of high-throughput traffic control, atomic Lua scripts, and distributed state.",
      timeToBuild: "2 - 3 Weeks"
    },
    {
      title: "Event-Sourced Financial Ledger with Double-Entry Bookkeeping",
      architecture: "Spring Boot / Node.js + Kafka + PostgreSQL + Debezium CDC",
      impact: "Proves mastery of audit trails, ACID transactional safety, and event sourcing.",
      timeToBuild: "3 - 4 Weeks"
    }
  ];

  return {
    currentLevel,
    yearsOfExperience: yearsExp,
    currentCtc,
    targetNextRole,
    targetCompBand,
    targetUpliftPercent,
    skillsToAcquire,
    targetCompanies,
    proofOfWorkProjects,
    strategicAdvice: `Transitioning from ${currentLevel} to ${targetNextRole} requires moving from writing isolated features to owning architectural boundaries, reliability SLA/SLOs, and distributed data consistency. Adding ${skillsToAcquire.slice(0, 2).map(s => s.name).join(' + ') || 'Kafka and Kubernetes'} will make you a prime candidate for ${targetCompBand} compensation packages.`
  };
}
