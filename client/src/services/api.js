// Base URL: use relative /api which Vite proxies to backend, with fallback
const getBaseUrl = () => {
  if (typeof window !== "undefined" && window.location && window.location.origin) {
    return `${window.location.origin}/api`;
  }
  return "http://localhost:5000/api";
};

const buildUrl = (path) => {
  const base = getBaseUrl();
  return `${base}${path}`;
};

// Fallback demo users for instant, 100% resilient login
export const FALLBACK_DEMO_USERS = [
  {
    id: "user-fresher-1",
    name: "Aarav Sharma",
    email: "aarav@iitd.ac.in",
    role: "developer",
    track: "fresher",
    subTrack: "on-campus",
    college: "Indian Institute of Technology (IIT) Delhi",
    collegeId: "iit-delhi",
    cgpa: 8.8,
    skills: [
      "Data Structures & Algorithms",
      "Dynamic Programming",
      "Graph Algorithms",
      "Tree Algorithms",
      "C++",
      "Java",
      "Object-Oriented Programming",
      "Operating Systems",
      "Database Management Systems",
      "PostgreSQL",
      "Git & Version Control"
    ],
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "user-fresher-2",
    name: "Priya Sundaram",
    email: "priya@bits-pilani.ac.in",
    role: "developer",
    track: "fresher",
    subTrack: "off-campus",
    college: "BITS Pilani (Main Campus)",
    collegeId: "bits-pilani",
    cgpa: 9.1,
    skills: [
      "Data Structures & Algorithms",
      "Java",
      "Spring Boot",
      "React.js",
      "TypeScript",
      "SQL",
      "Database Management Systems",
      "Object-Oriented Programming",
      "Docker & Containerization",
      "Amazon Web Services (AWS)",
      "RESTful API Design"
    ],
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "user-exp-1",
    name: "Vikram Malhotra",
    email: "vikram.m@swiggy.com",
    role: "developer",
    track: "experienced",
    yearsOfExperience: 3.5,
    currentRole: "SDE II",
    currentCompany: "Swiggy",
    currentCtc: "₹24 LPA",
    targetCtc: "₹45 LPA",
    domain: "High-Scale Backend & Logistics",
    skills: [
      "Go",
      "Java",
      "Data Structures & Algorithms",
      "Microservices Architecture",
      "Message Queues & Streaming",
      "Redis",
      "PostgreSQL",
      "SQL Query Optimization",
      "Docker & Containerization",
      "Kubernetes",
      "System Design Fundamentals"
    ],
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "user-company-1",
    name: "Sarah Jenkins",
    email: "sjenkins@microsoft.com",
    role: "company",
    companyName: "Microsoft",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=60",
    designation: "Principal Tech Talent Partner",
    activeRolesCount: 4,
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "user-company-2",
    name: "Ritesh Agarwal",
    email: "ritesh.recruiter@stripe.com",
    role: "company",
    companyName: "Stripe",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=60",
    designation: "Lead Technical Recruiter",
    activeRolesCount: 3,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
  }
];

export const api = {
  // Auth
  login: async (credentials) => {
    try {
      const res = await fetch(buildUrl("/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
      });
      return await res.json();
    } catch (e) {
      console.warn("Direct login fetch failed, falling back to local demo user:", e);
      const match = FALLBACK_DEMO_USERS.find(u => u.email.toLowerCase() === credentials?.email?.toLowerCase());
      return {
        success: true,
        user: match || FALLBACK_DEMO_USERS[0],
        token: "mock_jwt_token"
      };
    }
  },

  getDemoUsers: async () => {
    try {
      const res = await fetch(buildUrl("/auth/demo-users"));
      return await res.json();
    } catch (e) {
      return { success: true, users: FALLBACK_DEMO_USERS };
    }
  },

  switchDemoUser: async (userId) => {
    try {
      const res = await fetch(buildUrl("/auth/switch-demo"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId })
      });
      const data = await res.json();
      if (data && data.success && data.user) return data;
    } catch (e) {
      console.warn("switchDemoUser network error, falling back locally:", e);
    }
    
    // Guaranteed instant local fallback
    const localUser = FALLBACK_DEMO_USERS.find(u => u.id === userId) || FALLBACK_DEMO_USERS[0];
    return {
      success: true,
      user: localUser,
      token: `local_token_${localUser.id}`
    };
  },

  // Placement Records
  getColleges: async () => {
    const res = await fetch(buildUrl("/placement/colleges"));
    return res.json();
  },

  getPlacementRecords: async (collegeId = "iit-delhi", search = "") => {
    const url = new URL(buildUrl("/placement/records"));
    if (collegeId) url.searchParams.append("collegeId", collegeId);
    if (search) url.searchParams.append("search", search);
    const res = await fetch(url.toString());
    return res.json();
  },

  addPlacementRecord: async (recordData) => {
    const res = await fetch(buildUrl("/placement/records"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recordData)
    });
    return res.json();
  },

  // Jobs
  getJobs: async (filters = {}) => {
    const url = new URL(buildUrl("/jobs"));
    Object.entries(filters).forEach(([k, v]) => {
      if (v) url.searchParams.append(k, v);
    });
    const res = await fetch(url.toString());
    return res.json();
  },

  getMarketDemand: async () => {
    const res = await fetch(buildUrl("/jobs/market-demand"));
    return res.json();
  },

  postJob: async (jobData) => {
    const res = await fetch(buildUrl("/jobs"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData)
    });
    return res.json();
  },

  // Developer AI Analytics
  uploadResume: async (formData) => {
    const res = await fetch(buildUrl("/developer/upload-resume"), {
      method: "POST",
      body: formData
    });
    return res.json();
  },

  analyzeOnCampus: async (studentProfile, collegeId) => {
    const res = await fetch(buildUrl("/developer/analyze-oncampus"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentProfile, collegeId })
    });
    return res.json();
  },

  analyzeOffCampus: async (studentProfile) => {
    const res = await fetch(buildUrl("/developer/analyze-offcampus"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentProfile })
    });
    return res.json();
  },

  analyzeCareerGrowth: async (devProfile) => {
    const res = await fetch(buildUrl("/developer/career-growth"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ devProfile })
    });
    return res.json();
  },

  // Company AI Analytics
  getCompanyRoles: async () => {
    const res = await fetch(buildUrl("/company/roles"));
    return res.json();
  },

  createCompanyRole: async (roleData) => {
    const res = await fetch(buildUrl("/company/roles"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(roleData)
    });
    return res.json();
  },

  analyzeCompanyGap: async (roleId, customRoleRequirements) => {
    const res = await fetch(buildUrl("/company/analyze-gap"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roleId, customRoleRequirements })
    });
    return res.json();
  },

  sourceCandidates: async (params) => {
    const res = await fetch(buildUrl("/company/source-candidates"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params)
    });
    return res.json();
  },

  batchResumeUpload: async (formData) => {
    const res = await fetch(buildUrl("/company/batch-resume-upload"), {
      method: "POST",
      body: formData
    });
    return res.json();
  },

  // Skills taxonomy
  getSkillsTaxonomy: async () => {
    const res = await fetch(buildUrl("/skills-taxonomy"));
    return res.json();
  }
};
