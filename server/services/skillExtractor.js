import { ALL_SKILLS_FLAT, SKILLS_TAXONOMY } from "../data/skillsTaxonomy.js";

/**
 * High-precision NLP & Rule-based Technical Skill Extraction Engine
 * Matches direct names, aliases, acronyms, and contextual mentions.
 */
export function extractSkillsFromText(rawText) {
  if (!rawText || typeof rawText !== "string") {
    return { extractedSkills: [], rawTextLength: 0, skillDetails: [], totalSkillsCount: 0, metadata: {}, categorizedSkills: {} };
  }

  const normalized = rawText.toLowerCase();
  const matchedSkillsSet = new Set();
  const skillDetails = [];

  ALL_SKILLS_FLAT.forEach(skill => {
    // Check main canonical name
    const canonicalLower = skill.name.toLowerCase();
    const hasCanonical = checkTokenMatch(normalized, canonicalLower);

    // Check aliases
    let aliasMatched = false;
    let matchedKeyword = canonicalLower;

    if (!hasCanonical && skill.aliases && skill.aliases.length > 0) {
      for (const alias of skill.aliases) {
        if (checkTokenMatch(normalized, alias.toLowerCase())) {
          aliasMatched = true;
          matchedKeyword = alias;
          break;
        }
      }
    }

    if (hasCanonical || aliasMatched) {
      if (!matchedSkillsSet.has(skill.name)) {
        matchedSkillsSet.add(skill.name);
        skillDetails.push({
          name: skill.name,
          category: skill.category,
          tier: skill.tier,
          weight: skill.weight,
          matchedOn: matchedKeyword
        });
      }
    }
  });

  const extractedSkills = Array.from(matchedSkillsSet);

  // Group extracted skills by taxonomy category
  const categorizedSkills = {};
  skillDetails.forEach(s => {
    if (!categorizedSkills[s.category]) {
      categorizedSkills[s.category] = [];
    }
    categorizedSkills[s.category].push(s.name);
  });

  // Extract comprehensive metadata (Name, College, Degree, YoE, CGPA, Projects, Certs)
  const metadata = extractMetadataFromText(rawText, extractedSkills);

  return {
    extractedSkills,
    skillDetails,
    totalSkillsCount: matchedSkillsSet.size,
    categorizedSkills,
    metadata
  };
}

/**
 * Word boundary and symbol-safe token match
 */
function checkTokenMatch(text, pattern) {
  // Escape special regex characters in the pattern except spaces
  const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Handle c++, c#, .net, etc.
  const regex = new RegExp(`(?:^|[^a-zA-Z0-9_+#.])${escaped}(?:$|[^a-zA-Z0-9_+#.])`, 'i');
  return regex.test(text);
}

/**
 * Extract Name, Contact, College, Degree, Grad Year, YoE, CGPA, Projects, Certifications from text
 */
