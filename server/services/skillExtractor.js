import { ALL_SKILLS_FLAT } from "../data/skillsTaxonomy.js";

/**
 * High-precision NLP & Rule-based Technical Skill Extraction Engine
 * Matches direct names, aliases, acronyms, and contextual mentions.
 */
export function extractSkillsFromText(rawText) {
  if (!rawText || typeof rawText !== "string") {
    return { extractedSkills: [], rawTextLength: 0, stats: {} };
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

  // Extract metadata (Years of Experience, CGPA, Education)
  const metadata = extractMetadataFromText(rawText);

  return {
    extractedSkills: Array.from(matchedSkillsSet),
    skillDetails,
    totalSkillsCount: matchedSkillsSet.size,
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
 * Extract YoE, CGPA, Degree, Role from text
 */
function extractMetadataFromText(text) {
  const meta = {
    detectedYoE: 0,
    detectedCgpa: null,
    detectedRole: null,
    detectedEducation: null
  };

  // Extract CGPA / GPA (e.g. CGPA: 8.8, 9.2/10, GPA 3.8/4)
  const cgpaMatch = text.match(/(?:cgpa|gpa|pointer|percentage)\s*[:=-]?\s*([0-9]+(?:\.[0-9]+)?)(?:\s*\/\s*10|\s*\/\s*4)?/i);
  if (cgpaMatch && parseFloat(cgpaMatch[1])) {
    const val = parseFloat(cgpaMatch[1]);
    meta.detectedCgpa = val <= 10 ? val : (val / 10).toFixed(1);
  }

  // Extract Years of Experience
  const expMatch = text.match(/([0-9]+(?:\.[0-9]+)?)\+?\s*(?:years?|yrs?)(?:\s+of)?\s+(?:experience|exp)/i);
  if (expMatch && parseFloat(expMatch[1])) {
    meta.detectedYoE = parseFloat(expMatch[1]);
  }

  // Role detection
  if (/senior|lead|staff|architect|principal/i.test(text)) {
    meta.detectedRole = "Senior / Lead Developer";
  } else if (/fresher|undergraduate|student|intern|b\.tech|b\.e\./i.test(text)) {
    meta.detectedRole = "Fresher / Junior";
  } else if (/sde\s*2|software\s*engineer\s*2|mid-level/i.test(text)) {
    meta.detectedRole = "Mid-Level Software Engineer";
  }

  return meta;
}
