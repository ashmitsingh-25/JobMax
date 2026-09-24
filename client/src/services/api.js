const API_BASE_URL = "http://localhost:5000/api";

export const api = {
  // Auth
  login: async (credentials) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    });
    return res.json();
  },

  getDemoUsers: async () => {
    const res = await fetch(`${API_BASE_URL}/auth/demo-users`);
    return res.json();
  },

  switchDemoUser: async (userId) => {
    const res = await fetch(`${API_BASE_URL}/auth/switch-demo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId })
    });
    return res.json();
  },

  // Placement Records
  getColleges: async () => {
    const res = await fetch(`${API_BASE_URL}/placement/colleges`);
    return res.json();
  },

  getPlacementRecords: async (collegeId = "iit-delhi", search = "") => {
    const url = new URL(`${API_BASE_URL}/placement/records`);
    if (collegeId) url.searchParams.append("collegeId", collegeId);
    if (search) url.searchParams.append("search", search);
    const res = await fetch(url.toString());
    return res.json();
  },

  addPlacementRecord: async (recordData) => {
    const res = await fetch(`${API_BASE_URL}/placement/records`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recordData)
    });
    return res.json();
  },

  // Jobs
  getJobs: async (filters = {}) => {
    const url = new URL(`${API_BASE_URL}/jobs`);
    Object.entries(filters).forEach(([k, v]) => {
      if (v) url.searchParams.append(k, v);
    });
    const res = await fetch(url.toString());
    return res.json();
  },

  getMarketDemand: async () => {
    const res = await fetch(`${API_BASE_URL}/jobs/market-demand`);
    return res.json();
  },

  postJob: async (jobData) => {
    const res = await fetch(`${API_BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData)
    });
    return res.json();
  },

  // Developer AI Analytics
  uploadResume: async (formData) => {
    const res = await fetch(`${API_BASE_URL}/developer/upload-resume`, {
      method: "POST",
      body: formData // FormData for file or text
    });
    return res.json();
  },

  analyzeOnCampus: async (studentProfile, collegeId) => {
    const res = await fetch(`${API_BASE_URL}/developer/analyze-oncampus`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentProfile, collegeId })
    });
    return res.json();
  },

  analyzeOffCampus: async (studentProfile) => {
    const res = await fetch(`${API_BASE_URL}/developer/analyze-offcampus`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentProfile })
    });
    return res.json();
  },

  analyzeCareerGrowth: async (devProfile) => {
    const res = await fetch(`${API_BASE_URL}/developer/career-growth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ devProfile })
    });
    return res.json();
  },

  // Company AI Analytics
  getCompanyRoles: async () => {
    const res = await fetch(`${API_BASE_URL}/company/roles`);
    return res.json();
  },

  createCompanyRole: async (roleData) => {
    const res = await fetch(`${API_BASE_URL}/company/roles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(roleData)
    });
    return res.json();
  },

  analyzeCompanyGap: async (roleId, customRoleRequirements) => {
    const res = await fetch(`${API_BASE_URL}/company/analyze-gap`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roleId, customRoleRequirements })
    });
    return res.json();
  },

  sourceCandidates: async (params) => {
    const res = await fetch(`${API_BASE_URL}/company/source-candidates`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params)
    });
    return res.json();
  },

  batchResumeUpload: async (formData) => {
    const res = await fetch(`${API_BASE_URL}/company/batch-resume-upload`, {
      method: "POST",
      body: formData
    });
    return res.json();
  },

  // Skills taxonomy
  getSkillsTaxonomy: async () => {
    const res = await fetch(`${API_BASE_URL}/skills-taxonomy`);
    return res.json();
  }
};
