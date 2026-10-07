// LocalStorage-backed data store for the Skill-Based Hiring Ecosystem features

const readStore = (key, defaultData = []) => {
  if (typeof window === 'undefined') return defaultData;
  const data = localStorage.getItem(`jobmax_${key}`);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return defaultData;
    }
  }
  return defaultData;
};

const writeStore = (key, data) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`jobmax_${key}`, JSON.stringify(data));
  }
};

const INITIAL_CONTESTS = [
  {
    id: "contest-1",
    name: "Frontend Challenge — Build a Responsive Dashboard",
    companyId: "user-company-1",
    companyName: "TechNova",
    description: "Build a highly responsive, accessible React dashboard using Tailwind CSS. We will evaluate state management, component composition, and responsive design.",
    technology: "React.js",
    difficulty: "Intermediate",
    duration: "2 Hours",
    participants: 124,
    maxParticipants: 500,
    skills: ["React", "JavaScript", "UI/UX", "Problem Solving"],
    status: "active",
    deadline: "2026-10-15T23:59:59Z",
    prize: "Interview Opportunity",
    createdAt: new Date().toISOString()
  }
];

const INITIAL_PROJECTS = [
  {
    id: "project-1",
    name: "Build an AI Resume Screening Dashboard",
    companyId: "user-company-1",
    companyName: "TechNova",
    description: "Develop a dashboard that analyzes resumes and ranks candidates based on job requirements using AI APIs.",
    difficulty: "Advanced",
    duration: "7 Days",
    participants: 45,
    maxParticipants: 100,
    skills: ["Python", "Machine Learning", "React", "Node.js"],
    status: "active",
    deadline: "2026-10-30T23:59:59Z",
    reward: "Internship / Interview Opportunity",
    createdAt: new Date().toISOString()
  }
];

// Initialize Data if missing
if (readStore('contests').length === 0) writeStore('contests', INITIAL_CONTESTS);
if (readStore('projects').length === 0) writeStore('projects', INITIAL_PROJECTS);

