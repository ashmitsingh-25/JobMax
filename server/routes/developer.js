import express from "express";
import multer from "multer";
import pdfParse from "pdf-parse";
import { extractSkillsFromText } from "../services/skillExtractor.js";
import { analyzePlacementReadiness } from "../services/gapAnalyzer.js";
import { analyzeCareerGrowth } from "../services/growthAdvisor.js";
import { CANDIDATE_PROFILES } from "../data/candidateProfiles.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// In-memory developer profile storage for active session
let activeDeveloperProfiles = {};

// 1. Resume & Skill Extraction Endpoint (Supports PDF upload or raw text payload)
router.post("/upload-resume", upload.single("resumeFile"), async (req, res) => {
  try {
    let extractedText = "";

    if (req.file) {
      if (req.file.mimetype === "application/pdf") {
        try {
          const pdfData = await pdfParse(req.file.buffer);
          extractedText = pdfData.text || "";
        } catch (pdfErr) {
          console.warn("PDF parse fallback to buffer text:", pdfErr.message);
          extractedText = req.file.buffer.toString("utf-8");
        }
      } else {
        // Plain text or markdown or docx fallback
        extractedText = req.file.buffer.toString("utf-8");
      }
    } else if (req.body.resumeText) {
      extractedText = req.body.resumeText;
    }

    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "No readable resume content or text provided. Please upload a valid PDF or paste text."
      });
    }

    // Run NLP Skill Extraction Engine
    const extractionResult = extractSkillsFromText(extractedText);

    res.json({
      success: true,
      message: `Successfully extracted ${extractionResult.totalSkillsCount} technical skills from resume.`,
      extractedSkills: extractionResult.extractedSkills,
      skillDetails: extractionResult.skillDetails,
      totalSkillsCount: extractionResult.totalSkillsCount,
      metadata: extractionResult.metadata,
      previewSnippet: extractedText.slice(0, 300) + "..."
    });
  } catch (error) {
    console.error("Resume extraction error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. AI Bot #1: On-Campus Placement Readiness Analyzer
router.post("/analyze-oncampus", (req, res) => {
  try {
    const { studentProfile, collegeId = "iit-delhi" } = req.body;

    if (!studentProfile || !studentProfile.skills) {
      return res.status(400).json({ success: false, message: "Student skills profile is required" });
    }

    const report = analyzePlacementReadiness(studentProfile, {
      collegeId,
      targetType: "on-campus"
    });

    res.json({
      success: true,
      report
    });
  } catch (error) {
    console.error("On-campus analysis error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. AI Bot #1 (Off-Campus Variant): Market Placement Readiness Analyzer
router.post("/analyze-offcampus", (req, res) => {
  try {
    const { studentProfile } = req.body;

    if (!studentProfile || !studentProfile.skills) {
      return res.status(400).json({ success: false, message: "Student skills profile is required" });
    }

    const report = analyzePlacementReadiness(studentProfile, {
      targetType: "off-campus"
    });

    res.json({
      success: true,
      report
    });
  } catch (error) {
    console.error("Off-campus analysis error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. AI Bot #2: Career Growth & Promotion Advisor for Experienced Track
router.post("/career-growth", (req, res) => {
  try {
    const { devProfile } = req.body;

    if (!devProfile) {
      return res.status(400).json({ success: false, message: "Developer profile is required" });
    }

    const growthReport = analyzeCareerGrowth(devProfile);

    res.json({
      success: true,
      growthReport
    });
  } catch (error) {
    console.error("Career growth error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 5. Get Developer Profile
router.get("/profile/:userId", (req, res) => {
  const { userId } = req.params;
  const profile = activeDeveloperProfiles[userId] || CANDIDATE_PROFILES.find(c => c.id === userId) || CANDIDATE_PROFILES[0];
  res.json({ success: true, profile });
});

// 6. Update Developer Profile
router.post("/profile/:userId", (req, res) => {
  const { userId } = req.params;
  activeDeveloperProfiles[userId] = {
    ...activeDeveloperProfiles[userId],
    ...req.body,
    id: userId,
    updatedAt: new Date().toISOString()
  };
  res.json({ success: true, profile: activeDeveloperProfiles[userId] });
});

export default router;
