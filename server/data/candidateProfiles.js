export const CANDIDATE_PROFILES = [
  {
    id: "cand-1",
    name: "Aarav Sharma",
    email: "aarav.sharma@iitd.ac.in",
    roleType: "fresher",
    college: "Indian Institute of Technology (IIT) Delhi",
    collegeTier: "Tier 1",
    graduationYear: 2026,
    branch: "Computer Science and Engineering",
    cgpa: 8.8,
    yearsOfExperience: 0,
    headline: "CS Undergrad @ IIT Delhi | Competitive Programmer (Codeforces Candidate Master) | Full Stack & Systems",
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
    verifiedCertifications: ["Google Summer of Code 2025 Contributor", "ACM ICPC Regionalist 2025"],
    projects: [
      {
        title: "Distributed Raft Consensus Engine",
        tech: "C++, gRPC, POSIX Threads",
        description: "Implemented a replicated state machine with leader election, log replication, and heartbeats handling network partitions."
      },
      {
        title: "Peer-to-Peer File Sync Daemon",
        tech: "Go, WebSockets, SHA-256",
        description: "Built a decentralized BitTorrent-like chunk distribution protocol with automated resume and bandwidth throttling."
      }
    ],
    github: "https://github.com/aarav-sharma-dev",
    linkedin: "https://linkedin.com/in/aaravsharma-iitd",
    status: "Available for Placement",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "cand-2",
    name: "Priya Sundaram",
    email: "priya.sundaram@bits-pilani.ac.in",
    roleType: "fresher",
    college: "BITS Pilani (Main Campus)",
    collegeTier: "Tier 1",
    graduationYear: 2026,
    branch: "Computer Science",
    cgpa: 9.1,
    yearsOfExperience: 0,
    headline: "Pre-final CS Student @ BITS Pilani | Backend & Cloud Enthusiast | React & Spring Boot Developer",
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
    verifiedCertifications: ["AWS Certified Developer Associate", "Oracle Certified Associate Java SE 8"],
    projects: [
      {
        title: "E-Commerce Microservices Platform",
        tech: "Java, Spring Boot, PostgreSQL, Docker, AWS SQS",
        description: "Architected 4 microservices (Auth, Catalog, Cart, Order) with event-driven message queues and 99.9% uptime test suite."
      },
      {
        title: "Campus Lost & Found Smart Matcher",
        tech: "React, Node.js, Cloudinary, Tailwind CSS",
        description: "Full-stack image recognition portal connecting 4,000+ campus students with lost belongings."
      }
    ],
    github: "https://github.com/priya-sundaram",
    linkedin: "https://linkedin.com/in/priya-sundaram-bits",
    status: "Shortlisted for Round 2",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "cand-3",
    name: "Rohan Varma",
    email: "rohan.varma@nitt.edu",
    roleType: "fresher",
    college: "National Institute of Technology (NIT) Trichy",
    collegeTier: "Tier 1",
    graduationYear: 2026,
    branch: "Information Technology",
    cgpa: 7.9,
    yearsOfExperience: 0,
    headline: "Full Stack Engineer | React, Node.js, Postgres | 300+ LeetCode Solved",
    skills: [
      "JavaScript",
      "TypeScript",
      "React.js",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "HTML5 / CSS3",
      "Tailwind CSS",
      "RESTful API Design",
      "Data Structures & Algorithms",
      "Git & Version Control"
    ],
    verifiedCertifications: ["Meta Certified Frontend Developer"],
    projects: [
      {
        title: "Real-Time Collaborative Markdown Editor",
        tech: "React, Node.js, WebSockets, Redis, PostgreSQL",
        description: "Built collaborative operational transformation engine for simultaneous editing with room access tokens."
      }
    ],
    github: "https://github.com/rohan-v-dev",
    linkedin: "https://linkedin.com/in/rohanvarma-nitt",
    status: "Available for Placement",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "cand-4",
    name: "Vikram Malhotra",
    email: "vikram.m@techcorp.com",
    roleType: "experienced",
    college: "Delhi Technological University (DTU)",
    collegeTier: "Tier 1.5",
    graduationYear: 2022,
    branch: "Computer Engineering",
    cgpa: 8.4,
    yearsOfExperience: 3.5,
    currentRole: "Software Development Engineer II",
    currentCompany: "Swiggy",
    currentCtc: "₹24 LPA",
    targetCtc: "₹42 - 50 LPA",
    domain: "Quick Commerce & Logistics",
    headline: "SDE II @ Swiggy | High-Throughput Distributed Systems | Go, Kafka, Redis, Microservices",
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
      "System Design Fundamentals",
      "Database Sharding & Replication",
      "CI/CD Pipelines"
    ],
    verifiedCertifications: ["CKA: Certified Kubernetes Administrator", "Confluent Certified Kafka Developer"],
    projects: [
      {
        title: "Order Dispatch Routing Engine Scale-Up",
        tech: "Go, Kafka, Redis Cluster, PostgreSQL",
        description: "Re-engineered dispatch algorithm handling 120,000 requests per minute with p99 latency cut by 42%."
      },
      {
        title: "Dynamic Surge Pricing Microservice",
        tech: "Go, gRPC, Redis PubSub",
        description: "Created real-time supply/demand stateful scoring engine serving sub-5ms pricing responses."
      }
    ],
    github: "https://github.com/vikram-m-tech",
    linkedin: "https://linkedin.com/in/vikram-malhotra-sde2",
    status: "Actively Looking for Senior SDE / Tech Lead Roles",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "cand-5",
    name: "Ananya Iyer",
    email: "ananya.iyer@vit.ac.in",
    roleType: "experienced",
    college: "Vellore Institute of Technology (VIT)",
    collegeTier: "Tier 2",
    graduationYear: 2023,
    branch: "Computer Science",
    cgpa: 8.6,
    yearsOfExperience: 2.0,
    currentRole: "Backend Engineer",
    currentCompany: "Accenture Digital (FinTech Client)",
    currentCtc: "₹11 LPA",
    targetCtc: "₹24 - 30 LPA",
    domain: "Banking & Financial Services",
    headline: "Backend Engineer (2 YoE) | Java, Spring Boot, MySQL | Ready to switch to high-growth product companies",
    skills: [
      "Java",
      "Spring Boot",
      "MySQL",
      "SQL",
      "RESTful API Design",
      "Object-Oriented Programming",
      "Database Management Systems",
      "Git & Version Control",
      "CI/CD Pipelines"
    ],
    verifiedCertifications: ["Spring Certified Professional"],
    projects: [
      {
        title: "Core Banking Ledger Gateway",
        tech: "Java 17, Spring Boot, MySQL, Docker",
        description: "Built transactional ledger verification service handling ISO 20022 message compliance."
      }
    ],
    github: "https://github.com/ananya-iyer-dev",
    linkedin: "https://linkedin.com/in/ananyaiyer-backend",
    status: "Actively Preparing for Product Company Switch",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "cand-6",
    name: "Tanmay Kulkarni",
    email: "tanmay.k@iiith.ac.in",
    roleType: "fresher",
    college: "International Institute of Information Technology (IIIT-H)",
    collegeTier: "Tier 1",
    graduationYear: 2026,
    branch: "Computer Science & AI",
    cgpa: 9.3,
    yearsOfExperience: 0,
    headline: "AI & ML Researcher @ IIIT-H | LLMs, Vector Databases, PyTorch, RAG Pipelines",
    skills: [
      "Python",
      "Generative AI & LLMs",
      "Vector Databases & RAG",
      "Machine Learning Fundamentals",
      "Deep Learning & PyTorch/TF",
      "Data Structures & Algorithms",
      "FastAPI",
      "PostgreSQL",
      "Docker & Containerization"
    ],
    verifiedCertifications: ["DeepLearning.AI Generative AI Specialist", "HuggingFace Certified"],
    projects: [
      {
        title: "Agentic Code Synthesizer & Tester",
        tech: "Python, Gemini API, ChromaDB, LangChain, AST Parser",
        description: "Self-healing code generation agent that executes tests in sandbox and fixes syntax/logic errors."
      }
    ],
    github: "https://github.com/tanmay-ai-labs",
    linkedin: "https://linkedin.com/in/tanmay-kulkarni-iiith",
    status: "Available for Placement",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "cand-7",
    name: "Sneha Mukherjee",
    email: "sneha.m@rvce.edu.in",
    roleType: "fresher",
    college: "RV College of Engineering (RVCE)",
    collegeTier: "Tier 2",
    graduationYear: 2026,
    branch: "Information Science",
    cgpa: 8.2,
    yearsOfExperience: 0,
    headline: "Frontend & UI/UX Developer | React, Next.js, Tailwind, Performance Optimization",
    skills: [
      "React.js",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "HTML5 / CSS3",
      "Tailwind CSS",
      "Frontend State Management",
      "Web Performance & SEO",
      "Git & Version Control"
    ],
    verifiedCertifications: ["Frontend Masters Advanced React"],
    projects: [
      {
        title: "Crypto Trading Dashboard (Ultra Low-Latency UI)",
        tech: "Next.js 14, Zustand, Tailwind CSS, TradingView Lightweight Charts",
        description: "Rendered 500+ tick updates/sec with smooth 60fps canvas charts and zero layout shifts."
      }
    ],
    github: "https://github.com/sneha-mukherjee-ui",
    linkedin: "https://linkedin.com/in/snehamukherjee-rvce",
    status: "Available for Placement",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
  }
];
