import { HISTORICAL_PLACEMENT_RECORDS } from "../data/placementRecords.js";
import { OFF_CAMPUS_JOB_POSTINGS } from "../data/jobPostings.js";
import { SKILLS_TAXONOMY } from "../data/skillsTaxonomy.js";

/**
 * AI Bot #1: Placement Readiness Analyzer
 * Performs weighted cross-referencing between student skills and recruiter/market demand.
 */
export function analyzePlacementReadiness(studentProfile, options = {}) {
  const {
    collegeId = "iit-delhi",
    targetType = "on-campus", // "on-campus" or "off-campus"
    targetCompanyId = null,
    targetRole = null
  } = options;

  const studentSkills = new Set((studentProfile.skills || []).map(s => s.toLowerCase().trim()));
  
  // Select benchmark dataset
  let recruiterPool = [];
  if (targetType === "on-campus") {
    recruiterPool = HISTORICAL_PLACEMENT_RECORDS.filter(
      r => r.collegeId === collegeId || collegeId === "other"
    );
    if (recruiterPool.length === 0) {
      recruiterPool = HISTORICAL_PLACEMENT_RECORDS;
    }
  } else {
    // Off-campus aggregate from jobs
    recruiterPool = OFF_CAMPUS_JOB_POSTINGS.map(job => ({
      id: job.id,
      company: job.company,
      companyLogo: job.companyLogo,
      role: job.role,
      ctcBand: job.ctcBand,
      cgpaCutoff: 7.0,
      demandedSkills: job.requiredSkills.map(s => ({
        name: s.name,
        frequency: s.mandatory ? 90 : 65,
        mandatory: s.mandatory,
        category: s.category
      }))
    }));
  }

  // 1. Compute aggregate skill demand across this recruiter pool
  const demandFrequencyMap = {};
  const mandatoryCountMap = {};
  recruiterPool.forEach(rec => {
    (rec.demandedSkills || []).forEach(skill => {
      const canonical = skill.name;
      demandFrequencyMap[canonical] = (demandFrequencyMap[canonical] || 0) + (skill.frequency || 75);
      if (skill.mandatory) {
        mandatoryCountMap[canonical] = (mandatoryCountMap[canonical] || 0) + 1;
      }
    });
  });

  const totalDemandScore = Object.values(demandFrequencyMap).reduce((a, b) => a + b, 0);

  // 2. Identify matched vs missing skills
  const matchedSkills = [];
  const missingSkills = [];

  Object.entries(demandFrequencyMap).forEach(([skillName, aggregateFreq]) => {
    const isMatched = Array.from(studentSkills).some(s => 
      s === skillName.toLowerCase() || skillName.toLowerCase().includes(s) || s.includes(skillName.toLowerCase())
    );

    const isMandatory = (mandatoryCountMap[skillName] || 0) > (recruiterPool.length * 0.4);
    const item = {
      name: skillName,
      importance: isMandatory ? "Critical" : (aggregateFreq > 200 ? "High" : "Medium"),
      marketDemandFrequency: Math.min(99, Math.round((aggregateFreq / (recruiterPool.length * 100)) * 100)),
      isMandatory
    };

    if (isMatched) {
      matchedSkills.push(item);
    } else {
      missingSkills.push(item);
    }
  });

  // Sort missing skills by priority
  missingSkills.sort((a, b) => b.marketDemandFrequency - a.marketDemandFrequency);
  matchedSkills.sort((a, b) => b.marketDemandFrequency - a.marketDemandFrequency);

  // 3. Compute overall readiness score (0 - 100)
  const matchedScoreSum = matchedSkills.reduce((acc, s) => acc + s.marketDemandFrequency, 0);
  const totalPossibleScore = (matchedScoreSum + missingSkills.reduce((acc, s) => acc + s.marketDemandFrequency, 0)) || 1;
  const overallReadinessScore = Math.min(98, Math.max(15, Math.round((matchedScoreSum / totalPossibleScore) * 100)));

  // 4. Company-by-company match scores
  const companyFitBreakdown = recruiterPool.map(rec => {
    const required = rec.demandedSkills || [];
    let matchCount = 0;
    let totalWeight = 0;
    const companyMissing = [];
    const companyMatched = [];

    required.forEach(req => {
      const weight = req.mandatory ? 2 : 1;
      totalWeight += weight;
      const isPresent = Array.from(studentSkills).some(s => 
        s === req.name.toLowerCase() || req.name.toLowerCase().includes(s) || s.includes(req.name.toLowerCase())
      );

      if (isPresent) {
        matchCount += weight;
        companyMatched.push(req.name);
      } else {
        companyMissing.push({ name: req.name, mandatory: req.mandatory });
      }
    });

    const fitPercentage = totalWeight > 0 ? Math.round((matchCount / totalWeight) * 100) : 50;

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

  // Sort companies by fit percentage descending
  companyFitBreakdown.sort((a, b) => b.fitPercentage - a.fitPercentage);

  // 5. Generate AI Personalized 6-Week Action Plan
  const actionPlan = generatePersonalizedActionPlan(missingSkills, matchedSkills, studentProfile);

  return {
    overallReadinessScore,
    targetType,
    totalRecruitersAnalyzed: recruiterPool.length,
    matchedSkills,
    missingSkills,
    topGapsToClose: missingSkills.slice(0, 4),
    companyFitBreakdown,
    actionPlan,
    summaryReport: generateExecutiveSummary(overallReadinessScore, missingSkills, companyFitBreakdown)
  };
}

/**
 * Generate structured 6-Week Action Plan with concrete deliverables
 */
function generatePersonalizedActionPlan(missingSkills, matchedSkills, profile) {
  const missingNames = missingSkills.map(s => s.name);
  const hasDsaGap = missingNames.some(s => /algorithm|data structure|tree|graph|dynamic programming/i.test(s));
  const hasSystemDesignGap = missingNames.some(s => /system design|microservices|distributed|caching/i.test(s));
  const hasSqlGap = missingNames.some(s => /sql|database|postgres|query optimization/i.test(s));
  const hasCloudGap = missingNames.some(s => /docker|aws|kubernetes|cloud/i.test(s));

  return [
    {
      week: "Weeks 1 - 2",
      theme: "Core Problem Solving & CS Fundamentals Mastery",
      focusAreas: [
        hasDsaGap ? "Dynamic Programming (Knapsack, LCS, Grid DP) & Graph BFS/DFS patterns" : "Advanced Tree Algorithms & Binary Search invariants",
        hasSqlGap ? "Complex SQL Joins, Indexing strategies & EXPLAIN ANALYZE queries" : "Operating Systems: Concurrency, Mutexes, and Thread Pools"
      ],
      deliverables: [
        "Complete 30 high-frequency LeetCode / Striver SDE sheet problems",
        "Write 15 complex SQL scenario queries on HackerRank / LeetCode DB",
        "Solve 5 timed mock coding assessments (90 mins each)"
      ],
      suggestedResources: [
        { name: "Striver SDE Sheet (Top 79 Core Questions)", url: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/" },
        { name: "NeetCode 150 Pattern Guide", url: "https://neetcode.io/practice" }
      ]
    },
    {
      week: "Weeks 3 - 4",
      theme: "Low-Level & High-Level System Design & Architecture",
      focusAreas: [
        hasSystemDesignGap ? "System Design Fundamentals (Consistent Hashing, Caching, Rate Limiting)" : "Object-Oriented Design & Clean Architecture Patterns",
        "API Gateway, Redis Pub/Sub, and Message Queue decoupling (Kafka/RabbitMQ)"
      ],
      deliverables: [
        "Design & code a functional Low-Level Design project (e.g., Rate Limiter or Splitwise)",
        "Diagram end-to-end architecture for a high-concurrency URL shortener with Redis caching",
        "Practice 2 peer mock design interviews"
      ],
      suggestedResources: [
        { name: "Designing Data-Intensive Applications (DDIA) Key Notes", url: "https://github.com/ept/ddia-references" },
        { name: "ByteByteGo System Design Cheatsheet", url: "https://bytebytego.com/" }
      ]
    },
    {
      week: "Weeks 5 - 6",
      theme: "Production-Grade Capstone Project & Mock Interview Rounds",
      focusAreas: [
        hasCloudGap ? "Containerize application with Docker & deploy to AWS/GCP with CI/CD" : "Full-stack integration, Redis distributed locking, and unit testing",
        "Resume polishing, GitHub README documentation & Behavioral round preparation"
      ],
      deliverables: [
        "Deploy 1 production-ready full-stack or systems project with live demo URL",
        "Add automated unit test suite with >80% coverage to your flagship repo",
        "Complete 3 full-loop mock interview simulations (OA + Tech 1 + Tech 2 + HR)"
      ],
      suggestedResources: [
        { name: "HackerRank Interview Preparation Kit", url: "https://www.hackerrank.com/interview/interview-preparation-kit" },
        { name: "Pramp / Exponent Free Mock Interview Exchange", url: "https://www.pramp.com" }
      ]
    }
  ];
}

/**
 * Generate human-readable executive summary
 */
function generateExecutiveSummary(score, missingSkills, companyFits) {
  const topCompany = companyFits[0] ? companyFits[0].company : "Top Tech Recruiter";
  const topGaps = missingSkills.slice(0, 2).map(s => s.name).join(" and ");

  if (score >= 80) {
    return `You're in the top readiness bracket (${score}%) with strong core alignment. You are an immediate match for ${topCompany}'s SDE profile. To secure Day-1 offers, sharpen ${topGaps || "System Design and Concurrency"}.`;
  } else if (score >= 60) {
    return `You have a solid foundation (${score}% ready), but closing gaps in ${topGaps || "System Design and SQL"} will elevate your fit for tier-1 recruiters like ${topCompany} within 4 to 6 weeks.`;
  } else {
    return `Your current profile readiness is ${score}%. Prioritize the 6-week roadmap focusing on ${topGaps || "Core DSA & Database Systems"} to unlock top-tier tech opportunities.`;
  }
}