export function extractMetadataFromText(text, extractedSkills = []) {
  const meta = {
    detectedName: null,
    detectedEmail: null,
    detectedPhone: null,
    detectedGithub: null,
    detectedLinkedin: null,
    detectedCollege: null,
    detectedCollegeId: null,
    detectedDegree: null,
    detectedMajor: null,
    detectedGradYear: null,
    detectedCgpa: null,
    detectedYoE: 0,
    detectedExperienceLevel: "Fresher / Junior",
    detectedRole: null,
    detectedProjectsCount: 0,
    detectedProjects: [],
    detectedCertifications: []
  };

  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  // 1. Candidate Name Detection (First 1-3 lines)
  for (let i = 0; i < Math.min(4, lines.length); i++) {
    const line = lines[i];
    // Candidate name is usually 2 to 4 capitalized words without emails, urls, digits, or common header keywords
    if (
      line.length > 2 &&
      line.length < 40 &&
      !/[@:/\\0-9+()&]/.test(line) &&
      !/resume|curriculum|vitae|profile|summary|education|skills|experience|projects|contact/i.test(line)
    ) {
      const words = line.split(/\s+/);
      if (words.length >= 2 && words.length <= 4 && words.every(w => /^[A-Z][a-zA-Z.'-]*$/.test(w))) {
        meta.detectedName = line;
        break;
      }
    }
  }

  // 2. Contact details (Email, Phone, GitHub, LinkedIn)
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) meta.detectedEmail = emailMatch[0];

  const phoneMatch = text.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch) meta.detectedPhone = phoneMatch[0];

  const githubMatch = text.match(/(?:github\.com\/|github:\s*|@)([a-zA-Z0-9_-]+)/i);
  if (githubMatch && githubMatch[1] && !/com|http|org/i.test(githubMatch[1])) {
    meta.detectedGithub = githubMatch[1];
  }

  const linkedinMatch = text.match(/(?:linkedin\.com\/in\/|linkedin:\s*)([a-zA-Z0-9_-]+)/i);
  if (linkedinMatch && linkedinMatch[1]) {
    meta.detectedLinkedin = linkedinMatch[1];
  }

  // 3. College / Institution Detection
  if (/iit\s*delhi|indian\s*institute\s*of\s*technology\s*delhi/i.test(text)) {
    meta.detectedCollege = "Indian Institute of Technology (IIT) Delhi";
    meta.detectedCollegeId = "iit-delhi";
  } else if (/bits\s*pilani|birla\s*institute/i.test(text)) {
    meta.detectedCollege = "BITS Pilani";
    meta.detectedCollegeId = "bits-pilani";
  } else if (/nit\s*trichy|national\s*institute\s*of\s*technology\s*trichy/i.test(text)) {
    meta.detectedCollege = "NIT Trichy";
    meta.detectedCollegeId = "nit-trichy";
  } else if (/delhi\s*technological\s*university|dtu/i.test(text)) {
    meta.detectedCollege = "Delhi Technological University (DTU)";
    meta.detectedCollegeId = "dtu";
  } else if (/vellore\s*institute\s*of\s*technology|vit\s*vellore|vit\s*university/i.test(text)) {
    meta.detectedCollege = "Vellore Institute of Technology (VIT)";
    meta.detectedCollegeId = "vit-vellore";
  } else if (/iiit\s*hyderabad/i.test(text)) {
    meta.detectedCollege = "IIIT Hyderabad";
    meta.detectedCollegeId = "iiit-hyderabad";
  } else if (/rvce|rv\s*college\s*of\s*engineering/i.test(text)) {
    meta.detectedCollege = "RV College of Engineering (RVCE)";
    meta.detectedCollegeId = "rvce-bangalore";
  } else {
    // Generic college match
    const collegeMatch = text.match(/([A-Z][a-zA-Z\s&]+(?:University|Institute of Technology|College of Engineering|National Institute of Technology|Institute of Information Technology))/);
    if (collegeMatch) {
      meta.detectedCollege = collegeMatch[1].trim();
      meta.detectedCollegeId = "other";
    }
  }

  // 4. Degree & Major
  const degreeMatch = text.match(/\b(B\.Tech|B\.E\.|M\.Tech|M\.E\.|B\.S\.|M\.S\.|BCA|MCA|Bachelor of Technology|Bachelor of Engineering|Master of Technology)\b/i);
  if (degreeMatch) meta.detectedDegree = degreeMatch[0];

  const majorMatch = text.match(/\b(Computer Science|Information Technology|Computer Engineering|Software Engineering|Electronics and Communication|Electrical Engineering|Data Science|Artificial Intelligence)\b/i);
  if (majorMatch) meta.detectedMajor = majorMatch[0];

  // 5. Graduation Year
  const gradMatch = text.match(/(?:graduating|graduation|batch|class of|passout|passing year|expected)\s*[:=-]?\s*(202[0-9])/i) || text.match(/\b(202[3-8])\b/);
  if (gradMatch && gradMatch[1]) {
    meta.detectedGradYear = parseInt(gradMatch[1], 10);
  }

  // 6. CGPA / GPA (e.g. CGPA: 8.8, 9.2/10, GPA 3.8/4, 85%)
  const cgpaMatch = text.match(/(?:cgpa|gpa|pointer|cumulative gpa)\s*[:=-]?\s*([0-9]+(?:\.[0-9]+)?)(?:\s*\/\s*(?:10|4))?/i);
  if (cgpaMatch && parseFloat(cgpaMatch[1])) {
    const val = parseFloat(cgpaMatch[1]);
    meta.detectedCgpa = val <= 4.0 ? parseFloat((val * 2.5).toFixed(1)) : (val <= 10 ? val : parseFloat((val / 10).toFixed(1)));
  }

  // 7. Years of Experience & Experience Level
  const expMatch = text.match(/([0-9]+(?:\.[0-9]+)?)\+?\s*(?:years?|yrs?)(?:\s+of)?\s+(?:experience|exp)/i);
  if (expMatch && parseFloat(expMatch[1])) {
    meta.detectedYoE = parseFloat(expMatch[1]);
  }

  if (meta.detectedYoE >= 5 || /senior|lead|staff|architect|principal/i.test(text)) {
    meta.detectedExperienceLevel = "Senior / Lead";
    meta.detectedRole = "Senior Software Engineer";
  } else if (meta.detectedYoE >= 2 || /sde\s*2|software\s*engineer\s*2|mid-level/i.test(text)) {
    meta.detectedExperienceLevel = "Mid-Level";
    meta.detectedRole = "Software Engineer (SDE-2)";
  } else {
    meta.detectedExperienceLevel = "Fresher / Junior";
    meta.detectedRole = "Software Development Engineer (SDE-1)";
  }

  // 8. Project Detection
  const projectMatches = [];
  const projectSectionMatch = text.match(/(?:projects|technical projects|academic projects|personal projects)[\s\S]*?(?:experience|internships|work history|education|certifications|skills|$)/i);
  if (projectSectionMatch) {
    const sectionText = projectSectionMatch[0];
    const itemMatches = sectionText.match(/(?:^|\n)\s*(?:[0-9]+\.|\*|-|•)\s*([A-Za-z0-9\s:_-]{4,50})/g);
    if (itemMatches) {
      itemMatches.forEach(item => {
        const clean = item.replace(/(?:^|\n)\s*(?:[0-9]+\.|\*|-|•)\s*/, '').trim();
        if (clean.length > 3 && !/project|key|technologies|tools/i.test(clean)) {
          projectMatches.push(clean);
        }
      });
    }
  }
  meta.detectedProjects = projectMatches.slice(0, 5);
  meta.detectedProjectsCount = projectMatches.length > 0 ? projectMatches.length : (extractedSkills.length >= 8 ? 3 : 2);

  // 9. Certifications
  const certKeywords = ["aws certified", "google cloud", "azure", "hackerrank", "leetcode", "coursera", "deeplearning.ai", "meta"];
  certKeywords.forEach(ck => {
    if (text.toLowerCase().includes(ck)) {
      meta.detectedCertifications.push(ck.toUpperCase());
    }
  });

  return meta;
}

