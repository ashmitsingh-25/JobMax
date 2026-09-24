import express from "express";
import { COLLEGES, HISTORICAL_PLACEMENT_RECORDS } from "../data/placementRecords.js";

const router = express.Router();

// In-memory placement records (allows adding new crowdsourced records)
let placementRecordsState = [...HISTORICAL_PLACEMENT_RECORDS];

// List all colleges
router.get("/colleges", (req, res) => {
  res.json({
    success: true,
    colleges: COLLEGES
  });
});

// Get historical placement records (with college filter & search)
router.get("/records", (req, res) => {
  const { collegeId, search } = req.query;

  let records = [...placementRecordsState];

  if (collegeId && collegeId !== "all" && collegeId !== "other") {
    records = records.filter(r => r.collegeId === collegeId);
  }

  if (search) {
    const s = search.toLowerCase();
    records = records.filter(r => 
      r.company.toLowerCase().includes(s) || 
      r.role.toLowerCase().includes(s) ||
      (r.demandedSkills || []).some(sk => sk.name.toLowerCase().includes(s))
    );
  }

  // Calculate college campus metrics
  const totalOffers = records.reduce((sum, r) => sum + (r.offersLastYear || 10), 0);
  const totalRecruiters = records.length;

  res.json({
    success: true,
    totalRecruiters,
    totalOffers,
    records
  });
});

// Add crowdsourced placement record (by student or placement cell)
router.post("/records", (req, res) => {
  const {
    collegeId,
    company,
    role,
    ctcBand,
    cgpaCutoff,
    demandedSkills = [],
    rounds = [],
    offersLastYear
  } = req.body;

  if (!company || !role) {
    return res.status(400).json({ success: false, message: "Company and Role are required" });
  }

  const newRecord = {
    id: `rec-${Date.now()}`,
    collegeId: collegeId || "other",
    company,
    companyLogo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&auto=format&fit=crop&q=60",
    role,
    ctcBand: ctcBand || "₹18.0 - 25.0 LPA",
    baseSalary: "₹14 LPA",
    visitFrequency: "Crowdsourced 2026 Batch Record",
    hiringBatch: "2025 - 2026",
    cgpaCutoff: parseFloat(cgpaCutoff) || 7.0,
    eligibleBranches: ["CS", "IT", "Circuital"],
    offersLastYear: parseInt(offersLastYear) || 12,
    rounds: rounds.length > 0 ? rounds : [
      { name: "Online Test", description: "DSA & Problem Solving" },
      { name: "Technical Interview", description: "Core CS Fundamentals & System Concepts" }
    ],
    demandedSkills: demandedSkills.map(s => ({
      name: typeof s === 'string' ? s : s.name,
      frequency: 85,
      mandatory: true,
      category: "Core"
    })),
    recommendedProjects: [
      `${company} Relevant Microservices / Distributed Systems Prototype`,
      "Scalable REST API with Unit Tests and Docker Setup"
    ]
  };

  placementRecordsState.unshift(newRecord);

  res.json({
    success: true,
    message: "Placement record contributed successfully",
    record: newRecord
  });
});

export default router;
