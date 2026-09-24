export const COLLEGES = [
  { id: "iit-delhi", name: "Indian Institute of Technology (IIT) Delhi", location: "New Delhi", tier: "Tier 1" },
  { id: "bits-pilani", name: "BITS Pilani (Main Campus)", location: "Pilani, Rajasthan", tier: "Tier 1" },
  { id: "nit-trichy", name: "National Institute of Technology (NIT) Trichy", location: "Tiruchirappalli, Tamil Nadu", tier: "Tier 1" },
  { id: "dtu", name: "Delhi Technological University (DTU)", location: "New Delhi", tier: "Tier 1.5" },
  { id: "vit-vellore", name: "Vellore Institute of Technology (VIT)", location: "Vellore, Tamil Nadu", tier: "Tier 2" },
  { id: "iiit-hyderabad", name: "International Institute of Information Technology (IIIT-H)", location: "Hyderabad", tier: "Tier 1" },
  { id: "rvce-bangalore", name: "RV College of Engineering (RVCE)", location: "Bengaluru, Karnataka", tier: "Tier 2" },
  { id: "other", name: "All India / Custom College Pool", location: "National", tier: "General" }
];

export const HISTORICAL_PLACEMENT_RECORDS = [
  {
    id: "rec-1",
    collegeId: "iit-delhi",
    company: "Google",
    companyLogo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&auto=format&fit=crop&q=60",
    role: "Software Development Engineer (SDE-1)",
    ctcBand: "₹45.0 - 52.0 LPA",
    baseSalary: "₹24 LPA",
    visitFrequency: "Every Year (Day 1 Recruiter)",
    hiringBatch: "2025 - 2026",
    cgpaCutoff: 8.0,
    eligibleBranches: ["Computer Science", "Information Technology", "Mathematics & Computing", "Electrical"],
    offersLastYear: 18,
    rounds: [
      { name: "Online Coding Assessment", description: "2 Hard LeetCode style algorithmic problems (90 mins)" },
      { name: "Technical Interview 1", description: "Trees, Graphs & Dynamic Programming optimization" },
      { name: "Technical Interview 2", description: "Advanced Data Structures, Concurrency & Low Level Design" },
      { name: "Googliness & Leadership", description: "Behavioral, team collaboration & problem-solving mindset" }
    ],
    demandedSkills: [
      { name: "Data Structures & Algorithms", frequency: 98, mandatory: true, category: "Core CS & Algorithms" },
      { name: "Dynamic Programming", frequency: 92, mandatory: true, category: "Core CS & Algorithms" },
      { name: "Graph Algorithms", frequency: 88, mandatory: true, category: "Core CS & Algorithms" },
      { name: "C++", frequency: 85, mandatory: false, category: "Programming Languages" },
      { name: "Java", frequency: 80, mandatory: false, category: "Programming Languages" },
      { name: "System Design Fundamentals", frequency: 72, mandatory: true, category: "System Design & Distributed Systems" },
      { name: "Operating Systems", frequency: 78, mandatory: false, category: "Core CS & Algorithms" }
    ],
    recommendedProjects: [
      "Distributed Key-Value Store with Raft Consensus",
      "High-Throughput Multithreaded Web Server in C++/Go",
      "Real-Time Collaborative Code Editor with WebSockets"
    ],
    certificationsPreferred: ["None required (heavy emphasis on Problem Solving & System Fundamentals)"]
  },
  {
    id: "rec-2",
    collegeId: "iit-delhi",
    company: "Microsoft",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=60",
    role: "Software Engineer (Core Platform)",
    ctcBand: "₹42.0 - 48.0 LPA",
    baseSalary: "₹20 LPA",
    visitFrequency: "Every Year (Day 1)",
    hiringBatch: "2025 - 2026",
    cgpaCutoff: 7.5,
    eligibleBranches: ["CS", "IT", "ECE", "EEE"],
    offersLastYear: 24,
    rounds: [
      { name: "Codility OA", description: "3 Algorithmic problems (Arrays, Strings, Dynamic Programming)" },
      { name: "DSA & Problem Solving", description: "Binary Trees, Heaps, Graph BFS/DFS" },
      { name: "Object Oriented Design", description: "Design an elevator system / parking lot with Clean OOP" },
      { name: "Director / Fitment Round", description: "Resume deep dive, architectural choices, core OS concepts" }
    ],
    demandedSkills: [
      { name: "Data Structures & Algorithms", frequency: 95, mandatory: true, category: "Core CS & Algorithms" },
      { name: "Object-Oriented Programming", frequency: 90, mandatory: true, category: "Core CS & Algorithms" },
      { name: "Tree Algorithms", frequency: 88, mandatory: true, category: "Core CS & Algorithms" },
      { name: "C#", frequency: 65, mandatory: false, category: "Programming Languages" },
      { name: "C++", frequency: 82, mandatory: false, category: "Programming Languages" },
      { name: "Operating Systems", frequency: 82, mandatory: true, category: "Core CS & Algorithms" },
      { name: "Database Management Systems", frequency: 80, mandatory: true, category: "Core CS & Algorithms" }
    ],
    recommendedProjects: [
      "Extensible Plugin-Based Task Scheduling Engine",
      "Low-Level Cache Simulator (LRU/LFU) with Thread Safety",
      "Cloud-Native File Storage Service with Azure Blob/S3 integration"
    ],
    certificationsPreferred: ["Azure Fundamentals (Optional boost)"]
  },
  {
    id: "rec-3",
    collegeId: "bits-pilani",
    company: "Amazon",
    companyLogo: "https://images.unsplash.com/photo-1523474253243-7e4a694c85ec?w=100&auto=format&fit=crop&q=60",
    role: "SDE - 1 (Cloud & Retail)",
    ctcBand: "₹34.0 - 45.0 LPA",
    baseSalary: "₹19 LPA",
    visitFrequency: "Every Year (Top Mass Product Recruiter)",
    hiringBatch: "2025 - 2026",
    cgpaCutoff: 7.0,
    eligibleBranches: ["All Engineering Branches"],
    offersLastYear: 32,
    rounds: [
      { name: "Online Assessment (OA)", description: "2 Coding Questions + Work Style Assessment (Leadership Principles)" },
      { name: "Technical Round 1", description: "Graphs, DP, Priority Queues + Amazon LP questions" },
      { name: "Technical Round 2", description: "Low-Level Design (LLD), Class diagrams & clean code implementation" },
      { name: "Bar Raiser", description: "Deep dive into past projects, scalability edge cases, conflict resolution" }
    ],
    demandedSkills: [
      { name: "Data Structures & Algorithms", frequency: 96, mandatory: true, category: "Core CS & Algorithms" },
      { name: "Java", frequency: 88, mandatory: false, category: "Programming Languages" },
      { name: "Object-Oriented Programming", frequency: 92, mandatory: true, category: "Core CS & Algorithms" },
      { name: "System Design Fundamentals", frequency: 75, mandatory: true, category: "System Design & Distributed Systems" },
      { name: "SQL", frequency: 84, mandatory: true, category: "Databases & Caching" },
      { name: "Amazon Web Services (AWS)", frequency: 68, mandatory: false, category: "Cloud & DevOps" },
      { name: "Database Management Systems", frequency: 86, mandatory: true, category: "Core CS & Algorithms" }
    ],
    recommendedProjects: [
      "E-Commerce Microservices Platform with Cart & Order Services",
      "Distributed Rate Limiter using Token Bucket & Redis",
      "Inventory Management System with Concurrent Locks"
    ],
    certificationsPreferred: ["AWS Certified Developer Associate (Bonus)"]
  },
  {
    id: "rec-4",
    collegeId: "bits-pilani",
    company: "Goldman Sachs",
    companyLogo: "https://images.unsplash.com/photo-1560520653-9e0e4c89ab11?w=100&auto=format&fit=crop&q=60",
    role: "Analyst - Engineering & Quant",
    ctcBand: "₹32.0 - 38.0 LPA",
    baseSalary: "₹24 LPA",
    visitFrequency: "Every Year",
    hiringBatch: "2025 - 2026",
    cgpaCutoff: 7.5,
    eligibleBranches: ["CS", "IT", "ECE", "Math", "Mechanical", "Chemical"],
    offersLastYear: 14,
    rounds: [
      { name: "HackerRank Aptitude & Math", description: "Quant, Probabilities, DSA, Matrix algebra" },
      { name: "Technical Interview 1", description: "Core DSA (Strings, Matrices, Dynamic Programming, Math)" },
      { name: "Technical Interview 2", description: "DBMS queries, Joins, Normalization, Multithreading & Race Conditions" },
      { name: "Senior VP Round", description: "System trade-offs, financial tech interest, communication" }
    ],
    demandedSkills: [
      { name: "Data Structures & Algorithms", frequency: 94, mandatory: true, category: "Core CS & Algorithms" },
      { name: "Java", frequency: 90, mandatory: false, category: "Programming Languages" },
      { name: "C++", frequency: 86, mandatory: false, category: "Programming Languages" },
      { name: "SQL Query Optimization", frequency: 92, mandatory: true, category: "Databases & Caching" },
      { name: "Operating Systems", frequency: 88, mandatory: true, category: "Core CS & Algorithms" },
      { name: "Database Management Systems", frequency: 90, mandatory: true, category: "Core CS & Algorithms" },
      { name: "Computer Networks", frequency: 75, mandatory: false, category: "Core CS & Algorithms" }
    ],
    recommendedProjects: [
      "Real-Time Stock Portfolio Tracker with WebSocket Feeds",
      "High-Performance Transaction Engine with ACID guarantees",
      "Order Matching Engine in C++/Java"
    ],
    certificationsPreferred: ["Financial Technology Basics / NISM (Optional)"]
  },
  {
    id: "rec-5",
    collegeId: "nit-trichy",
    company: "Oracle",
    companyLogo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&auto=format&fit=crop&q=60",
    role: "Associate Applications Developer / Cloud Eng",
    ctcBand: "₹18.0 - 24.0 LPA",
    baseSalary: "₹16 LPA",
    visitFrequency: "Every Year",
    hiringBatch: "2025 - 2026",
    cgpaCutoff: 7.0,
    eligibleBranches: ["CS", "IT", "ECE", "EEE", "Mechanical"],
    offersLastYear: 28,
    rounds: [
      { name: "Oracle OA", description: "Aptitude + CS Fundamentals + 2 Coding questions" },
      { name: "Technical Round 1", description: "Data Structures, Pointer arithmetic / Java memory model" },
      { name: "Technical Round 2", description: "Complex SQL Joins, Triggers, Views, OS Memory paging" },
      { name: "HR Round", description: "Cultural fit and relocation willingness" }
    ],
    demandedSkills: [
      { name: "Database Management Systems", frequency: 95, mandatory: true, category: "Core CS & Algorithms" },
      { name: "SQL", frequency: 95, mandatory: true, category: "Programming Languages" },
      { name: "SQL Query Optimization", frequency: 85, mandatory: true, category: "Databases & Caching" },
      { name: "Java", frequency: 90, mandatory: true, category: "Programming Languages" },
      { name: "Data Structures & Algorithms", frequency: 86, mandatory: true, category: "Core CS & Algorithms" },
      { name: "Operating Systems", frequency: 82, mandatory: true, category: "Core CS & Algorithms" },
      { name: "PostgreSQL", frequency: 70, mandatory: false, category: "Databases & Caching" }
    ],
    recommendedProjects: [
      "Relational Database Query Parser & Executor",
      "B-Tree Indexing Implementation in C++/Java",
      "Enterprise Banking Backend with Complex Transaction Queries"
    ],
    certificationsPreferred: ["Oracle Certified Professional Java / SQL (Bonus)"]
  },
  {
    id: "rec-6",
    collegeId: "dtu",
    company: "Atlassian",
    companyLogo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&auto=format&fit=crop&q=60",
    role: "Graduate Software Engineer",
    ctcBand: "₹52.0 - 82.0 LPA",
    baseSalary: "₹26 LPA",
    visitFrequency: "Every Year (Highest Paying Recruiter)",
    hiringBatch: "2025 - 2026",
    cgpaCutoff: 7.5,
    eligibleBranches: ["CS", "IT", "Mathematics & Computing"],
    offersLastYear: 9,
    rounds: [
      { name: "HackerRank OA", description: "2 High difficulty Graph/DP questions + System debugging challenge" },
      { name: "Data Structures & Algorithms", description: "Optimal problem solving, time/space trade-offs" },
      { name: "Craft / System Design", description: "Real-world feature implementation with clean modular code & unit tests" },
      { name: "Values & Behavioral Round", description: "Open company no bullshit, team spirit, customer empathy" }
    ],
    demandedSkills: [
      { name: "Data Structures & Algorithms", frequency: 98, mandatory: true, category: "Core CS & Algorithms" },
      { name: "System Design Fundamentals", frequency: 90, mandatory: true, category: "System Design & Distributed Systems" },
      { name: "Java", frequency: 85, mandatory: false, category: "Programming Languages" },
      { name: "TypeScript", frequency: 78, mandatory: false, category: "Programming Languages" },
      { name: "React.js", frequency: 76, mandatory: false, category: "Frontend Engineering" },
      { name: "Microservices Architecture", frequency: 82, mandatory: true, category: "Backend & APIs" },
      { name: "CI/CD Pipelines", frequency: 70, mandatory: false, category: "Cloud & DevOps" }
    ],
    recommendedProjects: [
      "Jira-like Agile Kanban Board with Real-Time Event Sync",
      "Distributed Rate Limiting Gateway with Redis & Envoy",
      "Microservice Monitoring Dashboard with OpenTelemetry"
    ],
    certificationsPreferred: ["None (Heavy emphasis on code cleanliness, tests & system architecture)"]
  },
  {
    id: "rec-7",
    collegeId: "vit-vellore",
    company: "Flipkart",
    companyLogo: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=100&auto=format&fit=crop&q=60",
    role: "SDE - 1 (E-commerce Core)",
    ctcBand: "₹26.0 - 32.0 LPA",
    baseSalary: "₹18 LPA",
    visitFrequency: "Every Year (Day 1 Recruiter)",
    hiringBatch: "2025 - 2026",
    cgpaCutoff: 7.0,
    eligibleBranches: ["CS", "IT", "ECE", "EEE"],
    offersLastYear: 22,
    rounds: [
      { name: "Machine Coding Round", description: "Design and implement a complete object-oriented system with working CLI in 90 mins" },
      { name: "Problem Solving & DSA", description: "DP on Trees, Graph algorithms, Trie structures" },
      { name: "CS Fundamentals & Projects", description: "Concurrency, Multithreading, Database Indexing, Network protocols" },
      { name: "Hiring Manager Round", description: "Design trade-offs, past bug post-mortems, culture" }
    ],
    demandedSkills: [
      { name: "Object-Oriented Programming", frequency: 96, mandatory: true, category: "Core CS & Algorithms" },
      { name: "Data Structures & Algorithms", frequency: 94, mandatory: true, category: "Core CS & Algorithms" },
      { name: "Java", frequency: 90, mandatory: true, category: "Programming Languages" },
      { name: "Redis", frequency: 75, mandatory: false, category: "Databases & Caching" },
      { name: "Message Queues & Streaming", frequency: 72, mandatory: false, category: "System Design & Distributed Systems" },
      { name: "SQL Query Optimization", frequency: 80, mandatory: true, category: "Databases & Caching" },
      { name: "Operating Systems", frequency: 85, mandatory: true, category: "Core CS & Algorithms" }
    ],
    recommendedProjects: [
      "Flash Sale Booking Engine with Concurrency & Distributed Lock",
      "Splitwise / Expense Sharing App with Clean OOP Patterns (Machine Coding Prep)",
      "Distributed Notification Service with Kafka & Dead-Letter Queues"
    ],
    certificationsPreferred: ["None"]
  },
  {
    id: "rec-8",
    collegeId: "vit-vellore",
    company: "Cisco Systems",
    companyLogo: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=100&auto=format&fit=crop&q=60",
    role: "Software Engineer (Networking & Security)",
    ctcBand: "₹17.0 - 22.0 LPA",
    baseSalary: "₹15 LPA",
    visitFrequency: "Every Year",
    hiringBatch: "2025 - 2026",
    cgpaCutoff: 7.5,
    eligibleBranches: ["CS", "IT", "ECE", "EEE"],
    offersLastYear: 35,
    rounds: [
      { name: "Cisco Online Test", description: "Networking MCQs + OS MCQs + 2 Coding questions" },
      { name: "Technical Round 1", description: "Socket programming, TCP/IP handshake, OSI model, Subnetting" },
      { name: "Technical Round 2", description: "Data Structures, C/C++ memory management, Linux kernel basics" },
      { name: "Managerial / HR", description: "Problem solving under pressure, team dynamics" }
    ],
    demandedSkills: [
      { name: "Computer Networks", frequency: 96, mandatory: true, category: "Core CS & Algorithms" },
      { name: "Operating Systems", frequency: 92, mandatory: true, category: "Core CS & Algorithms" },
      { name: "C++", frequency: 88, mandatory: true, category: "Programming Languages" },
      { name: "Python", frequency: 75, mandatory: false, category: "Programming Languages" },
      { name: "Data Structures & Algorithms", frequency: 82, mandatory: true, category: "Core CS & Algorithms" },
      { name: "Docker & Containerization", frequency: 65, mandatory: false, category: "Cloud & DevOps" },
      { name: "Authentication & Security", frequency: 78, mandatory: true, category: "Backend & APIs" }
    ],
    recommendedProjects: [
      "Packet Sniffer & Network Protocol Analyzer in C++/Python",
      "Custom HTTP / TCP Proxy Server with SSL Termination",
      "Distributed Firewall Rule Evaluator"
    ],
    certificationsPreferred: ["CCNA / Network+ (Greatly valued)"]
  },
  {
    id: "rec-9",
    collegeId: "iiit-hyderabad",
    company: "Uber",
    companyLogo: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=100&auto=format&fit=crop&q=60",
    role: "Software Engineer (Core Mobility & Geospatial)",
    ctcBand: "₹48.0 - 65.0 LPA",
    baseSalary: "₹24 LPA",
    visitFrequency: "Every Year (Day 1)",
    hiringBatch: "2025 - 2026",
    cgpaCutoff: 7.5,
    eligibleBranches: ["CS", "ECE"],
    offersLastYear: 12,
    rounds: [
      { name: "Codesignal OA", description: "4 algorithmic problems (hard arrays, math, geometry, graphs)" },
      { name: "DSA Round 1", description: "Advanced graph traversal, geospatial indexing (QuadTree/H3)" },
      { name: "DSA & Concurrency Round 2", description: "Multithreading, lock-free queues, race conditions" },
      { name: "System Architecture & Fit", description: "Design Uber dispatch system / Surge pricing engine" }
    ],
    demandedSkills: [
      { name: "Data Structures & Algorithms", frequency: 98, mandatory: true, category: "Core CS & Algorithms" },
      { name: "Graph Algorithms", frequency: 95, mandatory: true, category: "Core CS & Algorithms" },
      { name: "Go", frequency: 80, mandatory: false, category: "Programming Languages" },
      { name: "Java", frequency: 85, mandatory: false, category: "Programming Languages" },
      { name: "System Design Fundamentals", frequency: 92, mandatory: true, category: "System Design & Distributed Systems" },
      { name: "Message Queues & Streaming", frequency: 84, mandatory: true, category: "System Design & Distributed Systems" },
      { name: "Redis", frequency: 82, mandatory: true, category: "Databases & Caching" }
    ],
    recommendedProjects: [
      "Real-Time Geospatial Driver-Rider Matching Engine with QuadTrees & WebSockets",
      "High-Scale Event Streaming Pipeline with Kafka & Go",
      "Distributed Rate Limiter & Dynamic Surge Pricing Engine"
    ],
    certificationsPreferred: ["None"]
  },
  {
    id: "rec-10",
    collegeId: "rvce-bangalore",
    company: "Swiggy",
    companyLogo: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=100&auto=format&fit=crop&q=60",
    role: "Associate SDE (Logistics & Ordering)",
    ctcBand: "₹22.0 - 28.0 LPA",
    baseSalary: "₹16 LPA",
    visitFrequency: "Every Year",
    hiringBatch: "2025 - 2026",
    cgpaCutoff: 7.0,
    eligibleBranches: ["CS", "IT", "ECE", "Telecom", "Mech"],
    offersLastYear: 16,
    rounds: [
      { name: "Online Coding Test", description: "3 Questions (Strings, Dynamic Programming, Greedy)" },
      { name: "Machine Coding Round", description: "Build an in-memory delivery assignment scheduler in Java/Node" },
      { name: "DSA & CS Fundamentals", description: "Trees, Hash Maps, SQL joins, Redis caching patterns" },
      { name: "Tech Director Round", description: "Architecture thinking, edge cases, scalability" }
    ],
    demandedSkills: [
      { name: "Data Structures & Algorithms", frequency: 92, mandatory: true, category: "Core CS & Algorithms" },
      { name: "Java", frequency: 85, mandatory: false, category: "Programming Languages" },
      { name: "Node.js", frequency: 80, mandatory: false, category: "Backend & APIs" },
      { name: "Redis", frequency: 82, mandatory: true, category: "Databases & Caching" },
      { name: "SQL Query Optimization", frequency: 80, mandatory: true, category: "Databases & Caching" },
      { name: "Microservices Architecture", frequency: 78, mandatory: true, category: "Backend & APIs" },
      { name: "Message Queues & Streaming", frequency: 70, mandatory: false, category: "System Design & Distributed Systems" }
    ],
    recommendedProjects: [
      "Real-Time Food Order Tracking Engine with Redis Streams",
      "Delivery Partner Assignment Algorithm with Distance Matrix",
      "Coupons & Discount Engine with Concurrency Safety"
    ],
    certificationsPreferred: ["None"]
  }
];
