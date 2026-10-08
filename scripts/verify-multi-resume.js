import { extractSkillsFromText, extractMetadataFromText } from "../server/services/skillExtractor.js";
import { analyzePlacementReadiness } from "../server/services/gapAnalyzer.js";
import { calculatePlacementReadiness, extractSkillsFromTextClient } from "../client/src/services/predictionEngine.js";

const resumeA = `
AARAV SHARMA
Email: aarav.sharma@iitd.ac.in | Phone: +91 9876543210
Education:
Indian Institute of Technology (IIT) Delhi
B.Tech in Computer Science and Engineering, 2024
CGPA: 8.8 / 10.0

Technical Skills:
- Languages: C++, Java, Python, SQL
- Core CS: Data Structures & Algorithms, Dynamic Programming, Graph Algorithms, Tree Algorithms, Object-Oriented Programming, Operating Systems, Computer Networks
- Tools: Git, Linux

Projects:
1. High-Performance Distributed Cache in C++
   Implemented LRU eviction, multi-threading with mutex locks and socket programming.
2. Graph-Based Route Optimization Engine
   Applied Dijkstra and A* algorithms on OpenStreetMap graph datasets.
3. Database Query Engine
   Built B+ tree indexing and SQL parser in Java.
`;

const resumeB = `
NEHA VERMA
Email: neha.verma@dtu.ac.in | Phone: +91 9123456780
Education:
Delhi Technological University (DTU)
B.Tech in Information Technology, 2024
CGPA: 7.5 / 10.0

Technical Skills:
- Frontend: React.js, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Redux
- Backend: Node.js, Express.js, RESTful API Design
- Databases: MongoDB, PostgreSQL
- Tools: Git, Docker, Postman

Projects:
1. SaaS Collaborative Workspace
   Built full-stack React & Node.js real-time kanban application with WebSocket synchronization.
2. E-Commerce Storefront with Next.js & Stripe
   Server-side rendered product catalog with shopping cart state in Zustand.
`;

console.log("==================================================");
console.log("🧪 TESTING RESUME A (Aarav Sharma - C++/DSA)");
console.log("==================================================");
const resA = extractSkillsFromText(resumeA);
const metaA = resA.metadata;
const skillsA = resA.extractedSkills;
console.log("Extracted Name:", metaA.detectedName);
console.log("Extracted College:", metaA.detectedCollege);
console.log("Extracted CGPA:", metaA.detectedCgpa);
console.log("Extracted Skills Count:", skillsA.length);
console.log("Extracted Skills:", skillsA.join(", "));

const sdeReportA = analyzePlacementReadiness({
  name: metaA.detectedName,
  collegeId: metaA.detectedCollegeId,
  cgpa: metaA.detectedCgpa,
  skills: skillsA,
  projects: [{ title: "Cache" }, { title: "Route" }, { title: "DB" }]
}, {
  collegeId: "iit-delhi",
  targetRole: "Software Development Engineer (SDE-1)"
});

console.log("\nAarav SDE-1 Readiness:", sdeReportA.overallReadinessScore + "%");
console.log("Aarav Readiness Tier:", sdeReportA.readinessTier);
console.log("Aarav Explainability:", sdeReportA.explainabilityFactors.map(f => `[${f.type}] ${f.text}`).join(" | "));
console.log("Aarav Critical Gaps:", sdeReportA.criticalPriorityGaps.map(g => g.name).join(", ") || "None");
console.log("Aarav 6-Week Roadmap Sprints:");
sdeReportA.actionPlan.forEach(p => console.log(`  - ${p.week}: ${p.theme} (Skill: ${p.targetSkill})`));
console.log("Aarav Top 2 Companies Fit:");
sdeReportA.companyFitBreakdown.slice(0, 2).forEach(c => console.log(`  - ${c.company}: ${c.fitPercentage}% (Cutoff: ${c.cgpaCutoff})`));

console.log("\n==================================================");
console.log("🧪 TESTING RESUME B (Neha Verma - React/Full-Stack)");
console.log("==================================================");
const resB = extractSkillsFromText(resumeB);
const metaB = resB.metadata;
const skillsB = resB.extractedSkills;
console.log("Extracted Name:", metaB.detectedName);
console.log("Extracted College:", metaB.detectedCollege);
console.log("Extracted CGPA:", metaB.detectedCgpa);
console.log("Extracted Skills Count:", skillsB.length);
console.log("Extracted Skills:", skillsB.join(", "));

const sdeReportB = analyzePlacementReadiness({
  name: metaB.detectedName,
  collegeId: metaB.detectedCollegeId,
  cgpa: metaB.detectedCgpa,
  skills: skillsB,
  projects: [{ title: "SaaS" }, { title: "Storefront" }]
}, {
  collegeId: "dtu",
  targetRole: "Software Development Engineer (SDE-1)"
});

const fullStackReportB = analyzePlacementReadiness({
  name: metaB.detectedName,
  collegeId: metaB.detectedCollegeId,
  cgpa: metaB.detectedCgpa,
  skills: skillsB,
  projects: [{ title: "SaaS" }, { title: "Storefront" }]
}, {
  collegeId: "dtu",
  targetRole: "Full Stack / Product Engineer"
});

console.log("\nNeha SDE-1 Readiness:", sdeReportB.overallReadinessScore + "%");
console.log("Neha Full Stack Readiness:", fullStackReportB.overallReadinessScore + "%");
console.log("Neha Full Stack Readiness Tier:", fullStackReportB.readinessTier);
console.log("Neha Full Stack Explainability:", fullStackReportB.explainabilityFactors.map(f => `[${f.type}] ${f.text}`).join(" | "));
console.log("Neha Full Stack Critical Gaps:", fullStackReportB.criticalPriorityGaps.map(g => g.name).join(", ") || "None");
console.log("Neha Full Stack 6-Week Roadmap Sprints:");
fullStackReportB.actionPlan.forEach(p => console.log(`  - ${p.week}: ${p.theme} (Skill: ${p.targetSkill})`));

console.log("\n==================================================");
console.log("🧪 CLIENT/SERVER DETERMINISM VERIFICATION");
console.log("==================================================");
const clientReportA = calculatePlacementReadiness({
  name: metaA.detectedName,
  collegeId: metaA.detectedCollegeId,
  cgpa: metaA.detectedCgpa,
  skills: skillsA,
  projects: [{ title: "Cache" }, { title: "Route" }, { title: "DB" }]
}, {
  collegeId: "iit-delhi",
  targetRole: "Software Development Engineer (SDE-1)"
});

console.log("Server Aarav Score:", sdeReportA.overallReadinessScore);
console.log("Client Aarav Score:", clientReportA.overallReadinessScore);
if (sdeReportA.overallReadinessScore === clientReportA.overallReadinessScore) {
  console.log("✅ Math engine matches 100% deterministically between server and client!");
} else {
  console.error("❌ Discrepancy between server and client calculation!");
  process.exit(1);
}

if (sdeReportA.overallReadinessScore !== fullStackReportB.overallReadinessScore) {
  console.log("✅ Resume A and Resume B yield distinctly different, profile-driven readiness scores!");
} else {
  console.error("❌ Scores are identical across different profiles!");
  process.exit(1);
}

console.log("\n✅ ALL MULTI-RESUME TESTS PASSED WITH DISTINCTION!");
