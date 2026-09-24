# JobMax - AI-Powered Skill-Gap Analyzer & Hiring Platform

<div align="center">

![JobMax Banner](https://img.shields.io/badge/JobMax-AI%20Skill--Gap%20Platform-00EA64?style=for-the-badge&logo=codeforces&logoColor=black)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Ready-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express%20ESM-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS%20v3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

**Connecting developers with dream careers by bridging the gap between student skills and industry demand.**

</div>

---

## 🌟 Overview

**JobMax** is an intelligent full-stack career acceleration and talent sourcing platform designed with HackerRank's high-density dark UI aesthetic (`#07090E` dark canvas, `#00EA64` emerald accent, JetBrains Mono typography).

The platform features two distinct portals accessible from a single entry point:
1. **Developer Portal**: Fresher on-campus readiness, off-campus market intelligence, experienced career growth ladder, NLP resume parsing, and Recharts 7-domain radar.
2. **Company Portal**: Role builder, talent pool availability & scarcity matrix, AI candidate match scoring, auto-generated gap interview questions, and 1-click shortlisting.

---

## 🚀 Key Features

### 👨‍💻 1. Developer Portal
- **Fresher On-Campus Track**:
  - College selection (IIT Delhi, BITS Pilani, NIT Trichy, IIIT Hyderabad, DTU Delhi, VIT Vellore).
  - Historical recruiter records (Google, Microsoft, Amazon, Atlassian, Goldman Sachs) with verified rounds, CTC ranges, and hiring trends.
  - **AI Placement Readiness Analyzer (Bot #1)**: Dynamic fit score, round-by-round rubric clearance, and custom 6-week sprint preparation roadmap.
  - Verified student crowdsourcing submission modal.
- **Fresher Off-Campus Track**:
  - Market tech jobs aggregator with real-time skill demand curves.
  - AI market gap analyzer with "Companies to Target First" and instant 1-click apply tracker.
- **Experienced Developer Track**:
  - Drag-and-drop resume parser (PDF/TXT) with NLP skill extraction.
  - **AI Career Growth Advisor (Bot #2)**: Next-level promotion ladder (+80% to +140% CTC jump), tier-unlocking skills, and production proof-of-work project blueprints.
- **Skill Proficiency Radar**:
  - Interactive Recharts 7-domain radar card with quick skill add/remove and real-time score updates.

### 🏢 2. Company Portal
- **Role Requirement Builder**: Define target title, budget CTC, experience bracket, and required core vs bonus skills.
- **Talent Pool Scarcity Matrix**: Real-time breakdown of available vs scarce market competencies.
- **AI Candidate Ranker & Sourcing Leaderboard**:
  - Match score (0–100%) computed via vector distance weighting.
  - Automated deep-dive candidate profiles with auto-generated technical interview questions targeting specific skill gaps.
  - 1-click status transitions (`Reviewing`, `Shortlisted`, `Scheduled`, `Rejected`).
  - Batch resume dropzone for bulk candidate ingestion.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide Icons, Recharts, Canvas Confetti.
- **Backend**: Node.js, Express (ES Modules), Multer, PDF-Parse, UUID.
- **Deployment**: Serverless functions and SPA on Vercel, cross-platform local development.

---

## 📦 Project Structure

```bash
JobMax/
├── api/                      # Vercel Serverless Function entry points
│   ├── index.js              # Base API serverless handler
│   └── [...all].js           # Catch-all subroute handler
├── client/                   # Vite + React Frontend
│   ├── src/
│   │   ├── components/       # Portal views, modals, cards, radar
│   │   ├── services/         # API client with fallback demo resilience
│   │   └── App.jsx           # Main state and router coordinator
│   └── vite.config.js
├── server/                   # Express Backend & AI NLP Engine
│   ├── data/                 # Placement records, candidate profiles, taxonomies
│   ├── routes/               # Modular Express API routes
│   ├── services/             # AI Matcher, Gap Analyzer, Growth Advisor
│   └── index.js              # Server entry point
├── vercel.json               # Vercel deployment configuration
├── test-e2e.js               # Comprehensive end-to-end test suite
└── package.json              # Monorepo root configuration
```

---

## 💻 Local Development

### 1. Clone the Repository
```bash
git clone https://github.com/ashmitsingh-25/JobMax.git
cd JobMax
```

### 2. Install Dependencies
```bash
npm install
npm --prefix client install
npm --prefix server install
```

### 3. Run Locally
In terminal 1 (Backend API):
```bash
npm run server
# Running on http://localhost:5000
```

In terminal 2 (Vite Frontend):
```bash
npm run client
# Running on http://localhost:5173
```

### 4. Run End-to-End Tests
```bash
node test-e2e.js
```

---

## ⚡ 1-Click Instant Demo Credentials

No credentials needed! Click **"⚡ 1-Click Instant Demo Login"** on the landing screen, or test with:
- **Developer Demo**: `student@demo.com`
- **Company Demo**: `recruiter@google.com`

---

## 🌐 Deploy to Vercel

### Option 1: Automatic GitHub Integration (Recommended)
1. Push this repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import the `JobMax` repository.
4. Vercel automatically detects `vercel.json` and configures the build settings.
5. Click **Deploy**!

### Option 2: Deploy via Vercel CLI
```bash
npx vercel
# Follow interactive prompts to link and deploy
```

---

## 📄 License
MIT License. Built with ❤️ for Bharat developers and tech recruiters.