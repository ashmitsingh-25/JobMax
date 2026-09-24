import express from "express";
import { CANDIDATE_PROFILES } from "../data/candidateProfiles.js";

const router = express.Router();

// Mock in-memory user registry with rich demo profiles
const DEMO_USERS = [
  {
    id: "user-fresher-1",
    name: "Aarav Sharma",
    email: "aarav@iitd.ac.in",
    role: "developer",
    track: "fresher",
    subTrack: "on-campus",
    college: "IIT Delhi",
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
    college: "BITS Pilani",
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

// Login endpoint
router.post("/login", (req, res) => {
  const { email, password, role } = req.body;
  
  // Find by email or demo match
  const user = DEMO_USERS.find(u => u.email.toLowerCase() === (email || "").toLowerCase());
  
  if (user) {
    return res.json({
      success: true,
      token: `jwt_jobmax_${user.id}_token`,
      user
    });
  }

  // Create temporary session user for demo if not found
  const newUser = {
    id: `user_${Date.now()}`,
    name: email ? email.split("@")[0] : "New User",
    email: email || "dev@jobmax.io",
    role: role || "developer",
    track: "fresher",
    subTrack: "on-campus",
    college: "Indian Institute of Technology (IIT) Delhi",
    collegeId: "iit-delhi",
    skills: ["Data Structures & Algorithms", "C++", "Java", "Object-Oriented Programming"],
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  };

  return res.json({
    success: true,
    token: `jwt_jobmax_${newUser.id}_token`,
    user: newUser
  });
});

// Demo account quick switcher
router.get("/demo-users", (req, res) => {
  res.json({ success: true, users: DEMO_USERS });
});

// Switch to a specific demo user
router.post("/switch-demo", (req, res) => {
  const { userId } = req.body;
  const user = DEMO_USERS.find(u => u.id === userId);
  if (user) {
    return res.json({
      success: true,
      token: `jwt_jobmax_${user.id}_token`,
      user
    });
  }
  return res.status(404).json({ success: false, message: "Demo user not found" });
});

export default router;
