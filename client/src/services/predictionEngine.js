import { SKILLS_TAXONOMY, ALL_SKILLS_FLAT } from '../data/skillsTaxonomy.js';

/**
 * Curated knowledge base for skill roadmap generation
 */
const SKILL_ROADMAP_KNOWLEDGE = {
  "Data Structures & Algorithms": {
    theme: "Data Structures & Core Algorithmic Foundations",
    why: "Primary filtration criteria for 95%+ of top-tier on-campus coding rounds and technical screens.",
    focus: ["Arrays, Two Pointers, Sliding Window invariants", "Hash Maps, Heaps & Priority Queues", "Recursion & Backtracking patterns", "Time & Space Complexity analysis (Big-O)"],
    outcome: "Solve 35+ LeetCode Medium problems with optimal time complexity under timed conditions.",
    deliverables: [
      "Complete Striver SDE sheet Arrays & String section (20 problems)",
      "Implement Max-Heap and LRU Cache from scratch",
      "Clear 3 timed coding assessments (90 mins each) with >85% test cases passing"
    ],
    resources: [
      { name: "Striver SDE Sheet - Core DSA", url: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/" },
      { name: "NeetCode 150 Core Practice", url: "https://neetcode.io/practice" }
    ]
  },
  "Dynamic Programming": {
    theme: "Dynamic Programming & Optimization Patterns",
    why: "Critical deciding topic in Google, Microsoft, and Uber technical interviews to distinguish top problem solvers.",
    focus: ["1D DP: Fibonacci, Climbing Stairs, House Robber", "2D Grid DP & Minimum Path Sum", "0/1 Knapsack & Unbounded Knapsack variants", "Longest Common Subsequence (LCS) & Edit Distance"],
    outcome: "Identify overlapping subproblems and optimal substructure within 5 minutes of seeing any problem.",
    deliverables: [
      "Solve 25 classic DP patterns on LeetCode / Codeforces",
      "Transition 10 recursive solutions to space-optimized iterative tabular DP",
      "Complete mock assessment focusing strictly on hard optimization problems"
    ],
    resources: [
      { name: "TakeUForward DP Playlist Guide", url: "https://takeuforward.org/dynamic-programming/striver-dp-series-top-coding-interview-problems/" },
      { name: "NeetCode 2-D Dynamic Programming", url: "https://neetcode.io" }
    ]
  },
  "Graph Algorithms": {
    theme: "Graph Theory, BFS/DFS & Network Traversal",
    why: "Universally tested in Day-1 campus placement rounds for routing, social graph, and dependency resolution scenarios.",
    focus: ["Breadth-First Search (BFS) & Depth-First Search (DFS)", "Cycle Detection in Directed and Undirected graphs", "Dijkstra's Shortest Path & Bellman-Ford", "Disjoint Set Union (DSU) & Topological Sort"],
    outcome: "Flawlessly implement graph traversals and shortest path algorithms without syntax lookups.",
    deliverables: [
      "Solve 20 high-frequency graph problems (Course Schedule, Word Ladder, Number of Islands)",
      "Code DSU with Path Compression and Union by Rank",
      "Participate in 1 timed virtual contest on Codeforces / LeetCode"
    ],
    resources: [
      { name: "Striver Graph Series", url: "https://takeuforward.org/graph/striver-graph-series-top-coding-interview-problems/" },
      { name: "WilliamFiset Graph Theory Visuals", url: "https://www.youtube.com/@WilliamFiset-videos" }
    ]
  },
  "Tree Algorithms": {
    theme: "Binary Trees, BSTs & Hierarchical Data Structures",
    why: "Core prerequisite for Microsoft, Amazon, and Atlassian coding rounds.",
    focus: ["Binary Tree Traversals (Inorder, Preorder, Postorder, Level-Order)", "BST Validation, LCA & Insertion/Deletion", "Diameter, Max Path Sum & Boundary Traversal", "Trie (Prefix Tree) for efficient string lookup"],
    outcome: "Master recursion invariants on tree nodes and handle edge cases effortlessly.",
    deliverables: [
      "Solve 20 Binary Tree & BST questions from Blind 75",
      "Implement an Auto-Complete Prefix Search engine using Trie",
      "Draft clean, bug-free iterative tree traversal code"
    ],
    resources: [
      { name: "NeetCode Trees Category", url: "https://neetcode.io" },
      { name: "Striver Tree Master Sheet", url: "https://takeuforward.org" }
    ]
  },
  "System Design Fundamentals": {
    theme: "System Design, Scalability & Architecture Principles",
    why: "Required for senior rounds and Day-1 SDE evaluations to assess production-readiness.",
    focus: ["Horizontal vs Vertical Scaling & Load Balancer strategies", "Consistent Hashing & Distributed Caching (Redis/Memcached)", "Database Sharding, Replication & CAP Theorem", "Rate Limiting & Message Queuing (Kafka/RabbitMQ)"],
    outcome: "Design scalable, fault-tolerant backend architectures capable of handling 100k+ concurrent QPS.",
    deliverables: [
      "Diagram and document end-to-end architecture for a High-Concurrency URL Shortener",
      "Implement a thread-safe Low-Level Design (e.g., Rate Limiter or Parking Lot) with SOLID principles",
      "Conduct 2 peer mock system design interview simulations"
    ],
    resources: [
      { name: "ByteByteGo System Design Primer", url: "https://bytebytego.com/" },
      { name: "Donne Martin System Design GitHub", url: "https://github.com/donnemartin/system-design-primer" }
    ]
  },
  "Operating Systems": {
    theme: "Operating Systems, Concurrency & Thread Safety",
    why: "Mandatory subject for campus placement technical interviews and core engineering teams.",
    focus: ["Process vs Thread & Context Switching mechanics", "CPU Scheduling algorithms & Deadlock handling (Banker's Algorithm)", "Memory Management: Paging, Virtual Memory & Page Faults", "Concurrency, Mutexes, Semaphores & Race Conditions"],
    outcome: "Explain low-level system execution and concurrency hazards with precision during technical interviews.",
    deliverables: [
      "Review top 50 OS interview questions with practical code examples",
      "Implement Producer-Consumer problem using Semaphores and Mutexes in C++/Java",
      "Simulate an LRU Page Replacement algorithm"
    ],
    resources: [
      { name: "GeeksforGeeks Operating Systems Guide", url: "https://www.geeksforgeeks.org/operating-systems/" },
      { name: "Operating Systems: Three Easy Pieces", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/" }
    ]
  },
  "Database Management Systems": {
    theme: "Database Management Systems & Relational Theory",
    why: "Essential baseline for backend and platform engineering interviews across every tech company.",
    focus: ["ACID Properties, Transactions & Isolation Levels", "B-Tree vs B+ Tree Indexing internals", "Database Normalization (1NF to BCNF) & Denormalization trade-offs", "Concurrency Control, Two-Phase Locking (2PL) & MVCC"],
    outcome: "Demonstrate deep understanding of relational data consistency, transactions, and indexing trade-offs.",
    deliverables: [
      "Solve 20 advanced SQL interview scenarios on LeetCode Database",
      "Write comprehensive explanation of MVCC and Read Committed vs Serializable isolation",
      "Design normalized schema for an E-Commerce system with proper foreign keys and indexes"
    ],
    resources: [
      { name: "Use The Index, Luke! SQL Guide", url: "https://use-the-index-luke.com/" },
      { name: "LeetCode Top 50 SQL Study Plan", url: "https://leetcode.com/studyplan/top-sql-50/" }
    ]
  },
  "SQL": {
    theme: "Advanced SQL Querying & Relational Optimization",
    why: "Core requirement in 85%+ of data-backed product interviews.",
    focus: ["Complex Multi-Table Joins, Self-Joins & Window Functions (ROW_NUMBER, RANK, DENSE_RANK)", "GROUP BY, HAVING, and Subqueries / CTEs (WITH clause)", "EXPLAIN ANALYZE, Index usage & Query execution plans", "Query optimization to eliminate full-table scans"],
    outcome: "Write performant queries that process large datasets efficiently without redundant table scans.",
    deliverables: [
      "Complete HackerRank 15-day SQL Challenge (Gold Badge)",
      "Optimize 5 slow queries using composite indexing and CTEs",
      "Solve 10 LeetCode Hard SQL scenario questions"
    ],
    resources: [
      { name: "Mode Analytics Advanced SQL Tutorial", url: "https://mode.com/sql-tutorial/" },
      { name: "LeetCode Database Questions", url: "https://leetcode.com/problemset/database/" }
    ]
  },
  "Object-Oriented Programming": {
    theme: "Object-Oriented Design & Clean Architecture Patterns",
    why: "Tested rigorously in Microsoft, Amazon, and Cisco technical and LLD interview rounds.",
    focus: ["Encapsulation, Inheritance, Polymorphism & Abstraction", "SOLID Principles & Clean Code practices", "Design Patterns: Factory, Singleton, Strategy, Observer, Decorator", "Design an elevator system, parking lot, or snake-and-ladder game"],
    outcome: "Write modular, testable, and extensible code that satisfies real-world Low-Level Design rubrics.",
    deliverables: [
      "Implement a fully functional Parking Lot or Splitwise LLD in C++/Java with clean OOP",
      "Write unit tests verifying class modularity and loose coupling",
      "Refactor legacy procedural code into SOLID design patterns"
    ],
    resources: [
      { name: "Refactoring Guru - Design Patterns", url: "https://refactoring.guru/design-patterns" },
      { name: "Head First Design Patterns Summary", url: "https://github.com/bethrobson/Head-First-Design-Patterns" }
    ]
  }
};

/**
 * Token-safe and alias-aware skill match
 */
export function isSkillMatch(candidateSkill, targetSkillName) {
  const c = (candidateSkill || "").toLowerCase().trim();
  const t = (targetSkillName || "").toLowerCase().trim();
  if (!c || !t) return false;
  if (c === t) return true;

  // Check taxonomy aliases
  const taxMatch = ALL_SKILLS_FLAT.find(item => item.name.toLowerCase() === t);
  if (taxMatch) {
    if (taxMatch.name.toLowerCase() === c) return true;
    if (taxMatch.aliases && taxMatch.aliases.some(a => a.toLowerCase() === c)) return true;
  }

  // Word boundary match for compound phrases (min 4 chars to prevent false positives like 'os', 'c', 'go')
  if (c.length >= 4 && t.length >= 4) {
    const escapedC = c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(?:^|[^a-zA-Z0-9_+#.])${escapedC}(?:$|[^a-zA-Z0-9_+#.])`, 'i');
    if (regex.test(t)) return true;

    const escapedT = t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regexT = new RegExp(`(?:^|[^a-zA-Z0-9_+#.])${escapedT}(?:$|[^a-zA-Z0-9_+#.])`, 'i');
    if (regexT.test(c)) return true;
  }

  return false;
}

export const FALLBACK_PLACEMENT_RECORDS = [
  {
    id: "rec-1",
    collegeId: "iit-delhi",
    company: "Google",
    companyLogo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&auto=format&fit=crop&q=60",
    role: "Software Development Engineer (SDE-1)",
    ctcBand: "₹45.0 - 52.0 LPA",
    baseSalary: "₹24 LPA",
    visitFrequency: "Every Year (Day 1 Recruiter)",
    hiringBatch: "2025 - 2026",
    cgpaCutoff: 8.0,
    rounds: [
      { name: "Online Coding Assessment", description: "2 Hard LeetCode style algorithmic problems (90 mins)" },
      { name: "Technical Interview 1", description: "Trees, Graphs & Dynamic Programming optimization" },
      { name: "Technical Interview 2", description: "Advanced Data Structures, Concurrency & Low Level Design" },
      { name: "Googliness & Leadership", description: "Behavioral, team collaboration & problem-solving mindset" }
    ],
    demandedSkills: [
      { name: "Data Structures & Algorithms", frequency: 98, mandatory: true },
      { name: "Dynamic Programming", frequency: 92, mandatory: true },
      { name: "Graph Algorithms", frequency: 88, mandatory: true },
      { name: "C++", frequency: 85, mandatory: false },
      { name: "Java", frequency: 80, mandatory: false },
      { name: "System Design Fundamentals", frequency: 72, mandatory: true },
      { name: "Operating Systems", frequency: 78, mandatory: false }
    ],
    recommendedProjects: [
      "Distributed Key-Value Store with Raft Consensus",
      "High-Throughput Multithreaded Web Server in C++/Go",
      "Real-Time Collaborative Code Editor with WebSockets"
    ]
  },
  {
    id: "rec-2",
    collegeId: "iit-delhi",
    company: "Microsoft",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=60",
    role: "Software Engineer (Core Platform)",
    ctcBand: "₹42.0 - 48.0 LPA",
    baseSalary: "₹20 LPA",
    visitFrequency: "Every Year (Day 1)",
    hiringBatch: "2025 - 2026",
    cgpaCutoff: 7.5,
    rounds: [
      { name: "Codility OA", description: "3 Algorithmic problems (Arrays, Strings, Dynamic Programming)" },
      { name: "DSA & Problem Solving", description: "Binary Trees, Heaps, Graph BFS/DFS" },
      { name: "Object Oriented Design", description: "Design an elevator system / parking lot with Clean OOP" },
      { name: "Director / Fitment Round", description: "Resume deep dive, architectural choices, core OS concepts" }
    ],
    demandedSkills: [
      { name: "Data Structures & Algorithms", frequency: 95, mandatory: true },
      { name: "Object-Oriented Programming", frequency: 90, mandatory: true },
      { name: "Tree Algorithms", frequency: 88, mandatory: true },
      { name: "C++", frequency: 82, mandatory: false },
      { name: "Operating Systems", frequency: 82, mandatory: true },
      { name: "Database Management Systems", frequency: 80, mandatory: true }
    ],
    recommendedProjects: [
      "Extensible Plugin-Based Task Scheduling Engine",
      "Low-Level Cache Simulator (LRU/LFU) with Thread Safety",
      "Cloud-Native File Storage Service with Azure Blob/S3 integration"
    ]
  },
  {
    id: "rec-3",
    collegeId: "bits-pilani",
    company: "Atlassian",
    companyLogo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=60",
    role: "Graduate Software Engineer (Backend)",
    ctcBand: "₹48.0 - 55.0 LPA",
    baseSalary: "₹25 LPA",
    visitFrequency: "Every Year (Day 1)",
    hiringBatch: "2025 - 2026",
    cgpaCutoff: 7.8,
    rounds: [
      { name: "Karat Coding Screen", description: "DSA, String Manipulation, and Code Debugging" },
      { name: "System Coding & Concurrency", description: "Live multithreaded component implementation" },
      { name: "Values & Craft", description: "Open company no bullshit, team fitment" }
    ],
    demandedSkills: [
      { name: "Data Structures & Algorithms", frequency: 94, mandatory: true },
      { name: "Java", frequency: 90, mandatory: true },
      { name: "RESTful API Design", frequency: 88, mandatory: true },
      { name: "Spring Boot", frequency: 82, mandatory: false },
      { name: "PostgreSQL", frequency: 78, mandatory: false }
    ],
    recommendedProjects: [
      "Real-Time Issue Tracker with WebSockets and Redis Queue",
      "Distributed Rate Limiter Middleware in Java/Go"
    ]
  }
];

/**
 * Client-side dynamic placement readiness analyzer
 * Computes exact same multi-factor explainable score and roadmap from user profile data.
 */
export function calculatePlacementReadiness(studentProfile, options = {}) {
  const {
    collegeId = "iit-delhi",
    targetType = "on-campus",
    targetRole = null,
    recruiterPoolOverride = null
  } = options;

  const rawSkills = studentProfile?.skills || [];
  const studentSkills = new Set(
    rawSkills.map(s => (typeof s === "string" ? s : s?.name || "").toLowerCase().trim()).filter(Boolean)
  );

  let recruiterPool = recruiterPoolOverride || FALLBACK_PLACEMENT_RECORDS.filter(
    r => r.collegeId === collegeId || collegeId === "other"
  );
  if (!recruiterPool || recruiterPool.length === 0) {
    recruiterPool = FALLBACK_PLACEMENT_RECORDS;
  }

  if (targetRole && targetRole !== "all") {
    const roleFiltered = recruiterPool.filter(r => 
      r.role.toLowerCase().includes(targetRole.toLowerCase()) ||
      targetRole.toLowerCase().includes(r.role.toLowerCase())
    );
    if (roleFiltered.length > 0) recruiterPool = roleFiltered;
  }

  const demandFrequencyMap = {};
  const mandatoryCountMap = {};
  const companiesPerSkillMap = {};

  recruiterPool.forEach(rec => {
    (rec.demandedSkills || []).forEach(skill => {
      const canonical = skill.name;
      demandFrequencyMap[canonical] = (demandFrequencyMap[canonical] || 0) + (skill.frequency || 75);
      if (skill.mandatory) {
        mandatoryCountMap[canonical] = (mandatoryCountMap[canonical] || 0) + 1;
      }
      if (!companiesPerSkillMap[canonical]) companiesPerSkillMap[canonical] = [];
      if (!companiesPerSkillMap[canonical].includes(rec.company)) {
        companiesPerSkillMap[canonical].push(rec.company);
      }
    });
  });

  const matchedSkills = [];
  const missingSkills = [];

  Object.entries(demandFrequencyMap).forEach(([skillName, aggregateFreq]) => {
    const isMatched = Array.from(studentSkills).some(s => isSkillMatch(s, skillName));
    const poolLen = recruiterPool.length || 1;
    const isMandatory = (mandatoryCountMap[skillName] || 0) >= Math.max(1, Math.floor(poolLen * 0.35));
    const marketDemandFrequency = Math.min(99, Math.round((aggregateFreq / (poolLen * 100)) * 100));

    const item = {
      name: skillName,
      importance: isMandatory ? "Critical Mandatory" : (marketDemandFrequency >= 80 ? "High Priority" : "Recommended"),
      marketDemandFrequency,
      isMandatory,
      companiesRequiring: companiesPerSkillMap[skillName] || []
    };

    if (isMatched) matchedSkills.push(item);
    else missingSkills.push(item);
  });

  missingSkills.sort((a, b) => {
    if (a.isMandatory !== b.isMandatory) return b.isMandatory ? 1 : -1;
    return b.marketDemandFrequency - a.marketDemandFrequency;
  });

  matchedSkills.sort((a, b) => {
    if (a.isMandatory !== b.isMandatory) return b.isMandatory ? 1 : -1;
    return b.marketDemandFrequency - a.marketDemandFrequency;
  });

  // Factor 1: Mandatory Skill Clearance (45% weight)
  const totalMandatorySkills = Object.values(mandatoryCountMap).filter(c => c >= Math.max(1, Math.floor(recruiterPool.length * 0.35))).length || 1;
  const matchedMandatoryCount = matchedSkills.filter(s => s.isMandatory).length;
  const mandatoryScoreComponent = Math.min(45, (matchedMandatoryCount / totalMandatorySkills) * 45);

  // Factor 2: Overall Demanded Skills Coverage (25% weight)
  const matchedFreqSum = matchedSkills.reduce((acc, s) => acc + s.marketDemandFrequency, 0);
  const totalPossibleFreq = (matchedFreqSum + missingSkills.reduce((acc, s) => acc + s.marketDemandFrequency, 0)) || 1;
  const coverageScoreComponent = Math.min(25, (matchedFreqSum / totalPossibleFreq) * 25);

  // Factor 3: Academic / CGPA Alignment (10% weight)
  let academicScoreComponent = 7.5;
  const candidateCgpa = parseFloat(studentProfile?.cgpa);
  if (!isNaN(candidateCgpa) && candidateCgpa > 0) {
    if (candidateCgpa >= 8.0) academicScoreComponent = 10;
    else if (candidateCgpa >= 7.5) academicScoreComponent = 8.5;
    else if (candidateCgpa >= 7.0) academicScoreComponent = 7.0;
    else if (candidateCgpa >= 6.0) academicScoreComponent = 5.5;
    else academicScoreComponent = 4.0;
  }

  // Factor 4: Practical Project Portfolio (10% weight)
  const projectsCount = studentProfile?.projectsCompleted !== undefined
    ? Number(studentProfile.projectsCompleted)
    : (Array.isArray(studentProfile?.projects) ? studentProfile.projects.length : (rawSkills.length >= 7 ? 3 : 2));
  let projectScoreComponent = 3.0;
  if (projectsCount >= 3) projectScoreComponent = 10;
  else if (projectsCount === 2) projectScoreComponent = 7.5;
  else if (projectsCount === 1) projectScoreComponent = 5.0;

  // Factor 5: Profile Breadth & Competitive Coding (10% weight)
  let profileBreadthComponent = 0;
  if (rawSkills.length >= 8) profileBreadthComponent += 4;
  else if (rawSkills.length >= 4) profileBreadthComponent += 2.5;

  if (studentProfile?.githubUsername) profileBreadthComponent += 3;
  if (studentProfile?.contestRating && Number(studentProfile.contestRating) >= 1400) profileBreadthComponent += 3;
  else if (studentProfile?.contestsParticipated && Number(studentProfile.contestsParticipated) > 0) profileBreadthComponent += 2;
  else profileBreadthComponent += 1.5;

  profileBreadthComponent = Math.min(10, profileBreadthComponent);

  const rawReadinessScore = mandatoryScoreComponent + coverageScoreComponent + academicScoreComponent + projectScoreComponent + profileBreadthComponent;
  const overallReadinessScore = Math.min(98, Math.max(15, Math.round(rawReadinessScore)));

  let readinessTier = "High Profile Readiness";
  let readinessTierColor = "text-brand-green";
  if (overallReadinessScore < 55) {
    readinessTier = "Foundational Readiness (Developing)";
    readinessTierColor = "text-rose-400";
  } else if (overallReadinessScore < 75) {
    readinessTier = "Moderate Readiness (Needs Target Prep)";
    readinessTierColor = "text-amber-400";
  }

  const explainabilityFactors = [];
  if (matchedMandatoryCount > 0) {
    const topMatched = matchedSkills.filter(s => s.isMandatory).slice(0, 3).map(s => s.name).join(", ");
    explainabilityFactors.push({
      type: "strength",
      text: `Strong alignment in ${matchedMandatoryCount} core prerequisite skills (${topMatched})`
    });
  } else if (matchedSkills.length > 0) {
    const topMatched = matchedSkills.slice(0, 3).map(s => s.name).join(", ");
    explainabilityFactors.push({
      type: "strength",
      text: `Demonstrated technical foundations in ${topMatched}`
    });
  }

  if (!isNaN(candidateCgpa) && candidateCgpa >= 7.5) {
    explainabilityFactors.push({
      type: "strength",
      text: `Academic standing (${candidateCgpa} CGPA) clears campus cutoffs for Day-1 recruiters`
    });
  }

  if (projectsCount >= 2) {
    explainabilityFactors.push({
      type: "strength",
      text: `Practical portfolio with ${projectsCount} verified technical projects`
    });
  }

  if (studentProfile?.contestRating && Number(studentProfile.contestRating) >= 1400) {
    explainabilityFactors.push({
      type: "strength",
      text: `Active competitive programming rating (${studentProfile.contestRating}) proves problem-solving speed`
    });
  }

  const criticalMissing = missingSkills.filter(s => s.isMandatory);
  if (criticalMissing.length > 0) {
    const gapNames = criticalMissing.slice(0, 2).map(s => s.name).join(" and ");
    explainabilityFactors.push({
      type: "gap",
      text: `Missing critical Day-1 campus prerequisites: ${gapNames}`
    });
  }

  if (missingSkills.some(s => s.name.toLowerCase().includes("system design"))) {
    explainabilityFactors.push({
      type: "gap",
      text: "Limited System Design & High-Concurrency architecture exposure for target roles"
    });
  }

  if (projectsCount < 2) {
    explainabilityFactors.push({
      type: "gap",
      text: "Recommend completing at least 1 production-grade capstone project with live deployment"
    });
  }

  const companyFitBreakdown = recruiterPool.map(rec => {
    const required = rec.demandedSkills || [];
    let matchCount = 0;
    let totalWeight = 0;
    const companyMissing = [];
    const companyMatched = [];

    required.forEach(req => {
      const weight = req.mandatory ? 2 : 1;
      totalWeight += weight;
      const isPresent = Array.from(studentSkills).some(s => isSkillMatch(s, req.name));

      if (isPresent) {
        matchCount += weight;
        companyMatched.push(req.name);
      } else {
        companyMissing.push({ name: req.name, mandatory: req.mandatory, frequency: req.frequency || 80 });
      }
    });

    let rawFit = totalWeight > 0 ? (matchCount / totalWeight) * 100 : 50;
    if (!isNaN(candidateCgpa) && candidateCgpa > 0 && rec.cgpaCutoff && candidateCgpa < rec.cgpaCutoff) {
      const penalty = Math.min(18, Math.round((rec.cgpaCutoff - candidateCgpa) * 12));
      rawFit = Math.max(10, rawFit - penalty);
    }

    const fitPercentage = Math.min(99, Math.max(10, Math.round(rawFit)));
    let tierLabel = "Strong Fit";
    let tierColor = "text-emerald-400";
    if (fitPercentage < 50) {
      tierLabel = "Significant Gap";
      tierColor = "text-rose-400";
    } else if (fitPercentage < 75) {
      tierLabel = "Moderate Fit (Needs Prep)";
      tierColor = "text-amber-400";
    }

    return {
      companyId: rec.id,
      company: rec.company,
      companyLogo: rec.companyLogo,
      role: rec.role,
      ctcBand: rec.ctcBand,
      cgpaCutoff: rec.cgpaCutoff || 7.0,
      fitPercentage,
      tierLabel,
      tierColor,
      matchedSkills: companyMatched,
      missingSkills: companyMissing
    };
  });

  companyFitBreakdown.sort((a, b) => b.fitPercentage - a.fitPercentage);

  const topGaps = missingSkills.slice(0, 3);
  const phases = [];

  if (topGaps.length >= 1) {
    const gap1 = topGaps[0];
    const details1 = SKILL_ROADMAP_KNOWLEDGE[gap1.name] || {
      theme: `${gap1.name} Mastery & Core Principles`,
      why: `Demanded by target recruiters including ${(gap1.companiesRequiring || []).slice(0, 2).join(' and ') || 'top tech recruiters'} to evaluate technical depth.`,
      focus: [`Fundamental syntax, core concepts & patterns in ${gap1.name}`, "Practical problem-solving implementation", "Debugging edge cases and optimization"],
      outcome: `Achieve verified fluency in ${gap1.name} under timed assessment conditions.`,
      deliverables: [`Solve 20 high-frequency ${gap1.name} problems`, `Build 1 functional module using ${gap1.name}`, "Take 1 timed mock assessment"],
      resources: [{ name: "HackerRank Practice Kit", url: "https://hackerrank.com" }]
    };
    phases.push({
      phaseNumber: 1,
      week: "Weeks 1 - 2",
      theme: details1.theme,
      targetSkill: gap1.name,
      whyItMatters: details1.why,
      whatToFocusOn: details1.focus,
      expectedOutcome: details1.outcome,
      deliverables: details1.deliverables,
      suggestedResources: details1.resources
    });
  } else {
    phases.push({
      phaseNumber: 1,
      week: "Weeks 1 - 2",
      theme: "Advanced Algorithmic Edge Cases & Speed Optimization",
      targetSkill: "Advanced Problem Solving",
      whyItMatters: "Maximizes placement interview clearance speed and eliminates subtle edge-case failures during Day-1 online assessments.",
      whatToFocusOn: ["Segment Trees, Fenwick Trees & Range Queries", "Bitmask Dynamic Programming & String Hashing", "Optimal space invariants & low-level memory layout", "Timed 60-minute coding sprints"],
      outcome: "Solve LeetCode Hard problems within 25 minutes with zero compilation errors.",
      deliverables: [
        "Solve 30 LeetCode Hard & Codeforces Div. 2 problems",
        "Implement Disjoint Set Union and Fenwick Tree from scratch",
        "Participate in 2 live timed weekend contests"
      ],
      resources: [
        { name: "NeetCode All Hard Patterns", url: "https://neetcode.io" },
        { name: "CSES Problem Set", url: "https://cses.fi/problemset/" }
      ]
    });
  }

  if (topGaps.length >= 2) {
    const gap2 = topGaps[1];
    const details2 = SKILL_ROADMAP_KNOWLEDGE[gap2.name] || {
      theme: `${gap2.name} Acceleration & Integration`,
      why: `Key prerequisite for senior product interviews and high-volume clearance rounds.`,
      focus: [`Advanced patterns in ${gap2.name}`, "Integration with scalable architectures", "Performance benchmarking and design trade-offs"],
      outcome: `Master production-grade application of ${gap2.name}.`,
      deliverables: [`Implement end-to-end component with ${gap2.name}`, "Complete 15 scenario questions", "Review design trade-offs"],
      resources: [{ name: "Striver SDE Sheet", url: "https://takeuforward.org" }]
    };
    phases.push({
      phaseNumber: 2,
      week: "Weeks 3 - 4",
      theme: details2.theme,
      targetSkill: gap2.name,
      whyItMatters: details2.why,
      whatToFocusOn: details2.focus,
      expectedOutcome: details2.outcome,
      deliverables: details2.deliverables,
      suggestedResources: details2.resources
    });
  } else {
    phases.push({
      phaseNumber: 2,
      week: "Weeks 3 - 4",
      theme: "Low-Level Design & Clean Architecture Patterns",
      targetSkill: "Object-Oriented Design & LLD",
      whyItMatters: "Mandatory round for Microsoft, Amazon, and Atlassian to test modularity, clean code, and design patterns.",
      whatToFocusOn: ["SOLID Principles, Factory, Strategy & Observer Patterns", "Thread-Safe Singleton, LRU Cache & Rate Limiter LLD", "Class and UML Sequence diagrams", "Writing extensible, testable production code"],
      outcome: "Produce clean, testable object-oriented code for any system design interview prompt in under 45 minutes.",
      deliverables: [
        "Design and code a functional Splitwise or Parking Lot LLD with unit tests",
        "Implement a multithreaded Token Bucket rate limiter",
        "Practice 2 peer mock design interviews"
      ],
      resources: [{ name: "Refactoring Guru Design Patterns", url: "https://refactoring.guru" }]
    });
  }

  if (topGaps.length >= 3) {
    const gap3 = topGaps[2];
    const details3 = SKILL_ROADMAP_KNOWLEDGE[gap3.name] || {
      theme: `${gap3.name} Mastery & Capstone Integration`,
      why: `Unlocks comprehensive clearance across full-loop interview rounds.`,
      focus: [`System integration with ${gap3.name}`, "Failure modes and latency analysis", "Mock interview discussions"],
      outcome: `Confidently justify architectural choices involving ${gap3.name}.`,
      deliverables: [`Deploy capstone showcasing ${gap3.name}`, "Add unit test suite with >80% coverage", "Complete 2 peer mock interviews"],
      resources: [{ name: "HackerRank Interview Prep Kit", url: "https://hackerrank.com" }]
    };
    phases.push({
      phaseNumber: 3,
      week: "Weeks 5 - 6",
      theme: details3.theme,
      targetSkill: gap3.name,
      whyItMatters: details3.why,
      whatToFocusOn: details3.focus,
      expectedOutcome: details3.outcome,
      deliverables: details3.deliverables,
      suggestedResources: details3.resources
    });
  } else {
    phases.push({
      phaseNumber: 3,
      week: "Weeks 5 - 6",
      theme: "Full-Loop Mock Rounds & Behavioral Leadership Clearance",
      targetSkill: "Interview Simulation & Behavioral",
      whyItMatters: "Ensures seamless conversion from technical rounds to final offers across Google, Microsoft, and top product companies.",
      whatToFocusOn: ["Timed OA simulations under strict 90-minute limits", "Amazon Leadership Principles & Google Googliness rubrics", "STAR method behavioral stories (Situation, Task, Action, Result)", "Resume project deep dive and architectural justification"],
      outcome: "Achieve 90%+ confidence across both algorithmic whiteboard rounds and partner fitment discussions.",
      deliverables: [
        "Complete 3 full-loop mock interview simulations (OA + Tech 1 + Tech 2 + HR)",
        "Draft 5 comprehensive STAR behavioral stories based on your verified projects",
        "Deploy and document 1 flagship repository with live demo URL and test suite"
      ],
      resources: [
        { name: "Pramp / Exponent Free Mock Interview Exchange", url: "https://www.pramp.com" },
        { name: "HackerRank Interview Preparation Kit", url: "https://www.hackerrank.com/interview/interview-preparation-kit" }
      ]
    });
  }

  const criticalPriorityGaps = missingSkills.filter(s => s.isMandatory).slice(0, 4);
  const topGapsToClose = criticalPriorityGaps.length > 0 ? criticalPriorityGaps : missingSkills.slice(0, 3);
  const secondaryGaps = missingSkills.filter(s => !topGapsToClose.includes(s)).slice(0, 6);

  const topCompany = companyFitBreakdown[0] ? companyFitBreakdown[0].company : "Top Tech Recruiter";
  const topGapsNames = topGapsToClose.slice(0, 2).map(s => s.name).join(" and ");

  let summaryReport = "";
  if (overallReadinessScore >= 80) {
    summaryReport = `Your profile shows strong job readiness (${overallReadinessScore}%) with high alignment across campus recruiter rubrics. You are currently well-positioned for Day-1 recruiters like ${topCompany}. Elevate your profile by closing final gaps in ${topGapsNames || "advanced system design"}.`;
  } else if (overallReadinessScore >= 60) {
    summaryReport = `Your profile demonstrates solid fundamentals (${overallReadinessScore}% readiness). Closing targeted gaps in ${topGapsNames || "core algorithms and database internals"} will elevate your fit for tier-1 recruiters like ${topCompany} within 4 to 6 weeks.`;
  } else {
    summaryReport = `Your profile readiness is currently in the foundational tier (${overallReadinessScore}%). Follow the personalized 6-week roadmap focusing on ${topGapsNames || "Core DSA & Database Systems"} to build mandatory clearance for technical rounds.`;
  }

  return {
    overallReadinessScore,
    readinessTier,
    readinessTierColor,
    explainabilityFactors,
    targetType,
    targetRole: targetRole || (recruiterPool[0] ? recruiterPool[0].role : "Software Development Engineer (SDE-1)"),
    totalRecruitersAnalyzed: recruiterPool.length,
    matchedSkills,
    missingSkills,
    criticalPriorityGaps: topGapsToClose,
    topGapsToClose,
    secondaryGaps,
    companyFitBreakdown,
    actionPlan: phases,
    summaryReport
  };
}

/**
 * Client-side resume skill & metadata extractor for fallback mode
 */
export function extractSkillsFromTextClient(rawText) {
  if (!rawText || typeof rawText !== "string") {
    return { extractedSkills: [], totalSkillsCount: 0, metadata: {} };
  }

  const normalized = rawText.toLowerCase();
  const matchedSet = new Set();

  ALL_SKILLS_FLAT.forEach(skill => {
    const canonical = skill.name.toLowerCase();
    const escaped = canonical.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(?:^|[^a-zA-Z0-9_+#.])${escaped}(?:$|[^a-zA-Z0-9_+#.])`, 'i');

    let isMatch = regex.test(normalized);
    if (!isMatch && skill.aliases) {
      for (const alias of skill.aliases) {
        const escAlias = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regA = new RegExp(`(?:^|[^a-zA-Z0-9_+#.])${escAlias}(?:$|[^a-zA-Z0-9_+#.])`, 'i');
        if (regA.test(normalized)) {
          isMatch = true;
          break;
        }
      }
    }

    if (isMatch) matchedSet.add(skill.name);
  });

  const metadata = {
    detectedCgpa: null,
    detectedYoE: 0,
    detectedName: null,
    detectedCollege: null,
    detectedCollegeId: null,
    detectedDegree: null,
    detectedGithub: null,
    detectedProjectsCount: 0
  };

  const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  for (let i = 0; i < Math.min(4, lines.length); i++) {
    const line = lines[i];
    if (line.length > 2 && line.length < 40 && !/[@:/\\0-9+()&]/.test(line) && !/resume|profile|skills/i.test(line)) {
      const words = line.split(/\s+/);
      if (words.length >= 2 && words.length <= 4 && words.every(w => /^[A-Z][a-zA-Z.'-]*$/.test(w))) {
        metadata.detectedName = line;
        break;
      }
    }
  }

  const cgpaMatch = rawText.match(/(?:cgpa|gpa|pointer)\s*[:=-]?\s*([0-9]+(?:\.[0-9]+)?)/i);
  if (cgpaMatch && parseFloat(cgpaMatch[1])) {
    const val = parseFloat(cgpaMatch[1]);
    metadata.detectedCgpa = val <= 4.0 ? parseFloat((val * 2.5).toFixed(1)) : (val <= 10 ? val : parseFloat((val / 10).toFixed(1)));
  }

  const expMatch = rawText.match(/([0-9]+(?:\.[0-9]+)?)\+?\s*(?:years?|yrs?)(?:\s+of)?\s+(?:experience|exp)/i);
  if (expMatch && parseFloat(expMatch[1])) {
    metadata.detectedYoE = parseFloat(expMatch[1]);
  }

  const githubMatch = rawText.match(/(?:github\.com\/|@)([a-zA-Z0-9_-]+)/i);
  if (githubMatch && githubMatch[1] && !/com|http|org/i.test(githubMatch[1])) {
    metadata.detectedGithub = githubMatch[1];
  }

  if (/iit\s*delhi/i.test(rawText)) {
    metadata.detectedCollege = "Indian Institute of Technology (IIT) Delhi";
    metadata.detectedCollegeId = "iit-delhi";
  } else if (/bits\s*pilani/i.test(rawText)) {
    metadata.detectedCollege = "BITS Pilani";
    metadata.detectedCollegeId = "bits-pilani";
  } else if (/nit\s*trichy/i.test(rawText)) {
    metadata.detectedCollege = "NIT Trichy";
    metadata.detectedCollegeId = "nit-trichy";
  } else if (/dtu/i.test(rawText)) {
    metadata.detectedCollege = "Delhi Technological University (DTU)";
    metadata.detectedCollegeId = "dtu";
  } else if (/vit/i.test(rawText)) {
    metadata.detectedCollege = "Vellore Institute of Technology (VIT)";
    metadata.detectedCollegeId = "vit-vellore";
  }

  const degreeMatch = rawText.match(/\b(B\.Tech|B\.E\.|M\.Tech|M\.E\.|B\.S\.|M\.S\.|BCA|MCA)\b/i);
  if (degreeMatch) metadata.detectedDegree = degreeMatch[0];

  metadata.detectedProjectsCount = matchedSet.size >= 8 ? 3 : 2;

  return {
    extractedSkills: Array.from(matchedSet),
    totalSkillsCount: matchedSet.size,
    metadata
  };
}
