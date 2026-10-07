// Mock data for the new Skill-Based Hiring Ecosystem features

export const MOCK_CONTESTS = [
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
    prize: "Interview Opportunity"
  },
  {
    id: "contest-2",
    name: "Backend Scalability Challenge",
    companyId: "user-company-2",
    companyName: "InnovateX",
    description: "Design and implement a rate limiter in Node.js. Evaluate performance under high concurrency.",
    technology: "Node.js",
    difficulty: "Advanced",
    duration: "3 Hours",
    participants: 89,
    maxParticipants: 200,
    skills: ["Node.js", "Redis", "Concurrency", "System Design"],
    status: "active",
    deadline: "2026-10-20T23:59:59Z",
    prize: "Pre-Placement Offer"
  }
];

export const MOCK_PROJECTS = [
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
    reward: "Internship / Interview Opportunity"
  }
];

export const MOCK_LEADERBOARD = [
  {
    id: "user-fresher-1",
    name: "Rahul Verma",
    role: "developer",
    college: "IIT Delhi",
    score: 96,
    time: "1h 45m",
    skills: ["React", "JavaScript", "Node.js"],
    github: "rahulv-dev",
    projects: 12,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "user-fresher-2",
    name: "Ananya Singh",
    role: "developer",
    college: "BITS Pilani",
    score: 93,
    time: "1h 50m",
    skills: ["React", "TypeScript", "UI/UX"],
    github: "ananya-codes",
    projects: 8,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "user-fresher-3",
    name: "Aarav Sharma",
    role: "developer",
    college: "DTU",
    score: 91,
    time: "1h 55m",
    skills: ["React", "JavaScript", "MongoDB"],
    github: "aarav-sharma-tech",
    projects: 10,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  }
];

export const MOCK_PROPOSALS = [
  {
    id: "prop-1",
    companyName: "TechNova",
    candidateId: "user-fresher-1",
    jobRole: "Software Developer",
    jobDescription: "Based on your performance in our coding challenge, we would like to invite you to join TechNova.",
    employmentType: "Full-Time",
    ctc: "₹12 LPA",
    location: "Bangalore",
    workMode: "Hybrid",
    status: "pending",
    date: new Date().toISOString()
  }
];

export const ecosystemApi = {
  getContests: async () => ({ success: true, contests: MOCK_CONTESTS }),
  getProjects: async () => ({ success: true, projects: MOCK_PROJECTS }),
  getLeaderboard: async (contestId) => ({ success: true, leaderboard: MOCK_LEADERBOARD }),
  getProposals: async (candidateId) => ({ 
    success: true, 
    proposals: MOCK_PROPOSALS.filter(p => p.candidateId === candidateId) 
  }),
  sendProposal: async (data) => {
    MOCK_PROPOSALS.push({ ...data, id: `prop-${Date.now()}`, status: "pending", date: new Date().toISOString() });
    return { success: true };
  }
};
