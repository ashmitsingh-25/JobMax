import express from "express";
import { OFF_CAMPUS_JOB_POSTINGS, getAggregateMarketDemand } from "../data/jobPostings.js";

const router = express.Router();

let jobsState = [...OFF_CAMPUS_JOB_POSTINGS];

// List off-campus job postings with search and filters
router.get("/", (req, res) => {
  const { search, experience, domain, skill } = req.query;

  let filtered = [...jobsState];

  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(j => 
      j.company.toLowerCase().includes(s) ||
      j.role.toLowerCase().includes(s) ||
      j.description.toLowerCase().includes(s) ||
      j.requiredSkills.some(sk => sk.name.toLowerCase().includes(s))
    );
  }

  if (experience) {
    filtered = filtered.filter(j => j.experienceLevel.toLowerCase().includes(experience.toLowerCase()));
  }

  if (domain) {
    filtered = filtered.filter(j => j.domain.toLowerCase().includes(domain.toLowerCase()));
  }

  if (skill) {
    filtered = filtered.filter(j => 
      j.requiredSkills.some(sk => sk.name.toLowerCase().includes(skill.toLowerCase()))
    );
  }

  res.json({
    success: true,
    totalJobs: filtered.length,
    jobs: filtered
  });
});

// Get aggregated market tech demand
router.get("/market-demand", (req, res) => {
  const demandStats = getAggregateMarketDemand();
  res.json({
    success: true,
    totalJobsAnalyzed: jobsState.length,
    demandStats
  });
});

// Post a new off-campus job
router.post("/", (req, res) => {
  const { company, role, location, ctcBand, experienceLevel, description, requiredSkills = [] } = req.body;

  const newJob = {
    id: `job-${Date.now()}`,
    company: company || "High-Growth Startup",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=60",
    role: role || "Software Engineer",
    location: location || "Remote / Bengaluru",
    experienceRequired: "0-2 Years",
    experienceLevel: experienceLevel || "Fresher / Junior",
    ctcBand: ctcBand || "₹22.0 - 30.0 LPA",
    workType: "Hybrid",
    postedDate: "Just now",
    applicantsCount: 1,
    domain: "Software & Cloud",
    description: description || "Join our fast-growing engineering team building scalable systems.",
    requiredSkills: requiredSkills.map(s => ({
      name: typeof s === 'string' ? s : s.name,
      mandatory: true,
      category: "Tech"
    })),
    goodToHaveSkills: ["Docker", "Git", "Clean Code"]
  };

  jobsState.unshift(newJob);

  res.json({
    success: true,
    message: "Job posted successfully",
    job: newJob
  });
});

export default router;
