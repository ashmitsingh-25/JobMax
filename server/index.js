import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import developerRoutes from "./routes/developer.js";
import companyRoutes from "./routes/company.js";
import placementRoutes from "./routes/placement.js";
import jobsRoutes from "./routes/jobs.js";
import { SKILLS_TAXONOMY, ALL_SKILLS_FLAT } from "./data/skillsTaxonomy.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// Route registrations
app.use("/api/auth", authRoutes);
app.use("/api/developer", developerRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/placement", placementRoutes);
app.use("/api/jobs", jobsRoutes);

// Skills taxonomy lookup API
app.get("/api/skills-taxonomy", (req, res) => {
  res.json({
    success: true,
    taxonomy: SKILLS_TAXONOMY,
    allSkills: ALL_SKILLS_FLAT.map(s => s.name)
  });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    platform: "JobMax Full-Stack AI Skill-Gap Engine",
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`=============================================`);
    console.log(`🚀 JobMax Backend Server running on http://localhost:${PORT}`);
    console.log(`🎯 AI Skill Gap Analyzer & Candidate Sourcing active`);
    console.log(`=============================================`);
  });
}

export default app;

