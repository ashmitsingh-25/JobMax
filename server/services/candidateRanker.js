import { CANDIDATE_PROFILES } from "../data/candidateProfiles.js";

/**
 * Company Portal: Candidate Ranking & Talent Pool Gap Analysis Engine
 */
export function rankCandidatesForRole(roleRequirement, customCandidatePool = null) {
  const candidates = customCandidatePool || CANDIDATE_PROFILES;
  const {
    title = "Software Engineer",
    mandatorySkills = [],
    optionalSkills = [],
    minCgpa = 7.0,
    minExperience = 0,
    maxExperience = 5
  } = roleRequirement;

  const normalizedMandatory = (mandatorySkills || []).map(s => s.toLowerCase().trim());
  const normalizedOptional = (optionalSkills || []).map(s => s.toLowerCase().trim());

  // Rank each candidate
  const rankedCandidates = candidates.map(cand => {
    const candSkills = (cand.skills || []).map(s => s.toLowerCase().trim());

    // 1. Mandatory match
    let mandatoryMatches = 0;
    const matchedMandatoryList = [];
    const missingMandatoryList = [];

    normalizedMandatory.forEach(req => {
      const match = candSkills.some(cs => cs.includes(req) || req.includes(cs));
      if (match) {
        mandatoryMatches++;
        matchedMandatoryList.push(req);
      } else {
        missingMandatoryList.push(req);
      }
    });

    const mandatoryScore = normalizedMandatory.length > 0 
      ? (mandatoryMatches / normalizedMandatory.length) * 60 
      : 60;

    // 2. Optional match
    let optionalMatches = 0;
    const matchedOptionalList = [];
    const missingOptionalList = [];

    normalizedOptional.forEach(req => {
      const match = candSkills.some(cs => cs.includes(req) || req.includes(cs));
      if (match) {
        optionalMatches++;
        matchedOptionalList.push(req);
      } else {
        missingOptionalList.push(req);
      }
    });

    const optionalScore = normalizedOptional.length > 0 
      ? (optionalMatches / normalizedOptional.length) * 20 
      : 20;

    // 3. Experience & CGPA score
    let expCgpaScore = 20;
    if (cand.cgpa && cand.cgpa < minCgpa) {
      expCgpaScore -= 8;
    }
    if (cand.yearsOfExperience < minExperience) {
      expCgpaScore -= 10;
    }
    expCgpaScore = Math.max(5, expCgpaScore);

    const totalFitScore = Math.min(99, Math.max(10, Math.round(mandatoryScore + optionalScore + expCgpaScore)));

    // Generate targeted interview questions based on missing/weak skills
    const customInterviewQuestions = generateInterviewQuestionsForGaps(missingMandatoryList, cand);

    return {
      ...cand,
      fitScore: totalFitScore,
      matchedSkills: [...matchedMandatoryList, ...matchedOptionalList],
      missingSkills: missingMandatoryList,
      matchedCount: mandatoryMatches + optionalMatches,
      missingCount: missingMandatoryList.length,
      customInterviewQuestions
    };
  });

  // Sort by fit score descending
  rankedCandidates.sort((a, b) => b.fitScore - a.fitScore);

  // Compute aggregate talent pool analytics
  const talentPoolAnalytics = computeTalentPoolGapAnalytics(roleRequirement, candidates);

  return {
    roleTitle: title,
    totalCandidatesEvaluated: candidates.length,
    rankedCandidates,
    talentPoolAnalytics
  };
}

/**
 * Talent Pool Aggregate Skill Coverage
 */
function computeTalentPoolGapAnalytics(roleRequirement, candidates) {
  const { mandatorySkills = [], optionalSkills = [] } = roleRequirement;
  const allReqSkills = [...mandatorySkills, ...optionalSkills];

  const skillDistribution = allReqSkills.map(skillName => {
    const norm = skillName.toLowerCase().trim();
    const countHaving = candidates.filter(c => 
      (c.skills || []).some(s => s.toLowerCase().includes(norm) || norm.includes(s.toLowerCase()))
    ).length;

    const percentage = Math.round((countHaving / candidates.length) * 100);
    const isMandatory = mandatorySkills.includes(skillName);

    return {
      skillName,
      isMandatory,
      candidatesWithSkill: countHaving,
      percentageCoverage: percentage,
      status: percentage >= 70 ? "Abundant" : (percentage >= 40 ? "Moderate Gap" : "Critical Talent Scarcity")
    };
  });

  const avgFitScore = Math.round(
    candidates.reduce((sum, c) => sum + (c.fitScore || 65), 0) / candidates.length
  );

  return {
    averageCandidateFitScore: avgFitScore,
    skillDistribution,
    readyCandidatesCount: candidates.filter(c => (c.fitScore || 70) >= 80).length,
    upskillingNeededCount: candidates.filter(c => (c.fitScore || 70) < 80).length
  };
}

/**
 * Auto-generate candidate-specific technical interview questions targeting gaps
 */
function generateInterviewQuestionsForGaps(missingSkills, candidate) {
  const questions = [];

  if (missingSkills.some(s => s.includes("sql") || s.includes("database"))) {
    questions.push({
      skill: "Database & SQL Optimization",
      question: "Given a slow analytical query joining 3 tables with 10M rows, how would you use EXPLAIN ANALYZE to identify index bottlenecks and rewrite it?"
    });
  }

  if (missingSkills.some(s => s.includes("system design") || s.includes("microservices") || s.includes("distributed"))) {
    questions.push({
      skill: "System Design & Distributed Scalability",
      question: "Walk me through how you would design an idempotent payment processing API to prevent double-charging during network timeouts."
    });
  }

  if (missingSkills.some(s => s.includes("kafka") || s.includes("queue") || s.includes("message"))) {
    questions.push({
      skill: "Message Queues & Event Streaming",
      question: "How do you handle message re-delivery, poison pills, and consumer group rebalancing in Kafka?"
    });
  }

  if (missingSkills.some(s => s.includes("redis") || s.includes("caching"))) {
    questions.push({
      skill: "In-Memory Caching",
      question: "Explain the differences between Cache-Aside, Write-Through, and Write-Back strategies, and how you prevent Cache Stampede."
    });
  }

  // Default question if no specific gaps
  if (questions.length === 0) {
    questions.push({
      skill: "Core Architecture & Concurrency",
      question: "Describe the toughest concurrency bug or race condition you have debugged in past projects."
    });
  }

  return questions;
}
