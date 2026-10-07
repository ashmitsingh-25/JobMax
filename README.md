# JobMax - AI-Powered Skill-Gap Analyzer & Hiring Platform

<div align="center">

![JobMax Banner](https://img.shields.io/badge/JobMax-AI%20Skill--Gap%20Platform-00EA64?style=for-the-badge&logo=codeforces&logoColor=black)
[![Vercel Production](https://img.shields.io/badge/Vercel-Live%20Deployment-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://jobmax-tau.vercel.app)
[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B%20ESM-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS%20v3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

**Bridging the gap between engineering talent and industry demand with real skills, predictive ML models, and high-precision talent sourcing.**

[Explore Live Platform](https://jobmax-tau.vercel.app) • [API Documentation](#-api--endpoint-overview) • [Local Setup](#-getting-started--local-setup) • [ML Engine](#-machine-learning-engine)

</div>

---

## 🌟 Overview

**JobMax** is an intelligent full-stack career acceleration and technical recruitment platform built with HackerRank's high-density dark aesthetic (`#07090E` dark background, `#00EA64` emerald accent, `#00D2FF` electric cyan accent, and JetBrains Mono typography).

Instead of relying solely on static resumes, JobMax enables **skill-based hiring** through two dedicated, role-based portals and an integrated machine learning engine:

1. **Developer Portal**: Campus placement intelligence, off-campus market vacancy analytics, experienced career growth planning, NLP resume parsing, Recharts skill radar visualizations, coding contests, real-world company projects, and direct hiring proposals.
2. **Company Portal**: Job requisition builder, talent pool scarcity matrix, vector-weighted candidate ranking, automated interview question generator targeting candidate-specific skill gaps, multi-candidate comparison, and batch resume ingestion.
3. **Machine Learning Engine**: Standalone Python FastAPI microservice serving 5 pre-trained Scikit-Learn/Joblib models for salary hike forecasting, skill qualification scoring, Big-5 personality traits, career velocity modeling, and role domain classification over 17,000+ real job records.

---

## 🚀 Key Features

### 👨‍💻 1. Developer Portal
- **Fresher On-Campus Track**:
  - College-specific recruiter intelligence across premier institutions (IIT Delhi, BITS Pilani, NIT Trichy, DTU, VIT Vellore).
  - Historical recruiter dossiers (Google, Microsoft, Amazon, Atlassian, Goldman Sachs) documenting interview rounds, CTC bands, and CGPA cutoffs.
  - **AI Placement Readiness Analyzer (Bot #1)**: Evaluates fit score (0–100%), round-by-round rubric clearance, critical skill gaps to close, and generates a personalized 6-week preparation sprint roadmap.
  - Crowdsourced placement data contribution modal for students and campus placement cells.
- **Fresher Off-Campus Track**:
  - Off-campus tech job aggregator with real-time market demand curves.
  - Critical market gap analyzer highlighting in-demand competencies and instant 1-click application tracker.
- **Experienced Developer Track**:
  - PDF/text resume parser with rule-based NLP extraction detecting years of experience (YoE), CGPA, and taxonomy skills.
  - **AI Career Growth Advisor (Bot #2)**: Projects next promotion tier (e.g., SDE II → SDE III / Tech Lead), expected CTC compensation leap (+65% to +140%), tier-unlocking skills, and proof-of-work project blueprints.
- **Interactive Skill Radar**:
  - Dynamic 7-domain Recharts radar visualization (Core CS, Frontend, Backend, Cloud/DevOps, Databases, AI/ML, System Design) updating in real-time as skills are added or removed.
- **Explore Contests & Company Projects**:
  - Browse and participate in company-hosted coding contests with ratings and leaderboards.
  - Tackle production company project specifications to prove hands-on implementation capabilities.
- **Hiring Proposals View**:
  - Receive, review, and respond to direct interview invitations and job proposals sent by recruiters.
- **AI Models Hub**:
  - Interactive browser workbench to run ad-hoc inference across all 5 machine learning models.

### 🏢 2. Company Portal
- **Role Requirement Builder**:
  - Define custom job requisitions specifying title, CTC band, experience requirements, minimum CGPA, and mandatory vs optional technical skills.
- **Talent Pool Scarcity & Gap Matrix**:
  - Real-time statistical analysis comparing open role requirements against the entire candidate pool (average candidate fit, day-1 ready count, scarce competencies).
- **AI Candidate Ranker & Sourcing Leaderboard**:
  - Vector-distance match scoring (0–100%) factoring in mandatory/optional skills, experience bracket, and academic benchmarks.
  - Automated deep-dive candidate profiles with auto-generated technical interview questions specifically probing candidate skill gaps.
  - Candidate comparison modal for side-by-side evaluation of qualifications.
- **Batch Resume Ingestion**:
  - Bulk upload dropzone supporting up to 10 PDF resumes simultaneously via Multer and `pdf-parse` with automatic skill extraction and instant ranking.
- **Skill Contests & Project Management**:
  - Create and manage technical coding contests, review candidate project submissions, and issue direct hiring proposals.

### 🧠 3. Machine Learning Engine (`ml/`)
- Zero external cloud dependencies (runs 100% locally or inside Docker containers).
- **5 Pre-Trained Models**:
  - `jds_salary_hike_model.pkl`: Predicts high vs moderate salary hike potential from 5 skill vectors.
  - `candidate_skills_classifier.joblib`: Benchmarks technical portfolios against industry standards.
  - `candidate_personality_classifier.joblib`: Big-5 behavioral trait classifier (OCEAN model).
  - `sds_success_model.pkl`: Long-term career velocity and success trajectory model.
  - `job_role_classifier.joblib`: Classifies job descriptions into Analytics vs Data Science.
- **Corpus Datasets**: 1,602 verified Data Science openings (`DataScience Jobs.csv`) and 15,841 Analytics openings (`Analytics Jobs.csv`).

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | [React 19](https://react.dev) (v19.2.8), [Vite](https://vite.dev) (v8.3.0), [React Router DOM](https://reactrouter.com) (v7.18.4) |
| **Styling & UI** | [Tailwind CSS](https://tailwindcss.com) (v3.4.17), PostCSS, Autoprefixer, Tailwind Merge, Clsx, Lucide React (v1.48.0) |
| **Animations & Charts** | [Recharts](https://recharts.org) (v3.10.1), [Framer Motion](https://www.framer.com/motion/) (v14.0.0), [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) |
| **Authentication & DB** | [Firebase](https://firebase.google.com) (v12.19.0) — Firebase Auth (Email/Password, Google OAuth, GitHub OAuth) & Cloud Firestore |
| **Backend API (Node.js)** | [Node.js](https://nodejs.org) (ES Modules), [Express](https://expressjs.com) (v4.21.2), CORS, Dotenv, UUID |
| **Document Processing** | [Multer](https://www.npmjs.com/package/multer) (v1.4.5), [pdf-parse](https://www.npmjs.com/package/pdf-parse) (v1.1.1) |
| **ML Engine (Python)** | [Python 3.11](https://www.python.org), [FastAPI](https://fastapi.tiangolo.com) (>=0.110), [Uvicorn](https://www.uvicorn.org), [Scikit-Learn](https://scikit-learn.org) (v1.6.1), [Pandas](https://pandas.pydata.org), [NumPy](https://numpy.org), [Joblib](https://joblib.readthedocs.io), [Pydantic](https://docs.pydantic.dev) |
| **Tooling & Linter** | [Oxlint](https://oxc.rs) (v1.81.0) |
| **DevOps & Hosting** | [Vercel](https://vercel.com) (Serverless functions + SPA hosting), [Docker](https://www.docker.com) |

---

## 📦 Project Structure

```text
JobMax/
├── api/                                # Vercel Serverless Function entry points
│   ├── index.js                        # Base API serverless handler wrapping Express
│   └── [...all].js                     # Catch-all subroute serverless handler
├── client/                             # React 19 + Vite Frontend SPA
│   ├── public/                         # Static assets and icons
│   ├── src/
│   │   ├── components/                 # Portal views, modals, cards, radar
│   │   │   ├── CompanyPortal/          # Recruiter dashboards, roles, sourcing, batch upload
│   │   │   │   ├── BatchResumeUploadModal.jsx
│   │   │   │   ├── CandidateComparisonModal.jsx
│   │   │   │   ├── CandidateDetailModal.jsx
│   │   │   │   ├── CompanyContestsView.jsx
│   │   │   │   ├── CompanyDashboard.jsx
│   │   │   │   ├── CompanyProjectsManageView.jsx
│   │   │   │   ├── CompanyProposalsView.jsx
│   │   │   │   └── CreateRoleModal.jsx
│   │   │   ├── DeveloperPortal/        # Student & engineer tracks, roadmap, radar, ML hub
│   │   │   │   ├── CompanyDetailModal.jsx
│   │   │   │   ├── CompanyProjectsView.jsx
│   │   │   │   ├── ContributePlacementModal.jsx
│   │   │   │   ├── DeveloperDashboard.jsx
│   │   │   │   ├── DeveloperOnboardingModal.jsx
│   │   │   │   ├── ExperiencedView.jsx
│   │   │   │   ├── ExploreContestsView.jsx
│   │   │   │   ├── HiringProposalsView.jsx
│   │   │   │   ├── JobDetailModal.jsx
│   │   │   │   ├── MLModelsHubView.jsx
│   │   │   │   ├── OffCampusView.jsx
│   │   │   │   ├── OnCampusView.jsx
│   │   │   │   ├── ResumeUploadModal.jsx
│   │   │   │   └── SkillRadarCard.jsx
│   │   │   ├── core/                   # UI animation primitives (TransitionPanel)
│   │   │   ├── ErrorBoundary.jsx       # Global React error boundary component
│   │   │   ├── LandingHero.jsx         # Landing page hero & portal switcher
│   │   │   ├── LandingSections.jsx     # Value proposition & interactive journey
│   │   │   ├── LoginPage.jsx           # Firebase email/password & OAuth login modal
│   │   │   └── Navbar.jsx              # Navigation header with role switcher
│   │   ├── data/
│   │   │   └── skillsTaxonomy.js       # Client-side 7-domain skills taxonomy
│   │   ├── services/
│   │   │   ├── api.js                  # API client, fallback demo data, Firestore sync
│   │   │   └── mockEcosystem.js        # Contests, projects & proposals state layer
│   │   ├── App.jsx                     # Root application coordinator & client routes
│   │   ├── firebase.js                 # Firebase initialization & auth providers
│   │   ├── index.css                   # Tailwind directives & custom HackerRank utility styles
│   │   └── main.jsx                    # React DOM entry point
│   ├── .env                            # Client environment variables (Firebase config)
│   ├── package.json                    # Frontend package dependencies & scripts
│   ├── tailwind.config.js              # Theme customization (dark palette, fonts, glow effects)
│   └── vite.config.js                  # Vite configuration with /api reverse proxy
├── server/                             # Express Backend & AI Analytics Engine
│   ├── data/
│   │   ├── candidateProfiles.js        # Seed candidate profiles across colleges & roles
│   │   ├── jobPostings.js              # Seed off-campus jobs & market demand curves
│   │   ├── placementRecords.js         # Historical campus records for top colleges
│   │   └── skillsTaxonomy.js           # Server-side standardized skill taxonomy
│   ├── middleware/
│   │   └── authMiddleware.js           # RBAC middleware (requireDeveloper, requireCompany)
│   ├── routes/
│   │   ├── auth.js                     # Demo login, user switcher, session tokens
│   │   ├── company.js                  # Role creation, candidate sourcing, batch upload
│   │   ├── developer.js                # Resume parsing, Bot #1 & Bot #2 analyzers
│   │   ├── jobs.js                     # Off-campus jobs & market demand endpoints
│   │   └── placement.js                # College directories & placement records
│   ├── services/
│   │   ├── candidateRanker.js          # Vector-distance candidate match algorithm
│   │   ├── gapAnalyzer.js              # Placement readiness & gap closing logic (Bot #1)
│   │   ├── growthAdvisor.js            # Promotion ladder & CTC uplift engine (Bot #2)
│   │   └── skillExtractor.js           # Rule-based NLP resume skill extraction engine
│   ├── index.js                        # Express server entry point
│   └── package.json                    # Server dependencies & scripts
├── ml/                                 # Standalone Python FastAPI Machine Learning Engine
│   ├── Analytics Jobs.csv              # 15,841 analytics & engineering openings
│   ├── DataScience Jobs.csv            # 1,602 verified data science openings
│   ├── Dockerfile                      # Container definition for Python 3.11 ML service
│   ├── candidate_personality_classifier.joblib # Big-5 personality model
│   ├── candidate_skills_classifier.joblib      # Skills qualification classifier
│   ├── jds_salary_hike_model.pkl       # Salary hike potential predictor
│   ├── job_role_classifier.joblib      # Analytics vs Data Science role classifier
│   ├── main.py                         # FastAPI application serving models & datasets
│   ├── README.md                       # Documentation for the ML engine
│   ├── requirements.txt                # Python ML dependencies (FastAPI, Scikit-learn, etc.)
│   ├── sds_success_model.pkl           # Career velocity & success model
│   └── test_api.py                     # Automated model verification test suite
├── scripts/                            # Validation and search utilities
├── test-e2e.js                         # Automated end-to-end integration test suite
├── vercel.json                         # Vercel deployment routes and build settings
└── package.json                        # Root monorepo configuration
```

---

## 📋 Prerequisites

Ensure your development environment meets the following requirements before running JobMax:

- **Node.js**: `v18.0.0` or higher (tested on Node.js 18, 20, and 22 LTS).
- **npm**: `v9.0.0` or higher.
- **Python (Optional, for running the ML engine)**: `v3.10` or `v3.11` (Python 3.11 recommended for Scikit-Learn 1.6.1 compatibility).
- **pip**: `v23.0` or higher.
- **Docker (Optional, for containerized ML engine)**: Docker Engine `v24.0` or higher.

---

## 🚀 Getting Started / Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ashmitsingh-25/JobMax.git
cd JobMax
```

### 2. Install Dependencies

Install root, client, and server dependencies:

```bash
# Install root dependencies
npm install

# Install frontend dependencies
npm --prefix client install

# Install backend dependencies
npm --prefix server install
```

### 3. Configure Environment Variables

Create `client/.env` (or verify it exists) with valid Firebase configuration keys:

```bash
cat << 'EOF' > client/.env
VITE_FIREBASE_API_KEY=AIzaSyArOwaAAMekdGEIU_j6fnGQEybnIvmxGtw
VITE_FIREBASE_AUTH_DOMAIN=jobmax-49e04.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=jobmax-49e04
VITE_FIREBASE_STORAGE_BUCKET=jobmax-49e04.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=235730928669
VITE_FIREBASE_APP_ID=1:235730928669:web:4fb4707e67340d538432f4
EOF
```

> [!NOTE]
> The backend server runs with sensible defaults (`PORT=5000`) and does not require a `.env` file for local development.

### 4. Run the Development Environment

Start both the backend API server and the Vite frontend:

#### Terminal 1: Backend Express Server
```bash
npm run server
# Server listening on http://localhost:5000
```

#### Terminal 2: Vite React Frontend
```bash
npm run client
# Vite dev server running on http://localhost:5173
```

Open your browser at `http://localhost:5173`. Vite automatically proxies `/api` calls to `http://localhost:5000`.

---

### 5. Running the Python Machine Learning Engine (Optional)

To spin up the standalone Python FastAPI ML engine locally:

```bash
cd ml
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
python main.py
```

The ML backend starts on `http://localhost:5000` (or `http://localhost:8000` if port 5000 is occupied). Interactive Swagger documentation is available at `http://localhost:5000/docs`.

To run the ML service with Docker:

```bash
cd ml
docker build -t jobmax-ml .
docker run -p 5000:5000 jobmax-ml
```

---

## 🔐 Environment Variables

### Frontend Configuration (`client/.env`)

| Variable | Description | Required | Safe Example Value |
|---|---|:---:|---|
| `VITE_FIREBASE_API_KEY` | Firebase Web API key for authentication | Yes | `AIzaSyArOwaAAMekdGEIU_j6fnGQEybnIvmxGtw` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Authentication project domain | Yes | `jobmax-49e04.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Google Cloud / Firebase Project identifier | Yes | `jobmax-49e04` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Default Cloud Storage bucket for assets | Yes | `jobmax-49e04.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Cloud Messaging numeric sender ID | Yes | `235730928669` |
| `VITE_FIREBASE_APP_ID` | Unique Firebase Web Application identifier | Yes | `1:235730928669:web:4fb4707e67340d538432f4` |

### Backend Configuration (`server/` / Process Environment)

| Variable | Description | Required | Default / Safe Example |
|---|---|:---:|---|
| `PORT` | Local HTTP port for the Express backend | No | `5000` |
| `VERCEL` | Environment flag injected by Vercel serverless runtime | No | `1` (on Vercel) |

---

## 📜 Available Scripts

### Root Project (`package.json`)

| Command | Description |
|---|---|
| `npm run server` | Starts the Express backend server on `http://localhost:5000`. |
| `npm run client` | Starts the Vite React development server on `http://localhost:5173`. |
| `npm run dev` | Alias for `npm run server`. |
| `npm run build` | Installs client dependencies and generates production build in `client/dist`. |
| `npm start` | Production startup script for the Express backend. |

### Frontend Workspace (`client/package.json`)

| Command | Description |
|---|---|
| `npm run dev` | Launches the Vite dev server with Hot Module Replacement (HMR). |
| `npm run build` | Bundles and minifies the React 19 SPA into `client/dist`. |
| `npm run lint` | Runs [Oxlint](https://oxc.rs) to scan for syntax and style issues. |
| `npm run preview` | Locally serves the production bundle generated in `client/dist`. |

### Server Workspace (`server/package.json`)

| Command | Description |
|---|---|
| `npm run start` | Runs the Node.js Express server (`node index.js`). |
| `npm run dev` | Runs the Node.js Express server with auto-restart (`node --watch index.js`). |

### Machine Learning Engine (`ml/`)

| Command | Description |
|---|---|
| `python main.py` | Starts the FastAPI server with Uvicorn on port 5000. |
| `python test_api.py` | Runs the automated test verification suite against all 5 ML models. |

---

## 🔌 API / Endpoint Overview

### 1. System & Discovery

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Returns service status, platform identifier, and version. |
| `GET` | `/api/skills-taxonomy` | Returns the hierarchical 7-domain skills taxonomy and flat skill names list. |

---

### 2. Authentication (`/api/auth`)

| Method | Endpoint | Description | Sample Request Body |
|---|---|---|---|
| `POST` | `/api/auth/login` | Authenticates user or provisions session user. | `{"email": "aarav@iitd.ac.in", "role": "developer"}` |
| `GET` | `/api/auth/demo-users` | Returns pre-configured demo developer and recruiter accounts. | *None* |
| `POST` | `/api/auth/switch-demo` | Switches current active user to specified demo account. | `{"userId": "user-fresher-1"}` |

---

### 3. Developer Portal (`/api/developer`)
*Requires header: `x-user-role: developer`*

| Method | Endpoint | Description | Sample Payload / Params |
|---|---|---|---|
| `POST` | `/api/developer/upload-resume` | Uploads PDF (multipart `resumeFile`) or raw text (`resumeText`) and returns NLP-extracted skills, CGPA, and YoE. | `{"resumeText": "SDE with 3 years experience in Go, Docker, Kubernetes..."}` |
| `POST` | `/api/developer/analyze-oncampus` | **Bot #1**: Computes campus placement readiness, round clearance rubric, and 6-week roadmap. | `{"studentProfile": {"skills": ["C++", "DSA"]}, "collegeId": "iit-delhi"}` |
| `POST` | `/api/developer/analyze-offcampus` | **Bot #1 (Off-Campus)**: Evaluates developer fit against open market vacancies. | `{"studentProfile": {"skills": ["React.js", "Node.js"]}}` |
| `POST` | `/api/developer/career-growth` | **Bot #2**: Evaluates promotion path, target CTC uplift (+65% to +140%), and blueprint projects. | `{"devProfile": {"yearsOfExperience": 3.5, "skills": ["Go", "Kafka"], "currentCtc": "₹24 LPA"}}` |
| `GET` | `/api/developer/profile/:userId` | Retrieves profile for specified user ID. | *URL parameter `:userId`* |
| `POST` | `/api/developer/profile/:userId` | Updates in-memory profile attributes. | `{"skills": ["Rust", "PostgreSQL"]}` |

---

### 4. Company Portal (`/api/company`)
*Requires header: `x-user-role: company`*

| Method | Endpoint | Description | Sample Payload / Params |
|---|---|---|---|
| `GET` | `/api/company/roles` | Retrieves all active company job openings. | *None* |
| `POST` | `/api/company/roles` | Posts a new job requisition with mandatory and optional skills. | `{"title": "Backend SDE", "companyName": "Microsoft", "mandatorySkills": ["Java", "SQL"], "ctcBand": "₹34-44 LPA"}` |
| `POST` | `/api/company/analyze-gap` | Evaluates overall talent pool gap metrics against a role requirement. | `{"roleId": "role-1"}` |
| `POST` | `/api/company/source-candidates` | AI candidate ranker returning scored candidates and auto-generated gap interview questions. | `{"roleId": "role-1", "filterCollegeTier": "all", "minScore": 0}` |
| `POST` | `/api/company/batch-resume-upload` | Uploads up to 10 PDF resumes (`multipart/form-data`), parses content, and ranks candidates against a role. | `FormData` with `roleId` and `resumes` files |

---

### 5. Campus Placement & Jobs (`/api/placement` & `/api/jobs`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/placement/colleges` | Returns list of colleges with tier ratings and locations. |
| `GET` | `/api/placement/records` | Query historical recruiter records with optional `collegeId` and `search` query parameters. |
| `POST` | `/api/placement/records` | Contributes crowdsourced placement records (company, role, rounds, CTC, cutoffs). |
| `GET` | `/api/jobs` | Queries off-campus job postings with filters (`search`, `experience`, `domain`, `skill`). |
| `GET` | `/api/jobs/market-demand` | Returns aggregated market demand metrics for tech disciplines. |
| `POST` | `/api/jobs` | Posts a new off-campus job vacancy. |

---

### 6. Standalone ML Engine (`ml/main.py`)

| Method | Endpoint | Description | Sample Payload |
|---|---|---|---|
| `GET` | `/` | Model registry health check, status of 5 loaded models, and dataset metrics. | *None* |
| `POST` | `/api/predict/salary-hike` | Predicts salary hike potential (`1`: High, `0`: Standard) from 5 skill features. | `{"skills": [1.0, 1.0, 1.0, 1.0, 0.0]}` |
| `POST` | `/api/predict/candidate-skills` | Classifies candidate technical qualification. | `{"skills": [1.0, 0.0, 1.0, 1.0, 1.0]}` |
| `POST` | `/api/predict/candidate-personality` | Evaluates Big-5 personality traits. | `{"traits": [2.5, 4.0, 4.5, 4.2, 4.6]}` |
| `POST` | `/api/predict/career-success` | Computes SDS career success velocity score. | `{"traits": [2.0, 4.5, 4.5, 4.0, 4.8]}` |
| `POST` | `/api/predict/classify-role` | Classifies job description into Analytics vs Data Science. | `{"job_title": "ML Engineer", "key_skills": "Python, PyTorch"}` |
| `GET` | `/api/search-jobs` | Queries across 17,000+ real job records. | Query param: `?title=Engineer&limit=20` |

---

## 🧪 Testing & Deployment

### 1. End-to-End Integration Tests

JobMax includes a comprehensive end-to-end integration test suite (`test-e2e.js`) that validates all backend and AI analytics routes.

Ensure the backend server is running (`npm run server`), then execute:

```bash
node test-e2e.js
```

The test runner validates:
1. System health check (`/api/health`)
2. Historical on-campus records query (`/api/placement/records`)
3. AI Bot #1 On-Campus Placement Readiness Analyzer (`/api/developer/analyze-oncampus`)
4. AI Bot #2 Career Growth Advisor (`/api/developer/career-growth`)
5. Company AI Candidate Sourcing & Gap Interview Generator (`/api/company/source-candidates`)
6. Rule-based NLP Resume Skill Extractor (`/api/developer/upload-resume`)

### 2. Machine Learning Model Verification

To verify the 5 standalone Scikit-learn/Joblib models in the Python ML engine:

```bash
cd ml
python test_api.py
```

### 3. Code Quality & Linting

Run Oxlint to check the React frontend codebase:

```bash
npm --prefix client run lint
```

### 4. Building for Production

Compile the production frontend assets:

```bash
npm run build
```

This generates optimized static bundles in `client/dist`.

### 5. Deployment on Vercel

JobMax is pre-configured for seamless continuous deployment on Vercel via `vercel.json`:

```json
{
  "version": 2,
  "buildCommand": "npm --prefix client install && npm --prefix client run build",
  "outputDirectory": "client/dist",
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" },
    { "source": "/api", "destination": "/api" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### Deploy via Vercel Dashboard
1. Push your repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Add the required environment variables (`VITE_FIREBASE_*`).
4. Click **Deploy**.

#### Deploy via Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

---

## 📄 License

This project is licensed under the **ISC License**. Built with ❤️ for Bharat developers and tech recruiters.