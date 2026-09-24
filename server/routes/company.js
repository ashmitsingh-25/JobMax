import express from "express";
import multer from "multer";
import pdfParse from "pdf-parse";
import { CANDIDATE_PROFILES } from "../data/candidateProfiles.js";
import { rankCandidatesForRole } from "../services/candidateRanker.js";
import { extractSkillsFromText } from "../services/skillExtractor.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// In-memory company open roles
let companyRolesState = [
  {
    id: "role-1",
    companyId: "user-company-1",
    companyName: "Microsoft",
    title: "Software Engineer - Azure Core & Systems",
    location: "Bengaluru / Hyderabad (Hybrid)",
    experienceLevel: "0-3 Years",
    minExperience: 0,
    maxExperience: 3,
    ctcBand: "₹38.0 - 46.0 LPA",
    minCgpa: 7.5,
    mandatorySkills: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Operating Systems",
      "Database Management Systems",
      "C++"
    ],
    optionalSkills: [
      "System Design Fundamentals",
      "Docker & Containerization",
      "PostgreSQL"
    ],
    status: "Active",
    applicantsCount: 28,
    createdAt: "2026-09-20"
  },
  {
    id: "role-2",
    companyId: "user-company-1",
    companyName: "Microsoft",
    title: "Full Stack Engineer - Teams & Collaboration",
    location: "Bengaluru, India",
    experienceLevel: "1-4 Years",
    minExperience: 1,
    maxExperience: 4,
    ctcBand: "₹34.0 - 44.0 LPA",
    minCgpa: 7.0,
    mandatorySkills: [
      "React.js",
      "TypeScript",
      "Node.js",
      "RESTful API Design"
    ],
    optionalSkills: [
      "GraphQL",
      "Tailwind CSS",
      "Web Performance & SEO",
      "Redis"
    ],
    status: "Active",
    applicantsCount: 42,
    createdAt: "2026-09-22"
  },
  {
    id: "role-3",
    companyId: "user-company-2",
    companyName: "Stripe",
    title: "Backend Platform Engineer - Global Ledger",
    location: "Bengaluru / Remote",
    experienceLevel: "1-5 Years",
    minExperience: 1,
    maxExperience: 5,
    ctcBand: "₹45.0 - 62.0 LPA",
    minCgpa: 7.5,
    mandatorySkills: [
      "Java",
      "SQL Query Optimization",
      "System Design Fundamentals",
      "Database Sharding & Replication",
      "Microservices Architecture"
    ],
    optionalSkills: [
      "Message Queues & Streaming",
      "Redis",
      "Kubernetes",
      "Go"
    ],
    status: "Active",
    applicantsCount: 19,
    createdAt: "2026-09-23"
  }
];

// 1. Get all company open roles
router.get("/roles", (req, res) => {
  res.json({
    success: true,
    totalRoles: companyRolesState.length,
    roles: companyRolesState
  });
});

// 2. Create a new open role
router.post("/roles", (req, res) => {
  const {
    title,
    companyName = "Tech Corp",
    location,
    ctcBand,
    experienceLevel,
    minCgpa,
    mandatorySkills = [],
    optionalSkills = []
  } = req.body;

  if (!title || mandatorySkills.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Role title and at least one mandatory skill are required."
    });
  }

  const newRole = {
    id: `role-${Date.now()}`,
    companyId: "user-company-custom",
    companyName,
    title,
    location: location || "Bengaluru / Remote",
    experienceLevel: experienceLevel || "0-3 Years",
    minExperience: 0,
    maxExperience: 3,
    ctcBand: ctcBand || "₹24.0 - 36.0 LPA",
    minCgpa: parseFloat(minCgpa) || 7.0,
    mandatorySkills,
    optionalSkills,
    status: "Active",
    applicantsCount: 0,
    createdAt: new Date().toISOString().split("T")[0]
  };

  companyRolesState.unshift(newRole);

  res.json({
    success: true,
    message: "Role posted successfully",
    role: newRole
  });
});

