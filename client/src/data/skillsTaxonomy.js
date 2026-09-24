export const SKILLS_TAXONOMY = {
  "Core CS & Algorithms": [
    { name: "Data Structures & Algorithms", aliases: ["dsa", "data structures", "algorithms", "leetcode", "problem solving"], tier: "fundamental", weight: 1.0 },
    { name: "Dynamic Programming", aliases: ["dp", "dynamic programming"], tier: "advanced", weight: 0.9 },
    { name: "Graph Algorithms", aliases: ["graphs", "bfs", "dfs", "dijkstra", "graph theory"], tier: "advanced", weight: 0.85 },
    { name: "Tree Algorithms", aliases: ["trees", "bst", "binary trees", "trie", "segment tree"], tier: "intermediate", weight: 0.85 },
    { name: "Object-Oriented Programming", aliases: ["oops", "oop", "object oriented"], tier: "fundamental", weight: 0.9 },
    { name: "Operating Systems", aliases: ["os", "operating systems", "concurrency", "threads", "deadlocks", "process management"], tier: "fundamental", weight: 0.8 },
    { name: "Database Management Systems", aliases: ["dbms", "database concepts", "acid properties", "indexing", "normalization"], tier: "fundamental", weight: 0.85 },
    { name: "Computer Networks", aliases: ["cn", "computer networks", "tcp/ip", "http", "https", "dns", "websockets", "osi model"], tier: "fundamental", weight: 0.8 }
  ],
  "Programming Languages": [
    { name: "Java", aliases: ["java", "core java", "java 8", "java 17", "jvm"], tier: "core", weight: 0.9 },
    { name: "C++", aliases: ["cpp", "c++", "c++11", "c++17", "stl"], tier: "core", weight: 0.9 },
    { name: "Python", aliases: ["python", "python3", "py"], tier: "core", weight: 0.9 },
    { name: "JavaScript", aliases: ["javascript", "js", "es6", "vanilla js"], tier: "core", weight: 0.85 },
    { name: "TypeScript", aliases: ["typescript", "ts"], tier: "core", weight: 0.85 },
    { name: "Go", aliases: ["golang", "go"], tier: "advanced", weight: 0.85 },
    { name: "Rust", aliases: ["rust", "rustlang"], tier: "advanced", weight: 0.8 },
    { name: "C#", aliases: ["c#", "csharp", ".net"], tier: "core", weight: 0.75 },
    { name: "SQL", aliases: ["sql", "postgresql", "mysql", "t-sql", "relational queries"], tier: "fundamental", weight: 0.9 }
  ],
  "Backend & APIs": [
    { name: "Node.js", aliases: ["node", "nodejs", "express", "express.js", "nestjs"], tier: "core", weight: 0.85 },
    { name: "Spring Boot", aliases: ["spring", "spring boot", "spring framework", "hibernate", "jpa"], tier: "advanced", weight: 0.9 },
    { name: "Django / FastAPI", aliases: ["django", "fastapi", "flask", "drf"], tier: "core", weight: 0.8 },
    { name: "RESTful API Design", aliases: ["rest", "rest api", "restful", "api development", "swagger", "openapi"], tier: "core", weight: 0.85 },
    { name: "GraphQL", aliases: ["graphql", "apollo", "apollo graphql"], tier: "intermediate", weight: 0.75 },
    { name: "gRPC & Protocol Buffers", aliases: ["grpc", "protobuf", "rpc"], tier: "advanced", weight: 0.8 },
    { name: "Microservices Architecture", aliases: ["microservices", "service-oriented", "event-driven", "distributed services"], tier: "advanced", weight: 0.9 },
    { name: "Authentication & Security", aliases: ["jwt", "oauth", "oauth2", "rbac", "auth0", "session management", "bcrypt"], tier: "core", weight: 0.8 }
  ],
  "Frontend Engineering": [
    { name: "React.js", aliases: ["react", "react.js", "reactjs", "react hooks", "redux", "zustand"], tier: "core", weight: 0.85 },
    { name: "Next.js", aliases: ["next", "next.js", "nextjs", "ssr", "ssg"], tier: "intermediate", weight: 0.8 },
    { name: "HTML5 / CSS3", aliases: ["html", "css", "html5", "css3", "semantic html"], tier: "fundamental", weight: 0.7 },
    { name: "Tailwind CSS", aliases: ["tailwind", "tailwindcss", "styled-components"], tier: "intermediate", weight: 0.7 },
    { name: "Frontend State Management", aliases: ["redux", "redux toolkit", "zustand", "context api", "mobx"], tier: "intermediate", weight: 0.75 },
    { name: "Web Performance & SEO", aliases: ["web vitals", "lcp", "performance optimization", "lazy loading", "seo"], tier: "intermediate", weight: 0.7 }
  ],
  "Databases & Caching": [
    { name: "PostgreSQL", aliases: ["postgres", "postgresql", "psql"], tier: "core", weight: 0.85 },
    { name: "MySQL", aliases: ["mysql", "mariadb"], tier: "core", weight: 0.8 },
    { name: "MongoDB", aliases: ["mongo", "mongodb", "nosql", "mongoose"], tier: "core", weight: 0.8 },
    { name: "Redis", aliases: ["redis", "in-memory cache", "caching", "redis pub/sub"], tier: "intermediate", weight: 0.85 },
    { name: "SQL Query Optimization", aliases: ["query optimization", "query tuning", "explain analyze", "database indexing", "partitioning"], tier: "advanced", weight: 0.9 },
    { name: "Elasticsearch", aliases: ["elasticsearch", "elastic search", "opensearch", "lucene"], tier: "advanced", weight: 0.75 }
  ],
  "System Design & Distributed Systems": [
    { name: "System Design Fundamentals", aliases: ["system design", "hld", "lld", "low level design", "high level design", "scalability"], tier: "advanced", weight: 0.95 },
    { name: "Message Queues & Streaming", aliases: ["kafka", "apache kafka", "rabbitmq", "sqs", "event streaming", "pubsub", "message broker"], tier: "advanced", weight: 0.9 },
    { name: "Load Balancing & Reverse Proxies", aliases: ["load balancing", "nginx", "load balancer", "reverse proxy", "api gateway", "traefik", "envoy"], tier: "intermediate", weight: 0.8 },
    { name: "Database Sharding & Replication", aliases: ["sharding", "replication", "read replicas", "cap theorem", "consistent hashing"], tier: "advanced", weight: 0.85 },
    { name: "Distributed Caching & CDN", aliases: ["cdn", "distributed caching", "cache invalidation", "cloudfront", "cloudflare"], tier: "intermediate", weight: 0.8 }
  ],
  "Cloud & DevOps": [
    { name: "Docker & Containerization", aliases: ["docker", "containers", "docker-compose", "containerization"], tier: "core", weight: 0.85 },
    { name: "Kubernetes", aliases: ["k8s", "kubernetes", "helm", "pods", "ingress"], tier: "advanced", weight: 0.85 },
    { name: "Amazon Web Services (AWS)", aliases: ["aws", "s3", "ec2", "lambda", "ecs", "cloudwatch", "dynamodb"], tier: "core", weight: 0.85 },
    { name: "Google Cloud Platform (GCP)", aliases: ["gcp", "google cloud", "bigquery", "gcs", "cloud run"], tier: "intermediate", weight: 0.8 },
    { name: "CI/CD Pipelines", aliases: ["ci/cd", "github actions", "gitlab ci", "jenkins", "argocd", "continuous integration"], tier: "intermediate", weight: 0.8 },
    { name: "Git & Version Control", aliases: ["git", "github", "gitlab", "branching", "pull requests"], tier: "fundamental", weight: 0.8 }
  ]
};
