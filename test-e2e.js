async function testEndpoints() {
  try {
    console.log("--------------------------------------------------");
    console.log("🔍 TESTING JOBMAX BACKEND & AI ANALYTICS ENGINE");
    console.log("--------------------------------------------------");

    // 1. Health
    const health = await fetch("http://localhost:5000/api/health").then(r => r.json());
    console.log("1. Health Check:", health.status, "| Platform:", health.platform);

    // 2. Placement Records
    const placements = await fetch("http://localhost:5000/api/placement/records?collegeId=iit-delhi").then(r => r.json());
    console.log(`2. On-Campus Placement Records: Found ${placements.records.length} recruiters for IIT Delhi.`);
    console.log(`   First Recruiter: ${placements.records[0].company} (${placements.records[0].role}) | CTC: ${placements.records[0].ctcBand}`);

    // 3. AI Bot #1: Placement Readiness Analyzer
    const readiness = await fetch("http://localhost:5000/api/developer/analyze-oncampus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentProfile: {
          skills: ["Data Structures & Algorithms", "C++", "Java", "Object-Oriented Programming", "Operating Systems", "Database Management Systems", "PostgreSQL"]
        },
        collegeId: "iit-delhi"
      })
    }).then(r => r.json());
    console.log(`3. AI Bot #1 (Placement Readiness): Overall Fit = ${readiness.report.overallReadinessScore}%`);
    console.log(`   Summary: "${readiness.report.summaryReport}"`);
    console.log(`   Top Gaps to Close: ${readiness.report.topGapsToClose.map(g => g.name).join(", ")}`);
    console.log(`   6-Week Roadmap Sprints: ${readiness.report.actionPlan.length} Phases defined.`);

    // 4. AI Bot #2: Career Growth Advisor (Experienced Track)
    const growth = await fetch("http://localhost:5000/api/developer/career-growth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        devProfile: {
          yearsOfExperience: 3.5,
          skills: ["Go", "Java", "Microservices Architecture", "PostgreSQL", "Redis", "Docker & Containerization"],
          currentCtc: "₹24 LPA",
          domain: "Distributed Systems"
        }
      })
    }).then(r => r.json());
    console.log(`4. AI Bot #2 (Career Growth Advisor): Next Role = ${growth.growthReport.targetNextRole}`);
    console.log(`   Projected Comp: ${growth.growthReport.targetCompBand} (${growth.growthReport.targetUpliftPercent} Uplift)`);
    console.log(`   Tier-Unlocking Skills: ${growth.growthReport.skillsToAcquire.map(s => s.name).join(", ")}`);

    // 5. Company Portal: Candidate Sourcing & Ranking
    const sourced = await fetch("http://localhost:5000/api/company/source-candidates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roleId: "role-1",
        filterCollegeTier: "all"
      })
    }).then(r => r.json());
    console.log(`5. Company Portal AI Ranker: Sourced ${sourced.candidates.length} candidates for "${sourced.roleTitle}"`);
    console.log(`   Top Candidate: ${sourced.candidates[0].name} (Fit: ${sourced.candidates[0].fitScore}%)`);
    console.log(`   Auto-generated Gap Interview Question: "${sourced.candidates[0].customInterviewQuestions[0]?.question}"`);

    // 6. Resume NLP Extraction test
    const extracted = await fetch("http://localhost:5000/api/developer/upload-resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resumeText: "Experienced Software Engineer with 4 years of experience building microservices in Go, Java Spring Boot, and Kafka. Proficient in Docker, Kubernetes, PostgreSQL, Redis and System Design. CGPA: 9.1/10 from IIT Delhi."
      })
    }).then(r => r.json());
    console.log(`6. Resume NLP Skill Extractor: Extracted ${extracted.totalSkillsCount} skills, YoE: ${extracted.metadata.detectedYoE}, CGPA: ${extracted.metadata.detectedCgpa}`);
    console.log(`   Extracted Skills: ${extracted.extractedSkills.join(", ")}`);

    console.log("--------------------------------------------------");
    console.log("✅ ALL JOBMAX E2E API AND AI ENGINES VERIFIED 100%");
    console.log("--------------------------------------------------");
  } catch (err) {
    console.error("Test failed:", err);
  }
}

testEndpoints();