// Simulate API delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const ecosystemApi = {
  // ==================== CONTESTS ====================
  getContests: async () => {
    await delay();
    return { success: true, contests: readStore('contests') };
  },
  getContestsByCompany: async (companyId) => {
    await delay();
    return { success: true, contests: readStore('contests').filter(c => c.companyId === companyId) };
  },
  createContest: async (contestData) => {
    await delay();
    const contests = readStore('contests');
    const newContest = { ...contestData, id: `contest-${Date.now()}`, createdAt: new Date().toISOString(), participants: 0 };
    writeStore('contests', [...contests, newContest]);
    return { success: true, contest: newContest };
  },
  updateContestStatus: async (contestId, status) => {
    await delay();
    const contests = readStore('contests');
    const index = contests.findIndex(c => c.id === contestId);
    if (index !== -1) {
      contests[index].status = status;
      writeStore('contests', contests);
      return { success: true };
    }
    return { success: false, message: "Contest not found" };
  },
  registerForContest: async (candidateId, candidateDetails, contestId) => {
    await delay();
    const registrations = readStore('registrations');
    if (registrations.find(r => r.candidateId === candidateId && r.contestId === contestId)) {
      return { success: false, message: "Already registered" };
    }
    writeStore('registrations', [...registrations, { candidateId, contestId, candidateDetails, date: new Date().toISOString() }]);
    
    // Update participant count
    const contests = readStore('contests');
    const index = contests.findIndex(c => c.id === contestId);
    if (index !== -1) {
      contests[index].participants = (contests[index].participants || 0) + 1;
      writeStore('contests', contests);
    }
    return { success: true };
  },
  getRegistrations: async (candidateId) => {
    await delay();
    return { success: true, registrations: readStore('registrations').filter(r => r.candidateId === candidateId) };
  },
  submitContest: async (submissionData) => {
    await delay();
    const submissions = readStore('submissions');
    if (submissions.find(s => s.candidateId === submissionData.candidateId && s.contestId === submissionData.contestId)) {
      return { success: false, message: "Already submitted" };
    }
    writeStore('submissions', [...submissions, { ...submissionData, id: `sub-${Date.now()}`, date: new Date().toISOString() }]);
    return { success: true };
  },
  getLeaderboard: async (contestId) => {
    await delay();
    const submissions = readStore('submissions').filter(s => s.contestId === contestId);
    // Sort by score descending, then time ascending
    submissions.sort((a, b) => b.score - a.score || a.timeSpent - b.timeSpent);
    // Map to expected leaderboard format
    const leaderboard = submissions.map((s, index) => ({
      id: s.candidateId,
      name: s.candidateDetails?.name || 'Unknown Candidate',
      score: s.score,
      time: `${Math.floor(s.timeSpent / 60)}m ${s.timeSpent % 60}s`,
      skills: s.candidateDetails?.skills || [],
      github: s.candidateDetails?.github || '',
      rank: index + 1
    }));
    return { success: true, leaderboard };
  },
  
  // ==================== SHORTLISTING ====================
  shortlistCandidate: async (companyId, candidateId, sourceId) => {
    await delay();
    const shortlists = readStore('shortlists');
    if (shortlists.find(s => s.companyId === companyId && s.candidateId === candidateId && s.sourceId === sourceId)) {
      return { success: false, message: "Already shortlisted" };
    }
    writeStore('shortlists', [...shortlists, { companyId, candidateId, sourceId, date: new Date().toISOString() }]);
    // Create notification
    const notifs = readStore('notifications');
    writeStore('notifications', [...notifs, { userId: candidateId, message: "You have been shortlisted!", date: new Date().toISOString(), read: false }]);
    return { success: true };
  },
  getShortlists: async (companyId) => {
    await delay();
    return { success: true, shortlists: readStore('shortlists').filter(s => s.companyId === companyId) };
  },

  // ==================== PROJECTS ====================
  getProjects: async () => {
    await delay();
    return { success: true, projects: readStore('projects') };
  },
  getProjectsByCompany: async (companyId) => {
    await delay();
    return { success: true, projects: readStore('projects').filter(p => p.companyId === companyId) };
  },
  createProject: async (projectData) => {
    await delay();
    const projects = readStore('projects');
    const newProject = { ...projectData, id: `project-${Date.now()}`, createdAt: new Date().toISOString(), participants: 0 };
    writeStore('projects', [...projects, newProject]);
    return { success: true, project: newProject };
  },
  applyForProject: async (candidateId, candidateDetails, projectId) => {
    await delay();
    const apps = readStore('project_applications');
    if (apps.find(a => a.candidateId === candidateId && a.projectId === projectId)) {
      return { success: false, message: "Already applied" };
    }
    writeStore('project_applications', [...apps, { candidateId, candidateDetails, projectId, status: 'applied', date: new Date().toISOString() }]);
    
    // Update participant count
    const projects = readStore('projects');
    const index = projects.findIndex(p => p.id === projectId);
    if (index !== -1) {
      projects[index].participants = (projects[index].participants || 0) + 1;
      writeStore('projects', projects);
    }
    return { success: true };
  },
  getProjectApplications: async (companyId) => {
    await delay();
    // Get all projects for company, then get applications for those projects
    const companyProjects = readStore('projects').filter(p => p.companyId === companyId).map(p => p.id);
    const apps = readStore('project_applications').filter(a => companyProjects.includes(a.projectId));
    return { success: true, applications: apps };
  },
  submitProjectWork: async (candidateId, projectId, submissionData) => {
    await delay();
    const apps = readStore('project_applications');
    const index = apps.findIndex(a => a.candidateId === candidateId && a.projectId === projectId);
    if (index !== -1) {
      apps[index].status = 'submitted';
      apps[index].submissionData = submissionData;
      apps[index].submissionDate = new Date().toISOString();
      writeStore('project_applications', apps);
      return { success: true };
    }
    return { success: false, message: "Application not found" };
  },
  evaluateProject: async (candidateId, projectId, evaluationData) => {
    await delay();
    const apps = readStore('project_applications');
    const index = apps.findIndex(a => a.candidateId === candidateId && a.projectId === projectId);
    if (index !== -1) {
      apps[index].status = 'evaluated';
      apps[index].evaluationData = evaluationData;
      writeStore('project_applications', apps);
      // Notify candidate
      const notifs = readStore('notifications');
      writeStore('notifications', [...notifs, { userId: candidateId, message: "Your project has been evaluated!", date: new Date().toISOString(), read: false }]);
      return { success: true };
    }
    return { success: false, message: "Application not found" };
  },

  // ==================== PROPOSALS ====================
  getProposalsForCandidate: async (candidateId) => {
    await delay();
    return { success: true, proposals: readStore('proposals').filter(p => p.candidateId === candidateId) };
  },
  getProposalsForCompany: async (companyId) => {
    await delay();
    return { success: true, proposals: readStore('proposals').filter(p => p.companyId === companyId) };
  },
  sendProposal: async (data) => {
    await delay();
    const proposals = readStore('proposals');
    const newProposal = { ...data, id: `prop-${Date.now()}`, status: "pending", date: new Date().toISOString() };
    writeStore('proposals', [...proposals, newProposal]);
    // Notify candidate
    const notifs = readStore('notifications');
    writeStore('notifications', [...notifs, { userId: data.candidateId, message: `New hiring proposal from ${data.companyName}!`, date: new Date().toISOString(), read: false }]);
    return { success: true };
  },
  updateProposalStatus: async (proposalId, status) => {
    await delay();
    const proposals = readStore('proposals');
    const index = proposals.findIndex(p => p.id === proposalId);
    if (index !== -1) {
      proposals[index].status = status;
      writeStore('proposals', proposals);
      return { success: true };
    }
    return { success: false, message: "Proposal not found" };
  },

  // ==================== NOTIFICATIONS ====================
  getNotifications: async (userId) => {
    return { success: true, notifications: readStore('notifications').filter(n => n.userId === userId) };
  },
  markNotificationsRead: async (userId) => {
    const notifs = readStore('notifications');
    notifs.forEach(n => { if (n.userId === userId) n.read = true; });
    writeStore('notifications', notifs);
    return { success: true };
  }
};