// 3. Company Skill Gap Analyzer: Compare open role against registered candidate talent pool
router.post("/analyze-gap", (req, res) => {
  try {
    const { roleId, customRoleRequirements } = req.body;

    let roleRequirement = null;
    if (roleId) {
      roleRequirement = companyRolesState.find(r => r.id === roleId);
    }
    if (!roleRequirement && customRoleRequirements) {
      roleRequirement = customRoleRequirements;
    }

    if (!roleRequirement) {
      roleRequirement = companyRolesState[0];
    }

    const analysisResult = rankCandidatesForRole(roleRequirement, CANDIDATE_PROFILES);

    res.json({
      success: true,
      role: roleRequirement,
      totalCandidatesInPool: CANDIDATE_PROFILES.length,
      talentPoolAnalytics: analysisResult.talentPoolAnalytics,
      topCandidateMatches: analysisResult.rankedCandidates.slice(0, 5)
    });
  } catch (error) {
    console.error("Company gap analysis error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. AI-Powered Candidate Sourcing & Shortlisting Engine
router.post("/source-candidates", (req, res) => {
  try {
    const { roleId, customRoleRequirements, filterCollegeTier, minScore = 0 } = req.body;

    let role = null;
    if (roleId) {
      role = companyRolesState.find(r => r.id === roleId);
    }
    if (!role && customRoleRequirements) {
      role = customRoleRequirements;
    }
    if (!role) {
      role = companyRolesState[0];
    }

    let candidatePool = [...CANDIDATE_PROFILES];
    if (filterCollegeTier && filterCollegeTier !== "all") {
      candidatePool = candidatePool.filter(c => c.collegeTier === filterCollegeTier);
    }

    const ranking = rankCandidatesForRole(role, candidatePool);

    const filteredRanked = ranking.rankedCandidates.filter(c => c.fitScore >= minScore);

    res.json({
      success: true,
      roleTitle: role.title,
      totalSourced: filteredRanked.length,
      candidates: filteredRanked,
      talentPoolAnalytics: ranking.talentPoolAnalytics
    });
  } catch (error) {
    console.error("Candidate sourcing error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 5. Recruiter Batch Resume Upload & Ranking
router.post("/batch-resume-upload", upload.array("resumes", 10), async (req, res) => {
  try {
    const { roleId } = req.body;
    const role = companyRolesState.find(r => r.id === roleId) || companyRolesState[0];

    const parsedBatch = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        let text = "";
        if (file.mimetype === "application/pdf") {
          try {
            const pdf = await pdfParse(file.buffer);
            text = pdf.text;
          } catch (e) {
            text = file.buffer.toString("utf-8");
          }
        } else {
          text = file.buffer.toString("utf-8");
        }

        const extracted = extractSkillsFromText(text);
        parsedBatch.push({
          id: `batch-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          name: file.originalname.replace(/\.[^/.]+$/, ""),
          email: `${file.originalname.replace(/\s+/g, '.').toLowerCase()}@applicant.io`,
          college: "Uploaded Batch Applicant",
          collegeTier: "Tier 1",
          graduationYear: 2026,
          yearsOfExperience: extracted.metadata.detectedYoE || 0,
          cgpa: extracted.metadata.detectedCgpa || 8.0,
          skills: extracted.extractedSkills,
          projects: [],
          status: "Batch Uploaded Candidate",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
        });
      }
    }

    // Rank the batch candidates
    const ranking = rankCandidatesForRole(role, parsedBatch.length > 0 ? parsedBatch : CANDIDATE_PROFILES);

    res.json({
      success: true,
      message: `Successfully processed and ranked ${ranking.rankedCandidates.length} candidate resumes against "${role.title}".`,
      roleTitle: role.title,
      rankedCandidates: ranking.rankedCandidates
    });
  } catch (error) {
    console.error("Batch resume error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
